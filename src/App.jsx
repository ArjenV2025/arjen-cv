import { useState, useRef, useEffect } from "react";

// ─── PRINT STYLES ─────────────────────────────────────────────────────────────
function PrintStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'cv-print-styles';
    style.textContent = `
      @media print {
        @page { margin: 1.2cm 1.5cm; size: A4 portrait; }
        html, body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        /* Verberg alles behalve de kaart */
        body > * { display: none !important; }
        #cv-print-root, #cv-print-root * { display: revert !important; }
        /* Verberg knoppen, tabs, beheer */
        .no-print { display: none !important; }
        /* Loopbaan: altijd open */
        .print-expand { max-height: none !important; overflow: visible !important; }
        * { box-shadow: none !important; }
      }
    `;
    if (!document.getElementById('cv-print-styles')) {
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById('cv-print-styles');
      if (el) el.remove();
    };
  }, []);
  return null;
}

function printCV() {
  window.print();
}


const LABELS = {
  setup_title: "Nieuwe sollicitatie",
  setup_sub: "Vul de vacature in — de app past zich automatisch aan.",
  setup_org: "Organisatie *", setup_func: "Functietitel *",
  setup_slug: "URL-slug", setup_color: "Accentkleur",
  setup_vactext: "Vacaturetekst (plak hier de volledige tekst)",
  setup_contract: "Type opdracht:",
  setup_freelance: "Freelance / interim",
  setup_freelance_sub: "Accent op snelheid, directe impact, geen overhead",
  setup_vaste: "Vaste baan",
  setup_vaste_sub: "Accent op continuïteit, oogsten en optimaliseren",
  setup_intro_title: "Introductietekst boven de chat",
  setup_gen_ai: "✦ Genereer met AI", setup_generating: "Genereren…",
  setup_open: "Sollicitatiepagina openen →",
  tab_chat: "Gesprek", tab_loopbaan: "Loopbaan",
  tab_impact: "Impact", tab_beheer: "Beheer",
  chat_placeholder: "Stel een vraag…",
  chat_opening: "Stel gerust een vraag — of kies er een uit de lijst hieronder.",
  btn_copy: "Kopieer link", btn_copied: "Gekopieerd ✓", btn_pdf: "↓ PDF",
  chip_opening: "Opening", chip_sterktes: "Sterktes & persoonlijkheid",
  chip_ervaring: "Ervaring", chip_leiderschap: "Leiderschap",
  chip_lastig: "Lastige vragen", chip_afsluiting: "Afsluiting",
  chip_persoonlijk: "Persoonlijk",
  impact_resultaat: "Resultaat: ", impact_kb_badge: "kennisbank",
  imp_50pct_l: "Kostenverlaging", imp_60pct_l: "Retentie verbetering",
  imp_100k_l: "Directe besparing", imp_fte_l: "PMO programma",
  beheer_mode: "⚙️ Beheermodus — alleen zichtbaar voor jou",
  beheer_reset: "← Nieuwe sollicitatie",
  beheer_analytics: "Analytics", beheer_antwoorden: "Antwoorden",
  beheer_kennisbank: "Kennisbank", beheer_intro: "Introductietekst",
  beheer_vacature: "Vacature-info",
  beheer_intro_sub: "Dit blok verschijnt boven het chatvenster.",
  beheer_intro_preview: "Voorbeeld", beheer_intro_save: "Opslaan",
  beheer_intro_template: "⭐ Bewaar als starttemplate",
  beheer_intro_cancel: "Annuleren",
  beheer_intro_template_hint: "Wordt als startpunt gebruikt bij de volgende sollicitatie.",
  ana_sessions: "Sessies", ana_total_q: "Vragen totaal",
  ana_free: "Vrij getypt", ana_pdf: "PDF downloads",
  ana_tabs: "Tabbladen bekeken", ana_transcripts: "Sessies & transcripten",
  ana_free_q: "Meest vrij getypte vragen",
  ana_free_sub: "Overweeg toe te voegen als chip.",
  ana_empty: "Nog geen activiteit.", ana_clear: "Wis data",
  sg_title: "Stijlgeheugen", sg_learned: "observatie", sg_learned_pl: "observaties",
  sg_stijl_btn: "🎨 Stijlregel", sg_feit_btn: "📌 Feitelijke correctie",
  sg_regen: "🔄 Nieuwe versie", sg_good: "👍 Goed zo",
  sg_original: "↩ Origineel", sg_learning: "leert…",
  footer_left: "Sollicitatie Arjen Vaalburg · 2026",
  footer_right: "Interactieve sollicitatie",
};
const t = (k) => LABELS[k] || k;

// ─── PROFIEL DATA ─────────────────────────────────────────────────────────────
const PROFIEL = {
  naam: "Arjen Vaalburg",
  telefoon: "+31 6 4876 88 51",
  email: "arjen.vaalburg@brandsparks.nl",
  locatie: "Bilthoven",
  linkedin: "linkedin.com/in/arjenvaalburg",
};

