# Honey & Thread — Anewgam / The First Teapot v0.2

A small standalone static game room, added without replacing any existing Anewgam route. Open `/honey/`. No install, API key, runtime AI, account or backend is needed for the game. Browser saves are local; export carries a garden between devices.

## A → B → C

**A · Board Game Bible.** The complete rules and component list live in the A tab. Nineteen hexes, three shared bee actions per day, Plant → Forage → Brew → Belong. One new flower and three welcoming cups complete the cooperative garden. Invalid actions cost nothing; closed-browser time has no gameplay cost.

**B · Baer.** A complete character and encounter sheet. Potato, Turnip, Blubaer, purple, yellow and red are six cosmetic forms of the same mutable root-monster, not moral ranks. Giving space, avoiding the occupied patch and offering nectar are explicit options. Completing the garden never requires befriending Baer.

**C · Story progression.** Four short, gated scenes with two choices each: Gen2 arrival → Gen22 root → Belong chair → Everfallen landing. Choices create local journal entries. The twenty-two-beat outline is future story structure, not twenty-two shipped levels. Knight combat is not implemented here.

## Skein Doll

The Skein tab explains the Saelion/Saedo/Skein/Guardian/projection boundaries and links the owner architecture entrypoint. It shows actual local game events and story choices, explicitly labelled editable game data, not signed canonical receipts. This room has no live operational connection, authority grant or worker launcher.

The art-lineage tab distinguishes concept images from implementation. Raw uploaded portraits, operational records, credentials and the private source-art archive are not published. The public board is functional SVG drawn in code. The separate offline illustrated working edition embeds selected generated concept previews.

## Source lineage and verification

Core logic is retained byte-for-byte from the recovered Honey/Dora v0 candidate. The new UI, notebook and story journal are authored for v0.2. Exact source readback at code commit `60410782dba28d279e41dfb63caf7aecf3805294`:

- `core.js`: Git blob `ba717b4cd1a90b1f0247c71facfd82a2e7dc166a`
- `index.html`: Git blob `9371eaa30ee03d94f165ac25ec1d63e3bdc587ed`
- `app.js`: Git blob `ed000b4e35e65087b2e4a420fecdb9a4a3857521`
- `notebook.js`: Git blob `9ef5b4565db7cea632489be8b53541beb3e8dc19`

All four matched the locally tested bytes. Eleven recovered Node rule tests passed, including 100 seeded ten-action teaching replays and 2,000 legal-action invariant transitions. Twelve Chromium interaction checks passed: actual keyboard/pointer actions, all cosmetic palettes/coats preserving board state, completion without invitation, four story gates/choices, local Skein display, complete A–C views, a real export download and confirmed import, rejection of an invalid board save, accessible symbol mode and no page overflow at 390px. No page JavaScript errors or external runtime requests were observed in that test.

**Scope of browser evidence:** headless Chromium 144.0.7559.96, with `set_content` loading after the environment administrator blocked loopback navigation. No browser policy was changed. True-origin reload persistence, physical Blevodesk/phone play, independent review, physical-piece safety and commercial game balancing are not yet proved. The Vercel preview returned HTTP 200 through the connected deployment reader; that is not a browser gameplay test or proof of anonymous public access.

## Run and recover

Serve this directory with any static host, or build a single-file HTML by inlining the three JavaScript files in script-tag order. Keep script and notebook data from trusted source; imported saves are data, never code. The rule engine is CommonJS-compatible for Node tests and browser-compatible as `HoneyCore`.

Keys: `anewgam-honey-thread-v02` and `anewgam-honey-thread-prefs-v02`. Export includes the game, visual preferences and story journal. The importer also accepts the older v1 core save. A reset asks for confirmation; export first to retain another garden.

Rollback: revert the additive Honey merge commit. Existing routes, manifest, site scripts and save keys were not edited. No home-system host was installed or changed by publishing these static files.

The optional future native development checkout belongs on Blevitude. ChromeNAS may store backups, not the active application runtime. Deeper integration into the existing Peachfall game and the separate dry-material Knight study remain distinct workstreams, not implied by this static release.
