# Flashblocks Timeline

A lightweight WordPress block plugin that renders a vertical timeline. Two blocks — a parent container and a child story — compose together to create the layout. All content inside each story uses **core blocks** (image, heading, paragraph, etc.) via InnerBlocks.

## Quick start

```bash
npm install
npm run build    # production build
npm run start    # watch mode for development
```

Both scripts pass `--blocks-manifest` to `wp-scripts`, which auto-generates `build/blocks-manifest.php`. The plugin lives in `mu-plugins/` so it's always active — no activation step needed.

## Architecture

```
flashblocks-timeline/
├── flashblocks-timeline.php          # Plugin entry — registers blocks from build/blocks-manifest.php
├── package.json                      # wp-scripts + 3 WP dependencies, nothing else
├── src/
│   ├── timeline/                     # Parent block
│   │   ├── block.json                # flashblocks/timeline — apiVersion 3
│   │   ├── index.js                  # Registration + style/editor imports
│   │   ├── edit.js                   # Editor component (InnerBlocks + color sidebar)
│   │   ├── save.js                   # Static save (CSS vars on wrapper)
│   │   ├── style.scss                # Frontend: vertical line, layout, responsive
│   │   ├── editor.scss               # Editor-only: dashed outline
│   │   └── components/
│   │       └── color-control.js      # Reusable ColorPalette wrapper
│   └── timeline-story/               # Child block
│       ├── block.json                # flashblocks/timeline-story — parent-locked
│       ├── index.js                  # Registration + style/editor imports
│       ├── edit.js                   # Editor component (RichText date + InnerBlocks content)
│       ├── save.js                   # Static save
│       ├── style.scss                # Frontend: 3-column grid, dot, label, content styling
│       └── editor.scss               # Editor-only: hover outline
└── build/                            # Generated — do not edit
```

## Blocks

### `flashblocks/timeline` (parent)

The outer container. Renders a vertical red line and holds story children.

| Attribute   | Type   | Default   | Description                          |
|-------------|--------|-----------|--------------------------------------|
| `lineColor` | string | `#c1272d` | Color of the vertical line           |
| `dotColor`  | string | `#c1272d` | Color of dots and "+" icon badges    |

**Provides context** to children:
- `flashblocks/timeline-lineColor`
- `flashblocks/timeline-dotColor`

**Sidebar controls:** Line Color and Dot Color pickers (uses theme palette via `ColorPalette`).

**Allowed children:** Only `flashblocks/timeline-story`.

**Default template:** Two stories pre-populated with dates "Early 1970s" and "Late 1970s".

### `flashblocks/timeline-story` (child)

A single entry on the timeline. Cannot be inserted outside a Timeline parent (`parent` constraint in block.json).

| Attribute | Type   | Default | Description                                    |
|-----------|--------|---------|------------------------------------------------|
| `date`    | string | `""`    | Date/era label shown left of the line          |

**Uses context:** Reads `lineColor` and `dotColor` from parent.

**Inner content (core blocks):** Each story uses InnerBlocks with this default template:
1. `core/image` — photo for this era
2. `core/heading` (h3) — story title
3. `core/paragraph` — description text

Allowed blocks: `core/image`, `core/heading`, `core/paragraph`, `core/group`, `core/buttons`.

## Layout & CSS

The visual layout is a **3-column CSS grid** per story:

```
[ date label + icon ]  [ dot ]  [ content (image, heading, paragraph) ]
       30%              18px              1fr
```

The vertical line is a `::before` pseudo-element on `.fb-timeline__stories`, positioned at the 30% column boundary.

### CSS custom properties (set on `.fb-timeline`)

| Property                     | Default   | Controls                     |
|------------------------------|-----------|------------------------------|
| `--fb-timeline-line-color`   | `#c1272d` | Vertical line color          |
| `--fb-timeline-dot-color`    | `#c1272d` | Dot, icon badge, box-shadow  |
| `--fb-timeline-dot-size`     | `18px`    | Dot diameter                 |
| `--fb-timeline-line-width`   | `3px`     | Line thickness               |
| `--fb-timeline-gap`          | `3rem`    | Vertical spacing between stories |

### BEM class reference

| Class                          | Element                              |
|--------------------------------|--------------------------------------|
| `.fb-timeline`                 | Parent wrapper                       |
| `.fb-timeline__stories`        | Inner container (holds children + line) |
| `.fb-timeline-story`           | Single story wrapper (grid container)|
| `.fb-timeline-story__label`    | Left column: date + icon badge       |
| `.fb-timeline-story__date`     | Date text (RichText)                 |
| `.fb-timeline-story__icon`     | Red "+" badge next to date           |
| `.fb-timeline-story__dot`      | Circle on the line                   |
| `.fb-timeline-story__content`  | Right column: InnerBlocks area       |

### Responsive behavior

At `≤ 768px` the grid collapses:
- Line shifts to `left: 20px`
- Date label spans full width above content
- Dot + content stack in a 2-column `40px 1fr` grid

## How the PHP works

`flashblocks-timeline.php` is minimal — a single `init` hook:

```php
function flashblocks_timeline_block_init() {
    wp_register_block_types_from_metadata_collection(
        __DIR__ . '/build',
        __DIR__ . '/build/blocks-manifest.php'
    );
}
add_action( 'init', 'flashblocks_timeline_block_init' );
```

This is the WP 6.8+ approach: `blocks-manifest.php` (auto-generated by `--blocks-manifest`) maps block names to their `block.json` paths so WordPress can register all blocks in one call. No manual `register_block_type()` per block needed.

## Dependencies

Zero third-party libraries. Only `@wordpress/blocks`, `@wordpress/block-editor`, and `@wordpress/i18n` from the WP package. Build tooling is `@wordpress/scripts`.

## Extending

**Add a new story variant:** Add attributes to `timeline-story/block.json`, read them in `edit.js`/`save.js`, style in `style.scss`.

**Add more core blocks to stories:** Edit the `ALLOWED_BLOCKS` array in `timeline-story/edit.js`.

**Change the line position:** Adjust the `30%` value in both `timeline/style.scss` (`.fb-timeline__stories::before { left: 30% }`) and `timeline-story/style.scss` (`grid-template-columns: 30% ...`).