// ─── LOOPBAAN ─────────────────────────────────────────────────────────────────
// highlight: welke tags maken deze rol relevant voor welke vacaturetypes
// ─── LOOPBAAN ─────────────────────────────────────────────────────────────────
const LOOPBAAN = [
  {
    periode: "2025–nu", rol: "Co-Founder", bedrijf: "AI Compliance Academy",
    kort: "Opleidingsplatform voor AI-geletterdheid, EU AI Act en governance.",
    lang: "Initiatiefnemer van een opleidings- en adviesplatform dat organisaties helpt met AI-geletterdheid, AI-governance en risicobewustzijn. Ontwikkelt en verzorgt incompany-trainingen (niveau 1 & 2 AI-literacy), vertaalt EU AI Act naar praktische kaders en begeleidt organisaties bij verantwoord inzetten van generatieve AI.",
    rel: ["ai", "governance", "compliance", "digitaal", "innovatie", "transformatie"],
    tags: ["AI governance", "EU AI Act", "Strategie → executie"],
  },
  {
    periode: "2003–nu", rol: "Managing Partner & Eigenaar", bedrijf: "Brand Sparks",
    kort: "Strategisch adviesbureau merk, positionering en communicatiestrategie.",
    lang: "Adviespraktijk voor merkstrategie, portfolioarchitectuur en communicatiestrategie. Klanten: Alzheimer Nederland, Heineken, Jägermeister, Rijksoverheid, TU Delft, Ymere, Servatius, St. Kinderpostzegels, Hivos, Beeztees, Pullman. Fungeert ook als juridische entiteit voor interim-opdrachten.",
    rel: ["merk", "brand", "strategie", "positionering", "communicatie", "advies"],
    tags: ["Merkstrategie", "Positionering", "Communicatiestrategie"],
  },
  {
    periode: "2022–2024", rol: "Head of Brand & CRM", bedrijf: "Ncardia Services BV",
    kort: "Strategische transformatie marketingfunctie biotech CRO; HubSpot end-to-end.",
    lang: "Leidde herpositionering en volledige merk- en digitale communicatiestrategie voor Ncardia (iPSC-diensten). HubSpot CRM end-to-end: lifecycle flows, campagnes, segmentatie, marketingautomatisering. Definieerde KPI-framework, rapporteerde aan directie. Lanceerde nieuw merk Cellistic. Team na vertrek volledig zelfstandig operationeel — borging als primaire succesmaatstaf.",
    rel: ["crm", "marketing", "merk", "brand", "kpi", "hubspot", "lifecycle", "communicatie", "digitaal"],
    tags: ["HubSpot", "CRM", "KPI-rapportage", "Nieuw merk (Cellistic)"],
  },
  {
    periode: "2020–2022", rol: "Global Head of Corporate Communications & Branding", bedrijf: "Merck KGaA (Darmstadt)",
    kort: "Transformatieprogramma op wereldschaal: 50.000+ mwk, 3 divisies, 12 FTE.",
    lang: "Merkstrategie, PR-digitalisering en merkcommunicatie wereldwijd (Healthcare, Life Science, Electronics). Initieerde globale digitalisering PR-processen. Leidde team van 12 FTE. Change management via De Bono Six Thinking Hats: weerstand van team omgezet in eigenaarschap voor strategische koerswijziging. Kostenbesparing €100k door creatieve licentieonderhandeling buiten standaard kaders.",
    rel: ["communicatie", "corporate", "change", "transformatie", "internationaal", "branding", "merk", "strategie", "programma", "leiderschap", "management"],
    tags: ["50.000+ mwk", "Change mgmt", "De Bono", "€100k besparing"],
  },
  {
    periode: "2016–2018", rol: "PMO & Projectleider Rebranding", bedrijf: "VIM Group (Berlijn)",
    kort: "360° rebranding 5 entiteiten → PŸUR. Prince2, 50 FTE, 11 werkstromen.",
    lang: "Programmamanagement 360°-rebranding: integratie van 5 Tele Columbus-entiteiten tot één merk (PŸUR). 11 werkstromen, 50 FTE, Opex/Capex-verantwoordelijkheid, rapportage aan directie. On time, within budget via Prince2. Rollout IT, retail, fleet, e-commerce, interne communicatie en lanceringsevent. Aansluitend 3 maanden interim Marketing Director (10 direct reports).",
    rel: ["programma", "pmo", "prince2", "project", "transformatie", "rebranding", "integratie", "strategie", "executie", "verandering", "change", "management"],
    tags: ["Prince2", "50 FTE", "11 werkstromen", "On time & within budget"],
  },
  {
    periode: "2019", rol: "Transformation Director", bedrijf: "1850 Contact Center & Snowball",
    kort: "Multi-channel contact centre voor MKB van strategie tot executie in één jaar.",
    lang: "Opzet en uitvoering multi-channel contact centre voor 1850 (MKB-markt), inclusief webcare-team en geautomatiseerde prestatietracking. Voor Snowball E-commerce: herstructurering, herpositionering, digitalisering en geautomatiseerde salesfunnel opgebouwd.",
    rel: ["transformatie", "contact", "service", "klant", "channel", "operationeel", "executie"],
    tags: ["Multi-channel", "Webcare", "Executie"],
  },
  {
    periode: "2018", rol: "Client Partner", bedrijf: "Digitas/Publicis Groupe",
    kort: "Digitale marketing en e-commerce; billability 47% → 76% door processtandaardisering.",
    lang: "Digitale marketing, web-platformontwikkeling en e-commerce (Adobe Cloud, Salesforce Commerce Cloud, Episerver). Klanten: Britax, Tendam, La Prairie, Keune, NS, PwC, Robeco, Škoda. Pitch management (gewonnen: Keune, NS, Robeco, verloren: BAM). Billability verhoogd van 47% naar 76% via processtandaardisering in Jira.",
    rel: ["digitaal", "e-commerce", "marketing", "platform", "digital", "salesforce", "adobe", "agency"],
    tags: ["E-commerce", "Salesforce", "Billability 47% → 76%"],
  },
  {
    periode: "2015–2016", rol: "Digital Strategist", bedrijf: "DigitasLBi (PublicisOne)",
    kort: "Digitale strategie en global community management (Under Armour).",
    lang: "Digitale strategie, opzet en uitvoering global community management en branded content voor Under Armour. Sales funnel aanpak en influencer marketing voor Nationale Nederlanden.",
    rel: ["digitaal", "strategie", "digital", "social", "community", "content", "marketing"],
    tags: ["Digitale strategie", "Community management", "Under Armour"],
  },
  {
    periode: "2015", rol: "Director Brand Marketing & PR", bedrijf: "Ronald McDonald (Friendship Sportscentre)",
    kort: "Marketing, PR en rebranding voor maatschappelijke sportorganisatie.",
    lang: "Marketing, PR & social media strategie, sponsoring management, webcare, communicatiestrategie en planning. Rebranding strategie en impact assessment voor Ronald McDonald Friendship Sportscentre (NGO).",
    rel: ["marketing", "pr", "communicatie", "maatschappelijk", "ngo", "sport", "rebranding", "merk"],
    tags: ["PR & Marketing", "Rebranding", "NGO"],
  },
  {
    periode: "2013–2014", rol: "Strategist", bedrijf: "N=5 (creatief bureau)",
    kort: "Communicatiestrategie en customer journey mapping voor NS zakelijk.",
    lang: "Diverse projecten: pitches, communicatiestrategie en planning, targeting, contactstrategie en customer journey mapping voor zakelijke klanten Nederlandse Spoorwegen.",
    rel: ["strategie", "communicatie", "journey", "klant", "creatief", "ns"],
    tags: ["Customer journey", "Communicatiestrategie", "NS"],
  },
  {
    periode: "2012–2014", rol: "Business Director", bedrijf: "Club ADCN (Dutch ADC / D&AD)",
    kort: "Groeistrategie 2014-2017 en evenementenmanagement creatieve sector.",
    lang: "Ontwikkeling groeistrategie 2014-2017 voor creatieve branchevereniging (Art Directors Club Netherlands). Aansturen team voor organisatie Nederlandse creatieve award shows (Lampen), Annuals en workshops.",
    rel: ["strategie", "groei", "events", "communicatie", "creatief", "management"],
    tags: ["Groeistrategie", "Events", "Creatieve sector"],
  },
  {
    periode: "2007–2015", rol: "Managing Partner (mede-oprichter)", bedrijf: "Red Carpets",
    kort: "Retentie-adviesbureau: klantbehoud, lifecycle strategie, Sales-as-a-Service.",
    lang: "Adviesbureau gespecialiseerd in klantbehoud, klantcontact, klanttevredenheidsmeting en digitale contactstrategieën. Klanten: Staatsloterij, ANWB, Telegraaf, TomTom, Telfort, Plan Nederland, Amnesty International. KPI-dashboard webapplicatie ontwikkeld. Sourcing audits en evaluaties.",
    rel: ["retentie", "klant", "crm", "lifecycle", "service", "commercieel", "turnaround", "contact", "advies"],
    tags: ["Klantretentie", "CRM", "KPI-dashboard"],
  },
  {
    periode: "2009–2010", rol: "Hoofd Klantenservice", bedrijf: "Nederlandse Staatsloterij",
    kort: "Klantenservice omgevormd tot winstmotor: 60% retentie↑, 50% kosten↓.",
    lang: "Leiding eerste- en tweedelijns klantenservice (15 FTE intern, 100+ agents outsourced). Retentie-taskforce geïmplementeerd. Sales-as-a-Service model ingevoerd: +23% opbrengst per gesprek. Sociale monitoring, webcare en web selfservice opgezet. Businesscase chatbot-implementatie opgesteld. Contract management KPI's met externe partners.",
    rel: ["klant", "service", "retentie", "commercieel", "contact", "crm", "operationeel", "kpi"],
    tags: ["60% retentie↑", "50% kosten↓", "+23% per gesprek", "Sales-as-a-Service"],
  },
  {
    periode: "2005–2007", rol: "Managing Director", bedrijf: "Saatchi & Saatchi Direct",
    kort: "Turnaround management reclamebureau; cross-team samenwerking verbeterd.",
    lang: "Toezicht commerciële, financiële en operationele aspecten. Cross-reviews ingevoerd tussen ATL en BTL teams — van interne competitie naar één gezamenlijke klantaanpak. Klanten: T-Mobile, Mercedes-Benz Bedrijfswagens, Nutricia, GSK/GlaxoSmithKline, P&G.",
    rel: ["turnaround", "leiderschap", "commercieel", "operationeel", "team", "samenwerking", "management"],
    tags: ["Turnaround management", "ATL+BTL integratie"],
  },
  {
    periode: "2004", rol: "Strategist", bedrijf: "FHV/BBDO & Proximity",
    kort: "Brand activation, digitale marketing en CRM voor lokale en globale accounts.",
    lang: "Interim strategie, brand activation, digitale marketing en CRM voor Randstad, KPN, DE Pickwick, Snack-a-Jacks, Trivago, Mars. Pitch NV Luchthaven Schiphol.",
    rel: ["strategie", "merk", "brand", "marketing", "crm", "communicatie", "agency"],
    tags: ["Brand activation", "CRM", "Digitale strategie"],
  },
  {
    periode: "1997–2003", rol: "Head of Strategy | Client Services Director", bedrijf: "Ogilvy Amsterdam",
    kort: "Strategische businessunit Ogilvy Navigator; managementteam 85 FTE.",
    lang: "Verantwoordelijk voor strategische businessunit Ogilvy Navigator. Interne strateeg voor mondiale key accounts, team van 8 strategy consultants plus marketing intelligence unit en Knowledge Centre. Lid managementteam (85 FTE). Klanten: Ford, Dove, ING, Mercedes-Benz, Unilever, Nestlé, Quaker. Soldiers Handbook geschreven: processtandaardisering en verbeterde billability.",
    rel: ["strategie", "communicatie", "merk", "brand", "leiderschap", "management", "account", "agency"],
    tags: ["Managementteam 85 FTE", "Ford · ING · Unilever", "Ogilvy Navigator"],
  },
  {
    periode: "1995–1996", rol: "Account Director | Account Manager", bedrijf: "Grey Communications Group",
    kort: "Multidisciplinaire teams voor internationale klanten.",
    lang: "Account management voor internationale klanten. DHL, BP, Nedlloyd, Akzo Nobel Coatings, P&G, Roche, SmithKline Beecham.",
    rel: ["account", "internationaal", "bureau", "agency", "communicatie"],
    tags: ["DHL", "BP", "P&G", "Internationaal"],
  },
  {
    periode: "1987–1993", rol: "Database Marketing & Direct Marketing", bedrijf: "Schober · Experian (Whooz) · Vierhand",
    kort: "Data science, profiling, B2B targeting en direct marketing — het fundament.",
    lang: "Schober Information Group (1991-1993): database marketing, telemarketing, conceptontwikkeling. Experian/Whooz (1989-1990): data science, geo-data, customer profiling en data-analytics. Vierhand Direct Marketing (1987-1989): data-analytics B2B, targeting, list-broking. Dit is het fundament van de data-driven aanpak die door de hele loopbaan terugkeert.",
    rel: ["data", "database", "marketing", "analyse", "direct", "targeting"],
    tags: ["Data science", "Profiling", "Fundament data-driven werken"],
  },
];

// Bepaal highlight op basis van vacaturetekst
function getHighlights(vacatureTekst) {
  if (!vacatureTekst) return { 4: true }; // default: VIM Group (index 4)
  const lv = vacatureTekst.toLowerCase();
  return Object.fromEntries(
    LOOPBAAN.map((item, i) => [i, (item.rel || []).some(k => lv.includes(k))])
  );
}

// ─── VASTE Q&A ────────────────────────────────────────────────────────────────
const QA = [
  { keys: ["vertel over jezelf", "stel jezelf voor", "wie ben je", "loop door je cv"],
    a: "Ik ben iemand die al heel lang op het snijvlak werkt van 'wat willen we bereiken' en 'hoe gaan we dat dan doen' — niet als de man met het plan die het daarna overdraagt, maar als iemand die er doorheen zit. Strategie zonder draagvlak is papier, uitvoering zonder richting is rondrennen." },
  { keys: ["zwakte", "minder goed", "verbeterpunt", "valkuil"],
    a: "Ik kan ongeduldig worden als iets vastloopt terwijl de oplossing voor de hand ligt. Dan trek ik het liever zelf dan dat ik iemand de ruimte geef het zelf uit te zoeken. Bij Ncardia heb ik geleerd dat borging meer waard is dan snelheid — als het team het zelf heeft bedacht, blijft het ook als ik weg ben." },
  { keys: ["weerstand", "mensen meenemen", "draagvlak", "overtuigen"],
    a: "De slechtste aanpak is mensen proberen te overtuigen. Bij Merck had ik twaalf mensen die echt niet wilden. Twee dagen De Bono — iedereen moest ook de andere kant verdedigen. Op dag twee schreven ze zelf het implementatieplan. Weerstand omgezet in eigenaarschap, omdat het hun plan was geworden." },
  { keys: ["mislukking", "fout gemaakt", "mislukt", "falen"],
    a: "App & Web Lab. Ik had een KPI-dashboard gebouwd, de Staatsloterij was enthousiast — maar ik had maar één klant. Toen de performance problemen werden had ik geen buffer. Stekker eruit getrokken. Geleerd: nooit lanceren met één klant, eerder externe funding zoeken." },
  { keys: ["leiderschapsstijl", "hoe leid je", "aansturen"],
    a: "Coachend, maar niet soft. Ik geloof in eigenaarschap — mensen moeten het zelf willen en kunnen. Maar ik ben direct als iets niet goed gaat. Goede leiders zijn helder over verwachtingen en laten daarna los. Bij de Staatsloterij deed ik dat letterlijk: afdeling omgevormd tot Sales-as-a-Service en het team zelf verantwoordelijk gemaakt." },
  { keys: ["pmo", "prince2", "programmamanagement", "methodiek", "scrum"],
    a: "Prince2 Practitioner, dagelijks toegepast. VIM Group: vijf entiteiten, elf werkstromen, vijftig FTE — on time, within budget. Maar Prince2 is een middel, geen doel. Soms is een heldere weekstructuur effectiever dan een volledig Prince2-dossier. Ik schakel ook naar Scrum als de situatie dat vraagt." },
  { keys: ["ai", "artificial intelligence", "eu ai act", "ai compliance"],
    a: "Ik heb de AI Compliance Academy opgericht omdat organisaties AI adopteren zonder dat mensen weten wat ze doen. Mijn trainingen gaan over geletterdheid én governance: wat leg je vast, wie is verantwoordelijk. De EU AI Act is daarin een houvast. Maatschappelijk urgent, en onderschat." },
  { keys: ["beschikbaarheid", "wanneer starten", "start", "wanneer beschikbaar"],
    a: "BESCHIKBAARHEID_DYNAMIC" },
  { keys: ["salaris", "tarief", "vergoeding", "pakket", "arbeidsvoorwaarden", "kosten"],
    a: "SALARIS_DYNAMIC" },
  { keys: ["sport", "hobby", "vrije tijd", "zeilen", "schaatsen", "brandweer", "buiten", "klussen"],
    a: "Ik ben graag buiten en klus graag — dat geeft me rust en afstand van het werk. Ik zeil, schaats als het ijs het toelaat, en ben brandwacht in opleiding bij de Vrijwillige Brandweer in Bilthoven. En de Atlantische Oceaan oversteken naar de Caraïben staat nog op de lijst." },
  { keys: ["persoonlijk", "mens", "wie ben je echt", "privé", "thuis", "gezin", "getrouwd", "dochter", "familie"],
    a: "Getrouwd, vier dochters — twee zijn al het huis uit, twee nog niet. Ik ben graag buiten en klus graag, dat geeft me rust. En ik hou van water: ik schaats als het ijs het toelaat, zeil regelmatig, en wil ooit de Atlantische Oceaan oversteken naar de Caraïben. Dat staat op de lijst." },
  { keys: ["wat maakt jou anders", "onderscheidt", "uniek", "toegevoegde waarde"],
    a: "Drie dingen: ik doe strategie én uitvoering — geen handoff. Ik werk even goed op directieniveau als de werkvloer. En ik zorg voor borging: bij Ncardia draait het team nu zelfstandig, bij Merck schreef het team het implementatieplan zelf. Dat is voor mij het echte bewijs dat iets gelukt is." },
  { keys: ["interim", "freelance", "veel gewisseld", "loyaliteit"],
    a: "Ik ben het beste in situaties waar snel richting, structuur en resultaat nodig zijn — bijna per definitie tijdelijk. Na VIM Group, na Merck, na Ncardia — telkens stond er iets, was mijn rol klaar." },
  { keys: ["te senior", "overkwalificatie", "te veel ervaring"],
    a: "Mijn senioriteit is geen reden om me weg te zetten — het is een reden om me in te zetten. Ik heb de fouten al gemaakt, herken de patronen, hoef niet alles opnieuw uit te zoeken. Dat levert snelheid op. En ik zoek inhoudelijke uitdaging, geen status." },
  { keys: ["geen sector", "andere sector", "niet uit de"],
    a: "Klopt, ik kom niet altijd uit de sector. Wat ik meeneem is ervaring in complexe organisaties met veel belangen, waar strategie en uitvoering uit elkaar dreigen te vallen. Die dynamiek is sector-onafhankelijk. En ik leer snel — dat is een patroon in mijn loopbaan, geen bewering." },
  { keys: ["vragen aan jullie", "eigen vragen", "wil je iets vragen"],
    a: "Zeker. Wanneer is deze rol na twaalf maanden geslaagd — niet in activiteiten, maar in wat er dan anders is? En waar zit nu de meeste spanning: in de strategie, de uitvoering, of het meekrijgen van mensen?" },
  { keys: ["grootste prestatie", "trots op", "hoogtepunt"],
    a: "De Staatsloterij — omdat het zo onwaarschijnlijk was. Klantenservice omvormen tot winstmotor met mensen die alleen servicegesprekken gewend waren. Systeem en incentives veranderd, niet de mensen. 50% kostenreductie, 60% betere retentie. Dat heb ik nooit meer in die combinatie geëvenaard." },
  { keys: ["cultuur", "omgeving", "type organisatie"],
    a: "Professioneel maar niet bureaucratisch. Mensen die inhoudelijk zijn, meningen hebben en bereid zijn die te toetsen. De beste teams die ik heb meegemaakt hadden constructieve spanning — niet altijd eens, maar wel dezelfde kant op." },
  { keys: ["feedback ontvangen", "kritiek ontvangen"],
    a: "Ik probeer eerst echt te luisteren voor ik reageer. Makkelijker gezegd dan gedaan. De meest bruikbare feedback: 'Je neemt mensen soms te snel mee in je redenering zonder te checken of ze er nog bij zijn.' Dat klopt. Werk er nog steeds aan." },
  { keys: ["motivatie", "energie", "drijfveer"],
    a: "Het moment waarop een team dat vastliep ineens weet wat het moet doen. Niet de mijlpaal in het plan — het zichtbare moment van 'het klikt'. Dat is voor mij het echte bewijs dat iets gelukt is." },
];

