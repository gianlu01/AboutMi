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
                            <h2>I migliori bar di Milano!</h2>
                            <p>Visita i migliori bar della città. Trova il giusto locale per i tuoi gusti. Now for manners use has company believe parlors. Least nor party who wrote while did. Excuse formed as is agreed admire so on.</p>
                            <div className="btn">Vedi mappa</div>
                        </div>
                    </div>
                </section>
                <section className="section-discoteche">
                    <div className="bg-filter"></div>
                    <div className="container">
                        <div className="text-wrapper">
                            <h2>Sabato sera a Milano?</h2>
                            <p>Visita i migliori bar della città. Trova il giusto locale per i tuoi gusti. Now for manners use has company believe parlors. Least nor party who wrote while did. Excuse formed as is agreed admire so on.</p>
                            <div className="btn">Vedi mappa</div>
                        </div>
                    </div>
                </section>
            </main>

        );
    }
}


export default HomePage;
