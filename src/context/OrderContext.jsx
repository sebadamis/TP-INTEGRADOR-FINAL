import { createContext, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useUser } from './UserContext';
import axios from 'axios';

const URL = import.meta.env.VITE_SERVER;

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);


export default function OrderProvider({ children }) {

    const { user } = useUser();

    const [ count, setCount ] = useState(0)
    const [ order, setOrder ] = useState([]);
    const [ toggleModal, setToggleModal ] = useState(false)
    const [ total, setTotal ] = useState(0);

    // const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        //Volver a calcular el total de productos
        calculateCount();
        calculateTotal();
        // changeItemQuantity();
    }, [order])

    const { token } = useUser();

    function addProduct(product) {

        const productExists = order.find(prod => prod._id === product._id);
        

        if(productExists) {
            productExists.quantity++;
            setOrder([...order])
        } else {
            product.quantity = 1;

            setOrder([ ...order, product ])
        }

        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            padding: '.5rem',
            title: 'Producto Agregado!',
            customClass: 'small-swal'
        })

    }

    function calculateCount() {
        let cantidadItems = 0;
        for(let item of order) {
            cantidadItems += item.quantity;
        }
        setCount(cantidadItems)
    }

    function calculateTotal() {
        let total = 0;
        order.forEach(item => {

            total += (item.price * item.quantity) 

        })
        setTotal(total)
    }

    function removeProduct(_id){
        

        const orderFiltered = order.filter(prod => prod._id !== _id);
        

        setOrder(orderFiltered);
    }

    function changeItemQuantity(product, value) {
        
        const producto = order.find((prod) => prod._id === product._id);
        if(!producto){
            product.quantity = value;
            return setOrder([...order, product])
        }

        producto.quantity = value;

        setOrder([...order]);


    }

    async function createOrder(){
        
        try {

            
            if (!user?._id) {
                Swal.fire({
                    title: "No iniciaste tu sesión",
                    text: "Necesitas iniciar sesion para crear una orden de compra",
                    icon: 'info'
                })
            }
            
            const products = order.map(prod=> {

                return {
                    product: prod._id,
                    quantity: prod.quantity,
                    price: prod.price
                }
            });
            Swal.fire({
                title:"Compra realizada",
                text: "Confirmaste tu compra",
                icon: "success"
            })
            // mostar order de compra del usuario en consola
            console.log("createOrder()", products);
    
    
            await axios.post(`${URL}/orders`, {products, user: user._id, total},
                {
                headers: {
                    Authorization: token
                }
            });


        } catch (error) {
            console.log(error);
        }
    }

    async function getOrders(){


        try {
            

            const response = await axios.get(`${URL}/orders`,
                {
                headers: {
                    Authorization: token
                }
            });

            console.log("getOrders()", response.data.orders);

        } catch (error) {
            console.log(error)
        }

    }


    

    return (
        <OrderContext.Provider
            value={{
                order,
                addProduct,
                toggleModal,
                setToggleModal,
                count,
                total,
                removeProduct,
                changeItemQuantity,
                createOrder,
                getOrders
            }}
        >
            { children }
        </OrderContext.Provider>
    )


} 