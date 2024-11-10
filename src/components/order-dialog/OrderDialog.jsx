import { useOrder } from '../../context/OrderContext';
import OrderItem from '../order-item/OrderItem';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import './orderdialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function OrderDialog() {

    const { order, toggleModal, setToggleModal, total, createOrder } = useOrder();

    if(!toggleModal) return;


    return (
        <div className='modal-overlay' onClick={() => setToggleModal(!toggleModal) }>

            <div className="modal-content" onClick={(e) => e.stopPropagation() }>

                <div className="modal-header"><FontAwesomeIcon className='cart-icon' icon={faCartShopping}/>Carrito</div>

                <div className="modal-body">

                    <ul className="order-list">
                        {
                        order.map((item) => (
                            <OrderItem  key={item._id} item={item} />
                        ))
                        }
                        
                        
                    </ul>
                    <div className='order-total'>
                            Total <strong>
                            ${ total }
                            </strong>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className='btn btn-gray' onClick={() => setToggleModal(!toggleModal)}>
                        Cerrar
                    </button>


                    <button className="btn" onClick={()=> createOrder()}>
                        Finalizar compra
                    </button>
                </div>

            </div>
        </div>
    )
}