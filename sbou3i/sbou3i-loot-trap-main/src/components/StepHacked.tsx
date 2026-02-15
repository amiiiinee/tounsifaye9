import hackImg from "@/assets/email-hack.jpeg";
import sadImg from "@/assets/sbou3i-sad.jpeg";

export const StepHacked = ({ onNext }: { onNext: () => void }) => (
  <div className="bg-card rounded-xl shadow-xl overflow-hidden border-2 border-accent">
    <div className="bg-accent text-accent-foreground px-6 py-3">
      <p className="text-center font-bold">🚨 ALERTE SÉCURITÉ</p>
    </div>
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-foreground text-center">
        Étape 4 : Les données sont compromises ! 💀
      </h2>
      <p className="text-muted-foreground text-center">
        Un nouveau mail arrive... les données des clients ont été volées !
      </p>
      <img
        src={hackImg}
        alt="Email de hack - données volées"
        className="w-full rounded-lg border border-border shadow-md"
      />
      <div className="flex justify-center">
        <img
          src={sadImg}
          alt="Sbou3i triste"
          className="w-64 rounded-lg border border-border shadow-md"
        />
      </div>
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
        <p className="text-center text-foreground">
          😰 Les données des clients du cabinet de Slimane ont été compromises...
          <br />
          <strong>Tout ça à cause d'un simple clic !</strong>
        </p>
      </div>
      <button
        onClick={onNext}
        className="w-full py-3 rounded-lg bg-foreground text-background font-semibold text-lg hover:opacity-90 transition-opacity"
      >
        Voir la réaction de Slimane... 😱
      </button>
    </div>
  </div>
);
