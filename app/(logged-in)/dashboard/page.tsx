import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import SummaryCard from "@/components/summaries/summary-card"; //
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummaryState from "@/components/summaries/empty-summary-state";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) return redirect("/sign-in");
  const uploadlimit = 5;

  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-emerald-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="mb-8 flex justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise, actionable insights
              </p>
            </div>
            <Button
              variant={"link"}
              className="rounded-5px group bg-linear-to-r from-rose-500 to-rose-700 transition-all duration-300 hover:scale-105 hover:from-rose-600 hover:to-rose-800 hover:no-underline"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="mr-2 h-5 w-5" /> New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6">
            <div className="rounded-[5px] border border-rose-200 bg-rose-50 p-4 text-rose-800">
              <p className="text-sm">
                You've reached the limit of {uploadlimit} uploads on the basic
                plan.{" "}
                <span className="inline">
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center gap-1 font-medium text-rose-800 underline underline-offset-4"
                  >
                    Click here to upgrade to Pro
                    <ArrowRight className="h-4 w-4" />
                  </Link>{" "}
                  for unlimited uploads.
                </span>
              </p>
            </div>
          </div>

          {summaries.length === 0 ? (<EmptySummaryState/>): (
          <div className="grid grid-col-1 md:gap-cols-2 gap-4 sm:gap-8 sm:px-0 lg:grid-cols-3">
            {summaries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} />
            ))}
          </div>
          )}
        </div>
      </div>
    </main>
  );
 
}

