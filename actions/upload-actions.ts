"use server";

import { fetchAndExtractText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { getDbConnection } from "@/lib/db";
import { formatFilenameAsTitle } from "@/utils/format-utils";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(uploadResponse: {
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse;

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractText(pdfUrl);
    console.log("Extracted PDF text length:", pdfText.length);

    let summary: string | null = null;

    try {
      summary = (await generateSummaryFromOpenAI(pdfText)) ?? null;
      console.log("OpenAI summary:", summary);
    } catch (error) {
      console.error("OpenAI error:", error);

      if (error instanceof Error && error.message === "Rate limit exceeded") {
        try {
          console.warn("Falling back to Gemini...");
          summary = (await generateSummaryFromGemini(pdfText)) ?? null;
          console.log("Gemini summary:", summary);
        } catch (geminiError) {
          console.error("Gemini also failed:", geminiError);
          summary = pdfText;
          console.log("Falling back to raw PDF text as summary.");
        }
      } else {
        summary = pdfText;
        console.log("OpenAI failed for other reason — using PDF text as summary.");
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFilenameAsTitle(fileName);

    // Save summary in DB
    const saveResult = await storePdfSummaryAction({
      userId,
      fileUrl: pdfUrl,
      summary,
      title: formattedFileName,
      fileName,
    });
    
    if (!saveResult.success || !saveResult.data?.id) {
      return {
        success: false,
        message: saveResult.message ?? "Failed to save summary",
        data: null,
      };
    }
    
    return {
      success: true,
      message: "Summary generated and saved successfully",
      data: {
        id: saveResult.data?.id,
        title: formattedFileName,
        summary,
      },
    };
    
  } catch (err) {
    console.error("Final catch block error:", err);
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
}


async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();

    const userExists = await sql`
      SELECT 1 FROM users WHERE id = ${userId} LIMIT 1;
    `;

    if (userExists.length === 0) {
      await sql`
        INSERT INTO users (id, email, full_name)
        VALUES (${userId}, 'placeholder@example.com', 'Unknown User')
        ON CONFLICT DO NOTHING;
      `;
    }

    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      ) RETURNING id, summary_text;
    `;

    return savedSummary;
  } catch (error) {
    console.error("Error saving pdf summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  let savedSummary: any;
  try {
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary. Please try again.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
