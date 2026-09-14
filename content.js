/* ===========================================================================
   WORD PASSPORT — Prefixes & Suffixes
   content.js — curriculum, item bank, badges, remediation map.
   Edit freely: every string here is classroom copy, not code.
   ---------------------------------------------------------------------------
   ITEM TYPES  (rendered by engine.js — unchanged from Departure Board)
     choose  {stem, options[], answer}                 generic multiple choice
     equiv   {given, stem, options[], answer}          same-meaning
     judge   {given, stem, answer}                     True / False / Can't tell
     gap     {lines:[{who,text}], options[], answer}   dialogue gap-fill  ("___")
             ...or {lines, accept:[]}                  typed answer
     table   {table:{cols,rows}, stem, options[], answer}
     pick    {shop, items:[{name,price,note}], stem, answer}
     sort    {stem, bins:[{key,label,hint}], items:[{text,bin}]}
     order   {stem, items[] IN CORRECT ORDER}          shuffled at render
     spot    {stem, words[], answer, fix}              click the wrong word
     build   {stem, tiles[], solution, alt[]}          assemble a sentence
   Every item carries: id, tag (error tag), level (CEFR), why (the diagnosis).
   ---------------------------------------------------------------------------
   THE SPINE OF THIS COURSE, IN ONE PARAGRAPH
   An English word has a head on its RIGHT. The last suffix decides what part
   of speech the whole word is; everything to its left only modifies meaning.
   That single asymmetry explains why prefixes almost never change word class
   and suffixes almost always do. Layered on top of it is a historical fact:
   English carries three vocabularies at once — a native Germanic stock, a
   Latin/French stock borrowed after 1066, and a Greek scientific stock. Each
   layer brought its own affixes, and the layers do not mix freely. Almost
   every "irregularity" a student meets in this topic is one of those two
   facts wearing a disguise.
   =========================================================================== */

const CEFR = ['A2', 'B1', 'B1+', 'B2', 'B2+', 'C1'];

/* --------------------------------------------------------------------------
   RANKS — one travel document per gate cleared
   -------------------------------------------------------------------------- */
const RANKS = [
  { n: 0, name: 'Unstamped',        note: 'Your passport is blank. Every word is still one solid lump to you.' },
  { n: 1, name: 'Day Visitor',      note: 'You can see the parts inside a word and say what each one does.' },
  { n: 2, name: 'Tourist Visa',     note: 'You can turn a word into its opposite and choose the right negative.' },
  { n: 3, name: 'Transit Pass',     note: 'You can say too much, too little, above and below.' },
  { n: 4, name: 'Residence Permit', note: 'Time, place and direction prefixes hold no surprises for you.' },
  { n: 5, name: 'Work Visa',        note: 'You can build the noun you need instead of the one you happen to know.' },
  { n: 6, name: 'Multiple Entry',   note: 'Adjectives and verbs too. You can move a word to any word class on demand.' },
  { n: 7, name: 'Diplomatic Pass',  note: 'You hear where the stress moves and you spell the joins correctly.' },
  { n: 8, name: 'Dual Citizen',     note: 'C1. You read a word’s history off its face and write with its whole family.' }
];

/* --------------------------------------------------------------------------
   BADGES — stamps in the passport. The ids are read by engine.js; keep them.
   -------------------------------------------------------------------------- */
const BADGES = [
  { id: 'passport',    name: 'Passport Issued',    perk: 'You are officially a reader of words.',   icon: 'stamp',   how: 'Finish your first lesson.' },
  { id: 'streak3',     name: 'Three-Day Visa',     perk: 'Short stay, real progress.',              icon: 'sofa',    how: 'Study 3 days in a row.' },
  { id: 'streak7',     name: 'Week Pass',          perk: 'A full week in the country of words.',    icon: 'queue',   how: 'Study 7 days in a row.' },
  { id: 'streak14',    name: 'Long-Stay Permit',   perk: 'Fourteen days. You live here now.',       icon: 'ticket',  how: 'Study 14 days in a row.' },
  { id: 'upgrade',     name: 'Clean Stamp',        perk: 'Not one query at the desk.',              icon: 'seat',    how: 'Score 100% on any Border Check.' },
  { id: 'firstclass',  name: 'Fast Track',         perk: 'Three clean stamps. Straight through.',   icon: 'crown',   how: 'Score 100% on three Border Checks.' },
  { id: 'solo',        name: 'No Interpreter',     perk: 'You did it without help.',                icon: 'compass', how: 'Clear a Border Check without using a hint.' },
  { id: 'reclaim',     name: 'Baggage Reclaim',    perk: 'You got it back.',                        icon: 'bag',     how: 'Fix 5 items in Standby that you once got wrong.' },
  { id: 'tailwind',    name: 'Green Channel',      perk: 'Nothing to declare.',                     icon: 'wind',    how: 'Answer 10 in a row correctly.' },
  { id: 'rebooked',    name: 'Second Application', perk: 'Refused once, approved after.',           icon: 'redo',    how: 'Pass a Border Check you previously failed.' },
  { id: 'nonstop',     name: 'Single Entry',       perk: 'A whole gate in one sitting.',            icon: 'arrow',   how: 'Finish a whole gate in one session.' },
  { id: 'quickdraw',   name: 'Automatic Gate',     perk: 'The machine reads you instantly.',        icon: 'bolt',    how: 'Earn 25 time bonuses by answering inside 7 seconds.' },
  { id: 'frequent',    name: 'Dual Citizen',       perk: 'Both halves of English are yours.',       icon: 'globe',   how: 'Clear all 8 gates.' }
];

/* --------------------------------------------------------------------------
   ERROR TAGS → what the teacher report says. One entry per tag used by items.
   `reteach` is board-ready. `activities` are things a teacher can run tomorrow.
   -------------------------------------------------------------------------- */
const REMEDIATION = {

  'word-parts': {
    name: 'Reading a word in parts — root, prefix, suffix',
    principle: 'A long English word is not one thing to be memorised; it is a small machine with a root in the middle, optional labels on the front, and optional labels on the back. Students who cannot see the joins must learn every word separately, which is why their vocabulary stops growing at around B1.',
    reteach: 'Find the root first, not the affixes. In <em>uncomfortable</em> the root is <em>comfort</em>; strip <em>un-</em> and <em>-able</em> and you are left with a word you already know. Teach the habit as a question: "What is the smallest real word inside this one?"',
    activities: [
      'Word surgery: eight long words on the board, students draw two vertical lines in each to separate prefix | root | suffix, then read only the root aloud.',
      'Root families: give the root <em>port</em> (carry) and collect transport, import, export, portable, porter, support — then ask what they all have in common physically.',
      'Reverse dictation: the teacher says only the root (<em>rely</em>) and the class races to produce four relatives (reliable, reliability, unreliable, reliance).'
    ]
  },

  'head-right': {
    name: 'The right-hand head — suffixes change the class, prefixes change the meaning',
    principle: 'The last suffix decides what part of speech the whole word is. Everything to the left of it can only adjust meaning. This is the master rule of English word-building and it is almost exceptionless.',
    reteach: '<em>happy</em> (adj) → <em>unhappy</em> is still an adjective; the prefix changed the meaning only. But <em>happy</em> → <em>happiness</em> is now a noun; the suffix changed the class. So when a gap needs a NOUN, no prefix will ever get you there — only a suffix will. The rare class-changing prefixes (<em>en-</em> in enlarge, <em>be-</em> in befriend) are old and few.',
    activities: [
      'Gap-class drill: ten sentences with the root supplied in brackets; students must first name the class the gap needs, then build it. Naming the class first halves the error rate.',
      'Two-column race: PREFIX CHANGED MEANING / SUFFIX CHANGED CLASS — twenty derived words sorted against a timer.',
      'Prove the rule: challenge the class to find a prefix that changes word class. They will find <em>enlarge</em> and <em>embark</em> eventually, and the hunt teaches the rule better than stating it.'
    ]
  },

  'in-allomorphy': {
    name: 'Why in- becomes im-, il- and ir-',
    principle: 'This is not four prefixes; it is one prefix being lazy. Latin <em>in-</em> took on the place of articulation of the sound that followed it, because that is less work for the mouth. English inherited the results ready-made.',
    reteach: 'Say <em>in-possible</em> quickly and honestly — your lips are already closed for the <em>p</em>, so the <em>n</em> comes out as <em>m</em>. That is <em>impossible</em>. Before <em>l</em> it becomes <em>il-</em> (illegal), before <em>r</em> it becomes <em>ir-</em> (irresponsible). Germanic <em>un-</em> never does this because it never went through Latin: <em>unpopular</em>, not *umpopular. So assimilation is a reliable clue that a word is a Latin borrowing.',
    activities: [
      'Mouth test: students say in+possible and in+legal at speed with a hand on the lips, then report what their own mouth did. Physical evidence beats a table.',
      'Same trick elsewhere: show <em>com-</em> doing it too (collect, correct, compare) and let the class state the rule themselves.',
      'Prediction round: give five Latinate adjectives beginning with p, l, r, m and ask students to predict the negative before checking.'
    ]
  },

  'un-dis-mis': {
    name: 'Choosing the negative — un-, dis-, mis-',
    principle: 'These three are not interchangeable, and only two of them negate. <em>un-</em> = not. <em>dis-</em> = not, plus a sense of removal or separation. <em>mis-</em> does not negate at all: it says the action happened, but wrongly.',
    reteach: 'Test <em>mis-</em> against reality. If you <em>misunderstood</em> the announcement, did you understand something? Yes — you understood it wrongly. <em>Misread, misjudge, mislead, mislay, miscalculate, misplace</em> all work that way. <em>dis-</em> often undoes a connection: disconnect, disagree, dislike, discomfort, disembark.',
    activities: [
      'Did it happen? — twenty <em>mis-</em> and <em>un-</em> verbs; students answer yes or no for each, discovering the split themselves.',
      'Airport announcements: rewrite five polite announcements to be blunt, using <em>mis-</em> to place blame precisely ("the bags were misrouted" vs "we lost your bags").',
      'Three-way sort with traps: put <em>misfortune</em> and <em>distrust</em> in the pile.'
    ]
  },

  'un-reversive': {
    name: 'The two un-s — "not" on adjectives, "undo" on verbs',
    principle: 'English has two different prefixes spelled <em>un-</em>. On an adjective it means NOT (unhappy, unsafe). On a verb it means REVERSE THE ACTION (unpack, unlock, unfasten, undo). Same spelling, unrelated jobs.',
    reteach: 'You cannot unpack a bag you never packed — the reversive <em>un-</em> presupposes that the action was done first. That is also why <em>unbuckle</em>, <em>untie</em> and <em>unload</em> exist but *<em>unknow</em> and *<em>unsee</em> feel like jokes: you can only reverse an action that leaves something in a changed state.',
    activities: [
      'Cabin-crew mime: students act out pack/unpack, fasten/unfasten, load/unload while the class supplies the verb.',
      'Invented reversives: ask for *unsee, *unhear, *unsend and discuss why they feel modern and playful. Students meet productivity without the terminology.',
      'Ambiguity hunt: <em>unlocked</em>, <em>unbolted</em>, <em>undressed</em> — is it "not X" or "X undone"? Context decides.'
    ]
  },

  'non-neutral': {
    name: 'non- is a label, not an insult',
    principle: '<em>non-</em> classifies without judging; <em>un-</em> and <em>in-</em> evaluate. That difference, not register, is why travel English is full of <em>non-</em>: it is the language of categories.',
    reteach: '<em>non-refundable</em>, <em>non-stop</em>, <em>non-smoking</em>, <em>non-resident</em>, <em>non-transferable</em> — each names a category on a ticket, with no criticism implied. Compare <em>unprofessional</em> (a judgement) with <em>non-professional</em> (a category: amateur). Compare <em>immoral</em> (bad) with <em>amoral</em> (outside morality altogether).',
    activities: [
      'Ticket audit: hand out a real fare-conditions page and highlight every <em>non-</em>. Ask why the airline chose it over <em>un-</em>.',
      'Insult or category? — twenty words, two columns, then students justify the borderline ones.',
      'Rewrite for politeness: turn three <em>un-</em> judgements into <em>non-</em> categories and discuss what was lost.'
    ]
  },

  'over-under': {
    name: 'over- and under- measure against a norm',
    principle: 'These two do not mean "much" and "little" — they mean MORE THAN IT SHOULD BE and LESS THAN IT SHOULD BE. There is always an invisible standard, and the prefix says which side of it you fell on.',
    reteach: 'Ask "more than what?" every time. <em>The flight was overbooked</em> — more seats sold than the plane has. <em>We underestimated the journey</em> — we thought it would take less than it did. Remember the direction: over<em>estimate</em> = you thought it was MORE than reality; under<em>estimate</em> = you thought it was LESS.',
    activities: [
      'Norm naming: for ten over-/under- words, students say aloud what the invisible standard is (overbooked → the number of seats).',
      'Direction drill: the teacher gives a real and an expected figure; students must choose over- or under- inside three seconds.',
      'Space to quantity: start with overhead lockers and underground trains, then show it is the same metaphor in overcharge and underpay.'
    ]
  },

  'super-out': {
    name: 'Going above and beating a rival — super-, hyper-, out-',
    principle: '<em>super-</em> and <em>hyper-</em> raise something above the normal level; <em>out-</em> is different and far more useful — it is a fully productive comparative that attaches to VERBS and means "do it better or more than someone else".',
    reteach: '<em>outperform, outnumber, outlast, outsell, outrun, outpace, outbid</em>. "Rail outperforms road under 600 km" is one word doing the work of six. Almost no learner is taught this, and it lifts writing immediately. <em>super-</em> is above normal (supersonic, superstructure); <em>hyper-</em> is excessively so, and is the Greek twin of Latin <em>super-</em>.',
    activities: [
      'out- generator: ten verbs on the board; students decide which accept <em>out-</em>, then use three in a travel sentence.',
      'Greek and Latin twins: hyper-/super-, sub-/hypo-, peri-/circum- — match the pairs and note which layer each belongs to.',
      'One-word rewrite: six clumsy comparisons ("sold more tickets than") reduced to a single out- verb.'
    ]
  },

  'sub-semi': {
    name: 'Below and partly — sub-, semi-, mini-, micro-',
    principle: '<em>sub-</em> is both literal (subway, submarine) and evaluative (substandard, subzero). <em>semi-</em> means half or partly and is the workhorse of hedged description.',
    reteach: 'Distinguish position from quality: a <em>subway</em> runs under the road; <em>substandard</em> service falls under the acceptable line. <em>semi-</em>: semi-direct, semi-detached, semi-final, semi-permanent. And warn about <em>bi-</em>: <em>biweekly</em> genuinely means both "twice a week" and "every two weeks", so careful writers avoid it.',
    activities: [
      'Under the road or under the line? — sort fifteen sub- words by literal or evaluative meaning.',
      'Hedge with semi-: students rewrite five absolute claims about a hotel using semi- and discuss the change in honesty.',
      'Ambiguity vote on <em>biweekly</em>, then agree a class rule for what to write instead.'
    ]
  },

  're-again': {
    name: 're- has two lives: "again" and the fossil "back"',
    principle: 'Productive <em>re-</em> means "again" and attaches to anything (rebook, reroute, refuel, reconnect). But English also holds hundreds of Latin words where <em>re-</em> meant "back" and has fused into the root: return, receive, reduce, recover, report, resort.',
    reteach: 'The test is separability. <em>Rebook</em> = book + again; remove <em>re-</em> and <em>book</em> survives with its meaning intact. <em>Return</em> is not "turn again" — it is a single lexical item, and *<em>turn</em> does not survive the operation. Teach students to try the subtraction, and to accept that when it fails the word must be learned whole.',
    activities: [
      'Subtraction test on twenty re- words: does the remainder survive as a word with a related meaning?',
      'Hyphen rule: re-cover (cover again) vs recover (get better); re-sort vs resort; re-form vs reform. Minimal pairs, big meaning gaps.',
      'Resort reveal: tell the class <em>resort</em> is literally "to go back to", and let them work out how a beach resort got its name.'
    ]
  },

  'time-prefix': {
    name: 'Time and sequence — pre-, post-, fore-, ex-, mid-',
    principle: 'English marks "before" twice over: Latinate <em>pre-</em> and Germanic <em>fore-</em>. They are not stylistic variants — <em>fore-</em> survives mainly in old fixed words, while <em>pre-</em> is freely productive and is what you reach for when you invent a word.',
    reteach: '<em>pre-book, pre-board, pre-departure, pre-paid, pre-flight</em> — all modern, all hyphen-friendly. <em>forecast, foresee, foreword, forewarn</em> — all old and closed. <em>ex-</em> means former (ex-pilot) or out of (exit, export). <em>post-</em> is after (post-flight, postpone).',
    activities: [
      'Invent a word: give students a new airport service and require a <em>pre-</em> coinage. Nobody ever invents a <em>fore-</em> word, which makes the point.',
      'Timeline board: place fifteen affixed words on a single arrow from before to after.',
      'Foreword vs forward: a spelling trap worth five minutes and a laugh.'
    ]
  },

  'relation-prefix': {
    name: 'Direction and relation — trans-, inter-, co-, self-, de-, counter-',
    principle: 'These prefixes encode a spatial or social relationship rather than a degree. They are the backbone of travel vocabulary because travel is relationships between places.',
    reteach: '<em>trans-</em> = across (transfer, transit, transport, transatlantic — all "carry/go across"). <em>inter-</em> = between (international, intercity, interchange, interconnect). <em>co-</em> = jointly (co-pilot, co-driver). <em>self-</em> = by yourself (self-service, self-catering, self-confident). <em>de-</em> = remove or reverse (de-ice, defrost, devalue, deregulate). <em>counter-</em> = against (counterclockwise, counterargument).',
    activities: [
      'Root hunt on <em>-fer</em> (carry): transfer, refer, prefer, offer, confer, differ, infer. Students state what each prefix contributes.',
      'Map work: a route map annotated with inter-, trans- and intra- for every leg.',
      'de- brainstorm: airport operations produce de-ice, deplane, deboard, debrief — which are real and which are jargon?'
    ]
  },

  'noun-quality': {
    name: 'Nouns of quality — -ness, -ity, -ance/-ence',
    principle: 'All three turn an adjective into the name of a quality, but they are not free substitutes. <em>-ness</em> is Germanic and attaches to absolutely anything, including words invented this morning. <em>-ity</em> and <em>-ance/-ence</em> are Latinate and only attach to Latinate bases.',
    reteach: 'That is why <em>kindness</em> and <em>shyness</em> and <em>moodiness</em> are natural, but the noun from <em>creative</em> is <em>creativity</em>, not *creativeness. Test for productivity: "the laid-backness of the crew" is instantly understandable; *"the laid-backity" is not a word and never will be. When you do not know the Latinate noun, <em>-ness</em> is the safe fallback and will always be understood.',
    activities: [
      'Nonsense-word test: invent an adjective (<em>splunky</em>) and ask the class for the noun. Everyone produces -ness. That is productivity, demonstrated in ten seconds.',
      'Personality noun ladder: convert the whole U4 adjective list to nouns and mark which took -ness, which -ity, which -ance/-ence.',
      'humble → humility: show that some pairs are suppletive-looking survivals, and that <em>humbleness</em> exists but sounds different.'
    ]
  },

  'noun-action': {
    name: 'Nouns of action and result — -ment, -tion, -al, -ure, -age',
    principle: 'Verbs become nouns through a small set of suffixes that are not interchangeable and largely have to be learned per verb. The travel lexicon is built almost entirely out of them.',
    reteach: 'Point at the timetable: <em>depart → departure</em> (-ure), <em>arrive → arrival</em> (-al), <em>cancel → cancellation</em> (-ation), <em>announce → announcement</em> (-ment), <em>bag/lug → baggage/luggage</em> (-age). Five different suffixes doing one job on one board. The <em>-al</em> group is small and worth memorising: arrival, refusal, approval, dismissal, removal, survival, proposal.',
    activities: [
      'Departures-board dictation: students hear ten verbs and must write the noun exactly as it would appear on an airport screen.',
      'Suffix families: sort thirty verbs into the five noun-forming groups; the odd ones out are the lesson.',
      'Spot the trap: <em>depart</em> gives <em>departure</em>, but <em>department</em> is not the act of departing. Ask why.'
    ]
  },

  'noun-person': {
    name: 'Nouns of person — -er/-or, -ist, -ant/-ent, and the passive -ee',
    principle: '<em>-er/-or/-ist/-ant</em> all name the doer. <em>-ee</em> is the one that matters at C1, because it names the person the action is done TO.',
    reteach: 'employ → employ<strong>er</strong> (does the employing) vs employ<strong>ee</strong> (is employed). Same for interviewer/interviewee, trainer/trainee. In travel: <em>evacuee</em>, <em>returnee</em>, <em>deportee</em>. Whether you get -er or -or is mostly about the word\'s origin: Germanic and everyday words take -er (driver, traveller, commuter); Latinate official words often take -or (inspector, conductor, operator, aviator).',
    activities: [
      'Who does what to whom? — ten -er/-ee pairs, students draw the arrow.',
      'Job-title audit: collect every person noun in the U3 list and sort by suffix, then look for the origin pattern.',
      'Invent a role: students coin a new airport job and justify their choice of suffix.'
    ]
  },

  'ful-less': {
    name: '-ful and -less are not a clean pair',
    principle: 'Most of the time they are opposites (careful/careless, useful/useless, tactful/tactless, harmful/harmless). But <em>-less</em> sometimes means "beyond" rather than "without", and a few -ful/-less pairs simply do not both exist.',
    reteach: '<em>priceless</em> does not mean "having no price" — it means too valuable to price. <em>Invaluable</em> likewise means extremely valuable, not un-valuable. And there is no *<em>pricefull</em>, no *<em>homeful</em>, no *<em>ruthful</em> in modern English even though <em>ruthless</em> is common. Tell students plainly: the pattern predicts, it does not guarantee.',
    activities: [
      'Priceless debate: does <em>priceless</em> mean worthless or invaluable? The confusion is the lesson.',
      'Missing halves: give ten -less words and ask for the -ful partner; collect the ones that do not exist.',
      'Personality rewrite: describe the same colleague once with three -ful adjectives and once with three -less ones.'
    ]
  },

  'adj-suffix': {
    name: 'Adjective suffixes — -able, -ive, -ous, -al, -y, -ish, -ic',
    principle: 'Each adjective suffix carries a meaning as well as a class. <em>-able</em> is the most transparent: it means "able to be VERB-ed", so it is passive by nature.',
    reteach: '<em>reliable</em> = able to be relied on; <em>refundable</em> = able to be refunded; <em>unavoidable</em>, <em>affordable</em>, <em>comparable</em>. <em>-ish</em> does approximation and is quietly one of the most useful things at B2: <em>tallish, longish, sevenish, greenish</em> — "we land at sevenish" is native and unteachable from a list. Flag <em>-ic</em> vs <em>-ical</em> as a genuine split: a <em>historic</em> day is important, a <em>historical</em> novel is set in the past; an <em>economic</em> policy concerns the economy, an <em>economical</em> car uses little fuel.',
    activities: [
      'able-to-be-VERBed drill: students expand ten -able adjectives into a passive paraphrase.',
      '-ish hour: for ten minutes every time is approximate and every colour is -ish. Ridiculous and extremely effective.',
      'ic/ical minimal pairs: classic/classical, economic/economical, historic/historical, electric/electrical — one sentence each.'
    ]
  },

  'verb-suffix': {
    name: 'Making verbs — -ise/-ize, -ify, -en, en-/em-',
    principle: 'English builds verbs at both ends. <em>-ise</em>, <em>-ify</em> and <em>-en</em> are suffixes; <em>en-/em-</em> is one of the very few prefixes that changes word class, which is exactly why it is worth teaching.',
    reteach: '<em>modern → modernise</em>, <em>simple → simplify</em>, <em>short → shorten</em>, <em>large → enlarge</em>, <em>bark(boat) → embark</em>. Note the division of labour: <em>-en</em> only attaches to short Germanic adjectives (shorten, widen, tighten, lengthen), while <em>-ise</em> and <em>-ify</em> take Latinate bases. British English prefers -ise, American -ize; both are correct, but be consistent within one text.',
    activities: [
      'Three-way build: give fifteen adjectives and require the verb; students discover -en clusters on the short native words.',
      'Embark reveal: <em>embark</em> is en- + barque (a boat), so it literally means "to put into a boat". Then <em>disembark</em> explains itself.',
      'Consistency edit: a text mixing -ise and -ize; students pick a standard and apply it throughout.'
    ]
  },

  'stress-shift': {
    name: 'Suffixes that move the stress, and suffixes that do not',
    principle: 'Germanic suffixes (-ness, -ful, -less, -ly, -er, -ship, -hood) leave the stress exactly where it was. Latinate suffixes (-ity, -ion, -ic, -ial, -ious, -ify) pull the stress onto the syllable immediately before them. This is the single biggest pronunciation win available in word-building.',
    reteach: 'Say them in pairs and clap the beat: <em>CUR-ious → cu-ri-O-si-ty</em>. <em>re-SPON-sible → re-spon-si-BIL-ity</em>. <em>PHO-tograph → pho-TO-grapher → pho-to-GRAPH-ic</em>. <em>de-CIDE → de-CI-sion</em>. Now the neutral ones: <em>HAPP-y → HAPP-iness</em>, <em>CARE → CARE-ful → CARE-fully</em> — nothing moves. Students who do not know this mispronounce every long academic noun they produce.',
    activities: [
      'Clap the stress: the class claps the strong syllable for base and derivative back to back. The shift becomes audible in one round.',
      'Two piles: NEUTRAL and SHIFTING, twenty suffixes. Then ask which pile is Germanic. The answer falls out.',
      'Speaking repair: record students reading five -ity nouns before and after the rule. Play both.'
    ]
  },

  allomorphy: {
    name: 'When the base changes shape at the join',
    principle: 'Adding a suffix often rewrites the end of the base. These changes are regular enough to teach as patterns rather than as a hundred separate spellings.',
    reteach: 'Four patterns cover most of it. (1) <em>-de/-d → -s</em>: decide → decision, conclude → conclusion. (2) <em>-mit → -mission</em>: emit → emission, permit → permission, admit → admission. (3) <em>-ain → -an</em>: explain → explanation, maintain → maintenance, pronounce → pronunciation (note the lost o — the commonest spelling error in the language). (4) <em>y → i</em>: happy → happiness, rely → reliance, busy → business.',
    activities: [
      'Pattern discovery: give twelve pairs and ask students to group them before you name the rules.',
      'Pronunciation spelling test on exactly one word: <em>pronunciation</em>. Then explain why the o vanished.',
      'Join repair: a text with the bases glued on unchanged (*decidion, *explaination); students fix and name the pattern.'
    ]
  },

  'suffix-order': {
    name: 'Derivational chains — suffixes go in a fixed order',
    principle: 'You cannot stack suffixes freely. Each one selects what it will attach to, so a long word records the order in which it was built. Reading that order backwards is how students derive a word they have never seen.',
    reteach: 'Walk the chain on the board: <em>nation → national → nationalise → nationalisation</em>. Each arrow is one legal step, and no step can be skipped — there is no *nationation. Same for <em>rely → reliable → reliability → unreliability</em>. Give students the chain as a tool: to get a noun from <em>reliable</em>, do not search memory, walk the chain.',
    activities: [
      'Chain building race: a root on the board, teams add one legal step at a time; an illegal step loses the turn.',
      'Unbuild: give <em>uncomfortably</em> and <em>internationalisation</em> and require the full peel-back to the root.',
      'Longest legal word: teams compete, but every step must be defensible. Arguing about legality is the learning.'
    ]
  },

  layers: {
    name: 'The three Englishes — Germanic, Latinate, Greek',
    principle: 'English carries three vocabularies at once, and each brought its own affixes. Affixes prefer their own layer. Most of the apparent randomness in this topic is this fact in disguise.',
    reteach: 'Germanic: un-, mis-, over-, under-, fore-, out-, -ness, -ful, -less, -ish, -er, -hood, -ship, -en. Latinate: in-/im-, dis-, re-, pre-, sub-, trans-, inter-, -tion, -ity, -ance, -ment, -al, -ous, -ive, -able. Greek: anti-, hyper-, hypo-, mono-, poly-, auto-, tele-, micro-. That is why we say <em>unhappy</em> but <em>improbable</em>, and why <em>un-</em> works on borrowed words while <em>in-</em> never works on native ones. Register follows the layer: the Germanic half sounds plain and warm, the Latinate half formal and distant.',
    activities: [
      'Layer sort: thirty affixed words into three columns, then read a paragraph of each layer aloud and describe the difference in feeling.',
      'Register rewrite: the same travel complaint written twice, once Germanic, once Latinate. Which gets a refund?',
      'Why not *inhappy? — pose it as a puzzle at the start of the lesson and let the strata answer it at the end.'
    ]
  },

  lexicalised: {
    name: 'When the parts stop adding up',
    principle: 'A word built from transparent parts can drift until its meaning is no longer the sum of them. This is not a flaw in the system; it is what happens to any word used often enough, and recognising it prevents confident wrong guesses.',
    reteach: 'Line up the honest ones and the drifted ones side by side. Honest: <em>rebook</em>, <em>unpack</em>, <em>tactless</em>, <em>refundable</em>. Drifted: <em>department</em> (not the act of departing), <em>resort</em> (to go back to → a holiday place), <em>commute</em> (to exchange one payment for another → to travel to work), <em>excursion</em> (to run out → an organised outing), <em>priceless</em>, <em>invaluable</em>, <em>disinterested</em> (impartial, not bored). Teach the habit: guess from the parts, then check whether the word has moved on.',
    activities: [
      'Etymology reveals: give the literal Latin of five travel words and let students reconstruct the journey to the modern meaning.',
      'Trap sentences: ten sentences where a transparent guess produces the wrong reading; students diagnose each.',
      'disinterested vs uninterested: a courtroom scenario where only one of them will do.'
    ]
  },

  nominalisation: {
    name: 'Writing with affixes — nominalisation, precision and conversion',
    principle: 'At C1 the point of word-building stops being accuracy and becomes control. Turning verbs into nouns raises register and packs information; overdoing it drains the life out of a paragraph. Both directions have to be available on demand.',
    reteach: 'Compare: "They cancelled the flight because the engine failed" → "The cancellation followed an engine failure." Denser, more formal, and the agent has quietly disappeared — which is sometimes exactly why it is chosen. Also teach conversion (zero-derivation): <em>a delay / to delay</em>, <em>a board / to board</em>, <em>a queue / to queue</em>. English can change class with no suffix at all, and academic writers exploit it constantly.',
    activities: [
      'Nominalise and reverse: a plain paragraph raised to formal register, then a bureaucratic one restored to plain English. Discuss what each version hides.',
      'Agent hunt: in five nominalised sentences, ask who actually did it. The missing agent is a rhetorical choice.',
      'Conversion collection: find ten words in one travel text that work as both noun and verb with no change.'
    ]
  }
};

