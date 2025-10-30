# ulti-mate identicon logic flow

> seed → hash → pattern + color → SVG → response

```
[User input (seed: unique username)]
           │
           ▼
   [Hash generator]
   - convert seed to hash
   - output: hexadecimal string
           │
           ▼
   [Pattern generator]
   - determine grid size (default 5x5)
   - map hash bits → on/off cells
   - apply symmetry (mirror horizontally)
           │
           ▼
   [Color generator]
   - extract hue/saturation/lightness from hash
   - generate primary color (e.g. HSL)
           │
           ▼
   [SVG builder]
   - create SVG element
   - draw background
   - draw filled cells based on pattern + color
   - return final SVG string
           │
           ▼
   [Output stage]
   - express route sends `image/svg+xml`
   - or function returns directly
```
