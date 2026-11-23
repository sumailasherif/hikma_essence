/**
 * Illustrated perfume bottles, drawn from the colours in data.js.
 * Used for the collection and the scent finder until real photos are added.
 */

let uid = 0;

const SHAPES = {
  // body: x, y, w, h, rx | cap: x, y, w, h, rx | neck: x, y, w, h
  round:   { body: [40, 108, 120, 158, 44], cap: [62, 22, 76, 76, 38], neck: [86, 94, 28, 16] },
  square:  { body: [36, 112, 128, 154, 10], cap: [74, 30, 52, 68, 8],  neck: [88, 96, 24, 18] },
  tall:    { body: [56, 74, 88, 192, 14],   cap: [56, 22, 88, 56, 12], neck: [56, 72, 88, 6] },
  classic: { body: [46, 114, 108, 152, 12], cap: [70, 40, 60, 60, 6],  neck: [86, 98, 28, 18] },
};

const METALS = {
  gold:   ['#8a6322', '#f5df9f', '#d9aa4f', '#7d5a1e'],
  silver: ['#6b7280', '#f1f3f6', '#b7bdc7', '#5b616b'],
};

function capFill(id, cap) {
  return METALS[cap] ? `url(#${id}-metal)` : cap;
}

function metalGradient(id, cap) {
  const stops = METALS[cap];
  if (!stops) return '';
  return `<linearGradient id="${id}-metal" x1="0" x2="1">
    ${stops.map((c, i) => `<stop offset="${i / (stops.length - 1)}" stop-color="${c}"/>`).join('')}
  </linearGradient>`;
}

function labelText(name, cx, cy, color) {
  const words = name.split(' ');
  const lines = words.length > 2 ? [words.slice(0, 1).join(' '), words.slice(1).join(' ')] : words.length === 2 ? words : [name];
  const ink = isLight(color) ? '#2a1a12' : '#fff';
  const start = cy - ((lines.length - 1) * 13) / 2 + 4;
  return `<text x="${cx}" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-size="13" fill="${ink}">
    ${lines.map((l, i) => `<tspan x="${cx}" y="${start + i * 14}">${l}</tspan>`).join('')}
  </text>`;
}