const STAGES = [];

/* ===== GATE 1 — CHECK-IN =============================================== */
STAGES.push({
  id: 's1', podcast: '', slides: '', video: '', art: 'desk', n: 1, name: 'Check-in', cefr: 'B1',
  gate: 'Gate 1',
  blurb: 'Before you can build words you have to see that they are built. Three parts, one rule about which end does what, and the first negative prefix that changes its own shape.',
  lessons: [
    {
      id: 's1l1', name: 'What a word is made of', cefr: 'B1',
      theory: {
        key: 'A long word is not one thing to memorise. It is a root with labels on the front and the back.',
        body: [
          'Look at <em>uncomfortable</em>. It looks like a word you have to learn separately. It is not. In the middle sits <em>comfort</em>, a word you already know. On the front is <em>un-</em>, meaning <strong>not</strong>. On the back is <em>-able</em>, meaning <strong>able to be</strong>. Three pieces, no memorising.',
          'The piece in the middle is the <strong>root</strong>. It carries the actual idea. The piece on the front is a <strong>prefix</strong>; the piece on the back is a <strong>suffix</strong>. Together they are called <em>affixes</em> — things fixed onto a root.',
          'A word can have no affixes (<em>travel</em>), one (<em>traveller</em>, <em>retravel</em>), or several (<em>un</em> + <em>reli</em> + <em>able</em> + <em>ly</em>).',
          'So the habit to build is this: when you meet a long word, do not start at the front. <strong>Look for the smallest real word inside it.</strong> Find <em>rely</em> inside <em>unreliability</em> and the rest falls into place.',
          'This one habit is why some students’ vocabulary keeps growing after B1 and others’ stops. Learning <em>rely</em> as a single word gets you one word. Learning to see the joins gets you <em>rely, reliable, reliably, unreliable, reliability, unreliability, reliance</em> — seven, for the price of one.'
        ],
        simple: [
          'A long word has parts. Find the small word in the middle first.',
          '<em>uncomfortable</em> = <strong>un</strong> + <strong>comfort</strong> + <strong>able</strong>.',
          'The middle part is the <strong>root</strong>. It carries the meaning.',
          'Front part = <strong>prefix</strong>. Back part = <strong>suffix</strong>.'
        ],
        examples: [
          { s: '<strong>un</strong>·<strong>comfort</strong>·<strong>able</strong>', g: 'PREFIX + ROOT + SUFFIX — THREE PIECES, ONE WORD' },
          { s: 'The seats were <strong>uncomfortable</strong>, so the flight felt longer.', g: 'YOU ONLY HAD TO KNOW "COMFORT"' },
          { s: '<strong>trans</strong>·<strong>port</strong> — literally "carry across".', g: 'PORT = CARRY. THE ROOT IS HIDING IN PLAIN SIGHT' }
        ]
      },
      items: [
        { id: 's1l1-01', type: 'choose', tag: 'word-parts', level: 'B1',
          stem: 'Where is the root in <em>uncomfortable</em>?',
          options: ['un', 'comfort', 'able', 'uncomfort'],
          answer: 1,
          why: 'The root is the smallest real word inside: <em>comfort</em>. <em>un-</em> and <em>-able</em> are labels attached to it.' },
        { id: 's1l1-02', type: 'sort', tag: 'word-parts', level: 'B1',
          art: 'suitcase',
          stem: 'Six pieces taken off travel words \u2014 with the hyphens removed. Which end of the root did each one come from?',
          bins: [
            { key: 'pre', label: 'Goes on the front', hint: 'prefix' },
            { key: 'suf', label: 'Goes on the back', hint: 'suffix' }
          ],
          items: [
            { text: 'un', bin: 'pre' }, { text: 'trans', bin: 'pre' }, { text: 'over', bin: 'pre' },
            { text: 'ment', bin: 'suf' }, { text: 'able', bin: 'suf' }, { text: 'ness', bin: 'suf' }
          ],
          why: 'Without the hyphen you have to know the piece itself. The test is to try a root on each side: <em>un</em>+safe works, safe+<em>un</em> does not; kind+<em>ness</em> works, <em>ness</em>+kind does not.' },
        { id: 's1l1-03', type: 'spot', tag: 'word-parts', level: 'B1',
          stem: 'One word in this sentence has no affixes at all — it is a bare root. Click it.',
          words: ['The', 'delayed', 'passengers', 'were', 'given', 'a', 'refund', 'unwillingly.'],
          answer: 4, fix: 'given (bare root — every other long word here is built from one)',
          why: '<em>delayed</em> = delay+ed, <em>passengers</em> = pass+enger+s, <em>refund</em> = re+fund, <em>unwillingly</em> = un+will+ing+ly. Only <em>given</em> is a single piece.' },
        { id: 's1l1-04', type: 'choose', tag: 'word-parts', level: 'B1',
          stem: 'Which word contains the root <em>port</em>, meaning <strong>carry</strong>?',
          options: ['portion', 'transport', 'portrait', 'important'],
          answer: 1,
          why: '<em>Transport</em> is trans (across) + port (carry). Same root in import, export, porter and portable — all about carrying. The others only look similar.' },
        { id: 's1l1-05', type: 'gap', tag: 'word-parts', level: 'B1',
          lines: [
            { who: 'Ploy', text: 'I don’t know the word "unbookable".' },
            { who: 'Kit', text: 'You do. Take off the front and the back and you have ___.' }
          ],
          options: ['unbook', 'book', 'bookable', 'able'],
          answer: 1,
          why: 'Strip <em>un-</em> and <em>-able</em> and the root <em>book</em> is left. Unbookable = not able to be booked.' },
        { id: 's1l1-06', type: 'order', tag: 'word-parts', level: 'B1',
          stem: 'Put these pieces in the order they appear in the word <em>disembarkation</em>.',
          items: ['dis', 'em', 'bark', 'ation'],
          why: 'Prefixes stack on the left in the order they were added, suffixes on the right. <em>bark</em> here is an old word for a boat: em+bark = "put into a boat", dis+embark = "get out of the boat", +ation = the noun.' }
      ]
    },
    {
      id: 's1l2', name: 'The front changes meaning, the back changes class', cefr: 'B1',
      theory: {
        key: 'A suffix can change what kind of word it is. A prefix almost never can.',
        body: [
          'Compare two operations on the same word. <em>happy</em> → <em>unhappy</em>: the meaning flipped, but it is still an adjective. <em>happy</em> → <em>happiness</em>: the meaning did not flip, but the word is now a noun.',
          'That is the difference in one line. <strong>Prefixes change meaning. Suffixes change class.</strong>',
          'The reason is that an English word has its <strong>head on the right</strong>. Whatever suffix comes last decides what the whole word is. Everything to the left of it is only decoration.',
          'Watch the class change with every step: <em>nation</em> (noun) → <em>national</em> (adjective) → <em>nationalise</em> (verb) → <em>nationalisation</em> (noun again). Four words, four classes, one root.',
          'This has a very practical consequence in exams. If a gap needs a <strong>noun</strong>, no prefix will ever get you there. Only a suffix will. So before you write anything, ask what class the gap needs — then reach for the back of the word, not the front.',
          'There are two or three old prefixes that do change class (<em>large</em> → <em>enlarge</em>, <em>friend</em> → <em>befriend</em>), and their rarity is exactly what proves the rule.'
        ],
        simple: [
          'Prefix = new meaning, same kind of word. happy → unhappy. Both adjectives.',
          'Suffix = new kind of word. happy → happiness. Adjective becomes noun.',
          'The <strong>last</strong> suffix decides what the word is.',
          'Need a noun in the gap? Look for a suffix. A prefix will never help.'
        ],
        examples: [
          { s: 'She is <strong>unreliable</strong>. → His <strong>unreliability</strong> cost us the flight.', g: 'ADJECTIVE → NOUN, BY THE SUFFIX ONLY' },
          { s: 'The crew were <strong>tactless</strong>. → Their <strong>tactlessness</strong> upset everyone.', g: 'SAME MOVE, SAME PLACE — THE BACK OF THE WORD' },
          { s: 'nation → nation<strong>al</strong> → national<strong>ise</strong> → nationalis<strong>ation</strong>', g: 'NOUN → ADJ → VERB → NOUN. THE LAST PIECE WINS' }
        ]
      },
      items: [
        { id: 's1l2-01', type: 'choose', tag: 'head-right', level: 'B1',
          stem: 'The gap needs a <strong>noun</strong>: "Her ___ made her popular with the whole crew." The root is <em>kind</em>. Which form fits?',
          options: ['unkind', 'kindly', 'kindness', 'kind'],
          answer: 2,
          why: 'Only a suffix can make a noun. <em>-ness</em> does it; <em>un-</em> would only change the meaning and leave it an adjective.' },
        { id: 's1l2-02', type: 'sort', tag: 'head-right', level: 'B1',
          stem: 'What did the affix do to the original word?',
          bins: [
            { key: 'mean', label: 'Changed the meaning', hint: 'same word class' },
            { key: 'class', label: 'Changed the word class', hint: 'adjective → noun, etc.' }
          ],
          items: [
            { text: 'loyal → disloyal', bin: 'mean' }, { text: 'pack → unpack', bin: 'mean' }, { text: 'book → rebook', bin: 'mean' },
            { text: 'loyal → loyalty', bin: 'class' }, { text: 'arrive → arrival', bin: 'class' }, { text: 'shy → shyness', bin: 'class' }
          ],
          why: 'Every word in the left box got a prefix; every word in the right box got a suffix. The pattern is not a coincidence — it is the rule.' },
        { id: 's1l2-03', type: 'gap', tag: 'head-right', level: 'B1',
          lines: [
            { who: 'Teacher', text: 'The gap is after "showed great", so what kind of word do you need?' },
            { who: 'Mai', text: 'A noun. So from "resilient" I need ___.' }
          ],
          options: ['unresilient', 'resiliently', 'resilience', 'resilient'],
          answer: 2,
          why: '"Showed great ___" needs a noun. <em>-ence</em> builds it. <em>-ly</em> would give an adverb and <em>un-</em> would leave it an adjective.' },
        { id: 's1l2-04', type: 'order', tag: 'head-right', level: 'B1',
          stem: 'Put these four words in the order they were built, starting from the root.',
          items: ['nation', 'national', 'nationalise', 'nationalisation'],
          why: 'Each step adds exactly one suffix and changes the class: noun → adjective → verb → noun. You cannot skip a step; there is no *nationation.' },
        { id: 's1l2-05', type: 'judge', tag: 'head-right', level: 'B1',
          given: 'Adding <em>un-</em> to <em>comfortable</em> turns the adjective into a noun.',
          stem: 'True, false, or impossible to tell?',
          answer: 1,
          why: 'False. <em>Uncomfortable</em> is still an adjective — the prefix only reversed the meaning. To get a noun you need a suffix: <em>discomfort</em> works because it also has the noun <em>comfort</em> underneath, not because of the prefix.' },
        { id: 's1l2-06', type: 'build', tag: 'head-right', level: 'B1+',
          stem: 'Turn "The driver was careless" into a sentence about his quality, using a noun.',
          tiles: ['The', 'driver’s', 'carelessness', 'caused', 'the', 'delay.'],
          solution: 'The driver’s carelessness caused the delay.',
          why: '<em>careless</em> is an adjective and cannot be the subject of a verb. <em>-ness</em> converts it to a noun so it can take the subject slot.' }
      ]
    },
    {
      id: 's1l3', name: 'The negative that changes shape: in-, im-, il-, ir-', cefr: 'B1',
      theory: {
        key: 'in-, im-, il- and ir- are not four prefixes. They are one prefix being lazy.',
        body: [
          'Latin had a negative prefix <em>in-</em>. Say <em>in-possible</em> at natural speed and notice what your mouth does: your lips are already closing for the <em>p</em>, so the <em>n</em> comes out as an <em>m</em>. <strong>impossible</strong>.',
          'The same laziness before other sounds. Before <em>l</em>: in + legal → <em>illegal</em>. Before <em>r</em>: in + responsible → <em>irresponsible</em>. The nasal simply copies the sound after it, because that is less work.',
          'Linguists call this <strong>assimilation</strong>, and it happened in Latin long before English borrowed the finished words. We did not invent the rule; we imported the results.',
          'Now the useful part. Germanic <em>un-</em> never does this, because it never went through Latin. <em>unpopular</em>, not *umpopular. <em>unreliable</em>, not *urreliable. So if a negative prefix has changed its shape, the word is almost certainly a Latin borrowing.',
          'The same trick runs through other Latin prefixes: <em>com-</em> becomes <em>col-</em> before l (collect), <em>cor-</em> before r (correct), <em>con-</em> before most consonants (connect), and stays <em>com-</em> before p and b (compare, combine). Once you see it in one prefix you see it everywhere.',
          'Which words take <em>in-</em> and which take <em>un-</em> is not predictable from meaning and has to be learned. But at B1 the safe default is <em>un-</em>: it attaches to almost anything and will always be understood.'
        ],
        simple: [
          'in- changes its shape to match the next sound.',
          'in + possible = <strong>im</strong>possible. Your lips are closed for p, so n becomes m.',
          'in + legal = <strong>il</strong>legal. in + responsible = <strong>ir</strong>responsible.',
          'un- never changes: <strong>un</strong>popular, <strong>un</strong>reliable. It is not a Latin word.'
        ],
        examples: [
          { s: 'in + patient → <strong>impatient</strong>', g: 'BEFORE P AND B, THE N BECOMES M' },
          { s: 'in + legal → <strong>illegal</strong> &nbsp;|&nbsp; in + regular → <strong>irregular</strong>', g: 'BEFORE L AND R, IT COPIES THEM' },
          { s: '<s>umpopular</s> &nbsp;→&nbsp; <strong>unpopular</strong>', g: 'UN- IS GERMANIC. IT NEVER ASSIMILATES' }
        ]
      },
      items: [
        { id: 's1l3-01', type: 'choose', tag: 'in-allomorphy', level: 'B1',
          stem: 'Which is the correct negative of <em>patient</em>?',
          options: ['inpatient', 'impatient', 'unpatient', 'ilpatient'],
          answer: 1,
          why: 'Before <em>p</em> the <em>n</em> of <em>in-</em> becomes <em>m</em>. (Note that <em>inpatient</em> is a real but unrelated word — a hospital patient who stays overnight.)' },
        { id: 's1l3-02', type: 'sort', tag: 'in-allomorphy', level: 'B1',
          stem: 'Which shape does <em>in-</em> take in front of each of these adjectives?',
          bins: [
            { key: 'im', label: 'im-', hint: 'before p, b, m' },
            { key: 'il', label: 'il-', hint: 'before l' },
            { key: 'ir', label: 'ir-', hint: 'before r' }
          ],
          items: [
            { text: 'possible', bin: 'im' }, { text: 'polite', bin: 'im' },
            { text: 'legal', bin: 'il' }, { text: 'logical', bin: 'il' },
            { text: 'responsible', bin: 'ir' }, { text: 'regular', bin: 'ir' }
          ],
          why: 'One prefix, three spellings, chosen entirely by the first sound of the base. Nothing here has to be memorised word by word.' },
        { id: 's1l3-03', type: 'spot', tag: 'in-allomorphy', level: 'B1',
          stem: 'Click the word that is spelled wrongly.',
          words: ['Boarding', 'without', 'a', 'ticket', 'is', 'inlegal', 'and', 'irresponsible.'],
          answer: 5, fix: 'illegal',
          why: 'Before <em>l</em>, <em>in-</em> becomes <em>il-</em>. Note that <em>irresponsible</em> in the same sentence has already done the same thing before <em>r</em>.' },
        { id: 's1l3-04', type: 'judge', tag: 'in-allomorphy', level: 'B1+',
          given: 'A student writes <em>umreliable</em> because the mouth closes for the <em>m</em>.',
          stem: 'Is this the same rule as <em>impossible</em>?',
          answer: 1,
          why: 'No. <em>un-</em> is Germanic and never assimilates, however convenient it would be for the mouth. The rule belongs to the Latin prefix only, which is why it is a clue about a word’s origin.' },
        { id: 's1l3-05', type: 'gap', tag: 'in-allomorphy', level: 'B1+',
          lines: [
            { who: 'Mai', text: 'Why is it "collect" and not "comlect"?' },
            { who: 'Teacher', text: 'Same reason as "illegal". The prefix ___ the sound after it.' }
          ],
          options: ['deletes', 'copies', 'ignores', 'shortens'],
          answer: 1,
          why: '<em>com-</em> assimilates exactly like <em>in-</em>: col+lect, cor+rect, con+nect, com+pare. One habit, many prefixes.' },
        { id: 's1l3-06', type: 'table', tag: 'in-allomorphy', level: 'B1+',
          table: {
            cols: ['Base', 'First sound', 'Negative'],
            rows: [
              ['possible', 'p', 'impossible'],
              ['mature', 'm', 'immature'],
              ['literate', 'l', 'illiterate'],
              ['rational', 'r', '?']
            ]
          },
          stem: 'Complete the last row.',
          options: ['inrational', 'imrational', 'irrational', 'unrational'],
          answer: 2,
          why: 'Before <em>r</em> the prefix copies the <em>r</em>. The pattern in the first three rows predicts the fourth without any memorising.' }
      ]
    }
  ]
});

