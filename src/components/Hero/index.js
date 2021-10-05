import { IoLogoApple } from 'react-icons/io5'
import styles from './Hero.module.scss'

function Hero({ videos }) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={videos[0].thumbnail.url} alt="" />
      </div>
      <div className={styles.box}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <IoLogoApple />
            <span>tv</span>
            <span>+</span>
          </div>
          <div className={styles.subscribe}>
            <button>Get Apple TV+</button>
            <p>4.99 /month</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