function isLight(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

/** Returns the inner SVG markup for a bottle in a 200×280 box. */
export function bottleMarkup(product) {
  const id = `b${++uid}`;
  const { glass, liquid, cap, label, shape = 'classic', sparkle } = product.bottle;
  const s = SHAPES[shape] ?? SHAPES.classic;
  const [bx, by, bw, bh, brx] = s.body;
  const [cx, cy, cw, ch, crx] = s.cap;
  const [nx, ny, nw, nh] = s.neck;
  const lw = Math.min(bw - 36, 84);
  const lh = 52;
  const lx = bx + (bw - lw) / 2;
  const ly = by + bh * 0.42;

  return `
    <defs>
      <linearGradient id="${id}-glass" x1="0" x2="1">
        <stop offset="0" stop-color="${glass}" stop-opacity=".95"/>
        <stop offset=".5" stop-color="${liquid}"/>
        <stop offset="1" stop-color="${liquid}" stop-opacity=".9"/>
      </linearGradient>
      ${metalGradient(id, cap)}
      ${sparkle ? `<pattern id="${id}-sp" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="3" r=".9" fill="#f6c3cf" opacity=".7"/><circle cx="7" cy="8" r=".7" fill="#fff" opacity=".5"/>
      </pattern>` : ''}
    </defs>
    <ellipse cx="100" cy="270" rx="78" ry="7" fill="#000" opacity=".25"/>
    <rect x="${nx}" y="${ny}" width="${nw}" height="${nh}" fill="${capFill(id, cap)}"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${brx}" fill="url(#${id}-glass)"/>
    ${sparkle ? `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${brx}" fill="url(#${id}-sp)"/>` : ''}
    <rect x="${bx + 9}" y="${by + 12}" width="9" height="${bh - 36}" rx="4.5" fill="#fff" opacity=".28"/>
    <rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="${crx}" fill="${capFill(id, cap)}"/>
    ${shape === 'tall' ? `<rect x="${bx}" y="${by + 30}" width="${bw}" height="10" fill="url(#${id}-metal)"/><rect x="${bx}" y="${by + 50}" width="${bw}" height="6" fill="url(#${id}-metal)" opacity=".8"/>` : ''}
    ${shape === 'square' ? `<path d="M${cx + 6} ${cy + 14}h${cw - 12}M${cx + 6} ${cy + 30}h${cw - 12}M${cx + 6} ${cy + 46}h${cw - 12}" stroke="#7d5a1e" stroke-opacity=".6"/>` : ''}
    ${shape === 'round'
      ? `<circle cx="100" cy="${ly + lh / 2}" r="${lh / 2 + 4}" fill="${label}" opacity=".95"/>
         <circle cx="100" cy="${ly + lh / 2}" r="${lh / 2}" fill="none" stroke="#fff" stroke-opacity=".5"/>`
      : `<rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="4" fill="${label}"/>
         <rect x="${lx + 4}" y="${ly + 4}" width="${lw - 8}" height="${lh - 8}" rx="2" fill="none" stroke="${isLight(label) ? '#b98a35' : '#fff'}" stroke-opacity=".55"/>`}
    ${labelText(product.name, 100, ly + lh / 2, label)}
  `;
}

/** Standalone bottle SVG (collection cards). */
export function bottleSVG(product, className = '') {
  if (product.image) {
    return `<img class="${className}" src="${product.image}" alt="${product.name} bottle" loading="lazy" />`;
  }
  return `<svg class="${className}" viewBox="0 0 200 280" role="img" aria-label="${product.name} bottle">${bottleMarkup(product)}</svg>`;
}

/** Bottle with dotted leader lines to its note pyramid (scent finder). */
export function bottleDiagram(product) {
  const rows = [
    { label: 'Top notes', notes: product.notes.top, y: 64, dot: '#ecc977' },
    { label: 'Heart notes', notes: product.notes.heart, y: 160, dot: '#f2a7b8' },
    { label: 'Base notes', notes: product.notes.base, y: 238, dot: '#d9aa4f' },
  ];

  const leaders = rows.map(({ label, notes, y, dot }) => `
    <line x1="176" y1="${y}" x2="248" y2="${y}" stroke="${dot}" stroke-opacity=".7" stroke-dasharray="3 5"/>
    <circle cx="176" cy="${y}" r="6" fill="${dot}" stroke="#160b0f" stroke-width="2"/>
    <text x="258" y="${y - 6}" font-family="Sora, sans-serif" font-size="10" letter-spacing="1.6" fill="${dot}">${label.toUpperCase()}</text>
    <text x="258" y="${y + 12}" font-family="Sora, sans-serif" font-size="13" fill="#fdf3f2">${notes.slice(0, 2).join(' · ')}</text>
    ${notes[2] ? `<text x="258" y="${y + 29}" font-family="Sora, sans-serif" font-size="13" fill="#fdf3f2" opacity=".7">${notes[2]}</text>` : ''}
  `).join('');

  return `
    <svg viewBox="0 0 440 290" role="img" aria-label="${product.name}: top notes ${product.notes.top.join(', ')}; heart notes ${product.notes.heart.join(', ')}; base notes ${product.notes.base.join(', ')}">
      <circle cx="100" cy="150" r="120" fill="#d9aa4f" opacity=".07"/>
      <svg x="0" y="4" width="200" height="280" viewBox="0 0 200 280">${bottleMarkup(product)}</svg>
      <line x1="10" y1="276" x2="430" y2="276" stroke="#fdf3f2" stroke-opacity=".12"/>
      ${leaders}
    </svg>`;
}
