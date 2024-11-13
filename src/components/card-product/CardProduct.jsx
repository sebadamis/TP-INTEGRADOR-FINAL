import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faDollarSign, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import "./cardproduct.css";
import { NavLink } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";

const URL = import.meta.env.VITE_SERVER;

export default function CardProduct({prod}) {
    
    const { addProduct } = useOrder();
    
    return (    
        <>

                <div className="product-card-container">
                    <div className="card">
                        <div className="imgBox">
                            <img
                                className="img"
                                src={`${URL}/images/products/${prod.image}`}
                                alt={prod.name}/>
                        </div>
                        <div className="contentBox">
                            <h3>{prod.name}</h3>
                            <h2 className="price">${prod.price}</h2>
                            <div className="buy-container">

                                <NavLink to={`/product-detail/${prod._id}`} className="buy ver"><button className="animated-button"><FontAwesomeIcon icon={faCircleInfo} className="fa-info-circle"/>Info</button></NavLink>

                                <NavLink to="#" className="buy cash"><button className="animated-button" onClick={() => addProduct(prod)}><FontAwesomeIcon icon={faDollarSign} className="faDollarSign"/>Comprar</button></NavLink>
                            </div>
                        </div>
                    </div>
                

                </div>

        
        </>
    )
}