function getLocal(q, isFreelance, qaOverrides) {
  const lq = q.toLowerCase();
  for (const item of QA) {
    if (item.keys.some(k => lq.includes(k))) {
      const key = item.keys[0];
      const override = qaOverrides?.[key];
      // Gebruik aangepast antwoord als dat bestaat
      if (override?.customAnswer) {
        if (override.customAnswer === "BESCHIKBAARHEID_DYNAMIC") {
          // val through to dynamic handling below
        } else if (override.customAnswer === "SALARIS_DYNAMIC") {
          // val through
        } else {
          return override.customAnswer;
        }
      }
      // Dynamic answers
      if (item.a === "BESCHIKBAARHEID_DYNAMIC") {
        return isFreelance
          ? "Beschikbaar als freelancer, 4 à 5 dagen per week. Eén dag houd ik vrij voor AI Compliance Academy. Geen lange opzegtermijnen — ik kan snel starten."
          : "Beschikbaar voor een vaste rol. Ik hanteer een normale opzegtermijn — laten we dat in het gesprek afstemmen. Eén dag per week houd ik vrij voor AI Compliance Academy; dat is bespreekbaar afhankelijk van de afspraken.";
      }
      if (item.a === "SALARIS_DYNAMIC") {
        return isFreelance
          ? "Ik werk op basis van een dagtarief. Dat hangt af van de looptijd, de scope en wat er verder in de afspraken zit — reiskosten, parkeren, kosten van derden. Ik praat daar graag openlijk over, geen verborgen agenda."
          : "Dat hangt af van de scope van de rol, de verantwoordelijkheid, en wat er verder in het pakket zit — flexibiliteit, opleidingsbudget, mobiliteitsregeling. Ik noem liever een bandbreedte in een gesprek dan een getal hier.";
      }
      return item.a;
    }
  }
  return null;
}

// ─── AI CALL ─────────────────────────────────────────────────────────────────

// ─── AI RESPONSE CLEANUP ─────────────────────────────────────────────────────
// Verwijdert AI-kenmerken uit elke respons
function cleanAI(text) {
  if (!text) return text;
  return text
    // strip markdown
    .replace(/\*\*([^*]+)\*\*/g, "$1")   // bold
    .replace(/\*([^*]+)\*/g, "$1")        // italic
    .replace(/#{1,6}\s+/g, "")            // headers
    .replace(/^[-*]\s+/gm, "")            // bullet points
    // strip AI preamble
    .replace(/^[^\n]*?(?:hier is|introductietekst voor|tekst voor)[^\n]*\n+/i, "")
    .replace(/^[^\n]*?(?:hier is|introductietekst voor|tekst voor)[^\n]*:/i, "")
    .replace(/precies/gi, (match) => {
      // Vervang contextueel
      return "";
    })
    .replace(/dat is precies /gi, "dat is ")
    .replace(/precies zoals /gi, "zoals ")
    .replace(/precies wat /gi, "wat ")
    .replace(/precies waarom /gi, "daarom ")
    .replace(/precies de combinatie/gi, "de combinatie")
    .replace(/precies waar /gi, "daar ")
    .replace(/precies dat /gi, "dat ")
    .replace(/precies zo /gi, "zo ")
    .replace(/precies/gi, "")
    .replace(/  +/g, " ")
    .trim();
}

function buildContext(vacatureTekst, isFreelance, kennisbank, stijlgeheugen) {
  const contractContext = isFreelance
    ? `Je solliciteert als freelancer/interim. Benadruk beschikbaarheid, snelheid, geen overhead, directe impact. Je hebt bewust voor dit model gekozen omdat je het beste bent in situaties waar snel richting, structuur en resultaat nodig zijn.`
    : `Je solliciteert op een VASTE BAAN. Benadruk dat je na jaren bouwen ook graag bij bent als het bestendigd wordt — de oogst, de optimalisatie, de lange termijn. Je hebt veel opgebouwd voor anderen; nu wil je ook zelf de vruchten plukken van wat je opbouwt. Continuïteit als meerwaarde, niet als beperking.`;

  // Kennisbank-blokken samenvoegen
  const kbTekst = (kennisbank || [])
    .filter(b => b.tekst?.trim())
    .map(b => `[${b.titel || b.cat}]\n${b.tekst.trim()}`)
    .join("\n\n");

  // Stijlgeheugen — geleerde voorkeuren
  const stijlTekst = (stijlgeheugen || [])
    .map(s => s.observatie).filter(Boolean).join(" ");

  return `Je bent Arjen Vaalburg, 55 jaar, programmamanager en strategisch adviseur. ${contractContext}

TOON & STIJL (verplicht):
Schrijf in eerste persoon, gewone spreektaal. Korte tot middellange zinnen — één zin, één punt. Gedachtestreepje (—) voor scherpe bijzin. Concrete cijfers waar mogelijk. Warm maar zakelijk, nooit informeel of joviaal. Bij persoonlijke vragen gewoon persoonlijk — NOOIT terugvallen op werkervaring. Max 4 zinnen, geen bullets.

GOEDE FORMULERINGEN: "wat mij aanspreekt", "voor mij begint", "ik vind het belangrijk dat", "ik zorg dat", "ik breng structuur aan", "mijn ervaring ligt op het snijvlak van", "de rode draad in mijn loopbaan is", "ik neem mensen mee", "ik maak plannen concreet".

VERBODEN — gebruik deze woorden en uitdrukkingen NOOIT:
precies, executiekracht, operationalisering, betekenisgeving, rolverheldering, strategische alignment, faciliteren (gebruik: helpen / zorgen dat), borgen (gebruik: zorgen dat het blijft staan), passie, out-of-the-box, spin in het web, duizendpoot, de ideale kandidaat, op het lijf geschreven, stakeholdermanagement (in combinatie met andere jargonwoorden). Gebruik nooit "Hoi" of "Hey" als aanhef — altijd "Beste [naam]", "Dag [naam]" of "Geachte [naam]".

GEEN AFSLUITENDE SAMENVATTING: eindig een antwoord nooit met een zin die samenvat wat je net zei of onderstreept dat je er goed in bent. Geen "dat is het snijvlak waar ik het beste op functioneer", geen "dat geeft energie", geen "dat is waar ik goed in ben", geen "dat past bij me". Zeg het één keer goed, dan is het klaar.${stijlTekst ? `

PERSOONLIJKE STIJLVOORKEUR (geleerd uit eigen correcties):
${stijlTekst}` : ""}

ACHTERGROND: PMO VIM Group/PŸUR (Prince2, 50 FTE, 11 werkstromen), Global Head Comms Merck KGaA (50.000+ mwk, De Bono, €100k besparing), Head Brand Ncardia (HubSpot end-to-end), Hoofd KS Staatsloterij (60% retentie↑, Sales-as-a-Service), Head Strategy Ogilvy Amsterdam, AI Compliance Academy (2025). NIMA-C, Prince2, Scrum PO/SM.

PERSOONLIJK: getrouwd, vier dochters (twee het huis uit, twee nog thuis), woont in Bilthoven. Graag buiten, klust graag — geeft rust en afstand. Zeilt, schaatst als het ijs het toelaat, brandwacht in opleiding bij VRU Bilthoven. Ex-voorzitter en coach waterpolovereniging. Wil OOIT de Atlantische Oceaan oversteken naar de Caraïben — staat op de lijst maar is nog niet gedaan.

VACATURE CONTEXT:
${vacatureTekst || "Geen vacature opgegeven."}${kbTekst ? `

EXTRA CONTEXT (kennisbank — gebruik dit bij relevante vragen):
${kbTekst}` : ""}`;
}

async function callAI(q, vacatureTekst, isFreelance, kennisbank, stijlgeheugen) {
  try {
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        system: buildContext(vacatureTekst, isFreelance, kennisbank, stijlgeheugen),
        messages: [{ role: "user", content: q }],
      }),
    });
    const d = await r.json();
    return cleanAI(d.content?.[0]?.text?.trim()) || "Sorry, even geen verbinding — probeer de vraag opnieuw.";
  } catch { return "Verbindingsfout — probeer opnieuw."; }
}

