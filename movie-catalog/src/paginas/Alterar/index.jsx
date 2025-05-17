import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Alterar.module.css";

export default function Alterar() {
    // Estados
    const [movieId, setMovieId] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [values, setValues] = useState({
        name: '',
        genero: '',
        ano: '',
        imageUrl: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
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
                setValues({
                    name: res.data.name,
                    genero: res.data.genero,
                    ano: res.data.ano,
                    imageUrl: res.data.imageUrl || ''
                });
                setPreviewImage(res.data.imageUrl || '');
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("Filme não encontrado ou erro ao buscar dados.");
                setSelectedMovie(null);
                setIsLoading(false);
            });
    };

    // Gerencia a alteração da URL da imagem
    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setValues({...values, imageUrl: url});
        setPreviewImage(url);
    };

    // Envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedMovie) return;

        setIsLoading(true);
        axios.put(`https://6827a1336b7628c52910fbcd.mockapi.io/movies/${selectedMovie.id}`, values)
            .then(res => {
                console.log("Filme atualizado com sucesso", res.data);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setError("Erro ao atualizar o filme.");
                setIsLoading(false);
            });
    };

    // Resetar para buscar outro filme
    const handleReset = () => {
        setMovieId('');
        setSelectedMovie(null);
        setValues({
            name: '',
            genero: '',
            ano: '',
            imageUrl: ''
        });
        setPreviewImage('');
        setError(null);
        setSearchAttempted(false);
    };

    return (
        <div className={styles.centered}>
            <div className={styles.custom}>
                <h1>Alterar Filme</h1>
                
                {/* Etapa 1: Busca inicial - mostrar apenas se não houver filme selecionado e nem erro após busca */}
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
                                <button className={styles.cancelar}>Cancelar</button>
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
                
                {/* Etapa 3: Filme encontrado - Form de edição */}
                {selectedMovie && !isLoading && (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formContainer}>
                            <div className={styles.formFields}>
                                <div className={styles.texto}>
                                    <label htmlFor="name">Nome:</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        value={values.name}
                                        onChange={e => setValues({...values, name: e.target.value})} 
                                        required
                                    />
                                </div>
                                <div className={styles.texto}>
                                    <label htmlFor="genero">Gênero:</label>
                                    <input 
                                        type="text" 
                                        id="genero" 
                                        value={values.genero}
                                        onChange={e => setValues({...values, genero: e.target.value})} 
                                        required
                                    />
                                </div>
                                <div className={styles.texto}>
                                    <label htmlFor="ano">Ano:</label>
                                    <input 
                                        type="text" 
                                        id="ano" 
                                        value={values.ano}
                                        onChange={e => setValues({...values, ano: e.target.value})} 
                                        required
                                    />
                                </div>
                                <div className={styles.texto}>
                                    <label htmlFor="imageUrl">URL da Imagem:</label>
                                    <input 
                                        type="url" 
                                        id="imageUrl" 
                                        placeholder="Cole a URL da imagem do filme" 
                                        value={values.imageUrl}
                                        onChange={handleImageUrlChange} 
                                    />
                                    <small className={styles.imageHelp}>
                                        Cole uma URL válida de imagem para o poster do filme
                                    </small>
                                </div>
                            </div>
                            
                            <div className={styles.imagePreview}>
                                {previewImage ? (
                                    <img 
                                        src={previewImage} 
                                        alt="Preview" 
                                        className={styles.previewImg} 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/300x450/121212/009688?text=Imagem+Inválida";
                                        }}
                                    />
                                ) : (
                                    <div className={styles.noPreview}>
                                        <span>Preview da imagem</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className={styles.botoesContainer}>
                            <button type="submit" className={styles.salvar}>Alterar</button>
                            <Link to="/">
                                <button type="button" className={styles.cancelar}>Cancelar</button>
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}