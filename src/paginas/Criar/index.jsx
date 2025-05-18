import axios from "axios";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Criar.module.css";

export default function Criar() {
    const [values, setValues] = useState({
        name: '',
        genero: '',
        ano: '',
        imageUrl: ''
    });
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://6827a1336b7628c52910fbcd.mockapi.io/movies', values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setValues({...values, imageUrl: url});
        setPreviewImage(url);
    }
    
    return (
        <div className={styles.centered}>
            <div className={styles.custom}>
                <h1>Criar Filme</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formContainer}>
                        <div className={styles.formFields}>
                            <div className={styles.texto}>
                                <label htmlFor="name">Nome:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Digite o nome do filme" 
                                    value={values.name}
                                    onChange={e => setValues({...values, name: e.target.value})} 
                                    required
                                />
                            </div>
                            <div className={styles.texto}>
                                <label htmlFor="genero">Gênero:</label>
                                <input 
                                    type="text" 
                                    name="genero" 
                                    placeholder="Digite o gênero do filme" 
                                    value={values.genero}
                                    onChange={e => setValues({...values, genero: e.target.value})} 
                                    required
                                />
                            </div>
                            <div className={styles.texto}>
                                <label htmlFor="ano">Ano:</label>
                                <input 
                                    type="text" 
                                    name="ano" 
                                    placeholder="Digite o ano do filme" 
                                    value={values.ano}
                                    onChange={e => setValues({...values, ano: e.target.value})} 
                                    required
                                />
                            </div>
                            <div className={styles.texto}>
                                <label htmlFor="imageUrl">URL da Imagem:</label>
                                <input 
                                    type="url" 
                                    name="imageUrl" 
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
                        <button type="submit" className={styles.criar}>Criar</button>
                        <Link to={"/"}><button type="button" className={styles.voltar}>Voltar</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}