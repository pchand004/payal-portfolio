/* Content for the "Checked answers" prototype (/prototypes/checked-answers).
   One canned answer to one question, with every claim carrying the status the
   model gave it after trying to check it. Statuses are hand-labelled for the
   prototype: see the notes page for what a real model can and can't do here. */

export type Status = 'sourced' | 'reported' | 'doubtful';

export type Claim = {
  id: string;
  status: Status;
  /** The sentence as it appears in the answer. */
  text: string;
  /** Why it got this status; shown after the status in the card header. */
  reason: string;
  /** The "Link given" line: what the answer actually pointed to. */
  link: string;
  /** Where "Open the study" / "Read the news piece" goes. */
  linkHref?: string;
  /** Search query behind "Find the study" / "Nearest study". */
  search: string;
  /** Card footer line. */
  note?: string;
};

export type Part = string | { claim: string };

export const question = 'Does using my phone before bed actually affect sleep?';

export const suggestions = [
  'What does the literature say about reflection as a motivator?',
  'Studies supporting the claim that donation helps society?',
];

export const summary =
  "Short version: yes, it probably does — but the effect is smaller, more conditional, and less about blue light than the popular advice suggests. The clearest finding in recent work is that using the phone once you're in bed matters much more than using it in the hours before.";

export const sections: { heading: string; parts: Part[] }[] = [
  {
    heading: 'What the big observational studies show',
    parts: [
      'The association is consistent and found across ages. ',
      { claim: 'c1' },
      ' ',
      { claim: 'c2' },
      ' ',
      { claim: 'c3' },
      ' and ',
      { claim: 'c4' },
      ' Earlier adult work pointed the same way: ',
      { claim: 'c5' },
    ],
  },
  {
    heading: 'Timing and content matter more than “screens before bed”',
    parts: [{ claim: 'c6' }, ' ', { claim: 'c7' }],
  },
  {
    heading: 'The blue light story is weaker than advertised',
    parts: [
      'The “blue light suppresses melatonin” mechanism is real in the lab, but its real-world contribution is disputed. ',
      { claim: 'c8' },
      ' ',
      { claim: 'c9' },
    ],
  },
  {
    heading: 'Experimental evidence (the part that can speak to cause)',
    parts: ["It's thin but points the same direction. ", { claim: 'c10' }, ' On the other side, ', { claim: 'c11' }],
  },
];