// ─── STANDAARD CHIPS PER CATEGORIE ───────────────────────────────────────────
const DEFAULT_CHIPS = [
  { labelKey: "chip_opening", chips: ["Vertel over jezelf", "Waarom ben jij geschikt?", "Wat zoek je in een rol?"] },
  { labelKey: "chip_sterktes", chips: ["Wat is je grootste zwakte?", "Wat motiveert jou?", "Hoe omschrijven collega's jou?"] },
  { labelKey: "chip_ervaring", chips: ["Wat is je grootste prestatie?", "Vertel over een mislukking", "PMO-ervaring?", "Ervaring met AI?"] },
  { labelKey: "chip_leiderschap", chips: ["Wat is je leiderschapsstijl?", "Hoe ga je om met weerstand?", "Hoe geef je feedback?"] },
  { labelKey: "chip_lastig", chips: ["Ben je niet te senior?", "Waarom zoveel interimrollen?", "Geen sector-ervaring — waarom toch?"] },
  { labelKey: "chip_afsluiting", chips: ["Beschikbaarheid & tarief?", "In welke cultuur pas jij?", "Vragen aan jullie"] },
  { labelKey: "chip_persoonlijk", chips: ["Wat voor sport doe je?", "Wie ben je buiten je cv?"] },
];

