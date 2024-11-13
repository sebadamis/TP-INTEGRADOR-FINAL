import { useForm } from "react-hook-form"
import "./register.css"
import axios from "axios";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER;



export default function Register() {

  const  {register, handleSubmit, reset, formState: {errors , isValid} } = useForm();



  async function onRegister(usuario) {
    try {

      const formData = new FormData();
            
            formData.append("name", usuario.name);
            formData.append("email", usuario.email);
            formData.append("password", usuario.password);
            formData.append("pais", usuario.pais);
            formData.append("comment", usuario.comment);
            if(usuario.image[0]){
                formData.append("image", usuario.image[0]);
            }


      
      const response = await axios.post(`${URL}/users`, formData);
      
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
        {/* contenedor del formulario */}

        <div className="formulario-container">
          <form className="formulario" onSubmit={handleSubmit(onRegister)}>
            <h3 className="titulo-formulario">Registro de Usuarios</h3>
            <div className="input-group">
              <label htmlFor="#nombre-completo" className="input-label">Nombre de Usuario:</label>
              <input
                type="text"
                id="nombre-completo"
                placeholder="Juan Perez"
                autoFocus=""
                {...register("name", {
                  required: true,
                  minLength: 5,
                  maxLength: 50,
                })} />
                { errors.name && <div className="input-error">Debe ingresar su nombre de usuario</div> }
              
            </div>
            <div className="input-group">
              <label htmlFor="#e-mail" className="input-label">E-mail: </label>
              <input
                type="email"
                id="e-mail"
                placeholder="mail@mail.com"
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
              <label htmlFor="#password" className="input-label">Contraseña: </label>
              <input
                type="password"
                id="password"
                placeholder="*****"
                {...register("password",{
                  minLength: 3,
                  maxLength: 20,
                  placeholder: "Ingrese su Contraseña",
                  required: true
                })}/>
            </div>
            { errors.password && <div className="input-error">Es obligatorio que ingrese su Contraseña</div> }
            

            <div className="input-group">
              <label htmlFor="#pais" className="input-label">País: </label>
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
              <label htmlFor="" className="input-label">Imagen del Usuario: (Subir una imagen)</label>
              <input type="file" className="input-file" {...register("image") } />
            </div>
            { errors.image && <div className="input-error">Debe subir una Imagen</div> }

            <div className="input-group">
              <label htmlFor="#comentario" className="input-label">Escriba un Comentario: </label>
              <textarea
                name="comentario"
                id="comentario"
                placeholder="Escribí tu comentario aquí"
              {...register("comment",{
                placeholder: "Escriba un comentario",
                minLength: 7,
                maxLength: 120,
                defaultValue: ""
              })}/>
            </div>
            { errors.comment && <div className="input-error">Debe escribir un comentario</div> }

            <div className="input-group-boton">
                      
              <button type="submit" className="button" disabled={ !isValid }>Enviar Registro</button>
              <button type="reset" className="button" onClick={() => reset()}>Borrar todo</button>
              
            </div>
          </form>
        </div>
      </section>
    </main>
  </>

  )
}
