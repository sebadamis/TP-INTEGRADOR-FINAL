import { useEffect, useState } from 'react';
import CardProduct from '../card-product/CardProduct';
import './productgallery.css';
import axios from 'axios';



const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductGallery({ category }) {
    const [ products, setProducts ] = useState([]);

    useEffect(()=> {
        // Ejecutar la función getProducts al montar el componente 1 vez
        getProducts();
    }, [])
    
    async function getProducts() {
        // Obtener los productos desde mockapi y actualizar el estado
        try {
            
            const response = await axios.get(`${URL}/products`)

            // const filteredProducts = response.data.filter(prod => prod.category === category);
            // setProducts(filteredProducts)

            setProducts(response.data)

        } catch (error) {
            alert("Error al obtener productos");
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
                products.map(producto => <CardProduct key={producto.id} prod={producto} />)
            }
                
        </div>
        </>

        
    )
}
