import { formatDate } from '../../utils/formatDate';
import './AdminRow.css';

const URL = import.meta.env.VITE_SERVER;

export default function AdminRow({ producto, deleteProduct, handleEditProduct }) {
  return (
    <tr className="admin-table-row">
      <td className="image">
        <img src={`${URL}/images/products/${producto.image}`} alt={producto.name} />
      </td>
      <td className="name">
        {producto.name}
      </td>
      <td className="description">

        <div className="description-container">
          {producto.description}
        </div>

      </td>
      <td className="price">
        ${producto.price}
      </td>
      <td className="category">
        {producto.category}
      </td>
      <td className="date">
        {formatDate(producto.createdAt)}
      </td>
      <td className="actions">
        <div className="actions-container">
          <button className="btn" onClick={  () => handleEditProduct(producto)   }>
            Editar
          </button>
          <button className="btn btn-danger" onClick={  () => deleteProduct(producto._id)  }>Borrar</button> 
        </div>
      </td>


    </tr>
  )
}
