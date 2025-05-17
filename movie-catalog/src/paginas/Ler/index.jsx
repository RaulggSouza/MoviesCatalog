import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import styles from './Ler.module.css';

export default function Ler() {
    const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect( () => {
        axios.get('https://6827a1336b7628c52910fbcd.mockapi.io/movies/' + id)
            .then( res => setData(res.data))
            .catch( err => console.log(err))
    }, []);

    return (
        <div className={styles.centered}>
            <div className={styles.custom}>
                <h1>Detalhes do Filme</h1>

                <div>
                    <strong>Nome: </strong>{data.name}
                </div>
                <div>
                    <strong>Gênero: </strong>{data.genero}
                </div>
                <div>
                    <strong>Ano: </strong>{data.ano}
                </div>
                <Link to={"/"}><button className={styles.voltar}>Voltar</button></Link>
            </div>
        </div>
    )
}