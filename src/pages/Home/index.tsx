import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import styles from './Home.module.scss'

const Home = () => {
  return (
    <>
      <NavBar></NavBar>
      <Banner></Banner>
      <div className={styles.Background}>
        <div className={styles.MiniBanners}>
          <img src="/images/home/mini-banner-salad-web.jpg" alt="Prato de Salada Italiana" />
          <div className={styles.CentralCard}>
            <h2>Trabalhamos com Delivery!</h2>
            <div>
              <p>Horários:</p>
              <p>Quarta a Sexta</p>
              <p>12:00 as 23:00</p>
              <p>ligue para <a href="callto:99999999999">(99) 99999-999</a></p>
            </div>
          </div>
          <img src="/images/home/mini-banner-barbecue.jpg" alt="Um hambúrguer desconstruído" />
        </div>
        <div className={styles.Categories}>
          <div className={styles.PreviewPlates}>
            <img src="/images/home/menu-hamburguer.jpg" alt="Lanches" />
            <h4>Lanches</h4>
          </div>
          <div className={styles.PreviewPlates}>
            <img src="/images/home/menu-lunch.jpg" alt="Saladas" />
            <h4>Saladas</h4>
          </div>
          <div className={styles.PreviewPlates}>
            <img src="/images/home/menu-dinner.jpg" alt="Pratos" />
            <h4>Pratos</h4>
          </div>
          <div className={styles.PreviewPlates}>
            <img src="/images/home/menu-dessert.jpg" alt="Sobremesas" />
            <h4>Sobremesas</h4>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Home;