/* ===== GATE 2 — PASSPORT CONTROL ======================================= */
STAGES.push({
  id: 's2', podcast: '', slides: '', video: '', art: 'contract', n: 2, name: 'Passport Control', cefr: 'B1+',
  gate: 'Gate 2',
  blurb: 'Four ways to say no, and only three of them are negatives. The difference between refusing, undoing, doing wrongly, and simply labelling.',
  lessons: [
    {
      id: 's2l1', name: 'un-, dis-, mis-: three different jobs', cefr: 'B1',
      theory: {
        key: 'Only two of these three are negatives. mis- does not say no — it says wrongly.',
        body: [
          '<strong>un-</strong> is the plain negative: <em>unhappy, unsafe, unkind, unreliable</em>. Not X.',
          '<strong>dis-</strong> also negates, but usually with a sense of removal or separation underneath: <em>disagree, dislike, disconnect, discomfort, disembark, disloyal</em>. Something that was joined comes apart.',
          '<strong>mis-</strong> is the one students get wrong, because it does not negate at all. It says the action <strong>did happen</strong>, but it went wrong: <em>misunderstand, misread, misjudge, mislead, miscalculate, misplace, misroute</em>.',
          'Test it against reality. If you <em>misunderstood</em> the announcement, did you understand something? Yes — you understood it, incorrectly. If you had <em>not</em> understood it, you would say you did not understand. Those are different situations, and only <em>mis-</em> catches the first one.',
          'Airlines use this precision constantly. "Your bags were <em>misrouted</em>" means they went somewhere — just not where you did. It admits far less than "we lost your bags".',
          'Which negative a word takes is mostly historical and has to be learned. But the meanings are not interchangeable, so a wrong choice is a wrong sentence, not just an odd one.'
        ],
        simple: [
          '<strong>un-</strong> = not. unsafe, unkind, unhappy.',
          '<strong>dis-</strong> = not, and often "take apart". disagree, disconnect, dislike.',
          '<strong>mis-</strong> = the action happened, but <strong>wrongly</strong>. misunderstand, misread.',
          'Ask: did it happen? If yes but badly → <em>mis-</em>.'
        ],
        examples: [
          { s: 'The crew were <strong>unkind</strong> about the delay.', g: 'UN- = NOT KIND' },
          { s: 'I <strong>misread</strong> the gate number and went to 42 instead of 24.', g: 'MIS- = I DID READ IT — WRONGLY' },
          { s: 'Passengers <strong>disembark</strong> through the front door.', g: 'DIS- = COME APART FROM THE VEHICLE' }
        ]
      },
      items: [
        { id: 's2l1-01', type: 'choose', tag: 'un-dis-mis', level: 'B1',
          stem: '"I ___ the timetable and arrived an hour early." Which fits?',
          options: ['unread', 'disread', 'misread', 'non-read'],
          answer: 2,
          why: 'You did read it — the reading was wrong. That is exactly <em>mis-</em>. The others do not exist or would mean you never read it at all.' },
        { id: 's2l1-02', type: 'sort', tag: 'un-dis-mis', level: 'B1+',
          art: 'tags',
          stem: 'Did the action happen or not?',
          bins: [
            { key: 'did', label: 'It happened — but wrongly', hint: 'mis-' },
            { key: 'not', label: 'It did not happen at all', hint: 'un- / dis-' }
          ],
          items: [
            { text: 'misjudged the distance', bin: 'did' }, { text: 'miscalculated the fare', bin: 'did' }, { text: 'misplaced the boarding pass', bin: 'did' },
            { text: 'disconnected the call', bin: 'not' }, { text: 'unfastened the seat belt', bin: 'not' }, { text: 'disagreed with the driver', bin: 'not' }
          ],
          why: '<em>mis-</em> always presupposes that the action took place. The other two remove or reverse it.' },
        { id: 's2l1-03', type: 'equiv', tag: 'un-dis-mis', level: 'B1+',
          given: 'The airline says your suitcase was misrouted.',
          stem: 'Which is closest in meaning?',
          options: ['Your suitcase was never put on a plane.', 'Your suitcase travelled, but to the wrong place.', 'Your suitcase was damaged in transit.', 'Your suitcase was refused at check-in.'],
          answer: 1,
          why: '<em>mis-</em> concedes that the routing happened. That is why airlines prefer it: it sounds like a correctable error rather than a loss.' },
        { id: 's2l1-04', type: 'gap', tag: 'un-dis-mis', level: 'B1+',
          lines: [
            { who: 'Ploy', text: 'The driver said one thing and the sign said another.' },
            { who: 'Kit', text: 'So one of them ___ us. We ended up on the wrong motorway.' }
          ],
          options: ['unled', 'misled', 'disled', 'non-led'],
          answer: 1,
          why: '<em>Mislead</em> — past <em>misled</em> — means to lead someone in the wrong direction. They were led; it was just the wrong way.' },
        { id: 's2l1-05', type: 'spot', tag: 'un-dis-mis', level: 'B1+',
          stem: 'Click the word with the wrong prefix.',
          words: ['She', 'was', 'a', 'mishonest', 'guide', 'who', 'overcharged', 'everyone.'],
          answer: 3, fix: 'dishonest',
          why: '<em>mis-</em> would mean she did honesty wrongly, which is not a possible situation. <em>Honest</em> is a state, not an action, so it takes the negative <em>dis-</em>.' },
        { id: 's2l1-06', type: 'build', tag: 'un-dis-mis', level: 'B1+',
          stem: 'You calculated the fare, but you got it wrong, and now you cannot pay. Say it in one sentence.',
          tiles: ['I', 'miscalculated', 'the', 'fare', 'and', 'now', 'I', 'am', 'short.'],
          solution: 'I miscalculated the fare and now I am short.',
          alt: ['I miscalculated the fare and now I am short'],
          why: 'The calculation happened; only the result was wrong. <em>Uncalculated</em> would mean you never worked it out at all — a different story, and a worse excuse.' }
      ]
    },
    {
      id: 's2l2', name: 'The other un-: undoing the action', cefr: 'B1+',
      theory: {
        key: 'There are two prefixes spelled un-. One means "not". The other means "reverse it".',
        body: [
          'On an <strong>adjective</strong>, <em>un-</em> means NOT: <em>unhappy, unsafe, unreliable, unknown</em>.',
          'On a <strong>verb</strong>, it means something completely different — <strong>undo the action</strong>: <em>unpack, unlock, unfasten, unload, untie, unbutton, unplug, unfold</em>.',
          'These are two different prefixes that happen to be spelled the same. You can tell them apart by what they attach to: adjective → "not"; verb → "reverse".',
          'The reversive one has a hidden condition: <strong>the action must have been done first</strong>. You cannot unpack a bag that was never packed. That is why <em>unlock, unload, unwrap</em> all feel natural — each of them leaves something in a changed state that can be put back.',
          'And it is why *<em>unknow</em> and *<em>unsee</em> feel like jokes rather than words. Knowing and seeing do not leave a state you can physically restore. When people do say "I can’t unsee that", they are being deliberately playful, and everyone hears the playfulness — which is itself proof that the rule is real.',
          'Occasionally the two meanings collide and a word becomes ambiguous. <em>The door was unlocked</em> — was it never locked, or did someone unlock it? Only context decides.'
        ],
        simple: [
          'un- on an adjective = <strong>not</strong>. unsafe = not safe.',
          'un- on a verb = <strong>undo it</strong>. unpack = take things out again.',
          'You can only undo something that was done first.',
          'unlock, unload, unfasten, untie — all reverse an action.'
        ],
        examples: [
          { s: 'Please do not <strong>unfasten</strong> your seat belt until we land.', g: 'VERB — REVERSE THE ACTION' },
          { s: 'The route was <strong>unsafe</strong> in the rain.', g: 'ADJECTIVE — SIMPLY "NOT"' },
          { s: 'The door was <strong>unlocked</strong>.', g: 'AMBIGUOUS: NEVER LOCKED, OR OPENED BY SOMEONE?' }
        ]
      },
      items: [
        { id: 's2l2-01', type: 'choose', tag: 'un-reversive', level: 'B1+',
          stem: 'In which sentence does <em>un-</em> mean "reverse the action"?',
          options: ['The lounge was unusually quiet.', 'She unpacked before dinner.', 'The seats were uncomfortable.', 'He was unwilling to move.'],
          answer: 1,
          why: '<em>Unpack</em> is a verb, and the packing must have happened first. The other three are adjectives, where <em>un-</em> simply means "not".' },
        { id: 's2l2-02', type: 'sort', tag: 'un-reversive', level: 'B1+',
          stem: 'What is <em>un-</em> doing in each word?',
          bins: [
            { key: 'not', label: 'Means "not"', hint: 'on an adjective' },
            { key: 'undo', label: 'Means "undo it"', hint: 'on a verb' }
          ],
          items: [
            { text: 'unkind', bin: 'not' }, { text: 'unreliable', bin: 'not' }, { text: 'uncomfortable', bin: 'not' },
            { text: 'unload', bin: 'undo' }, { text: 'unbuckle', bin: 'undo' }, { text: 'unfold', bin: 'undo' }
          ],
          why: 'Look at what the prefix is sitting on. Adjective on the left, verb on the right — that is the only test you need.' },
        { id: 's2l2-03', type: 'judge', tag: 'un-reversive', level: 'B1+',
          given: 'You can unpack a bag that nobody ever packed.',
          stem: 'True, false, or impossible to tell?',
          answer: 1,
          why: 'False. The reversive <em>un-</em> presupposes the original action. This condition is what blocks *unknow and *unsee: there is no state to restore.' },
        { id: 's2l2-04', type: 'gap', tag: 'un-reversive', level: 'B1+',
          lines: [
            { who: 'Cabin crew', text: 'We have landed. You may now ___ your seat belts.' },
            { who: 'Passenger', text: 'Finally.' }
          ],
          options: ['unfasten', 'disfasten', 'misfasten', 'non-fasten'],
          answer: 0,
          why: 'The belts were fastened; now the action is reversed. Only <em>un-</em> does reversives on verbs — <em>dis-</em> and <em>mis-</em> cannot take this job.' },
        { id: 's2l2-05', type: 'equiv', tag: 'un-reversive', level: 'B2',
          given: 'When I got back to the car, it was unlocked.',
          stem: 'Which reading is NOT possible for this sentence?',
          options: ['Somebody had unlocked it while I was away.', 'I had never locked it in the first place.', 'It was in the state of not being locked.', 'It could not be locked at all.'],
          answer: 3,
          why: 'The ambiguity is real but limited: "not locked" or "opened by someone". "Impossible to lock" would need <em>unlockable</em>, which is a different word entirely.' },
        { id: 's2l2-06', type: 'build', tag: 'un-reversive', level: 'B2',
          stem: 'The bags are on the plane and need to come off. Tell the ground crew.',
          tiles: ['Please', 'unload', 'the', 'bags', 'before', 'the', 'crew', 'disembark.'],
          solution: 'Please unload the bags before the crew disembark.',
          why: 'Two different prefixes in one sentence: <em>un-</em> reverses the loading, <em>dis-</em> separates the crew from the aircraft. Both are "getting off", built in different ways.' }
      ]
    },
    {
      id: 's2l3', name: 'non-: the label with no opinion', cefr: 'B2',
      theory: {
        key: 'non- puts something in a category. un- and in- pass judgement on it.',
        body: [
          'This is why travel English is so full of <em>non-</em>. Tickets, signs and conditions of carriage are about <strong>categories</strong>, not opinions: <em>non-stop, non-refundable, non-smoking, non-transferable, non-resident, non-returnable</em>.',
          'None of those words criticises anything. A <em>non-refundable</em> fare is not a bad fare — it is a type of fare. That neutrality is precisely why the airline chose the prefix.',
          'Compare the evaluative negatives. <em>Unprofessional</em> is an accusation; <em>non-professional</em> is a category (an amateur). <em>Immoral</em> means bad; <em>amoral</em> means outside morality altogether, which is a different charge — or none.',
          'A second difference is grammatical: <em>non-</em> attaches happily to <strong>nouns</strong>, which <em>un-</em> mostly cannot. <em>non-smoker, non-member, non-event, non-resident</em>. There is no *unsmoker.',
          '<em>non-</em> is also the most productive of the negatives: you can attach it to almost any word on the spot and be understood, even on a word that already has its own negative. <em>Non-urgent</em> exists happily alongside <em>not urgent</em>.',
          'In writing, <em>non-</em> usually takes a hyphen in British English, especially before a capital letter or a vowel: non-EU, non-essential. Some very common ones have fused: <em>nonsense, nonstop</em> (US spelling).'
        ],
        simple: [
          '<strong>non-</strong> = a category, with no judgement. non-smoking, non-stop.',
          '<strong>un-/in-</strong> = a judgement. unprofessional = bad.',
          'non-professional = an amateur. Not an insult.',
          'non- can go on nouns: non-member, non-resident. un- usually cannot.'
        ],
        examples: [
          { s: 'This fare is <strong>non-refundable</strong> and <strong>non-transferable</strong>.', g: 'TWO CATEGORIES — NO CRITICISM ANYWHERE' },
          { s: 'His behaviour at the desk was <strong>unprofessional</strong>.', g: 'A JUDGEMENT, NOT A CATEGORY' },
          { s: 'Rows 1–12 are <strong>non-smoking</strong>.', g: 'NON- ATTACHES TO A NOUN-LIKE FORM' }
        ]
      },
      items: [
        { id: 's2l3-01', type: 'choose', tag: 'non-neutral', level: 'B2',
          stem: 'Which word would appear in a ticket’s conditions of carriage?',
          options: ['unrefundable', 'misrefundable', 'non-refundable', 'disrefundable'],
          answer: 2,
          why: 'The ticket is naming a class of fare, not criticising it. <em>non-</em> is the category prefix, and it is the standard industry form.' },
        { id: 's2l3-02', type: 'equiv', tag: 'non-neutral', level: 'B2',
          given: 'He is a non-professional photographer.',
          stem: 'What does this tell us?',
          options: ['He behaves badly at work.', 'He does not do it for a living.', 'He takes poor photographs.', 'He has been banned from working.'],
          answer: 1,
          why: '<em>non-</em> classifies: not in that profession. <em>Unprofessional</em> would have been the accusation.' },
        { id: 's2l3-03', type: 'sort', tag: 'non-neutral', level: 'B2',
          stem: 'Is this a category or a criticism?',
          bins: [
            { key: 'cat', label: 'A category', hint: 'no opinion' },
            { key: 'crit', label: 'A criticism', hint: 'a judgement' }
          ],
          items: [
            { text: 'non-stop', bin: 'cat' }, { text: 'non-resident', bin: 'cat' }, { text: 'non-smoking', bin: 'cat' },
            { text: 'unprofessional', bin: 'crit' }, { text: 'inconsiderate', bin: 'crit' }, { text: 'untrustworthy', bin: 'crit' }
          ],
          why: 'The right-hand box could all appear in a complaint letter. The left-hand box could all appear on a ticket. That is the whole distinction.' },
        { id: 's2l3-04', type: 'judge', tag: 'non-neutral', level: 'B2',
          given: 'The sign says "non-smoking area", so smoking there is considered immoral.',
          stem: 'Does the sign say this?',
          answer: 1,
          why: 'No. It states a category of area. Any disapproval you feel comes from the rule, not from the prefix — which is exactly the work <em>non-</em> was chosen to do.' },
        { id: 's2l3-05', type: 'gap', tag: 'non-neutral', level: 'B2',
          lines: [
            { who: 'Agent', text: 'I’m afraid the ticket is in your sister’s name.' },
            { who: 'Kit', text: 'Can I travel on it?' },
            { who: 'Agent', text: 'No — it’s ___.' }
          ],
          options: ['untransferable', 'non-transferable', 'mistransferable', 'distransferable'],
          answer: 1,
          why: 'A neutral rule about a category of ticket. <em>Untransferable</em> is occasionally seen but <em>non-transferable</em> is the fixed industry term and the neutral one.' },
        { id: 's2l3-06', type: 'pick', tag: 'non-neutral', level: 'B2',
          shop: 'Fare options, Bangkok → Chiang Mai',
          art: 'shop',
          stem: 'You say: "I need something I can change later, and I don’t mind a stop." Which fare?',
          items: [
            { name: 'Saver', price: '฿890', note: 'non-stop, non-refundable, non-changeable' },
            { name: 'Standard', price: '฿1,450', note: 'one stop, changeable for a fee' },
            { name: 'Flexi', price: '฿2,600', note: 'non-stop, fully refundable' },
            { name: 'Basic', price: '฿750', note: 'two stops, non-changeable, non-transferable' }
          ],
          answer: 1,
          why: 'Changeability is the requirement; the stop is explicitly acceptable. Read every <em>non-</em> on the label as a category boundary and only one option survives both conditions.' }
      ]
    }
  ]
});

/* ===== GATE 3 — SECURITY =============================================== */
STAGES.push({
  id: 's3', podcast: '', slides: '', video: '', art: 'tags', n: 3, name: 'Security', cefr: 'B2',
  gate: 'Gate 3',
  blurb: 'Prefixes of degree. Too much and too little, above and below, and the one prefix that lets you beat a rival in a single word.',
  lessons: [
    {
      id: 's3l1', name: 'over- and under-: measuring against a norm', cefr: 'B1+',
      theory: {
        key: 'over- and under- do not mean "a lot" and "a little". They mean more, or less, than it should be.',
        body: [
          'There is always an invisible standard hiding behind these two prefixes, and the prefix only tells you which side of it you landed on.',
          '<em>The flight was <strong>overbooked</strong></em> — more seats were sold than the aircraft has. <em>The branch line is <strong>underused</strong></em> — fewer people travel on it than it was built for. In both cases you can ask "more than what?" and get a real answer.',
          'The direction of the two <em>-estimate</em> words is worth drilling, because it is reversed from what many students expect. <em>You <strong>overestimated</strong> the journey</em> = you thought it would take MORE time than it really did. <em>You <strong>underestimated</strong> it</em> = you thought it would take LESS. The prefix describes your estimate, not the reality.',
          'Both prefixes started as physical position — <em>overhead lockers</em>, an <em>underground</em> line — and English simply carried the picture across to quantity. Being above the line and having too much are the same image.',
          'They also attach freely to adjectives and nouns: <em>overcrowded, overpriced, overdue, overweight, undercooked, underpaid, underage, understaffed</em>.',
          'A word of caution: <em>over-</em> on its own sometimes just means "across" (<em>overtake, overseas, overturn</em>). <em>Overtake</em> is not "take too much" — it is to pass someone on the road.'
        ],
        simple: [
          '<strong>over-</strong> = more than it should be. overbooked, overcrowded, overpriced.',
          '<strong>under-</strong> = less than it should be. underused, undercooked, underpaid.',
          'Always ask: more than <strong>what</strong>? There is an invisible standard.',
          '<em>overestimate</em> = you thought MORE. <em>underestimate</em> = you thought LESS.'
        ],
        examples: [
          { s: 'The 7 a.m. train is badly <strong>overcrowded</strong>.', g: 'MORE PEOPLE THAN IT WAS BUILT FOR' },
          { s: 'We <strong>underestimated</strong> the traffic and missed the flight.', g: 'WE THOUGHT IT WOULD BE LESS THAN IT WAS' },
          { s: 'A lorry tried to <strong>overtake</strong> on the inside.', g: 'CAREFUL — HERE OVER- MEANS "ACROSS, PAST"' }
        ]
      },
      items: [
        { id: 's3l1-01', type: 'choose', tag: 'over-under', level: 'B1+',
          stem: 'The journey took two hours. You had told everyone it would take five. What did you do?',
          options: ['You underestimated it.', 'You overestimated it.', 'You misestimated it.', 'You disestimated it.'],
          answer: 1,
          why: 'Your estimate was above the reality, so <em>over-</em>. The prefix describes the estimate, not the journey.' },
        { id: 's3l1-02', type: 'gap', tag: 'over-under', level: 'B1+',
          lines: [
            { who: 'Agent', text: 'I’m sorry, the flight is ___ — we sold more seats than we have.' },
            { who: 'Passenger', text: 'So somebody has to get off?' }
          ],
          options: ['underbooked', 'overbooked', 'misbooked', 'unbooked'],
          answer: 1,
          why: 'More seats sold than exist: above the standard. The standard here is the number of physical seats, and naming it is what makes the word precise.' },
        { id: 's3l1-03', type: 'sort', tag: 'over-under', level: 'B2',
          stem: 'Which side of the standard did each one fall on?',
          bins: [
            { key: 'over', label: 'More than it should be', hint: 'over-' },
            { key: 'under', label: 'Less than it should be', hint: 'under-' }
          ],
          items: [
            { text: 'the platform was ___crowded', bin: 'over' }, { text: 'the hotel was ___priced', bin: 'over' }, { text: 'the bags were ___weight', bin: 'over' },
            { text: 'the branch line is ___used', bin: 'under' }, { text: 'the staff are badly ___paid', bin: 'under' }, { text: 'the rice was ___cooked', bin: 'under' }
          ],
          why: 'Every one of these has a nameable standard: capacity, fair price, baggage allowance, expected ridership, a living wage, proper cooking time.' },
        { id: 's3l1-04', type: 'spot', tag: 'over-under', level: 'B2',
          stem: 'Click the word that gives the wrong direction.',
          words: ['We', 'overestimated', 'the', 'traffic,', 'so', 'we', 'missed', 'our', 'flight.'],
          answer: 1, fix: 'underestimated',
          why: 'If you missed the flight, the traffic was worse than you expected — so your estimate was too LOW. That is <em>underestimated</em>.' },
        { id: 's3l1-05', type: 'judge', tag: 'over-under', level: 'B2',
          given: 'A lorry overtook us on the motorway.',
          stem: 'Does <em>over-</em> here mean "too much"?',
          answer: 1,
          why: 'No. In <em>overtake, overseas, overturn, overlook</em>, <em>over-</em> keeps its older spatial sense of "across, past, above". The degree meaning is a later development of the same picture.' },
        { id: 's3l1-06', type: 'table', tag: 'over-under', level: 'B2',
          table: {
            cols: ['Expected', 'Reality', 'Verdict'],
            rows: [
              ['2 hours', '5 hours', 'underestimated'],
              ['฿3,000', '฿1,200', 'overestimated'],
              ['120 passengers', '180 passengers', '?']
            ]
          },
          stem: 'Complete the last row.',
          options: ['overestimated', 'underestimated', 'misestimated', 'non-estimated'],
          answer: 1,
          why: 'Expectation below reality → <em>under-</em>. Read the table as a rule: compare the first column with the second and the prefix follows automatically.' }
      ]
    },
    {
      id: 's3l2', name: 'super-, hyper-, out-: above and beyond', cefr: 'B2',
      theory: {
        key: 'super- lifts one thing above the normal level. out- beats a rival — and it works on verbs.',
        body: [
          '<strong>super-</strong> means above or beyond the normal: <em>supersonic</em> (faster than sound), <em>superstructure</em>, <em>supervisor</em> (one who oversees), <em>superstore</em>.',
          '<strong>hyper-</strong> is the Greek twin of Latin <em>super-</em> and means the same thing, usually with an added sense of excess: <em>hyperactive, hypersonic, hyperlink</em>. Its opposite, <em>hypo-</em>, is the Greek twin of <em>sub-</em>.',
          'Then there is <strong>out-</strong>, which almost no course teaches and which will do more for your writing than either of the others. It attaches to <strong>verbs</strong> and means "do it more, better or longer than someone else": <em>outperform, outnumber, outlast, outsell, outrun, outpace, outbid, outgrow</em>.',
          'What makes it powerful is compression. <em>Rail <strong>outperforms</strong> road on journeys under 600 km</em> replaces "rail performs better than road does". One word, six words’ work, and it sounds like a native writer rather than a textbook.',
          'It is genuinely productive too: you can invent <em>out-queue</em> or <em>out-plan</em> in the right context and be understood immediately.',
          'Note the shape of the sentence it builds: <em>X outperforms Y</em>. The rival goes straight after the verb with no <em>than</em> — putting one in is the commonest error.'
        ],
        simple: [
          '<strong>super-</strong> = above normal. supersonic, superstore.',
          '<strong>hyper-</strong> = the Greek version of super-, often "too much". hyperactive.',
          '<strong>out-</strong> + verb = beat someone at it. outperform, outnumber, outlast.',
          'Say <em>X outperforms Y</em> — no <em>than</em>.'
        ],
        examples: [
          { s: 'Budget carriers now <strong>outnumber</strong> national airlines in the region.', g: 'ONE WORD FOR "ARE MORE NUMEROUS THAN"' },
          { s: 'Concorde was the only <strong>supersonic</strong> airliner in service.', g: 'SUPER- = ABOVE THE NORMAL LEVEL' },
          { s: '<s>Rail outperforms than road.</s>', g: 'NO THAN — THE RIVAL FOLLOWS DIRECTLY' }
        ]
      },
      items: [
        { id: 's3l2-01', type: 'choose', tag: 'super-out', level: 'B2',
          stem: 'Which sentence is correctly formed?',
          options: ['Rail outperforms than road.', 'Rail outperforms road.', 'Rail outperforms more than road.', 'Rail is outperform road.'],
          answer: 1,
          why: '<em>out-</em> verbs are transitive: the rival is the direct object. Adding <em>than</em> duplicates a comparison the prefix has already made.' },
        { id: 's3l2-02', type: 'equiv', tag: 'super-out', level: 'B2',
          given: 'Low-cost carriers now sell more tickets than the national airline does.',
          stem: 'Which rewrite says the same in one verb?',
          options: ['Low-cost carriers oversell the national airline.', 'Low-cost carriers outsell the national airline.', 'Low-cost carriers supersell the national airline.', 'Low-cost carriers missell the national airline.'],
          answer: 1,
          why: '<em>outsell</em> = sell more than. <em>Oversell</em> is a different word meaning to sell more than you can deliver — which is what causes overbooking.' },
        { id: 's3l2-03', type: 'sort', tag: 'super-out', level: 'B2',
          stem: 'Which prefix does each verb take to mean "beat a rival"?',
          bins: [
            { key: 'out', label: 'out- works here', hint: 'beat a rival at this' },
            { key: 'no', label: 'out- does not work', hint: 'no rival to beat' }
          ],
          items: [
            { text: 'perform', bin: 'out' }, { text: 'number', bin: 'out' }, { text: 'last', bin: 'out' },
            { text: 'arrive', bin: 'no' }, { text: 'belong', bin: 'no' }, { text: 'seem', bin: 'no' }
          ],
          why: '<em>out-</em> needs an activity two parties can compete at. You cannot out-arrive or out-seem someone, because there is no scale of doing it better.' },
        { id: 's3l2-04', type: 'gap', tag: 'super-out', level: 'B2',
          lines: [
            { who: 'Guide', text: 'Those old buses were built in 1978.' },
            { who: 'Kit', text: 'And they’ve ___ every model that replaced them.' }
          ],
          options: ['overlasted', 'outlasted', 'superlasted', 'underlasted'],
          answer: 1,
          why: '<em>outlast</em> = last longer than. The competitor — every later model — is the direct object, exactly as the structure requires.' },
        { id: 's3l2-05', type: 'judge', tag: 'super-out', level: 'B2+',
          given: 'The agent oversold the flight, so three passengers were bumped.',
          stem: 'Does <em>oversold</em> mean the agent sold more than a rival did?',
          answer: 1,
          why: 'No — that would be <em>outsold</em>. <em>Oversell</em> measures against a standard (the number of seats), not against a rival. The two prefixes answer different questions: more than what, and more than whom.' },
        { id: 's3l2-06', type: 'build', tag: 'super-out', level: 'B2+',
          stem: 'Write this in one verb: budget airlines now carry more passengers than the flag carrier.',
          tiles: ['Budget', 'airlines', 'now', 'outcarry', 'the', 'flag', 'carrier.'],
          solution: 'Budget airlines now outcarry the flag carrier.',
          why: '<em>outcarry</em> is not in most dictionaries, and it is still perfectly comprehensible — that is what productivity means. A rule you can apply to a new word is a rule you really know.' }
      ]
    },
    {
      id: 's3l3', name: 'sub-, semi-, mini-: below and partly', cefr: 'B2',
      theory: {
        key: 'sub- goes under, in space or in quality. semi- goes halfway, and is the most honest word in travel writing.',
        body: [
          '<strong>sub-</strong> has a literal life and an evaluative one. Literal: <em>subway</em> (under the road), <em>submarine</em> (under the sea), <em>subsoil</em>, <em>subheading</em>. Evaluative: <em>substandard</em> (below the acceptable line), <em>subzero</em>, <em>subpar</em>.',
          'It assimilates like the other Latin prefixes, which is why we get <em>support</em> (sub+port), <em>suffer</em> (sub+fer), <em>suggest</em> (sub+gest). Once you know the habit, whole families open up.',
          '<strong>semi-</strong> means half or partly: <em>semi-direct, semi-detached, semi-final, semi-permanent, semi-automatic</em>. It is the prefix of honest description, because it lets you claim less than the whole.',
          '<strong>mini-</strong> and <strong>micro-</strong> handle size: <em>minibus, minicab, minibreak, microlight</em>. <em>micro-</em> is Greek and prefers technical company; <em>mini-</em> is casual and modern.',
          'One warning worth a minute of class time. <strong>bi-</strong> is genuinely ambiguous: <em>biweekly</em> means both "twice a week" and "every two weeks", and no rule resolves it. Careful writers avoid it and write <em>twice a week</em> or <em>fortnightly</em> instead.',
          'The Greek/Latin pairs are worth collecting: <em>super-/hyper-</em>, <em>sub-/hypo-</em>, <em>multi-/poly-</em>, <em>circum-/peri-</em>. Same meaning, different layer, and the Greek one usually sounds more technical.'
        ],
        simple: [
          '<strong>sub-</strong> = under. subway (under the road), substandard (under the line).',
          '<strong>semi-</strong> = half or partly. semi-direct, semi-final.',
          '<strong>mini-</strong> = small. minibus, minicab, minibreak.',
          'Careful with <strong>bi-</strong>: <em>biweekly</em> can mean twice a week OR every two weeks.'
        ],
        examples: [
          { s: 'Take the <strong>subway</strong> to Zone 2 — it runs under the whole avenue.', g: 'SUB- LITERAL: PHYSICALLY UNDER' },
          { s: 'The hotel’s cleanliness was <strong>substandard</strong>.', g: 'SUB- EVALUATIVE: UNDER THE ACCEPTED LINE' },
          { s: 'It is a <strong>semi-direct</strong> service — one stop, not twelve.', g: 'SEMI- = PARTLY. AN HONEST CLAIM' }
        ]
      },
      items: [
        { id: 's3l3-01', type: 'choose', tag: 'sub-semi', level: 'B2',
          stem: 'In which word does <em>sub-</em> mean "below an acceptable level" rather than "physically under"?',
          options: ['subway', 'submarine', 'substandard', 'subheading'],
          answer: 2,
          why: '<em>Substandard</em> puts something below a line of quality. The other three put something physically below another thing.' },
        { id: 's3l3-02', type: 'sort', tag: 'sub-semi', level: 'B2',
          stem: 'Sort these <em>sub-</em> words by which kind of "under" they mean.',
          bins: [
            { key: 'space', label: 'Under in space', hint: 'you could point at it' },
            { key: 'quality', label: 'Under a standard', hint: 'a judgement' }
          ],
          items: [
            { text: 'subway', bin: 'space' }, { text: 'submarine', bin: 'space' }, { text: 'subsoil', bin: 'space' },
            { text: 'substandard', bin: 'quality' }, { text: 'subzero', bin: 'quality' }, { text: 'subpar', bin: 'quality' }
          ],
          why: 'The same preposition-picture does both jobs. English moved the spatial meaning onto a scale of quality, exactly as it did with <em>over-</em> and <em>under-</em>.' },
        { id: 's3l3-03', type: 'judge', tag: 'sub-semi', level: 'B2+',
          given: 'The tour operator advertises biweekly departures, so there are two every week.',
          stem: 'Can we be sure?',
          answer: 2,
          why: 'Can’t tell. <em>Biweekly</em> genuinely carries both readings — twice a week and every two weeks. This is the one prefix where the honest answer is to ask, or to write something else.' },
        { id: 's3l3-04', type: 'gap', tag: 'sub-semi', level: 'B2',
          lines: [
            { who: 'Ploy', text: 'Is it a direct service?' },
            { who: 'Agent', text: 'Not quite — it’s ___. It stops once, at the airport.' }
          ],
          options: ['non-direct', 'semi-direct', 'subdirect', 'underdirect'],
          answer: 1,
          why: 'One stop is partly direct, which is exactly what <em>semi-</em> encodes. <em>Non-direct</em> would put it in the opposite category altogether and hide the useful detail.' },
        { id: 's3l3-05', type: 'choose', tag: 'sub-semi', level: 'B2+',
          stem: 'Which pair are the Greek and Latin versions of the same idea?',
          options: ['sub- and semi-', 'sub- and hypo-', 'mini- and non-', 'semi- and mis-'],
          answer: 1,
          why: 'Latin <em>sub-</em> and Greek <em>hypo-</em> both mean "under" — as in <em>hypothermia</em>, below normal temperature. The pair <em>super-/hyper-</em> works the same way at the top of the scale.' },
        { id: 's3l3-06', type: 'pick', tag: 'sub-semi', level: 'B2',
          shop: 'Airport transfer options',
          art: 'shop',
          stem: 'You say: "I want the small shared vehicle, not the big coach and not a private car."',
          items: [
            { name: 'Coach', price: '฿120', note: '52 seats, hourly' },
            { name: 'Minibus', price: '฿250', note: '11 seats, shared, every 20 min' },
            { name: 'Private car', price: '฿900', note: 'door to door' },
            { name: 'Subway + walk', price: '฿45', note: '2 changes, 15 min walk' }
          ],
          answer: 1,
          why: '<em>mini-</em> names the size and <em>bus</em> names the sharing. The prefix is doing real work here: it is the only thing separating this option from the coach.' }
      ]
    }
  ]
});

