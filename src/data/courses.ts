/* ═══════════════════════════════════════════════════
   Chresta · Course Catalogue
   Single source of truth for all course data.
═══════════════════════════════════════════════════ */

export interface Session {
  id: string
  weekday: string    // 'Samstag'
  dateLabel: string  // 'Sa 06. Dez 2025'
  time: string       // '16:30 – 19:30'
  instructor: string
  initials: string
  location: string
  totalSeats: number
  seats: number | null  // null = ausgebucht
  price: string
}

export interface RelatedCourse {
  slug: string
  name: string
  icon: string
  relation: 'required' | 'recommended' | 'next'
}

export interface CourseData {
  slug: string
  name: string
  shortName: string
  category: string
  categorySlug: string
  icon: string
  color: string        // brand gradient start color
  heroImg: string
  tagline: string
  description: string
  duration: string
  level: 'Einsteiger' | 'Fortgeschrittene' | 'Alle Stufen'
  language: string
  certificate: boolean
  certificateLabel?: string
  maxParticipants: number
  price: string
  priceNote: string
  whatYouLearn: string[]
  contents: { title: string; topics: string[] }[]
  prerequisites: RelatedCourse[]
  nextSteps: RelatedCourse[]
  sessions: Session[]
}

const COURSES: Record<string, CourseData> = {

  'nothelfer-1': {
    slug: 'nothelfer-1',
    name: 'Nothelfer-Kurs Teil 1',
    shortName: 'Nothelfer 1',
    category: 'Fahrschule',
    categorySlug: 'fahrschule',
    icon: '🩺',
    color: '#087283',
    heroImg: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=1400&auto=format&fit=crop&q=85',
    tagline: 'Erste Hilfe – Grundlagen für angehende Fahrerinnen und Fahrer',
    description: 'Der Nothelfer-Kurs Teil 1 ist die gesetzlich vorgeschriebene Grundausbildung in Erster Hilfe für alle, die den Führerschein erwerben möchten. In diesem Kurs lernst du, in Notsituationen ruhig und kompetent zu handeln – und kannst so Leben retten.',
    duration: '3 Stunden',
    level: 'Einsteiger',
    language: 'Deutsch',
    certificate: true,
    certificateLabel: 'asa-Zertifikat',
    maxParticipants: 8,
    price: 'CHF 25.00',
    priceNote: 'inkl. Kursunterlagen & Zertifikat',
    whatYouLearn: [
      'Notruf absetzen – die 5 W-Fragen richtig anwenden',
      'Bewusstlose Person in stabile Seitenlage bringen',
      'Blutungen erkennen und stillen',
      'Absichern einer Unfallstelle im Strassenverkehr',
      'Ruhiges und strukturiertes Handeln unter Stress',
    ],
    contents: [
      {
        title: 'Grundlagen der Ersten Hilfe',
        topics: [
          'Bedeutung von Erster Hilfe im Strassenverkehr',
          'Rechtliche Grundlagen und Hilfspflicht',
          'Die richtige Reihenfolge am Unfallort (ABCDE-Schema)',
        ],
      },
      {
        title: 'Notruf & Absicherung',
        topics: [
          'Notruf 144 – wann und wie anrufen',
          'Unfallstelle absichern mit Warndreieck',
          'Kommunikation mit Einsatzkräften',
        ],
      },
      {
        title: 'Praktische Massnahmen',
        topics: [
          'Stabile Seitenlage – Schritt für Schritt',
          'Bewusstsein & Atmung prüfen',
          'Umgang mit Verletzten im Fahrzeug',
        ],
      },
      {
        title: 'Blutstillung & Wundversorgung',
        topics: [
          'Stark blutende Wunden versorgen',
          'Druckverband anlegen',
          'Schockzeichen erkennen',
        ],
      },
    ],
    prerequisites: [],
    nextSteps: [
      { slug: 'nothelfer-2', name: 'Nothelfer-Kurs Teil 2', icon: '🩺', relation: 'next' },
      { slug: 'bls-aed', name: 'BLS-AED-SRC Komplettkurs', icon: '❤️', relation: 'next' },
    ],
    sessions: [
      { id: 's1', weekday: 'Samstag', dateLabel: 'Sa 06. Dez 2025', time: '16:30 – 19:30', instructor: 'Marco Chresta', initials: 'MC', location: 'Schulungsraum A, Affoltern', totalSeats: 8, seats: 5, price: 'CHF 25.00' },
      { id: 's2', weekday: 'Freitag',  dateLabel: 'Fr 12. Dez 2025', time: '09:00 – 12:00', instructor: 'Laura Müller',  initials: 'LM', location: 'Schulungsraum A, Affoltern', totalSeats: 8, seats: 5, price: 'CHF 25.00' },
      { id: 's3', weekday: 'Samstag', dateLabel: 'Sa 10. Jan 2026',  time: '14:00 – 17:00', instructor: 'Marco Chresta', initials: 'MC', location: 'Schulungsraum B, Affoltern', totalSeats: 8, seats: null, price: 'CHF 25.00' },
      { id: 's4', weekday: 'Dienstag', dateLabel: 'Di 20. Jan 2026',  time: '18:00 – 21:00', instructor: 'Laura Müller',  initials: 'LM', location: 'Schulungsraum A, Affoltern', totalSeats: 8, seats: 7, price: 'CHF 25.00' },
    ],
  },

  'nothelfer-2': {
    slug: 'nothelfer-2',
    name: 'Nothelfer-Kurs Teil 2',
    shortName: 'Nothelfer 2',
    category: 'Fahrschule',
    categorySlug: 'fahrschule',
    icon: '🩺',
    color: '#087283',
    heroImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop&q=85',
    tagline: 'Reanimation & Erweiterte Lebensrettende Massnahmen',
    description: 'Aufbauend auf Teil 1 vertiefst du im Nothelfer-Kurs Teil 2 die Techniken der Herz-Lungen-Wiederbelebung und lernst den korrekten Umgang mit dem Defibrillator (AED). Ein Pflichtbestandteil für den Führerscheinerwerb in der Schweiz.',
    duration: '8 Stunden',
    level: 'Einsteiger',
    language: 'Deutsch',
    certificate: true,
    certificateLabel: 'asa-Zertifikat (Vollabschluss)',
    maxParticipants: 8,
    price: 'CHF 115.00',
    priceNote: 'inkl. Kursunterlagen, Übungsmaterial & Zertifikat',
    whatYouLearn: [
      'Herz-Lungen-Wiederbelebung (30:2 Rhythmus) korrekt durchführen',
      'AED bedienen – sicher und ohne Vorkenntnisse',
      'Teamreanimation koordinieren',
      'Atemwege freimachen und sichern',
      'Komplikationen erkennen und handeln',
    ],
    contents: [
      {
        title: 'Wiederholung & Vertiefung Teil 1',
        topics: ['Kurze Repetition Notfallsystem', 'Stabile Seitenlage Praxis-Übung', 'Häufige Fehler und Korrekturen'],
      },
      {
        title: 'Herzstillstand erkennen',
        topics: ['Bewusstlosigkeit + keine normale Atmung = Herzstillstand', 'Reaktionszeit und Überlebensvorteil', 'Chain of Survival (Überlebenskette)'],
      },
      {
        title: 'CPR – Herz-Lungen-Wiederbelebung',
        topics: ['Herzdruckmassage – Technik, Position, Tiefe', 'Mund-zu-Mund / Mund-zu-Nase Beatmung', '30:2 Rhythmus am Übungspuppen üben', 'Wann aufhören? – Entscheidungskriterien'],
      },
      {
        title: 'AED – Defibrillator',
        topics: ['Funktion und Wirkungsweise', 'Elektroden richtig platzieren', 'Sicherheit beim Schock', 'AED-Standorte in der Region'],
      },
      {
        title: 'Teamreanimation (Gruppenübung)',
        topics: ['Rollenverteilung im Team', 'Kommunikation unter Stress', 'Übergabe an Rettungskräfte'],
      },
    ],
    prerequisites: [
      { slug: 'nothelfer-1', name: 'Nothelfer-Kurs Teil 1', icon: '🩺', relation: 'required' },
    ],
    nextSteps: [
      { slug: 'bls-aed', name: 'BLS-AED-SRC Komplettkurs', icon: '❤️', relation: 'next' },
      { slug: 'erste-hilfe-refresher', name: 'Erste-Hilfe Refresher', icon: '🔄', relation: 'next' },
    ],
    sessions: [
      { id: 's1', weekday: 'Samstag', dateLabel: 'Sa 13. Dez 2025', time: '09:00 – 17:00', instructor: 'Marco Chresta', initials: 'MC', location: 'Schulungsraum A, Affoltern', totalSeats: 8, seats: 6, price: 'CHF 115.00' },
      { id: 's2', weekday: 'Samstag', dateLabel: 'Sa 17. Jan 2026',  time: '09:00 – 17:00', instructor: 'Laura Müller',  initials: 'LM', location: 'Schulungsraum A, Affoltern', totalSeats: 8, seats: 2, price: 'CHF 115.00' },
      { id: 's3', weekday: 'Samstag', dateLabel: 'Sa 14. Feb 2026',  time: '09:00 – 17:00', instructor: 'Marco Chresta', initials: 'MC', location: 'Schulungsraum B, Affoltern', totalSeats: 8, seats: null, price: 'CHF 115.00' },
    ],
  },

  'bls-aed': {
    slug: 'bls-aed',
    name: 'BLS-AED-SRC Komplettkurs',
    shortName: 'BLS-AED',
    category: 'Fahrschule',
    categorySlug: 'fahrschule',
    icon: '❤️',
    color: '#C62828',
    heroImg: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1400&auto=format&fit=crop&q=85',
    tagline: 'Swiss Resuscitation Council zertifizierter Lebensretter-Kurs',
    description: 'Der BLS-AED-SRC Kurs ist der umfassendste Erste-Hilfe-Kurs im Bereich Reanimation und ersetzt die Nothelfer-Kurse Teil 1 & 2 vollständig. Nach Abschluss erhältst du das international anerkannte SRC-Zertifikat.',
    duration: '4.5 Stunden',
    level: 'Alle Stufen',
    language: 'Deutsch / Englisch',
    certificate: true,
    certificateLabel: 'SRC-Zertifikat (Swiss Resuscitation Council)',
    maxParticipants: 8,
    price: 'CHF 165.00',
    priceNote: 'inkl. SRC-Zertifikat & Kursunterlagen',
    whatYouLearn: [
      'BLS (Basic Life Support) komplett beherrschen',
      'AED sicher und korrekt einsetzen',
      'Kinderreanimation – Besonderheiten',
      'Fremdkörperverlegung der Atemwege befreien',
      'Internationales SRC-Zertifikat erhalten',
    ],
    contents: [
      { title: 'Basic Life Support (BLS)', topics: ['Bewusstsein, Atmung, Puls prüfen', 'CPR – Herzdruckmassage und Beatmung', 'Kindreanimation'] },
      { title: 'AED – Automatischer Defibrillator', topics: ['Gerätetypen und Unterschiede', 'Elektroden-Platzierung und Sicherheit', 'Schockabgabe im Team'] },
      { title: 'Atemwegsmanagement', topics: ['Atemwege öffnen und freihalten', 'Fremdkörper entfernen (Heimlich)', 'Aspirationsgefahr erkennen'] },
      { title: 'Spezialfälle', topics: ['Schwangere reanimieren', 'Traumatisierter Patient', 'Hypothermie und Ertrinken'] },
    ],
    prerequisites: [],
    nextSteps: [
      { slug: 'erste-hilfe-refresher', name: 'Erste-Hilfe Refresher', icon: '🔄', relation: 'next' },
    ],
    sessions: [
      { id: 's1', weekday: 'Dienstag', dateLabel: 'Di 16. Dez 2025', time: '08:00 – 12:30', instructor: 'Marco Chresta', initials: 'MC', location: 'Schulungsraum A, Affoltern', totalSeats: 8, seats: 6, price: 'CHF 165.00' },
      { id: 's2', weekday: 'Samstag',  dateLabel: 'Sa 24. Jan 2026',  time: '08:00 – 12:30', instructor: 'Laura Müller',  initials: 'LM', location: 'Schulungsraum B, Affoltern', totalSeats: 8, seats: 1, price: 'CHF 165.00' },
      { id: 's3', weekday: 'Dienstag', dateLabel: 'Di 17. Feb 2026',  time: '08:00 – 12:30', instructor: 'Marco Chresta', initials: 'MC', location: 'Schulungsraum A, Affoltern', totalSeats: 8, seats: 8, price: 'CHF 165.00' },
    ],
  },

  'erste-hilfe-refresher': {
    slug: 'erste-hilfe-refresher',
    name: 'Erste-Hilfe Refresher',
    shortName: 'EH Refresher',
    category: 'Fahrschule',
    categorySlug: 'fahrschule',
    icon: '🔄',
    color: '#087283',
    heroImg: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=1400&auto=format&fit=crop&q=85',
    tagline: 'Kenntnisse auffrischen – bereit bleiben',
    description: 'Erste-Hilfe-Kenntnisse verblassen mit der Zeit. Der Refresher-Kurs bringt dich in 4 Stunden wieder auf den neuesten Stand – ideal für alle, deren Kurs bereits 2+ Jahre zurückliegt.',
    duration: '4 Stunden',
    level: 'Alle Stufen',
    language: 'Deutsch',
    certificate: false,
    maxParticipants: 8,
    price: 'CHF 155.00',
    priceNote: 'inkl. Auffrischungsmaterial',
    whatYouLearn: [
      'Aktuellen Stand der Reanimationsrichtlinien kennen',
      'CPR und AED-Handhabung praxisnah wiederholen',
      'Neue Erkenntnisse und geänderte Empfehlungen verstehen',
      'Eigene Unsicherheiten gezielt ansprechen',
    ],
    contents: [
      { title: 'Was hat sich geändert?', topics: ['Neue SRC-Richtlinien', 'Erkenntnisse aus der Forschung', 'Häufige Fehler in der Praxis'] },
      { title: 'CPR-Praxis', topics: ['Herzdruckmassage am Feedback-Gerät', '30:2 Rhythmus optimieren', 'Teamreanimation üben'] },
      { title: 'AED-Praxis', topics: ['Gerät anlegen und bedienen', 'Sicherheitsprotokoll im Team', 'Offene Fragen beantworten'] },
    ],
    prerequisites: [
      { slug: 'nothelfer-2', name: 'Nothelfer-Kurs Teil 2', icon: '🩺', relation: 'recommended' },
      { slug: 'bls-aed', name: 'BLS-AED-SRC Komplettkurs', icon: '❤️', relation: 'recommended' },
    ],
    nextSteps: [],
    sessions: [
      { id: 's1', weekday: 'Donnerstag', dateLabel: 'Do 18. Dez 2025', time: '08:00 – 12:00', instructor: 'Marco Chresta', initials: 'MC', location: 'Schulungsraum A, Affoltern', totalSeats: 8, seats: null, price: 'CHF 155.00' },
      { id: 's2', weekday: 'Samstag',    dateLabel: 'Sa 31. Jan 2026',  time: '08:00 – 12:00', instructor: 'Laura Müller',  initials: 'LM', location: 'Schulungsraum B, Affoltern', totalSeats: 8, seats: 4, price: 'CHF 155.00' },
    ],
  },

  'pgs1-motorrad': {
    slug: 'pgs1-motorrad',
    name: 'PGS 1 Motorrad Grundkurs',
    shortName: 'PGS 1',
    category: 'Fahrschule',
    categorySlug: 'fahrschule',
    icon: '🏍',
    color: '#1A202C',
    heroImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&auto=format&fit=crop&q=85',
    tagline: 'Dein erster Schritt zur Motorrad-Freiheit',
    description: 'Der Motorrad-Grundkurs PGS 1 ist Pflicht für alle angehenden Motorradfahrerinnen und -fahrer. In einem sicheren Umfeld auf dem Trainingsgelände lernst du die Grundlagen der Fahrtechnik und das Motorrad sicher zu beherrschen.',
    duration: '9 Stunden (ganzer Tag)',
    level: 'Einsteiger',
    language: 'Deutsch',
    certificate: true,
    certificateLabel: 'PGS-1-Kursabschluss (Pflicht für Fahrausbildung)',
    maxParticipants: 6,
    price: 'CHF 290.00',
    priceNote: 'inkl. Leihschutzausrüstung auf Anfrage',
    whatYouLearn: [
      'Motorrad schieben, aufstellen und sichern',
      'Anfahren, Anhalten und Wenden auf engem Raum',
      'Bremsen in Notbremssituationen',
      'Kurvenfahren in der Übungsanlage',
      'Blickführung und Gleichgewicht auf dem Motorrad',
    ],
    contents: [
      { title: 'Fahrzeugkunde & Vorbereitung', topics: ['Motorrad-Typen und Unterschiede', 'Cockpit und Bedienelemente', 'Sicherheitsausrüstung – Helm, Handschuhe, Jacke'] },
      { title: 'Gleichgewicht & Langsamfahren', topics: ['Motorrad führen zu Fuss', 'Anfahren im Schritttempo', 'Slalom und Wendegasse'] },
      { title: 'Bremsen', topics: ['Bremsen mit Vorder- und Hinterrad', 'Notbremsung aus 30 km/h', 'ABS-Einsatz verstehen'] },
      { title: 'Kurventechnik Grundlagen', topics: ['Blick in die Kurve', 'Neigung und Gleichgewicht', 'Übungen auf dem Trainingsgelände'] },
    ],
    prerequisites: [
      { slug: 'schnupperkurs-motorrad', name: 'Schnupperkurs Motorrad', icon: '🏍', relation: 'recommended' },
    ],
    nextSteps: [
      { slug: 'kurventraining', name: 'Kurventraining Fortgeschrittene', icon: '🏁', relation: 'next' },
    ],
    sessions: [
      { id: 's1', weekday: 'Samstag', dateLabel: 'Sa 25. Jan 2026', time: '08:00 – 17:00', instructor: 'Reto Baumann', initials: 'RB', location: 'Trainingsgelände Affoltern', totalSeats: 6, seats: 2, price: 'CHF 290.00' },
      { id: 's2', weekday: 'Samstag', dateLabel: 'Sa 28. Feb 2026',  time: '08:00 – 17:00', instructor: 'Marco Chresta', initials: 'MC', location: 'Trainingsgelände Affoltern', totalSeats: 6, seats: 6, price: 'CHF 290.00' },
      { id: 's3', weekday: 'Sonntag', dateLabel: 'So 15. Mär 2026',  time: '08:00 – 17:00', instructor: 'Reto Baumann', initials: 'RB', location: 'Trainingsgelände Affoltern', totalSeats: 6, seats: null, price: 'CHF 290.00' },
    ],
  },

  'schnupperkurs-motorrad': {
    slug: 'schnupperkurs-motorrad',
    name: 'Schnupperkurs Motorrad',
    shortName: 'Schnupperkurs',
    category: 'Fahrschule',
    categorySlug: 'fahrschule',
    icon: '🏍',
    color: '#1A202C',
    heroImg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&auto=format&fit=crop&q=85',
    tagline: 'Motorrad – ist das was für mich?',
    description: 'Noch unsicher ob Motorradfahren das Richtige für dich ist? Im Schnupperkurs kannst du ohne Risiko und ohne Führerschein das Motorrad kennenlernen – auf unserem Privatgelände, sicher und professionell begleitet.',
    duration: '3 Stunden',
    level: 'Einsteiger',
    language: 'Deutsch',
    certificate: false,
    maxParticipants: 6,
    price: 'CHF 80.00',
    priceNote: 'Schutzausrüstung wird gestellt',
    whatYouLearn: [
      'Motorrad kennenlernen – Bedienelemente und Cockpit',
      'Erstes Anfahren und Anhalten',
      'Einfache Fahrübungen auf dem Privatgelände',
      'Gespräch mit dem Fahrlehrer über weitere Ausbildungsschritte',
    ],
    contents: [
      { title: 'Begrüssung & Theorie (20 Min)', topics: ['Vorstellung Ablauf', 'Motorrad-Typen', 'Schutzausrüstung anlegen'] },
      { title: 'Praxis auf dem Gelände (2 Std)', topics: ['Motorrad bewegen', 'Anfahren & Anhalten', 'Erste Kurven'] },
      { title: 'Auswertung & Beratung (40 Min)', topics: ['Feedback vom Instruktor', 'Ausbildungsschritte besprechen', 'Fragen beantworten'] },
    ],
    prerequisites: [],
    nextSteps: [
      { slug: 'pgs1-motorrad', name: 'PGS 1 Motorrad Grundkurs', icon: '🏍', relation: 'next' },
    ],
    sessions: [
      { id: 's1', weekday: 'Samstag', dateLabel: 'Sa 18. Jan 2026', time: '09:00 – 12:00', instructor: 'Reto Baumann', initials: 'RB', location: 'Trainingsgelände Affoltern', totalSeats: 6, seats: 6, price: 'CHF 80.00' },
      { id: 's2', weekday: 'Samstag', dateLabel: 'Sa 07. Feb 2026',  time: '09:00 – 12:00', instructor: 'Marco Chresta', initials: 'MC', location: 'Trainingsgelände Affoltern', totalSeats: 6, seats: 4, price: 'CHF 80.00' },
    ],
  },

  'kurventraining': {
    slug: 'kurventraining',
    name: 'Kurventraining Fortgeschrittene',
    shortName: 'Kurventraining',
    category: 'Fahrschule',
    categorySlug: 'fahrschule',
    icon: '🏁',
    color: '#242958',
    heroImg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&auto=format&fit=crop&q=85',
    tagline: 'Fahrtechnik auf das nächste Level heben',
    description: 'Das Kurventraining für Fortgeschrittene richtet sich an Motorradfahrerinnen und -fahrer, die ihre Technik verfeinern und sicherer in Kurven werden wollen. Auf einer abgesperrten Strecke trainierst du unter professioneller Anleitung.',
    duration: '9 Stunden (ganzer Tag)',
    level: 'Fortgeschrittene',
    language: 'Deutsch',
    certificate: false,
    maxParticipants: 6,
    price: 'CHF 340.00',
    priceNote: 'inkl. Streckenbenutzung & Coaching',
    whatYouLearn: [
      'Ideallinie in Kurven finden und halten',
      'Bremspunkt und Kurveneinfahrt optimieren',
      'Körperhaltung und Gewichtsverlagerung',
      'Blickführung in schnellen Kurven',
      'Gefährliche Fahrsituationen meistern',
    ],
    contents: [
      { title: 'Theorie-Briefing (1 Std)', topics: ['Physik der Kurvenfahrt', 'Kraftschluss und Haftgrenze', 'Videobesprechung typischer Fehler'] },
      { title: 'Übungseinheiten auf der Strecke', topics: ['Slalom und Pylonengasse', 'Kurvenkombinationen', 'Bremspunkttraining', 'Video-Feedback nach jeder Runde'] },
      { title: 'Abschluss-Coaching', topics: ['Persönliches Feedback', 'Zielsetzung für weitere Entwicklung', 'Empfehlungen für Touren & Sicherheit'] },
    ],
    prerequisites: [
      { slug: 'pgs1-motorrad', name: 'PGS 1 Motorrad Grundkurs', icon: '🏍', relation: 'required' },
    ],
    nextSteps: [],
    sessions: [
      { id: 's1', weekday: 'Sonntag', dateLabel: 'So 22. Mär 2026', time: '08:00 – 17:00', instructor: 'Reto Baumann', initials: 'RB', location: 'Rundstrecke Hemberg', totalSeats: 6, seats: null, price: 'CHF 340.00' },
      { id: 's2', weekday: 'Sonntag', dateLabel: 'So 19. Apr 2026',  time: '08:00 – 17:00', instructor: 'Reto Baumann', initials: 'RB', location: 'Rundstrecke Hemberg', totalSeats: 6, seats: 5, price: 'CHF 340.00' },
    ],
  },

  'czv-modul-1': {
    slug: 'czv-modul-1',
    name: 'CZV Modul 1 – Gefahrenlehre',
    shortName: 'CZV Modul 1',
    category: 'Chauffeur',
    categorySlug: 'chauffeur',
    icon: '🚛',
    color: '#1a2a4a',
    heroImg: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&auto=format&fit=crop&q=85',
    tagline: 'Berufliche Weiterbildung für professionelle Chauffeure',
    description: 'Das CZV-Modul 1 ist ein Pflichtmodul der beruflichen Weiterbildung für Lastwagenfahrer (Kat. C/CE). Es vermittelt vertiefte Kenntnisse in der Gefahrenlehre und hilft, kritische Situationen im Strassenverkehr frühzeitig zu erkennen.',
    duration: '9 Stunden (ganzer Tag)',
    level: 'Fortgeschrittene',
    language: 'Deutsch',
    certificate: true,
    certificateLabel: 'asa CZV-Kreditpunkte (7 Stunden)',
    maxParticipants: 16,
    price: 'CHF 380.00',
    priceNote: 'inkl. Kursunterlagen & asa-Zertifikat',
    whatYouLearn: [
      'Gefahren im Strassenverkehr frühzeitig erkennen',
      'Reaktionszeiten und Bremswege berechnen',
      'Risikobewusstsein schärfen',
      'Defensive Fahrweise im Berufsalltag anwenden',
      'Rechtliche Pflichten im Güterverkehr kennen',
    ],
    contents: [
      { title: 'Grundlagen der Gefahrenlehre', topics: ['Wahrnehmung und Reaktion', 'Sichtweiten und Sichtfelder', 'Gefahrenpotenziale im Stadtverkehr'] },
      { title: 'Geschwindigkeit & Bremsen', topics: ['Bremswegberechnung', 'Einfluss von Ladung auf Bremsweg', 'Sicherheitsabstand berechnen'] },
      { title: 'Risikomanagement', topics: ['Risikobeurteilung im Berufsalltag', 'Stress und Müdigkeit am Steuer', 'Defensive Fahrweise'] },
      { title: 'Rechtliche Grundlagen', topics: ['Verkehrsregeln für Lastwagen', 'Haftung bei Unfällen', 'Alkohol, Drogen und Medikamente'] },
    ],
    prerequisites: [],
    nextSteps: [
      { slug: 'czv-modul-2', name: 'CZV Modul 2 – Ladungssicherung', icon: '🚛', relation: 'next' },
      { slug: 'czv-vollkurs', name: 'CZV Vollkurs (5 Tage)', icon: '🎓', relation: 'next' },
    ],
    sessions: [
      { id: 's1', weekday: 'Montag',    dateLabel: 'Mo 09. Dez 2025', time: '08:00 – 17:00', instructor: 'Peter Keller', initials: 'PK', location: 'Schulungsraum Gross, Affoltern', totalSeats: 16, seats: 8,  price: 'CHF 380.00' },
      { id: 's2', weekday: 'Montag',    dateLabel: 'Mo 19. Jan 2026',  time: '08:00 – 17:00', instructor: 'Peter Keller', initials: 'PK', location: 'Schulungsraum Gross, Affoltern', totalSeats: 16, seats: 14, price: 'CHF 380.00' },
      { id: 's3', weekday: 'Mittwoch',  dateLabel: 'Mi 11. Feb 2026',  time: '08:00 – 17:00', instructor: 'Silvia Berger', initials: 'SB', location: 'Schulungsraum Gross, Affoltern', totalSeats: 16, seats: 16, price: 'CHF 380.00' },
    ],
  },
}

/** Look up a course by slug — returns undefined if not found */
export function getCourse(slug: string): CourseData | undefined {
  return COURSES[slug]
}

/** All courses as an array */
export function getAllCourses(): CourseData[] {
  return Object.values(COURSES)
}

/** Derive a URL-safe slug from a course name (fallback for legacy data) */
export function nameToSlug(name: string): string {
  const map: Record<string, string> = {
    'Nothelfer-Kurs Teil 1':             'nothelfer-1',
    'Nothelfer-Kurs Teil 2':             'nothelfer-2',
    'BLS-AED-SRC Komplettkurs':          'bls-aed',
    'Erste-Hilfe Refresher':             'erste-hilfe-refresher',
    'PGS 1 Motorrad Grundkurs':          'pgs1-motorrad',
    'Schnupperkurs Motorrad':            'schnupperkurs-motorrad',
    'Kurventraining Fortgeschrittene':   'kurventraining',
    'CZV Module 1 – Gefahrenlehre':      'czv-modul-1',
    'CZV Module 2 – Ladungssicherung':   'czv-modul-2',
    'CZV Vollkurs (5 Tage)':             'czv-vollkurs',
  }
  return map[name] ?? name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export default COURSES
