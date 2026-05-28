interface StepDotsProps {
  current: 1 | 2 | 3;
}

const STEPS = ["When", "Where", "Confirm"];

export function StepDots({ current }: StepDotsProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isPast = step < current;
        return (
          <div key={label} className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 h-2.5 bg-primary"
                    : isPast
                    ? "w-2.5 h-2.5 bg-primary/40"
                    : "w-2.5 h-2.5 bg-border"
                }`}
              />
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px transition-colors duration-300 ${isPast ? "bg-primary/40" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
