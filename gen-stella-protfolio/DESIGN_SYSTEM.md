# Design System Documentation: Gen Stella IT

This document serves as the visual and functional reference for all future development on the Gen Stella IT platform. It ensures consistency across pages, components, and user interactions.

---

## 1. Core Visual Identity
The brand identity is **Modern Tech**, characterized by high-contrast dark modes, vibrant gradients, and a "clean professional" aesthetic.

### **Color Palette**
The system uses HSL variables for scalability and Radix UI/shadcn compatibility.

#### **Base Neutral Colors**
| Token | Light Mode (Value) | Dark Mode (Value) | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `hsl(0 0% 100%)` | `hsl(0 0% 3.9%)` | Global page background |
| **Foreground** | `hsl(0 0% 3.9%)` | `hsl(0 0% 98%)` | Primary text color |
| **Muted** | `hsl(0 0% 96.1%)` | `hsl(0 0% 14.9%)` | Secondary text, subtle backgrounds |
| **Border** | `hsl(0 0% 89.8%)` | `hsl(0 0% 14.9%)` | Component outlines, separators |

#### **Brand Accents & Gradients**
- **Primary Accent**: A vibrant Blue-to-Purple gradient.
  - **CSS:** `bg-gradient-to-r from-blue-600 to-purple-500`
  - **Usage:** Logo, primary CTAs, active navigation states.
- **Success/Info/Warning**: Standard Tailwind palette (`emerald-500`, `sky-500`, `amber-500`).

---

## 2. Typography
The project utilizes the **Geist** font family for its high readability and technical feel.

- **Primary Font**: `Geist` (Sans-serif)
- **Monospace Font**: `Geist_Mono` (Used for code snippets or technical IDs)

### **Type Scale**
| Element | Size | Weight | Tracking |
| :--- | :--- | :--- | :--- |
| **H1 (Hero)** | `text-4xl` to `text-6xl` | `font-extrabold` | `tight` |
| **H2 (Section Heading)** | `text-3xl` | `font-bold` | `tight` |
| **H3 (Subheading)** | `text-xl` | `font-semibold` | `normal` |
| **Body (Default)** | `text-base` | `font-normal` | `normal` |
| **Nav/UI Labels** | `text-sm` | `font-medium` | `wide` |

---

## 3. Component Standards
All components follow the **shadcn/ui** design philosophy: Accessible, unstyled by default, and styled with Tailwind utility classes.

### **Surfaces & Borders**
- **Corner Radius**: 
  - `0.5rem` (8px) for standard cards/buttons.
  - `1rem` (16px) for large containers or section wrappers.
- **Glassmorphism**: 
  - **Navbar/Header**: `backdrop-blur-md` with `bg-background/80` transparency.
  - **Hover States**: Subtle `0.05` to `0.1` opacity shifts.

### **Inputs & Buttons**
- **Default Height**: `h-10` (40px).
- **Transitions**: Every interaction should use `transition-all duration-200`.
- **Primary Button**: Solid high-contrast background with the brand gradient on specific marketing CTAs.

---

## 4. Layout & Spacing
A 12-column grid system is used via Tailwind’s `grid` and `flex` utilities.

- **Maximum Width**: `max-w-7xl` (1280px) for inner content containers.
- **Horizontal Padding**: 
  - Mobile: `px-4`
  - Tablet/Desktop: `px-6` to `px-8`
- **Section Spacing**: 
  - Vertical: `py-12` (Initial) up to `py-24` (Desktop) for distinct section separation.

---

## 5. Motion & Interaction
Animations are a core part of the "Stella" (Star/Space) theme.

### **Motion Language (`lib/animations.ts`)**
- **Entry Animations**: Prefer `framer-motion`.
  - **Fade In + Slide Up**: `opacity: 0, y: 20` $\rightarrow$ `opacity: 1, y: 0`.
- **Timing**: 
  - **Standard**: `0.3s` duration.
  - **Staggered**: `0.1s` delay between child elements (e.g., service cards).
- **Hover Effects**: 
  - **Cards**: Slight scale up (`scale-105`) and increased shadow intensity.
  - **Links**: Underline slide-in or color transition to brand primary.

---

## 6. Implementation Checklist
When designing a new page or component:
1. [ ] **Theme Check**: Does it support both Light and Dark modes?
2. [ ] **Accessibility**: Does it meet WCAG contrast ratios and use Radix UI primitives?
3. [ ] **Responsiveness**: Is it mobile-first? (`flex-col md:flex-row`)
4. [ ] **Performance**: Are images optimized using `next/image` with proper `sizes`?
5. [ ] **Continuity**: Does it use the defined `Geist` font and standard HSL variables?
