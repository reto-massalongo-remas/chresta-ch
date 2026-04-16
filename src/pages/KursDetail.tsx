import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'
import { getCourse, type CourseData, type Session, type RelatedCourse } from '../data/courses'
import styles from './KursDetail.module.css'

/* ── ACCORDION ITEM ───────────────────────────── */
function AccordionItem({ title, topics, index }: { title: string; topics: string[]; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className={`${styles.accordion} ${open ? styles.accordionOpen : ''}`}>
      <button className={styles.accordionTrigger} onClick={() => setOpen(v => !v)}>
        <span className={styles.accordionNum}>0{index + 1}</span>
        <span className={styles.accordionTitle}>{title}</span>
        <span className={`${styles.accordionChev} ${open ? styles.accordionChevOpen : ''}`}>›</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.accordionBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <ul className={styles.topicList}>
              {topics.map(t => (
                <li key={t} className={styles.topicItem}>
                  <span className={styles.topicDot} />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── SESSION CARD ─────────────────────────────── */
function SessionCard({
  session, selected, onSelect,
}: { session: Session; selected: boolean; onSelect: () => void }) {
  const full = session.seats === null || session.seats === 0
  const low  = session.seats !== null && session.seats <= 2
  const pct  = full ? 100 : session.seats !== null
    ? Math.round(((session.totalSeats - session.seats) / session.totalSeats) * 100)
    : 100

  return (
    <button
      className={`${styles.sessionCard} ${selected ? styles.sessionSelected : ''} ${full ? styles.sessionFull : ''}`}
      onClick={() => !full && onSelect()}
      disabled={full}
      type="button"
    >
      <div className={styles.sessionTop}>
        <div>
          <div className={styles.sessionWeekday}>{session.weekday}</div>
          <div className={styles.sessionDate}>{session.dateLabel}</div>
        </div>
        {selected && !full && (
          <motion.div
            className={styles.sessionCheck}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >✓</motion.div>
        )}
        {full && <span className={styles.sessionFullBadge}>ausgebucht</span>}
      </div>

      <div className={styles.sessionMeta}>
        <span className={styles.sessionTime}>🕐 {session.time}</span>
        <span className={styles.sessionPrice}>{session.price}</span>
      </div>

      <div className={styles.sessionInstructor}>
        <div className={styles.instructorAvatar}>{session.initials}</div>
        <div>
          <div className={styles.instructorName}>{session.instructor}</div>
          <div className={styles.instructorLocation}>{session.location}</div>
        </div>
      </div>

      {!full && (
        <div className={styles.seatsBar}>
          <div className={styles.seatsTrack}>
            <motion.div
              className={`${styles.seatsFill} ${low ? styles.seatsFillLow : ''}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <span className={`${styles.seatsLabel} ${low ? styles.seatsLabelLow : ''}`}>
            {low ? `⚠ nur noch ${session.seats} Plätze` : `${session.seats} von ${session.totalSeats} Plätzen frei`}
          </span>
        </div>
      )}
    </button>
  )
}

/* ── DEPENDENCY CHAIN ─────────────────────────── */
function DependencyChain({ course }: { course: CourseData }) {
  const hasDeps = course.prerequisites.length > 0
  const hasNext = course.nextSteps.length > 0
  if (!hasDeps && !hasNext) return null

  return (
    <FadeIn>
      <div className={styles.depSection}>
        <p className="section-eyebrow">Ausbildungsweg</p>
        <h3 className={styles.depTitle}>Wie passt dieser Kurs in deine Ausbildung?</h3>

        <div className={styles.depChain}>
          {/* Prerequisites */}
          {course.prerequisites.map((dep, i) => (
            <div key={dep.slug} className={styles.depGroup}>
              <DepPill course={dep} type="pre" />
              {i < course.prerequisites.length - 1 && <span className={styles.depOr}>oder</span>}
            </div>
          ))}

          {hasDeps && <div className={styles.depArrow}><div className={styles.depArrowLine}/><span>→</span></div>}

          {/* Current course */}
          <div className={`${styles.depCurrent}`}>
            <span className={styles.depCurrentIcon}>{course.icon}</span>
            <div>
              <div className={styles.depCurrentLabel}>Dieser Kurs</div>
              <div className={styles.depCurrentName}>{course.shortName}</div>
            </div>
          </div>

          {hasNext && <div className={styles.depArrow}><div className={styles.depArrowLine}/><span>→</span></div>}

          {/* Next steps */}
          {course.nextSteps.map((next, i) => (
            <div key={next.slug} className={styles.depGroup}>
              <DepPill course={next} type="next" />
              {i < course.nextSteps.length - 1 && <span className={styles.depOr}>oder</span>}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className={styles.depLegend}>
          {hasDeps && course.prerequisites.some(p => p.relation === 'required') && (
            <span className={styles.depLegendItem}><span className={styles.legendDotRequired} /> Voraussetzung (Pflicht)</span>
          )}
          {hasDeps && course.prerequisites.some(p => p.relation === 'recommended') && (
            <span className={styles.depLegendItem}><span className={styles.legendDotRecommended} /> Empfohlen</span>
          )}
          {hasNext && (
            <span className={styles.depLegendItem}><span className={styles.legendDotNext} /> Nächster Schritt</span>
          )}
        </div>
      </div>
    </FadeIn>
  )
}

function DepPill({ course, type }: { course: RelatedCourse; type: 'pre' | 'next' }) {
  const isRequired = course.relation === 'required'
  return (
    <Link
      to={`/kurs/${course.slug}`}
      className={`${styles.depPill} ${type === 'pre' ? (isRequired ? styles.depPillRequired : styles.depPillRecommended) : styles.depPillNext}`}
    >
      <span>{course.icon}</span>
      <span>{course.name}</span>
      {isRequired && <span className={styles.depPillTag}>Pflicht</span>}
      {course.relation === 'recommended' && <span className={styles.depPillTag} style={{background:'rgba(8,114,131,0.1)', color:'var(--teal)'}}>Empfohlen</span>}
    </Link>
  )
}

/* ── MAIN PAGE ────────────────────────────────── */
export default function KursDetail() {
  const { slug = '' } = useParams<{ slug: string }>()
  const course = getCourse(slug)

  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  if (!course) {
    // Unknown slug → redirect to a fallback course for demo
    return <Navigate to="/kurs/nothelfer-1" replace />
  }

  const selected = course.sessions.find(s => s.id === selectedSession)

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero} style={{ '--course-color': course.color } as React.CSSProperties}>
        <img src={course.heroImg} className={styles.heroBg} alt="" loading="eager" fetchPriority="high" />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <FadeIn>
            <div className={styles.breadcrumb}>
              <Link to="/">Home</Link>
              <span>›</span>
              <Link to={`/${course.categorySlug}`}>{course.category}</Link>
              <span>›</span>
              <span>{course.shortName}</span>
            </div>

            <div className={styles.heroBadges}>
              <span className={styles.heroBadge}>{course.icon} {course.category}</span>
              <span className={styles.heroBadge}>⏱ {course.duration}</span>
              <span className={styles.heroBadge}>👥 {course.level}</span>
              {course.certificate && <span className={`${styles.heroBadge} ${styles.heroBadgeCert}`}>🏅 Zertifikat</span>}
            </div>

            <h1 className={styles.heroTitle}>{course.name}</h1>
            <p className={styles.heroTagline}>{course.tagline}</p>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatVal}>{course.price}</span>
                <span className={styles.heroStatLabel}>pro Person</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatVal}>{course.maxParticipants}</span>
                <span className={styles.heroStatLabel}>Max. Teilnehmer</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatVal}>{course.language}</span>
                <span className={styles.heroStatLabel}>Sprache</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="container">
        <div className={styles.layout}>

          {/* ── LEFT: Content ── */}
          <div className={styles.content}>

            {/* Description */}
            <FadeIn>
              <section className={styles.contentSection}>
                <h2 className={styles.contentTitle}>Über diesen Kurs</h2>
                <p className={styles.description}>{course.description}</p>
              </section>
            </FadeIn>

            {/* What you learn */}
            <FadeIn delay={0.1}>
              <section className={styles.contentSection}>
                <h2 className={styles.contentTitle}>Was du lernst</h2>
                <ul className={styles.learnList}>
                  {course.whatYouLearn.map((item, i) => (
                    <motion.li
                      key={item}
                      className={styles.learnItem}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                    >
                      <span className={styles.learnCheck}>✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            {/* Course content accordion */}
            <FadeIn delay={0.15}>
              <section className={styles.contentSection}>
                <h2 className={styles.contentTitle}>Kursinhalt</h2>
                <p className={styles.contentSub}>{course.contents.length} Kapitel · {course.duration}</p>
                <div className={styles.accordionList}>
                  {course.contents.map((ch, i) => (
                    <AccordionItem key={ch.title} title={ch.title} topics={ch.topics} index={i} />
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Info grid */}
            <FadeIn delay={0.2}>
              <section className={styles.contentSection}>
                <h2 className={styles.contentTitle}>Kursdetails</h2>
                <div className={styles.infoGrid}>
                  {[
                    { icon: '⏱', label: 'Dauer', val: course.duration },
                    { icon: '👥', label: 'Niveau',  val: course.level },
                    { icon: '🗣', label: 'Sprache', val: course.language },
                    { icon: '👤', label: 'Max. Teilnehmer', val: `${course.maxParticipants} Personen` },
                    { icon: '💰', label: 'Preis', val: `${course.price} (${course.priceNote})` },
                    { icon: '🏅', label: 'Zertifikat', val: course.certificate ? (course.certificateLabel ?? 'Ja') : 'Kein Abschluss-Zertifikat' },
                  ].map(info => (
                    <div key={info.label} className={styles.infoItem}>
                      <span className={styles.infoIcon}>{info.icon}</span>
                      <div>
                        <div className={styles.infoLabel}>{info.label}</div>
                        <div className={styles.infoVal}>{info.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Dependency chain */}
            <DependencyChain course={course} />
          </div>

          {/* ── RIGHT: Sticky session picker ── */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <div className={styles.sidebarCard}>

                <div className={styles.sidebarHead}>
                  <div className={styles.sidebarPrice}>{course.price}</div>
                  <div className={styles.sidebarPriceNote}>{course.priceNote}</div>
                </div>

                <div className={styles.sidebarBody}>
                  <div className={styles.sessionPickerLabel}>
                    Datum & Zeit wählen
                    <span className={styles.sessionCount}>{course.sessions.filter(s => s.seats !== null && s.seats > 0).length} Termine verfügbar</span>
                  </div>

                  <div className={styles.sessionList}>
                    {course.sessions.map(session => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        selected={selectedSession === session.id}
                        onSelect={() => setSelectedSession(session.id)}
                      />
                    ))}
                  </div>

                  <AnimatePresence>
                    {selected && (
                      <motion.div
                        className={styles.selectionSummary}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className={styles.summaryRow}>
                          <span>Datum</span>
                          <strong>{selected.dateLabel}</strong>
                        </div>
                        <div className={styles.summaryRow}>
                          <span>Uhrzeit</span>
                          <strong>{selected.time}</strong>
                        </div>
                        <div className={styles.summaryRow}>
                          <span>Instruktor</span>
                          <strong>{selected.instructor}</strong>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                          <span>Gesamtbetrag</span>
                          <strong>{selected.price}</strong>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Link
                    to={selectedSession ? '/warenkorb' : '#'}
                    className={`btn btn-teal btn-full btn-lg ${!selectedSession ? 'btn-disabled' : ''}`}
                    style={{ marginTop: 16, textAlign: 'center', justifyContent: 'center', fontSize: 15, pointerEvents: selectedSession ? 'auto' : 'none' }}
                  >
                    {selectedSession ? 'In den Warenkorb →' : 'Bitte Datum wählen'}
                  </Link>

                  {!selectedSession && (
                    <p className={styles.sidebarHint}>Wähle einen Termin um fortzufahren</p>
                  )}

                  <div className={styles.sidebarTrust}>
                    <span>🔒 Sicheres Bezahlen</span>
                    <span>✓ Kostenlose Stornierung bis 7 Tage vorher</span>
                    <span>📋 Sofortige Buchungsbestätigung per E-Mail</span>
                  </div>
                </div>
              </div>

              {/* Contact card */}
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>💬</div>
                <div>
                  <div className={styles.contactTitle}>Fragen zum Kurs?</div>
                  <div className={styles.contactSub}>Wir beraten dich persönlich</div>
                </div>
                <Link to="/kontakt" className="btn btn-ghost-teal btn-sm">Kontakt</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
