import React from "react";
import { cn } from "@/lib/utils";

interface Cena7LogoProps {
  variant?: "light" | "dark";
  className?: string;
  compact?: boolean;
}

/**
 * Logo Oficial Cena7 Móveis e Eventos
 * Bloco tipográfico geométrico à esquerda (#111111 + #8A8A8A),
 * wordmark "CENA" fina elegante, subtítulo "Móveis e Eventos" e "7" em destaque (#E63946).
 */
export function Cena7Logo({
  variant = "light",
  className,
  compact = false,
}: Cena7LogoProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn("inline-flex items-center gap-3 select-none", className)}
      aria-label="Cena7 Móveis e Eventos"
    >
      {/* Bloco tipográfico geométrico "CENA" à esquerda */}
      <svg
        width={compact ? 34 : 40}
        height={compact ? 34 : 40}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Quadrante superior esquerdo */}
        <rect
          x="2"
          y="2"
          width="18"
          height="18"
          rx="1.5"
          fill={isDark ? "#FAF8F5" : "#111111"}
        />
        {/* Quadrante superior direito */}
        <rect x="24" y="2" width="18" height="18" rx="1.5" fill="#8A8A8A" />
        {/* Quadrante inferior esquerdo */}
        <rect x="2" y="24" width="18" height="18" rx="1.5" fill="#8A8A8A" />
        {/* Quadrante inferior direito */}
        <rect
          x="24"
          y="24"
          width="18"
          height="18"
          rx="1.5"
          fill={isDark ? "#2A2A27" : "#111111"}
        />
        {/* Letra C / E / N / A minimalistas no monograma */}
        <text
          x="11"
          y="15"
          textAnchor="middle"
          fill={isDark ? "#141413" : "#FAF8F5"}
          fontSize="10.5"
          fontWeight="600"
          fontFamily="sans-serif"
          letterSpacing="0.05em"
        >
          C
        </text>
        <text
          x="33"
          y="15"
          textAnchor="middle"
          fill="#FAF8F5"
          fontSize="10.5"
          fontWeight="600"
          fontFamily="sans-serif"
          letterSpacing="0.05em"
        >
          E
        </text>
        <text
          x="11"
          y="37"
          textAnchor="middle"
          fill="#FAF8F5"
          fontSize="10.5"
          fontWeight="600"
          fontFamily="sans-serif"
          letterSpacing="0.05em"
        >
          N
        </text>
        <text
          x="33"
          y="37"
          textAnchor="middle"
          fill="#FAF8F5"
          fontSize="10.5"
          fontWeight="600"
          fontFamily="sans-serif"
          letterSpacing="0.05em"
        >
          A
        </text>
      </svg>

      {/* Wordmark CENA + 7 vermelho + subtítulo */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-0.5">
          <span
            className={cn(
              "font-sans font-light tracking-[0.26em] uppercase",
              compact ? "text-lg" : "text-xl sm:text-[22px]",
              isDark ? "text-[#FAF8F5]" : "text-[#111111]"
            )}
          >
            CENA
          </span>
          <span
            className={cn(
              "font-display font-bold italic leading-none -ml-0.5 text-[#E63946]",
              compact ? "text-2xl" : "text-[28px] sm:text-[31px]"
            )}
          >
            7
          </span>
        </div>
        <span
          className={cn(
            "font-sans text-[10px] tracking-[0.18em] uppercase mt-0.5",
            isDark ? "text-[#A1A1AA]" : "text-[#6E6E73]"
          )}
        >
          Móveis e Eventos
        </span>
      </div>
    </div>
  );
}
