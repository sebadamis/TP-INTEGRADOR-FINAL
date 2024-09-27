import "./AboutUs.css";
import "../../index.css";


export default function AboutUs() {
    return (
        <>
            <main className="main-container">
                    <section className="about-us-section">
                        <div className="titulo-sub-container">
                            <h1 className="section-title">Acerca de nosotros</h1>
                            <div className="section-subtitle">
                                conoce cuales son nuestros manejos como empresa y nuestra filosofia
                            </div>
                        </div>
                    </section>
                    <section className="eshop-section">
                        <div className="about-us-img-container">
                            <div className="logo-span-container">
                                <img
                                className="logo-foto"
                                src="https://i.ibb.co/7gMjKyK/e-shop-logo.webp"
                                alt="logo-eshop"
                                />
                                <span>E-SHOP</span>
                            </div>
                            <div className="imagen-container">
                                <img
                                className="otras-fotos"
                                src="https://i.ibb.co/6bd6QYc/3.webp"
                                alt="html-logo"
                                />
                            </div>
                            <div className="imagen-container">
                                <img
                                className="foto-personal"
                                src="https://i.ibb.co/px6Vmdq/2.webp"
                                alt="css-logo"
                                />
                            </div>
                            <div className="imagen-container">
                                <img
                                className="otras-fotos"
                                src="https://i.ibb.co/f43HCqD/4.webp"
                                alt="bootstrap-logo"
                                />
                            </div>
                            <div className="imagen-container">
                                <img
                                className="foto-personal"
                                src="https://i.ibb.co/pbhCLGv/react.webp"
                                alt="bootstrap-logo"
                                />
                            </div>
                            <div className="imagen-container">
                                <img
                                className="foto-personal"
                                src="https://i.ibb.co/28tycT1/1.webp"
                                alt="foto-personal"
                                />
                            </div>
                        </div>
                    </section>
                    <div className="about-us-info">
                        <p>
                        El sitio fue realizado por: Sebastián Damis. Aspirante a FULL STACK
                        ENGINEER, actualmente en curso en EDUCATION IT.
                        </p>
                        <p>
                        La página fue desarrollada en las siguientes tecnologías: HTML 5, CSS3, REACT y
                        Bootsrap (sólo en Carousel).
                        </p>
                        <p>
                        E-SHOP es un E-commerse especializada en la venta de Notebooks, PC armadas
                        y componentes tanto como para ofimática como para el rubro GAMING.
                        </p>
                        <p>
                        La particularidad de la empresa es que cuenta con trayectoria en el rubro
                        como así también en la plataforma MERCADOLIBRE en la cual contamos con una
                        tienda Premium en donde también ofertammos nuestros productos.
                        </p>
                        <p>
                        La tienda E-SHOP cuenta con un diseño responsive lo que permite su
                        visualización en forma Multi-plataforma (varios dispositivos de distintos
                        tamaños).
                        </p>
                    </div>
            </main>
        </>
    )
}
