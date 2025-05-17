import axios from "axios";
import React, {useState}  from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Criar.module.css";

export default function Criar() {
    const [values, setValues] = useState({
        name:'',
        genero:'',
        ano:''
    });
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://6827a1336b7628c52910fbcd.mockapi.io/movies', values)
            .then (res => {
                console.log(res);
                navigate('/');
            })
            .catch( err => console.log(err));
    }
    return (
        <div className={styles.centered}>
            <div className={styles.custom}>
                <h1>Criar Filme</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.texto}>
                        <label htmlFor="name">Nome:</label>
                        <input type="text" name="name" placeholder="Digite o nome do filme" onChange={e => setValues({...values, name: e.target.value})} required/>
                    </div>
                    <div className={styles.texto}>
                        <label htmlFor="genero">Gênero:</label>
                        <input type="text" name="genero" placeholder="Digite o gênero do filme" onChange={e => setValues({...values, genero: e.target.value})} required/>
                    </div>
                    <div className={styles.texto}>
                        <label htmlFor="ano">Ano:</label>
                        <input type="text" name="ano" placeholder="Digite o ano do filme" onChange={e => setValues({...values, ano: e.target.value})} required/>
                    </div>
                    <input type="submit" value="Criar" className={styles.criar}/>
                    <Link to={"/"}><button className={styles.voltar}>Voltar</button></Link>
                </form>
            </div>
        </div>
    )
}