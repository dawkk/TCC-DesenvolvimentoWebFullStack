import styles from './BannerAbout.module.scss'

const BannerAbout = () => {
  return (
    <div className={styles.BannerPadding}>
      <section className={styles.BannerArea}>
        <div className={styles.Container}>
          <h1 className={styles.Titulo}>Quem Somos</h1>
        </div>
      </section>
    </div>
  )
}

export default BannerAbout;