import CardVideo from '../CardVideo'
import styles from './Section.module.scss'

function Section({ genre, videos }) {
  return (
    <>
      <h3 className={styles.title}>{genre}</h3>
      <div className={styles.section}>
        <div className={styles.box}>
          {videos.map((video) => (
            <a key={video.id} href={`/video/${video.slug}`}>
              <CardVideo thumbnail={video.thumbnail} />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default Section
