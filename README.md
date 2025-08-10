# HF Inductor & Transformer Designer

A lightweight, browser-based tool for designing **inductors** and **transformers** for high-frequency applications.  
Built with **React + TypeScript + Vite** — no backend required.

---

## Features
- 📐 **Custom Design Inputs** – Core shape, material, window area, turns, frequency, current, and more.
- 📊 **Real-time Calculations** – Inductance, flux density, copper loss, core loss.
- 📈 **Waveform Factors** – Automatic waveform-based RMS calculations.
- 💾 **Save in Browser** – Designs stored locally via IndexedDB or localStorage.
- 📤 **Export to Excel** – Generate `.xlsx` files for documentation and sharing.
- ⚡ **Fast & Offline** – Works entirely in your browser, no internet required after load.

---

## Tech Stack
- **Vite** – Lightning-fast development & build tooling.
- **React** – UI components and state management.
- **TypeScript** – Type-safe calculations & clean code.
- **SheetJS** – Excel export.
---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/hf-inductor-designer.git

# 2. Install dependencies
cd hf-inductor-designer
npm install

# 3. Start development server
npm run dev
