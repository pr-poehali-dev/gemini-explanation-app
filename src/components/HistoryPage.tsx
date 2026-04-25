import { useState } from "react";
import { HistoryItem } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface HistoryPageProps {
  history: HistoryItem[];
  onClear: () => void;
}

export default function HistoryPage({ history, onClear }: HistoryPageProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });
  };

  const grouped = history.reduce<Record<string, HistoryItem[]>>((acc, item) => {
    const key = item.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => (a > b ? -1 : 1));

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16 pb-24 md:pb-16">
      <div className="animate-fade-in flex items-end justify-between mb-10">
        <div>
          <p className="text-muted-foreground text-sm mb-1 tracking-widest uppercase font-medium">
            История
          </p>
          <h1 className="font-display text-4xl md:text-5xl italic text-foreground leading-tight">
            Твои вопросы
          </h1>
        </div>

        {history.length > 0 && (
          <div>
            {confirmClear ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { onClear(); setConfirmClear(false); setExpanded(null); }}
                  className="text-sm text-destructive hover:opacity-80 transition-opacity"
                >
                  Да, очистить
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="Trash2" size={13} />
                Очистить
              </button>
            )}
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <div className="animate-fade-in text-center py-20">
          <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mx-auto mb-4">
            <Icon name="Clock" size={20} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">История пока пуста</p>
          <p className="text-muted-foreground text-xs mt-1">Задай первый вопрос на главной</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date, di) => (
            <div
              key={date}
              className="animate-fade-in"
              style={{ animationDelay: `${di * 0.06}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  {formatDate(date)}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="space-y-2">
                {grouped[date].map((item) => (
                  <div key={item.id} className="border border-border rounded bg-card overflow-hidden">
                    <button
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-secondary/50 transition-colors"
                      onClick={() =>
                        setExpanded(expanded === item.id ? null : item.id)
                      }
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-1 h-1 rounded-full bg-accent shrink-0" />
                        <span className="font-medium text-sm text-foreground truncate">
                          {item.topic}
                        </span>
                        <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 shrink-0">
                          {item.level}
                        </span>
                      </div>
                      <Icon
                        name={expanded === item.id ? "ChevronUp" : "ChevronDown"}
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                    </button>

                    {expanded === item.id && (
                      <div className="px-5 pb-5 pt-0 border-t border-border">
                        <p className="text-foreground text-sm leading-relaxed pt-4">
                          {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
