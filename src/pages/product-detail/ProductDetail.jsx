import ServiceFeatures from "../../components/service-features/ServiceFeatures";
import "./productdetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext";


const URL = import.meta.env.VITE_LOCAL_SERVER;

export default function ProductDetail() {

    const { addProduct, changeItemQuantity, order } = useOrder();

    const [ products, setProducts ] = useState([]);

    const { _id } = useParams();

    const { token } = useUser();

    useEffect(() => {
        getProducts();
    }, []);


    async function getProducts() {

        
        try {
            
            const response = await axios.get(`${URL}/products/${_id}`,
                {
                headers: {
                    Authorization: token
                }
            });
            
            const temp = order.find(p => p._id === _id);

            response.data.products.quantity = temp?.quantity ?? 1;
            console.log(response.data.products);
    
            setProducts(response.data.products);
    
            } catch (error) {
                console.log(error);
        
            } 
    
        }

        return (
            <>
                
                <main className="product-main-container">
                    <div className="main-header-product">
                        <h1 className="titulo">Detalles del Producto</h1>
                        
                        <section className="section-img">
                            <div className="img-container">
                                <img
                                src={`${URL}/images/products/${products.image}`}
                                alt={products.name}
                                />
                            </div>
                        </section>
    
                        <section className="info-section">
                            <div className="text-info-container">
                                <p className="titulo-producto">
                                    {products.name}
                                </p>
                                <p className="categoria">
                                    Categoría: {products.categories}
                                </p>
                                <p className="descripcion">
                                    Descripción: {products.description}
                                </p>
                                <p className="precio">
                                    Precio: $ <strong>{products.price}</strong>
                                </p>
                            </div>
                        </section>
    
                        <section className="detail-buttons">
    
                            <div className="info-buttons">


                                <div className="boton-cantidad">
                                    <input type="number"className='number-input'
                                    defaultValue={products.quantity} min="1" 
                                    onChange={(evt) => changeItemQuantity(products, evt.target.valueAsNumber)}/>
                                </div>


                                <div className="container-cart-button">
                                    <button className="info-button animated-button" onClick={() => addProduct(products)}>
                                        <FontAwesomeIcon className="faCartPlus" icon={faCartPlus} />
                                        Agregar al Carrito
                                    </button>
                                </div>
                            </div>
    
                        </section>

                    </div>
                    
                </main>
    
                <ServiceFeatures/>
                
            
            </>
        )


    }

    
    

