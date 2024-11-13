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
    // const [selectedCountry, setSelectedCountry] = useState("");

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
            //setValue("pais", selectedUser.pais),
            setValue("pais", selectedUser.pais.toUpperCase()),
            // setValue("image", selectedUser.image),
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

        // console.log(response.data);
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

    async function onUserSubmit(usuario) {

        try {
        
            const formData = new FormData();
            
            formData.append("name", usuario.name);
            formData.append("email", usuario.email);
            formData.append("password", usuario.password);
            // formData.append("datebirth", usuario.datebirth);
            formData.append("pais", usuario.pais);
            //formData.append("createdAt", usuario.createdAt);
            formData.append("comment", usuario.comment);
            if(usuario.image[0]){
                formData.append("image", usuario.image[0]);
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
        Swal.fire({
            title: "Error al crear Usuario",
            text: "Ocurrio un error al crear usuario",
            icon: "error"
        })
        }
        
    }

    // # Editar productos
    function handleEditUser(usuario) {

        // console.log("Usuario a editar", usuario);
        setSelectedUser(usuario);

    }


    return (
        <>
            <div className="user-container">
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

                        

                        <div className="input-group">

                            <label htmlFor="pais">País</label>
                            <select {...register("pais", { required: true })}>

                                <option value="ARGENTINA">Argentina</option>
                                <option value="BRASIL">Brasil</option>
                                <option value="PERU">Perú</option>
                                <option value="CHILE">Chile</option>
                                <option value="COLOMBIA">Colombia</option>
                                <option value="PARAGUAY">Paraguay</option>
                                <option value="VENEZUELA">Venezuela</option>


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
