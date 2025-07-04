// "use client";

// import z from "zod";
// import UploadFormInput from "./upload-form-input";
// import { useUploadThing } from "@/utils/uploadthing";
// import { toast } from "sonner";
// import { generatePdfSummary } from "@/actions/upload-actions";
// import { useUser } from "@clerk/nextjs";
// import { useRef, useState } from "react";
// import { useRouter } from "next/navigation";

// const schema = z.object({
//   file: z
//     .instanceof(File, { message: "Invalid file" })
//     .refine(
//       (file) => file.size <= 20 * 1024 * 1024,
//       "File size must be less than 20MB",
//     )
//     .refine(
//       (file) => file.type.startsWith("application/pdf"),
//       "File must be a PDF",
//     ),
// });

// export default function UploadForm() {
//   const formRef = useRef<HTMLFormElement>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const { startUpload } = useUploadThing("pdfUploader", {
//     onClientUploadComplete: () => {
//       toast.success("✅ Uploaded successfully!");
//     },
//     onUploadError: (err) => {
//       toast.error(`❌ Error uploading file: ${err.message}`);
//     },
//     onUploadBegin: () => {
//       toast("📤 Upload started...");
//     },
//   });

//   const { user } = useUser();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       setIsLoading(true);
//       const formData = new FormData(e.currentTarget);
//       const file = formData.get("file") as File;

//       const validatedFields = schema.safeParse({ file });

//       if (!validatedFields.success) {
//         const errorMsg =
//           validatedFields.error.flatten().fieldErrors.file?.[0] ??
//           "Invalid file";
//         toast.error(`❌ Something went wrong: ${errorMsg}`);
//         setIsLoading(false);
//         return;
//       }

//       if (!user?.id) {
//         toast.error("❌ User not authenticated.");
//         setIsLoading(false);
//         return;
//       }

//       toast("📤Uploading...", {
//         description: "We are uploading your PDF!",
//       });

//       const resp = await startUpload([file]);

//       if (!resp || !resp[0]) {
//         toast.error("❌ Something went wrong", {
//           description: "Please use a different file",
//         });
//         setIsLoading(false);
//         return;
//       }

//       toast("🔍 Processing...", {
//         description: "Hang tight, our AI is reading through your document!",
//       });

//       const fileData = resp[0];

//       const summary = await generatePdfSummary({
//         serverData: {
//           userId: user.id,
//           file: {
//             url: fileData.url,
//             name: fileData.name,
//           },
//         },
//       });

//       if (!summary?.success || !summary.data) {
//         toast.error("❌ Failed to summarize PDF.");
//         setIsLoading(false);
//         return;
//       }

//       toast.success("✅ Summary generated successfully!", {
//         description: "We have generated a summary and saved it to your account",
//       });

//       formRef.current?.reset();
//       router.push(`/summaries/${summary.data.id}`);
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ An unexpected error occurred.");
//       formRef.current?.reset();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex w-full max-w-2xl flex-col gap-8">
//       <UploadFormInput
//         isLoading={isLoading}
//         ref={formRef}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// }

'use client';

import z from 'zod';
import UploadFormInput from './upload-form-input';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { generatePdfSummary } from '@/actions/upload-actions';
import { useUser } from '@clerk/nextjs';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  file: z
    .instanceof(File, { message: 'Invalid file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB')
    .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF'),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      toast.success('✅ Uploaded successfully!');
    },
    onUploadError: (err) => {
      toast.error(`❌ Error uploading file: ${err.message}`);
    },
    onUploadBegin: () => {
      toast('📤 Upload started...');
    },
  });

  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        const errorMsg = validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file';
        toast.error(`❌ Something went wrong: ${errorMsg}`);
        setIsLoading(false);
        return;
      }

      if (!user?.id) {
        toast.error('❌ User not authenticated.');
        setIsLoading(false);
        return;
      }

      toast('📤 Uploading...', {
        description: 'We are uploading your PDF!',
      });

      const resp = await startUpload([file]);

      if (!resp || !resp[0]) {
        toast.error('❌ Something went wrong', {
          description: 'Please use a different file',
        });
        setIsLoading(false);
        return;
      }

      toast('🔍 Processing...', {
        description: 'Hang tight, our AI is reading through your document!',
      });

      const fileData = resp[0];

      const summary = await generatePdfSummary({
        serverData: {
          userId: user.id,
          file: {
            url: fileData.url,
            name: fileData.name,
          },
        },
      });

      const { data = null, message = null } = summary || {};

      if (data?.id) {
        toast.success('✅ Summary generated successfully!', {
          description: 'We have generated a summary of your PDF and saved it to your account',
        });

        formRef.current?.reset();
        console.log("Redirecting to:", `/summaries/${data.id}`);
        router.push(`/summaries/${data.id}`);
        
      } else {
        toast.error('❌ Failed to generate summary', {
          description: message || 'Please try again later.',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('❌ Something went wrong during upload');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}
