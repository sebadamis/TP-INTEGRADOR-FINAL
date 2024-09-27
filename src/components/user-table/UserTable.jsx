import "./usertable.css";
import UserRow from '../user-row/UserRow';

export default function UserTable({ users, deleteUser, handleEditUser }) {
    
    return (
        <table className="user-table">

            <thead>
                <tr>
                <th>
                    Nombre Usuario
                </th>
                <th>
                    E-mail
                </th>
                <th>
                    Contraseña
                </th>
                <th>
                    Fecha  de Nacimiento
                </th>
                <th>
                    País
                </th>
                <th>
                    Imagen
                </th>
                <th>
                    Comentario
                </th>
                <th>
                    Acciones
                </th>
                </tr>
            </thead>
            <tbody>
                {
                users.map(user => {

                    return <UserRow  key={user.id} 
                                    users={user} 
                                    deleteUser={deleteUser}
                                    handleEditUser={handleEditUser}
                                    />
                })
                }
            </tbody>

        </table>
    )
}