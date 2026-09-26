import localFont from "next/font/local";

/**
 * Both families are self-hosted so next/font can compute a size-adjusted
 * fallback face from the actual file (§4.3 #1). Google's loader emitted no
 * fallback metrics for Fraunces, which would have let the swap move layout.
 */

/** Display: Fraunces (OFL). Latin subset with opsz, wght, SOFT and WONK axes. */
export const fraunces = localFont({
  src: "../fonts/Fraunces-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

/** Text: Switzer (Indian Type Foundry, ITF Free Font Licence). Upright only until the deck needs italics. */
export const switzer = localFont({
  src: "../fonts/Switzer-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-switzer",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
