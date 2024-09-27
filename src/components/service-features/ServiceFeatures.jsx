import "./servicefeatures.css";

export default function ServiceFeatures() {
    return (
        <section className="service-features">
            <article className="features">
                <img
                    className="features-img"
                    src="https://i.ibb.co/nCrf0Kg/atencion-bot.webp"
                    alt="atencion-bot"
                />
                <div className="features-description">
                    Atención virtual automatizada las 24 horas
                </div>
            </article>
            <article className="features">
                <img
                    className="features-img"
                    src="https://i.ibb.co/k46Yt2S/envio.png"
                    alt="envio"
                />
                <div className="features-description">
                    Hacemos Envíos con seguimiento online
                </div>
            </article>
            <article className="features">
                <img
                    className="features-img"
                    src="https://i.ibb.co/4jrzLQM/mercadolibre-platinium.webp"
                    alt="tienda-platinum"
                />
                <div className="features-description">Tienda platinum en Mercado libre</div>
            </article>
        </section>
    )
}
