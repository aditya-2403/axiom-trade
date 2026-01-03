# Axiom Trade Clone - Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Pixel-perfect UI** matching Axiom Trade's design
- **Real-time updates** with WebSocket simulation
- **Three token categories**: New Pairs, Final Stretch, Migrated
- **Interactive components**: Popover, Tooltip, Modal
- **Advanced sorting** on all columns
- **Loading states**: Skeleton, Shimmer, Progressive loading
- **Error boundaries** for graceful error handling
- **Responsive design** down to 320px width
- **Performance optimized** for Lighthouse scores ≥90

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: CSS transitions & Tailwind
- **Performance**: Memoized components, code splitting

## 📱 Responsive Design

The application is fully responsive and adapts from 320px (mobile) up to 1920px (desktop).

### **Layout Snapshots**

| Device        | Width  | Screenshot                                             | Features                                               |
| ------------- | ------ | ------------------------------------------------------ | ------------------------------------------------------ |
| Mobile        | 320px  | ![Mobile 320px](/screenshots/mobile-320.png)           | Single column, condensed table, touch-friendly buttons |
| Mobile        | 375px  | ![Mobile 375px](/screenshots/mobile-375.png)           | Improved spacing, readable text                        |
| Tablet        | 768px  | ![Tablet 768px](/screenshots/tablet-768.png)           | Two-column layout, expanded table view                 |
| Desktop       | 1024px | ![Desktop 1024px](/screenshots/desktop-1024.png)       | Full table with all columns visible                    |
| Large Desktop | 1440px | ![Large Desktop 1440px](/screenshots/desktop-1440.png) | Expanded view with side panels, optimal spacing        |

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/aditya-2403/axiom-trade.git

# Install dependencies
npm install

# Run development server
npm run dev
```
