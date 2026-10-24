# STRATINK™ clickable prototype (local demo)
Static HTML/CSS/vanilla JS, hash routing, state in localStorage. All data is sample data. Not published.
Preview: `cd /workspace && python3 -m http.server 8080` → http://localhost:8080/stratink-app/index.html (`?demo=resident` or `?demo=council` skips join; codes DEMO-4821 / COUNCIL-DEMO).

## Languages (English-only for now)
The i18n structure is kept so languages can be re-added:
1. In `app.js`, add a locale object to `S` keyed like `en` (e.g. `fr:{...}`); missing keys fall back to English.
2. Add it to `LANGS`; for right-to-left locales add the code to `RTL` — `route()` sets `<html lang dir>` automatically.
3. Re-add a language picker that sets `st.lang` (and optionally a `?lang=` param), and mark machine translations "Draft translation, needs review".
CSS uses logical properties (`text-align:start`, `margin-inline-end`) and `[dir=rtl]` rules for the back chevron and timeline, so layouts mirror without extra work.
