import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserTable from "../../components/user-table/UserTable";
import "../../styles/form.css";
import Swal from "sweetalert2";
import "./adminuser.css";


const URL = "https://66cd01308ca9aa6c8cc93b20.mockapi.io/api/v1";


export default function AdminUser() {
    const [ users, setUsers ] = useState([]);
    // Estado para manejar la edición de productos
    const [ selectedUser, setSelectedUser ] = useState(null)

    const { register, setValue, reset, handleSubmit, formState: { errors, isValid } } = useForm();

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {

        if(selectedUser) {

            setValue("name", selectedUser.name),
            setValue("email", selectedUser.email),
            setValue("password",  selectedUser.password),
            setValue("datebirth", selectedUser.datebirth),
            setValue("pais", selectedUser.pais),
            setValue("image", selectedUser.image),
            setValue("comment", selectedUser.comment)

        }  else {
        reset()
        // reset({
      //   name: selectedProduct.name,
      //   price: selectedProduct.price,
      //   description: selectedProduct.description,
      //   image: selectedProduct.image,
      //   category: selectedProduct.category,
      //   createdAt: selectedProduct.createdAt
      // })
        }

    }, [ selectedUser, setValue, reset ])


    async function getUsers() {

        try {
        // Carga de productos
        const response = await axios.get(`${URL}/users`);

        // console.log(response.data);

        setUsers(response.data)

        } catch (error) {
        console.log(error);

        } // end catch block

    } //end getProducts function
    

    function deleteUsers(id) {

        Swal.fire({
            title: "Borrar Usuario?",
            text: "Realmente desea borrar este Usuario?",
            icon: "question",
            reverseButtons: true,
            showCancelButton: true,
        }).then(async(result) => {
            try {
            if(result.isConfirmed) {
                const response = await axios.delete(`${URL}/users/${id}`);

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

    async function onUserSubmit(user) {
        console.log(user)
        try {

        if(selectedUser) {
            // HAcer un put
            const { id } = selectedUser;
            const response = await axios.put(`${URL}/users/${id}`, user);
            console.log(response.data)
            Swal.fire({
            title:"Actualización correcta",
            text: "El usuario fue actualizado correctamente",
            icon: "success",
            timer: 1500
            })

            setSelectedUser(null)
            

        } else {
            // si no tengo estado selectedProduct (null) significa que estoy creando un producto
            const response = await axios.post(`${URL}/users`, user)
            console.log(response.data);
            

        }

        
        getUsers();
        // setSelectedProduct(null)

        } catch (error) {
        console.log(error)
        // Swal y mostrar error al user
        }
        
    }

    // # Editar productos
    // crear un función para obtener los datos del producto a editar
    function handleEditUser(user) {

        console.log("Usuario a editar", user);
        setSelectedUser(user);

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

                            { errors.name?.type === "minLength" && <div className="input-error">Mínimo de carácteres es 10</div> }

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
                            <label htmlFor="datebirth">Fecha de Nacimiento</label>
                            <input type="date" {...register("datebirth", { required: true })}  />

                            { errors.datebirth && <div className="input-error">Es obligatorio que ingrese su fecha de nacimiento</div> }
                        </div>

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
                            <input type="url" {...register("image", { required: true }) } />
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

                    <UserTable users={users} 
                                deleteUser={deleteUsers}
                                handleEditUser={handleEditUser}
                                />
                    
                </div>
            </div>
        
        </>
    )
}
