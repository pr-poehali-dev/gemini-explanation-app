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
    examples: [
      {
        topic: "Квантовая запутанность",
        level: "просто",
        preview:
          "Два объекта связаны так, что изменение одного мгновенно влияет на другой, где бы он ни находился.",
      },
      {
        topic: "Теория относительности",
        level: "просто",
        preview:
          "Время течёт по-разному в зависимости от скорости движения и силы гравитации.",
      },
      {
        topic: "ДНК",
        level: "средне",
        preview:
          "Молекула, хранящая инструкции для построения и работы любого живого организма.",
      },
    ],
  },
  {
    name: "Технологии",
    icon: "Cpu",
    examples: [
      {
        topic: "Блокчейн",
        level: "просто",
        preview:
          "Децентрализованная база данных, где записи нельзя изменить задним числом.",
      },
      {
        topic: "Нейронные сети",
        level: "средне",
        preview:
          "Математические модели, обучающиеся на данных и находящие в них закономерности.",
      },
      {
        topic: "Шифрование",
        level: "просто",
        preview:
          "Преобразование данных в нечитаемый вид так, чтобы их мог расшифровать только адресат.",
      },
    ],
  },
  {
    name: "Экономика",
    icon: "TrendingUp",
    examples: [
      {
        topic: "Инфляция",
        level: "просто",
        preview:
          "Постепенное обесценивание денег: на ту же сумму со временем можно купить меньше товаров.",
      },
      {
        topic: "Дефляция",
        level: "просто",
        preview:
          "Противоположность инфляции — цены падают, но это не всегда хорошо для экономики.",
      },
      {
        topic: "Фондовый рынок",
        level: "средне",
        preview:
          "Площадка, где компании привлекают капитал, а инвесторы покупают долю в их бизнесе.",
      },
    ],
  },
  {
    name: "Философия",
    icon: "Lightbulb",
    examples: [
      {
        topic: "Парадокс Тесея",
        level: "просто",
        preview:
          "Если заменить все части корабля, останется ли он тем же кораблём? Вопрос об идентичности.",
      },
      {
        topic: "Солипсизм",
        level: "просто",
        preview:
          "Философская позиция: достоверно существует только твоё собственное сознание.",
      },
      {
        topic: "Бритва Оккама",
        level: "просто",
        preview: "Из двух объяснений предпочтительнее то, которое проще.",
      },
    ],
  },
];

export default function ExamplesPage({ onSetTab, onAddHistory, settings }: ExamplesPageProps) {
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
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16 pb-24 md:pb-16">
      <div className="animate-fade-in mb-10">
        <p className="text-muted-foreground text-sm mb-1 tracking-widest uppercase font-medium">
          Примеры
        </p>
        <h1 className="font-display text-4xl md:text-5xl italic text-foreground leading-tight">
          Что можно объяснить
        </h1>
        <p className="text-muted-foreground mt-2">
          Кликни на пример — он сохранится в историю
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
              <Icon name={cat.icon} size={15} className="text-muted-foreground" />
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {cat.name}
              </h2>
            </div>

            <div className="space-y-2">
              {cat.examples.map((ex) => (
                <button
                  key={ex.topic}
                  onClick={() => handleTryExample(ex.topic, ex.level, ex.preview)}
                  className="w-full text-left border border-border rounded bg-card px-5 py-4 hover:border-foreground transition-all duration-150 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground text-sm">{ex.topic}</span>
                        <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">
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
                      className="text-muted-foreground group-hover:text-foreground transition-colors mt-0.5 shrink-0"
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
