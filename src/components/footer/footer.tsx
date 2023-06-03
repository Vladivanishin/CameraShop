import { Link } from 'react-router-dom';
import { AppRoute } from '../../conts';

export default function Footer () : JSX.Element{
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Link className="footer__logo" to={'/'} aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono"></use>
            </svg>
          </Link>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <Link className="link" to={'https://vk.com/prostovladi'} aria-label="Переход на страницу вконтатке">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk"></use>
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to={'https://vk.com/prostovladi'} aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to={'https://vk.com/prostovladi'} aria-label="Переход на страницу reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to={AppRoute.Catalog}>Каталог
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={'/'}>Гарантии
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={'/'}>Доставка
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to={'/'}>О компании
                </Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">Курсы операторов
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Блог
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Сообщество
                </a>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="link" href="#">FAQ
                </a>
              </li>
              <li className="footer__item">
                <a className="link" href="#">Задать вопрос
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
