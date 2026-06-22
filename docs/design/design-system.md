# Design System — kmubook Studio Sites

**Stand:** 2026-06-19 | **Implementierung:** `web/src/app/globals.css`, `web/src/components/site/`

## Prinzipien

1. **Liquid Glass light** — nur Navigation, Cards, CTAs (`glass-nav`, `glass-card`)
2. **Solide Lesbarkeit** — Body-Text auf `bg-white/80`, nie Glass-on-Glass
3. **Mobile First** — Sticky Nav, Thumb-friendly Buttons
4. **Zwei Templates** — `salon_luxe`, `care_calm`, `salon_solo`

## Design Tokens (CSS Variables)

| Token | Verwendung |
|---|---|
| `--studio-primary` | Buttons, Akzente |
| `--studio-secondary` | Hintergrund-Tints |
| `--studio-surface` | Page Background |
| `--studio-hero-gradient` | Hero Section |
| `--font-display` | Cormorant Garamond |
| `--font-body` | Inter |

## Komponenten

| Komponente | Pfad | Glass |
|---|---|---|
| SiteNav | `components/site/SiteNav.tsx` | ✅ |
| SiteFooter | `components/site/SiteFooter.tsx` | ❌ |
| HeroSection | `components/site/HeroSection.tsx` | Gradient |
| ServiceGrid | `components/site/ServiceGrid.tsx` | Cards |
| TeamGrid | `components/site/TeamGrid.tsx` | Cards |
| BookingWizard | `components/booking/BookingWizard.tsx` | Cards |
| ContactBlock | `components/site/ContactBlock.tsx` | Cards |

## Utility Classes

- `.btn-primary` — CTA, `border-radius: full`
- `.btn-ghost` — Secondary CTA
- `.section-title` — Display Font, 3xl–4xl
- `.glass-nav` / `.glass-card` — backdrop-blur

## WCAG

- Text-Kontrast auf soliden Flächen ≥ 4.5:1
- Glass nur für dekorative UI-Chrome
- Fokus-States auf interaktiven Elementen (Browser-Default + sichtbare Borders)
