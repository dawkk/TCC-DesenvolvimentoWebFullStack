import styles from './Banner.module.scss';

const Banner = () => {
  return (
    <section className={styles.BannerArea}>
      <div className={styles.Container}>
        <h1 className={styles.Titulo}>LA COOKERIA</h1>
        <p>Comida que traz alegria.</p>
      </div>
    </section>
  )
}

export default Banner;