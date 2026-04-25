import { AppSettings, HistoryItem } from "@/pages/Index";
import Icon from "@/components/ui/icon";

type Tab = "home" | "examples" | "history" | "settings";

interface ExamplesPageProps {
  onSetTab: (tab: Tab) => void;
  onAddHistory: (item: HistoryItem) => void;
  settings: AppSettings;
}

const CATEGORIES = [
  {
    name: "Наука",
    icon: "FlaskConical",
    color: "var(--neon-cyan)",
    examples: [
      { topic: "Квантовая запутанность", level: "просто", preview: "Два объекта связаны так, что изменение одного мгновенно влияет на другой." },
      { topic: "Теория относительности", level: "просто", preview: "Время течёт по-разному в зависимости от скорости движения и гравитации." },
      { topic: "ДНК", level: "средне", preview: "Молекула, хранящая инструкции для построения любого живого организма." },
    ],
  },
  {
    name: "Технологии",
    icon: "Cpu",
    color: "var(--neon-green)",
    examples: [
      { topic: "Блокчейн", level: "просто", preview: "Децентрализованная база данных, где записи нельзя изменить задним числом." },
      { topic: "Нейронные сети", level: "средне", preview: "Математические модели, обучающиеся на данных и находящие закономерности." },
      { topic: "Шифрование", level: "просто", preview: "Преобразование данных так, чтобы их мог прочитать только адресат." },
    ],
  },
  {
    name: "Экономика",
    icon: "TrendingUp",
    color: "var(--neon-purple)",
    examples: [
      { topic: "Инфляция", level: "просто", preview: "Постепенное обесценивание денег: на ту же сумму можно купить меньше." },
      { topic: "Фондовый рынок", level: "средне", preview: "Площадка, где компании привлекают капитал, а инвесторы покупают долю." },
      { topic: "Дефляция", level: "просто", preview: "Противоположность инфляции — цены падают, но это не всегда хорошо." },
    ],
  },
  {
    name: "Философия",
    icon: "Lightbulb",
    color: "var(--neon-pink)",
    examples: [
      { topic: "Парадокс Тесея", level: "просто", preview: "Если заменить все части корабля, останется ли он тем же кораблём?" },
      { topic: "Солипсизм", level: "просто", preview: "Философская позиция: достоверно существует только твоё сознание." },
      { topic: "Бритва Оккама", level: "просто", preview: "Из двух объяснений предпочтительнее то, которое проще." },
    ],
  },
];

export default function ExamplesPage({ onSetTab, onAddHistory }: ExamplesPageProps) {
  const handleTryExample = (topic: string, level: string, preview: string) => {
    const item: HistoryItem = {
      id: Date.now().toString(),
      topic,
      level,
      explanation: preview,
      date: new Date().toISOString().split("T")[0],
    };
    onAddHistory(item);
    onSetTab("history");
  };

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16 pb-28 md:pb-16">
      <div className="animate-fade-in mb-10">
        <p className="text-sm mb-1 tracking-widest uppercase font-medium neon-green">
          Примеры
        </p>
        <h1 className="font-display text-5xl md:text-6xl italic text-foreground leading-tight">
          Что можно объяснить
        </h1>
        <p className="text-muted-foreground mt-2">
          Кликни — тема откроется в истории
        </p>
      </div>

      <div className="space-y-10">
        {CATEGORIES.map((cat, ci) => (
          <div
            key={cat.name}
            className="animate-fade-in"
            style={{ animationDelay: `${ci * 0.08}s` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon
                name={cat.icon}
                size={14}
                style={{ color: cat.color, filter: `drop-shadow(0 0 4px ${cat.color})` }}
              />
              <h2
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: cat.color, textShadow: `0 0 8px ${cat.color}70` }}
              >
                {cat.name}
              </h2>
            </div>

            <div className="space-y-2">
              {cat.examples.map((ex) => (
                <button
                  key={ex.topic}
                  onClick={() => handleTryExample(ex.topic, ex.level, ex.preview)}
                  className="w-full text-left border border-border rounded bg-card px-5 py-4 transition-all duration-150 group"
                  style={{ ["--hover-color" as string]: cat.color }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${cat.color}50`;
                    el.style.boxShadow = `0 0 12px ${cat.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "";
                    el.style.boxShadow = "";
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground text-sm">{ex.topic}</span>
                        <span
                          className="text-xs border rounded px-1.5 py-0.5"
                          style={{ borderColor: `${cat.color}40`, color: cat.color }}
                        >
                          {ex.level}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {ex.preview}
                      </p>
                    </div>
                    <Icon
                      name="ArrowRight"
                      size={14}
                      className="text-muted-foreground mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
