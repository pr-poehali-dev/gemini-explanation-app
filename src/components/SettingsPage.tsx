import { useState } from "react";
import { AppSettings } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface SettingsPageProps {
  settings: AppSettings;
  onChange: (s: AppSettings) => void;
}

const LEVELS = ["просто", "средне", "глубоко"];

const LEVEL_DESC: Record<string, string> = {
  просто: "Аналогии и образы — без терминов",
  средне: "Базовые понятия и принципы работы",
  глубоко: "Технические детали и формальные определения",
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
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16 pb-24 md:pb-16">
      <div className="animate-fade-in mb-10">
        <p className="text-muted-foreground text-sm mb-1 tracking-widest uppercase font-medium">
          Настройки
        </p>
        <h1 className="font-display text-4xl md:text-5xl italic text-foreground leading-tight">
          Профиль
        </h1>
      </div>

      <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
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
              className="w-full bg-background border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Используется для приветствия на главной странице
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
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`w-full text-left px-4 py-3 rounded border transition-all duration-150 flex items-center justify-between ${
                    level === l
                      ? "bg-foreground text-primary-foreground border-foreground"
                      : "bg-background border-border hover:border-foreground"
                  }`}
                >
                  <div>
                    <span className={`text-sm font-medium ${level === l ? "text-primary-foreground" : "text-foreground"}`}>
                      {l.charAt(0).toUpperCase() + l.slice(1)}
                    </span>
                    <p className={`text-xs mt-0.5 ${level === l ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {LEVEL_DESC[l]}
                    </p>
                  </div>
                  {level === l && <Icon name="Check" size={14} className="text-primary-foreground shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-foreground text-primary-foreground py-3.5 rounded font-medium text-sm tracking-wide hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <Icon name="Check" size={16} />
              Сохранено
            </>
          ) : (
            <>
              <Icon name="Save" size={16} />
              Сохранить
            </>
          )}
        </button>

        <div className="border border-border rounded bg-card p-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            О приложении
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Версия</span>
              <span className="text-foreground font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Режим</span>
              <span className="text-foreground font-medium">Локальный (без сервера)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">История</span>
              <span className="text-foreground font-medium">Автосохранение включено</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
