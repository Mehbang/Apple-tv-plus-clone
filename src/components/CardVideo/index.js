import styles from './Card.module.scss'

function CardVideo({ thumbnail }) {
  return (
    <div className={styles.card}>
      <img src={thumbnail.url} alt={thumbnail.title} />
    </div>
  )
}

export default CardVideo
