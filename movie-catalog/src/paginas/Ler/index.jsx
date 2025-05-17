import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './Ler.module.css';

export default function Ler() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://6827a1336b7628c52910fbcd.mockapi.io/movies/${id}`)
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("Erro ao carregar os detalhes do filme. Tente novamente mais tarde.");
                setIsLoading(false);
            });
    }, [id]);

    // Usa uma imagem padrão se não houver imagem salva
    const imageUrl = data.imageUrl || "https://via.placeholder.com/300x450/121212/009688?text=Sem+Imagem";

    return (
        <div className={styles.centered}>
            <div className={styles.custom}>
                <h1>Detalhes do Filme</h1>

                {isLoading ? (
                    <div className={styles.loading}>Carregando...</div>
                ) : error ? (
                    <div className={styles.error}>{error}</div>
                ) : (
                    <div className={styles.detailsContainer}>
                        <div className={styles.posterContainer}>
                            <img src={imageUrl} alt={data.name} className={styles.poster} 
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/300x450/121212/009688?text=Imagem+Inválida";
                                }}
                            />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.infoItem}>
                                <strong>ID: </strong>{data.id}
                            </div>
                            <div className={styles.infoItem}>
                                <strong>Nome: </strong>{data.name}
                            </div>
                            <div className={styles.infoItem}>
                                <strong>Gênero: </strong>{data.genero}
                            </div>
                            <div className={styles.infoItem}>
                                <strong>Ano: </strong>{data.ano}
                            </div>
                        </div>
                    </div>
                )}
                <Link to="/"><button className={styles.voltar}>Voltar</button></Link>
            </div>
        </div>
    );
}