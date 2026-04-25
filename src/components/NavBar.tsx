import Icon from "@/components/ui/icon";

type Tab = "home" | "examples" | "history" | "settings";

interface NavBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Sparkles" },
  { id: "examples", label: "Примеры", icon: "BookOpen" },
  { id: "history", label: "История", icon: "Clock" },
  { id: "settings", label: "Настройки", icon: "Settings2" },
];

export default function NavBar({ active, onChange }: NavBarProps) {
  return (
    <>
      {/* Desktop top bar */}
      <header className="hidden md:flex items-center justify-between px-10 py-5 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl italic text-foreground tracking-wide">
            Объяснятор
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1" />
        </div>
        <nav className="flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all duration-200 ${
                active === t.id
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all duration-200 ${
              active === t.id
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <Icon
              name={t.icon}
              size={20}
              className={active === t.id ? "stroke-[2.5]" : "stroke-[1.5]"}
            />
            {t.label}
          </button>
        ))}
      </nav>

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-background sticky top-0 z-40">
        <span className="font-display text-xl italic text-foreground tracking-wide">
          Объяснятор
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      </header>
    </>
  );
}