// ─── INTRO EDITOR (boven chat, bewerkbaar) ────────────────────────────────────
function IntroEditor({ introTekst, onChange, onSaveAsTemplate, ac }) {
  const [editing, setEditing] = useState(false);
  const [localVal, setLocalVal] = useState(introTekst);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setLocalVal(introTekst); }, [introTekst]);

  const save = () => {
    onChange(localVal);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveAsTemplate = () => {
    onSaveAsTemplate(localVal);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!introTekst && !editing) return null;

  return (
    <div style={{ borderBottom: "0.5px solid #e5e7eb", background: "#f9fafb" }}>
      {!editing ? (
        <div style={{ padding: "14px 20px", position: "relative" }}>
          <pre style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 13, lineHeight: 1.8, color: "#374151", whiteSpace: "pre-wrap", paddingRight: 80 }}>
            {localVal}
          </pre>
          <button
            onClick={() => setEditing(true)}
            style={{ position: "absolute", top: 12, right: 16, padding: "3px 10px", background: "transparent", border: `0.5px solid ${ac || "#d1d5db"}`, borderRadius: 6, cursor: "pointer", fontSize: 11, color: ac || "#6b7280" }}
          >
            ✏️ Bewerken
          </button>
        </div>
      ) : (
        <div style={{ padding: "14px 20px" }}>
          <textarea
            value={localVal}
            onChange={e => setLocalVal(e.target.value)}
            style={{ width: "100%", minHeight: 140, padding: "10px 12px", borderRadius: 8, border: `1px solid ${ac || "#d1d5db"}`, fontSize: 13, fontFamily: "Georgia, serif", lineHeight: 1.8, resize: "vertical", boxSizing: "border-box", color: "#374151", background: "#fff" }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={save} style={{ padding: "6px 16px", background: ac || "#111", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
              Opslaan
            </button>
            <button onClick={saveAsTemplate} style={{ padding: "6px 14px", background: "#fff", border: `0.5px solid ${ac || "#d1d5db"}`, borderRadius: 7, cursor: "pointer", fontSize: 12, color: ac || "#374151" }}>
              ⭐ Bewaar als starttemplate
            </button>
            <button onClick={() => { setLocalVal(introTekst); setEditing(false); }} style={{ padding: "6px 12px", background: "transparent", border: "0.5px solid #d1d5db", borderRadius: 7, cursor: "pointer", fontSize: 12, color: "#6b7280" }}>
              Annuleren
            </button>
            {saved && <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 700 }}>✓ Opgeslagen</span>}
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "#9ca3af", lineHeight: 1.5 }}>
            "Bewaar als starttemplate" → deze tekst verschijnt als startpunt bij de volgende sollicitatie in het setup-scherm.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── SETUP SCHERM ─────────────────────────────────────────────────────────────
const DEFAULT_INTRO = `Waarom een interactieve sollicitatie?

Een CV is een monoloog. Dit is een dialoog.

In plaats van een document dat je doorleest, kun je hier vragen stellen — over mijn aanpak, mijn ervaring, of wat ik voor jullie organisatie kan betekenen. Zoals je dat in een gesprek zou doen.

Dat past bij hoe ik werk: niet presenteren vanuit een script, maar het goede gesprek voeren. En het past bij hoe organisaties steeds meer communiceren — interactief, persoonlijk, op het moment dat het uitkomt.

Stel een vraag hieronder, of kies er een uit de lijst.`;

function SetupScherm({ onSave, introTemplate }) {
  const [bedrijf, setBedrijf] = useState("");
  const [functie, setFunctie] = useState("");
  const [slug, setSlug] = useState("");
  const [kleur, setKleur] = useState("#111111");
  const [vacatureTekst, setVacatureTekst] = useState("");
  const [isFreelance, setIsFreelance] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [introVoorstel, setIntroVoorstel] = useState(introTemplate || "");
  const [step, setStep] = useState(1);

  const autoSlug = (s) => s.toLowerCase()
    .replace(/[àáâãä]/g, "a").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ÿý]/g, "y")
    .replace(/[\s_/\\]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const generateIntro = async () => {
    if (!vacatureTekst && !functie) return;
    setGenerating(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: "Schrijf een korte introductietekst (max 120 woorden) voor een interactieve sollicitatiepagina van Arjen Vaalburg. Begin DIRECT met de tekst zelf — geen inleiding, geen 'Hier is een tekst:', geen uitleg vooraf. Geen markdown, geen asterisken, geen kopjes. Gewone lopende tekst met alinea-afbrekingen. Stijl: helder, actief, persoonlijk-professioneel. Gewone taal, korte zinnen, ik-vorm. Warm maar zakelijk. Leg uit waarom hij kiest voor een interactieve dialoog in plaats van een PDF. Maak het specifiek voor de genoemde functie en organisatie. Eindig met een uitnodiging om een vraag te stellen. VERBODEN woorden: precies, passie, executiekracht, operationalisering, betekenisgeving, spin in het web, duizendpoot, faciliteren, borgen, strategische alignment, out-of-the-box, de ideale kandidaat.",
          messages: [{ role: "user", content: `Functie: ${functie}\nOrganisatie: ${bedrijf}\nVacaturetekst: ${vacatureTekst.slice(0, 500)}` }],
        }),
      });
      const d = await r.json();
      setIntroVoorstel(cleanAI(d.content?.[0]?.text?.trim()) || DEFAULT_INTRO);
    } catch { setIntroVoorstel(introTemplate || DEFAULT_INTRO); }
    setGenerating(false);
  };

  const opslaan = () => {
    if (!bedrijf || !functie) return;
    onSave({
      bedrijf,
      functie,
      slug: slug || autoSlug(bedrijf),
      kleur,
      vacatureTekst,
      isFreelance,
      introTekst: introVoorstel || DEFAULT_INTRO,
    });
  };

  const inp = { width: "100%", padding: "9px 12px", borderRadius: 8, border: "0.5px solid #d1d5db", fontSize: 14, fontFamily: "sans-serif", boxSizing: "border-box", color: "#374151", outline: "none" };
  const lbl = { display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 5, letterSpacing: "0.07em", textTransform: "uppercase" };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f4", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", fontFamily: "sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 580, background: "#fff", borderRadius: 16, border: "0.5px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
        <div style={{ height: 4, background: "#111" }} />
        <div style={{ padding: "24px 28px", borderBottom: "0.5px solid #e5e7eb", display: "flex", alignItems: "center", gap: 18 }}>
          <img
            src="data:image/png;base64,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"
            alt="Arjen Vaalburg"
            style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", objectPosition: "center top", flexShrink: 0, border: "2px solid #e5e7eb" }}
          />
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 800, fontSize: 18, color: "#111", fontFamily: "Arial Black, Arial, sans-serif" }}>Nieuwe sollicitatie</p>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>Vul de vacature in — de app past zich automatisch aan.</p>
          </div>
        </div>

        <div style={{ padding: "24px 28px" }}>
          {/* Stap 1: Basis */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, color: "#111" }}>1 — Vacature</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={lbl}>Organisatie *</label>
                <input value={bedrijf} onChange={e => { setBedrijf(e.target.value); if (!slug) setSlug(autoSlug(e.target.value)); }} style={inp} placeholder="bijv. Heijmans" />
              </div>
              <div>
                <label style={lbl}>Functietitel *</label>
                <input value={functie} onChange={e => setFunctie(e.target.value)} style={inp} placeholder="bijv. Programmamanager" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={lbl}>URL-slug</label>
                <input value={slug} onChange={e => setSlug(autoSlug(e.target.value))} style={{ ...inp, fontFamily: "monospace" }} placeholder="bijv. heijmans" />
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "#9ca3af" }}>cv.arjenvaalburg.nl/{slug || "..."}</p>
              </div>
              <div>
                <label style={lbl}>Accentkleur</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="color" value={kleur} onChange={e => setKleur(e.target.value)} style={{ width: 44, height: 36, border: "0.5px solid #d1d5db", borderRadius: 8, padding: 2, cursor: "pointer" }} />
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: "#6b7280" }}>{kleur}</span>
                </div>
              </div>
            </div>
            <div>
            {/* Contractvorm */}
            <div style={{ display: "flex", gap: 8, padding: "10px 14px", background: "#f9fafb", borderRadius: 10, border: "0.5px solid #e5e7eb", marginBottom: 12 }}>
              <p style={{ margin: "0 8px 0 0", fontSize: 13, fontWeight: 600, color: "#374151" }}>Type opdracht:</p>
              {[
                { val: true, label: t("setup_freelance"), desc: t("setup_freelance_sub") },
                { val: false, label: t("setup_vaste"), desc: t("setup_vaste_sub") },
              ].map(opt => (
                <label key={String(opt.val)} style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${isFreelance === opt.val ? "#111" : "#e5e7eb"}`, background: isFreelance === opt.val ? "#111" : "#fff", transition: "all 0.15s" }}>
                  <input type="radio" name="contractvorm" checked={isFreelance === opt.val} onChange={() => setIsFreelance(opt.val)}
                    style={{ marginTop: 2, accentColor: "#fff", flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: isFreelance === opt.val ? "#fff" : "#111" }}>{opt.label}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: isFreelance === opt.val ? "rgba(255,255,255,0.65)" : "#9ca3af", lineHeight: 1.4 }}>{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
              <label style={lbl}>Vacaturetekst (plak hier de volledige tekst)</label>
              <textarea
                value={vacatureTekst}
                onChange={e => setVacatureTekst(e.target.value)}
                placeholder="Plak hier de vacaturetekst of functie-eisen. Hoe meer detail, hoe beter de app zich aanpast: relevante loopbaanrollen worden gemarkeerd, de AI weet wat er speelt, en de introductietekst sluit aan."
                style={{ ...inp, minHeight: 140, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>
          </div>

          {/* Stap 2: Introductietekst */}
          <div style={{ marginBottom: 24, background: "#f9fafb", borderRadius: 10, border: "0.5px solid #e5e7eb", padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#111" }}>2 — Introductietekst boven de chat</p>
              <button
                onClick={generateIntro}
                disabled={generating || (!functie && !vacatureTekst)}
                style={{ padding: "6px 14px", background: generating ? "#f3f4f6" : "#111", color: generating ? "#9ca3af" : "#fff", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 700 }}
              >
                {generating ? t("setup_generating") : t("setup_gen_ai")}
              </button>
            </div>
            <textarea
              value={introVoorstel || DEFAULT_INTRO}
              onChange={e => setIntroVoorstel(e.target.value)}
              style={{ ...inp, minHeight: 120, resize: "vertical", lineHeight: 1.7, fontFamily: "Georgia, serif", fontSize: 13 }}
            />
            <p style={{ margin: "6px 0 0", fontSize: 11, color: "#9ca3af" }}>Zichtbaar voor de recruiter boven het chatvenster. Klik "Genereer met AI" voor een voorstel op basis van de vacature.</p>
          </div>

          <button
            onClick={opslaan}
            disabled={!bedrijf || !functie}
            style={{ width: "100%", padding: "12px 0", background: !bedrijf || !functie ? "#f3f4f6" : "#111", color: !bedrijf || !functie ? "#9ca3af" : "#fff", border: "none", borderRadius: 10, cursor: !bedrijf || !functie ? "default" : "pointer", fontSize: 15, fontWeight: 800, fontFamily: "Arial Black, Arial, sans-serif" }}
          >
            Sollicitatiepagina openen →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DOTS ─────────────────────────────────────────────────────────────────────
function Dots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "4px 2px" }}>
      {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9ca3af", animation: "blink 1.2s infinite", animationDelay: `${i*0.2}s` }} />)}
      <style>{`@keyframes blink{0%,80%,100%{opacity:.2}40%{opacity:1}}`}</style>
    </div>
  );
}

// ─── CHAT PANEL ───────────────────────────────────────────────────────────────
// ─── KLEURPALET HELPER ───────────────────────────────────────────────────────
// Genereert 4 tinten van de accentkleur: basis + 3 complementaire niveaus
function usePalette(ac) {
  const base = ac || "#111111";
  return {
    full:   base,                    // volle kleur — knoppen, sterren, accenten
    mid:    base + "40",             // 25% — subtiele borders, tags
    soft:   base + "18",             // 10% — lichte achtergronden
    whisper:base + "0C",             // 5%  — haast onzichtbaar, zebrastrepen
  };
}

function ChatPanel({ chips, vacatureTekst, vacatureSlug, ac, isFreelance, kennisbank, qaOverrides, stijlgeheugen }) {
  const pal = usePalette(ac);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const openingMsg = { who: "av", text: t("chat_opening") };
  const [typing, setTyping] = useState(false);
  const [chipsHidden, setChipsHidden] = useState(false);
  const [sessionStart] = useState(Date.now());
  const transcriptRef = useRef([]);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const saveTranscript = async (transcript) => {
    try {
      const key = `analytics-${vacatureSlug || "default"}`;
      const existing = await window.storage?.get(key).catch(() => null);
      const data = existing?.value ? JSON.parse(existing.value) : { sessions: [] };
      const sessionId = `s-${sessionStart}`;
      const sessions = data.sessions || [];
      const idx = sessions.findIndex(s => s.id === sessionId);
      const session = { id: sessionId, started: sessionStart, lastActive: Date.now(), durationMin: Math.round((Date.now() - sessionStart) / 60000), exchanges: transcript };
      if (idx >= 0) sessions[idx] = session; else sessions.push(session);
      data.sessions = sessions.slice(-50);
      await window.storage?.set(key, JSON.stringify(data)).catch(() => {});
    } catch {}
  };

  const send = async (q) => {
    const text = q.trim();
    if (!text) return;
    setChipsHidden(true);
    setInput("");
    setMsgs(m => [...m, { who: "user", text }]);
    setTyping(true);
    const local = getLocal(text, isFreelance, qaOverrides);
    let answer;
    if (local) {
      await new Promise(r => setTimeout(r, 700 + Math.random() * 300));
      answer = local;
    } else {
      answer = await callAI(text, vacatureTekst, isFreelance, kennisbank, stijlgeheugen);
    }
    setTyping(false);
    setMsgs(m => [...m, { who: "av", text: answer }]);
    setChipsHidden(false);
    transcriptRef.current = [...transcriptRef.current, { ts: Date.now(), q: text, a: answer, type: local ? "chip" : "free" }];
    saveTranscript(transcriptRef.current);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ maxHeight: 320, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {[openingMsg, ...msgs].map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 10, flexDirection: m.who === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: m.who === "av" ? "#111" : "#e5e7eb", color: m.who === "av" ? "#fff" : "#555", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
              {m.who === "av" ? "AV" : "U"}
            </div>
            <div style={{ maxWidth: "74%", padding: "10px 14px", borderRadius: 12, fontSize: 14, lineHeight: 1.65, color: "#374151", background: m.who === "user" ? "#f3f4f6" : "#fff", border: "0.5px solid #e5e7eb" }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0 }}>AV</div>
            <div style={{ padding: "10px 14px", borderRadius: 12, background: "#fff", border: "0.5px solid #e5e7eb" }}><Dots /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!chipsHidden && (
        <div style={{ padding: "0 20px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
          {chips.map(group => (
            <div key={group.label}>
              <p style={{ margin: "0 0 4px", fontSize: 10, fontWeight: 700, color: ac || "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase" }}>{t(group.labelKey || group.label)}</p>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {group.chips.map(c => (
                  <button key={c} onClick={() => send(c)} style={{ padding: "4px 11px", borderRadius: 20, border: `0.5px solid ${pal.mid}`, background: "#fff", color: "#6b7280", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.target.style.background=pal.soft; e.target.style.borderColor=pal.full; e.target.style.color="#374151"; }}
                    onMouseLeave={e => { e.target.style.background="#fff"; e.target.style.borderColor=pal.mid; e.target.style.color="#6b7280"; }}>{c}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "12px 20px", borderTop: "0.5px solid #e5e7eb", display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)}
          placeholder={t("chat_placeholder")} style={{ flex: 1, padding: "9px 14px", borderRadius: 8, border: `1px solid ${pal.mid}`, fontSize: 14, outline: "none", fontFamily: "sans-serif", color: "#374151", background: "#fff" }} />
        <button onClick={() => send(input)} style={{ padding: "9px 16px", background: ac || "#111", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 16 }}>↑</button>
      </div>
    </div>
  );
}

// ─── TIMELINE PANEL ───────────────────────────────────────────────────────────
function LoopbaanPanel({ highlights, ac }) {
  const [open, setOpen] = useState({});
  const color = ac || "#111";
  return (
    <div style={{ padding: "16px 20px", overflowY: "auto", maxHeight: 420 }}>
      {LOOPBAAN.map((item, i) => {
        const isHighlight = highlights[i];
        const isOpen = open[i] !== false && (isHighlight || open[i] === true);
        return (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 4 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 5, flexShrink: 0, width: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: isHighlight ? color : "#d1d5db", boxShadow: isHighlight ? `0 0 0 3px ${color}25` : "none" }} />
              {i < LOOPBAAN.length - 1 && <div style={{ width: 1, flex: 1, background: isHighlight ? color + "30" : "#e5e7eb", minHeight: 16, marginTop: 4 }} />}
            </div>
            <div onClick={() => setOpen(o => ({ ...o, [i]: !isOpen }))}
              style={{ flex: 1, marginBottom: 10, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                border: `0.5px solid ${isOpen ? (isHighlight ? color + "50" : "#d1d5db") : "transparent"}`,
                background: isOpen ? (isHighlight ? color + "08" : "#f9fafb") : "transparent",
                transition: "all 0.15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: isHighlight ? color : "#111", lineHeight: 1.3 }}>
                    {item.rol.replace(/ a\.i\.$/, "").replace(/ a\.i\.,/, ",")}{isHighlight ? " ★" : ""}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>{item.bedrijf}</p>
                </div>
                <span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap", marginLeft: 8 }}>{item.periode.replace(/\d{4}[–\-]\d{4}|\d{4}[–\-]nu|\d{4}[–\-]heden|\d{4}/g, "").replace(/^[–\-\s]+|[–\-\s]+$/g, "") || "—"}</span>
              </div>
              {!isOpen && (
                <p style={{ margin: "4px 0 0", fontSize: 12, color: isHighlight ? color + "99" : "#9ca3af", lineHeight: 1.4 }}>{item.kort}</p>
              )}
              {isOpen && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{item.lang}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {item.tags.map(t => <span key={t} style={{ padding: "2px 9px", borderRadius: 20, fontSize: 11,
                      background: isHighlight ? color + "15" : "#f3f4f6",
                      color: isHighlight ? color : "#6b7280",
                      border: `0.5px solid ${isHighlight ? color + "30" : "#e5e7eb"}` }}>{t}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── IMPACT PANEL ─────────────────────────────────────────────────────────────
const CASES = [
  { titel: "VIM Group — integratie 5 entiteiten", org: "PMO · 2016–2018 · Berlijn", body: "Vijf bedrijven die niet van plan waren om één te worden. 11 werkstromen, 50 FTE, 360°-programma van IT tot lanceringsevent. PMO-leiderschap, Opex/Capex-verantwoordelijkheid.", resultaat: "On time, within budget. Prince2. Eén coherent merk op de geplande datum." },
  { titel: "Merck KGaA — change management", org: "Global Head Comms · 2020–2022 · Darmstadt", body: "12 mensen die niet wilden veranderen. Twee dagen De Bono: iedereen moest ook de andere kant verdedigen. Op dag twee schreven ze zelf het implementatieplan.", resultaat: "Volledige buy-in. Kostenbesparing €100k+ structureel." },
  { titel: "Staatsloterij — van costcenter naar winstmotor", org: "Hoofd KS a.i. · 2009–2010", body: "Elk gesprek kostte 5–7 euro. Sales-as-a-Service model ingevoerd — agents verantwoordelijk voor klantbehoud en upgrades.", resultaat: "+23% opbrengst/gesprek · 60% betere retentie · 50% lagere promotiekosten" },
  { titel: "App & Web Lab — wat niet werkte", org: "Eigen venture · 2011", body: "KPI-dashboard gebouwd, Staatsloterij enthousiast als lanceringsklant. Maar één klant is geen businessmodel. Stekker eruit getrokken.", resultaat: "Geleerd: nooit lanceren met één klant. Eerder externe funding zoeken." },
];

function ImpactPanel({ ac, kennisbank }) {
  const pal = usePalette(ac);
  const [open, setOpen] = useState(null);

  // Kennisbank STAR-blokken als extra cases tonen
  const kbCases = (kennisbank || [])
    .filter(b => b.cat === "star" && b.tekst?.trim())
    .map(b => ({
      titel: b.titel || "STAR-case",
      org: "Kennisbank",
      body: b.tekst,
      resultaat: null,
      fromKB: true,
    }));

  const allCases = [...CASES, ...kbCases];
  return (
    <div style={{ padding: "16px 20px", overflowY: "auto", maxHeight: 420 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
        {[["50%", t("imp_50pct_l"), "Staatsloterij"], ["60%", t("imp_60pct_l"), "Staatsloterij"], ["€100k", t("imp_100k_l"), "Merck KGaA"], ["50 FTE", t("imp_fte_l"), "VIM Group"]].map(([n, l, c]) => (
          <div key={n} style={{ padding: "14px 16px", background: pal.whisper, borderRadius: 10, border: `0.5px solid ${pal.mid}` }}>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: pal.full, lineHeight: 1 }}>{n}</p>
            <p style={{ margin: "3px 0 2px", fontSize: 12, color: "#374151" }}>{l}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{c}</p>
          </div>
        ))}
      </div>
      {allCases.map((c, i) => (
        <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ marginBottom: 8, padding: "12px 14px", borderRadius: 10, cursor: "pointer", border: `0.5px solid ${open === i ? pal.mid : "#e5e7eb"}`, background: open === i ? pal.whisper : "#fff", transition: "all 0.15s" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#111" }}>{c.titel}</p>
                {c.fromKB && <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 10, background: pal.soft, color: pal.full, fontWeight: 700 }}>{t("impact_kb_badge")}</span>}
              </div>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>{c.org}</p>
            </div>
            <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 8 }}>{open === i ? "▲" : "▼"}</span>
          </div>
          {open === i && (
            <div style={{ marginTop: 10 }}>
              <p style={{ margin: "0 0 8px", fontSize: 13, color: "#374151", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{c.body}</p>
              {c.resultaat && (
                <div style={{ padding: "8px 12px", background: pal.soft, border: `0.5px solid ${pal.mid}`, borderRadius: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: pal.full }}>{t("impact_resultaat")}</span>
                  <span style={{ fontSize: 12, color: "#374151" }}>{c.resultaat}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── BEHEER INTRO EDITOR ──────────────────────────────────────────────────────
function BeheerIntroEditor({ introTekst, onChange, onSaveAsTemplate, ac }) {
  const [local, setLocal] = useState(introTekst || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => { setLocal(introTekst || ""); }, [introTekst]);

  const save = () => {
    onChange(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveTemplate = () => {
    onSaveAsTemplate(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: "16px 20px" }}>
      <div style={{ background: "#f0f9ff", border: "0.5px solid #bae6fd", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#0369a1", lineHeight: 1.6 }}>
          {t("beheer_intro_sub")}
        </p>
      </div>
      <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t("beheer_intro_preview")}</p>
      <div style={{ background: "#f9fafb", border: "0.5px solid #e5e7eb", borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
        <pre style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 13, lineHeight: 1.8, color: "#374151", whiteSpace: "pre-wrap" }}>{local || <span style={{ color: "#9ca3af", fontStyle: "italic" }}>Leeg</span>}</pre>
      </div>
      <textarea
        value={local}
        onChange={e => setLocal(e.target.value)}
        style={{ width: "100%", minHeight: 160, padding: "10px 12px", borderRadius: 8, border: `1px solid ${ac || "#d1d5db"}`, fontSize: 13, fontFamily: "Georgia, serif", lineHeight: 1.8, resize: "vertical", boxSizing: "border-box", color: "#374151" }}
      />
      <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={save} style={{ padding: "7px 18px", background: ac || "#111", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
          {t("beheer_intro_save")}
        </button>
        <button onClick={saveTemplate} style={{ padding: "7px 14px", background: "#fff", border: `0.5px solid ${ac || "#d1d5db"}`, borderRadius: 8, cursor: "pointer", fontSize: 12, color: ac || "#374151" }}>
          {t("beheer_intro_template")}
        </button>
        {saved && <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 700 }}>✓</span>}
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 11, color: "#9ca3af" }}>{t("beheer_intro_template_hint")}</p>
    </div>
  );
}

// ─── ANTWOORDEN EDITOR ────────────────────────────────────────────────────────
// Laat je per chip-vraag het voorgeladen antwoord beoordelen en herschrijven.
// 👍 = goedgekeurd, 👎 = vervangen door eigen versie, 🔄 = laat AI opnieuw genereren

function AntwoordenEditor({ qaOverrides, onChange, stijlgeheugen, onStijlgeheugenChange }) {
  const [open, setOpen] = useState(null);
  const [edits, setEdits] = useState(qaOverrides || {});
  const [regenerating, setRegenerating] = useState({});
  const [learning, setLearning] = useState({});
  const learnTimers = useRef({});

  const save = async (newEdits) => {
    setEdits(newEdits);
    onChange(newEdits);
    await window.storage?.set("qa-overrides", JSON.stringify(newEdits)).catch(() => {});
  };

  const setRating = (key, rating) => {
    save({ ...edits, [key]: { ...edits[key], rating } });
  };

  // Analyseer het verschil tussen oud en nieuw antwoord en update het stijlgeheugen
  const learn = async (key, origineel, nieuw, type) => {
    // type: "stijl" of "feit"
    if (!origineel || !nieuw || origineel.trim() === nieuw.trim()) return;
    setLearning(l => ({ ...l, [key]: type }));
    const systemPrompt = type === "feit"
      ? `Je analyseert hoe Arjen Vaalburg een feitelijke correctie maakt in zijn tekst. Formuleer in 1-2 zinnen wat er inhoudelijk is gecorrigeerd, als instructie voor de AI: "Onthoud dat...", "De correcte informatie is...", "Gebruik voortaan...". Geen inleiding, geen uitleg.`
      : `Je analyseert hoe Arjen Vaalburg zijn eigen teksten aanpast op schrijfstijl. Geef in maximaal 2 korte zinnen een concrete stijlobservatie. Formuleer als instructie: "Gebruik...", "Vermijd...", "Schrijf...". Geen inleiding.`;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 120,
          system: systemPrompt,
          messages: [{ role: "user", content: `ORIGINEEL:\n${origineel}\n\nANGEPAST:\n${nieuw}` }],
        }),
      });
      const d = await r.json();
      const observatie = cleanAI(d.content?.[0]?.text?.trim());
      if (observatie) {
        const ts = new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
        const nieuwGeheugen = [
          ...(stijlgeheugen || []),
          { ts, vraag: key, observatie, type },
        ].slice(-25);
        onStijlgeheugenChange(nieuwGeheugen);
        await window.storage?.set("stijlgeheugen", JSON.stringify(nieuwGeheugen)).catch(() => {});
      }
    } catch {}
    setLearning(l => ({ ...l, [key]: null }));
  };

  const setCustomAnswer = (key, tekst) => {
    save({ ...edits, [key]: { ...edits[key], customAnswer: tekst, rating: "edited" } });
  };

  const commitLearn = (key, type) => {
    const origineel = QA.find(i => i.keys[0] === key)?.a || "";
    const nieuw = edits[key]?.customAnswer || "";
    learn(key, origineel, nieuw, type);
  };

  const regenerate = async (item) => {
    const key = item.keys[0];
    setRegenerating(r => ({ ...r, [key]: true }));
    try {
      const stijlInstructie = (stijlgeheugen || []).map(s => s.observatie).join(" ");
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 180,
          system: `Je bent Arjen Vaalburg. Beantwoord de vraag in eerste persoon, gewone spreektaal, max 4 zinnen, geen bullets. Geen markdown. Toon: warm, direct, concreet. Geen afsluitende samenvattingszin.${stijlInstructie ? `\n\nGELEERDE STIJLVOORKEUR:\n${stijlInstructie}` : ""}`,
          messages: [{ role: "user", content: `Geef een antwoord op: "${item.keys[0]}"` }],
        }),
      });
      const d = await r.json();
      const nieuw = cleanAI(d.content?.[0]?.text?.trim());
      if (nieuw) save({ ...edits, [key]: { ...edits[key], customAnswer: nieuw, rating: "edited" } });
    } catch {}
    setRegenerating(r => ({ ...r, [key]: false }));
  };

  return (
    <div style={{ padding: "16px 20px", overflowY: "auto", maxHeight: 520 }}>
      <div style={{ background: "#fffbf0", border: "0.5px solid #fde68a", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#92400e", lineHeight: 1.6 }}>
          👍 Goedkeuren · 👎 Aanpassen · 🔄 Nieuwe versie genereren. Elke aanpassing die je maakt wordt geanalyseerd en toegevoegd aan het stijlgeheugen — de AI leert zo van jouw correcties.
        </p>
      </div>

      {/* Stijlgeheugen */}
      {(stijlgeheugen || []).length > 0 && (
        <div style={{ marginBottom: 14, border: "0.5px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", background: "#f9fafb", borderBottom: "0.5px solid #e5e7eb" }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Stijlgeheugen — {stijlgeheugen.length} observatie{stijlgeheugen.length !== 1 ? "s" : ""} geleerd
            </p>
          </div>
          <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
            {[...stijlgeheugen].reverse().slice(0, 5).map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 12, flexShrink: 0 }}>{s.type === "feit" ? "📌" : "🎨"}</span>
                <span style={{ fontSize: 10, color: "#9ca3af", whiteSpace: "nowrap", marginTop: 2 }}>{s.ts}</span>
                <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{s.observatie}</p>
              </div>
            ))}
            {stijlgeheugen.length > 5 && (
              <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>+ {stijlgeheugen.length - 5} oudere observaties</p>
            )}
          </div>
        </div>
      )}
      {QA.map((item, idx) => {
        const key = item.keys[0];
        const override = edits[key] || {};
        const isOpen = open === key;
        const displayAnswer = override.customAnswer || item.a;
        const rating = override.rating;

        return (
          <div key={key} style={{ marginBottom: 7, border: `0.5px solid ${rating === "up" ? "#bbf7d0" : rating === "down" || rating === "edited" ? "#fde68a" : "#e5e7eb"}`, borderRadius: 10, overflow: "hidden" }}>
            <div onClick={() => setOpen(isOpen ? null : key)}
              style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", background: isOpen ? "#f9fafb" : "#fff" }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#374151" }}>{item.keys[0]}</p>
                {!isOpen && <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 360 }}>{displayAnswer.slice(0, 80)}…</p>}
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center", marginLeft: 8, flexShrink: 0 }}>
                {rating === "up" && <span style={{ fontSize: 14 }}>👍</span>}
                {(rating === "down" || rating === "edited") && <span style={{ fontSize: 14 }}>✏️</span>}
                {learning[key] && <span style={{ fontSize: 10, color: "#9ca3af", fontStyle: "italic" }}>leert…</span>}
                <span style={{ fontSize: 11, color: "#9ca3af" }}>{isOpen ? "▲" : "▼"}</span>
              </div>
            </div>
            {isOpen && (
              <div style={{ padding: "12px 14px", borderTop: "0.5px solid #f3f4f6" }}>
                {/* Huidig antwoord */}
                <textarea
                  value={displayAnswer}
                  onChange={e => { setRating(key, "edited"); setCustomAnswer(key, e.target.value); }}
                  style={{ width: "100%", minHeight: 90, padding: "8px 10px", borderRadius: 7, border: "0.5px solid #d1d5db", fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.65, resize: "vertical", boxSizing: "border-box", color: "#374151" }}
                />
                {/* Acties */}
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <button onClick={() => setRating(key, "up")} style={{ padding: "5px 12px", borderRadius: 7, border: `1px solid ${rating === "up" ? "#22c55e" : "#d1d5db"}`, background: rating === "up" ? "#f0fdf4" : "#fff", cursor: "pointer", fontSize: 12, color: rating === "up" ? "#15803d" : "#6b7280" }}>
                    👍 Goed zo
                  </button>
                  <button onClick={() => regenerate(item)} disabled={!!regenerating[key]} style={{ padding: "5px 12px", borderRadius: 7, border: "0.5px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 12, color: "#6b7280" }}>
                    {regenerating[key] ? t("sg_learning") : t("sg_regen")}
                  </button>
                  {override.customAnswer && <>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>Sla op als:</span>
                    <button onClick={() => commitLearn(key, "stijl")} disabled={!!learning[key]} style={{ padding: "5px 12px", borderRadius: 7, border: "0.5px solid #bfdbfe", background: "#eff6ff", cursor: "pointer", fontSize: 12, color: "#1d4ed8" }}>
                      {learning[key] === "stijl" ? t("sg_learning") : t("sg_stijl_btn")}
                    </button>
                    <button onClick={() => commitLearn(key, "feit")} disabled={!!learning[key]} style={{ padding: "5px 12px", borderRadius: 7, border: "0.5px solid #bbf7d0", background: "#f0fdf4", cursor: "pointer", fontSize: 12, color: "#15803d" }}>
                      {learning[key] === "feit" ? t("sg_learning") : t("sg_feit_btn")}
                    </button>
                    <button onClick={() => save({ ...edits, [key]: {} })} style={{ padding: "5px 10px", borderRadius: 7, border: "0.5px solid #fca5a5", background: "#fff", cursor: "pointer", fontSize: 11, color: "#dc2626" }}>
                      ↩ Origineel
                    </button>
                  </>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── KENNISBANK ───────────────────────────────────────────────────────────────
// Blokken tekst die automatisch als context aan de AI worden meegegeven.
// Gebruik voor: nieuwe projecten, STAR-cases, CV-updates, aanvullende info.

const KB_CATEGORIES = [
  { id: "project",  label: "Lopend project",    icon: "🏗",  hint: "Beschrijf een lopende opdracht: organisatie, wat er speelt, jouw rol, wat je tot nu toe hebt gedaan." },
  { id: "star",     label: "STAR-case",          icon: "⭐",  hint: "Situatie → Taak → Actie → Resultaat. Concrete cijfers als je ze hebt." },
  { id: "cv",       label: "CV-update",          icon: "📄",  hint: "Bijgewerkte functieomschrijving, nieuwe certificering, gewijzigde beschikbaarheid, etc." },
  { id: "overig",   label: "Overige context",    icon: "💡",  hint: "Alles wat de AI moet weten maar nergens anders past." },
];

function Kennisbank({ vacatureSlug, value, onChange }) {
  const [blokken, setBlokken] = useState(value || []);
  const [openId, setOpenId] = useState(null);
  const [saved, setSaved] = useState(false);

  const save = async (newBlokken) => {
    setBlokken(newBlokken);
    onChange(newBlokken);
    await window.storage?.set("kb-global", JSON.stringify(newBlokken)).catch(() => {});
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const addBlok = (cat) => {
    const id = `kb-${Date.now()}`;
    const newBlokken = [...blokken, { id, cat, titel: "", tekst: "", aangemaakt: Date.now() }];
    save(newBlokken);
    setOpenId(id);
  };

  const updateBlok = (id, field, val) => {
    const newBlokken = blokken.map(b => b.id === id ? { ...b, [field]: val } : b);
    save(newBlokken);
  };

  const deleteBlok = (id) => {
    save(blokken.filter(b => b.id !== id));
    if (openId === id) setOpenId(null);
  };

  const catInfo = (catId) => KB_CATEGORIES.find(c => c.id === catId) || KB_CATEGORIES[3];

  return (
    <div style={{ padding: "16px 20px", overflowY: "auto", maxHeight: 500 }}>
      {/* Uitleg */}
      <div style={{ background: "#f0f9ff", border: "0.5px solid #bae6fd", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
        <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 13, color: "#0369a1" }}>Hoe werkt dit?</p>
        <p style={{ margin: 0, fontSize: 13, color: "#0369a1", lineHeight: 1.6 }}>
          Alles wat je hier toevoegt is beschikbaar voor alle sollicitaties. De AI gebruikt automatisch wat relevant is voor de vacature en laat de rest links liggen. Voeg projecten, STAR-cases of CV-updates toe — ze gelden meteen overal.
        </p>
      </div>

      {/* Blokken toevoegen */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {KB_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => addBlok(cat.id)} style={{
            padding: "6px 12px", borderRadius: 8, border: "0.5px solid #d1d5db",
            background: "#fff", cursor: "pointer", fontSize: 12, color: "#374151",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <span>{cat.icon}</span> {cat.label} toevoegen
          </button>
        ))}
      </div>

      {/* Opgeslagen blokken */}
      {blokken.length === 0 ? (
        <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", padding: "24px 0" }}>
          Nog geen kennisblokken. Voeg hierboven een project, case of update toe.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {blokken.map(blok => {
            const cat = catInfo(blok.cat);
            const isOpen = openId === blok.id;
            return (
              <div key={blok.id} style={{ border: `0.5px solid ${isOpen ? "#6b7280" : "#e5e7eb"}`, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                {/* Header */}
                <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", background: isOpen ? "#f9fafb" : "#fff" }}
                  onClick={() => setOpenId(isOpen ? null : blok.id)}>
                  <span style={{ fontSize: 14 }}>{cat.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 12, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>{cat.label}</p>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#111" }}>{blok.titel || <span style={{ color: "#9ca3af", fontStyle: "italic" }}>Geen titel</span>}</p>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{isOpen ? "▲" : "▼"}</span>
                    <button onClick={(e) => { e.stopPropagation(); deleteBlok(blok.id); }}
                      style={{ padding: "2px 8px", background: "transparent", border: "0.5px solid #fca5a5", borderRadius: 5, cursor: "pointer", fontSize: 10, color: "#dc2626" }}>
                      ✕
                    </button>
                  </div>
                </div>

                {/* Editor */}
                {isOpen && (
                  <div style={{ padding: "12px 14px", borderTop: "0.5px solid #e5e7eb" }}>
                    <p style={{ margin: "0 0 6px", fontSize: 11, color: "#9ca3af" }}>{cat.hint}</p>
                    <input
                      value={blok.titel}
                      onChange={e => updateBlok(blok.id, "titel", e.target.value)}
                      placeholder="Korte titel (bijv. 'PMO Waterschap Vallei & Veluwe' of 'STAR: Merck insourcing')"
                      style={{ width: "100%", padding: "7px 10px", borderRadius: 7, border: "0.5px solid #d1d5db", fontSize: 13, fontFamily: "sans-serif", marginBottom: 8, boxSizing: "border-box", color: "#374151" }}
                    />
                    <textarea
                      value={blok.tekst}
                      onChange={e => updateBlok(blok.id, "tekst", e.target.value)}
                      placeholder="Schrijf hier de inhoud — zo uitgebreid als nodig. De AI leest dit bij elk gesprek mee."
                      style={{ width: "100%", minHeight: 130, padding: "8px 10px", borderRadius: 7, border: "0.5px solid #d1d5db", fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.65, resize: "vertical", boxSizing: "border-box", color: "#374151" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>Automatisch opgeslagen</span>
                      {saved && <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 700 }}>✓ Opgeslagen</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── BEHEER PANEL ─────────────────────────────────────────────────────────────
function BeheerPanel({ vacature, onReset, kennisbank, onKennisbankChange, qaOverrides, onQaOverridesChange, stijlgeheugen, onStijlgeheugenChange, introTekst, onIntroChange, onSaveAsTemplate, ac }) {
  const [subTab, setSubTab] = useState("analytics");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [openSessie, setOpenSessie] = useState(null);

  useEffect(() => {
    window.storage?.get(`analytics-${vacature.slug}`)
      .then(r => setAnalyticsData(r?.value ? JSON.parse(r.value) : { sessions: [] }))
      .catch(() => setAnalyticsData({ sessions: [] }));
  }, [vacature.slug]);

  const sessions = analyticsData?.sessions || [];
  const totalQ = sessions.reduce((n, s) => n + (s.exchanges?.length || 0), 0);
  const freeQ = sessions.flatMap(s => (s.exchanges || []).filter(e => e.type === "free").map(e => e.q));
  const pdfDownloads = sessions.filter(s => s.pdfDownloaded).length;
  const tabLabels = { chat: "💬 Gesprek", loopbaan: "📍 Loopbaan", impact: "📊 Impact" };
  const tabCounts = {};
  sessions.forEach(s => (s.tabVisits || []).forEach(v => {
    if (!tabLabels[v.tab]) return;
    if (!tabCounts[v.tab]) tabCounts[v.tab] = { count: 0, totalSec: 0 };
    tabCounts[v.tab].count++;
    tabCounts[v.tab].totalSec += (v.durationSec || 0);
  }));
  const freq = {};
  freeQ.forEach(q => { freq[q] = (freq[q] || 0) + 1; });
  const topFree = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const fmt = ts => new Date(ts).toLocaleString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      <div style={{ padding: "10px 20px", background: "#fffbf0", borderBottom: "0.5px solid #fde68a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#92400e" }}>⚙️ Beheermodus — alleen zichtbaar voor jou</span>
        <button onClick={onReset} style={{ padding: "3px 10px", background: "transparent", border: "0.5px solid #d1d5db", borderRadius: 6, cursor: "pointer", fontSize: 11, color: "#6b7280" }}>← Nieuwe sollicitatie</button>
      </div>
      <div style={{ display: "flex", borderBottom: "0.5px solid #e5e7eb", background: "#fafafa" }}>
        {[["analytics", t("beheer_analytics")], ["antwoorden", t("beheer_antwoorden")], ["kennisbank", t("beheer_kennisbank")], ["intro", t("beheer_intro")], ["vacature", t("beheer_vacature")]].map(([id, lbl]) => (
          <button key={id} onClick={() => setSubTab(id)} style={{ flex: 1, padding: "9px 6px", border: "none", borderBottom: subTab === id ? "2px solid #374151" : "2px solid transparent", background: "none", cursor: "pointer", fontSize: 12, fontWeight: subTab === id ? 700 : 400, color: subTab === id ? "#111" : "#6b7280" }}>{lbl}</button>
        ))}
      </div>

      {subTab === "analytics" && (
        <div style={{ padding: "16px 20px", overflowY: "auto", maxHeight: 420 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
            {[[t("ana_sessions"), sessions.length], [t("ana_total_q"), totalQ], [t("ana_free"), freeQ.length], [t("ana_pdf"), pdfDownloads]].map(([l, v]) => (
              <div key={l} style={{ padding: "12px", background: "#f9fafb", borderRadius: 10, border: "0.5px solid #e5e7eb" }}>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111" }}>{v}</p>
                <p style={{ margin: "3px 0 0", fontSize: 11, color: "#6b7280" }}>{l}</p>
              </div>
            ))}
          </div>
          {Object.keys(tabCounts).length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase" }}>Tabbladen bekeken</p>
              <div style={{ display: "flex", gap: 8 }}>
                {Object.entries(tabCounts).map(([t, d]) => (
                  <div key={t} style={{ flex: 1, padding: "10px 12px", background: "#f9fafb", borderRadius: 8, border: "0.5px solid #e5e7eb" }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#374151" }}>{tabLabels[t]}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 11, color: "#9ca3af" }}>{d.count}× · gem. {Math.round(d.totalSec / d.count)}s</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {sessions.length === 0 ? (
            <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>Nog geen activiteit. Transcripten verschijnen hier zodra recruiters vragen stellen.</p>
          ) : (
            <>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase" }}>Sessies & transcripten</p>
              {[...sessions].reverse().map(s => {
                const isOpen = openSessie === s.id;
                return (
                  <div key={s.id} style={{ marginBottom: 8, border: `0.5px solid ${isOpen ? "#d1d5db" : "#e5e7eb"}`, borderRadius: 10, overflow: "hidden" }}>
                    <button onClick={() => setOpenSessie(isOpen ? null : s.id)} style={{ width: "100%", padding: "10px 14px", background: isOpen ? "#f9fafb" : "#fff", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", textAlign: "left" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{fmt(s.started)} <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 400 }}>· {s.exchanges?.length || 0} vragen · {s.durationMin || 0} min{s.pdfDownloaded ? " · PDF ↓" : ""}</span></span>
                      {s.tabVisits?.length > 0 && (
                        <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                          {[...new Set(s.tabVisits.map(v => v.tab))].filter(t => tabLabels[t]).map(t => (
                            <span key={t} style={{ fontSize: 10, padding: "1px 7px", borderRadius: 10, background: "#f3f4f6", color: "#6b7280" }}>{tabLabels[t]}</span>
                          ))}
                        </div>
                      )}
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && s.exchanges?.map((e, j) => (
                      <div key={j} style={{ padding: "10px 14px", borderTop: "0.5px solid #f3f4f6" }}>
                        <p style={{ margin: "0 0 2px", fontSize: 11, color: e.type === "free" ? "#7c3aed" : "#6b7280", fontWeight: 700 }}>{e.type === "free" ? "VRIJ GETYPT" : "CHIP"} · {fmt(e.ts)}</p>
                        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "#374151" }}>V: {e.q}</p>
                        <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6, paddingLeft: 10, borderLeft: "2px solid #e5e7eb" }}>A: {e.a}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
              {topFree.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase" }}>Meest vrij getypte vragen</p>
                  {topFree.map(([q, n]) => (
                    <div key={q} style={{ display: "flex", justifyContent: "space-between", padding: "7px 10px", marginBottom: 4, background: "#fff8f7", border: "0.5px solid #fde8d8", borderRadius: 8 }}>
                      <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{q}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#e8310a", marginLeft: 8 }}>{n}×</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {subTab === "antwoorden" && (
        <AntwoordenEditor qaOverrides={qaOverrides} onChange={onQaOverridesChange} stijlgeheugen={stijlgeheugen} onStijlgeheugenChange={onStijlgeheugenChange} />
      )}
      {subTab === "intro" && (
        <BeheerIntroEditor
          introTekst={introTekst}
          onChange={onIntroChange}
          onSaveAsTemplate={onSaveAsTemplate}
          ac={ac}
        />
      )}
      {subTab === "kennisbank" && (
        <Kennisbank
          vacatureSlug={vacature.slug}
          value={kennisbank}
          onChange={onKennisbankChange}
        />
      )}
      {subTab === "vacature" && (
        <div style={{ padding: "16px 20px" }}>
          <div style={{ display: "grid", gap: 10 }}>
            {[["Organisatie", vacature.bedrijf], ["Functie", vacature.functie], ["Slug", vacature.slug], ["URL", `cv.arjenvaalburg.nl/${vacature.slug}`]].map(([l, v]) => (
              <div key={l}>
                <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</p>
                <p style={{ margin: 0, fontSize: 14, color: "#374151" }}>{v}</p>
              </div>
            ))}
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>Vacaturetekst</p>
              <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{vacature.vacatureTekst || "Niet opgegeven"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HOOFDAPP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [vacature, setVacature] = useState(null);
  const [tab, setTab] = useState("chat");
  const [copied, setCopied] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  // ── URL-routing: laad vacature op basis van slug in URL ──────────────────
  useEffect(() => {
    const slug = window.location.pathname.replace(/^\//, '').trim();
    if (!slug || slug === 'index.html') return;
    try {
      const stored = localStorage.getItem(`vacature-${slug}`);
      if (stored) {
        const data = JSON.parse(stored);
        setVacature(data);
        setTab("chat");
        setRecruiterMode(true); // recruiter ziet geen beheer
      }
    } catch {}
  }, []);

  const [kennisbank, setKennisbank] = useState([]);
  const [introTekst, setIntroTekst] = useState("");
  const [introTemplate, setIntroTemplate] = useState(""); // beste intro als startpunt
  const [qaOverrides, setQaOverrides] = useState({});
  const [stijlgeheugen, setStijlgeheugen] = useState([]);

  // Laad globale kennisbank, QA-overrides en stijlgeheugen bij opstarten
  useEffect(() => {
    window.storage?.get("kb-global")
      .then(r => { if (r?.value) setKennisbank(JSON.parse(r.value)); })
      .catch(() => {});
    window.storage?.get("qa-overrides")
      .then(r => { if (r?.value) setQaOverrides(JSON.parse(r.value)); })
      .catch(() => {});
    window.storage?.get("stijlgeheugen")
      .then(r => { if (r?.value) setStijlgeheugen(JSON.parse(r.value)); })
      .catch(() => {});
    window.storage?.get("intro-template")
      .then(r => { if (r?.value) setIntroTemplate(r.value); })
      .catch(() => {});
  }, []);

  // ── Sessie-tracking ─────────────────────────────────────────────────────
  const sessionId = useRef(`s-${Date.now()}`);
  const sessionStart = useRef(Date.now());
  const tabLog = useRef([]); // [{tab, entered, left}]
  const tabStart = useRef(Date.now());
  const currentTab = useRef("chat");

  const logTabChange = (newTab) => {
    const now = Date.now();
    tabLog.current.push({
      tab: currentTab.current,
      entered: tabStart.current,
      left: now,
      durationSec: Math.round((now - tabStart.current) / 1000),
    });
    currentTab.current = newTab;
    tabStart.current = now;
  };

  const savePageView = async (slug, extra = {}) => {
    if (!slug) return;
    try {
      const key = `analytics-${slug}`;
      const existing = await window.storage?.get(key).catch(() => null);
      const data = existing?.value ? JSON.parse(existing.value) : { sessions: [] };
      const sessions = data.sessions || [];
      const idx = sessions.findIndex(s => s.id === sessionId.current);
      const session = idx >= 0 ? sessions[idx] : {
        id: sessionId.current,
        started: sessionStart.current,
        exchanges: [],
      };
      // Merge extra fields
      Object.assign(session, {
        lastActive: Date.now(),
        durationMin: Math.round((Date.now() - sessionStart.current) / 60000),
        tabVisits: tabLog.current,
        ...extra,
      });
      if (idx >= 0) sessions[idx] = session; else sessions.push(session);
      data.sessions = sessions.slice(-50);
      await window.storage?.set(key, JSON.stringify(data)).catch(() => {});
    } catch {}
  };

  const handleTabChange = (newTab) => {
    if (newTab === "beheer") { setTab(newTab); return; } // beheer niet tracken
    logTabChange(newTab);
    setTab(newTab);
    savePageView(vacature?.slug);
  };

  const handlePdfDownload = () => {
    logTabChange(currentTab.current); // flush current tab
    savePageView(vacature?.slug, { pdfDownloaded: true, pdfDownloadedAt: Date.now() });
  };

  const onSetup = (data) => {
    setVacature(data);
    setTab("chat");
    // Gebruik introTemplate als startpunt als de AI geen nieuwe heeft gegenereerd
    if (!data.introTekst || data.introTekst === DEFAULT_INTRO) {
      setIntroTekst(introTemplate || data.introTekst || DEFAULT_INTRO);
    } else {
      setIntroTekst(data.introTekst);
    }
    sessionId.current = `s-${Date.now()}`;
    sessionStart.current = Date.now();
    tabLog.current = [];
    tabStart.current = Date.now();
    currentTab.current = "chat";
    // Laad kennisbank voor deze slug
    window.storage?.get("kb-global")
      .then(r => setKennisbank(r?.value ? JSON.parse(r.value) : []))
      .catch(() => setKennisbank([]));
  };

  if (!vacature) return (
    <SetupScherm onSave={onSetup} introTemplate={introTemplate} />
  );

  const highlights = getHighlights(vacature.vacatureTekst);
  const ac = vacature.kleur || "#111111";

  const copy = () => {
    // Sla vacaturedata op zodat recruiter-URL werkt
    try { localStorage.setItem(`vacature-${vacature.slug}`, JSON.stringify(vacature)); } catch {}
    navigator.clipboard?.writeText(`https://cv.arjenvaalburg.nl/${vacature.slug}`).catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "chat", label: t("tab_chat"), icon: "💬" },
    { id: "loopbaan", label: t("tab_loopbaan"), icon: "📍" },
    { id: "impact", label: t("tab_impact"), icon: "📊" },
    ...(!recruiterMode ? [{ id: "beheer", label: t("tab_beheer"), icon: "⚙️" }] : []),
  ];

  return (
    <>
      <PrintStyles />
        <div style={{ minHeight: "100vh", background: "#f5f5f4", fontFamily: "sans-serif", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "28px 16px" }}>
      <div style={{ width: "100%", maxWidth: 660, background: "#fff", borderRadius: 16, border: "0.5px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>

        {/* Accentlijn in bedrijfskleur */}
        <div style={{ height: 4, background: ac }} />

        {/* Header */}
        <div style={{ padding: "14px 20px", borderBottom: "0.5px solid #e5e7eb", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, background: ac, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 16, fontFamily: "Arial Black, Arial, sans-serif" }}>{vacature.bedrijf[0]?.toUpperCase()}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 900, fontSize: 15, color: "#111", fontFamily: "Arial Black, Arial, sans-serif" }}>{PROFIEL.naam}</p>
            <p style={{ margin: 0, fontSize: 12, color: ac, fontWeight: 700 }}>{vacature.functie} · {vacature.bedrijf}</p>
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "right", lineHeight: 1.7 }}>
            <div>{PROFIEL.telefoon}</div>
            <div>{PROFIEL.email}</div>
          </div>
        </div>

        {/* Download/link balk */}
        <div className="no-print" style={{ padding: "9px 20px", background: "#f9fafb", borderBottom: "0.5px solid #e5e7eb", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, color: "#9ca3af", flex: 1, fontFamily: "monospace" }}>cv.arjenvaalburg.nl/{vacature.slug}</span>
          {!recruiterMode && (
            <button onClick={copy} style={{ padding: "5px 11px", background: "transparent", border: "0.5px solid #d1d5db", borderRadius: 7, cursor: "pointer", fontSize: 11, color: "#6b7280" }}>
              {copied ? t("btn_copied") : t("btn_copy")}
            </button>
          )}
          <button onClick={() => window.print()} style={{ padding: "5px 13px", background: ac, color: "#fff", borderRadius: 7, fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer" }}>{t("btn_pdf")}</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "0.5px solid #e5e7eb" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => handleTabChange(t.id)} style={{ flex: 1, padding: "11px 4px", border: "none", borderBottom: tab === t.id ? `3px solid ${t.id === "beheer" ? "#374151" : ac}` : "3px solid transparent", background: "none", cursor: "pointer", fontSize: 12, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? "#111" : "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ minHeight: 360 }}>
          {tab === "chat" && (
            <div>
              {/* Introductietekst */}
              {introTekst && (
                <div style={{ padding: "14px 20px", borderBottom: "0.5px solid #e5e7eb", background: "#f9fafb" }}>
                  <pre style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 13, lineHeight: 1.8, color: "#374151", whiteSpace: "pre-wrap" }}>{introTekst}</pre>
                </div>
              )}
              <ChatPanel chips={DEFAULT_CHIPS} vacatureTekst={vacature.vacatureTekst} vacatureSlug={vacature.slug} ac={ac} isFreelance={vacature.isFreelance !== false} kennisbank={kennisbank} qaOverrides={qaOverrides} stijlgeheugen={stijlgeheugen} />
            </div>
          )}
          {tab === "loopbaan" && <LoopbaanPanel highlights={highlights} ac={ac} />}
          {tab === "impact" && <ImpactPanel ac={ac} kennisbank={kennisbank} />}
          {tab === "beheer" && <BeheerPanel vacature={vacature} onReset={() => setVacature(null)} kennisbank={kennisbank} onKennisbankChange={setKennisbank} qaOverrides={qaOverrides} onQaOverridesChange={setQaOverrides} stijlgeheugen={stijlgeheugen} onStijlgeheugenChange={setStijlgeheugen} introTekst={introTekst} onIntroChange={setIntroTekst} onSaveAsTemplate={(tekst) => { setIntroTemplate(tekst); window.storage?.set("intro-template", tekst).catch(() => {}); }} ac={ac} />}
        </div>

        <div style={{ padding: "8px 20px", borderTop: "0.5px solid #e5e7eb", background: "#f9fafb", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{t("footer_left")}</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>{t("footer_right")}</span>
        </div>
      </div>
    </div>
    </>
  );
}