/* ===== GATE 4 — DEPARTURE LOUNGE ======================================= */
STAGES.push({
  id: 's4', podcast: '', slides: '', video: '', art: 'lounge', n: 4, name: 'Departure Lounge', cefr: 'B2',
  gate: 'Gate 4',
  blurb: 'Prefixes of time, place and relation — and the first fossils. Some prefixes are still doing their job; some fused into their root centuries ago and stopped.',
  lessons: [
    {
      id: 's4l1', name: 're-: again, and the fossil "back"', cefr: 'B2',
      theory: {
        key: 'Productive re- means "again" and comes off cleanly. Fossil re- means "back" and has fused into the word.',
        body: [
          'The living <em>re-</em> means <strong>again</strong> and attaches to almost anything: <em>rebook, reroute, refuel, reconnect, reapply, rejoin, reprint, recheck</em>. If you invent <em>re-scan</em> at a security gate today, everyone understands you.',
          'But English also holds hundreds of words where <em>re-</em> meant <strong>back</strong> in Latin and then fused: <em>return, receive, reduce, recover, report, refer, resort, remain, respect</em>.',
          'The test is <strong>subtraction</strong>. Take the prefix off and see whether a real word with a related meaning survives. <em>Rebook</em> minus <em>re-</em> gives <em>book</em>: still a word, still about booking. Tick. <em>Return</em> minus <em>re-</em> gives <em>turn</em> — a word, but returning is not "turning again". The subtraction failed, so the word must be learned whole.',
          'When the two meanings are both available, English uses a <strong>hyphen</strong> to keep them apart. <em>re-cover</em> (put a new cover on) against <em>recover</em> (get better). <em>re-sort</em> (sort again) against <em>resort</em> (a holiday place, or to fall back on something). <em>re-form</em> against <em>reform</em>. The hyphen is not decoration; it is the only thing carrying the meaning.',
          'And the fossils reward a moment’s curiosity. A <strong>resort</strong> is literally a place you go back to. <strong>Recover</strong> is to get back what you had. <strong>Return</strong> is to turn back. Once you see the "back" inside them, a whole set of confusing words becomes a family.',
          'One practical note: productive <em>re-</em> often takes a hyphen before a vowel, especially <em>e</em> — <em>re-enter, re-examine, re-issue</em> — to stop the eye tripping.'
        ],
        simple: [
          'Living <strong>re-</strong> = again. rebook, refuel, reroute, reconnect.',
          'Old <strong>re-</strong> = back, and it is stuck to the word. return, receive, recover.',
          'Test: take off <em>re-</em>. Is a real, related word left? <em>book</em> yes. <em>turn</em> no.',
          'Hyphen separates them: <em>re-cover</em> (new cover) vs <em>recover</em> (get better).'
        ],
        examples: [
          { s: 'They <strong>rerouted</strong> us through Doha and <strong>refuelled</strong> there.', g: 'LIVING RE- — BOTH COME OFF CLEANLY' },
          { s: 'She never <strong>recovered</strong> the lost property.', g: 'FOSSIL RE- — "GET BACK", NOT "COVER AGAIN"' },
          { s: 'The sofa needs to be <strong>re-covered</strong>.', g: 'THE HYPHEN IS THE WHOLE DIFFERENCE' }
        ]
      },
      items: [
        { id: 's4l1-01', type: 'choose', tag: 're-again', level: 'B2',
          stem: 'In which word does <em>re-</em> still mean "again"?',
          options: ['return', 'receive', 'reroute', 'reduce'],
          answer: 2,
          why: '<em>Reroute</em> = route again; strip the prefix and <em>route</em> survives intact. In the other three the prefix fused into the root centuries ago.' },
        { id: 's4l1-02', type: 'sort', tag: 're-again', level: 'B2',
          art: 'timetable',
          stem: 'Apply the subtraction test: does a related word survive without <em>re-</em>?',
          bins: [
            { key: 'live', label: 'Comes off cleanly', hint: 're- = again' },
            { key: 'fossil', label: 'Fused into the word', hint: 'learn it whole' }
          ],
          items: [
            { text: 'rebook', bin: 'live' }, { text: 'refuel', bin: 'live' }, { text: 'reconnect', bin: 'live' },
            { text: 'return', bin: 'fossil' }, { text: 'receive', bin: 'fossil' }, { text: 'resort', bin: 'fossil' }
          ],
          why: 'book, fuel and connect all survive with their meanings. turn, ceive and sort do not — <em>receive</em> has no root left at all in modern English.' },
        { id: 's4l1-03', type: 'equiv', tag: 're-again', level: 'B2',
          given: 'The armchair needs to be re-covered.',
          stem: 'What does the hyphen tell us?',
          options: ['It needs new fabric.', 'It needs to be found again.', 'It needs to be repaired.', 'It needs to be returned to the shop.'],
          answer: 0,
          why: 'With the hyphen the prefix is the living "again" one: cover it again, with new material. Without it, <em>recovered</em> would mean got better or got back.' },
        { id: 's4l1-04', type: 'gap', tag: 're-again', level: 'B2',
          lines: [
            { who: 'Agent', text: 'Your connection is gone, but there’s space tomorrow morning.' },
            { who: 'Mai', text: 'Fine — can you ___ me on that one?' }
          ],
          options: ['return', 'rebook', 'recover', 'resort'],
          answer: 1,
          why: 'The booking is being done a second time, which is the living <em>re-</em>. The other three are fossils and mean something else entirely.' },
        { id: 's4l1-05', type: 'judge', tag: 're-again', level: 'B2+',
          given: 'A seaside <em>resort</em> is called that because people go back to it.',
          stem: 'Is the explanation historically right?',
          answer: 0,
          why: 'True. <em>Resort</em> is re + sortir, "to go out again, to go back to". The modern "place people return to for holidays" grew from exactly that, and "resort to something" kept the older sense of falling back on it.' },
        { id: 's4l1-06', type: 'spot', tag: 're-again', level: 'B2+',
          stem: 'Click the word whose hyphen is missing.',
          words: ['After', 'passport', 'control', 'we', 'had', 'to', 'reenter', 'the', 'terminal.'],
          answer: 6, fix: 're-enter',
          why: 'Living <em>re-</em> takes a hyphen before a vowel — especially another <em>e</em> — so the reader does not stumble over "ree".' }
      ]
    },
    {
      id: 's4l2', name: 'Before and after: pre-, post-, fore-, ex-, mid-', cefr: 'B2',
      theory: {
        key: 'English marks "before" twice: Latinate pre- is alive, Germanic fore- is closed.',
        body: [
          '<strong>pre-</strong> means before and is freely productive. Invent a word with it right now — <em>pre-scan, pre-seat, pre-clear</em> — and it works: <em>pre-book, pre-board, pre-paid, pre-departure, pre-flight, pre-existing</em>.',
          '<strong>fore-</strong> is the native Germanic equivalent and means exactly the same thing, but it survives only in a closed set of old words: <em>forecast, foresee, forewarn, foreword, foreground, forehead</em>. Nobody coins new <em>fore-</em> words, which is the clearest demonstration of the difference between a living affix and a fossilised one.',
          'Ask a class to invent a name for a new airport service and every single one will use <em>pre-</em>. That is productivity, measured in the room.',
          '<strong>post-</strong> means after: <em>post-flight, post-war, postpone</em> (literally "place after"), <em>post-departure</em>. It usually takes a hyphen before a capital or a vowel.',
          '<strong>ex-</strong> has two jobs: <em>former</em> (ex-pilot, ex-colleague) and <em>out of</em> (exit, export, exclude, excursion — literally "a running out").',
          '<strong>mid-</strong> is the middle: <em>mid-flight, midweek, mid-journey, midday</em>. And a useful spelling trap: a <em>foreword</em> is the writing before a book; <em>forward</em> is a direction.'
        ],
        simple: [
          '<strong>pre-</strong> = before, and you can use it on any word. pre-book, pre-board.',
          '<strong>fore-</strong> = also before, but only in old fixed words. forecast, foresee.',
          '<strong>post-</strong> = after. post-flight. <strong>mid-</strong> = middle. mid-flight.',
          '<strong>ex-</strong> = former (ex-pilot) or out (exit, export).'
        ],
        examples: [
          { s: 'Families with small children may <strong>pre-board</strong>.', g: 'PRE- IS ALIVE — NEW WORDS APPEAR EVERY YEAR' },
          { s: 'The <strong>forecast</strong> is for fog until midday.', g: 'FORE- SURVIVES ONLY IN A CLOSED SET' },
          { s: 'An <strong>excursion</strong> is literally a "running out" from the town.', g: 'EX- = OUT. THE ROOT -CURS- IS "RUN"' }
        ]
      },
      items: [
        { id: 's4l2-01', type: 'choose', tag: 'time-prefix', level: 'B2',
          stem: 'An airline invents a new service where you clear customs before you fly. What will they call it?',
          options: ['fore-clearance', 'pre-clearance', 'ante-clearance', 'mis-clearance'],
          answer: 1,
          why: 'New coinages always take <em>pre-</em>, never <em>fore-</em>. <em>fore-</em> stopped accepting new words centuries ago, and this is the easiest way to feel the difference.' },
        { id: 's4l2-02', type: 'sort', tag: 'time-prefix', level: 'B2',
          stem: 'Before, during, or after?',
          bins: [
            { key: 'b', label: 'Before', hint: 'pre-, fore-' },
            { key: 'd', label: 'During / middle', hint: 'mid-' },
            { key: 'a', label: 'After', hint: 'post-' }
          ],
          items: [
            { text: 'pre-departure', bin: 'b' }, { text: 'forecast', bin: 'b' },
            { text: 'mid-flight', bin: 'd' }, { text: 'midweek', bin: 'd' },
            { text: 'post-flight', bin: 'a' }, { text: 'postpone', bin: 'a' }
          ],
          why: '<em>Postpone</em> hides its meaning in Latin: post (after) + ponere (place). To postpone is literally to place something later.' },
        { id: 's4l2-03', type: 'spot', tag: 'time-prefix', level: 'B2',
          stem: 'Click the wrong word.',
          words: ['The', 'forward', 'to', 'the', 'guidebook', 'was', 'written', 'by', 'a', 'pilot.'],
          answer: 1, fix: 'foreword',
          why: 'A <em>foreword</em> is the word that comes before the book. <em>Forward</em> is a direction. The spellings differ by one letter and the meanings not at all.' },
        { id: 's4l2-04', type: 'choose', tag: 'time-prefix', level: 'B2+',
          stem: '<em>Excursion</em> contains <em>ex-</em> (out) and <em>-curs-</em> (run). Which word shares that same root?',
          options: ['excuse', 'current', 'exchange', 'excellent'],
          answer: 1,
          why: '<em>Current</em>, <em>occur</em>, <em>recur</em> and <em>course</em> all carry <em>curr-/curs-</em>, "run". A current runs; an excursion runs out of town and back.' },
        { id: 's4l2-05', type: 'gap', tag: 'time-prefix', level: 'B2',
          lines: [
            { who: 'Kit', text: 'Do we pay at the gate?' },
            { who: 'Ploy', text: 'No, it’s ___ — I paid online last week.' }
          ],
          options: ['post-paid', 'pre-paid', 'mid-paid', 'fore-paid'],
          answer: 1,
          why: 'Payment happened before travel. <em>Pre-</em> is the living prefix for this and produces new compounds freely.' },
        { id: 's4l2-06', type: 'order', tag: 'time-prefix', level: 'B2+',
          stem: 'Put these four stages of a flight in the order they happen.',
          items: ['pre-departure checks', 'pre-boarding announcement', 'mid-flight service', 'post-flight report'],
          why: 'The prefixes alone are enough to order the list — which is exactly what they are for. Note that <em>pre-departure</em> covers everything before the aircraft moves, so it precedes boarding.' }
      ]
    },
    {
      id: 's4l3', name: 'Across, between, with, away: trans-, inter-, co-, self-, de-', cefr: 'B2+',
      theory: {
        key: 'These prefixes encode a relationship — between places, or between people. Travel vocabulary is built out of them.',
        body: [
          '<strong>trans-</strong> = across. <em>transfer</em> (carry across), <em>transport</em> (carry across), <em>transit</em> (go across), <em>transatlantic</em>, <em>translate</em> (carry across into another language). The root <em>-fer</em> means "carry" and turns up everywhere: <em>refer, prefer, offer, confer, differ, infer, suffer</em>.',
          '<strong>inter-</strong> = between. <em>international, intercity, interchange, interconnect, intercontinental, interval</em>. Its partner <em>intra-</em> means within: an <em>intra-city</em> journey stays inside one city.',
          '<strong>co-</strong> = jointly, with. <em>co-pilot, co-driver, co-production, co-operate, co-worker</em>. Same prefix as the assimilating <em>com-/con-/col-/cor-</em> family, just in its shortest modern form.',
          '<strong>self-</strong> = by or to yourself. <em>self-service, self-catering, self-check-in, self-confident, self-employed</em>. It is unusual in behaving like a prefix while still obviously being a word.',
          '<strong>de-</strong> = remove or reverse. <em>de-ice, defrost, devalue, deregulate, decode, deplane</em>. It is the Latinate counterpart of reversive <em>un-</em>, and it prefers formal and technical company: aircraft are <em>de-iced</em>, not *un-iced.',
          '<strong>counter-</strong> and <strong>anti-</strong> mean against — Latin and Greek respectively: <em>counterclockwise, counterargument</em>; <em>antifreeze, anticlockwise, anti-theft</em>. British English says <em>anticlockwise</em> where American says <em>counterclockwise</em>, which is the two layers competing for the same job in real time.'
        ],
        simple: [
          '<strong>trans-</strong> = across. transfer, transport, transit.',
          '<strong>inter-</strong> = between. international, intercity, interchange.',
          '<strong>co-</strong> = together. co-pilot, co-driver. <strong>self-</strong> = by yourself. self-service.',
          '<strong>de-</strong> = remove. de-ice, defrost, devalue.'
        ],
        examples: [
          { s: 'We have a two-hour <strong>transfer</strong> at the <strong>interchange</strong>.', g: 'ACROSS, THEN BETWEEN — TWO RELATIONSHIPS' },
          { s: 'The aircraft had to be <strong>de-iced</strong> before departure.', g: 'DE- = REMOVE. FORMAL AND TECHNICAL' },
          { s: 'It is a <strong>self-catering</strong> apartment, so there is no restaurant.', g: 'SELF- = YOU DO IT YOURSELF' }
        ]
      },
      items: [
        { id: 's4l3-01', type: 'choose', tag: 'relation-prefix', level: 'B2+',
          stem: 'The root <em>-fer</em> means "carry". So <em>transfer</em> literally means:',
          options: ['carry back', 'carry across', 'carry together', 'carry under'],
          answer: 1,
          why: '<em>trans-</em> (across) + <em>fer</em> (carry). The same root gives refer (carry back), prefer (carry before), offer, confer and differ.' },
        { id: 's4l3-02', type: 'sort', tag: 'relation-prefix', level: 'B2+',
          stem: 'What relationship does each prefix encode?',
          bins: [
            { key: 'across', label: 'Across', hint: 'trans-' },
            { key: 'between', label: 'Between', hint: 'inter-' },
            { key: 'remove', label: 'Remove / reverse', hint: 'de-' }
          ],
          items: [
            { text: 'transatlantic', bin: 'across' }, { text: 'transit', bin: 'across' },
            { text: 'interchange', bin: 'between' }, { text: 'intercity', bin: 'between' },
            { text: 'de-ice', bin: 'remove' }, { text: 'devalue', bin: 'remove' }
          ],
          why: 'Each prefix names a relation, not a degree. That is why they cluster so thickly in transport vocabulary — transport is relations between places.' },
        { id: 's4l3-03', type: 'gap', tag: 'relation-prefix', level: 'B2+',
          lines: [
            { who: 'Ground crew', text: 'There’s frost on the wings.' },
            { who: 'Captain', text: 'We can’t leave until they ___ the aircraft.' }
          ],
          options: ['un-ice', 'de-ice', 'mis-ice', 'non-ice'],
          answer: 1,
          why: '<em>de-</em> is the formal, technical removal prefix and the fixed term in aviation. <em>un-ice</em> would be understood but sounds like a child inventing it.' },
        { id: 's4l3-04', type: 'equiv', tag: 'relation-prefix', level: 'B2+',
          given: 'It is a self-catering apartment.',
          stem: 'What does this tell a guest?',
          options: ['Meals are included in the price.', 'You cook for yourself.', 'A chef visits each morning.', 'The kitchen is shared with other guests.'],
          answer: 1,
          why: '<em>self-</em> means the guest performs the action. It says nothing about sharing — that would need a different prefix, or a different word.' },
        { id: 's4l3-05', type: 'spot', tag: 'relation-prefix', level: 'B2+',
          stem: 'Click the word with the wrong prefix.',
          words: ['The', 'transcity', 'service', 'runs', 'between', 'Bangkok', 'and', 'Chiang', 'Mai.'],
          answer: 1, fix: 'intercity',
          why: 'The service runs <em>between</em> two cities, which is <em>inter-</em>. <em>Trans-</em> would mean it crosses through one — a different picture entirely.' },
        { id: 's4l3-06', type: 'table', tag: 'relation-prefix', level: 'B2+',
          table: {
            cols: ['Word', 'Prefix', 'Root meaning'],
            rows: [
              ['transport', 'trans- (across)', 'port = carry'],
              ['import', 'in- (in)', 'port = carry'],
              ['export', 'ex- (out)', 'port = carry'],
              ['support', 'sub- (under)', '?']
            ]
          },
          stem: 'What does the root mean in the last row?',
          options: ['stand', 'carry', 'look', 'hold back'],
          answer: 1,
          why: 'Same root throughout: <em>support</em> is sub + port, "carry from underneath". Once a root is visible, a whole column of vocabulary decodes itself.' }
      ]
    }
  ]
});

/* ===== GATE 5 — BOARDING =============================================== */
STAGES.push({
  id: 's5', podcast: '', slides: '', video: '', art: 'board', n: 5, name: 'Boarding', cefr: 'B2',
  gate: 'Gate 5',
  blurb: 'The back of the word. Three families of noun suffix — for qualities, for actions, and for people — and why the departures board is made almost entirely out of them.',
  lessons: [
    {
      id: 's5l1', name: 'Nouns of quality: -ness, -ity, -ance/-ence', cefr: 'B2',
      theory: {
        key: 'All three name a quality. Only one of them will attach to any adjective you like.',
        body: [
          'You need the noun of an adjective constantly: <em>She was kind</em> → <em>her <strong>kindness</strong></em>. Three suffixes do this job, and they are not free substitutes.',
          '<strong>-ness</strong> is Germanic and completely productive. It attaches to <strong>anything</strong>, including words invented this morning: <em>kindness, shyness, moodiness, loudness, quietness, selfishness, tactfulness, laid-backness</em>.',
          '<strong>-ity</strong> and <strong>-ance/-ence</strong> are Latinate, and they only attach to Latinate bases: <em>creativity, reliability, security, sociability, curiosity, practicality, loyalty, humility</em>; <em>confidence, patience, importance, resilience, tolerance, independence</em>.',
          'That is why the noun of <em>creative</em> is <em>creativity</em> and not *creativeness — the base is Latinate, so the Latinate suffix has claimed it. And it is why <em>laid-backness</em> is instantly understandable while *<em>laid-backity</em> is not a word and never will be.',
          'The practical rule: <strong>if you cannot remember the Latinate noun, -ness will always be understood.</strong> Slightly plainer, never wrong. That single fallback removes most of the panic from word-formation questions.',
          'A few pairs exist with both forms and a meaning difference worth knowing. <em>Humility</em> (the virtue) sits beside <em>humbleness</em> (the plain quality). Watch out too for <em>sensible</em> → <em>sensibility</em> against <em>sensitive</em> → <em>sensitivity</em>: two adjectives learners constantly confuse, with two separate nouns.'
        ],
        simple: [
          '<strong>-ness</strong> works on any adjective. kindness, shyness, moodiness.',
          '<strong>-ity</strong> and <strong>-ance/-ence</strong> only work on Latin-origin words. creativity, confidence.',
          'creative → <strong>creativity</strong>, not creativeness.',
          'If you are not sure, use <strong>-ness</strong>. It is plainer but never wrong.'
        ],
        examples: [
          { s: 'Her <strong>resilience</strong> after the cancellation impressed everyone.', g: 'RESILIENT (LATINATE) → -ENCE' },
          { s: 'His <strong>tactlessness</strong> at the desk made things worse.', g: 'TACTLESS → -NESS. STACKED ON TOP OF -LESS' },
          { s: 'Nobody could match the crew’s <strong>cheerfulness</strong>.', g: 'CHEER + FUL + NESS — THREE PIECES DEEP' }
        ]
      },
      items: [
        { id: 's5l1-01', type: 'choose', tag: 'noun-quality', level: 'B2',
          stem: 'The gap needs a noun: "She showed remarkable ___ after the delay." The adjective is <em>resilient</em>.',
          options: ['resilientness', 'resiliency', 'resilience', 'resilientity'],
          answer: 2,
          why: '<em>Resilient</em> is Latinate, so it takes <em>-ence</em>. (<em>Resiliency</em> exists in American English but <em>resilience</em> is the standard form.)' },
        { id: 's5l1-02', type: 'sort', tag: 'noun-quality', level: 'B2',
          stem: 'Which suffix makes the noun?',
          bins: [
            { key: 'ness', label: '-ness', hint: 'Germanic, works on anything' },
            { key: 'ity', label: '-ity', hint: 'Latinate base' },
            { key: 'ence', label: '-ance / -ence', hint: 'Latinate base' }
          ],
          items: [
            { text: 'shy', bin: 'ness' }, { text: 'moody', bin: 'ness' }, { text: 'kind', bin: 'ness' },
            { text: 'creative', bin: 'ity' }, { text: 'reliable', bin: 'ity' },
            { text: 'confident', bin: 'ence' }, { text: 'patient', bin: 'ence' }
          ],
          why: 'Look at the base, not the meaning. Short native words go to <em>-ness</em>; anything ending in <em>-ive</em>, <em>-able</em>, <em>-ent</em> or <em>-ant</em> is Latinate and goes elsewhere.' },
        { id: 's5l1-03', type: 'judge', tag: 'noun-quality', level: 'B2+',
          given: 'A colleague describes the crew as "laid-back". You write about their <em>laid-backness</em>.',
          stem: 'Is this acceptable English?',
          answer: 0,
          why: 'True — informal, but instantly understood, because <em>-ness</em> attaches to anything. Try the same with <em>-ity</em> and you get nonsense. That contrast is what productivity means.' },
        { id: 's5l1-04', type: 'gap', tag: 'noun-quality', level: 'B2',
          lines: [
            { who: 'Reference', text: 'He is sociable and hard-working.' },
            { who: 'Teacher', text: 'Now as nouns: his ___ and his willingness to work.' }
          ],
          options: ['sociableness', 'sociability', 'socialness', 'sociality'],
          answer: 1,
          why: '<em>Sociable</em> ends in the Latinate <em>-able</em>, and <em>-able</em> reliably becomes <em>-ability</em>: reliable → reliability, comparable → comparability, sociable → sociability.' },
        { id: 's5l1-05', type: 'spot', tag: 'noun-quality', level: 'B2+',
          stem: 'Click the noun that has been built wrongly.',
          words: ['His', 'creativeness', 'and', 'his', 'loyalty', 'made', 'him', 'popular.'],
          answer: 1, fix: 'creativity',
          why: '<em>Creative</em> is Latinate and has already claimed <em>-ity</em>. When a Latinate noun exists, the <em>-ness</em> form sounds like a learner error even though the rule that produced it is sound.' },
        { id: 's5l1-06', type: 'build', tag: 'noun-quality', level: 'B2+',
          stem: 'Turn "She was very patient with the passengers" into a sentence about the quality itself.',
          tiles: ['Her', 'patience', 'with', 'the', 'passengers', 'was', 'remarkable.'],
          solution: 'Her patience with the passengers was remarkable.',
          why: '<em>patient</em> → <em>patience</em>. Note the spelling change at the join: <em>-ent</em> becomes <em>-ence</em>, as in confident/confidence and independent/independence.' }
      ]
    },
    {
      id: 's5l2', name: 'Nouns of action: -ment, -tion, -al, -ure, -age', cefr: 'B2',
      theory: {
        key: 'Look at any departures board. It is five different suffixes doing one job.',
        body: [
          'Verbs become nouns through a small family of suffixes, and which one a verb takes has to be learned per verb. Fortunately, the travel lexicon puts them all on one screen.',
          '<strong>-ure</strong>: <em>depart → <strong>departure</strong></em>. Also <em>close → closure</em>, <em>fail → failure</em>, <em>press → pressure</em>.',
          '<strong>-al</strong>: <em>arrive → <strong>arrival</strong></em>. This group is small enough to memorise outright: <em>refusal, approval, removal, survival, proposal, dismissal, renewal</em>. Notice every one of them drops a silent <em>e</em> first.',
          '<strong>-ation / -tion / -sion</strong>: <em>cancel → <strong>cancellation</strong></em>, <em>inform → information</em>, <em>reserve → reservation</em>, <em>decide → decision</em>, <em>connect → connection</em>. This is the biggest group by far.',
          '<strong>-ment</strong>: <em>announce → announcement</em>, <em>develop → development</em>, <em>achieve → achievement</em>, <em>arrange → arrangement</em>, <em>pay → payment</em>.',
          '<strong>-age</strong> is the quiet one, and it gives travel two of its commonest words: <em><strong>baggage</strong></em> and <em><strong>luggage</strong></em>, along with <em>mileage, passage, breakage, storage</em>.',
          'A warning that sharpens the whole lesson: <em>depart</em> gives <em>departure</em>, but <strong>department</strong> is not the act of departing. Same root, same suffix family, but the word left home centuries ago and now means a section of an organisation. The parts predict; they do not guarantee.'
        ],
        simple: [
          'depart → depart<strong>ure</strong>. arrive → arriv<strong>al</strong>.',
          'cancel → cancell<strong>ation</strong>. announce → announce<strong>ment</strong>.',
          'bag → bagg<strong>age</strong>. lug → lugg<strong>age</strong>.',
          'Careful: <em>department</em> is NOT the act of departing.'
        ],
        examples: [
          { s: 'All <strong>departures</strong> are delayed; check the <strong>arrivals</strong> board too.', g: '-URE AND -AL, SIDE BY SIDE ON ONE SCREEN' },
          { s: 'We received no <strong>announcement</strong> about the <strong>cancellation</strong>.', g: '-MENT AND -ATION IN ONE SENTENCE' },
          { s: 'Excess <strong>baggage</strong> costs ฿600 per item.', g: '-AGE: SMALL FAMILY, HIGH FREQUENCY' }
        ]
      },
      items: [
        { id: 's5l2-01', type: 'choose', tag: 'noun-action', level: 'B2',
          stem: 'Which noun comes from the verb <em>arrive</em>?',
          options: ['arrivement', 'arrivation', 'arrival', 'arriveness'],
          answer: 2,
          why: '<em>Arrive</em> belongs to the small <em>-al</em> group: refusal, approval, removal, survival, dismissal. Note the silent <em>e</em> dropping before the suffix.' },
        { id: 's5l2-02', type: 'sort', tag: 'noun-action', level: 'B2',
          art: 'board',
          stem: 'Which suffix turns each verb into a noun?',
          bins: [
            { key: 'ure', label: '-ure', hint: 'depart → ?' },
            { key: 'al', label: '-al', hint: 'arrive → ?' },
            { key: 'ation', label: '-ation / -tion', hint: 'cancel → ?' },
            { key: 'ment', label: '-ment', hint: 'announce → ?' }
          ],
          items: [
            { text: 'depart', bin: 'ure' }, { text: 'close', bin: 'ure' },
            { text: 'arrive', bin: 'al' }, { text: 'refuse', bin: 'al' },
            { text: 'cancel', bin: 'ation' }, { text: 'reserve', bin: 'ation' },
            { text: 'announce', bin: 'ment' }, { text: 'arrange', bin: 'ment' }
          ],
          why: 'There is no rule that predicts which verb takes which — but grouping them like this is how they stick, and every one of these eight is on a departures board somewhere today.' },
        { id: 's5l2-03', type: 'table', tag: 'noun-action', level: 'B2',
          table: {
            cols: ['Verb', 'Noun', 'Suffix'],
            rows: [
              ['depart', 'departure', '-ure'],
              ['arrive', 'arrival', '-al'],
              ['cancel', 'cancellation', '-ation'],
              ['announce', '?', '-ment']
            ]
          },
          stem: 'Complete the last row.',
          options: ['announcation', 'announcement', 'announcal', 'announcure'],
          answer: 1,
          why: '<em>-ment</em> attaches without changing the base. Note it keeps the silent <em>e</em>: announce + ment, unlike arrive + al where the <em>e</em> goes.' },
        { id: 's5l2-04', type: 'judge', tag: 'noun-action', level: 'B2+',
          given: 'The <em>department</em> of a train is the moment it leaves the station.',
          stem: 'True, false, or impossible to tell?',
          answer: 1,
          why: 'False — that is <em>departure</em>. <em>Department</em> shares the root but drifted long ago into "a section of an organisation". The parts of a word predict its meaning; they do not guarantee it.' },
        { id: 's5l2-05', type: 'gap', tag: 'noun-action', level: 'B2',
          lines: [
            { who: 'Announcement', text: 'We regret to inform passengers of the ___ of flight TG406.' },
            { who: 'Kit', text: 'So it’s not delayed — it’s gone.' }
          ],
          options: ['cancel', 'cancelling', 'cancellation', 'cancelment'],
          answer: 2,
          why: 'After "the ___ of" the slot needs a noun. <em>Cancel</em> takes <em>-ation</em>, doubling the <em>l</em> in British spelling: cancellation.' },
        { id: 's5l2-06', type: 'build', tag: 'noun-action', level: 'B2+',
          stem: 'They cancelled the flight, and nobody told the passengers. Write it in formal, noun-heavy style.',
          tiles: ['The', 'cancellation', 'was', 'announced', 'without', 'any', 'explanation.'],
          solution: 'The cancellation was announced without any explanation.',
          why: 'Three action nouns in seven words. This density is what makes written notices feel official — and note how the people responsible have quietly disappeared from the sentence.' }
      ]
    },
    {
      id: 's5l3', name: 'Nouns of person: -er, -or, -ist, -ant, and the passive -ee', cefr: 'B2+',
      theory: {
        key: 'Four suffixes name the person who does it. One names the person it is done to.',
        body: [
          '<strong>-er</strong> is the everyday agent suffix and sits on native and familiar words: <em>driver, traveller, commuter, passenger, worker, holidaymaker, employer</em>.',
          '<strong>-or</strong> does the same job but prefers Latinate, official-sounding words: <em>inspector, conductor, operator, aviator, translator, supervisor</em>. So <em>driver</em> and <em>inspector</em> differ not in grammar but in the layer of English they come from.',
          '<strong>-ist</strong> names someone defined by a practice or belief: <em>tourist, motorist, cyclist, receptionist, specialist</em>.',
          '<strong>-ant / -ent</strong> comes from Latin participles: <em>attendant, assistant, applicant, resident, student</em>. A <em>flight attendant</em> is literally one who attends.',
          'And then <strong>-ee</strong>, which is the one that repays real attention, because it flips the direction. Compare <em>employ<strong>er</strong></em> (does the employing) with <em>employ<strong>ee</strong></em> (is employed). <em>interviewer/interviewee</em>. <em>trainer/trainee</em>. In travel: <em>evacuee</em> (someone who is evacuated), <em>deportee</em>, <em>returnee</em>.',
          'One lovely irregular. <em>Passenger</em> looks like pass + er, but it came through French <em>passager</em> and English inserted an extra <em>n</em> along the way — exactly as it did in <em>messenger</em> (from message) and <em>harbinger</em>. There is no rule; there is just a small club of words that grew an <em>n</em>.'
        ],
        simple: [
          '<strong>-er/-or</strong> = the person who does it. driver, inspector.',
          '<strong>-ist</strong> = tourist, motorist, cyclist. <strong>-ant</strong> = attendant, assistant.',
          '<strong>-ee</strong> = the person it is done TO. employer / employ<strong>ee</strong>.',
          'trainer trains. train<strong>ee</strong> is trained.'
        ],
        examples: [
          { s: 'The <strong>inspector</strong> checked every <strong>passenger</strong>’s ticket.', g: '-OR (OFFICIAL) AND THE IRREGULAR PASSENGER' },
          { s: 'The <strong>trainer</strong> and two <strong>trainees</strong> boarded together.', g: 'ONE DOES IT, TWO HAVE IT DONE TO THEM' },
          { s: 'Every <strong>commuter</strong> on that line is also a <strong>motorist</strong> at weekends.', g: '-ER FOR THE HABIT, -IST FOR THE CATEGORY' }
        ]
      },
      items: [
        { id: 's5l3-01', type: 'choose', tag: 'noun-person', level: 'B2+',
          stem: 'Who is being trained?',
          options: ['the trainer', 'the trainee', 'both equally', 'neither'],
          answer: 1,
          why: '<em>-ee</em> names the person the action is done to. This single suffix carries the whole meaning difference — nothing else in the two words differs.' },
        { id: 's5l3-02', type: 'sort', tag: 'noun-person', level: 'B2+',
          stem: 'Does the person do the action, or have it done to them?',
          bins: [
            { key: 'does', label: 'Does the action', hint: '-er / -or / -ist' },
            { key: 'done', label: 'Has it done to them', hint: '-ee' }
          ],
          items: [
            { text: 'employer', bin: 'does' }, { text: 'interviewer', bin: 'does' }, { text: 'inspector', bin: 'does' },
            { text: 'employee', bin: 'done' }, { text: 'interviewee', bin: 'done' }, { text: 'evacuee', bin: 'done' }
          ],
          why: 'The pairs are identical except for the suffix, which makes <em>-ee</em> the clearest example in English of a suffix carrying grammatical meaning rather than just word class.' },
        { id: 's5l3-03', type: 'gap', tag: 'noun-person', level: 'B2+',
          lines: [
            { who: 'Guard', text: 'Tickets, please.' },
            { who: 'Ploy', text: 'That’s the ___ — have yours ready.' }
          ],
          options: ['ticket inspecter', 'ticket inspector', 'ticket inspectist', 'ticket inspectee'],
          answer: 1,
          why: '<em>Inspect</em> is Latinate (in + spect, "look into"), so it takes the Latinate agent suffix <em>-or</em>. The spelling <em>-er</em> here is the commonest error in the whole family.' },
        { id: 's5l3-04', type: 'judge', tag: 'noun-person', level: 'B2+',
          given: '<em>Passenger</em> is built from <em>pass</em> plus the suffix <em>-enger</em>, and there is a general rule producing it.',
          stem: 'Is there a general rule?',
          answer: 1,
          why: 'No. The <em>n</em> was inserted as the word came through French, and only a tiny club of words did it: <em>passenger, messenger, harbinger, scavenger</em>. It is a historical accident, not a pattern to apply.' },
        { id: 's5l3-05', type: 'spot', tag: 'noun-person', level: 'B2+',
          stem: 'Click the word with the wrong suffix.',
          words: ['The', 'conducter', 'and', 'the', 'flight', 'attendant', 'both', 'spoke', 'Thai.'],
          answer: 1, fix: 'conductor',
          why: '<em>Conduct</em> is Latinate (con + duct, "lead together"), so the agent takes <em>-or</em>. The same root gives <em>duct</em>, <em>produce</em>, <em>reduce</em> and <em>introduce</em>.' },
        { id: 's5l3-06', type: 'pick', tag: 'noun-person', level: 'B2+',
          shop: 'Who to ask at the station',
          art: 'desk',
          stem: 'You say: "I need the person whose job is to check that everyone has paid."',
          items: [
            { name: 'The driver', price: '—', note: 'in the front cab' },
            { name: 'The ticket inspector', price: '—', note: 'walking through the carriages' },
            { name: 'The receptionist', price: '—', note: 'at the hotel desk' },
            { name: 'The trainee', price: '—', note: 'shadowing the guard' }
          ],
          answer: 1,
          why: 'The suffix tells you the role in every case: <em>-or</em> inspects, <em>-er</em> drives, <em>-ist</em> works a reception, <em>-ee</em> is the one being trained rather than doing a job.' }
      ]
    }
  ]
});

