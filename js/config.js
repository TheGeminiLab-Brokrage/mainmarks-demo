/* ------------------------------------------------------------------
   Main Marks Development — per-client configuration.
   THE only file that should change between clients.

   Every figure below is quoted from a page of Main Marks' own material,
   named in `source`. Nothing here is invented. Where a value has not
   been supplied yet it is absent, and the screen shows one fact fewer.

   See BRANDING.md for where each colour and typeface came from.
   ------------------------------------------------------------------ */

const CONFIG = {

  /* Bumped on every deploy, and matched by the ?v= on every script tag in
     the HTML. That pair is what stops a returning phone running yesterday's
     JavaScript. See README, "Deploying". */
  build: 83,

  /* Where the activity log is sent. Empty = kept on the device only, which
     is where it is today. Filling this in is the whole change when the
     database is stood up. */
  activity: { url: '', key: '' },

  company: {
    name:    'MAIN MARKS',
    nameAr:  'مين ماركس',
    full:    'Main Marks Development',
    tagline: 'Bespoke Experiences',
    line:    'Main Marks unites Emirati precision and Egyptian heritage to create timeless destinations of luxury and value.',
    source:  'h:rs brochure p.4 (MAIN MARKS / BESPOKE EXPERIENCES)',
    wordmark: 'img/mainmarks-wordmark.svg'
  },

  /* --- Master brand palette -----------------------------------------
     Measured from mainmarks.com computed styles and from clean rendered
     areas of the brochure. Black and white carry 85-95% of any screen;
     orange is a signal, never a surface. ---------------------------- */
  brand: {
    ink:      '#000000',   /* corporate black: hero, header, footer     */
    deep:     '#001516',   /* the very dark corporate surface on the web */
    graphite: '#141414',   /* elevated dark panels                       */
    white:    '#FFFFFF',
    muted:    '#8B8989',   /* secondary copy. A tint between the CI's two greys (#565656, #C0BDBD, PDF p.25; tints allowed p.27). 5.3:1 on the cards — the CI asks for 4.5:1 (p.21); the old #74787C gave 4.1 */
    muted2:   '#807E7E',   /* tertiary labels, 4.6:1 on the cards (old #69727D: 3.8) */
    orange:   '#F7951E'    /* CTA text, underlines, active state, rails.
                              The Main Marks CI, PDF p.26 (Accent colours):
                              RGB 247 149 30. Was #F89621, measured off
                              the web before the CI arrived.            */
  },

  /* Manrope is named in BOTH brand books: the Main Marks secondary face
     (CI PDF p.30) and the Moray PRIMARY face (Moray CI PDF p.35). Neither book
     names Nexa, so it is no longer asked for. The Main Marks headline
     face is Gold Lines Serif (CI PDF p.29) — embedded in their own file as a
     TRIAL font, so it is not used here until they confirm a licence.
     Arabic, when it comes, is Noto Kufi Arabic (CI PDF p.31, Google Fonts). */
  type: {
    corporate: "'Manrope', system-ui, sans-serif",
    project:   "'Manrope', system-ui, sans-serif",
    utility:   "'Manrope', system-ui, sans-serif",   /* was Hanken Grotesk — not in the CI */
    substitute: true,
    real:      'Gold Lines Serif'
  },

  /* --- The projects --------------------------------------------------
     Main Marks names its projects "Marks of Distinction". Moray is the
     1st, h:rs is the 2nd. Moray is OPEN (ready:true) — the one
     project the contract buys; h:rs is out of scope and ready:false. A project with ready:false is shown and cannot be opened.
     Launching Moray is this flag plus its inventory. No code changes.
     The list sorts them by their Mark number — Moray, the 1st, first,
     as the one being built.                                           */
  projects: [
    {
      id:      'hrs',
      name:    'h:rs',
      short:   'h:rs',
      full:    'h:rs — Business Hub',
      mark:    '2nd Mark of Distinction',
      kind:    'Business hub · Mixed use',
      promise: 'Every Hour Counts',
      place:   'South 90 Street, New Cairo',
      blurb:   'A purpose-built business destination bringing administrative, clinical and commercial uses into one hub.',
      logo:    'img/hrs-logo.png',
      /* The night render off brochure p.26, pulled from the PDF as the
         FULL placed image (1385x1035) rather than the crop the page
         prints — the brochure frame cuts the tree and the road, and the
         app needs the whole picture to fill a plate. Extracted with
         `pdfimages -png -f 14`, encoded 4:4:4 so the illuminated h:rs
         signage stays crisp. See BRANDING.md. */
      render:  'img/hrs-render-night.jpg',
      render2: 'img/hrs-render-sunset.jpg',
      render3: 'img/hrs-render-day.jpg',

      /* --- The mark, and where it is cut ------------------------------
         Tapping this project's card assembles its logo out of its own
         parts before the page opens. See "the mark builds itself" in
         brand.js and in styles.css.

         `src` is the logo Main Marks supplied
         (HRS-Logo-Exact-Transparent.png), cropped to the mark and
         otherwise untouched — verified pixel for pixel against the
         supplied file, so every fragment on screen is their own
         artwork and nothing has been traced or redrawn.

         `cut` is where the eight fragments are divided, as fractions
         of that file. These were MEASURED off its alpha channel, not
         estimated: xStem is the column where the h's stem ends and its
         shoulder begins, xRStem the same for the r, and so on. The
         eight rectangles they describe tile the whole file with no gap
         and no overlap — which is what guarantees that assembled they
         are the logo EXACTLY, and why no fragment can be a shape the
         logo does not contain.

         A project without this block simply opens the way any other
         link does. */
      markBuild: {
        src:   'img/hrs-mark-build.png',
        ratio: '2416 / 952',
        /* Main Marks' own pillar device, brochure p.18 ("Our Pillars"),
           cut out of that page one colour at a time and repainted in
           the palette below — the brochure is CMYK and prints the blue
           at #3858A8 against the #3B54A3 of the brand sheet. Rebuilt
           with scripts/cut-pillar-mark.js. Stacked, they are the
           artwork exactly. */
        pillars: {
          work:    'img/hrs-pillar-work.png',     /* blue,   first  */
          engage:  'img/hrs-pillar-engage.png',   /* yellow, second */
          connect: 'img/hrs-pillar-connect.png'   /* red,    third  */
        },
        cut: {
          xStem:      0.087334,   /* h: stem | shoulder                */
          xColon:     0.325952,   /* h | colon                         */
          xR:         0.478270,   /* colon | r                         */
          xRStem:     0.611755,   /* r: stem | shoulder                */
          xS:         0.748551,   /* r | s                             */
          yColon:     0.667542,   /* colon: upper square | lower square */
          yS:         0.633403    /* s: upper section | lower section  */
        }
      },
      /* The review model of the complex, turnable and tappable. Absent
         for a project that has none, and the link simply does not show. */
      model3d: 'model.html',

      masterplan: {
        img: 'img/hrs-masterplan.jpg',
        /* The five buildings the client's own masterplan prints, and
           where each one sits on it. Coordinates are FRACTIONS of the
           image (0-1), so they survive any resize, and they were traced
           on the drawing and checked by eye at every zoom.

           APPROXIMATE, and the app says so. Two reasons: this is a crop
           of a brochure page rather than the full-resolution master plan,
           and the render draws HB and HA as one continuous roof with no
           line between them — so the boundary between those two is
           placed midway between their printed labels. Main Marks' own
           master plan file replaces these, and the unit-level pins can
           only be traced on that file. */
        buildings: ['HA', 'HB', 'HC', 'HD', 'HE'],
        hotspots: [
          { id: 'HD', points: [[0.134, 0.212], [0.267, 0.212], [0.267, 0.792], [0.222, 0.840], [0.134, 0.840]] },
          { id: 'HC', points: [[0.328, 0.205], [0.482, 0.205], [0.482, 0.375], [0.455, 0.418], [0.328, 0.418]] },
          { id: 'HB', points: [[0.520, 0.205], [0.655, 0.205], [0.655, 0.425], [0.520, 0.425]] },
          /* HA's roof is cut by the diagonal walkway at its bottom-right,
             so it is a five-sided shape, not a box — checked by lighting
             every hotspot at once and looking at the drawing. */
          { id: 'HA', points: [[0.660, 0.205], [0.878, 0.213], [0.878, 0.295], [0.772, 0.423], [0.660, 0.425]] },
          { id: 'HE', points: [[0.302, 0.668], [0.332, 0.650], [0.880, 0.650], [0.880, 0.868], [0.302, 0.868]] }
        ],
        source: 'h:rs brochure p.31 (Master Plan & Floor Plans)',
        traced: 'approximate'
      },
      /* The floors the kit draws, in order. Each is a sheet, not yet a
         set of pinned units. */
      floors: [
        { id: 'street',  name: 'Street Level Floor', img: 'img/hrs-plan-street.jpg', legend: ['Retail', 'Pharmacy'], source: 'brochure p.32' },
        { id: 'ground',  name: 'Ground Floor',       img: 'img/hrs-plan-ground.jpg', legend: ['F&B', 'Showroom', 'Retail', 'Pharmacy'], source: 'brochure p.33' },
        { id: 'first',   name: 'First Floor',        img: null, legend: ['F&B', 'Showroom', 'Clinic', 'Admin'], source: 'brochure p.34' },
        { id: 'typical', name: 'Typical Floors',     img: null, legend: ['Clinic', 'Admin'], source: 'brochure p.35' }
      ],
      /* Straight from the brochure's Unit Types spread. Read at full
         resolution off p.36-37: the contact-sheet reading of the same
         page gave three different numbers, which is why the playbook
         says to judge a drawing only at full size. */
      kinds: [
        { id: 'admin',      name: 'Administrative', units: 317, from: 33, to: 222, colour: 'work',    pillar: 'Work' },
        { id: 'clinic',     name: 'Clinical',       units: 92,  from: 36, to: 224, colour: 'neutral', pillar: null },
        { id: 'commercial', name: 'Commercial',     units: 44,  from: 34, to: 719, colour: 'engage',  pillar: 'Engage' }
      ],
      kindsSource: 'h:rs brochure p.36-37 (Unit Types)',
      /* `v` is the figure as the brochure prints it, and stays that way
         — it is the quoted value and BRANDING.md cites it. `s` is the
         short form the project CARD shows: same number, without the
         feddan conversion and the percentage. Nothing is derived or
         invented here; one is simply a trim of the other. */
      facts: [
        { k: 'Land area',          v: '11,003 m² (2.62 feddan)',        s: '11,003 m²' },
        { k: 'Building footprint', v: '4,000 m² (0.95 feddan) — 36.4%', s: '4,000 m²' },
        { k: 'Landscape',          v: '7,003 m² (1.67 feddan) — 63.6%', s: '7,003 m²' },
        { k: 'Units',              v: '453 across three uses',          s: '453 across three uses' }
      ],
      factsSource: 'h:rs brochure p.26-27 (Land Use); unit total is the sum of p.36-37',
      /* The project's own colour system. Red/yellow/blue are the three
         pillars, and they CODE CONTENT — they are not decoration and they
         never carry body copy.
         OPEN with the client: the brochure gives no pillar colour for the
         clinical units. They are neutral here rather than given an
         invented fourth colour. */
      colour: {
        black:  '#000201',
        connect: '#ED1C24',   /* Connect  — community, movement        */
        engage:  '#F2E800',   /* Engage   — commercial, retail         */
        work:    '#3B54A3'    /* Work     — administrative, focus      */
      },
      pillars: [
        { id: 'connect', name: 'Connect', line: 'Community, meetings and the retail streets between the buildings.' },
        { id: 'engage',  name: 'Engage',  line: 'The commercial and retail experience: cafés, stores and daily services.' },
        { id: 'work',    name: 'Work',    line: 'The administrative core — offices built for focus and efficiency.' }
      ],
      pillarsSource: 'h:rs brochure p.18-21 (Our Pillars / Connect / Engage / Work)',

      /* --- Inventory -------------------------------------------------
         A DEMO book today. Real counts and real size ranges from the
         brochure; every price, discount and status invented. See
         scripts/make-demo-inventory.js.

         Swapping to Main Marks' own sheet is THIS BLOCK and nothing
         else: point `url` at
           https://docs.google.com/spreadsheets/d/<ID>/gviz/tq?tqx=out:csv
         and set demo:false. The reader validates the header row and
         refuses anything that is not the inventory. */
      inventory: {
        url: 'demo/hrs-inventory-DEMO.csv',
        demo: true,
        demoNote: 'Every price, discount and availability here is invented, so the app can be used before Main Marks sends the real sheet. The unit counts and size ranges are the brochure’s own.'
      },

      /* --- Payment plans ---------------------------------------------
         DEMO. Main Marks has not sent theirs. The shape is what their
         answers drop into: down payment, term, frequency, milestones.
         The ENGINE (js/plans.js) is not demo — it derives and foots. */
      plansDemo: true,
      plans: [
        { id: 'p10', label: '10% down · 5 years', down: 0.10, years: 5, every: 3 },
        { id: 'p15', label: '15% down · 7 years', down: 0.15, years: 7, every: 3 },
        { id: 'p20', label: '20% down · 8 years', down: 0.20, years: 8, every: 3 }
      ],
      terms: {
        instalmentEvery: 3,          /* months between instalments        */
        downOn: 'discounted',        /* the down payment is a share of the
                                        DISCOUNTED price. Clients answer
                                        this both ways — Main Marks has
                                        not answered it yet.             */
        deliveryMonths: 36,
        maintenance: { pct: 0.08, on: 'list', dueMonthsBeforeDelivery: 6, label: 'Maintenance deposit' },
        extras: []                   /* nothing supplied; nothing shown   */
      },

      brokerages: [],       /* the companies list       -> activity capture */

      /* OUT OF SCOPE since 2026-09-24: the contract buys ONE project and
         it is Moray. h:rs is shown as Coming soon and cannot be opened.
         Everything above is kept, not deleted — it is a sold extra
         project away from coming back, and flipping this is the whole
         change. */
      ready: false
    },
    {
      id:      'moray',
      name:    'Moray',
      short:   'Moray',
      full:    'Moray',
      mark:    '1st Mark of Distinction',
      kind:    'Mixed use',
      /* Every line below is the Moray brochure (Digital Brochure, 58 pp —
         the same file as Moray-Brochure.pdf). Its printed folio runs ONE
         BEHIND the PDF page; pages here are PDF pages. */
      promise: 'The new mark of the city',          /* PDF p.58          */
      place:   'North 90th Street, New Cairo',      /* PDF p.10, p.14    */
      blurb:   'Fourteen buildings of offices, clinics and serviced apartments, over street-level retail.',  /* PDF p.14 */
      /* The render off the Moray deck, printed page 11 — the whole placed
         image (1890x1204), copied out of the PDF as its own JPEG with no
         re-encoding. Watch the page numbering: the deck's printed folio
         runs one BEHIND the PDF page, so printed 11 is PDF page 12.

         It is a CONCEPT image from an ARC 5 design deck, not a verified
         approved visual — same caveat as the h:rs renders. See
         BRANDING.md. */
      render:  'img/moray-render.jpg',
      renderSource: 'Moray brochure, printed p.11 (PDF p.12)',

      /* THE AERIAL, on the product-line chooser (build 39, Muhanad's
         request). A night aerial of the whole complex with the lights
         off; hovering a line's card fades in the SAME picture with that
         line's buildings lit, so the salesperson sees where it is.

         Both files are Muhanad's, made in Codex (2026-09-29) — NOT from
         Main Marks. Checked: identical 1672 x 941 and pixel-aligned; the
         lit one differs ONLY on its buildings (a difference image is
         black everywhere else), so the fade moves nothing else. Converted
         to WebP q86 (2.6 MB PNG -> 300 KB) and re-checked after.

         Which buildings: the brochure's first-floor plan (PDF p.20) marks
         the two Clinics blocks — the top-left and right blocks — and those
         are exactly the two the Wellness image lights. A line with no
         `lit` image simply does not light; nothing is drawn in its place. */
      aerial: { img: 'img/moray-aerial.webp',
                source: 'Night aerial made in Codex from Moray imagery (not a Main Marks file)' },

      /* The wordmark is lifted as vector outlines off the Moray CI, p.18
         (Brand logo) — scripts/extract-ci-logo.js, nothing redrawn. */
      logo:    'img/moray-logo.svg',

      /* --- The mark builds itself, Moray's way ------------------------
         Tapping the card plays the entry transition in js/markbuild.js
         ("letters"). Its pieces are the five LETTERS of this file — each
         one is its own vector path in the CI's outlines, so every moving
         shape is literally one letter of the logo and nothing is drawn.
         The lockup under it is the brochure's own, PDF p.9: an orange
         slash, "1st MARK OF", a white rule, "DISTINCTION".

         There is no Moray animation to measure (h:rs had its website
         MP4), so the timing mirrors the h:rs one and the order is the
         logo's reading order. Replace it if Main Marks sends one. */
      markBuild: {
        kind:    'letters',
        src:     'img/moray-logo.svg',
        tagline: ['1st Mark of', 'Distinction'],     /* brochure PDF p.9 */
        source:  'Moray CI PDF p.18 (logo); Moray brochure PDF p.9 (lockup)'
      },

      /* Moray's own palette, Moray CI p.31-33. The band takes `black`,
         which is Moray's CHARCOAL ground, not pure black. Orange and blue
         are kept for when the project is built; nothing uses them yet.
         The CI's printed labels on p.32-33 are copy-paste errors (the red
         swatch is captioned 192,189,189), so these were sampled off the
         swatches themselves. */
      colour: {
        black:  '#323031',   /* the ground, RGB 50 48 49                 */
        ink:    '#191819',
        orange: '#FA6126',   /* primary                                  */
        blue:   '#12A2C6'    /* primary; tints #15BEE8 #095569 #06333E    */
      },
      /* Quoted, PDF p.14. "Approximately 17 feddans equivalent to 70,000
         SQM" is printed as is — 17 feddans is nearer 71,400 m², so the
         brochure's own two numbers are both shown and neither is ours. */
      facts: [
        { k: 'Land area',  v: 'About 17 feddans (70,000 m²)', s: '70,000 m²' },
        { k: 'Buildings',  v: '14 — 8 administrative, 2 clinical, 4 serviced apartments', s: '14 buildings' },
        { k: 'Entrances',  v: '10, three of them grand gates on North 90th Street', s: '10' },
        { k: 'Unit sizes', v: '38 – 2,444 m² across four uses', s: '38 – 2,444 m²' }
      ],
      factsSource: 'Moray brochure, PDF p.14; unit sizes span the four ranges on p.28, 35, 37 and 40',

      /* Sizes only. The brochure gives NO unit counts, so none are shown
         and none are guessed; the card and page print the range alone.
         Neutral marks: Moray's CI does not colour-code its uses. */
      kinds: [
        { id: 'commercial', name: 'Commercial',          from: 43, to: 2444, colour: 'neutral' },  /* PDF p.28 */
        { id: 'admin',      name: 'Administrative',      from: 42, to: 1410, colour: 'neutral' },  /* PDF p.35 */
        { id: 'clinic',     name: 'Clinical',            from: 41, to: 203,  colour: 'neutral' },  /* PDF p.37 */
        { id: 'serviced',   name: 'Serviced apartments', from: 38, to: 83,   colour: 'neutral' }   /* PDF p.40 */
      ],
      kindsSource: 'Moray brochure, PDF p.28, 35, 37, 40',

      /* --- What is being sold: Moray's product lines ----------------------
         Moray is sold as FOUR products, and three of them carry their own
         brand. Opening Moray shows one card per line; the card is the way
         in and the first filter. Each is dressed in ITS OWN identity, from
         its own brand book, never in another line's:

           admin      no brand of its own — Moray's charcoal ground, Moray's
                      wordmark, and the brochure's own section heading
                      ("/ ADMINISTRATIVE SPACES", PDF p.35) under it
           fourth     The Fourth CI's MASTER VISUAL, PDF p.20: the campaign
                      photograph with the white EXTENDED LOCKUP across its
                      foot ("BEYOND THE THIRD / INTO ——— THE FOURTH / LEVEL OF
                      BUSINESS"), cut as vector by scripts/cut-fourth-lockup.js.
                      The card uses a shorter line (the CI allows it, p.19)
           wellness   Moray Wellness CI's BRANDED TEMPLATE, PDF p.10: "renders
                      must always be presented within the approved branded
                      template" (p.14) — orange bar left, blue bars right,
                      the WHITE logo top centre (white on dark, p.11), BY/
                      MAIN MARKS and 1ST MARK / NEW CAIRO at the foot. The
                      render is the one the CI's own template uses.
           residence  NO brand book received. Set as the brochure's own
                      lockup, PDF p.39 — "R- RESIDENCE by" over the Moray
                      wordmark, with the slash — on Moray's ink ground.
                      Replace it with their logo file when it arrives.

         Commercial is NOT released (Main Marks, 2026-09-29), so it has no
         card. Adding it is one entry here with `released: true`.

         `accent` colours the way-in line and the ring on the card. It is
         each line's own accent, from its own CI, never borrowed.

         Every figure is quoted, with its page. The admin size range is
         Moray's brochure (Oct 2025), which predates The Fourth (Sep 2026)
         — whether it includes the fourth floor is not stated. */
      lines: [
        { id: 'admin', released: true,
          name:   'Administrative units',
          badge:  'Offices',
          ground: '#323031', ink: '#FFFFFF', accent: '#FA6126',   /* Moray's own ground and its primary orange — Moray CI; admin IS Moray, so it wears Moray */
          mark:   { kind: 'moray-heading', logo: 'img/moray-logo.svg', heading: 'Administrative spaces' },
          img:    'img/moray-line-admin.jpg',   imgSource: 'Moray brochure, PDF p.36',
          line:   'From agile studios to corporate headquarters.',   lineSource: 'Moray brochure, PDF p.35',
          facts:  [ { k: 'Unit sizes', v: '42 – 1,410 m²' }, { k: 'Buildings', v: '8 administrative' } ],
          factsSource: 'Moray brochure, PDF p.14, 35',
          lit:    'img/moray-aerial-lit-admin.webp',      /* lower floors of the office blocks, clinics left dark — Codex */
          floors: ['first', 'second', 'third'],  /* "Admin" in their legends, PDF p.20-22 */

          /* --- the line page: the same Qomor flow + Find a unit as Moray
             Wellness (build 70). js/lineflow.js. ---------------------------
             WHICH ROWS: Type "Admin" on the 1st to 3rd floors. Admin on the
             Fourth is The Fourth, its own line. No building is traced yet,
             so buildings come from the sheet (B, D1-D4) and are chosen from
             the select; the line's lit picture stays on. */
          layout: 'plan',
          match:  { type: ['Admin'], floors: ['first', 'second', 'third'] },
          stepFloors: ['first', 'second', 'third'],
          place:  'North 90th Street, New Cairo',
          /* Tapping the card builds the mark it wears: MORAY rises letter by
             letter (Moray's own entry), then the brochure's section heading
             arrives under it — the orange slash draws up and "ADMINISTRATIVE
             SPACES" comes in (Moray brochure PDF p.35). */
          markBuild: {
            kind:    'letters',
            src:     'img/moray-logo.svg',
            heading: 'Administrative spaces',
            source:  'Moray CI PDF p.18 (logo); Moray brochure PDF p.35 (heading)'
          }
        },
        { id: 'fourth', released: true,
          name:   'The Fourth',
          badge:  'Fourth floor',
          ground: '#090909', ink: '#F4F4F1', accent: '#F4F4F1',   /* void black, paper white — CI PDF p.21. The accent is the paper white: void black is invisible on the app's dark card */
          /* Two compositions, each where the CI puts it:
               card (near-square)  the CI's p.30 post, "centered
                   placement": the primary logo 88.5% wide, its line run
                   to the edges and ended in the red squares, the photo
                   under a 33% black layer (as the CI file draws it), BY/
                   MAIN MARKS MORAY and 1ST MARK / NEW CAIRO at the foot.
                   p.31: never the statement + logo as one crowded lockup
                   on this format.
               line page (wide)    p.20 exactly: the master photograph
                   placed as on the page, the extended lockup over it, the
                   line broken where the model stands.
             The red (215,78,60) is SAMPLED off p.30; it is not among the
             CI's printed colours, so it is kept as drawn. */
          visual: { kind: 'fourth',
                    post:   'img/moray-line-fourth-post.jpg',     /* CI PDF p.30, the placed image */
                    logo:   'img/the-fourth-logo-white.svg',      /* client's logos-02.svg, reversed */
                    red:    '#D74E3C',
                    byline: 'img/mainmarks-wordmark.svg', moray: 'img/moray-logo.svg',
                    master: 'img/moray-line-fourth-master.jpg',   /* CI PDF p.20, the placed image, 2739 px */
                    lockup: 'img/the-fourth-lockup.svg' },        /* CI PDF p.20 minus the photo, vector */
          imgSource: 'The Fourth CI, PDF p.20, 30 (master visual, post layout)',
          line:   'Beyond the third, into the fourth.',               lineSource: 'The Fourth brochure, PDF p.10',
          facts:  [ { k: 'Units', v: '153 administrative' }, { k: 'Area', v: '13,027 m² + 609 m² terraces' } ],
          factsSource: 'The Fourth brochure, PDF p.10',
          lit:    'img/moray-aerial-lit-fourth.webp',     /* the fourth-floor band only — Codex, from the same unlit aerial */
          floors: ['fourth'],                   /* "Positioned on the fourth floor" — CI PDF p.4 */

          /* --- the line page (build 70): as Moray Wellness. WHICH ROWS:
             Type "Admin" on the Fourth floor (A01, D3, D4 today). */
          layout: 'plan',
          match:  { type: ['Admin'], floors: ['fourth'] },
          stepFloors: ['fourth'],
          place:  'North 90th Street, New Cairo',
          /* Tapping the card builds The Fourth's own post, CI p.30
             ("centered placement"), on void black: the line draws across at
             the F's crossbar ("match the line thickness to the horizontal
             stroke of the F; align it as a natural extension of the F",
             CI p.19) and lands in the red squares at both edges; FOURTH
             RISES out of it letter by letter — "the place where ambition
             rises", "elevation should be visible in every detail" (CI p.8-9);
             THE settles on top, LEVEL OF BUSINESS is written on, and the
             post's foot arrives: BY/ MAIN MARKS MORAY, 1ST MARK / NEW CAIRO.
             Every shape is a path of the client's own logo file. */
          markBuild: {
            kind:    'fourth',
            src:     'img/the-fourth-logo-white.svg',
            ground:  '#090909',                     /* VOID BLACK, CI p.21  */
            red:     '#D74E3C',                     /* sampled off CI p.30  */
            byline:  'img/mainmarks-wordmark.svg',
            moray:   'img/moray-logo.svg',
            source:  'The Fourth CI PDF p.19 (line), p.21 (colour), p.30 (post)'
          }
        },
        { id: 'wellness', released: true,
          name:   'Moray Wellness',
          badge:  'Clinics',
          ground: '#095569', ink: '#FFFFFF', accent: '#15BEE8',   /* deep teal ground — Wellness CI PDF p.6; accent = its supportive cyan (same page), since the orange would read as the three oranges beside it */
          /* The template, measured off CI PDF p.10 (post 466 x 570 pt): bars
             36 pt wide = 7.7% of the post; the orange bar runs the top 83%
             over a #191819 foot; right, #12A2C6 then #15BEE8 to 48%, then
             #095569 to the foot; the logo is 50% of the post wide, 5% down.
             The orange is SAMPLED off the page (246,124,75): it is not one
             of the CI's printed hexes, so it is kept as drawn. */
          visual: { kind: 'wellness-template',
                    render: 'img/moray-line-wellness-render.jpg',  /* CI PDF p.10, the placed image */
                    logo:   'img/moray-wellness-logo.svg',          /* white — CI PDF p.11 */
                    byline: 'img/mainmarks-wordmark.svg',
                    orange: '#F67C4B', foot: '#191819',
                    right:  [ ['#12A2C6', 6], ['#15BEE8', 48], ['#095569', 100] ] },  /* colour, ends at % */
          imgSource: 'Moray Wellness CI, PDF p.10-11, 14 (template, render, logo colours)',
          line:   'This is where the art of healing finds its stage.', lineSource: 'Moray brochure, PDF p.37',
          facts:  [ { k: 'Unit sizes', v: '41 – 203 m²' }, { k: 'Buildings', v: '2 clinical' } ],
          factsSource: 'Moray brochure, PDF p.14, 37',
          lit:    'img/moray-aerial-lit-wellness.webp',   /* the two Clinics blocks, PDF p.20 */
          floors: ['first', 'second', 'third'],  /* "Clinics" in their legends, PDF p.20-22 */

          /* --- the line page, laid out as the CCR app's Ayyam page (build 49)
             hero, facts, then the aerial in place of Ayyam's master plan with
             this line's buildings lit and selectable, then Building & unit.
             js/project.js linePage(). */
          layout: 'plan',
          /* WHICH ROWS OF THE SHEET ARE THIS LINE (build 68): every row whose
             Type is Clinic. A clinic added to the sheet — on any floor, in any
             building — joins this page with no change here. */
          match:  { type: ['Clinic'] },
          /* The floors a clinic building has, per Muhanad (2026-10-01): "the
             building contains medical units from the first till the fourth
             floor". Shown even while a floor has nothing on sale, so a unit
             added there has a place to appear. (Brochure legends p.20-22 show
             clinics on 1st-3rd, and the sheet lists A's 4th floor as Admin —
             asked of Main Marks.) */
          stepFloors: ['first', 'second', 'third', 'fourth'],
          place:  'North 90th Street, New Cairo',

          /* Tapping the card builds the Wellness logo (js/markbuild.js,
             "letters"): the top row of the file — MORAY — rises letter by
             letter as Moray's own entry does; the second row — the script
             "Wellness" — is written on left to right, as a hand would. Both
             are the CI's own vector paths (CI p.11), nothing drawn. The bars
             are the CI p.10 template's; the line under the logo is the
             template's own "1ST MARK / NEW CAIRO". */
          markBuild: {
            kind:    'letters',
            src:     'img/moray-wellness-logo.svg',
            script:  true,                       /* second row = handwriting */
            tagline: ['1st Mark', 'New Cairo'],  /* Wellness CI p.10 template */
            /* the template's bars, as the card draws them (visual, above) */
            bars:    { left: '#F67C4B', foot: '#191819', right: [['#12A2C6', 6], ['#15BEE8', 48], ['#095569', 100]] },
            source:  'Moray Wellness CI p.10-11'
          },

          /* The clinic buildings, named as MAIN MARKS' INVENTORY names them
             (05 Sales & pricing\Main Marks Inventory.xlsx, sheet Moray, read
             2026-09-30). Where each one is: brochure PDF p.20 shades the back
             half of building E (E111-E135) and the back half of building A
             (A120-A138) blue = Clinics; the inventory's E02 unit codes
             (E113-E235) sit in that half of E.
               `roof`   the outline on the aerial, in its 1672 x 941 pixels —
                        TRACED BY HAND with tools/trace-clinic-roofs.html. Null
                        until traced: the building is then chosen from the row
                        of names, and nothing is drawn on the picture for it.
               `light`  the box on the lit aerial that holds THIS building's
                        lights, so picking one turns the other off. Measured
                        off a difference image of the lit and unlit aerials:
                        every lit pixel of A falls in x 451-701 / y 123-295 and
                        of E in x 1330-1583 / y 220-420; nothing else changes
                        but the right MORAY sign, which stays unlit.
               `units`  clinic units per floor, COUNTED from that file (not
                        typed from a brochure). Counts only: no price leaves
                        the file. `hold` = its "Hold" status, not sellable. */
          buildings: [
            { id: 'E', name: 'Building E', side: 'right',
              inventory: 'E02',   /* what the inventory sheet calls it; the building is E */
              light: [1320, 210, 1600, 430],   /* its lights on the lit aerial, x0 y0 x1 y1 px */
              /* re-traced by Muhanad 2026-09-30 with the fine-point tool (v2) */
              roof: [
                [1336, 326], [1333, 330], [1330, 334], [1327, 337], [1327, 342], [1329, 344], [1332, 347], [1336, 348], [1340, 351], [1345, 353], [1349, 354], [1354, 355], [1361, 356], [1365, 357], [1369, 357], [1376, 359], [1385, 361], [1398, 364], [1411, 367], [1418, 368], [1427, 370], [1437, 372], [1447, 373], [1458, 375], [1468, 377], [1475, 378], [1482, 379], [1488, 380], [1492, 380], [1496, 380], [1500, 379], [1505, 378], [1509, 376], [1513, 374], [1516, 371], [1518, 368], [1519, 364], [1520, 358], [1522, 352], [1523, 347], [1525, 341], [1527, 334], [1529, 326], [1533, 313], [1536, 303], [1541, 283], [1545, 273], [1547, 267], [1549, 255], [1549, 247], [1547, 243], [1543, 239], [1535, 234], [1530, 232], [1522, 230], [1500, 227], [1416, 216], [1411, 215], [1406, 215], [1402, 216], [1398, 218], [1394, 221], [1390, 228], [1382, 245], [1374, 259] ], },
            { id: 'A',   name: 'Building A',   side: 'left',
              inventory: 'A',
              light: [440, 110, 712, 305],
              /* re-traced by Muhanad 2026-09-30 with the fine-point tool (v2) */
              roof: [
                [457, 192], [454, 194], [452, 197], [450, 200], [451, 204], [454, 207], [457, 208], [460, 210], [465, 212], [470, 213], [475, 215], [480, 216], [487, 218], [495, 220], [504, 222], [511, 224], [519, 228], [529, 231], [535, 232], [542, 233], [550, 233], [556, 234], [560, 234], [566, 234], [571, 234], [574, 233], [578, 232], [582, 230], [589, 226], [594, 222], [600, 217], [607, 211], [615, 204], [621, 200], [628, 194], [635, 189], [645, 179], [652, 173], [660, 167], [667, 162], [673, 158], [676, 155], [679, 153], [683, 149], [684, 144], [682, 140], [678, 138], [672, 136], [666, 134], [656, 133], [635, 130], [613, 128], [587, 127], [578, 126], [569, 126], [562, 127], [555, 129] ], }
          ],
          buildingsSource: 'Main Marks Inventory.xlsx (sheet Moray), 29 Sep 2026; positions: Moray brochure PDF p.20'
        },
        { id: 'residence', released: true,
          name:   'R- Residence',
          badge:  'Serviced apartments',
          ground: '#191819', ink: '#FFFFFF', accent: '#F59421',   /* Moray ink; the lockup's slash, Moray CI secondary */
          mark:   { kind: 'moray-endorsed', logo: 'img/moray-logo.svg', over: 'R- Residence', by: 'by' },
          img:    'img/moray-line-residence.jpg', imgSource: 'Moray brochure, PDF p.40',
          line:   'Fully furnished serviced apartments.',             lineSource: 'Moray brochure, PDF p.40',
          facts:  [ { k: 'Unit sizes', v: '38 – 83 m²' }, { k: 'Buildings', v: '4 serviced apartments' } ],
          factsSource: 'Moray brochure, PDF p.14, 40',
          lit:    'img/moray-aerial-lit-residence.webp',  /* the four back-row blocks — Codex; which blocks are serviced is INFERRED, not confirmed by the client */
          floors: null,                          /* not on any legend — every plan is shown */

          /* --- the line page (build 70): as Moray Wellness. Main Marks'
             sheet has NO serviced-apartment rows yet (brief §9 Q3), so the
             page says so and offers nothing. WHICH ROWS: the Type word they
             will use is NOT KNOWN; these are the likely spellings, matched
             case-blind. A row typed any other way does not appear (fail
             closed) — confirm the word when the rows arrive. */
          layout: 'plan',
          match:  { type: ['Serviced', 'Serviced Apartment', 'Serviced Apartments', 'Residence', 'R- Residence', 'Hotel Apartment'] },
          stepFloors: [],
          place:  'North 90th Street, New Cairo',
          /* Tapping the card builds the brochure's lockup, PDF p.39: the
             long slash draws up, MORAY rises letter by letter, and
             "R- RESIDENCE by" arrives over it. */
          markBuild: {
            kind:   'letters',
            src:    'img/moray-logo.svg',
            over:   ['R- Residence', 'by'],
            source: 'Moray CI PDF p.18 (logo); Moray brochure PDF p.39 (lockup)'
          }
        }
        /* { id: 'commercial', released: false, ... } — not released yet */
      ],

      /* The brochure's own plan images, each merged with its own
         transparency mask (pdfimages + ffmpeg alphamerge) — not rendered
         off the page, not redrawn. Legends read at full size. */
      floorsTitle: 'Master plan & floor plans',
      floors: [
        { id: 'master', name: 'Master plan',  img: 'img/moray-plan-master.webp', legend: [], source: 'Moray brochure, PDF p.17' },
        { id: 'street', name: 'Street level', img: 'img/moray-plan-street.webp', legend: ['Retail', 'Bank', 'Pharmacy'], source: 'Moray brochure, PDF p.18' },
        { id: 'ground', name: 'Ground',       img: 'img/moray-plan-ground.webp', legend: ['F&B', 'Retail', 'Showroom', 'Pharmacy'], source: 'Moray brochure, PDF p.19' },
        { id: 'first',  name: 'First',        img: 'img/moray-plan-first.webp',  legend: ['Admin', 'Clinics', 'Showroom'], source: 'Moray brochure, PDF p.20' },
        { id: 'second', name: 'Second',       img: 'img/moray-plan-second.webp', legend: ['Admin', 'Clinics'], source: 'Moray brochure, PDF p.21' },
        { id: 'third',  name: 'Third',        img: 'img/moray-plan-third.webp',  legend: ['Admin', 'Clinics'], source: 'Moray brochure, PDF p.22' },
        { id: 'fourth', name: 'Fourth',       img: 'img/moray-plan-fourth.webp', legend: [], source: 'Moray brochure, PDF p.23' }
      ],

      /* Building cuts on the floor drawings — drawn by hand by Muhanad in tools/cut-buildings.html, 2026-10-01.
         x0, y0, x1, y1 in px of img/moray-plan-<floor>.webp. Keyed by the inventory sheet's building name.
         Step 3 lifts this piece of the floor drawing off the floor (js/lineflow.js floorPlate).
         He cut the CLINIC WING of E and A, not the whole building.
         NOT CUT YET: B 1st, D2 1st, D3 1st, D4 1st, D1 2nd, D2 2nd, D3 2nd, D4 2nd, B 3rd, D1 3rd, D2 3rd,
         D3 3rd, D4 3rd, A01 4th, D3 4th, D4 4th — those show no drawing until they are cut. */
      plates: {
        'E02': { first: [1085, 287, 1262, 647], second: [1221, 297, 1398, 656] },
        'A': { third: [269, 388, 453, 738] }
      },

      /* Sharp pictures of a cut (build 77), used for the lifted piece in place of the brochure's small
         crop. Each covers EXACTLY its box in `plates`, so `unitShapes` stay in brochure px and fit as before.
         E02 first: Muhanad's sharp redraw (2026-10-02), lined up to the brochure by its walls (worst wall
         0.6 brochure px off). Its E121 read "66 m2"; the brochure p.20 prints 56 m2, so the "5" of E122's
         "55 m2" from the same picture was put over the first "6". Every other figure matches the brochure,
         and the seven for sale match the sheet. Built by the image check, not by hand: re-make, never edit. */
      plateImgs: {
        'E02': { first: 'img/moray-plate-E02-first.webp' }
      },

      /* The clinic offer PDF (js/pdf.js, build 78). Muhanad, 2026-10-02: "the
         first floor in moray wellness only". A unit outside `scope` gets no
         offer, whatever the page asks. `art` = PDF-ready copies (jsPDF takes
         PNG/JPEG only): logos rasterised from the CI vectors at 1400 px; the
         drawings flattened from the WebP files above, nothing redrawn. */
      offer: {
        scope: { types: ['Clinic'], floors: ['first'], buildings: ['E02'] },
        art: {
          render:     'img/moray-line-wellness-render.jpg',   /* Wellness CI p.10, the placed image */
          logoWhite:  'img/pdf/wellness-white.png',           /* CI p.11 */
          logoOrange: 'img/pdf/wellness-orange.png',          /* CI p.11 */
          mainMarks:  'img/mainmarks-wordmark.png',
          plates:     { 'E02': { first: 'img/pdf/plate-E02-first.jpg' } },
          floors:     { first: 'img/pdf/plan-first.jpg' },    /* brochure PDF p.20 */
          /* build 79: the project and the building. Every render is Main Marks' own,
             copied out of the Moray brochure with pdfimages -j, NOT re-encoded. */
          street:     'img/moray-render.jpg',                 /* PDF p.12 (no heading on the page) */
          plaza:      'img/pdf/render-p26-plaza.jpg',         /* PDF p.26 "The Grand Central Plaza" */
          sky:        'img/pdf/render-p25-sky.jpg',           /* PDF p.25 "Sky Lounges" */
          corridor:   'img/pdf/render-p37-corridor.jpg',      /* PDF p.37 "Medical Spaces" */
          clinicRoom: 'img/pdf/render-p37-clinic.jpg',        /* PDF p.37 "Medical Spaces" */
          master:     'img/pdf/master-p17.jpg'                /* PDF p.17, flattened on white */
        },
        /* The master plan (p.17) and the first-floor plan (p.20) are the same site
           drawn at slightly different scales. Lined up by their site outlines
           (alpha masks, overlap 99.2%): master px = s * first-floor px + (tx, ty).
           So a building cut on the floor plan (`plates`) is found on the master plan. */
        masterFromFloor: { s: 0.98989, tx: 16.04, ty: 16.16 },
        /* The project in the brochure's own figures and words (PDF p.14, p.37) */
        /* `smallAr` / `clinicQuoteAr` (build 80): there is NO Arabic Moray
           brochure, so these are OUR translations of its English, marked as such
           on the page, to be checked by an Arabic reader before real use */
        facts: [
          { big: '70,000 m²', small: 'about 17 feddans', smallAr: 'نحو 17 فداناً' },
          { big: '14', small: 'buildings: 2 for clinics, 8 for offices, 4 serviced apartments',
            smallAr: 'مبنى: 2 للعيادات، 8 للمكاتب، 4 شقق فندقية' },
          { big: '10', small: 'entrances, 3 of them grand gates on North 90th St.',
            smallAr: 'مداخل، منها 3 بوابات رئيسية على شارع التسعين الشمالي' }
        ],
        factsPage: 14,
        clinicQuote: 'Moray’s medical clinics bring together advanced facilities and refined design, offering trusted care in a setting that prioritizes comfort, accessibility, and community well-being.',
        clinicQuoteAr: 'تجمع عيادات Moray الطبية بين المرافق المتطورة والتصميم الراقي، لتقدم رعاية موثوقة في مكان يضع الراحة وسهولة الوصول ورفاهية المجتمع في المقدمة.',
        clinicQuotePage: 37
      },

      /* Unit outlines on the floor drawings — traced by hand by Muhanad in tools/trace-units.html, 2026-10-02.
         Corners [x, y] in px of img/moray-plan-<floor>.webp: the same space as `plates`.
         Step 3 draws them over the lifted building; a sellable one is tapped to open it (js/lineflow.js unitLayer).
         Checked on arrival: every outline within 9% of the size its m² in the sheet implies; none leaves its cut.
         NOT TRACED YET: E211-E235 (2nd floor, 21), A333A, A336. Untraced units are picked from the list. */
      unitShapes: {
        /* Building E · 1st floor */
        'E113': [[1183, 548], [1203.5, 547.5], [1203, 534.5], [1237.5, 534.5], [1237, 516], [1256, 516], [1257, 559], [1183, 558.5]],
        'E114': [[1183, 429.5], [1256, 429.5], [1256, 472], [1237, 472], [1237, 460], [1203.5, 459.5], [1203.5, 440.5], [1183, 440.5]],
        'E117': [[1182.5, 361], [1231, 360.5], [1231, 342], [1257, 342.5], [1256.5, 384.5], [1183, 384]],
        'E124': [[1090.5, 342.5], [1163.5, 342.5], [1164.5, 363], [1091, 363]],
        'E125': [[1091, 363], [1090.5, 384.5], [1164.5, 384.5], [1164.5, 363]],
        'E126': [[1090.5, 384.5], [1090.5, 406], [1164, 406], [1164.5, 384.5]],
        'E127': [[1090.5, 406], [1090.5, 428], [1164, 428], [1164, 406]]
      },

      /* --- Inventory: Main Marks' OWN sheet (build 68) -------------------
         Main Marks Inventory.xlsx, tab "Moray", exported by
         scripts/moray-inventory.js with the sheet's own headings. When the
         sheet is on Google Drive, `url` becomes
           https://docs.google.com/spreadsheets/d/<ID>/gviz/tq?tqx=out:csv
         and nothing else changes. Everything the pages show — lines,
         buildings, floors, counts, sizes, prices — is DERIVED from these
         rows, so a unit added to the sheet appears on its own. */
      inventory: {
        url: 'data/moray-inventory.csv',
        demo: false,
        source: 'Main Marks Inventory.xlsx (tab Moray)',
        /* the sheet's own headings -> the reader's fields */
        columns: {
          code:      ['Unit No.2', 'Unit No.', 'Unit No', 'Unit Code'],
          building:  ['Bldg', 'Building'],
          floor:     ['Floor'],
          type:      ['Type'],
          area:      ['BUA'],
          listPrice: ['Live unit price', 'Live unit price ']
        },
        required: ['code', 'building', 'floor', 'type', 'area', 'listPrice', 'status']
      },

      /* --- Payment plans: Yostina Gamil, 29 Sep 2026 -------------------
         (05 Sales & pricing\Payment Plans & Current Offer.txt).
         Every instalment is QUARTERLY — Main Marks' own sample contract
         (D1-205 Contract Payment.xlsx: 10% down + 32 quarterly over 8
         years), which js/plans.js reproduces to the pound.
         `discount` is the plan's own; the price it applies to is the
         sheet's live price. `until` ends the offer by itself: after that
         date the plan is not offered at all. `notFor` = unit types the
         plan does not apply to ("does NOT apply to commercial units"). */
      plans: [
        { id: 'o0-8',  group: 'offer', label: '0% down · 8 years',                down: 0,    years: 8,  every: 3, until: '2026-10-15', notFor: ['Commercial'] },
        { id: 'o20-8', group: 'offer', label: '20% down · 8 years · 10% off',     down: 0.20, years: 8,  every: 3, discount: 0.10, until: '2026-10-15', notFor: ['Commercial'] },
        { id: 'o30-10',group: 'offer', label: '30% down · 10 years · 10% off',    down: 0.30, years: 10, every: 3, discount: 0.10, until: '2026-10-15', notFor: ['Commercial'] },
        { id: 'o10-3', group: 'offer', label: '10% down · 3 years · 30% off',     down: 0.10, years: 3,  every: 3, discount: 0.30, until: '2026-10-15', notFor: ['Commercial'] },
        { id: 'cash',  group: 'offer', label: 'Spot cash · 40% off',              cash: true, discount: 0.40, until: '2026-10-15', notFor: ['Commercial'] },
        { id: 'p0-6',  group: 'original', label: '0% down · 6 years',             down: 0,    years: 6,  every: 3 },
        { id: 'p10-6', group: 'original', label: '10% down · 6 years',            down: 0.10, years: 6,  every: 3 },
        { id: 'p5-7',  group: 'original', label: '5% down · 7 years',             down: 0.05, years: 7,  every: 3 },
        { id: 'p10-8', group: 'original', label: '10% down · 8 years',            down: 0.10, years: 8,  every: 3 }
      ],
      planGroups: { offer: 'Current offer · until 15 Oct 2026', original: 'Standard plans' },
      terms: {
        instalmentEvery: 3,
        downOn: 'discounted',      /* ASSUMED: down payment on the discounted
                                      price. Main Marks has not said.     */
        /* NOT SUPPLIED, so NOT SHOWN: maintenance deposit, delivery date,
           club or other fees. Nothing is printed for them until they are. */
        extras: []
      },
      assumptions: [
        'The down payment is taken as a share of the price after the plan’s discount.',
        'The first instalment falls three months after the down payment, as in Main Marks’ sample contract.',
        'Maintenance and delivery are not included: Main Marks has not supplied them.'
      ],
      brokerages: [],
      source:  'Moray brochure (Digital Brochure, Oct 2025)',

      /* OPEN. Moray is the project the contract buys, so it is the live
         card — it opens on everything the brochure supports. Selling
         (units, schedule, offer) waits on the inventory and the plans. */
      ready:   true
    }
  ],

  /* --- Who may sign in ------------------------------------------------
     DEMO ACCOUNTS. Main Marks has not sent its sales team yet (their
     Priority 3). These are placeholders so the app can be used and shown;
     they are obviously not real people, on purpose — a made-up name that
     looks real would end up printed on an offer.

     When the real team arrives this list is replaced, and when the back
     end is stood up this list goes away entirely and js/auth.js talks to
     it instead. Nothing else changes: every screen reads the session, not
     this array.

     Sign-in is by WORK EMAIL, which is what the sales team already has
     and already remembers. The addresses below are deliberately at
     `demo.local` — an address that cannot exist — so a placeholder can
     never be mistaken for somebody's real account. The name is accepted
     too, because a salesperson handed a phone will type that.        */
  users: [
    { id: 'demo-sales',    name: 'Demo Salesperson',   email: 'sales@demo.local',    role: 'sales',         code: '1111', projects: ['moray', 'hrs'], phone: '' },
    { id: 'demo-manager',  name: 'Demo Sales Manager', email: 'manager@demo.local',  role: 'sales_manager', code: '2222', projects: ['moray', 'hrs'], phone: '' },
    { id: 'demo-director', name: 'Demo Director',      email: 'director@demo.local', role: 'director',      code: '3333', projects: ['moray', 'hrs'], phone: '' }
  ],
  usersDemo: true,

  roles: {
    sales:         { label: 'Salesperson',   canOffer: true,  canSeeTeam: false, canSeeAll: false },
    sales_manager: { label: 'Sales manager', canOffer: true,  canSeeTeam: true,  canSeeAll: false },
    director:      { label: 'Director',      canOffer: true,  canSeeTeam: true,  canSeeAll: true }
  }
};

if (typeof module === 'object' && module.exports) module.exports = CONFIG;
