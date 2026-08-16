import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import "./css/TerminalWidget.css";

const PROMPT_USER = "user";
const PROMPT_HOST = "terminal";

type CommandMap = Record<string, () => string[]>;

const COMMANDS: CommandMap = {
  help: () => [
    "available commands:",
    "  about       - who i am",
    "  skills      - tech stack",
    "  projects    - things i've built",
    "  contact     - get in touch",
    "  whoami      - current user",
    "  clear       - clear the terminal",
    "  banner      - reprint the intro",
  ],
  about: () => [
    "Steve Florenz Mendoza (aka Teb)",
    "Network & Systems Administrator based in Bacolod City, PH.",
    "Background in networking, Linux/Windows infra, and automation.",
    "Currently leveling up into security-focused systems engineering.",
  ],
  skills: () => [
    "Linux (Fedora, Kali, Parrot) | Windows Server | Active Directory",
    "Networking: CCNA-level routing/switching, Wireshark, Aircrack-ng",
    "Automation & scripting: Bash, Google Apps Script",
    "Web: React, TypeScript, Vite, Tailwind",
  ],
  projects: () => [
    "pro-portf   - personal portfolio (React/Vite/TS, matrix UI)",
    "type 'contact' for links to see more on GitHub.",
  ],
  contact: () => [
    "email  : tebmendoza@proton.me",
    "email  : steveflorenzm@gmail.com",
    "github : steveflorenz.github.io",
  ],
  whoami: () => [`${PROMPT_USER}@${PROMPT_HOST}`],
  banner: () => BANNER,
};

const BANNER = [
  "welcome to my terminal portfolio.",
  "type 'help' to see available commands. (PS it's limited tho 🙂)",
];

type LineType = "input" | "output" | "error";

interface TerminalLine {
  type: LineType;
  text: string;
}

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>(() =>
    BANNER.map((text) => ({ type: "output", text }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // ---- Dragging ----
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleDragStart = (e: React.PointerEvent) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    const onPointerMove = (ev: PointerEvent) => {
      const x = Math.min(
        Math.max(ev.clientX - dragOffset.current.x, 8),
        window.innerWidth - rect.width - 8
      );
      const y = Math.min(
        Math.max(ev.clientY - dragOffset.current.y, 8),
        window.innerHeight - rect.height - 8
      );
      setPosition({ x, y });
    };
    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  // ---- Resizing ----
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );

  const MIN_WIDTH = 280;
  const MIN_HEIGHT = 200;

  const handleResizeStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;
    const maxWidth = window.innerWidth - rect.left - 8;
    const maxHeight = window.innerHeight - rect.top - 8;

    const onPointerMove = (ev: PointerEvent) => {
      const width = Math.min(
        Math.max(startWidth + (ev.clientX - startX), MIN_WIDTH),
        maxWidth
      );
      const height = Math.min(
        Math.max(startHeight + (ev.clientY - startY), MIN_HEIGHT),
        maxHeight
      );
      setSize({ width, height });
    };
    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  useEffect(() => {
    const handleViewportResize = () => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();

      setPosition((prev) =>
        prev
          ? {
              x: Math.min(Math.max(prev.x, 8), window.innerWidth - rect.width - 8),
              y: Math.min(Math.max(prev.y, 8), window.innerHeight - rect.height - 8),
            }
          : prev
      );
      setSize((prev) =>
        prev
          ? {
              width: Math.min(prev.width, window.innerWidth - 16),
              height: Math.min(prev.height, window.innerHeight - 16),
            }
          : prev
      );
    };

    window.addEventListener("resize", handleViewportResize);
    return () => window.removeEventListener("resize", handleViewportResize);
  }, []);

  // Focus the input whenever the panel opens or is un-minimized
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const focusInput = () => inputRef.current?.focus();

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    const newLines: TerminalLine[] = [...lines, { type: "input", text: cmd }];

    if (cmd === "") {
      setLines(newLines);
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const handler = COMMANDS[cmd.toLowerCase()];
    if (handler) {
      handler().forEach((text) => newLines.push({ type: "output", text }));
    } else {
      newLines.push({
        type: "error",
        text: `command not found: ${cmd} (try 'help')`,
      });
    }

    setLines(newLines);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      if (input.trim() !== "") setHistory((h) => [...h, input]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  // ---- Closed state: just the floating launcher pill ----
  if (!isOpen) {
    return (
      <button
        type="button"
        className="terminal-launcher"
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
      >
        <span className="terminal-launcher-dot" />
        {PROMPT_USER}@{PROMPT_HOST}:~$
      </button>
    );
  }

  // ---- Open state: floating panel, fixed to the viewport ----
  return (
    <div
      className="terminal-panel"
      ref={panelRef}
      style={
        position
          ? { left: position.x, top: position.y, right: "auto", bottom: "auto" }
          : undefined
      }
    >
      <div
        className="terminal-wrapper"
        onClick={focusInput}
        style={size ? { width: size.width } : undefined}
      >
        <div className="terminal-title-bar" onPointerDown={handleDragStart}>
          <div className="terminal-dots">
            <button
              type="button"
              className="terminal-dot terminal-dot--red"
              title="Close"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
            <button
              type="button"
              className="terminal-dot terminal-dot--yellow"
              title="Minimize"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized((m) => !m);
              }}
            />
            <span className="terminal-dot terminal-dot--green" />
          </div>
          <span className="terminal-title-text">
            {PROMPT_USER}@{PROMPT_HOST}: ~
          </span>
        </div>

        <div
          className={
            "terminal-body" + (isMinimized ? " terminal-body--minimized" : "")
          }
          style={size ? { height: size.height } : undefined}
        >
          {lines.map((line, i) => (
            <Line key={i} line={line} />
          ))}

          <div className="terminal-input-row">
            <span className="terminal-prompt">
              {PROMPT_USER}@{PROMPT_HOST}:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {!isMinimized && (
          <div
            className="terminal-resize-handle"
            onPointerDown={handleResizeStart}
          />
        )}
      </div>
    </div>
  );
}

function Line({ line }: { line: TerminalLine }) {
  if (line.type === "input") {
    return (
      <div className="terminal-line-row">
        <span className="terminal-prompt">
          {PROMPT_USER}@{PROMPT_HOST}:~$
        </span>
        <span className="terminal-input-echo">{line.text}</span>
      </div>
    );
  }
  return (
    <div
      className={
        "terminal-output-line" +
        (line.type === "error" ? " terminal-output-line--error" : "")
      }
    >
      {line.text}
    </div>
  );
}
