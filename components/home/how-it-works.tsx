import { BrainCircuit, FileOutput, FileText, icons } from "lucide-react";
import { ReactNode } from "react";
import { MoveRight } from "lucide-react";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} className="text-rose-500" />,
    label: "Upload your PDF",
    description:
      "Simply drag and drop your PDF file into the upload area or click to upload",
  },
  {
    icon: (
      <BrainCircuit size={64} strokeWidth={1.5} className="text-rose-500" />
    ),
    label: "AI Analysis",
    description:
      "Our advanced AI processes and analyzes your document instantly",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} className="text-rose-500" />,
    label: "Get Summary",
    description: "Receive a clear and concise summary of your document",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        </div>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-xl font-bold text-rose-500 uppercase">
            How it Works
          </h2>
          <h3 className="mx-auto max-w-2xl text-3xl font-bold">
            Transform any PDF into an easy-to-digest summary in three simple
            steps
          </h3>
        </div>
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <div className="relative flex items-stretch" key={idx}>
              <StepItem {...step} />
              {idx < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 transform md:block">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400"
                  ></MoveRight>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="group relative w-full rounded-2xl border border-transparent bg-white/5 p-6 backdrop-blur-xs transition-colors hover:border-rose-500/20">
      <div className="flex h-full flex-col gap-4">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent transition-colors duration-300 group-hover:from-rose-500/20">
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <h4 className="text-center text-xl font-bold">{label}</h4>
          <p className="text-center text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
