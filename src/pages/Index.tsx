import { useState } from "react";
import HomePage from "@/components/HomePage";
import ExamplesPage from "@/components/ExamplesPage";
import HistoryPage from "@/components/HistoryPage";
import SettingsPage from "@/components/SettingsPage";
import NavBar from "@/components/NavBar";

export type HistoryItem = {
  id: string;
  topic: string;
  level: string;
  explanation: string;
  date: string;
};

export type AppSettings = {
  name: string;
  defaultLevel: string;
};

const SAMPLE_HISTORY: HistoryItem[] = [
  {
    id: "1",
    topic: "Квантовая запутанность",
    level: "просто",
    explanation:
      "Представь два волшебных кубика. Что бы ни выпало на одном — на другом всегда выпадет противоположное, даже если они на разных концах Вселенной. Это и есть квантовая запутанность: две частицы «знают» друг о друге мгновенно.",
    date: "2026-04-24",
  },
  {
    id: "2",
    topic: "Блокчейн",
    level: "просто",
    explanation:
      "Это как общая тетрадь, которую ведут тысячи людей одновременно. Каждый видит все записи, и никто не может исправить старую запись втайне — остальные сразу заметят.",
    date: "2026-04-23",
  },
  {
    id: "3",
    topic: "Нейронные сети",
    level: "средне",
    explanation:
      "Математическая модель, вдохновлённая устройством мозга. Состоит из слоёв «нейронов», которые передают сигналы. В процессе обучения веса связей подбираются так, чтобы минимизировать ошибку предсказания.",
    date: "2026-04-22",
  },
];

export default function Index() {
  const [tab, setTab] = useState<"home" | "examples" | "history" | "settings">("home");
  const [history, setHistory] = useState<HistoryItem[]>(SAMPLE_HISTORY);
  const [settings, setSettings] = useState<AppSettings>({
    name: "",
    defaultLevel: "просто",
  });

  const addToHistory = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar active={tab} onChange={setTab} />
      <main className="flex-1">
        {tab === "home" && (
          <HomePage settings={settings} onAddHistory={addToHistory} />
        )}
        {tab === "examples" && (
          <ExamplesPage
            onSetTab={setTab}
            onAddHistory={addToHistory}
            settings={settings}
          />
        )}
        {tab === "history" && (
          <HistoryPage history={history} onClear={() => setHistory([])} />
        )}
        {tab === "settings" && (
          <SettingsPage settings={settings} onChange={setSettings} />
        )}
      </main>
    </div>
  );
}
