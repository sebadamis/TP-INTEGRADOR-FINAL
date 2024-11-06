import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserTable from "../../components/user-table/UserTable";
import "../../styles/form.css";
import Swal from "sweetalert2";
import "./adminuser.css";
import { useUser } from "../../context/UserContext";


const URL = import.meta.env.VITE_LOCAL_SERVER;


export default function AdminUser() {
    const [ users, setUsers ] = useState([]);
    const [ selectedUser, setSelectedUser ] = useState(null)

    const { register, setValue, reset, handleSubmit, formState: { errors, isValid } } = useForm();

    useEffect(() => {
        getUsers();
    }, [])

    const { token, logout } = useUser();

    useEffect(() => {

        

        if(selectedUser) {

            setValue("name", selectedUser.name),
            setValue("email", selectedUser.email),
            setValue("password",  selectedUser.password),
            // setValue("datebirth", selectedUser.datebirth),
            setValue("pais", selectedUser.pais),
            setValue("image", selectedUser.image),
            setValue("comment", selectedUser.comment),
            setValue("role", selectedUser.role)

        }  else {
        reset()
        }

    }, [ selectedUser, setValue, reset ])


    async function getUsers() {

        try {
        // Carga de productos
            

        const response = await axios.get(`${URL}/users`, {
            headers: {
                Authorization: token
            }
        });

        console.log(response.data);
        setUsers(response.data.users)

        } catch (error) {
            if(error.response.status === 401){
                Swal.fire({
                    title: "su sesión ha caducado",
                    icon: error,
                    text: "debe volver a loguear su usuario"
                });
                logout();
                return;
            }
        console.log(error);

        } 

    } 

    function deleteUsers(_id) {

        Swal.fire({
            title: "Borrar Usuario?",
            text: "Realmente desea borrar este Usuario?",
            icon: "question",
            reverseButtons: true,
            showCancelButton: true,
        }).then(async(result) => {
            try {
                
                if(result.isConfirmed) {
                    const response = await axios.delete(`${URL}/users/${_id}`,
                        {
                            headers: {
                                Authorization: token
                            }
                        });

                    console.log(response.data);
            
                    getUsers();
                }
            } catch (error) {
            console.log(error)
            // Mensaje para el usuario de que algo falló
            Swal.fire({
                title: "Error al borrar",
                text: "El usuario no fue borrado",
                icon: "error"
            })
            }
        })

    }

    async function onUserSubmit(users) {
        console.log(users)
        try {
        
        const formData = new FormData();
        
        formData.append("name", users.name);
        formData.append("email", users.email);
        formData.append("password", users.password);
        // formData.append("datebirth", users.datebirth);
        formData.append("pais", users.pais);
        formData.append("role", users.role);
        // formData.append("createdAt", users.createdAt);
        formData.append("comment", users.comment);
        if(users.image[0]){
            formData.append("image", users.image[0]);
        }

        if(selectedUser) {
            
            const { _id } = selectedUser;
            const response = await axios.put(`${URL}/users/${_id}`, formData,
                {
                    headers: {
                        Authorization: token
                    }
                });
            
            console.log(response.data)
            Swal.fire({
            title:"Actualización correcta",
            text: "El usuario fue actualizado correctamente",
            icon: "success",
            timer: 1500
            })

            
            setSelectedUser(null)
            
            

        } else {
            
            const response = await axios.post(`${URL}/users`, formData, 
                {
                    headers: {
                        Authorization: token
                    }
                });
            
            console.log(response.data);
            Swal.fire({
                title:"Creaste un Usuario nuevo",
                text: "Se creó un Usuario Nuevo",
                icon: "success"
                })

        }

        
        getUsers();
        

        } catch (error) {
        console.log(error)
        // Swal y mostrar error al user
        }
        
    }

    // # Editar productos
    // crear un función para obtener los datos del producto a editar
    function handleEditUser(users) {

        console.log("Usuario a editar", users);
        setSelectedUser(users);

    }


    return (
        <>
            <div className="user-container">
                {/* Contenedor del formulario */}
                <div className="form-container">
                    <h1>Admin User</h1>
                    <form className="admin-form" onSubmit={handleSubmit(onUserSubmit)}>

                        <div className="input-group">
                            <label htmlFor="name">Nombre Usuario</label>

                            <input type="text" id="name" 
                                    {...register("name", { required: true, minLength: 5 }) 
                            } />

                            { errors.name?.type === "required" && <div className="input-error">El campo es requerido</div> }

                            { errors.name?.type === "minLength" && <div className="input-error">Mínimo de carácteres es 5</div> }

                        </div>

                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" {...register("email", { required: true }) } />

                            { errors.email && <div className="input-error">El campo E-mail es necesario</div> }
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" {...register("password", { required: true }) } />

                            { errors.password && <div className="input-error">El campo CONTRASEÑA es obligatorio</div> }
                        </div>

                        {/* <div className="input-group">
                            <label htmlFor="datebirth">Fecha de Nacimiento</label>
                            <input type="date" {...register("datebirth", { required: true })}  />

                            { errors.datebirth && <div className="input-error">Es obligatorio que ingrese su fecha de nacimiento</div> }
                        </div> */}

                        <div className="input-group">

                            <label htmlFor="pais">País</label>
                            <select {...register("pais", { required: true })}>

                                <option value="Argentina">Argentina</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Brasil">Brasil</option>
                                <option value="Mexico">México</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Chile">Chile</option>

                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="comment">Comentario</label>
                            <textarea {...register("comment")} rows={5}></textarea>
                        </div>

                        <div className="input-group">
                            <label htmlFor="">Avatar (ingrese un link de imagen)</label>
                            <input type="file" {...register("image", { required: true }) } />
                        </div>

                        <button className={`btn ${selectedUser && 'btn-success'}`}       
                                type="submit" 
                                disabled={ !isValid }  >

                            {
                            selectedUser ? "Editar" : "Crear"
                            }

                        </button>

                    </form>
                </div>
                {/* Contenedor de la tabla de productos */}
                <div className="table-container">

                    <UserTable  key={users._id}
                                users={users} 
                                deleteUser={deleteUsers}
                                handleEditUser={handleEditUser}
                                />
                    
                </div>
            </div>
        
        </>
    )
}
