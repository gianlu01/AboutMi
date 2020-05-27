import React from 'react';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: "main"
        }
    }
    render() {


        return (
            <main>
                <section className="section-bar">
                    <div className="bg-filter"></div>
                    <div className="container">
                        <div className="text-wrapper">
                            <h2 className="h2-title">Aperitivo a Milano!?</h2>
                            <p className="paragraph">Ricerca il Bar più adatto a te tra tutti quelli nella città di Milano. Organizza un apertivo con i tuoi amici e goditi la città meneghina.</p>
                            <div className="custom-btn" onClick={() => {this.props.router("maps");}}>Vedi mappa</div>
                        </div>
                    </div>
                </section>
                <section className="section-discoteche">
                    <div className="bg-filter"></div>
                    <div className="container">
                        <div className="text-wrapper">
                            <h2 className="h2-title">Sabato sera a Milano?</h2>
                            <p className="paragraph">Diverti e svagati nella movida milanese assieme ai tuoi amici: ricerca il locale o discoteca più adatto a te e ai gusti dei tuoi soci!</p>
                            <div className="custom-btn" onClick={() => {this.props.router("maps");}}>Vedi mappa</div>
                        </div>
                    </div>
                </section>
                <section className="section-ristoranti">
                    <div className="bg-filter"></div>
                    <div className="container">
                        <div className="text-wrapper">
                            <h2 className="h2-title">Ristoranti a Milano</h2>
                            <p className="paragraph">Vuoi organizzare una cena in un ristorante o in una pizzeria con la tua fidanzata, i tuoi amici o i tuoi familiari? Tramite il nostro sito potrai ricercare il locale più adatto.</p>
                            <div className="custom-btn" onClick={()=>{this.props.router("maps")}}>Vedi mappa</div>
                        </div>
                    </div>
                </section>
                {/*
                <section className="section-eventi">
                    <div className="bg-filter"></div>
                    <div className="container">
                        <div className="text-wrapper">
                            <h2 className="h2-title">Tutti i principali eventi a Milano</h2>
                            <p className="paragraph">Visita i migliori ristoranti della città. Trova il giusto locale per i tuoi gusti. Now for manners use has company believe parlors. Least nor party who wrote while did. Excuse formed as is agreed admire so on.</p>
                            <div className="custom-btn" onClick={()=>{this.props.router("maps");}}>Vedi mappa</div>
                        </div>
                    </div>
                </section>
                */}
            </main>
        );
    }
}

export default HomePage;