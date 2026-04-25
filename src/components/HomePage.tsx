import { useState } from "react";
import { AppSettings, HistoryItem } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  settings: AppSettings;
  onAddHistory: (item: HistoryItem) => void;
}

const LEVELS = ["просто", "средне", "глубоко"];

const LEVEL_COLORS: Record<string, string> = {
  просто: "var(--neon-green)",
  средне: "var(--neon-cyan)",
  глубоко: "var(--neon-purple)",
};

const API_URL = "https://functions.poehali.dev/af2c47f7-3a55-415f-a8ce-2f61e9b4c6c3";

export default function HomePage({ settings, onAddHistory }: HomePageProps) {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState(settings.defaultLevel || "просто");
  const [result, setResult] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async (overrideTopic?: string, overrideLevel?: string) => {
    const t = (overrideTopic ?? topic).trim();
    const l = overrideLevel ?? level;
    if (!t) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: t, level: l }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Что-то пошло не так");
        return;
      }

      const item: HistoryItem = {
        id: Date.now().toString(),
        topic: t,
        level: l,
        explanation: data.explanation,
        date: new Date().toISOString().split("T")[0],
      };
      setResult(item);
      onAddHistory(item);
    } catch {
      setError("Не удалось подключиться к серверу");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleExplain();
    }
  };

  const neonColor = LEVEL_COLORS[level];

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16 pb-28 md:pb-16">
      <div className="grid-bg fixed inset-0 pointer-events-none opacity-60" />

      <div className="relative animate-fade-in">
        <p
          className="text-sm mb-1 tracking-widest uppercase font-medium"
          style={{ color: neonColor, textShadow: `0 0 10px ${neonColor}` }}
        >
          {settings.name ? `Привет, ${settings.name}` : "Добро пожаловать"}
        </p>
        <h1 className="font-display text-5xl md:text-6xl italic text-foreground mb-2 leading-tight">
          Объясни мне
        </h1>
        <p className="text-muted-foreground mb-10">
          Введи любую тему — получи объяснение от ИИ
        </p>
      </div>

      <div className="relative animate-fade-in space-y-4" style={{ animationDelay: "0.1s" }}>
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Квантовая физика, блокчейн, чёрные дыры..."
            className="w-full bg-card border border-border rounded px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all text-base"
            style={{
              borderColor: topic ? `rgba(0, 255, 135, 0.3)` : undefined,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(0, 255, 135, 0.5)";
              e.target.style.boxShadow = "0 0 16px rgba(0, 255, 135, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = topic ? "rgba(0, 255, 135, 0.3)" : "";
              e.target.style.boxShadow = "";
            }}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground mr-1">Уровень:</span>
          {LEVELS.map((l) => {
            const color = LEVEL_COLORS[l];
            const isActive = level === l;
            return (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className="px-4 py-1.5 text-sm rounded border transition-all duration-150"
                style={
                  isActive
                    ? {
                        borderColor: color,
                        color,
                        textShadow: `0 0 8px ${color}`,
                        boxShadow: `0 0 12px ${color}30`,
                        background: `${color}10`,
                      }
                    : { borderColor: "rgba(255,255,255,0.1)", color: "#666" }
                }
              >
                {l}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleExplain()}
          disabled={!topic.trim() || loading}
          className="w-full neon-btn-filled py-3.5 rounded text-sm tracking-wide flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              ИИ думает...
            </>
          ) : (
            <>
              <Icon name="Sparkles" size={16} />
              Объяснить
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-6 animate-fade-in border border-red-500/30 rounded bg-red-500/5 px-5 py-4">
          <p className="text-red-400 text-sm flex items-center gap-2">
            <Icon name="AlertCircle" size={14} />
            {error}
          </p>
        </div>
      )}

      {result && !loading && (
        <div className="mt-10 animate-fade-in" key={result.id}>
          <div
            className="border rounded bg-card p-6 relative overflow-hidden"
            style={{
              borderColor: `${LEVEL_COLORS[result.level]}40`,
              boxShadow: `0 0 20px ${LEVEL_COLORS[result.level]}15`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${LEVEL_COLORS[result.level]}80, transparent)`,
              }}
            />
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2
                  className="font-semibold text-lg"
                  style={{
                    color: LEVEL_COLORS[result.level],
                    textShadow: `0 0 12px ${LEVEL_COLORS[result.level]}60`,
                  }}
                >
                  {result.topic}
                </h2>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {result.level}
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-1">{result.date}</span>
            </div>
            <div
              className="w-8 h-px mb-4"
              style={{ background: `${LEVEL_COLORS[result.level]}50` }}
            />
            <p className="text-foreground leading-relaxed">{result.explanation}</p>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={() => { setTopic(""); setResult(null); }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="RotateCcw" size={14} />
              Спросить ещё
            </button>
            <button
              onClick={() => {
                const next = LEVELS[(LEVELS.indexOf(level) + 1) % LEVELS.length];
                setLevel(next);
                handleExplain(topic, next);
              }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="ChevronRight" size={14} />
              Другой уровень
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
