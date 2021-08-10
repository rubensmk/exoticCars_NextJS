import React from 'react';
import { MdPlace, MdToday, MdSearch, MdFilter, MdFilterList } from 'react-icons/md';
import styles from './styles.module.scss'

const Header: React.FC = () => {
    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.logo}>
                    <strong>EXOTIC</strong>
                    <p>CARS</p>
                </div>
                <section className={styles.searchBar}>
                    <div className={styles.filtersIcon}>
                        <MdFilterList />
                    </div>
                    <div className={styles.filters}>
                        <div>
                            <MdPlace />
                            <p>North Carolina, NC 90025</p>
                        </div>
                        <div>
                            <MdToday />
                            <p>11/03/2021</p>
                        </div>
                        <div>
                            <MdToday />
                            <p>12/12/2021</p>
                        </div>
                    </div>
                    <div className={styles.searchIcon}>
                        <MdSearch />
                    </div>
                </section>
                <nav className={styles.navBar}>
                    <button className={styles.signUpButton}>Sign Up</button>
                    <button className={styles.signInButton}>Sign In</button>
                </nav>
            </header>
        </>
    );
};

export default Header;