import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { nameToSlug } from '../../data/courses'
import styles from './CourseRow.module.css'

export interface Course {
  name: string
  date: string
  time: string
  price: string
  seats: number | null   // null = ausgebucht
  slug?: string          // optional override; derived from name if absent
}

interface Props {
  course: Course
  index: number
}

export default function CourseRow({ course, index }: Props) {
  const full  = course.seats === null || course.seats === 0
  const low   = course.seats !== null && course.seats <= 2
  const slug  = course.slug ?? nameToSlug(course.name)
  const detailHref = `/kurs/${slug}`

  const seatsClass = full ? styles.full : low ? styles.low : styles.ok
  const seatsLabel = full ? 'ausgebucht' : `${course.seats} Plätze frei`

  return (
    <motion.div
      className={styles.row}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.32, ease: 'easeOut' }}
    >
      {/* Clicking the course name goes to the detail page */}
      <Link to={detailHref} className={styles.name}>{course.name}</Link>

      <span className={styles.meta}>
        <span className={styles.metaIcon}>📅</span>
        {course.date}
      </span>

      <span className={styles.meta}>
        <span className={styles.metaIcon}>🕐</span>
        {course.time}
      </span>

      <span className={styles.price}>{course.price}</span>

      <span className={`${styles.seats} ${seatsClass}`}>
        <span className={styles.seatsDot} />
        {seatsLabel}
      </span>

      {/* Mobile price+seats row placeholder (CSS only) */}
      <span className={styles.priceRow} style={{ display: 'none' }} />

      {full ? (
        <button className={`${styles.bookBtn} ${styles.bookFull}`} disabled>ausgebucht</button>
      ) : (
        <Link to={detailHref} className={styles.bookBtn}>Details →</Link>
      )}
    </motion.div>
  )
}
