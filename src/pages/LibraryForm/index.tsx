import React,{FormEvent, useState} from 'react'
import {useHistory}from 'react-router-dom'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import './styles.css'
import Textare from '../../components/Textarea'

import warningIcon from '../../assets/images/icons/warning.svg'


import api from '../../services/api'

function WordForm(){
//para redicionar assim que fizer o cadastro
    const history = useHistory();
//para cadastrar na api o formulario  {nome, imagem, whatsapp, e bio}
    const [word, setWord] = useState('');        
    const [translated, setTranslated] = useState('');    
    const [coment, setComent] = useState('');
 




    //funcao para o funcionamento do cadastro


    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('/words', {
            word,
            translated,
            coment,
          
 
       
        }).then(()=>{
            alert('Слова добавлено!')

            //redicionar
            history.push('/')

        }).catch(()=>{
            alert('О шибка добавить')
        })
    }


    return(
        
        <div id="page-user-form" className="container">
            <PageHeader 
           title="Запомни свои любимые слова"
           description="Написать слова"           
           />
          


           <main>
               <form onSubmit={handleCreateClass}>
               <fieldset>
                   <legend>Введите слова</legend>
                    <Input 
                        name="word" 
                        label="Слова" 
                        placeholder="Напиши слово"
                        value={word} 
                        onChange={(e) =>{ setWord(e.target.value)}}
                    />
                    <Input 
                        name="transleted" 
                        label="Перевод" 
                        placeholder="Напиши слово"
                        value={translated} 
                        onChange={(e) =>{ setTranslated(e.target.value)}}
                    />
                       <Textare 
                        name="coment" 
                        label="комментарий"
                        placeholder="Например, как говорить "
                        value={coment} 
                        onChange={(e) =>{ setComent(e.target.value)}}  
                    />
                   
               </fieldset>        
              
               <footer>
                   <p>
                       <img src={warningIcon} alt="Важный"/>
                       Важный! <br/>
                       улучшить свою память
                   </p>
                   <button type="submit">добавлять слово</button>

               </footer>
               </form>
           </main>
         </div>


    )
}
export default WordForm;