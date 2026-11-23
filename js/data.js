/**
 * Site content lives here, so products, contact details and FAQs
 * can be updated without touching layout code.
 */

export const CONTACT = {
  // International format for wa.me links, no "+" and no leading 0.
  // 0206693766 (Ghana, +233) → 233206693766. Change this if the number is from another country.
  whatsapp: '233206693766',
  phoneDisplay: '020 669 3766',
  snapchat: 'hikmaharuna22',
};

/**
 * Products.
 * - mood:     romantic | bold | fresh | warm | elegant
 * - occasion: everyday | date | work | event
 * - bottle:   colours for the illustrated bottle (used until you add a photo)
 * - image:    optional path to a real product photo, e.g. 'assets/products/black-opium.webp'
 *
 * Check the notes against the supplier or box before going live.
 */
export const PRODUCTS = [
  {
    id: 'black-opium',
    name: 'Black Opium',
    house: 'Yves Saint Laurent',
    family: 'Gourmand · Floral',
    description: 'Coffee and white flowers over soft vanilla. Addictive, glamorous and made for after dark.',
    mood: ['bold', 'romantic'],
    occasion: ['date', 'event'],
    notes: {
      top: ['Pink pepper', 'Pear', 'Orange blossom'],
      heart: ['Coffee', 'Jasmine'],
      base: ['Vanilla', 'Patchouli', 'Cedar'],
    },
    bottle: { glass: '#5a2a3c', liquid: '#2a1520', cap: '#121014', label: '#e0607e', shape: 'round', sparkle: true },
    image: 'assets/products/black-opium.png',
  },
  {
    id: 'ameerat-al-arab',
    name: 'Ameerat Al Arab',
    house: 'Asdaaf',
    family: 'Floral · Amber',
    description: 'A rich, royal floral with a warm amber trail. Graceful, feminine and full of presence.',
    mood: ['elegant', 'romantic'],
    occasion: ['event', 'everyday'],
    notes: {
      // TODO: confirm notes with supplier
      top: ['Bergamot', 'Pink pepper'],
      heart: ['Rose', 'Jasmine'],
      base: ['Vanilla', 'Amber', 'Musk'],
    },
    bottle: { glass: '#7a1328', liquid: '#5c0d1e', cap: 'gold', label: '#d9aa4f', shape: 'square' },
    image: 'assets/products/ameerat-al-arab.jpg',
  },
  {
    id: 'asad-zanzibar',
    name: 'Asad Zanzibar',
    house: 'Lattafa',
    family: 'Spicy · Woody',
    description: 'Black pepper, tobacco and warm vanilla. Confident, smooth and impossible to ignore.',
    mood: ['bold', 'warm'],
    occasion: ['work', 'date'],
    notes: {
      // TODO: confirm notes for the Zanzibar edition
      top: ['Black pepper', 'Pineapple', 'Tobacco'],
      heart: ['Coffee', 'Patchouli', 'Iris'],
      base: ['Vanilla', 'Amber', 'Dry woods'],
    },
    bottle: { glass: '#1f2f5c', liquid: '#18244a', cap: 'silver', label: '#c9ced8', shape: 'tall' },
    image: 'assets/products/asad-zanzibar.jpg',
  },
  {
    id: 'khamrah',
    name: 'Khamrah',
    house: 'Lattafa',
    family: 'Spicy · Gourmand',
    description: 'Cinnamon, dates and praline over warm vanilla and tonka. Golden, spiced comfort that lingers for hours.',
    mood: ['warm', 'elegant'],
    occasion: ['date', 'event', 'everyday'],
    notes: {
      top: ['Cinnamon', 'Nutmeg', 'Bergamot'],
      heart: ['Dates', 'Praline', 'Tuberose'],
      base: ['Vanilla', 'Tonka bean', 'Amberwood'],
    },
    bottle: { glass: '#e9b955', liquid: '#b9772b', cap: 'gold', label: '#fff8ec', shape: 'classic' },
    image: 'assets/products/khamrah.png',
  },
];

/**
 * Spray collection: one name per line, shown A–Z on the site.
 * To add a spray, add its name here. To remove one, delete the line.
 */
