export const StepLesson = ({ onRestart }: { onRestart: () => void }) => (
  <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-primary">
    <div className="bg-primary text-primary-foreground px-6 py-4 text-center">
      <h2 className="text-2xl font-bold">🛡️ La leçon de Sbou3i</h2>
    </div>
    <div className="p-6 space-y-4">
      <div className="grid gap-3">
        {[
          { icon: "🔍", title: "Vérifiez l'expéditeur", desc: "kedheb_kbir@gmail.com → ça sent l'arnaque !" },
          { icon: "🔗", title: "Ne cliquez pas sur les liens suspects", desc: "voyagetorkya.com n'est pas un vrai site" },
          { icon: "🔐", title: "Ne partagez jamais vos identifiants", desc: "Aucun site légitime ne demande votre mot de passe par email" },
          { icon: "📞", title: "En cas de doute, contactez votre IT", desc: "Mieux vaut prévenir que guérir !" },
        ].map((tip) => (
          <div key={tip.title} className="flex gap-4 items-start bg-muted/50 rounded-lg p-4 border border-border">
            <span className="text-3xl">{tip.icon}</span>
            <div>
              <p className="font-bold text-foreground">{tip.title}</p>
              <p className="text-sm text-muted-foreground">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary/10 rounded-lg p-4 text-center border border-primary/30">
        <p className="font-bold text-lg text-foreground">
          🧠 Ne soyez pas comme Sbou3i !
          <br />
          <span className="text-muted-foreground text-base font-normal">
            La cybersécurité commence par la vigilance de chacun.
          </span>
        </p>
      </div>
      <button
        onClick={onRestart}
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
      >
        🔄 Rejouer le scénario
      </button>
    </div>
  </div>
);
