import { useState } from "react";
import { AppSettings, HistoryItem } from "@/pages/Index";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  settings: AppSettings;
  onAddHistory: (item: HistoryItem) => void;
}

const LEVELS = ["просто", "средне", "глубоко"];

const MOCK_EXPLANATIONS: Record<string, Record<string, string>> = {
  просто: {
    default:
      "Представь, что это большая коробка с кнопками. Нажимаешь — что-то происходит. Внутри есть умный механизм, который всё организует. Он принимает запросы, обрабатывает их и отдаёт результат — как хороший менеджер.",
  },
  средне: {
    default:
      "Это система с входными данными и алгоритмом обработки. На каждом шаге применяются правила преобразования, пока не получим нужный результат. Важно понимать структуру данных и порядок операций.",
  },
  глубоко: {
    default:
      "С формальной точки зрения — это вычислительная абстракция над множеством состояний. Переходы между состояниями описываются функцией δ: S × Σ → S. Временна́я сложность зависит от структуры входного пространства и ветвления алгоритма.",
  },
};

function generateExplanation(topic: string, level: string): string {
  const topicLower = topic.toLowerCase();

  const knownTopics: Record<string, Record<string, string>> = {
    блокчейн: {
      просто:
        "Представь общую тетрадь, которую ведут тысячи людей. Каждый видит все записи, и никто не может тихонько исправить старое — остальные сразу заметят.",
      средне:
        "Блокчейн — это распределённый реестр, где данные хранятся в блоках, связанных криптографическими хешами. Децентрализация исключает единую точку отказа.",
      глубоко:
        "Блокчейн реализует распределённый консенсус через механизмы Proof-of-Work или Proof-of-Stake. Каждый блок содержит хеш предыдущего (SHA-256), что обеспечивает иммутабельность цепочки.",
    },
    квантовая: {
      просто:
        "Квантовые частицы могут быть в нескольких состояниях одновременно — как монета, которая и орёл, и решка, пока ты её не посмотрел.",
      средне:
        "В квантовой механике частица описывается волновой функцией — суперпозицией состояний. При измерении происходит коллапс до одного из них с определённой вероятностью.",
      глубоко:
        "Квантовое состояние |ψ⟩ = α|0⟩ + β|1⟩ описывается вектором в гильбертовом пространстве. Эволюция унитарна (оператор U), измерение — проекция на базисные состояния, что разрушает когерентность.",
    },
    ии: {
      просто:
        "ИИ — это программа, которую обучали на огромном количестве примеров. Она не думает как человек, но умеет находить паттерны и давать полезные ответы.",
      средне:
        "Современный ИИ — это нейронные сети с миллиардами параметров, обученные методом градиентного спуска. Трансформерная архитектура позволяет обрабатывать длинные контексты.",
      глубоко:
        "Large Language Models — авторегрессионные трансформеры, обученные на задаче предсказания следующего токена (cross-entropy loss). Attention-механизм: Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V.",
    },
  };

  for (const key of Object.keys(knownTopics)) {
    if (topicLower.includes(key)) {
      return knownTopics[key][level] || MOCK_EXPLANATIONS[level].default;
    }
  }

  return `${MOCK_EXPLANATIONS[level].default}\n\nТема: «${topic}».`;
}

export default function HomePage({ settings, onAddHistory }: HomePageProps) {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState(settings.defaultLevel || "просто");
  const [result, setResult] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const explanation = generateExplanation(topic, level);
      const item: HistoryItem = {
        id: Date.now().toString(),
        topic: topic.trim(),
        level,
        explanation,
        date: new Date().toISOString().split("T")[0],
      };
      setResult(item);
      onAddHistory(item);
      setLoading(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleExplain();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-16 pb-24 md:pb-16">
      <div className="animate-fade-in">
        <p className="text-muted-foreground text-sm mb-1 tracking-widest uppercase font-medium">
          {settings.name ? `Привет, ${settings.name}` : "Добро пожаловать"}
        </p>
        <h1 className="font-display text-4xl md:text-5xl italic text-foreground mb-2 leading-tight">
          Объясни мне
        </h1>
        <p className="text-muted-foreground mb-10">
          Введи любую тему — получи понятное объяснение
        </p>
      </div>

      <div className="animate-fade-in space-y-4" style={{ animationDelay: "0.1s" }}>
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Например: квантовая физика, блокчейн, ИИ..."
            className="w-full bg-card border border-border rounded px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors text-base"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-1">Уровень:</span>
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-1.5 text-sm rounded border transition-all duration-150 ${
                level === l
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={handleExplain}
          disabled={!topic.trim() || loading}
          className="w-full bg-foreground text-primary-foreground py-3.5 rounded font-medium text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              Думаю...
            </>
          ) : (
            <>
              <Icon name="Sparkles" size={16} />
              Объяснить
            </>
          )}
        </button>
      </div>

      {result && (
        <div
          className="mt-10 animate-fade-in"
          key={result.id}
        >
          <div className="border border-border rounded bg-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold text-foreground text-lg">{result.topic}</h2>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{result.level}</span>
              </div>
              <span className="text-xs text-muted-foreground mt-1">{result.date}</span>
            </div>
            <div className="w-8 h-px bg-border mb-4" />
            <p className="text-foreground leading-relaxed">{result.explanation}</p>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                setTopic("");
                setResult(null);
              }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="RotateCcw" size={14} />
              Спросить ещё
            </button>
            <button
              onClick={() => {
                const next = LEVELS[(LEVELS.indexOf(level) + 1) % LEVELS.length];
                setLevel(next);
                handleExplain();
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
