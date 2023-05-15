
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import styles from './Home.module.scss'
import saladImage from '../../assets/images/home/mini-banner-salad-web.jpg'
import barbecueImage from '../../assets/images/home/mini-banner-barbecue.jpg'
import menuHamburguer from '../../assets/images/home/menu-hamburguer.jpg'
import menuDinner from '../../assets/images/home/menu-dinner.jpg'
import menuDessert from '../../assets/images/home/menu-dessert.jpg'
import menuLunch from '../../assets/images/home/menu-lunch.jpg'


const Home = () => {
  return (
    <>
      <NavBar></NavBar>
      <section className={styles.BannerArea}>
        <div className={styles.Container}>
          <h1 className={styles.Titulo}>LA COOKERIA</h1>
          <p>Comida que trás alegria.</p>
        </div>
      </section>
      <div className={styles.Background}>
        <div className={styles.MiniBanners}>
          <img src={saladImage} alt="Prato de Salada Italiana" />
          <div className={styles.CentralCard}>
            <h2>Trabalhamos com Delivery!</h2>
            <div>
              <p>Horários:</p>
              <p>Quarta a Sexta</p>
              <p>12:00 as 23:00</p>
              <p>ligue para <a href="callto:99999999999">(99) 99999-999</a></p>
            </div>
          </div>
          <img src={barbecueImage} alt="Um hambúrguer desconstruído" />
        </div>
        <div className={styles.Categories}>
          <div className={styles.PreviewPlates}>
            <img src={menuHamburguer} alt="Lanches" />
            <h4>Lanches</h4>
          </div>
          <div className={styles.PreviewPlates}>
            <img src={menuLunch} alt="Saladas" />
            <h4>Saladas</h4>
          </div>
          <div className={styles.PreviewPlates}>
            <img src={menuDinner} alt="Pratos" />
            <h4>Pratos</h4>
          </div>
          <div className={styles.PreviewPlates}>
            <img src={menuDessert} alt="Sobremesas" />
            <h4>Sobremesas</h4>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Home;