import "./userrow.css"

export default function UserRow({ users, deleteUser, handleEditUser }) {
    return (
        
        <tr className="user-table-row">

            <td className="user-name">
                {users.name}
            </td>

            <td className="email">
                {users.email}
            </td>

            <td className="password">
                {users.password}
            </td>

            <td className="datebirth">
                {users.datebirh}
            </td>

            <td className="pais">
                {users.pais}
            </td>


            <td className="image">
                <img src={users.image} alt={users.name} />
            </td>
            
            <td className="comentario">

                <div className="comentario-container">
                {users.comment}
                </div>

            </td>


            <td className="actions">
                <div className="actions-container">
                <button className="btn" onClick={  () => handleEditUser(users)   }>
                    Editar
                </button>

                <button className="btn btn-danger" onClick={  () => deleteUser(users._id)  }>Borrar</button> 
                </div>
            </td>

        </tr>
    )
}