const scholar = (q: string) => `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}`;
const google = (q: string) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const claims: Claim[] = [
  {
    id: 'c1',
    status: 'reported',
    text: 'A JAMA Network Open study of more than 122,000 US adults found that people who used a phone or tablet in the hour before bed every day were 33% more likely to report poor sleep quality than non-users, went to bed later, and got about 48 minutes less sleep per week.',
    reason: 'the link is a news report',
    link: 'LBC news article · Press Association, 27 Mar 2025',
    linkHref: google('LBC phone before bed 33% poor sleep JAMA Network Open March 2025'),
    search: 'JAMA Network Open 2025 screen use before bed 122,000 US adults sleep quality 33%',
  },
  {
    id: 'c2',
    status: 'reported',
    text: 'A Norwegian study of over 45,000 university students found an hour of screen use after getting into bed was associated with a 59–63% higher risk of insomnia symptoms and roughly 24 minutes less sleep.',
    reason: 'the link is a press release',
    link: 'University press release · 31 Mar 2025',
    linkHref: google('Norwegian university students screen time in bed insomnia 59% press release 2025'),
    search: 'Norwegian university students screen use in bed insomnia 45,000 Frontiers in Psychiatry 2025',
  },
  {
    id: 'c3',
    status: 'doubtful',
    text: 'A 2024 meta-analysis of electronic media use and sleep quality found a pooled effect size of 0.28,',
    reason: 'effect size not in the abstract',
    link: 'A 2024 meta-analysis abstract · reports a different pooled effect',
    search: 'meta-analysis electronic media use sleep quality pooled effect size 2024',
  },
  {
    id: 'c4',
    status: 'doubtful',
    text: 'a December 2025 meta-analysis across populations found increased screen time linked to adverse sleep outcomes, with adolescents showing the strongest effects.',
    reason: "date doesn't match",
    link: 'A 2023 systematic review · not a December 2025 meta-analysis',
    search: 'meta-analysis screen time adverse sleep outcomes adolescents strongest effects 2025',
  },
  {
    id: 'c5',
    status: 'sourced',
    text: 'a Belgian survey of 844 adults found bedtime phone use predicted later rise times, higher insomnia scores and more fatigue.',
    reason: 'direct link, says this',
    link: 'PubMed · Exelmans & Van den Bulck, Social Science & Medicine, 2016',
    linkHref: 'https://pubmed.ncbi.nlm.nih.gov/26688552/',
    search: 'Exelmans Van den Bulck bedtime mobile phone use and sleep in adults 2016',
  },
  {
    id: 'c6',
    status: 'doubtful',
    text: 'A New Zealand study that filmed adolescents with body-worn and bedroom cameras found that screen time in the two hours before bed had no overall association with sleep, but using screens once in bed and before attempting sleep was associated with delayed onset and less sleep, particularly for interactive use. Each extra 10 minutes of interactive in-bed use cut sleep by about the same amount.',
    reason: 'a detail is off',
    link: 'Study abstract · in-bed use is there, the “10 minutes” figure is not',
    search: 'New Zealand adolescents body-worn cameras screen time before bed in bed sleep 2025',
  },
  {
    id: 'c7',
    status: 'reported',
    text: 'A March 2026 JAMA Pediatrics meta-analysis of within-person studies reinforced this: day-to-day screen use was significantly related to later sleep onset but not to total sleep time, onset latency, efficiency, awakenings or subjective quality, and screen use after bedtime showed a much stronger negative correlation with sleep quality than overall daily or evening use.',
    reason: 'the link is a journal news release',
    link: 'Journal news release · JAMA Network, Mar 2026',
    linkHref: google('JAMA Pediatrics March 2026 meta-analysis within-person screen use sleep onset news release'),
    search: 'JAMA Pediatrics 2026 meta-analysis within-person screen use sleep onset after bedtime',
  },
  {
    id: 'c8',
    status: 'doubtful',
    text: 'Chronobiology research even suggests the common view that blue light has the strongest effect on the clock is mistaken; twilight-like blue hues had a weaker effect than white or yellow light of the same brightness.',
    reason: 'mice, not people',
    link: 'Mouland et al., Current Biology 2019 · a study in mice',
    search: 'Mouland Brown Lucas twilight blue light weaker effect circadian clock mice Current Biology 2019',
  },
  {
    id: 'c9',
    status: 'doubtful',
    text: "Blue-light glasses, for what it's worth, improve sleep by about six minutes, not statistically significant.",
    reason: 'number not found',
    link: 'Nothing in the answer points to this number.',
    search: 'blue light blocking glasses sleep randomized trial meta-analysis minutes',
  },
  {
    id: 'c10',
    status: 'reported',
    text: 'A small RCT of 38 adults told not to use phones for 30 minutes before bed found significantly improved sleep quality, mood and working memory within four weeks.',
    reason: 'the link is a health news article',
    link: 'Health news article · a second-hand report of the trial',
    linkHref: google('randomised trial 38 adults no phone 30 minutes before bed sleep quality working memory four weeks'),
    search: 'randomized controlled trial 38 adults restrict phone use 30 minutes before bed sleep quality working memory',
  },
  {
    id: 'c11',
    status: 'sourced',
    text: 'an objective 14-day study using donated iPhone and Apple Watch data from 68 people found that in-bed smartphone use was actually associated with slightly more same-day sleep — a reminder that the authors are right to call the evidence limited and inconsistent once you move to objective measurement.',
    reason: 'direct link, says this',
    link: 'Journal article (open access) · objective study, 68 participants',
    linkHref: scholar('in-bed smartphone use objective sleep iPhone Apple Watch 14 days 68 participants'),
    search: 'in-bed smartphone use objective sleep iPhone Apple Watch 14 days 68 participants',
  },
];

export const claimById = Object.fromEntries(claims.map((c) => [c.id, c])) as Record<string, Claim>;

export const searchUrl = scholar;
