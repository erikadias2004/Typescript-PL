import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type Props = {
    botoes: string[],
    seletorView: (valor: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const BarraNavegacao: React.FC<Props> = ({ botoes, seletorView }) => {

    const gerarListaBotoes = () => {
        if (botoes.length <= 0) {
            return <></>;
        } else {
            return botoes.map(valor =>
                <li key={valor} className="nav-item">
                    <a className="nav-link text-white" href="#" onClick={(e) => seletorView(valor, e)}>{valor}</a>
                </li>
            );
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: "blue", marginBottom: 10, padding: '1rem 2rem' }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-white">PetLovers</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav text-white">
                            {gerarListaBotoes()}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default BarraNavegacao;
