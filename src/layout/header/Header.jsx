import { NavLink } from "react-router-dom";
import './Header.css';
import "../../index.css";
import userImg from '../../assets/img/default-user.png';
import { useOrder } from "../../context/OrderContext";
// import OrderDialog from "../../components/order-dialog/OrderDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  
  const { setToggleModal, count } = useOrder();
  
  return (
    <>
      <header className="main-header">
          <input type="checkbox" id="responsive-menu" className="input-burger" />
          <label className="burger-menu" htmlFor="responsive-menu">
            <div className="burgerline" />
          </label>
          <div className="main-header-left">
            <NavLink to="/" className="main-logo">
              <img
                className="main-logo-img"
                src="https://i.ibb.co/7gMjKyK/e-shop-logo.webp"
                alt="logo"
              />
            </NavLink>
            <nav className="main-nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">principal</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Contact" className="nav-link">Contacto</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Nosotros" className="nav-link">Nosotros</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Login" className="nav-link">Registro</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Admin-Product" className="nav-link">AdminProduct</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/Admin-User" className="nav-link">AdminUser</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="user">
        {/* Icono del carrito de compras */}
            <div className="order">
              
              <div className="order-count">{count}</div>

                <FontAwesomeIcon  icon={faCartShopping} onClick={() => setToggleModal(estado => !estado) } />
              </div>
            <div className="avatar">
              <img src={userImg} alt="avatar-user" />
            </div>
          </div>
      </header>
    </>

  )
}
