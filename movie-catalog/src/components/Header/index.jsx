import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import HeaderLink from '../HeaderLink';

export default function Header(){
    const localizacao = useLocation();

    return (
        <header>
            <nav className={styles.navegacao}>
                <HeaderLink to="/">
                    <span className={styles.link}>Início</span>
                </HeaderLink>
                <HeaderLink to="/criar">
                    <span className={styles.link}>Criar</span>
                </HeaderLink>
                <HeaderLink to="/apagar">
                    <span className={styles.link}>Apagar</span>
                </HeaderLink>
                <HeaderLink to="/alterar">
                    <span className={styles.link}>Alterar</span>
                </HeaderLink>
            </nav>
        </header>
    )
}