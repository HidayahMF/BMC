# TODO

## Font Migration: Rajdhani ➜ Inter Variable (Navbar & Home)
- [ ] Update global font setup to use local Inter Variable TTF and set `font-family: 'Inter', sans-serif` as primary.
- [ ] Remove Rajdhani imports/usages from `frontend/src/components/Navbar.jsx`.
- [ ] Update Navbar typography weights/hierarchy + natural letter-spacing; keep layout/colors/animations unchanged.
- [ ] Remove Rajdhani references from `frontend/src/sections/Home.jsx` (including inline styles and injected `<style>` imports).
- [ ] Ensure Hero/Section/Body/Button font weights match requirements (Hero 700-800, Section 700, Navbar 600, Body 400-500, Buttons 600).
- [ ] Adjust letter-spacing: remove/replace overly tracking/widest where used for Rajdhani; use subtle natural values.
- [ ] Validate responsive behavior (desktop/tablet/mobile) after font changes.
- [ ] Run dev build/lint if available to ensure no breaking changes.

