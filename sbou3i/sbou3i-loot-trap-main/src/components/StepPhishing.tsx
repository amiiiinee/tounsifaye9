import { useState } from "react";

export const StepPhishing = ({ onNext }: { onNext: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && password) {
      setSubmitted(true);
      setTimeout(onNext, 1500);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-accent/50">
      <div className="bg-accent text-accent-foreground px-6 py-3 text-center">
        <p className="text-sm font-bold">⚠️ SITE FRAUDULEUX - voyagetorkya.com</p>
      </div>
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-foreground text-center">
          Étape 3 : Page de phishing 🎣
        </h2>
        <p className="text-muted-foreground text-center">
          Sbou3i arrive sur un faux site qui demande ses identifiants...
        </p>

        <div className="bg-muted/50 rounded-lg p-6 border-2 border-dashed border-accent/40 space-y-4">
          <h3 className="text-center font-bold text-lg text-foreground">
            🌴 VoyageTorkya.com
          </h3>
          <p className="text-center text-sm text-muted-foreground">
            Connectez-vous pour récupérer votre billet
          </p>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground"
          />
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitted ? "⏳ Envoi des données au hacker..." : "Se connecter 🔐"}
          </button>
        </div>

        {submitted && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 animate-shake">
            <p className="text-center font-bold text-accent text-lg">
              🚨 Les données de Sbou3i viennent d'être volées !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