export const SPRAYS = [
  'Sharaf Blend',
  'Shamoki',
  'Oud Noir',
  'Qaed Al-Fursan',
  'Luree',
  'Elysia',
  'After 12',
  'Hayati',
  'Explore',
  'Night Club',
  'Oud Madness',
  'Pegasus',
  'Brown Orchid',
  'Scandant by Night',
  'Bad Lad',
  'Cheek',
  'Extremely Unique',
  'Berries Weekend',
  'Invicto',
  'Golden Night',
  'Magie',
  'Noir',
  'Sauve',
  'Ophylia',
  'Dolores',
  'Ur Way',
  'Monarch',
  'Suspenso',
  'Aventos',
  'Toomford',
  'Aventure',
  'Intense Man',
  'Barakkat Lattafa Oud',
  'Oniro',
  'Black Leather',
  'Lavie Bell',
  'Proud of You',
  'Amor',
  'Instant Love',
  'Vanilla Petals',
  'Because I Am With You',
  'Fiero',
  'Vanilla Bouquet',
  'Rose Seduction',
];

/**
 * Photo strip shown in the "Collection" section.
 * Add a real product photo to assets/products/ and list it here.
 */
export const COLLECTION = [
  { name: 'Khamrah', house: 'Lattafa', image: 'assets/products/khamrah.png' },
  { name: 'Khamrah Qahwa', house: 'Lattafa', image: 'assets/products/khamrah-qahwa.png' },
  { name: 'Yara', house: 'Lattafa', image: 'assets/products/yara.png' },
  { name: 'Yara Candy', house: 'Lattafa', image: 'assets/products/yara-candy.png' },
  { name: 'Yara Moi', house: 'Lattafa', image: 'assets/products/yara-moi.png' },
  { name: 'Yara Tous', house: 'Lattafa', image: 'assets/products/yara-tous.png' },
  { name: 'Asad Elixir', house: 'Lattafa', image: 'assets/products/asad-elixir.png' },
  { name: 'Asad Zanzibar', house: 'Lattafa', image: 'assets/products/asad-zanzibar.jpg' },
  { name: 'Ameerat Al Arab', house: 'Asdaaf', image: 'assets/products/ameerat-al-arab.jpg' },
  { name: 'Ameerat Al Arab Sugar Crown', house: 'Asdaaf', image: 'assets/products/ameerat-sugar-crown.png' },
  { name: 'Oud Mood', house: 'Lattafa', image: 'assets/products/oud-mood.png' },
  { name: 'Velvet Oud', house: 'Lattafa', image: 'assets/products/velvet-oud.png' },
  { name: 'Raed Oud', house: 'Lattafa', image: 'assets/products/raed-oud.png' },
  { name: 'Ameer Al Oudh', house: 'Lattafa', image: 'assets/products/ameer-al-oudh.png' },
  { name: 'Eternal Oud', house: 'Lattafa', image: 'assets/products/eternal-oud.png' },
  { name: 'Black Opium', house: 'Yves Saint Laurent', image: 'assets/products/black-opium.png' },
];

export const FAQS = [
  {
    q: 'How do I place an order?',
    a: 'Send us a DM on WhatsApp or Snapchat with the name of the scent. We will confirm the price, availability and delivery details with you directly.',
  },
  {
    q: 'I don\'t know which scent to pick. Can you help?',
    a: 'Of course. Try the scent finder above, or just tell us your mood, the occasion and scents you already love, and we will recommend one.',
  },
  {
    q: 'Can I order a perfume as a gift?',
    a: 'Yes. Every bottle comes boxed, and we can gift-wrap it on request. Just mention it in your message, or switch on "Gift-wrap it" in the finder.',
  },
  {
    q: 'How long will the fragrance last?',
    a: 'Our eau de parfums typically last 8 hours or more on skin, and longer on clothes and scarves. Spray on pulse points (wrists, neck, behind the ears) and avoid rubbing.',
  },
  {
    q: 'Do you deliver?',
    a: 'Yes. Send us your location in your DM and we will confirm delivery options, cost and timing.',
  },
  {
    q: 'How should I store my perfume?',
    a: 'Keep it in its box, away from sunlight, heat and humidity. A drawer or wardrobe is perfect. The bathroom is not.',
  },
];
