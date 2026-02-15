import happyImg from "@/assets/sbou3i-happy.jpeg";

export const StepHappy = ({ onNext }: { onNext: () => void }) => (
  <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-border">
    <div className="p-6 space-y-4 text-center">
      <h2 className="text-2xl font-bold text-foreground">
        Étape 2 : Sbou3i est content ! 🎉
      </h2>
      <p className="text-muted-foreground text-lg">
        "Yaaaaay ! Voyage gratuit en Turquie avec 3azouzti !"
      </p>
      <img
        src={happyImg}
        alt="Sbou3i content devant son PC"
        className="w-full max-w-md mx-auto rounded-lg border border-border shadow-md"
      />
      <div className="bg-[hsl(var(--success)/0.1)] rounded-lg p-4 border border-[hsl(var(--success)/0.3)]">
        <p className="text-lg">
          😄 Sbou3i est tellement heureux qu'il clique sur le lien <strong className="text-accent">sans réfléchir</strong>...
        </p>
      </div>
      <button
        onClick={onNext}
        className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
      >
        ⚠️ Sbou3i clique sur le lien...
      </button>
    </div>
  </div>
);
