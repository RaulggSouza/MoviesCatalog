import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Apagar.module.css";
import Swal from 'sweetalert2';

export default function Apagar() {
    // Estados
    const [movieId, setMovieId] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchAttempted, setSearchAttempted] = useState(false);
    const navigate = useNavigate();

    // Buscar filme pelo ID
    const handleSearch = () => {
        if (!movieId.trim()) return;
        
        setIsLoading(true);
        setError(null);
        setSearchAttempted(true);
        
        axios.get(`https://6827a1336b7628c52910fbcd.mockapi.io/movies/${movieId}`)
            .then(res => {
                setSelectedMovie(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("Filme não encontrado ou erro ao buscar dados.");
                setSelectedMovie(null);
                setIsLoading(false);
            });
    };

    // Excluir o filme
    const handleDelete = () => {
        if (!selectedMovie) return;

        Swal.fire({
            title: 'Confirmação',
            text: `Tem certeza que deseja apagar o filme "${selectedMovie.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff5252',
            cancelButtonColor: '#757575',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                axios.delete(`https://6827a1336b7628c52910fbcd.mockapi.io/movies/${selectedMovie.id}`)
                    .then(() => {
                        Swal.fire({
                            title: 'Apagado!',
                            text: 'O filme foi apagado com sucesso.',
                            icon: 'success',
                            confirmButtonColor: '#009688'
                        });
                        navigate('/');
                    })
                    .catch(err => {
                        console.log(err);
                        setIsLoading(false);
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível apagar o filme.',
                            icon: 'error',
                            confirmButtonColor: '#009688'
                        });
                    });
            }
        });
    };

    // Resetar para buscar outro filme
    const handleReset = () => {
        setMovieId('');
        setSelectedMovie(null);
        setError(null);
        setSearchAttempted(false);
    };

    return (
        <div className={styles.centered}>
            <div className={styles.custom}>
                <h1>Apagar Filme</h1>
                
                {/* Etapa 1: Busca inicial */}
                {!selectedMovie && !searchAttempted && !isLoading && (
                    <div className={styles.searchContainer}>
                        <div className={styles.texto}>
                            <label htmlFor="movieId">ID do Filme:</label>
                            <input 
                                type="text" 
                                id="movieId"
                                value={movieId}
                                onChange={e => setMovieId(e.target.value)}
                                placeholder="Digite o ID do filme"
                                required
                            />
                        </div>
                        <div className={styles.botoesContainer}>
                            <button 
                                className={styles.editar} 
                                onClick={handleSearch}
                            >
                                Procurar
                            </button>
                            <Link to="/">
                                <button className={styles.voltar}>Cancelar</button>
                            </Link>
                        </div>
                    </div>
                )}
                
                {/* Loading */}
                {isLoading && <p className={styles.loading}>Carregando...</p>}
                
                {/* Etapa 2: Filme não encontrado */}
                {searchAttempted && error && !isLoading && (
                    <div className={styles.errorContainer}>
                        <p className={styles.errorMessage}>{error}</p>
                        <div className={styles.botoesContainer}>
                            <button 
                                className={styles.voltar} 
                                onClick={handleReset}
                            >
                                Tentar Novamente
                            </button>
                            <Link to="/">
                                <button className={styles.cancelar}>Voltar para Início</button>
                            </Link>
                        </div>
                    </div>
                )}
                
                {/* Etapa 3: Filme encontrado - Detalhes e botão de confirmação */}
                {selectedMovie && !isLoading && (
                    <div className={styles.movieDetails}>
                        <h2>Detalhes do Filme</h2>
                        
                        <div className={styles.detailsContainer}>
                            {selectedMovie.imageUrl && (
                                <div className={styles.posterContainer}>
                                    <img 
                                        src={selectedMovie.imageUrl} 
                                        alt={selectedMovie.name} 
                                        className={styles.poster}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/300x450/121212/009688?text=Imagem+Inválida";
                                        }}
                                    />
                                </div>
                            )}
                            
                            <div className={styles.info}>
                                <div className={styles.infoItem}>
                                    <strong>ID:</strong> {selectedMovie.id}
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Nome:</strong> {selectedMovie.name}
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Gênero:</strong> {selectedMovie.genero}
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Ano:</strong> {selectedMovie.ano}
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.botoesContainer}>
                            <button 
                                className={styles.apagar}
                                onClick={handleDelete}
                            >
                                Apagar Filme
                            </button>
                            <Link to="/">
                                <button className={styles.cancelar}>Cancelar</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}