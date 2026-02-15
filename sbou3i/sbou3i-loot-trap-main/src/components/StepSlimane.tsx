import slimaneImg from "@/assets/slimane-angry.png";

export const StepSlimane = ({ onNext }: { onNext: () => void }) => (
  <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-border">
    <div className="p-6 space-y-6 text-center">
      <h2 className="text-2xl font-bold text-foreground">
        Étape 5 : Slimane découvre la catastrophe 🤯
      </h2>
      <img
        src={slimaneImg}
        alt="Slimane en colère"
        className="max-w-sm mx-auto"
      />
      <div className="bg-secondary/20 rounded-xl p-6 border-2 border-secondary">
        <p className="text-2xl font-bold text-foreground">
          "Ya Sbouiiiii ! 😤
          <br />
          Rak bech thabbelni !"
        </p>
      </div>
      <button
        onClick={onNext}
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
      >
        Voir la leçon à retenir 📚
      </button>
    </div>
  </div>
);
