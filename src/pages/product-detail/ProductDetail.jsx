import ServiceFeatures from "../../components/service-features/ServiceFeatures";
import "./productdetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const URL = "https://66cd01308ca9aa6c8cc93b20.mockapi.io/api/v1";

export default function ProductDetail() {


    const { addProduct, changeItemQuantity, order } = useOrder();

    const [ products, setProducts ] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            
            const response = await axios.get(`${URL}/products/${id}`);
            
            const temp = order.find(p => p.id === id);

            response.data.quantity = temp?.quantity ?? 1;
            console.log(response.data);
    
            setProducts(response.data)
    
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
                                src={products.image}
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
                                    Categoría: {products.category}
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

    
    

