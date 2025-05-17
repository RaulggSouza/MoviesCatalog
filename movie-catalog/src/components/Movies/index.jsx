import { Link } from 'react-router-dom';
import styles from "./Movies.module.css";

export default function Movies({ movie }) {
    // Usa uma imagem padrão se não houver imagem salva
    const imageUrl = movie.imageUrl || "https://via.placeholder.com/300x450/121212/009688?text=Sem+Imagem";
    
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={movie.name} className={styles.image} />
                <div className={styles.overlay}>
                    <Link to={`/ler/${movie.id}`} className={styles.detailsButton}>
                        Ver Detalhes
                    </Link>
                </div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{movie.name}</h3>
                <div className={styles.meta}>
                    <span className={styles.genre}>{movie.genero}</span>
                    <span className={styles.year}>{movie.ano}</span>
                </div>
            </div>
        </div>
    );
}