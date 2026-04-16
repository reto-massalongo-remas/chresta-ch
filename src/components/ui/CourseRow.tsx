import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './CourseRow.module.css'

export interface Course {
  name: string
  date: string
  time: string
  price: string
  seats: number | null   // null = ausgebucht
}

interface Props {
  course: Course
  index: number
}

export default function CourseRow({ course, index }: Props) {
  const full = course.seats === null || course.seats === 0
  const low  = course.seats !== null && course.seats <= 2

  const seatsClass = full ? styles.full : low ? styles.low : styles.ok
  const seatsLabel = full ? 'ausgebucht' : `${course.seats} Plätze frei`

  return (
    <motion.div
      className={styles.row}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.32, ease: 'easeOut' }}
    >
      <span className={styles.name}>{course.name}</span>

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

      {/* Mobile price+seats row (CSS only via class) */}
      <span className={styles.priceRow} style={{ display: 'none' }} />

      {full ? (
        <button className={`${styles.bookBtn} ${styles.bookFull}`} disabled>ausgebucht</button>
      ) : (
        <Link to="/warenkorb" className={styles.bookBtn}>buchen →</Link>
      )}
    </motion.div>
  )
}
