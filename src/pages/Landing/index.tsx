import React, {useState , useEffect } from 'react';
import  {Link} from 'react-router-dom'
import landingImg from '../../assets/images/logo.png';



import './styles.css'




function Landing(){
//criar um estado para conectar com a api
      



    return(
           <div id="page-landing">
                <div id="page-landing-content" className="container">
                    <div className="text-container">
                        <h2>Говорите немного По-русски и запоминайте наиболее часто используемые слова</h2>
                    </div>

                    <img src={landingImg} alt="Твой объем памяти" className="hero-image"/>
                    <div className="buttons-container">
                    <Link to="/find-words" className="btn-find">
                           
                           найти слова
                       </Link>
                        <Link to="/library" className="btn-add">                            
                            добавить слова
                        </Link>
                    </div>

                   
                </div>
           </div>
    )
}

export default Landing;