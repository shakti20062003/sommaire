import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-32"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="mb-4 flex items-center justify-center rounded-2xl border border-gray-200/70 bg-gray-100/80 p-2 shadow-lg backdrop-blur-xs">
            <Pizza className="h-6 w-6 text-rose-500" />
          </div>
          <div className="mb-16 text-center">
            <h3 className="nax-w-2xl mx-auto px-4 text-3xl font-bold sm:px-6">
              Watch how Sommaire transforms{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this Next.js course PDF
              </span>{" "}
              into an easy-to-read summary!
            </h3>
          </div>
          <div className="flex items-center justify-center px-2 sm:px-4 lg:px-6">
            {/* Summary viewer */}
          </div>
        </div>
      </div>
    </section>
  );
}