/* ===== GATE 6 — IN FLIGHT ============================================== */
STAGES.push({
  id: 's6', podcast: '', slides: '', video: '', art: 'nightflight', n: 6, name: 'In Flight', cefr: 'B2+',
  gate: 'Gate 6',
  blurb: 'Adjectives and verbs. The pair that is not quite a pair, the suffix that is secretly passive, and the two or three ways English turns a description into an action.',
  lessons: [
    {
      id: 's6l1', name: '-ful and -less: the pair that is not quite a pair', cefr: 'B2',
      theory: {
        key: 'Usually they are opposites. Sometimes -less means "beyond", and sometimes the -ful partner simply does not exist.',
        body: [
          'Start with the honest cases, because most of them are honest: <em>careful/careless</em>, <em>useful/useless</em>, <em>tactful/tactless</em>, <em>harmful/harmless</em>, <em>thoughtful/thoughtless</em>, <em>hopeful/hopeless</em>. Having X and lacking X.',
          'Then the trap. <strong>priceless</strong> does not mean "having no price". It means too valuable for any price to capture. The <em>-less</em> here means "beyond", not "without".',
          '<strong>invaluable</strong> does the same with a different prefix: it means extremely valuable, not un-valuable. Both words look like criticism and are in fact the highest praise available.',
          'Then the gaps. <em>ruthless</em> is common but there is no *<em>ruthful</em> in modern English. There is no *<em>pricefull</em>, no *<em>homeful</em>, no *<em>countless</em> partner. The pattern predicts; it does not guarantee. Never assume the other half exists — check.',
          'A quiet superpower: you can stack a noun suffix on top of either of them. <em>tactless → tactlessness</em>, <em>careful → carefulness</em>, <em>cheerful → cheerfulness</em>, <em>resourceful → resourcefulness</em>. Three suffixes deep and still perfectly natural.',
          'And notice what <em>-less</em> will attach to that <em>un-</em> will not: a plain noun. <em>contactless</em> payment, a <em>seatless</em> carriage, a <em>timeless</em> route. There is no *uncontact.'
        ],
        simple: [
          '<strong>-ful</strong> = having it. <strong>-less</strong> = without it. careful / careless.',
          'But <strong>priceless</strong> = too valuable to price. Not "no value"!',
          '<strong>invaluable</strong> = extremely valuable. Not "not valuable".',
          'Some halves are missing: <em>ruthless</em> exists, *ruthful does not.'
        ],
        examples: [
          { s: 'He was <strong>tactless</strong> at the desk and his <strong>tactlessness</strong> cost us the upgrade.', g: 'ADJECTIVE, THEN NOUN ON TOP OF IT' },
          { s: 'The guide’s local knowledge was <strong>invaluable</strong>.', g: 'HIGHEST PRAISE — NOT A CRITICISM' },
          { s: 'The bus takes <strong>contactless</strong> cards.', g: '-LESS ON A PLAIN NOUN. NO *UNCONTACT EXISTS' }
        ]
      },
      items: [
        { id: 's6l1-01', type: 'choose', tag: 'ful-less', level: 'B2',
          stem: 'A guide describes your photographs as <em>priceless</em>. What does she mean?',
          options: ['They are worth nothing.', 'They are too valuable to put a price on.', 'They were free to take.', 'They cannot be sold legally.'],
          answer: 1,
          why: 'Here <em>-less</em> means "beyond", not "without". <em>Priceless</em> and <em>invaluable</em> both look negative and are the strongest praise in the language.' },
        { id: 's6l1-02', type: 'sort', tag: 'ful-less', level: 'B2',
          stem: 'Does <em>-less</em> mean "without" or "beyond"?',
          bins: [
            { key: 'without', label: 'Without it', hint: 'the normal meaning' },
            { key: 'beyond', label: 'Beyond it', hint: 'the trap' }
          ],
          items: [
            { text: 'careless', bin: 'without' }, { text: 'useless', bin: 'without' }, { text: 'tactless', bin: 'without' },
            { text: 'priceless', bin: 'beyond' }, { text: 'endless', bin: 'beyond' }, { text: 'countless', bin: 'beyond' }
          ],
          why: '<em>Endless</em> and <em>countless</em> are the same trick as <em>priceless</em>: not "having no end" in a literal sense, but "so much that the measure fails".' },
        { id: 's6l1-03', type: 'judge', tag: 'ful-less', level: 'B2+',
          given: 'If <em>ruthless</em> exists, then <em>ruthful</em> must exist too.',
          stem: 'True, false, or impossible to tell?',
          answer: 1,
          why: 'False. <em>Ruth</em> meant pity in Middle English and died out, leaving only the <em>-less</em> half behind. Never assume a partner exists just because the pattern predicts it.' },
        { id: 's6l1-04', type: 'gap', tag: 'ful-less', level: 'B2+',
          lines: [
            { who: 'Complaint', text: 'The agent said we should have read the small print.' },
            { who: 'Ploy', text: 'Technically correct, but the ___ of it made me angrier.' }
          ],
          options: ['tactful', 'tactlessness', 'tactfulness', 'tactless'],
          answer: 1,
          why: 'The gap follows "the ___ of", so it needs a noun, and the meaning is the lack of tact. <em>tact → tactless → tactlessness</em>: three pieces, all necessary.' },
        { id: 's6l1-05', type: 'equiv', tag: 'ful-less', level: 'B2+',
          given: 'Her knowledge of the region was invaluable.',
          stem: 'Which is closest in meaning?',
          options: ['Her knowledge was worthless.', 'Her knowledge was extremely useful.', 'Her knowledge could not be checked.', 'Her knowledge was out of date.'],
          answer: 1,
          why: 'The <em>in-</em> here does not negate <em>valuable</em>; the whole word lexicalised long ago as "so valuable it cannot be valued". A confident guess from the parts gets this one exactly backwards.' },
        { id: 's6l1-06', type: 'build', tag: 'ful-less', level: 'B2+',
          stem: 'The crew were full of resources and it saved the day. Say it with a noun.',
          tiles: ['The', 'crew’s', 'resourcefulness', 'saved', 'the', 'whole', 'trip.'],
          solution: 'The crew’s resourcefulness saved the whole trip.',
          why: '<em>resource → resourceful → resourcefulness</em>. Noun to adjective to noun again — and the last suffix is what lets it be the subject of <em>saved</em>.' }
      ]
    },
    {
      id: 's6l2', name: '-able, -ive, -ous, -y, -ish, -ic: building adjectives', cefr: 'B2+',
      theory: {
        key: '-able is secretly passive: it means "able to be VERB-ed".',
        body: [
          '<strong>-able / -ible</strong> is the most transparent adjective suffix in English, and the one that most reliably produces words you have never seen. <em>reliable</em> = able to be relied on. <em>refundable</em> = able to be refunded. <em>unavoidable, affordable, comparable, transferable, changeable, bookable</em>.',
          'Notice that it is <strong>passive</strong>. A <em>refundable</em> ticket does not refund anything; it gets refunded. Students who see this stop mis-forming half of their adjectives.',
          '<strong>-ive</strong> tends to describe a tendency: <em>attractive, expensive, impressive, creative, talkative, protective</em>. <em>Talkative</em> is worth a second look — a Latinate suffix on the thoroughly native verb <em>talk</em>, which is rare and slightly odd, and very common.',
          '<strong>-ous</strong> means full of or characterised by: <em>dangerous, adventurous, luxurious, spacious, curious, humorous</em>.',
          '<strong>-y</strong> is the plain native one: <em>bumpy, windy, noisy, busy, moody, cloudy, foggy</em>.',
          '<strong>-ish</strong> is quietly one of the most useful things at B2, because it does <strong>approximation</strong>: <em>tallish, longish, greenish</em>, and with times and numbers — <em>"we land at sevenish"</em>, <em>"fortyish passengers"</em>. It cannot be learned from a list, only from use, and it makes a speaker sound native instantly.',
          'Finally a real split: <strong>-ic vs -ical</strong>. A <em>historic</em> day is important in history; a <em>historical</em> novel is set in the past. An <em>economic</em> policy is about the economy; an <em>economical</em> car uses little fuel. <em>Classic</em> is the best example of its kind; <em>classical</em> is ancient Greek and Roman — or Mozart.'
        ],
        simple: [
          '<strong>-able</strong> = able to be done. refundable = can be refunded.',
          '<strong>-ous</strong> = full of. dangerous, spacious, adventurous.',
          '<strong>-ish</strong> = about, approximately. "We land at seven<strong>ish</strong>."',
          '<strong>-ic</strong> vs <strong>-ical</strong>: <em>historic</em> = important. <em>historical</em> = from the past.'
        ],
        examples: [
          { s: 'The fare is <strong>changeable</strong> but not <strong>refundable</strong>.', g: 'BOTH PASSIVE: CAN BE CHANGED, CANNOT BE REFUNDED' },
          { s: 'We should land at <strong>sevenish</strong>, traffic permitting.', g: '-ISH = APPROXIMATELY. VERY NATIVE, RARELY TAUGHT' },
          { s: 'It was a <strong>historic</strong> flight on a <strong>historical</strong> route.', g: 'IMPORTANT vs FROM THE PAST — A REAL SPLIT' }
        ]
      },
      items: [
        { id: 's6l2-01', type: 'equiv', tag: 'adj-suffix', level: 'B2+',
          given: 'The ticket is transferable.',
          stem: 'Which paraphrase is exactly right?',
          options: ['The ticket transfers itself.', 'The ticket can be transferred to someone else.', 'The ticket must be transferred.', 'The ticket has been transferred.'],
          answer: 1,
          why: '<em>-able</em> is passive and possible, not active and not obligatory: "able to be VERB-ed". Every <em>-able</em> word can be expanded this way as a check.' },
        { id: 's6l2-02', type: 'gap', tag: 'adj-suffix', level: 'B2+',
          lines: [
            { who: 'Mai', text: 'What time do we get in?' },
            { who: 'Kit', text: 'Hard to say — ___, if the traffic behaves.' }
          ],
          options: ['sevenly', 'sevenish', 'sevenous', 'sevenable'],
          answer: 1,
          why: '<em>-ish</em> attaches to times and numbers to mean "approximately". It is informal, extremely common in speech, and almost never taught from a list.' },
        { id: 's6l2-03', type: 'sort', tag: 'adj-suffix', level: 'B2+',
          stem: 'Which suffix builds the adjective?',
          bins: [
            { key: 'able', label: '-able', hint: 'can be done to it' },
            { key: 'ous', label: '-ous', hint: 'full of' },
            { key: 'y', label: '-y', hint: 'plain and native' }
          ],
          items: [
            { text: 'rely', bin: 'able' }, { text: 'afford', bin: 'able' }, { text: 'avoid', bin: 'able' },
            { text: 'danger', bin: 'ous' }, { text: 'adventure', bin: 'ous' },
            { text: 'bump', bin: 'y' }, { text: 'fog', bin: 'y' }
          ],
          why: 'Note what each suffix attaches to: <em>-able</em> takes verbs (you do the action to the thing), while <em>-ous</em> and <em>-y</em> take nouns (the thing is full of it).' },
        { id: 's6l2-04', type: 'choose', tag: 'adj-suffix', level: 'B2+',
          stem: 'Which sentence uses the right member of the pair?',
          options: ['A historical day for the airline — its first transatlantic flight.', 'A historic day for the airline — its first transatlantic flight.', 'A historically day for the airline.', 'A history day for the airline.'],
          answer: 1,
          why: '<em>Historic</em> = important enough to be remembered. <em>Historical</em> = belonging to the past. A first flight is making history, not describing it.' },
        { id: 's6l2-05', type: 'spot', tag: 'adj-suffix', level: 'B2+',
          stem: 'Click the wrong word.',
          words: ['We', 'chose', 'the', 'more', 'economic', 'car', 'because', 'fuel', 'is', 'expensive.'],
          answer: 4, fix: 'economical',
          why: 'A car that uses little fuel is <em>economical</em>. <em>Economic</em> would mean "relating to the economy" — a sentence about national finance, not about your rental.' },
        { id: 's6l2-06', type: 'build', tag: 'adj-suffix', level: 'B2+',
          stem: 'You cannot get your money back and you cannot give the ticket to your sister. Say both in one sentence.',
          tiles: ['The', 'fare', 'is', 'non-refundable', 'and', 'non-transferable.'],
          solution: 'The fare is non-refundable and non-transferable.',
          why: 'Three affixes at once on each word: <em>non-</em> (category), the root, and <em>-able</em> (able to be VERB-ed). Every ticket you will ever buy says exactly this.' }
      ]
    },
    {
      id: 's6l3', name: 'Making verbs: -ise, -ify, -en, and the prefix en-', cefr: 'B2+',
      theory: {
        key: 'English builds verbs at both ends — and en- is one of the very few prefixes that changes word class.',
        body: [
          '<strong>-ise / -ize</strong> is the big one: <em>modernise, organise, computerise, privatise, prioritise, socialise, nationalise</em>. It takes Latinate bases and is fully productive — new ones appear every year.',
          '<strong>-ify</strong> does the same job on shorter Latinate bases: <em>simplify, clarify, classify, identify, notify, intensify</em>.',
          '<strong>-en</strong> is the native counterpart, and it only attaches to <strong>short Germanic adjectives</strong>: <em>shorten, widen, tighten, lengthen, strengthen, darken, sharpen, quicken</em>. You cannot say *modernen or *simplen — the base is the wrong kind of word.',
          'So the division of labour is by layer, not by meaning: short native adjective → <em>-en</em>; Latinate base → <em>-ise</em> or <em>-ify</em>. Two systems doing one job, side by side, because English kept both.',
          'And then the exception that proves Gate 1’s rule. <strong>en- / em-</strong> is a <strong>prefix</strong> that changes word class: <em>large</em> (adj) → <em>enlarge</em> (verb); <em>able</em> → <em>enable</em>; <em>rich</em> → <em>enrich</em>; <em>danger</em> (noun) → <em>endanger</em>; <em>courage</em> → <em>encourage</em>. It assimilates to <em>em-</em> before p and b, exactly like <em>in-</em>: <em>empower</em>, <em>embark</em>.',
          '<em>Embark</em> is the prize. <em>Barque</em> was a boat, so <em>embark</em> literally means "put into a boat" — and once you know that, <em>disembark</em> explains itself and never has to be memorised again.',
          'British English prefers <em>-ise</em>, American <em>-ize</em>; both are correct. What is not correct is mixing them in one document.'
        ],
        simple: [
          '<strong>-ise</strong> on longer Latin words: modernise, organise, privatise.',
          '<strong>-ify</strong> on shorter ones: simplify, clarify, notify.',
          '<strong>-en</strong> only on short native adjectives: shorten, widen, tighten.',
          '<strong>en-/em-</strong> is a prefix that makes verbs: large → <strong>en</strong>large, bark → <strong>em</strong>bark.'
        ],
        examples: [
          { s: 'They plan to <strong>modernise</strong> the fleet and <strong>shorten</strong> the route.', g: 'LATINATE → -ISE; NATIVE → -EN. ONE SENTENCE, BOTH SYSTEMS' },
          { s: 'Passengers may now <strong>embark</strong> through the rear door.', g: 'EN- + BARQUE (BOAT) = PUT INTO A BOAT' },
          { s: 'Could you <strong>clarify</strong> the baggage rules?', g: '-IFY ON A SHORT LATINATE BASE' }
        ]
      },
      items: [
        { id: 's6l3-01', type: 'choose', tag: 'verb-suffix', level: 'B2+',
          stem: 'Which verb is correctly formed from <em>short</em>?',
          options: ['shortise', 'shortify', 'shorten', 'enshort'],
          answer: 2,
          why: '<em>Short</em> is a short native adjective, so it takes <em>-en</em>. <em>-ise</em> and <em>-ify</em> need Latinate bases and simply will not attach here.' },
        { id: 's6l3-02', type: 'sort', tag: 'verb-suffix', level: 'B2+',
          stem: 'Which ending turns each word into a verb?',
          bins: [
            { key: 'en', label: '-en', hint: 'short native adjective' },
            { key: 'ise', label: '-ise', hint: 'longer Latinate base' },
            { key: 'ify', label: '-ify', hint: 'shorter Latinate base' }
          ],
          items: [
            { text: 'wide', bin: 'en' }, { text: 'tight', bin: 'en' }, { text: 'strength', bin: 'en' },
            { text: 'modern', bin: 'ise' }, { text: 'private', bin: 'ise' },
            { text: 'simple', bin: 'ify' }, { text: 'clear', bin: 'ify' }
          ],
          why: 'The split is by origin, not meaning. Every word in the <em>-en</em> box is old and native; every word in the other two boxes arrived from Latin or French.' },
        { id: 's6l3-03', type: 'judge', tag: 'verb-suffix', level: 'B2+',
          given: '<em>Enlarge</em> shows that a prefix can change a word’s class.',
          stem: 'Is this true?',
          answer: 0,
          why: 'True, and it is one of the very few. <em>Large</em> is an adjective, <em>enlarge</em> is a verb, and the prefix did it. <em>en-/em-</em> and <em>be-</em> are the small closed set of exceptions to the right-hand head rule.' },
        { id: 's6l3-04', type: 'gap', tag: 'verb-suffix', level: 'B2+',
          lines: [
            { who: 'Announcement', text: 'Passengers in rows 20–35 may now ___.' },
            { who: 'Kit', text: 'That’s us.' }
          ],
          options: ['embark', 'imbark', 'unbark', 'debark'],
          answer: 0,
          why: '<em>en-</em> becomes <em>em-</em> before <em>b</em> — the same assimilation as <em>impossible</em>. And <em>barque</em> was a boat, so the word literally means "get into the vessel".' },
        { id: 's6l3-05', type: 'spot', tag: 'verb-suffix', level: 'B2+',
          stem: 'Click the verb that has been built wrongly.',
          words: ['They', 'will', 'modernen', 'the', 'terminal', 'and', 'widen', 'the', 'runway.'],
          answer: 2, fix: 'modernise',
          why: '<em>Modern</em> is a Latinate base, so it takes <em>-ise</em>. <em>Widen</em> in the same sentence is native and correctly takes <em>-en</em> — two systems, one runway.' },
        { id: 's6l3-06', type: 'order', tag: 'verb-suffix', level: 'C1',
          stem: 'Put these in the order they happen on a ferry crossing.',
          items: ['embark', 'set sail', 'disembark', 'clear customs'],
          why: '<em>em-bark</em> in, <em>dis-embark</em> out. Two prefixes on one old root for a boat, and between them they cover the whole journey.' }
      ]
    }
  ]
});

