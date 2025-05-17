import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Inicio.module.css';
import { Link } from 'react-router-dom';
import Movies from '../../components/Movies';

export default function Inicio(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://6827a1336b7628c52910fbcd.mockapi.io/movies')
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("Erro ao carregar os filmes. Tente novamente mais tarde.");
                setIsLoading(false);
            });
    }, []);

    return (
        <main className={styles.centered}>
            <h1>Catálogo de Filmes</h1>
            
            {isLoading ? (
                <div className={styles.loading}>Carregando...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {data.map((movie) => (
                            <div key={movie.id} className={styles.gridItem}>
                                <Movies movie={movie} />
                            </div>
                        ))}
                    </div>
                    
                    <Link to="/criar" className={styles.addButton}>
                        <span className={styles.addIcon}>+</span>
                        Adicionar Filme
                    </Link>
                </>
            )}
        </main>
    );
}