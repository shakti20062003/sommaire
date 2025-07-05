import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="animate-in relative z-0 mx-auto flex max-w-7xl flex-col items-center justify-center py-16 transition-all sm:py-20 lg:px-12 lg:pb-28">
      {/* Gradient border wrapper */}
      <div className="group relative rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 p-[1px] transition-all duration-300 hover:from-rose-300 hover:via-rose-600 hover:to-rose-900">
        {/* Badge with transition effects */}
        <Badge
          variant={"secondary"}
          className="relative flex items-center rounded-full bg-white px-6 py-2 transition-all duration-300 group-hover:bg-transparent hover:cursor-pointer"
        >
          <Sparkles className="mr-2 h-6 w-6 animate-pulse text-rose-600 group-hover:text-white" />
          <p className="text-base text-rose-600 group-hover:text-white">
            Powered by AI
          </p>
        </Badge>
      </div>

      {/* Headings and button */}
      <h1 className="p-6 text-center font-bold">
        Transform PDFs into{" "}
        <span className="inline-bloc relative">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 -rotate-3 skew-y-1 transform rounded-lg bg-rose-200/50"
            aria-hidden="true"
          ></span>
        </span>{" "}
        summaries
      </h1>
      <h2 className="sm-text-xl px-4 text-center text-lg text-gray-600 lg:max-w-4xl lg:px-0 lg:text-2xl">
        Get a beautiful summary of your PDF in seconds
      </h2>
      <div>
        <Button
          variant={"link"}
          className="mt-6 rounded-full bg-linear-to-r from-slate-900 to-rose-500 px-8 py-6 text-base text-white shadow-lg transition-all duration-300 hover:from-rose-500 hover:to-rose-900 hover:no-underline hover:shadow-xl sm:px-10 sm:py-7 sm:text-lg lg:mt-16 lg:px-12 lg:py-8 lg:text-xl"
        >
          <Link href={"/#pricing"} className="flex items-center gap-2">
            <span>Try Sommaire</span>
            <ArrowRight className="h-4 w-4 animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
