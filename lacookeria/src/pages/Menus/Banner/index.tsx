import styles from './Banner.module.scss'

const BannerMenu = () => {
  return (
    <div className={styles.BannerPadding}>
      <section className={styles.BannerArea}>
        <div className={styles.Container}>
          <h1 className={styles.Titulo}>Nossos Menus</h1>
        </div>
      </section>
    </div>
  )
}

export default BannerMenu;