import styles from './Footer.module.css';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.title}>Contact</h2>

      <div className={styles.cards}>
        <div className={styles.card}>
          <p className={styles.label}>Phone</p>
          <p className={styles.value}>+7 (499) 350-66-04</p>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Socials</p>
          <div className={styles.icons}>
            <FaInstagram size={24} />
            <FaWhatsapp size={24} />
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Address</p>
          <p className={styles.value}>
            Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
          </p>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Working Hours</p>
          <p className={styles.value}>24 hours a day</p>
        </div>
      </div>

      <div className={styles.map}>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.5914191128663!2d37.629529777103734!3d55.71347349501944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54b22a91ac945%3A0xf19f72681321ff46!2sIThub%20college!5e0!3m2!1sru!2snl!4v1750226853206!5m2!1sru!2snl"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
};