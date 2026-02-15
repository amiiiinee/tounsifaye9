import { useState } from "react";
import { StepEmail } from "@/components/StepEmail";
import { StepHappy } from "@/components/StepHappy";
import { StepPhishing } from "@/components/StepPhishing";
import { StepHacked } from "@/components/StepHacked";
import { StepSlimane } from "@/components/StepSlimane";
import { StepLesson } from "@/components/StepLesson";

const steps = ["email", "happy", "phishing", "hacked", "slimane", "lesson"] as const;
type Step = typeof steps[number];

const Index = () => {
  const [step, setStep] = useState<Step>("email");

  const next = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const restart = () => setStep("email");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">🛡️ Axware - People Against Threats</h1>
            <p className="text-sm opacity-80">Sensibilisation à la cybersécurité</p>
          </div>
          <div className="flex gap-1">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-all ${
                  steps.indexOf(step) >= i
                    ? "bg-secondary scale-110"
                    : "bg-primary-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl animate-fade-in-up" key={step}>
          {step === "email" && <StepEmail onNext={next} />}
          {step === "happy" && <StepHappy onNext={next} />}
          {step === "phishing" && <StepPhishing onNext={next} />}
          {step === "hacked" && <StepHacked onNext={next} />}
          {step === "slimane" && <StepSlimane onNext={next} />}
          {step === "lesson" && <StepLesson onRestart={restart} />}
        </div>
      </main>
    </div>
  );
};

export default Index;
