import BgGradient from "@/components/common/bg-gradient";
import SourceInfo from "@/components/summaries/source-info";
import SummaryHeader from "@/components/summaries/summary-header";
import SummaryViewer from "@/components/summaries/summary-viewer";
import { getSummaryById } from "@/lib/summaries";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function SummaryPage({ params }: {
  params: { id: string };
}) {
  const id = params.id;

  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count, created_at, original_file_url } = summary;

  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <div className="from-rose-50.40 relative isolate min-h-screen bg-linear-to-b to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="sm:py12 px-4 py-6 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader 
              title={title} 
              createdAt={created_at}
              readingTime={readingTime}
            />
          </div>

          {file_name && (
            <SourceInfo 
              file_name={file_name} 
              title={title}
              summaryText={summary_text}
              createdAt={created_at}
              originalFileUrl={original_file_url}
            />
          )}

          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="sm:p6 lg:p8 max-auto relative rounded-2xl border border-rose-100/30 bg-white/80 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-2xl sm:rounded-3xl">
              <div className="to transparent absolute inset-0 rounded-2xl bg-linear-to-br from-rose-50/50 via-orange-50/30 opacity-50 sm:rounded-3xl" />

              <div className="text-muted-foreground absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-1 text-xs shadow-xs sm:top-4 sm:right-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
                <FileText className="h-3 w-3 text-rose-400 sm:h-4 sm:w-4" />
                {word_count?.toLocaleString()} words
              </div>

              <div className="relative mt-8 flex justify-center sm:mt-6">
                <SummaryViewer summary={summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
