import Logo from '../Logo';
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.FooterStyle}>
      <div>
        <Logo/>
      </div>
      <div>
        <p>Copyright &copy; {new Date().getFullYear()} La Cookeria</p>
      </div>
      <div>
        <ul className="social-icons">
          <li><i className="fa fa-facebook"></i></li>
          <li><i className="fa fa-twitter"></i></li>
          <li><i className="fa fa-linkedin"></i></li>
          <li><i className="fa fa-rss"></i></li>
          <li><i className="fa fa-dribbble"></i></li>
        </ul>
      </div>
    </footer>
  )
}
export default Footer;