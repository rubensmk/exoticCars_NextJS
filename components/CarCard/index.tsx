/* eslint-disable @next/next/no-img-element */
import { FiMoreHorizontal } from 'react-icons/fi';
import { ICarDetails } from '../../pages/index';
import styles from './styles.module.scss'


interface CarProps {
    data: {
        id: number;
        model: string;
        maker: string;
        price: number;
        image: string;
        logo: string;
        details: ICarDetails[];
    };
    onClick?: () => void;
}
const CarCard = ({ data, onClick }: CarProps): JSX.Element => {
    return (
        <>
            <div onClick={onClick} className={styles.cardContainer}>
                <section className={styles.title}>
                    <div >
                        <strong>{data.maker}</strong>
                        <p>{data.model.toUpperCase()}</p>
                    </div>
                    <FiMoreHorizontal />
                </section>
                <div className={styles.carImg}>
                    <img src={`${data.image}`} alt={data.model} />
                </div>
                <div className={styles.price}>
                    <h2>$</h2>
                    <h1>{data.price} </h1>
                    <p>/day</p>
                </div>
            </div>
        </>
    );
};

export default CarCard;