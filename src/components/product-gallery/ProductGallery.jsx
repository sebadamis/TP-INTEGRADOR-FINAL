import { useEffect, useState } from 'react';
import CardProduct from '../card-product/CardProduct';
import './productgallery.css';
import axios from 'axios';
import { useUser } from '../../context/UserContext';



const URL = import.meta.env.VITE_LOCAL_SERVER;

export default function ProductGallery({ category }) {
    const [ products, setProducts ] = useState([]);

    const { token } = useUser();

    useEffect(()=> {
        // Ejecutar la función getProducts al montar el componente 1 vez
        getProducts();
    }, [])
    
    async function getProducts() {
        // Obtener los productos desde mockapi y actualizar el estado
        try {
            
            const response = await axios.get(`${URL}/products`,
                {
                headers: {
                    Authorization: token
                }
            });

            // const filteredProducts = response.data.filter(prod => prod.category === category);
            // setProducts(filteredProducts)

            setProducts(response.data.products)

        } catch (error) {
            // alert("Error al obtener productos");
            console.log(error);
        }
    }


    return (
        <>
        <section className="product-gallery">
            
            <h2>Nuestros Productos {category}</h2>

            
        </section>

        <div className="product-gallery__container">
                
            {
                products.map(producto => <CardProduct key={producto._id} prod={producto} />)
            }
                
        </div>
        </>

        
    )
}
