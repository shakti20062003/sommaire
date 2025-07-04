'use server'

import { getDbConnection } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({ summaryId }: { summaryId: string }) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error('User not found');
    }

    console.log("🗑 Attempting to delete summary", summaryId, "for user", userId);

    const sql = await getDbConnection();
    const result = await sql`
      DELETE FROM pdf_summaries
      WHERE id::text = ${summaryId} AND user_id::text = ${userId}
      RETURNING id;
    `;

    console.log("🧾 SQL Delete Result:", result);

    if (result.length > 0) {
      revalidatePath('/dashboard');
      return { success: true };
    }

    return { success: false };
  } catch (error: any) {
    console.error('❌ Error deleting summary:', error.message, error.stack);
    return { success: false };
  }
}
