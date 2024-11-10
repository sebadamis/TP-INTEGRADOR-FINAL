import { useForm } from "react-hook-form"
import "./register.css"
import axios from "axios";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_LOCAL_SERVER;



export default function Register() {

  const  {register, handleSubmit, reset , formState: {errors , isValid} } = useForm();



  async function onRegister(usuario) {
    try {

      const formData = new FormData();
            
            formData.append("name", usuario.name);
            formData.append("email", usuario.email);
            formData.append("password", usuario.password);
            // formData.append("datebirth", usuario.datebirth);
            formData.append("pais", usuario.pais);
            formData.append("createdAt", usuario.createdAt);
            formData.append("comment", usuario.comment);
            if(usuario.image[0]){
                formData.append("image", usuario.image[0]);
            }

            // los datos del formulario no se vuelcan el la DB users

      
      const response = await axios.post(`${URL}/users`, formData)
      console.log(response.data.users);

      Swal.fire({
        title:"Éxito", 
        text: "Se ha creado el nuevo Usuario",
        color: "#000000",
        icon: "success",
        background: '#666666'
      })


    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "No se puedo crear el usuario", "error")      
    }
  }


  return (
  <>
    <main className="main-container">
      <section className="register-section">
        <div className="titulo-sub-container">
          <h1 className="section-title">Registro</h1>
          <div className="section-subtitle">
            completa el formulario con tus datos
          </div>
        </div>
        <div className="formulario-container">
          <form className="formulario" onSubmit={handleSubmit(onRegister)}>
            <h3 className="titulo-formulario">Formulario de Registro se Usuario</h3>
            <div className="input-group">
              <label htmlFor="#nombre-completo">Nombre Completo:</label>
              <input
                type="text"
                id="nombre-completo"
                {...register("name", {
                  required: true,
                  minLength: 5,
                  maxLength: 50,
                  autoFocus: "",
                  placeholder: "Juan Perez"
                })} />
                { errors.name && <div className="input-error">Debe ingresar su nombre de usuario</div> }
              
            </div>
            <div className="input-group">
              <label htmlFor="#e-mail">E-mail: </label>
              <input
                type="email"
                id="e-mail"
                {...register("email", {
                  placeholder: "user@mail.com",
                  pattern: "[A-Za-z0-9._+\n-']+@[A-Za-z0-9.\n-]+\n.[A-Za-z]{2,}$",
                  minLength: 6,
                  maxLength: 50,
                  required: true
                })}/>
            </div>
            { errors.email && <div className="input-error">Debe ingresar su mail</div> }

            <div className="input-group">
              <label htmlFor="#password">Contraseña: </label>
              <input
                type="password"
                id="password"
                {...register("password",{
                  minLength: 3,
                  maxLength: 20,
                  placeholder: "Ingrese su Contraseña",
                  required: true
                })}/>
            </div>
            { errors.password && <div className="input-error">Es obligatorio que ingrese su Contraseña</div> }
            
            {/* <div className="input-group">
              <label htmlFor="#fecha-nacimiento">Fecha de Nacimiento: </label>
              <input type="date" id="fecha-nacimiento"
                {...register("datebirth",{
                  required: true
                })}/>
                { errors.datebirth && <div className="input-error">Es obligatorio que ingrese su fecha de nacimiento</div> }
            </div> */}

            <div className="input-group">
              <label htmlFor="#pais">País: </label>
              <select name="pais" id="pais" {...register("pais",{
                defaultValue: "ARGENTINA", required: true
              })}>
                <option value="ARGENTINA">Argentina</option>
                <option value="BRASIL">Brasil</option>
                <option value="PERU">Perú</option>
                <option value="CHILE">Chile</option>
                <option value="COLOMBIA">Colombia</option>
                <option value="PARAGUAY">Paraguay</option>
                <option value="VENEZUELA">Venezuela</option>
              </select>
            </div>
            { errors.pais && <div className="input-error">Debe ingresar su País</div> }


            <div className="input-group">
              <label htmlFor="">Avatar (Subir una imagen)</label>
              <input type="file" {...register("image") } />
            </div>
            { errors.image && <div className="input-error">Debe subir una Imagen</div> }

            <div className="input-group">
              <label htmlFor="#comentario">Escriba una Observación: </label>
              <textarea
                name="comentario"
                id="comentario"
              {...register("comment",{
                placeholder: "Escriba un comentario",
                minLength: 10,
                maxLength: 120,
                defaultValue: ""
              })}/>
            </div>
            { errors.comment && <div className="input-error">Debe escribir un comentario</div> }

            <div className="input-group-boton">
                      {/* onClick={() => onRegister()} */}
              <button type="submit"  disabled={ !isValid }>Enviar Registro</button>
              <button type="reset" onClick={() => reset()}>Borrar todo</button>
              
            </div>
          </form>
        </div>
      </section>
    </main>
  </>

  )
}
