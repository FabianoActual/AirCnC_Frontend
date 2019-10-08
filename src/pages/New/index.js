import React, {useState, useMemo} from 'react';
import api from '../../services/api';
import './styles.css';

import camera from '../../assets/camera.svg';

export default function New({ history }){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbanil, setThumbanil] = useState(null);

    const preview = useMemo(
        ()=>{
            return thumbanil ? URL.createObjectURL(thumbanil) : null;
        },
        [thumbanil] //quando alterado executa
    )


    async function handleSubmit(event){
        event.preventDefault();
        console.log("aqui 0 ")
        const data = new FormData;
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbanil);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        console.log("aqui 01", data)
        const response = await api.post( '/spot', data,{
            headers: {user_id}
        })
        
        console.log("aqui 02", response)
        history.push('/dashboard');
    }
    return (
        <form onSubmit ={handleSubmit}>
        <label 
        id="thumbnail" 
        style = {{backgroundImage: `url(${preview})`}}
        className={thumbanil ? 'has-tumbnail': ''}
        >
            <input type="file" onChange ={event => setThumbanil(event.target.files[0]) } />
            <img src={camera} alt="select img"/>
        </label>

            <label htmlFor = "company">EMPRESA</label>
            <input
                id="company"
                placeholder = "Sua empresa"
                value = {company}
                onChange={event => setCompany(event.target.value)}
                />

            <label htmlFor = "techs">TECNOLOGIAS * <span>(Separadas por virgula)</span> </label>
            <input
                id="techs"
                placeholder = "Quais tecnologias usam"
                value = {techs}
                onChange={event => setTechs(event.target.value)}
                />

            <label htmlFor = "price">VALOR DA DIARIA  </label>
            <input
                id="price"
                placeholder = "Valor cobrado por dia"
                value = {price}
                onChange={event => setPrice(event.target.value)}
                />

            <button type="submit" className="btn" >Cadastrar</button>
        </form>
    )
}