/* ===== GATE 7 — TURBULENCE ============================================= */
STAGES.push({
  id: 's7', podcast: '', slides: '', video: '', art: 'timetable', n: 7, name: 'Turbulence', cefr: 'C1',
  gate: 'Gate 7',
  blurb: 'Where words shake. Some suffixes move the stress, some rewrite the end of the base, and all of them go in a fixed order.',
  lessons: [
    {
      id: 's7l1', name: 'Where the stress moves', cefr: 'C1',
      theory: {
        key: 'Germanic suffixes leave the stress alone. Latinate suffixes pull it onto the syllable just before them.',
        body: [
          'This is the single biggest pronunciation win available in word-building, and most students reach C1 without ever being told it.',
          '<strong>Neutral suffixes</strong> — the Germanic ones — change nothing: <em>HAPP-y → HAPP-iness</em>, <em>CARE → CARE-ful → CARE-fully</em>, <em>FRIEND → FRIEND-ship</em>, <em>TRAV-el → TRAV-eller</em>. The stress sits exactly where it was.',
          '<strong>Shifting suffixes</strong> — the Latinate ones — drag the stress to the syllable immediately before them. Say these pairs out loud and clap the beat:',
          '<em>CUR-ious → cu-ri-<strong>O</strong>-si-ty</em>. <em>re-SPON-sible → re-spon-si-<strong>BIL</strong>-ity</em>. <em>de-CIDE → de-<strong>CI</strong>-sion</em>. <em>PHO-tograph → pho-<strong>TO</strong>-grapher → pho-to-<strong>GRAPH</strong>-ic</em>. <em>PUB-lic → pub-<strong>LI</strong>-city</em>.',
          'The shifting set is worth memorising because it is small: <strong>-ity, -ion, -ic, -ial, -ious, -ify, -ial, -graphy</strong>. Everything else in this course is neutral.',
          'Why does it happen? Because the Latinate suffixes were borrowed as whole chunks from French, stress pattern included, while the native ones grew inside English where the stress had already settled on the root. Once again, the layer explains the behaviour.',
          'The practical consequence is immediate. A student who writes <em>responsibility</em> correctly but says re-SPON-si-bi-li-ty will be marked down in every speaking test they ever take, and no amount of grammar study will fix it. Clapping the beat will.'
        ],
        simple: [
          'Germanic suffixes do not move the stress. <em>HAPP-y → HAPP-iness</em>.',
          'Latin suffixes pull the stress just before themselves.',
          '<em>CUR-ious → cu-ri-<strong>O</strong>-si-ty</em>. Say it and clap.',
          'Watch for: <strong>-ity, -ion, -ic, -ial, -ious</strong>. These five move it.'
        ],
        examples: [
          { s: 'ˈcurious → curiˈosity', g: 'THE STRESS JUMPS TWO SYLLABLES RIGHT' },
          { s: 'ˈhappy → ˈhappiness &nbsp;|&nbsp; ˈcareful → ˈcarefully', g: 'GERMANIC — NOTHING MOVES AT ALL' },
          { s: 'deˈcide → deˈcision &nbsp;|&nbsp; ˈpublic → pubˈlicity', g: '-ION AND -ITY BOTH PULL IT LEFT-ADJACENT' }
        ]
      },
      items: [
        { id: 's7l1-01', type: 'choose', tag: 'stress-shift', level: 'C1',
          stem: 'Where is the stress in <em>curiosity</em>?',
          options: ['CU-ri-os-i-ty', 'cu-RI-os-i-ty', 'cu-ri-OS-i-ty', 'cu-ri-os-i-TY'],
          answer: 2,
          why: '<em>-ity</em> pulls the stress onto the syllable immediately before it. The base <em>CUR-ious</em> had it on the first syllable; the suffix moved it two places right.' },
        { id: 's7l1-02', type: 'sort', tag: 'stress-shift', level: 'C1',
          stem: 'Does the suffix move the stress or leave it alone?',
          bins: [
            { key: 'move', label: 'Moves the stress', hint: 'Latinate' },
            { key: 'stay', label: 'Leaves it alone', hint: 'Germanic' }
          ],
          items: [
            { text: '-ity', bin: 'move' }, { text: '-ion', bin: 'move' }, { text: '-ic', bin: 'move' },
            { text: '-ness', bin: 'stay' }, { text: '-ful', bin: 'stay' }, { text: '-less', bin: 'stay' }, { text: '-ship', bin: 'stay' }
          ],
          why: 'The two boxes are exactly the two layers. Sort them once by behaviour and you have also sorted them by origin — which is the point.' },
        { id: 's7l1-03', type: 'choose', tag: 'stress-shift', level: 'C1',
          stem: 'In which pair does the stress NOT move?',
          options: ['photograph → photography', 'responsible → responsibility', 'careful → carefulness', 'public → publicity'],
          answer: 2,
          why: '<em>-ness</em> is Germanic and neutral. CARE-ful becomes CARE-ful-ness with the beat untouched. The other three all take Latinate suffixes and all shift.' },
        { id: 's7l1-04', type: 'judge', tag: 'stress-shift', level: 'C1',
          given: 'A student says re-SPON-si-bi-li-ty, keeping the stress where it was in <em>responsible</em>.',
          stem: 'Has the student applied the rule correctly?',
          answer: 1,
          why: 'No. <em>-ity</em> is a shifting suffix, so the stress must move to the syllable before it: re-spon-si-BIL-ity. This is the commonest stress error in advanced learner speech.' },
        { id: 's7l1-05', type: 'order', tag: 'stress-shift', level: 'C1',
          stem: 'Put these in order of how many syllables come before the stressed one: ˈphotograph, phoˈtographer, photoˈgraphic.',
          items: ['ˈphotograph', 'phoˈtographer', 'photoˈgraphic'],
          why: 'One root, three words, three different stressed syllables — and in each case the stress lands exactly where the suffix requires. The spelling barely changes; the sound changes completely.' },
        { id: 's7l1-06', type: 'gap', tag: 'stress-shift', level: 'C1',
          lines: [
            { who: 'Student', text: 'Why does the stress move in <em>publicity</em> but not in <em>carefulness</em>?' },
            { who: 'Teacher', text: 'Because one suffix came from ___ and the other did not.' }
          ],
          options: ['Greek', 'Latin and French', 'Old Norse', 'Dutch'],
          answer: 1,
          why: 'The Latinate suffixes were borrowed as whole chunks with their stress pattern attached. The Germanic ones grew inside English after the stress had already settled on the root.' }
      ]
    },
    {
      id: 's7l2', name: 'When the base changes shape', cefr: 'C1',
      theory: {
        key: 'Adding a suffix often rewrites the end of the base. Four patterns cover most of it.',
        body: [
          'Students who have never been shown these patterns write *decidion, *explaination and *maintainance, and assume word-building is unreliable. It is not — it is just that the join has rules.',
          '<strong>1. -de / -d → -s.</strong> <em>decide → decision</em>, <em>conclude → conclusion</em>, <em>divide → division</em>, <em>expand → expansion</em>.',
          '<strong>2. -mit → -mission.</strong> <em>emit → emission</em>, <em>permit → permission</em>, <em>admit → admission</em>, <em>transmit → transmission</em>, <em>submit → submission</em>. Carbon <em>emissions</em> is emit + ion with the base rewritten — not a word to be learned separately.',
          '<strong>3. -ain → -an.</strong> <em>explain → explanation</em>, <em>maintain → maintenance</em>, <em>sustain → sustenance</em>, <em>pronounce → pronunciation</em>. That last one is the most misspelled word in English precisely because the <em>o</em> disappears at the join, and almost nobody is told that it does.',
          '<strong>4. -y → -i.</strong> <em>happy → happiness</em>, <em>busy → business</em>, <em>rely → reliance</em>, <em>apply → appliance</em>, <em>vary → variety</em>.',
          'Two smaller habits worth naming: a silent <em>e</em> usually drops before a vowel-initial suffix (<em>arrive → arrival</em>, <em>create → creation</em>, <em>secure → security</em>), and in British spelling a final consonant after a short stressed vowel doubles (<em>cancel → cancelled, cancellation</em>; <em>travel → traveller</em>).',
          'These are not exceptions to word-building. They are the small print of it, and once they are named they are easy.'
        ],
        simple: [
          'decide → deci<strong>sion</strong>. The <em>d</em> becomes <em>s</em>.',
          'emit → emi<strong>ssion</strong>. permit → permi<strong>ssion</strong>.',
          'explain → expl<strong>a</strong>nation. pronounce → pron<strong>u</strong>nciation (the <em>o</em> disappears!).',
          'happy → happ<strong>i</strong>ness. The <em>y</em> becomes <em>i</em>.'
        ],
        examples: [
          { s: 'Carbon <strong>emissions</strong> from aviation rose again last year.', g: 'EMIT + ION, WITH -MIT REWRITTEN AS -MISSION' },
          { s: 'No <strong>explanation</strong> was offered for the delay.', g: 'EXPLAIN LOSES ITS I AT THE JOIN' },
          { s: 'The <strong>pronunciation</strong> of the station name defeated everyone.', g: 'PRONOUNCE LOSES ITS O. THE CLASSIC TRAP' }
        ]
      },
      items: [
        { id: 's7l2-01', type: 'choose', tag: 'allomorphy', level: 'C1',
          stem: 'What is the noun from <em>pronounce</em>?',
          options: ['pronounciation', 'pronunciation', 'pronouncement of sounds', 'pronouncation'],
          answer: 1,
          why: 'The <em>o</em> of <em>pronounce</em> disappears at the join: pron-<strong>u</strong>-nciation. Knowing that the base is rewritten is what stops this being a memory test.' },
        { id: 's7l2-02', type: 'sort', tag: 'allomorphy', level: 'C1',
          stem: 'Which rewriting pattern does each pair use?',
          bins: [
            { key: 'ds', label: '-d → -s', hint: 'decide → decision' },
            { key: 'mit', label: '-mit → -mission', hint: 'emit → emission' },
            { key: 'y', label: 'y → i', hint: 'happy → happiness' }
          ],
          items: [
            { text: 'conclude → conclusion', bin: 'ds' }, { text: 'divide → division', bin: 'ds' },
            { text: 'permit → permission', bin: 'mit' }, { text: 'admit → admission', bin: 'mit' },
            { text: 'busy → business', bin: 'y' }, { text: 'rely → reliance', bin: 'y' }
          ],
          why: 'Three patterns, six words, no memorising. Once the pattern is named, any new member of the family is predictable.' },
        { id: 's7l2-03', type: 'spot', tag: 'allomorphy', level: 'C1',
          stem: 'Click the misspelled word.',
          words: ['The', 'airline', 'offered', 'no', 'explaination', 'for', 'the', 'cancellation.'],
          answer: 4, fix: 'explanation',
          why: '<em>Explain</em> loses its <em>i</em> before <em>-ation</em>. Compare <em>maintain → maintenance</em> and <em>sustain → sustenance</em>, which do the same thing.' },
        { id: 's7l2-04', type: 'table', tag: 'allomorphy', level: 'C1',
          table: {
            cols: ['Verb', 'Noun', 'What changed'],
            rows: [
              ['permit', 'permission', '-mit → -mission'],
              ['admit', 'admission', '-mit → -mission'],
              ['transmit', 'transmission', '-mit → -mission'],
              ['emit', '?', '-mit → -mission']
            ]
          },
          stem: 'Complete the last row.',
          options: ['emitment', 'emition', 'emission', 'emitation'],
          answer: 2,
          why: 'The whole <em>-mit</em> ending is replaced. That is why <em>carbon emissions</em> looks nothing like <em>emit</em> — and why, once you see the family, it never has to be learned alone.' },
        { id: 's7l2-05', type: 'gap', tag: 'allomorphy', level: 'C1',
          lines: [
            { who: 'Notice', text: 'The line is closed for ___ work until March.' },
            { who: 'Ploy', text: 'Three months of replacement buses, then.' }
          ],
          options: ['maintainance', 'maintenance', 'maintainment', 'maintanance'],
          answer: 1,
          why: '<em>maintain</em> → <em>maintenance</em>: the <em>-ain</em> collapses to <em>-en</em>, exactly as in <em>sustain → sustenance</em>. Same pattern, same trap.' },
        { id: 's7l2-06', type: 'build', tag: 'allomorphy', level: 'C1',
          stem: 'They decided something, and never said why. Write it with two nouns.',
          tiles: ['The', 'decision', 'was', 'taken', 'without', 'explanation.'],
          solution: 'The decision was taken without explanation.',
          why: 'Two rewritten bases in six words: <em>decide</em> → <em>decision</em> (d→s) and <em>explain</em> → <em>explanation</em> (-ain → -an).' }
      ]
    },
    {
      id: 's7l3', name: 'Derivational chains: suffixes go in a fixed order', cefr: 'C1',
      theory: {
        key: 'A long word records the order in which it was built. Walk the chain and you can derive a word you have never seen.',
        body: [
          'You cannot stack suffixes freely. Each one selects what kind of word it will attach to, so only certain sequences are legal.',
          'Walk it on the board: <em>nation</em> (noun) → <em>national</em> (adj) → <em>nationalise</em> (verb) → <em>nationalisation</em> (noun). Four steps, four classes. There is no *nationation, because <em>-ation</em> needs a verb to attach to and <em>nation</em> is a noun.',
          'Another: <em>rely</em> (verb) → <em>reliable</em> (adj) → <em>reliability</em> (noun) → and with a prefix, <em>unreliability</em>.',
          'And a third: <em>person</em> → <em>personal</em> → <em>personalise</em> → <em>personalisation</em>. Same shape as the first.',
          'Now the practical payoff. When an exam gives you <em>reliable</em> and a gap that needs a noun, do not search your memory — <strong>walk the chain</strong>. <em>-able</em> reliably becomes <em>-ability</em>. You can produce a word you have never consciously learned.',
          'Prefixes behave differently: because they do not change class, they can generally be added at any point, and they end up on the outside. <em>un</em> + <em>reliability</em> gives <em>unreliability</em>; the prefix does not care how deep the stack underneath it is.',
          'Unbuilding is the same skill in reverse, and it is what lets you read academic English at speed. <em>Internationalisation</em> peels back to <em>inter-nation-al-ise-ation</em>, and suddenly a twenty-letter word is a word you know with four labels on it.'
        ],
        simple: [
          'Suffixes go in a fixed order. You cannot jump a step.',
          'nation → national → nationalise → nationalisation.',
          'rely → reliable → reliability. <em>-able</em> always gives <em>-ability</em>.',
          'Need a noun from <em>reliable</em>? Do not remember — <strong>walk the chain</strong>.'
        ],
        examples: [
          { s: 'nation → nation<strong>al</strong> → national<strong>ise</strong> → nationalis<strong>ation</strong>', g: 'NOUN → ADJ → VERB → NOUN. NO STEP SKIPPED' },
          { s: 'rely → reli<strong>able</strong> → reliab<strong>ility</strong> → <strong>un</strong>reliability', g: 'THE PREFIX GOES ON LAST, ON THE OUTSIDE' },
          { s: 'inter·nation·al·is·ation', g: 'TWENTY LETTERS, ONE ROOT, FOUR LABELS' }
        ]
      },
      items: [
        { id: 's7l3-01', type: 'order', tag: 'suffix-order', level: 'C1',
          stem: 'Put these in the order they were built.',
          items: ['rely', 'reliable', 'reliability', 'unreliability'],
          why: 'Verb → adjective → noun, then the prefix on the outside. The prefix comes last because it does not change class and so has nothing to select.' },
        { id: 's7l3-02', type: 'choose', tag: 'suffix-order', level: 'C1',
          stem: 'Why is there no word *<em>nationation</em>?',
          options: ['It is too long.', '<em>-ation</em> attaches to verbs, and <em>nation</em> is a noun.', 'The stress would be wrong.', 'It is only used in American English.'],
          answer: 1,
          why: 'Each suffix selects a class to attach to. You must first make a verb — <em>nationalise</em> — before <em>-ation</em> has anything to work on.' },
        { id: 's7l3-03', type: 'gap', tag: 'suffix-order', level: 'C1',
          lines: [
            { who: 'Exam paper', text: 'The airline’s ___ has been widely criticised. (RELY)' },
            { who: 'Mai', text: 'It needs a noun, so from rely I walk the chain: rely, reliable, ___.' }
          ],
          options: ['reliableness', 'reliability', 'reliation', 'relyment'],
          answer: 1,
          why: '<em>-able</em> reliably becomes <em>-ability</em>. Walking two steps produces the right word without ever having memorised it.' },
        { id: 's7l3-04', type: 'order', tag: 'suffix-order', level: 'C1',
          stem: 'Unbuild <em>internationalisation</em>: put the pieces in the order they appear.',
          items: ['inter', 'nation', 'al', 'is', 'ation'],
          why: 'Prefix on the left, then the root, then each suffix in the order it was added. Reading a long word this way is how fluent readers cope with academic prose.' },
        { id: 's7l3-05', type: 'judge', tag: 'suffix-order', level: 'C1',
          given: 'Because prefixes do not change word class, <em>un-</em> can be added to <em>reliability</em> without breaking any rule.',
          stem: 'Is this right?',
          answer: 0,
          why: 'True. The prefix has nothing to select, so it can sit on the outside of any stack. That is exactly why <em>unreliability</em> and <em>uncomfortableness</em> are both possible, however deep the word already is.' },
        { id: 's7l3-06', type: 'build', tag: 'suffix-order', level: 'C1',
          stem: 'Build a sentence about an airline you cannot depend on, using a noun built from <em>rely</em>.',
          tiles: ['The', 'airline’s', 'unreliability', 'has', 'cost', 'it', 'passengers.'],
          solution: 'The airline’s unreliability has cost it passengers.',
          why: 'Four pieces — un + rely + able + ity — assembled in exactly one legal order, and the result is a perfectly ordinary word.' }
      ]
    }
  ]
});

/* ===== GATE 8 — ARRIVALS =============================================== */
STAGES.push({
  id: 's8', podcast: '', slides: '', video: '', art: 'arrivals', n: 8, name: 'Arrivals', cefr: 'C1',
  gate: 'Gate 8',
  blurb: 'Why English works this way at all. Three languages in one, the words that drifted away from their own parts, and how a C1 writer uses a whole word family on purpose.',
  lessons: [
    {
      id: 's8l1', name: 'The three Englishes', cefr: 'C1',
      theory: {
        key: 'English carries three vocabularies at once, each with its own affixes — and affixes prefer their own layer.',
        body: [
          'Almost every "irregularity" in this course is one historical fact in disguise.',
          'The <strong>Germanic</strong> layer is the oldest and the most everyday. Its affixes: <em>un-, mis-, over-, under-, fore-, out-, be-</em> and <em>-ness, -ful, -less, -ish, -er, -hood, -ship, -en, -ly</em>.',
          'The <strong>Latinate</strong> layer arrived with the Normans after 1066 and with scholarship afterwards. Its affixes: <em>in-/im-/il-/ir-, dis-, re-, pre-, post-, sub-, trans-, inter-, ex-, co-, de-</em> and <em>-tion, -ity, -ance/-ence, -ment, -al, -ous, -ive, -able, -or, -ify</em>.',
          'The <strong>Greek</strong> layer came later and mostly technical: <em>anti-, hyper-, hypo-, mono-, poly-, auto-, tele-, micro-, macro-</em> and <em>-ism, -ist, -graphy, -ology</em>.',
          'The rule that falls out of this: <strong>affixes prefer their own layer</strong>. That is why we say <em>unhappy</em> but <em>improbable</em>, and why <em>un-</em> works on borrowed words (<em>uncomfortable, unreliable</em>) while <em>in-</em> never works on native ones — there is no *inhappy, *inkind, *inloud.',
          'The layers also carry <strong>register</strong>. The Germanic half is plain, short and warm; the Latinate half is formal, longer and cooler. <em>We are sorry your bags were lost</em> against <em>we regret the misrouting of your baggage</em>: same event, different relationship with the reader.',
          'Finally, the productivity difference. <em>-ness</em> will attach to anything, including a word invented ten seconds ago. <em>-ity</em> will not. That is not a rule someone made; it is what happens when a suffix is native and has never stopped working.'
        ],
        simple: [
          'English has three word stocks: Germanic (old), Latin/French (1066 on), Greek (technical).',
          'Each brought its own affixes, and they prefer their own kind.',
          'That is why <em>unhappy</em> is fine but *<em>inhappy</em> is not a word.',
          'Germanic = plain and warm. Latinate = formal and cool.'
        ],
        examples: [
          { s: '<strong>unhappy</strong> (native) &nbsp;vs&nbsp; <strong>improbable</strong> (borrowed)', g: 'EACH NEGATIVE STAYS IN ITS OWN LAYER' },
          { s: 'We are <strong>sorry</strong> your bags were <strong>lost</strong>.', g: 'GERMANIC: SHORT, PLAIN, HUMAN' },
          { s: 'We <strong>regret</strong> the <strong>misrouting</strong> of your <strong>baggage</strong>.', g: 'LATINATE: FORMAL, COOL, DISTANT' }
        ]
      },
      items: [
        { id: 's8l1-01', type: 'choose', tag: 'layers', level: 'C1',
          stem: 'Why is there no English word *<em>inhappy</em>?',
          options: ['It is too hard to pronounce.', '<em>in-</em> is Latinate and <em>happy</em> is native, so they do not combine.', 'It existed once but died out.', '<em>Happy</em> cannot be negated at all.'],
          answer: 1,
          why: 'Affixes prefer their own layer. Latinate <em>in-</em> attaches to Latinate bases; native <em>happy</em> takes native <em>un-</em>. One fact explains the whole confusing table.' },
        { id: 's8l1-02', type: 'sort', tag: 'layers', level: 'C1',
          stem: 'Which layer does each affix belong to?',
          bins: [
            { key: 'germ', label: 'Germanic', hint: 'old and everyday' },
            { key: 'lat', label: 'Latinate', hint: 'formal, post-1066' },
            { key: 'greek', label: 'Greek', hint: 'technical' }
          ],
          items: [
            { text: '-ness', bin: 'germ' }, { text: 'un-', bin: 'germ' }, { text: '-ful', bin: 'germ' },
            { text: '-tion', bin: 'lat' }, { text: 'trans-', bin: 'lat' }, { text: '-ity', bin: 'lat' },
            { text: 'hyper-', bin: 'greek' }, { text: '-ology', bin: 'greek' }
          ],
          why: 'Sorting by origin also sorts by behaviour: everything in the Germanic box is neutral for stress and freely productive; everything in the Latinate box shifts stress and is choosier.' },
        { id: 's8l1-03', type: 'equiv', tag: 'layers', level: 'C1',
          given: 'We regret the misrouting of your baggage and the resultant inconvenience.',
          stem: 'What does the Latinate vocabulary achieve here?',
          options: ['It makes the apology warmer.', 'It creates formal distance and softens the admission.', 'It makes the sentence easier to understand.', 'It shows the writer is not a native speaker.'],
          answer: 1,
          why: 'The layer is a choice, not an accident. Long Latinate nouns put space between the company and the fault. "Sorry we lost your bags" would be shorter, warmer, and far more damaging.' },
        { id: 's8l1-04', type: 'judge', tag: 'layers', level: 'C1',
          given: 'You can attach <em>-ness</em> to an adjective invented five seconds ago and be understood.',
          stem: 'True, false, or impossible to tell?',
          answer: 0,
          why: 'True, and that is what productivity means. Try the same with <em>-ity</em> and nothing happens. The native suffix never stopped working; the borrowed one arrived in finished words.' },
        { id: 's8l1-05', type: 'gap', tag: 'layers', level: 'C1',
          lines: [
            { who: 'Student', text: 'Is it <em>anticlockwise</em> or <em>counterclockwise</em>?' },
            { who: 'Teacher', text: 'Both. One is Greek, one is Latin — and the two layers are still ___ for the same job.' }
          ],
          options: ['merging', 'competing', 'disappearing', 'borrowing'],
          answer: 1,
          why: 'British English took the Greek <em>anti-</em>, American English the Latin <em>counter-</em>. Two layers competing over one meaning, in living memory.' },
        { id: 's8l1-06', type: 'build', tag: 'layers', level: 'C1',
          stem: 'Rewrite "sorry, the plane is late" in cool, formal, Latinate English.',
          tiles: ['We', 'regret', 'the', 'delayed', 'departure', 'of', 'this', 'service.'],
          solution: 'We regret the delayed departure of this service.',
          why: 'Every content word has moved layer: sorry→regret, late→delayed, plane→service, and the verb has become the noun <em>departure</em>. The feeling changes completely and the facts do not.' }
      ]
    },
    {
      id: 's8l2', name: 'When the parts stop adding up', cefr: 'C1',
      theory: {
        key: 'Guess from the parts — then check whether the word has moved on without them.',
        body: [
          'A word built from transparent parts can drift until its meaning is no longer the sum of them. This is not a flaw in the system; it is what happens to any word used often enough.',
          'The honest ones behave: <em>rebook</em>, <em>unpack</em>, <em>tactless</em>, <em>refundable</em>, <em>overcrowded</em>. Parts in, meaning out.',
          'The drifted ones do not. <strong>department</strong> is not the act of departing. <strong>resort</strong> (re + sortir, "go back to") is a holiday place. <strong>commute</strong> (com + mutare, "change together") originally meant exchanging one payment for another — a season ticket — and only later came to mean the daily journey itself. <strong>excursion</strong> (ex + currere, "run out") is now an organised outing with a guide.',
          'And the evaluative ones catch even advanced students. <strong>priceless</strong> means beyond price. <strong>invaluable</strong> means extremely valuable. <strong>disinterested</strong> means impartial, not bored — the word for bored is <em>uninterested</em>, and the difference matters in a courtroom, in an examination, and in any sentence about a judge.',
          'Travel is full of these because travel words are old and heavily used. <strong>transfer</strong> was "carry across"; <strong>reservation</strong> was the thing kept back; <strong>terminal</strong> was simply the end.',
          'So the C1 habit is two-step, not one: <strong>guess from the parts, then check whether the word has left home.</strong> The guess is right most of the time, and knowing when to distrust it is what separates a confident reader from a confidently wrong one.'
        ],
        simple: [
          'Usually the parts tell you the meaning. Sometimes the word has changed.',
          '<em>department</em> is NOT the act of departing.',
          '<em>disinterested</em> = fair and impartial. <em>uninterested</em> = bored.',
          'Guess from the parts — then check.'
        ],
        examples: [
          { s: 'A <strong>resort</strong> is literally a place you go back to.', g: 'THE PARTS STILL EXPLAIN IT — JUST NOT OBVIOUSLY' },
          { s: 'We need a <strong>disinterested</strong> third party to decide.', g: 'IMPARTIAL, NOT BORED. A REAL AND COSTLY TRAP' },
          { s: 'She <strong>commutes</strong> ninety minutes each way.', g: 'ONCE "TO EXCHANGE A PAYMENT". NOW THE JOURNEY ITSELF' }
        ]
      },
      items: [
        { id: 's8l2-01', type: 'choose', tag: 'lexicalised', level: 'C1',
          stem: 'A contract requires a <em>disinterested</em> assessor. What is being required?',
          options: ['Someone who finds the case boring.', 'Someone with no personal stake in the outcome.', 'Someone who has not read the file.', 'Someone who works for free.'],
          answer: 1,
          why: '<em>Disinterested</em> means impartial — having no interest in the sense of a stake. Bored is <em>uninterested</em>. Two prefixes, two completely different requirements.' },
        { id: 's8l2-02', type: 'sort', tag: 'lexicalised', level: 'C1',
          stem: 'Do the parts still add up to the meaning?',
          bins: [
            { key: 'yes', label: 'The parts add up', hint: 'transparent' },
            { key: 'no', label: 'The word has drifted', hint: 'learn it whole' }
          ],
          items: [
            { text: 'rebook', bin: 'yes' }, { text: 'overcrowded', bin: 'yes' }, { text: 'refundable', bin: 'yes' },
            { text: 'department', bin: 'no' }, { text: 'priceless', bin: 'no' }, { text: 'commute', bin: 'no' }
          ],
          why: 'The left box can be decoded on sight; the right box will mislead anyone who tries. Knowing which is which is the whole C1 skill.' },
        { id: 's8l2-03', type: 'judge', tag: 'lexicalised', level: 'C1',
          given: 'Since <em>depart</em> gives <em>departure</em>, the word <em>department</em> must mean a leaving.',
          stem: 'True, false, or impossible to tell?',
          answer: 1,
          why: 'False. Same root, same suffix family, but <em>department</em> settled centuries ago on "a separate section of an organisation" — from the "divide" sense of <em>part</em>, not the "leave" sense.' },
        { id: 's8l2-04', type: 'equiv', tag: 'lexicalised', level: 'C1',
          given: '<em>Excursion</em> comes from Latin <em>ex</em> (out) + <em>currere</em> (to run).',
          stem: 'Which modern word shares that root?',
          options: ['excuse', 'current', 'excellent', 'exchange'],
          answer: 1,
          why: '<em>Current</em>, <em>occur</em>, <em>recur</em> and <em>course</em> all carry <em>curr-/curs-</em>. A current runs; an excursion runs out of town and back again.' },
        { id: 's8l2-05', type: 'gap', tag: 'lexicalised', level: 'C1',
          lines: [
            { who: 'Guide', text: 'Why is a holiday village called a "resort"?' },
            { who: 'Teacher', text: 'Because <em>re-sort</em> meant to go ___ to a place, again and again.' }
          ],
          options: ['past', 'back', 'through', 'around'],
          answer: 1,
          why: 'Fossil <em>re-</em> meaning "back", exactly as in <em>return</em> and <em>recover</em>. The resort is the place you keep returning to — which is precisely what the industry sells.' },
        { id: 's8l2-06', type: 'spot', tag: 'lexicalised', level: 'C1',
          stem: 'Click the word that has been used with the wrong meaning.',
          words: ['The', 'judge', 'was', 'uninterested', 'and', 'so', 'gave', 'a', 'fair', 'ruling.'],
          answer: 3, fix: 'disinterested',
          why: 'A fair ruling needs impartiality, which is <em>disinterested</em>. <em>Uninterested</em> would mean the judge was bored — hardly a reason for a good decision.' }
      ]
    },
    {
      id: 's8l3', name: 'Writing with a word family: nominalisation and conversion', cefr: 'C1',
      theory: {
        key: 'At C1 the point stops being accuracy and becomes control. Both directions, on demand.',
        body: [
          'Compare two versions of one event. Plain: <em>They cancelled the flight because the engine failed, and nobody told us.</em> Formal: <em>The cancellation followed an engine failure, and no announcement was made.</em>',
          'The second is denser, cooler, and more academic. It is also missing something: <strong>the agent has disappeared</strong>. Nobody cancelled anything; a cancellation simply occurred. That is why official writing loves <strong>nominalisation</strong>, and why a good reader always asks who actually did it.',
          'Nominalising is the standard move for academic register: <em>rise → a rise in</em>, <em>increase → an increase of</em>, <em>fail → failure</em>, <em>arrive → arrival</em>, <em>emit → emissions</em>. IELTS Task 1 runs on it.',
          'But the reverse move matters just as much. Over-nominalised prose is exhausting: <em>the implementation of the modernisation of the reservation system</em> says less than <em>we are modernising how people book</em>. A C1 writer can go both ways and chooses deliberately.',
          'Finally, <strong>conversion</strong> — changing class with <strong>no suffix at all</strong>. <em>a delay / to delay</em>. <em>a board / to board</em>. <em>a queue / to queue</em>. <em>a transfer / to transfer</em>. <em>a fine / to fine</em>. <em>a launch / to launch</em>. English does this constantly and it is invisible to learners who are watching only the endings.',
          'Conversion is also why the affix system never feels closed. When no suffix fits, English simply moves the word and lets context do the work — and a hundred years later somebody writes a grammar explaining it.'
        ],
        simple: [
          'Verb → noun makes writing formal: <em>they cancelled</em> → <em>the cancellation</em>.',
          'But it hides WHO did it. Always ask: who actually cancelled?',
          'Too many nouns is heavy. A good writer goes both ways.',
          '<strong>Conversion</strong>: some words change class with no suffix. <em>a delay / to delay</em>.'
        ],
        examples: [
          { s: 'They cancelled it → <strong>The cancellation</strong> was announced at 06:15.', g: 'FORMAL, DENSE — AND THE AGENT HAS VANISHED' },
          { s: 'Carbon <strong>emissions</strong> from aviation rose 4% on 2019.', g: 'NOMINALISED, PRECISE. STANDARD ACADEMIC SHAPE' },
          { s: 'There was a <strong>delay</strong>, so they <strong>delayed</strong> boarding.', g: 'CONVERSION: SAME FORM, TWO CLASSES, NO SUFFIX' }
        ]
      },
      items: [
        { id: 's8l3-01', type: 'equiv', tag: 'nominalisation', level: 'C1',
          given: 'The cancellation was announced without explanation.',
          stem: 'What has this sentence removed compared with "They cancelled it and did not explain why"?',
          options: ['The time it happened.', 'The people responsible.', 'The reason it matters.', 'The fact that it was announced.'],
          answer: 1,
          why: 'Nominalisation packs the action into a noun and lets the agent drop out entirely. That deletion is often the real reason the construction was chosen.' },
        { id: 's8l3-02', type: 'sort', tag: 'nominalisation', level: 'C1',
          stem: 'Does the word need a suffix to change class, or does it convert with no change at all?',
          bins: [
            { key: 'suffix', label: 'Needs a suffix', hint: 'arrive → arrival' },
            { key: 'zero', label: 'Converts unchanged', hint: 'a delay / to delay' }
          ],
          items: [
            { text: 'arrive → arrival', bin: 'suffix' }, { text: 'cancel → cancellation', bin: 'suffix' }, { text: 'depart → departure', bin: 'suffix' },
            { text: 'delay', bin: 'zero' }, { text: 'board', bin: 'zero' }, { text: 'queue', bin: 'zero' }
          ],
          why: 'English uses both routes side by side. A learner who watches only endings never notices the second one, and then cannot explain why <em>board</em> is a verb on the announcement and a noun on the wall.' },
        { id: 's8l3-03', type: 'build', tag: 'nominalisation', level: 'C1',
          stem: 'Raise this to academic register: "Aviation emitted 4% more carbon than in 2019."',
          tiles: ['Carbon', 'emissions', 'from', 'aviation', 'rose', '4%', 'on', '2019.'],
          solution: 'Carbon emissions from aviation rose 4% on 2019.',
          why: 'The verb <em>emit</em> becomes the noun <em>emissions</em> and the sentence is now about a quantity rather than an actor — which is exactly the shape Task 1 rewards.' },
        { id: 's8l3-04', type: 'choose', tag: 'nominalisation', level: 'C1',
          stem: 'Which sentence is over-nominalised?',
          options: ['We are modernising the booking system.', 'The implementation of the modernisation of the reservation system is under way.', 'The booking system is being modernised.', 'Modernisation of the booking system has begun.'],
          answer: 1,
          why: 'Three abstract nouns stacked in a row, and not one of them names who is doing it. Nominalisation is a tool; used without restraint it removes all the information.' },
        { id: 's8l3-05', type: 'judge', tag: 'nominalisation', level: 'C1',
          given: 'In "they delayed the delay announcement", the word <em>delay</em> appears as both a verb and a noun with no change of form.',
          stem: 'Is this correct?',
          answer: 0,
          why: 'True. <em>Delay</em> converts freely between classes with no suffix at all. Conversion is one of English’s most productive word-building processes and the only one with nothing to see.' },
        { id: 's8l3-06', type: 'gap', tag: 'nominalisation', level: 'C1',
          lines: [
            { who: 'Report', text: 'Punctuality improved after the timetable was rewritten.' },
            { who: 'Editor', text: 'Nominalise it: "The ___ in punctuality followed the timetable rewrite."' }
          ],
          options: ['improve', 'improving', 'improvement', 'improvable'],
          answer: 2,
          why: 'After "the ___ in" the slot needs a noun, and <em>improve</em> takes <em>-ment</em>. The rewritten sentence is denser, more formal, and has quietly lost whoever did the rewriting.' }
      ]
    }
  ]
});

