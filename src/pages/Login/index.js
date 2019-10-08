import React, {useState} from 'react';
import api from '../../services/api'

export default function Login({history}){
    const [email, setEmail] = useState('');

    async function handleSubmit(event){
        event.preventDefault(); //evita q mude de tela
        const response = await api.post('/sessions', { email })
        
        const { _id} =response.data;
        console.log("id do usuario: ", _id)

        localStorage.setItem('user', _id) // armazena da cache do navegador

        history.push('/dashboard')
    }
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para proramadores
                e encontre <strong>talentos</strong> para sua empresa.
            </p>
            <form onSubmit ={handleSubmit}>
                <label htmlFor="email">E-MAIL</label>
                <input 
                    type="email" 
                    id= "email" 
                    placeholder = "Seu melhor e-mail" 
                    value = {email}
                    onChange = {event => setEmail(event.target.value)}
                    />
                <button className='btn' type= "submit">Entrar</button>
            </form>
        </>
    )
}