import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Inicio.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Inicio(){

    const [data, setData] = useState([]);
    
    const navigate = useNavigate();

    useEffect( () => {
        axios.get('https://6827a1336b7628c52910fbcd.mockapi.io/movies')
            .then( res => setData(res.data))
            .catch( err => console.log(err))
    }, []);

    return (
        <main className={styles.centered}>
            <h1>Lista de Filmes</h1>
            <div className={styles.custom}>
                <table className={styles.striped}>
                    <tbody>
                        {
                            data.map( (d, i) => (
                                    <tr key={i} onClick={() => navigate(`/ler/${d.id}`)}>
                                        <td><b>Id:</b>{d.id}</td>
                                        <td><b>Nome:</b> {d.name}</td>
                                    </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );
}