/* ===== BORDER CHECKS ====================================================
   8 items each. Items mix every lesson in the gate, and from Gate 3 on they
   interleave one or two items from earlier gates — interleaving is what
   makes a review test diagnostic rather than decorative.
   ======================================================================= */
const CHALLENGES = {

  s1: { id: 's1ch', name: 'Border Check 1', items: [
    { id: 's1ch-1', type: 'choose', tag: 'word-parts', level: 'B1',
      stem: 'What is the root of <em>unreliability</em>?',
      options: ['un', 'rely', 'able', 'ability'],
      answer: 1, why: 'The smallest real word inside is <em>rely</em>. Everything else is a label: un + rely + able + ity.' },
    { id: 's1ch-2', type: 'choose', tag: 'head-right', level: 'B1',
      stem: '"Her ___ surprised everyone." The adjective is <em>shy</em>. Which form fits?',
      options: ['unshy', 'shyly', 'shyness', 'shy'],
      answer: 2, why: 'The gap needs a noun, and only a suffix can build one. A prefix would leave it an adjective.' },
    { id: 's1ch-3', type: 'spot', tag: 'in-allomorphy', level: 'B1',
      stem: 'Click the misspelled word.',
      words: ['Parking', 'here', 'is', 'inlegal', 'and', 'impolite.'],
      answer: 3, fix: 'illegal', why: 'Before <em>l</em>, <em>in-</em> becomes <em>il-</em>. Note <em>impolite</em> in the same line has already assimilated before <em>p</em>.' },
    { id: 's1ch-4', type: 'sort', tag: 'in-allomorphy', level: 'B1',
      stem: 'Which shape does the Latin negative take?',
      bins: [
        { key: 'im', label: 'im-', hint: 'before p, b, m' },
        { key: 'ir', label: 'ir-', hint: 'before r' },
        { key: 'un', label: 'un-', hint: 'never changes' }
      ],
      items: [
        { text: 'possible', bin: 'im' }, { text: 'mature', bin: 'im' },
        { text: 'responsible', bin: 'ir' }, { text: 'regular', bin: 'ir' },
        { text: 'popular', bin: 'un' }, { text: 'kind', bin: 'un' }
      ],
      why: 'Assimilation belongs to the Latin prefix only. <em>Popular</em> and <em>kind</em> take <em>un-</em>, which never changes shape whatever follows it.' },
    { id: 's1ch-5', type: 'judge', tag: 'head-right', level: 'B1',
      given: 'Adding a prefix to an adjective can turn it into a noun.',
      stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False. Prefixes change meaning; suffixes change class. <em>unhappy</em> is still an adjective.' },
    { id: 's1ch-6', type: 'order', tag: 'word-parts', level: 'B1',
      stem: 'Put the pieces of <em>disembarkation</em> in order.',
      items: ['dis', 'em', 'bark', 'ation'],
      why: 'Prefixes on the left in the order added, suffixes on the right. <em>bark</em> is an old word for a boat.' },
    { id: 's1ch-7', type: 'gap', tag: 'head-right', level: 'B1+',
      lines: [
        { who: 'Teacher', text: 'After "showed great" you need a noun.' },
        { who: 'Kit', text: 'So from <em>kind</em> I write ___.' }
      ],
      options: ['unkind', 'kindly', 'kindness', 'kinder'],
      answer: 2, why: '<em>-ness</em> is the noun-building suffix. <em>-ly</em> gives an adverb and <em>un-</em> keeps it an adjective.' },
    { id: 's1ch-8', type: 'build', tag: 'word-parts', level: 'B1+',
      stem: 'You do not know the word "unbookable". Explain how you worked it out.',
      tiles: ['I', 'found', 'the', 'root', 'book', 'inside', 'it.'],
      solution: 'I found the root book inside it.',
      why: 'Strip the labels and a familiar word appears. That habit is the whole of Gate 1.' }
  ] },

  s2: { id: 's2ch', name: 'Border Check 2', items: [
    { id: 's2ch-1', type: 'choose', tag: 'un-dis-mis', level: 'B1+',
      stem: '"I ___ the gate number and went to the wrong end of the terminal."',
      options: ['unread', 'misread', 'disread', 'non-read'],
      answer: 1, why: 'You did read it — wrongly. That is exactly what <em>mis-</em> encodes.' },
    { id: 's2ch-2', type: 'choose', tag: 'un-reversive', level: 'B1+',
      stem: 'In which sentence does <em>un-</em> mean "reverse the action"?',
      options: ['The lounge was unusually busy.', 'She unpacked in ten minutes.', 'The seats were uncomfortable.', 'He was unwilling to wait.'],
      answer: 1, why: '<em>Unpack</em> is a verb and presupposes that packing happened first. The rest are adjectives meaning "not".' },
    { id: 's2ch-3', type: 'sort', tag: 'un-dis-mis', level: 'B1+',
      stem: 'Did the action happen?',
      bins: [
        { key: 'did', label: 'Happened, but wrongly', hint: 'mis-' },
        { key: 'not', label: 'Did not happen', hint: 'un- / dis-' }
      ],
      items: [
        { text: 'misjudged the gap', bin: 'did' }, { text: 'misrouted the bags', bin: 'did' }, { text: 'miscounted the seats', bin: 'did' },
        { text: 'disconnected the call', bin: 'not' }, { text: 'unfastened the belt', bin: 'not' }, { text: 'disagreed with the guide', bin: 'not' }
      ],
      why: '<em>mis-</em> always concedes that the action took place. That is why airlines prefer it to "lost".' },
    { id: 's2ch-4', type: 'gap', tag: 'non-neutral', level: 'B2',
      lines: [
        { who: 'Agent', text: 'The ticket is in your brother’s name, so you cannot use it.' },
        { who: 'Mai', text: 'Because it’s ___?' }
      ],
      options: ['untransferable', 'non-transferable', 'mistransferable', 'distransferable'],
      answer: 1, why: 'A neutral category on a ticket, not a criticism. <em>non-</em> is the industry standard for exactly that reason.' },
    { id: 's2ch-5', type: 'equiv', tag: 'non-neutral', level: 'B2',
      given: 'She is a non-professional guide.',
      stem: 'What does this say about her?',
      options: ['She behaves badly.', 'She does not do it for a living.', 'She is unqualified and dangerous.', 'She has been struck off.'],
      answer: 1, why: '<em>non-</em> classifies without judging. <em>Unprofessional</em> would have been the accusation.' },
    { id: 's2ch-6', type: 'spot', tag: 'un-dis-mis', level: 'B2',
      stem: 'Click the word with the wrong prefix.',
      words: ['He', 'was', 'a', 'mishonest', 'driver', 'who', 'overcharged', 'tourists.'],
      answer: 3, fix: 'dishonest', why: '<em>Honest</em> is a state, not an action, so it cannot be done wrongly. It takes the negative <em>dis-</em>.' },
    { id: 's2ch-7', type: 'judge', tag: 'un-reversive', level: 'B2',
      given: 'You can unload a lorry that was never loaded.',
      stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False. Reversive <em>un-</em> requires that the original action happened. This is why *unknow and *unsee feel like jokes.' },
    { id: 's2ch-8', type: 'choose', tag: 'in-allomorphy', level: 'B1+',
      stem: 'Which is correct?',
      options: ['inpatient with the queue', 'impatient with the queue', 'unpatient with the queue', 'ilpatient with the queue'],
      answer: 1, why: 'Before <em>p</em> the <em>n</em> becomes <em>m</em>. Interleaved from Gate 1 — assimilation does not stop being true.' }
  ] },

  s3: { id: 's3ch', name: 'Border Check 3', items: [
    { id: 's3ch-1', type: 'choose', tag: 'over-under', level: 'B2',
      stem: 'The trip took 90 minutes. You had promised everyone four hours. What did you do?',
      options: ['underestimated it', 'overestimated it', 'misestimated it', 'non-estimated it'],
      answer: 1, why: 'Your estimate was above reality. The prefix describes the estimate, not the journey.' },
    { id: 's3ch-2', type: 'choose', tag: 'super-out', level: 'B2',
      stem: 'Which is correctly formed?',
      options: ['Ferries outnumber than flights here.', 'Ferries outnumber flights here.', 'Ferries outnumber more than flights here.', 'Ferries are outnumber flights here.'],
      answer: 1, why: '<em>out-</em> verbs are transitive: the rival is the direct object, with no <em>than</em>.' },
    { id: 's3ch-3', type: 'sort', tag: 'over-under', level: 'B2',
      stem: 'Which side of the standard?',
      bins: [
        { key: 'over', label: 'More than it should be', hint: 'over-' },
        { key: 'under', label: 'Less than it should be', hint: 'under-' }
      ],
      items: [
        { text: 'the coach was ___booked', bin: 'over' }, { text: 'the room was ___priced', bin: 'over' }, { text: 'the case was ___weight', bin: 'over' },
        { text: 'the line is ___used', bin: 'under' }, { text: 'the staff are ___paid', bin: 'under' }, { text: 'the team is ___staffed', bin: 'under' }
      ],
      why: 'Every one has a nameable standard. Ask "more than what?" and the prefix chooses itself.' },
    { id: 's3ch-4', type: 'gap', tag: 'sub-semi', level: 'B2',
      lines: [
        { who: 'Ploy', text: 'Is it direct?' },
        { who: 'Agent', text: 'Almost — it’s ___. One stop only.' }
      ],
      options: ['non-direct', 'semi-direct', 'subdirect', 'underdirect'],
      answer: 1, why: 'Partly direct. <em>semi-</em> claims exactly as much as is true, which is why honest travel copy is full of it.' },
    { id: 's3ch-5', type: 'judge', tag: 'over-under', level: 'B2',
      given: 'A van overtook the coach on the motorway, so it used too much road.',
      stem: 'Does <em>over-</em> mean "too much" here?',
      answer: 1, why: 'No. In <em>overtake, overseas, overlook</em> the prefix keeps its older spatial sense of "past, across, above".' },
    { id: 's3ch-6', type: 'equiv', tag: 'super-out', level: 'B2+',
      given: 'Those buses have lasted longer than every model built since.',
      stem: 'Which single verb says the same?',
      options: ['They overlasted every later model.', 'They outlasted every later model.', 'They superlasted every later model.', 'They underlasted every later model.'],
      answer: 1, why: '<em>outlast</em> = last longer than. One word, six words’ work — the compression is the point.' },
    { id: 's3ch-7', type: 'spot', tag: 'over-under', level: 'B2',
      stem: 'Click the word with the wrong direction.',
      words: ['We', 'overestimated', 'the', 'queue', 'and', 'nearly', 'missed', 'boarding.'],
      answer: 1, fix: 'underestimated',
      why: 'Nearly missing it means the queue was worse than expected — the estimate was too low.' },
    { id: 's3ch-8', type: 'choose', tag: 'un-dis-mis', level: 'B1+',
      stem: 'The airline says your case was ___. It travelled, but to Manila.',
      options: ['unrouted', 'misrouted', 'non-routed', 'derouted'],
      answer: 1, why: 'Interleaved from Gate 2. <em>mis-</em> concedes the action and blames only its direction.' }
  ] },

  s4: { id: 's4ch', name: 'Border Check 4', items: [
    { id: 's4ch-1', type: 'choose', tag: 're-again', level: 'B2',
      stem: 'In which word does <em>re-</em> still mean "again"?',
      options: ['receive', 'reduce', 'refuel', 'return'],
      answer: 2, why: 'Strip the prefix and <em>fuel</em> survives with its meaning intact. The other three fused centuries ago.' },
    { id: 's4ch-2', type: 'choose', tag: 'time-prefix', level: 'B2',
      stem: 'An airport invents a new service for checking bags the night before. What will it be called?',
      options: ['fore-check', 'pre-check', 'ante-check', 'post-check'],
      answer: 1, why: 'New coinages always take <em>pre-</em>. <em>fore-</em> stopped accepting new words centuries ago.' },
    { id: 's4ch-3', type: 'sort', tag: 're-again', level: 'B2',
      stem: 'Does <em>re-</em> come off cleanly?',
      bins: [
        { key: 'live', label: 'Comes off — means "again"', hint: 'productive' },
        { key: 'fossil', label: 'Fused — learn it whole', hint: 'the old "back"' }
      ],
      items: [
        { text: 'reroute', bin: 'live' }, { text: 'rebook', bin: 'live' }, { text: 'reconnect', bin: 'live' },
        { text: 'recover', bin: 'fossil' }, { text: 'report', bin: 'fossil' }, { text: 'resort', bin: 'fossil' }
      ],
      why: 'Apply the subtraction test. <em>route, book, connect</em> all survive; <em>cover, port, sort</em> do not survive with a related meaning.' },
    { id: 's4ch-4', type: 'gap', tag: 'relation-prefix', level: 'B2+',
      lines: [
        { who: 'Ground crew', text: 'There is frost on the wings.' },
        { who: 'Captain', text: 'Nothing moves until they ___ the aircraft.' }
      ],
      options: ['un-ice', 'de-ice', 'mis-ice', 'non-ice'],
      answer: 1, why: '<em>de-</em> is the formal, technical removal prefix and the fixed aviation term.' },
    { id: 's4ch-5', type: 'choose', tag: 'relation-prefix', level: 'B2+',
      stem: 'The root <em>-port</em> means "carry". So <em>support</em> literally means:',
      options: ['carry across', 'carry out', 'carry from underneath', 'carry back'],
      answer: 2, why: 'sub + port. Once a root is visible, a whole column of vocabulary decodes itself.' },
    { id: 's4ch-6', type: 'spot', tag: 'relation-prefix', level: 'B2+',
      stem: 'Click the word with the wrong prefix.',
      words: ['The', 'transcity', 'coach', 'runs', 'between', 'the', 'two', 'capitals.'],
      answer: 1, fix: 'intercity', why: 'Between two cities is <em>inter-</em>. <em>trans-</em> would mean crossing through one.' },
    { id: 's4ch-7', type: 'equiv', tag: 're-again', level: 'B2+',
      given: 'The seats need to be re-covered.',
      stem: 'What does the hyphen change?',
      options: ['It means new fabric, not recovery.', 'It means the seats were stolen.', 'It is a spelling error.', 'It makes the word formal.'],
      answer: 0, why: 'With the hyphen it is living <em>re-</em>: cover again. Without it, <em>recovered</em> means got better or got back.' },
    { id: 's4ch-8', type: 'order', tag: 'time-prefix', level: 'B2+',
      stem: 'Put these stages in the order they happen.',
      items: ['pre-departure checks', 'pre-boarding announcement', 'mid-flight service', 'post-flight report'],
      why: 'The prefixes alone order the list, which is exactly the job they were borrowed to do.' }
  ] },

  s5: { id: 's5ch', name: 'Border Check 5', items: [
    { id: 's5ch-1', type: 'choose', tag: 'noun-quality', level: 'B2',
      stem: '"She showed great ___ after the cancellation." The adjective is <em>resilient</em>.',
      options: ['resilientness', 'resilience', 'resiliention', 'resilientity'],
      answer: 1, why: '<em>Resilient</em> is Latinate, so it takes <em>-ence</em>, not the Germanic <em>-ness</em>.' },
    { id: 's5ch-2', type: 'choose', tag: 'noun-action', level: 'B2',
      stem: 'Which noun comes from <em>arrive</em>?',
      options: ['arrivement', 'arrivation', 'arrival', 'arriveness'],
      answer: 2, why: '<em>Arrive</em> is in the small <em>-al</em> family: refusal, approval, removal, survival, dismissal.' },
    { id: 's5ch-3', type: 'sort', tag: 'noun-action', level: 'B2',
      art: 'board',
      stem: 'Which suffix makes the noun?',
      bins: [
        { key: 'ure', label: '-ure', hint: 'depart → ?' },
        { key: 'al', label: '-al', hint: 'arrive → ?' },
        { key: 'ation', label: '-ation', hint: 'cancel → ?' },
        { key: 'ment', label: '-ment', hint: 'announce → ?' }
      ],
      items: [
        { text: 'depart', bin: 'ure' }, { text: 'fail', bin: 'ure' },
        { text: 'arrive', bin: 'al' }, { text: 'approve', bin: 'al' },
        { text: 'cancel', bin: 'ation' }, { text: 'reserve', bin: 'ation' },
        { text: 'announce', bin: 'ment' }, { text: 'pay', bin: 'ment' }
      ],
      why: 'Four suffixes, one job, and every one of them appears on a departures board. Grouping is how they stick.' },
    { id: 's5ch-4', type: 'choose', tag: 'noun-person', level: 'B2+',
      stem: 'Who is being interviewed?',
      options: ['the interviewer', 'the interviewee', 'both', 'neither'],
      answer: 1, why: '<em>-ee</em> names the person the action is done to. It is the only suffix in the family that flips direction.' },
    { id: 's5ch-5', type: 'spot', tag: 'noun-person', level: 'B2+',
      stem: 'Click the word with the wrong suffix.',
      words: ['The', 'conducter', 'checked', 'every', 'passenger’s', 'ticket.'],
      answer: 1, fix: 'conductor', why: '<em>Conduct</em> is Latinate (con + duct, "lead together"), so the agent takes <em>-or</em>.' },
    { id: 's5ch-6', type: 'gap', tag: 'noun-quality', level: 'B2',
      lines: [
        { who: 'Reference', text: 'He is sociable and calm under pressure.' },
        { who: 'Teacher', text: 'As a noun: his ___ makes him good with groups.' }
      ],
      options: ['sociableness', 'sociability', 'socialness', 'sociality'],
      answer: 1, why: '<em>-able</em> reliably becomes <em>-ability</em>: reliable → reliability, sociable → sociability.' },
    { id: 's5ch-7', type: 'judge', tag: 'noun-action', level: 'B2+',
      given: 'The <em>department</em> of a flight is the moment it leaves.',
      stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False — that is <em>departure</em>. Same root, different word, and a reminder that the parts predict but do not guarantee.' },
    { id: 's5ch-8', type: 'build', tag: 'noun-action', level: 'B2+',
      stem: 'They cancelled it and told nobody why. Write it in formal, noun-heavy style.',
      tiles: ['The', 'cancellation', 'was', 'announced', 'without', 'explanation.'],
      solution: 'The cancellation was announced without explanation.',
      why: 'Two action nouns in six words — and nobody in the sentence is responsible for anything.' }
  ] },

  s6: { id: 's6ch', name: 'Border Check 6', items: [
    { id: 's6ch-1', type: 'choose', tag: 'ful-less', level: 'B2',
      stem: 'Your guide calls the view <em>priceless</em>. What does she mean?',
      options: ['It is worth nothing.', 'It is too valuable to price.', 'It is free to look at.', 'It cannot be photographed.'],
      answer: 1, why: 'Here <em>-less</em> means "beyond", not "without" — the same trick as <em>endless</em> and <em>countless</em>.' },
    { id: 's6ch-2', type: 'equiv', tag: 'adj-suffix', level: 'B2+',
      given: 'The ticket is refundable.',
      stem: 'Which paraphrase is exactly right?',
      options: ['The ticket refunds money.', 'The ticket can be refunded.', 'The ticket must be refunded.', 'The ticket has been refunded.'],
      answer: 1, why: '<em>-able</em> is passive and possible: "able to be VERB-ed". Expanding it this way checks every -able word you meet.' },
    { id: 's6ch-3', type: 'choose', tag: 'verb-suffix', level: 'B2+',
      stem: 'Which verb is correctly built from <em>wide</em>?',
      options: ['widise', 'widify', 'widen', 'enwide'],
      answer: 2, why: 'Short native adjective → <em>-en</em>. <em>-ise</em> and <em>-ify</em> need Latinate bases.' },
    { id: 's6ch-4', type: 'sort', tag: 'verb-suffix', level: 'B2+',
      stem: 'Which ending makes the verb?',
      bins: [
        { key: 'en', label: '-en', hint: 'short native adjective' },
        { key: 'ise', label: '-ise', hint: 'Latinate base' },
        { key: 'ify', label: '-ify', hint: 'short Latinate base' }
      ],
      items: [
        { text: 'short', bin: 'en' }, { text: 'tight', bin: 'en' },
        { text: 'modern', bin: 'ise' }, { text: 'private', bin: 'ise' },
        { text: 'simple', bin: 'ify' }, { text: 'clear', bin: 'ify' }
      ],
      why: 'The split is by layer, not by meaning. Two systems doing one job, side by side, because English kept both.' },
    { id: 's6ch-5', type: 'gap', tag: 'adj-suffix', level: 'B2+',
      lines: [
        { who: 'Mai', text: 'What time do we land?' },
        { who: 'Kit', text: '___, if the wind behaves.' }
      ],
      options: ['sevenly', 'sevenish', 'sevenous', 'sevenable'],
      answer: 1, why: '<em>-ish</em> on a time means "approximately". Informal, native, and almost never taught from a list.' },
    { id: 's6ch-6', type: 'spot', tag: 'adj-suffix', level: 'B2+',
      stem: 'Click the wrong word.',
      words: ['We', 'hired', 'the', 'most', 'economic', 'car', 'to', 'save', 'fuel.'],
      answer: 4, fix: 'economical',
      why: '<em>Economical</em> = uses little fuel. <em>Economic</em> = relating to the economy. A real split, not a style choice.' },
    { id: 's6ch-7', type: 'judge', tag: 'ful-less', level: 'B2+',
      given: 'Because <em>ruthless</em> exists, <em>ruthful</em> must exist too.',
      stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False. <em>Ruth</em> meant pity and died out, leaving only the <em>-less</em> half. Patterns predict; they do not guarantee.' },
    { id: 's6ch-8', type: 'choose', tag: 'noun-quality', level: 'B2',
      stem: 'Which noun is correctly built?',
      options: ['creativeness', 'creativity', 'creativation', 'creativeship'],
      answer: 1, why: 'Interleaved from Gate 5. <em>Creative</em> is Latinate and has already claimed <em>-ity</em>.' }
  ] },

  s7: { id: 's7ch', name: 'Border Check 7', items: [
    { id: 's7ch-1', type: 'choose', tag: 'stress-shift', level: 'C1',
      stem: 'Where does the stress fall in <em>curiosity</em>?',
      options: ['CU-ri-os-i-ty', 'cu-RI-os-i-ty', 'cu-ri-OS-i-ty', 'cu-ri-os-i-TY'],
      answer: 2, why: '<em>-ity</em> pulls the stress onto the syllable immediately before it.' },
    { id: 's7ch-2', type: 'choose', tag: 'stress-shift', level: 'C1',
      stem: 'In which pair does the stress NOT move?',
      options: ['public → publicity', 'responsible → responsibility', 'cheerful → cheerfulness', 'decide → decision'],
      answer: 2, why: '<em>-ness</em> is Germanic and neutral. The other three all take shifting Latinate suffixes.' },
    { id: 's7ch-3', type: 'sort', tag: 'stress-shift', level: 'C1',
      stem: 'Does the suffix move the stress?',
      bins: [
        { key: 'move', label: 'Moves it', hint: 'Latinate' },
        { key: 'stay', label: 'Leaves it alone', hint: 'Germanic' }
      ],
      items: [
        { text: '-ity', bin: 'move' }, { text: '-ion', bin: 'move' }, { text: '-ic', bin: 'move' },
        { text: '-ness', bin: 'stay' }, { text: '-ful', bin: 'stay' }, { text: '-ship', bin: 'stay' }
      ],
      why: 'Sorting by behaviour also sorts by origin. The two boxes are the two layers of English.' },
    { id: 's7ch-4', type: 'choose', tag: 'allomorphy', level: 'C1',
      stem: 'What is the noun from <em>pronounce</em>?',
      options: ['pronounciation', 'pronunciation', 'pronouncation', 'pronouncement'],
      answer: 1, why: 'The <em>o</em> disappears at the join. Knowing the base is rewritten turns a memory test into a rule.' },
    { id: 's7ch-5', type: 'spot', tag: 'allomorphy', level: 'C1',
      stem: 'Click the misspelled word.',
      words: ['They', 'gave', 'no', 'explaination', 'for', 'the', 'delay.'],
      answer: 3, fix: 'explanation', why: '<em>Explain</em> loses its <em>i</em> before <em>-ation</em>, exactly as <em>maintain</em> gives <em>maintenance</em>.' },
    { id: 's7ch-6', type: 'order', tag: 'suffix-order', level: 'C1',
      stem: 'Put these in the order they were built.',
      items: ['rely', 'reliable', 'reliability', 'unreliability'],
      why: 'Verb → adjective → noun, prefix last. The prefix does not change class, so it sits on the outside.' },
    { id: 's7ch-7', type: 'gap', tag: 'suffix-order', level: 'C1',
      lines: [
        { who: 'Exam paper', text: 'The service’s ___ has damaged its reputation. (RELY)' },
        { who: 'Mai', text: 'Walk the chain: rely, reliable, ___.' }
      ],
      options: ['reliableness', 'reliability', 'reliation', 'relyment'],
      answer: 1, why: '<em>-able</em> reliably becomes <em>-ability</em>. Walking the chain produces a word you never memorised.' },
    { id: 's7ch-8', type: 'table', tag: 'allomorphy', level: 'C1',
      table: {
        cols: ['Verb', 'Noun'],
        rows: [['permit', 'permission'], ['admit', 'admission'], ['transmit', 'transmission'], ['emit', '?']]
      },
      stem: 'Complete the last row.',
      options: ['emitment', 'emition', 'emission', 'emitation'],
      answer: 2, why: 'The whole <em>-mit</em> is replaced by <em>-mission</em>. That is why <em>carbon emissions</em> looks nothing like <em>emit</em>.' }
  ] },

  s8: { id: 's8ch', name: 'Border Check 8', items: [
    { id: 's8ch-1', type: 'choose', tag: 'layers', level: 'C1',
      stem: 'Why is there no word *<em>inhappy</em>?',
      options: ['It is hard to say.', 'Latinate <em>in-</em> does not attach to native bases.', 'It died out in 1600.', '<em>Happy</em> cannot be negated.'],
      answer: 1, why: 'Affixes prefer their own layer. That one fact explains most of the apparent randomness in this whole course.' },
    { id: 's8ch-2', type: 'choose', tag: 'lexicalised', level: 'C1',
      stem: 'A tribunal needs a <em>disinterested</em> member. What is required?',
      options: ['Someone who finds it boring.', 'Someone with no stake in the outcome.', 'Someone who has not read the papers.', 'Someone unpaid.'],
      answer: 1, why: '<em>Disinterested</em> = impartial. Bored is <em>uninterested</em>. Two prefixes, two different requirements.' },
    { id: 's8ch-3', type: 'sort', tag: 'lexicalised', level: 'C1',
      stem: 'Do the parts still add up?',
      bins: [
        { key: 'yes', label: 'Parts add up', hint: 'decode on sight' },
        { key: 'no', label: 'Word has drifted', hint: 'learn it whole' }
      ],
      items: [
        { text: 'rebook', bin: 'yes' }, { text: 'refundable', bin: 'yes' }, { text: 'overcrowded', bin: 'yes' },
        { text: 'department', bin: 'no' }, { text: 'commute', bin: 'no' }, { text: 'priceless', bin: 'no' }
      ],
      why: 'Guess from the parts, then check whether the word has left home. Knowing which box a word is in is the C1 skill.' },
    { id: 's8ch-4', type: 'equiv', tag: 'nominalisation', level: 'C1',
      given: 'The cancellation was announced without explanation.',
      stem: 'What has been removed compared with "They cancelled it and did not explain"?',
      options: ['The time.', 'The people responsible.', 'The reason it matters.', 'The announcement itself.'],
      answer: 1, why: 'Nominalisation packs the action into a noun and lets the agent drop out — which is frequently the point of using it.' },
    { id: 's8ch-5', type: 'choose', tag: 'nominalisation', level: 'C1',
      stem: 'Which sentence is over-nominalised?',
      options: ['We are modernising the booking system.', 'The implementation of the modernisation of the reservation system is under way.', 'The booking system is being modernised.', 'Modernisation has begun.'],
      answer: 1, why: 'Three abstract nouns in a row and no actor anywhere. The tool has been used until it removed all the information.' },
    { id: 's8ch-6', type: 'judge', tag: 'layers', level: 'C1',
      given: 'You can attach <em>-ness</em> to an adjective invented this morning and be understood.',
      stem: 'True, false, or impossible to tell?',
      answer: 0, why: 'True. <em>-ness</em> never stopped working. <em>-ity</em> arrived in finished words and cannot do this.' },
    { id: 's8ch-7', type: 'build', tag: 'layers', level: 'C1',
      stem: 'Rewrite "sorry, the plane is late" in cool, formal, Latinate English.',
      tiles: ['We', 'regret', 'the', 'delayed', 'departure', 'of', 'this', 'service.'],
      solution: 'We regret the delayed departure of this service.',
      why: 'Every content word changes layer, and the verb becomes a noun. Same facts, entirely different relationship with the reader.' },
    { id: 's8ch-8', type: 'gap', tag: 'nominalisation', level: 'C1',
      lines: [
        { who: 'Report', text: 'Punctuality improved after the rewrite.' },
        { who: 'Editor', text: 'Nominalise: "The ___ in punctuality followed the rewrite."' }
      ],
      options: ['improve', 'improving', 'improvement', 'improvable'],
      answer: 2, why: 'After "the ___ in" the slot needs a noun, and <em>improve</em> takes <em>-ment</em>.' }
  ] }
};

STAGES.forEach(function (st) { st.challenge = CHALLENGES[st.id]; });

/* ===== HELD-OUT VERIFICATION BANK ======================================
   Students NEVER see these in the roadmap. The teacher console draws on
   them to build a level-check paper that independently verifies the level
   a student's roadmap claims. Keyed by gate number.
   ======================================================================= */
const VERIFY = {
  1: [
    { id: 'v1-1', type: 'choose', tag: 'word-parts', level: 'B1',
      stem: 'What is the root of <em>uncomfortable</em>?', options: ['un', 'comfort', 'able', 'uncomfort'],
      answer: 1, why: 'The smallest real word inside is <em>comfort</em>.' },
    { id: 'v1-2', type: 'choose', tag: 'head-right', level: 'B1',
      stem: '"His ___ impressed the crew." From <em>loyal</em>:', options: ['disloyal', 'loyally', 'loyalty', 'loyal'],
      answer: 2, why: 'The gap needs a noun, so it needs a suffix.' },
    { id: 'v1-3', type: 'choose', tag: 'in-allomorphy', level: 'B1',
      stem: 'The negative of <em>regular</em> is:', options: ['inregular', 'imregular', 'irregular', 'unregular'],
      answer: 2, why: 'Before <em>r</em>, <em>in-</em> copies the <em>r</em>.' },
    { id: 'v1-4', type: 'spot', tag: 'in-allomorphy', level: 'B1',
      stem: 'Click the misspelled word.', words: ['That', 'was', 'an', 'inpossible', 'connection', 'to', 'make.'],
      answer: 3, fix: 'impossible', why: 'Before <em>p</em> the <em>n</em> becomes <em>m</em>.' },
    { id: 'v1-5', type: 'judge', tag: 'head-right', level: 'B1',
      given: '<em>Unhappy</em> is a noun because it has a prefix.', stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False. Prefixes do not change class; <em>unhappy</em> is still an adjective.' },
    { id: 'v1-6', type: 'sort', tag: 'word-parts', level: 'B1',
      stem: 'The hyphens have been removed. Front of the root, or back of it?',
      bins: [{ key: 'pre', label: 'Front', hint: 'prefix' }, { key: 'suf', label: 'Back', hint: 'suffix' }],
      items: [{ text: 'dis', bin: 'pre' }, { text: 'over', bin: 'pre' }, { text: 'pre', bin: 'pre' },
              { text: 'ness', bin: 'suf' }, { text: 'ment', bin: 'suf' }, { text: 'able', bin: 'suf' }],
      why: 'Try a root on each side. <em>dis</em>+agree works, agree+<em>dis</em> does not.' },
    { id: 'v1-7', type: 'gap', tag: 'head-right', level: 'B1+',
      lines: [{ who: 'A', text: 'The gap is after "showed real".' }, { who: 'B', text: 'So from <em>kind</em> I need ___.' }],
      options: ['unkind', 'kindly', 'kindness', 'kinder'], answer: 2, why: 'A noun is needed, so a suffix must build it.' }
  ],
  2: [
    { id: 'v2-1', type: 'choose', tag: 'un-dis-mis', level: 'B1+',
      stem: '"I ___ the platform number and boarded the wrong train."', options: ['unread', 'misread', 'disread', 'non-read'],
      answer: 1, why: 'The reading happened; only the result was wrong.' },
    { id: 'v2-2', type: 'choose', tag: 'un-reversive', level: 'B1+',
      stem: 'Which <em>un-</em> means "reverse the action"?', options: ['unsafe', 'unload', 'unkind', 'unusual'],
      answer: 1, why: '<em>Unload</em> is a verb; the other three are adjectives meaning "not".' },
    { id: 'v2-3', type: 'choose', tag: 'non-neutral', level: 'B2',
      stem: 'Which word belongs on a ticket?', options: ['unrefundable', 'non-refundable', 'misrefundable', 'disrefundable'],
      answer: 1, why: 'A neutral category, not a criticism.' },
    { id: 'v2-4', type: 'spot', tag: 'un-dis-mis', level: 'B2',
      stem: 'Click the wrong prefix.', words: ['She', 'was', 'a', 'misloyal', 'colleague.'],
      answer: 3, fix: 'disloyal', why: 'Loyalty is a state, not an action done wrongly.' },
    { id: 'v2-5', type: 'judge', tag: 'un-reversive', level: 'B2',
      given: 'You can unfasten a belt that was never fastened.', stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False. Reversive <em>un-</em> presupposes the original action.' },
    { id: 'v2-6', type: 'equiv', tag: 'un-dis-mis', level: 'B2',
      given: 'Your bag was misrouted.', stem: 'Which is closest?',
      options: ['It never left the airport.', 'It travelled to the wrong place.', 'It was damaged.', 'It was refused at check-in.'],
      answer: 1, why: '<em>mis-</em> concedes the routing and blames only its direction.' },
    { id: 'v2-7', type: 'gap', tag: 'non-neutral', level: 'B2',
      lines: [{ who: 'Sign', text: 'Rows 1–12 are ___.' }, { who: 'Kit', text: 'So we can’t sit there with a cigarette.' }],
      options: ['unsmoking', 'non-smoking', 'missmoking', 'dissmoking'], answer: 1, why: 'A category of area, with no judgement attached.' }
  ],
  3: [
    { id: 'v3-1', type: 'choose', tag: 'over-under', level: 'B2',
      stem: 'It took one hour; you said three. You:', options: ['underestimated it', 'overestimated it', 'misestimated it', 'de-estimated it'],
      answer: 1, why: 'The estimate was above reality.' },
    { id: 'v3-2', type: 'choose', tag: 'super-out', level: 'B2',
      stem: 'Which is correct?', options: ['Coaches outnumber than trains.', 'Coaches outnumber trains.', 'Coaches outnumber more trains.', 'Coaches are outnumber trains.'],
      answer: 1, why: '<em>out-</em> verbs take the rival as a direct object, with no <em>than</em>.' },
    { id: 'v3-3', type: 'choose', tag: 'sub-semi', level: 'B2',
      stem: 'In which word does <em>sub-</em> judge quality rather than position?', options: ['subway', 'submarine', 'substandard', 'subheading'],
      answer: 2, why: 'It places something below an acceptable line.' },
    { id: 'v3-4', type: 'spot', tag: 'over-under', level: 'B2',
      stem: 'Click the wrong direction.', words: ['We', 'overestimated', 'the', 'traffic', 'and', 'missed', 'the', 'ferry.'],
      answer: 1, fix: 'underestimated', why: 'Missing it means the traffic was worse than expected.' },
    { id: 'v3-5', type: 'judge', tag: 'over-under', level: 'B2',
      given: 'A van overtook us, so it used too much road.', stem: 'Does <em>over-</em> mean "too much" here?',
      answer: 1, why: 'No — it keeps its older spatial sense of "past, across".' },
    { id: 'v3-6', type: 'gap', tag: 'sub-semi', level: 'B2',
      lines: [{ who: 'Ploy', text: 'Direct?' }, { who: 'Agent', text: 'Almost — ___. One stop.' }],
      options: ['non-direct', 'semi-direct', 'subdirect', 'underdirect'], answer: 1, why: 'Partly direct is exactly what <em>semi-</em> encodes.' },
    { id: 'v3-7', type: 'equiv', tag: 'super-out', level: 'B2+',
      given: 'These buses have lasted longer than every later model.', stem: 'Which verb says it in one word?',
      options: ['overlasted', 'outlasted', 'superlasted', 'underlasted'], answer: 1, why: '<em>outlast</em> = last longer than.' }
  ],
  4: [
    { id: 'v4-1', type: 'choose', tag: 're-again', level: 'B2',
      stem: 'In which word does <em>re-</em> mean "again"?', options: ['return', 'reduce', 'rebook', 'receive'],
      answer: 2, why: 'Strip the prefix and <em>book</em> survives with its meaning.' },
    { id: 'v4-2', type: 'choose', tag: 'time-prefix', level: 'B2',
      stem: 'A new "check your bag the night before" service will be called:', options: ['fore-check', 'pre-check', 'ante-check', 'sub-check'],
      answer: 1, why: 'New coinages always take <em>pre-</em>; <em>fore-</em> is closed.' },
    { id: 'v4-3', type: 'choose', tag: 'relation-prefix', level: 'B2+',
      stem: '<em>-fer</em> means "carry", so <em>transfer</em> means:', options: ['carry back', 'carry across', 'carry under', 'carry out'],
      answer: 1, why: 'trans = across.' },
    { id: 'v4-4', type: 'spot', tag: 'relation-prefix', level: 'B2+',
      stem: 'Click the wrong prefix.', words: ['The', 'transcity', 'train', 'links', 'the', 'two', 'capitals.'],
      answer: 1, fix: 'intercity', why: 'Between two cities is <em>inter-</em>.' },
    { id: 'v4-5', type: 'judge', tag: 're-again', level: 'B2+',
      given: 'A <em>resort</em> is named from "to go back to".', stem: 'Is this historically right?',
      answer: 0, why: 'True — fossil <em>re-</em> meaning "back", as in <em>return</em> and <em>recover</em>.' },
    { id: 'v4-6', type: 'gap', tag: 'relation-prefix', level: 'B2+',
      lines: [{ who: 'Crew', text: 'There is ice on the wings.' }, { who: 'Captain', text: 'We wait until they ___ it.' }],
      options: ['un-ice', 'de-ice', 'mis-ice', 'non-ice'], answer: 1, why: '<em>de-</em> is the formal removal prefix and the aviation term.' },
    { id: 'v4-7', type: 'order', tag: 'time-prefix', level: 'B2+',
      stem: 'Put these in the order they happen.',
      items: ['pre-departure checks', 'pre-boarding announcement', 'mid-flight service', 'post-flight report'],
      why: 'The prefixes alone order the list.' }
  ],
  5: [
    { id: 'v5-1', type: 'choose', tag: 'noun-quality', level: 'B2',
      stem: 'The noun from <em>creative</em> is:', options: ['creativeness', 'creativity', 'creativation', 'creativeship'],
      answer: 1, why: 'Latinate base, Latinate suffix.' },
    { id: 'v5-2', type: 'choose', tag: 'noun-action', level: 'B2',
      stem: 'The noun from <em>depart</em> is:', options: ['department', 'departation', 'departure', 'departal'],
      answer: 2, why: '<em>-ure</em>. <em>Department</em> is a different word entirely.' },
    { id: 'v5-3', type: 'choose', tag: 'noun-person', level: 'B2+',
      stem: 'Who is employed?', options: ['the employer', 'the employee', 'both', 'neither'],
      answer: 1, why: '<em>-ee</em> names the person the action is done to.' },
    { id: 'v5-4', type: 'spot', tag: 'noun-person', level: 'B2+',
      stem: 'Click the wrong suffix.', words: ['The', 'inspecter', 'checked', 'our', 'tickets.'],
      answer: 1, fix: 'inspector', why: 'Latinate base takes <em>-or</em>.' },
    { id: 'v5-5', type: 'gap', tag: 'noun-action', level: 'B2',
      lines: [{ who: 'Announcement', text: 'We regret the ___ of flight TG406.' }, { who: 'Mai', text: 'So it’s gone.' }],
      options: ['cancel', 'cancelling', 'cancellation', 'cancelment'], answer: 2, why: 'A noun is needed; <em>cancel</em> takes <em>-ation</em>.' },
    { id: 'v5-6', type: 'sort', tag: 'noun-quality', level: 'B2',
      stem: 'Which suffix builds the noun?',
      bins: [{ key: 'ness', label: '-ness', hint: 'anything' }, { key: 'ity', label: '-ity', hint: 'Latinate' }, { key: 'ence', label: '-ence', hint: 'Latinate' }],
      items: [{ text: 'shy', bin: 'ness' }, { text: 'loud', bin: 'ness' }, { text: 'reliable', bin: 'ity' },
              { text: 'creative', bin: 'ity' }, { text: 'confident', bin: 'ence' }, { text: 'patient', bin: 'ence' }],
      why: 'Native bases go to <em>-ness</em>; Latinate bases were claimed long ago.' },
    { id: 'v5-7', type: 'judge', tag: 'noun-action', level: 'B2+',
      given: '<em>Department</em> means the act of departing.', stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False. Same root, drifted meaning. The act is <em>departure</em>.' }
  ],
  6: [
    { id: 'v6-1', type: 'choose', tag: 'ful-less', level: 'B2',
      stem: '<em>Priceless</em> means:', options: ['worth nothing', 'too valuable to price', 'free', 'unsellable'],
      answer: 1, why: 'Here <em>-less</em> means "beyond", not "without".' },
    { id: 'v6-2', type: 'equiv', tag: 'adj-suffix', level: 'B2+',
      given: 'The fare is changeable.', stem: 'Which paraphrase is right?',
      options: ['The fare changes itself.', 'The fare can be changed.', 'The fare must change.', 'The fare has changed.'],
      answer: 1, why: '<em>-able</em> is passive and possible.' },
    { id: 'v6-3', type: 'choose', tag: 'verb-suffix', level: 'B2+',
      stem: 'The verb from <em>strength</em> is:', options: ['strengthise', 'strengthify', 'strengthen', 'enstrength'],
      answer: 2, why: 'Short native base → <em>-en</em>.' },
    { id: 'v6-4', type: 'spot', tag: 'adj-suffix', level: 'B2+',
      stem: 'Click the wrong word.', words: ['We', 'took', 'the', 'economic', 'option', 'to', 'save', 'money.'],
      answer: 3, fix: 'economical', why: 'Saving money is <em>economical</em>; <em>economic</em> is about the economy.' },
    { id: 'v6-5', type: 'gap', tag: 'adj-suffix', level: 'B2+',
      lines: [{ who: 'Mai', text: 'When do we arrive?' }, { who: 'Kit', text: '___, more or less.' }],
      options: ['eightly', 'eightish', 'eightous', 'eightable'], answer: 1, why: '<em>-ish</em> on a time means approximately.' },
    { id: 'v6-6', type: 'judge', tag: 'ful-less', level: 'B2+',
      given: '<em>Invaluable</em> means not valuable.', stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False — it means extremely valuable. The parts point the wrong way.' },
    { id: 'v6-7', type: 'choose', tag: 'verb-suffix', level: 'B2+',
      stem: '<em>Embark</em> contains <em>en-</em> plus an old word for:', options: ['a road', 'a boat', 'a gate', 'a bag'],
      answer: 1, why: '<em>barque</em> = boat. So <em>disembark</em> explains itself.' }
  ],
  7: [
    { id: 'v7-1', type: 'choose', tag: 'stress-shift', level: 'C1',
      stem: 'Stress in <em>publicity</em>:', options: ['PUB-lic-i-ty', 'pub-LIC-i-ty', 'pub-lic-I-ty', 'pub-lic-i-TY'],
      answer: 1, why: '<em>-ity</em> pulls the stress onto the syllable immediately before it.' },
    { id: 'v7-2', type: 'choose', tag: 'stress-shift', level: 'C1',
      stem: 'Which suffix leaves the stress where it was?', options: ['-ity', '-ion', '-ness', '-ic'],
      answer: 2, why: '<em>-ness</em> is Germanic and neutral.' },
    { id: 'v7-3', type: 'choose', tag: 'allomorphy', level: 'C1',
      stem: 'The noun from <em>maintain</em> is:', options: ['maintainance', 'maintenance', 'maintainment', 'maintation'],
      answer: 1, why: 'The <em>-ain</em> collapses to <em>-en</em>, as in <em>sustain → sustenance</em>.' },
    { id: 'v7-4', type: 'spot', tag: 'allomorphy', level: 'C1',
      stem: 'Click the misspelling.', words: ['No', 'explaination', 'was', 'given', 'for', 'the', 'cancellation.'],
      answer: 1, fix: 'explanation', why: '<em>Explain</em> loses its <em>i</em> before <em>-ation</em>.' },
    { id: 'v7-5', type: 'choose', tag: 'allomorphy', level: 'C1',
      stem: 'The noun from <em>emit</em> is:', options: ['emitment', 'emition', 'emission', 'emitation'],
      answer: 2, why: 'The whole <em>-mit</em> is replaced by <em>-mission</em>.' },
    { id: 'v7-6', type: 'order', tag: 'suffix-order', level: 'C1',
      stem: 'Put these in build order.', items: ['nation', 'national', 'nationalise', 'nationalisation'],
      why: 'Noun → adjective → verb → noun, one legal step at a time.' },
    { id: 'v7-7', type: 'choose', tag: 'suffix-order', level: 'C1',
      stem: 'Why is there no *<em>nationation</em>?', options: ['Too long.', '<em>-ation</em> needs a verb.', 'Wrong stress.', 'American only.'],
      answer: 1, why: 'Each suffix selects the class it attaches to.' }
  ],
  8: [
    { id: 'v8-1', type: 'choose', tag: 'layers', level: 'C1',
      stem: 'Why no *<em>inhappy</em>?', options: ['Hard to say.', 'Latinate <em>in-</em> needs a Latinate base.', 'It died out.', 'Happy cannot be negated.'],
      answer: 1, why: 'Affixes prefer their own layer.' },
    { id: 'v8-2', type: 'choose', tag: 'lexicalised', level: 'C1',
      stem: '<em>Disinterested</em> means:', options: ['bored', 'impartial', 'uninformed', 'unpaid'],
      answer: 1, why: 'Bored is <em>uninterested</em>. The two are not interchangeable.' },
    { id: 'v8-3', type: 'choose', tag: 'nominalisation', level: 'C1',
      stem: 'Which is over-nominalised?', options: ['We are modernising bookings.', 'The implementation of the modernisation of the booking system is under way.', 'Bookings are being modernised.', 'Modernisation has begun.'],
      answer: 1, why: 'Three abstract nouns and no actor anywhere.' },
    { id: 'v8-4', type: 'equiv', tag: 'nominalisation', level: 'C1',
      given: 'The cancellation was announced at 06:15.', stem: 'What is missing that "They cancelled it at 06:15" has?',
      options: ['the time', 'the agent', 'the place', 'the reason'],
      answer: 1, why: 'The noun form allows the responsible party to disappear.' },
    { id: 'v8-5', type: 'judge', tag: 'layers', level: 'C1',
      given: '<em>-ity</em> can attach to an adjective invented this morning.', stem: 'True, false, or impossible to tell?',
      answer: 1, why: 'False. <em>-ness</em> can; <em>-ity</em> arrived in finished words.' },
    { id: 'v8-6', type: 'spot', tag: 'lexicalised', level: 'C1',
      stem: 'Click the word used wrongly.', words: ['The', 'referee', 'was', 'uninterested', 'and', 'gave', 'a', 'fair', 'decision.'],
      answer: 3, fix: 'disinterested', why: 'Fairness needs impartiality. <em>Uninterested</em> would mean bored.' },
    { id: 'v8-7', type: 'sort', tag: 'nominalisation', level: 'C1',
      stem: 'Suffix needed, or converts unchanged?',
      bins: [{ key: 'suffix', label: 'Needs a suffix', hint: 'arrive → arrival' }, { key: 'zero', label: 'Converts unchanged', hint: 'a delay / to delay' }],
      items: [{ text: 'arrive → arrival', bin: 'suffix' }, { text: 'depart → departure', bin: 'suffix' },
              { text: 'delay', bin: 'zero' }, { text: 'board', bin: 'zero' }, { text: 'queue', bin: 'zero' }, { text: 'fine', bin: 'zero' }],
      why: 'English uses both routes side by side, and conversion is invisible to anyone watching only endings.' }
  ]
};

/* ===== FOLLOWING-INSTRUCTIONS ITEMS ====================================
   The student reads a request and picks the option that satisfies it.
   Injected into the lessons where the affix they test already lives, so
   they are practice rather than a separate mode.
   ======================================================================= */
const EXTRA_PICK = {
  s2l1: [
    { id: 's2l1-07', type: 'pick', tag: 'un-dis-mis', level: 'B2',
      shop: 'Lost property desk',
      art: 'suitcase',
      stem: 'You say: "It wasn’t lost — it was sent somewhere else by mistake."',
      items: [
        { name: 'Form A', price: '—', note: 'Report an unclaimed item' },
        { name: 'Form B', price: '—', note: 'Report a misrouted item' },
        { name: 'Form C', price: '—', note: 'Report a damaged item' },
        { name: 'Form D', price: '—', note: 'Report a disallowed item' }
      ],
      answer: 1,
      why: 'Your description concedes that the routing happened and blames only its direction — which is precisely <em>mis-</em>.' }
  ],
  s5l2: [
    { id: 's5l2-07', type: 'pick', tag: 'noun-action', level: 'B2',
      shop: 'Airport information screens',
      art: 'board',
      stem: 'You say: "Which screen shows the planes coming in, not going out?"',
      items: [
        { name: 'DEPARTURES', price: '—', note: 'depart + -ure' },
        { name: 'ARRIVALS', price: '—', note: 'arrive + -al' },
        { name: 'CANCELLATIONS', price: '—', note: 'cancel + -ation' },
        { name: 'ANNOUNCEMENTS', price: '—', note: 'announce + -ment' }
      ],
      answer: 1,
      why: 'Four different suffixes on one wall, all doing the same job. The root tells you which screen; the suffix only tells you it is a noun.' }
  ],
  s6l2: [
    { id: 's6l2-07', type: 'pick', tag: 'adj-suffix', level: 'B2+',
      shop: 'Fare conditions',
      art: 'shop',
      stem: 'You say: "I might have to change the date, and my sister may travel instead of me."',
      items: [
        { name: 'Saver', price: '฿890', note: 'non-changeable, non-transferable' },
        { name: 'Standard', price: '฿1,450', note: 'changeable, non-transferable' },
        { name: 'Flexi', price: '฿2,600', note: 'changeable, transferable' },
        { name: 'Basic', price: '฿750', note: 'non-refundable, non-changeable' }
      ],
      answer: 2,
      why: 'Two conditions, and each is written with <em>-able</em> (able to be VERB-ed) plus or minus <em>non-</em>. Only one option satisfies both.' }
  ]
};

STAGES.forEach(function (st) {
  st.lessons.forEach(function (ls) {
    if (EXTRA_PICK[ls.id]) { ls.items = ls.items.concat(EXTRA_PICK[ls.id]); }
  });
});

/* --------------------------------------------------------------------------
   EXPORTS
   -------------------------------------------------------------------------- */
const CONTENT = { CEFR, RANKS, BADGES, REMEDIATION, STAGES, VERIFY };
if (typeof window !== 'undefined') { window.CONTENT = CONTENT; }
if (typeof module !== 'undefined') { module.exports = CONTENT; }
