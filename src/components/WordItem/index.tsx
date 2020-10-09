import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api'
import './styles.css'


export interface Words{
        id: number
        word:string;
        translated:string;
        coment:string;
     
     

}

interface WordItemProps{
    words: Words;
}

const  TransletedItem: React.FC<WordItemProps> = ({words})=>{
//связь c API
    function createNewConnection(){
        api.post('/connections',{
            library_id: words.id,
        })
    }
    return(
        <article className="word-item">
        <header>
                <h3><b>{words.translated}</b></h3> 
            <div className="word">
                <div>
                    <p>{words.word}</p>
                    <span>{words.coment}</span>
                </div>
             
                      
     
                 
    
               
        
        
             
            </div>
        </header>
        
       </article>
    )
}

export default TransletedItem;