import emailImg from "@/assets/email-voyage.jpeg";

export const StepEmail = ({ onNext }: { onNext: () => void }) => (
  <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-border">
    <div className="bg-muted px-6 py-3 border-b border-border">
      <p className="text-sm text-muted-foreground">📧 Boîte de réception de Sbou3i</p>
    </div>
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-foreground">
        Étape 1 : Sbou3i reçoit un mail...
      </h2>
      <p className="text-muted-foreground">
        Sbou3i ouvre sa boîte mail et trouve un message très tentant...
      </p>
      <img
        src={emailImg}
        alt="Email de phishing - voyage en Turquie"
        className="w-full rounded-lg border border-border shadow-md"
      />
      <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-l-secondary">
        <p className="text-sm font-medium text-foreground">
          📨 <strong>De:</strong> kedheb_kbir@gmail.com
        </p>
        <p className="text-sm text-foreground">
          <strong>Objet:</strong> voyage ltorkya
        </p>
        <p className="mt-2 text-foreground italic">
          "Mabrouk Si Sbou3I ! rbe7t m3ana voyage ltorkiya enti w 3azouztek. enzel 3al ktiba zar9a ken bec"
        </p>
      </div>
      <button
        onClick={onNext}
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity animate-pulse-glow"
      >
        Sbou3i ouvre le mail 📬
      </button>
    </div>
  </div>
);
