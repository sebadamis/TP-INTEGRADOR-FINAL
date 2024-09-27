import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import "./orderitem.css"

export default function OrderItem({ item }) {

    const {removeProduct, changeItemQuantity} = useOrder();

    return (
        <li className="order-item">
            <div className="item-image">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="item-info">
                {item.name}
            </div>
            <div className="item-price">
                ${item.price}
            </div>
            <div className="item-subtotal">
                ${item.price * item.quantity}
            </div>
            <div className="item-count">
                <input type="number"className='item-input'
                defaultValue={item.quantity} min="1" 
                onChange={(evt) => changeItemQuantity(item, evt.target.valueAsNumber)}/>
                {item.quantity}
            </div>
            <div className="item-actions">
                <button className='btn-icon' onClick={()=> removeProduct(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </li>
    )
}