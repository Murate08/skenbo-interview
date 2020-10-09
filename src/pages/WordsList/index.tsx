import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

import WordItem, {Words} from '../../components/WordItem';
import api from '../../services/api';


import './styles.css';


function WordsList(){
//salvar a lista de professores
        const [word, setWord] = useState([]);
        const [translated, setTranseleted] = useState('');
      
       

async function seachUsers(e: FormEvent){
           e.preventDefault();
           
const response = await  api.get('/words', {
               params:{
                translated,
               }
           })

           setWord(response.data)
        
       } 
    return(
        <div id="page-words-list" className="container">
            <PageHeader title="поиск слова">
                <form id="search-words" onSubmit={seachUsers}>
                    <Input
                        name="transleted"
                        label="Слова"
                        placeholder="получает перевод для слова"
                        value={translated} 
                        onChange={(e) =>{ setTranseleted(e.target.value)}}
                     />
                      
                    <button type="submit">
                        Получить перевод
                    </button>
                </form>
            </PageHeader>

            <main>
                {word.map((word: Words) =>{
                    return <WordItem key={word.id} words={word} />
                })}
           
 
           

            </main>

        </div>

    )
}
export default WordsList;