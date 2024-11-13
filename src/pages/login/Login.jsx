import { useForm } from "react-hook-form";
import "./login.css";
import { useUser } from "../../context/UserContext";



export default function Login() {

    const  {register, handleSubmit} = useForm();

    const { login } = useUser();


    return (
        <>
            <main className="main-container">
                <section className="register-section">
                    <div className="titulo-sub-container">
                    <h1 className="section-title">Ingreso de Usuario</h1>
                    <div className="section-subtitle">
                        completa los datos para ingresar al sitio
                    </div>
                    </div>
                    <div className="formulario-container">
                    <form className="formulario" onSubmit={handleSubmit(login)}>
                        <h3 className="titulo-formulario">Login de Usuario</h3>    
                        
                        
                        <div className="input-group">
                        <label htmlFor="#e-mail">E-mail: </label>
                        <input
                            type="email"
                            id="e-mail"
                            {...register("email", {
                            placeholder: "user@mail.com",
                            pattern: "[A-Za-z0-9._+\n-']+@[A-Za-z0-9.\n-]+\n.[A-Za-z]{2,}$",
                            minLength: 5,
                            maxLength: 50,
                            required: true
                            })}/>
                        </div>
                        

                        <div className="input-group">
                        <label htmlFor="#password">Contraseña: </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password",{
                            minLength: 4,
                            maxLength: 20,
                            placeholder: "Ingrese su Contraseña",
                            required: true
                            })}/>
                        </div>
                        

                        <div className="input-group-boton">
                        
                        <button type="submit">Ingresar</button> 
                        
                        </div>
                    </form>
                    </div>
                </section>
            </main>
        </>
        
    )
}
