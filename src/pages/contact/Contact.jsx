import './Contact.css';
// import '../../styles/form.css'

export default function Contact() {
  return (
    <>
        <main className="main-container">
          <section className="contact-section">
            <div className="titulo-sub-container">
              <h1 className="section-title">Contacto</h1>
              <div className="section-subtitle">
                Completa el formulario para poder contactarte con nosotros
              </div>
            </div>
            <div className="contact-container">
              <div className="contact-form">
                <h2 className="contact-form-title">Formulario contacto</h2>
                <form className='form-contact'>
                  <div className="input-group">
                    <label htmlFor="fullname" className="input-label">
                      Nombre Completo:{" "}
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      required=""
                      minLength={4}
                      maxLength={80}
                      autoFocus=""
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="mail" className="input-label">
                      Mail:{" "}
                    </label>
                    <input
                      type="email"
                      name="mail"
                      id="mail"
                      required=""
                      minLength={10}
                      maxLength={100}
                      placeholder="ejemplo@correo.com"
                      pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="comentario" className="input-label">
                      Deja tu comentario:{" "}
                    </label>
                    <textarea
                      name="comentario"
                      id="comentario"
                      placeholder="escribe tu comentario aqui"
                      maxLength={150}
                      defaultValue={""}
                    />
                  </div>
                  <div className="input-group-boton">
                    <button type="submit">Enviar</button>
                  </div>
                </form>
              </div>
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.5389589178913!2d-58.38151502425923!3d-34.61581807294998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccad63da4ce27%3A0xfe5fa674225a91bf!2sTacuar%C3%AD%20655%2C%20C1071AAM%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1716784919987!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </main>

    </>

  )
}
