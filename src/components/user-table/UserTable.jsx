import "./usertable.css";
import UserRow from '../user-row/UserRow';

export default function UserTable({ users, deleteUser, handleEditUser }) {
    
    return (
        <table className="user-table">

            <thead>
                <tr>
                    <th>
                        Imagen
                    </th>
                    <th>
                        Nombre Usuario
                    </th>
                    <th>
                        E-mail
                    </th>
                    <th>
                        Role
                    </th>
                    <th>
                        País
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

                    return <UserRow  key={user._id} 
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