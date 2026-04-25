import { useState } from "react";
import { AppSettings } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface SettingsPageProps {
  settings: AppSettings;
  onChange: (s: AppSettings) => void;
}

const LEVELS = ["просто", "средне", "глубоко"];

const LEVEL_COLORS: Record<string, string> = {
  просто: "var(--neon-green)",
  средне: "var(--neon-cyan)",
  глубоко: "var(--neon-purple)",
};

const LEVEL_DESC: Record<string, string> = {
  просто: "Аналогии и образы — без терминов",
  средне: "Базовые понятия и принципы работы",
  глубоко: "Технические детали и формулы",
};

export default function SettingsPage({ settings, onChange }: SettingsPageProps) {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(settings.name);
  const [level, setLevel] = useState(settings.defaultLevel);

  const handleSave = () => {
    onChange({ name, defaultLevel: level });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16 pb-28 md:pb-16">
      <div className="animate-fade-in mb-10">
        <p className="text-sm mb-1 tracking-widest uppercase font-medium neon-purple" style={{ color: "var(--neon-purple)", textShadow: "0 0 8px var(--neon-purple)" }}>
          Настройки
        </p>
        <h1 className="font-display text-5xl md:text-6xl italic text-foreground leading-tight">
          Профиль
        </h1>
      </div>

      <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="border border-border rounded bg-card p-6 space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Личное
          </h2>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Твоё имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как тебя зовут?"
              className="w-full bg-background border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-all text-sm"
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(0, 255, 135, 0.5)";
                e.target.style.boxShadow = "0 0 12px rgba(0, 255, 135, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "";
                e.target.style.boxShadow = "";
              }}
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Будет отображаться в приветствии на главной
            </p>
          </div>
        </div>

        <div className="border border-border rounded bg-card p-6 space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Предпочтения
          </h2>
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Уровень объяснений по умолчанию
            </label>
            <div className="space-y-2">
              {LEVELS.map((l) => {
                const color = LEVEL_COLORS[l];
                const isActive = level === l;
                return (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className="w-full text-left px-4 py-3 rounded border transition-all duration-150 flex items-center justify-between"
                    style={
                      isActive
                        ? {
                            borderColor: `${color}60`,
                            background: `${color}08`,
                            boxShadow: `0 0 12px ${color}15`,
                          }
                        : { borderColor: "rgba(255,255,255,0.08)" }
                    }
                  >
                    <div>
                      <span
                        className="text-sm font-medium"
                        style={isActive ? { color, textShadow: `0 0 8px ${color}60` } : { color: "#ccc" }}
                      >
                        {l.charAt(0).toUpperCase() + l.slice(1)}
                      </span>
                      <p className="text-xs mt-0.5 text-muted-foreground">
                        {LEVEL_DESC[l]}
                      </p>
                    </div>
                    {isActive && (
                      <Icon
                        name="Check"
                        size={14}
                        style={{ color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full neon-btn-filled py-3.5 rounded text-sm tracking-wide flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <Icon name="Check" size={16} />
              Сохранено
            </>
          ) : (
            <>
              <Icon name="Save" size={16} />
              Сохранить настройки
            </>
          )}
        </button>

        <div className="border border-border rounded bg-card p-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            О приложении
          </h2>
          <div className="space-y-3">
            {[
              ["Версия", "1.0.0"],
              ["Модель ИИ", "GPT-4o mini"],
              ["История", "Автосохранение включено"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-foreground font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
