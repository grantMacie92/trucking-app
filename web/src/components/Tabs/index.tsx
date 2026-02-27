import { useMemo, useState } from "react";

/**
 * Tailwind-only Tabs (no extra libs)
 *
 * Usage:
 * <Tabs
 *   tabs={[
 *     { id: "map", label: "Map", content: <Map /> },
 *     { id: "list", label: "List", content: <List /> },
 *   ]}
 * />
 */
export default function Tabs({
                                 tabs,
                                 initialTabId,
                                 className = "",
                                 ariaLabel = "Tabs",
                             }) {
    const firstId = tabs?.[0]?.id;
    const defaultId = initialTabId ?? firstId;

    const safeIds = useMemo(() => new Set((tabs ?? []).map((t) => t.id)), [tabs]);
    const [activeId, setActiveId] = useState(
        safeIds.has(defaultId) ? defaultId : firstId
    );

    const activeIndex = Math.max(
        0,
        (tabs ?? []).findIndex((t) => t.id === activeId)
    );

    const onKeyDown = (e) => {
        if (!tabs?.length) return;

        const moveTo = (nextIndex) => {
            const next = tabs[nextIndex];
            if (!next) return;
            setActiveId(next.id);

            // move focus to the newly active tab button
            requestAnimationFrame(() => {
                document.getElementById(`tab-${next.id}`)?.focus();
            });
        };

        switch (e.key) {
            case "ArrowRight":
            case "ArrowDown": {
                e.preventDefault();
                moveTo((activeIndex + 1) % tabs.length);
                break;
            }
            case "ArrowLeft":
            case "ArrowUp": {
                e.preventDefault();
                moveTo((activeIndex - 1 + tabs.length) % tabs.length);
                break;
            }
            case "Home": {
                e.preventDefault();
                moveTo(0);
                break;
            }
            case "End": {
                e.preventDefault();
                moveTo(tabs.length - 1);
                break;
            }
            default:
                break;
        }
    };

    if (!tabs?.length) return null;

    return (
        <div className={className}>
            {/* Tab list */}
            <div
                role="tablist"
                aria-label={ariaLabel}
                onKeyDown={onKeyDown}
                className={[
                    // surface
                    "w-full rounded-2xl border border-white/10 bg-white/5 p-1",
                    // layout
                    "flex items-center gap-1",
                    // subtle depth
                    "shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]",
                    // smooth on dark
                    "backdrop-blur",
                ].join(" ")}
            >
                {tabs?.map((t) => {
                    const isActive = t.id === activeId;

                    return (
                        <button
                            key={t.id}
                            id={`tab-${t.id}`}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${t.id}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActiveId(t.id)}
                            className={[
                                "relative flex-1 rounded-xl px-3 py-2 text-sm font-medium transition",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-0",
                                isActive
                                    ? [
                                        "bg-white/10 text-white",
                                        "shadow-[0_1px_0_rgba(255,255,255,0.10)_inset,0_8px_18px_rgba(0,0,0,0.30)]",
                                        "border border-white/10",
                                    ].join(" ")
                                    : "text-slate-200/80 hover:bg-white/5 hover:text-slate-100",
                            ].join(" ")}
                        >
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Panels */}
            <div className="mt-4">
                {tabs?.map((t) => {
                    const isActive = t.id === activeId;

                    return (
                        <div
                            key={t.id}
                            id={`panel-${t.id}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${t.id}`}
                            hidden={!isActive}
                            tabIndex={0}
                            className={[
                                // panel surface for dark backgrounds
                                "rounded-2xl border border-white/10 bg-white/5 p-4",
                                "text-slate-100",
                                "shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70",
                            ].join(" ")}
                        >
                            {/* Ensure tables don’t inherit weird text colors */}
                            <div className="text-slate-100">
                                {t.content}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}