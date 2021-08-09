import { GetStaticProps } from 'next';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { ICarDetails } from '..';

import ReactCarousel from '@brainhubeu/react-carousel';
import { arrowsPlugin, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import Header from '../../components/Header';
import styles from '../../styles/details/styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ISelectedCar {
    selectedCar: {
        id: number;
        image: string;
        model: string;
        maker: string;
        price: number;
        logo: string;
        details: ICarDetails[];
    }


}

export default function Car({ selectedCar }: ISelectedCar) {
    const [currentCar, setCurrentCar] = useState(1);

    const handleNextCar = async () => {
        if (currentCar == 2) {
            setCurrentCar(0)
        } else {
            setCurrentCar(prevState => prevState + 1);
        }

    }
    const handlePrevCar = async () => {
        if (currentCar == 0) {
            setCurrentCar(2)
        } else {
            setCurrentCar(prevState => prevState - 1);
        }

    }
    return (
        <>
            <Header />
            <main className={styles.container}>
                {!selectedCar.details && (
                    <section className={styles.title}>
                        <div>
                            <h1>Details not found</h1>
                        </div>
                        <div className={styles.goBack}>
                            <FiArrowLeft />
                            <Link href='/'>
                                Back to catalog
                            </Link>
                        </div>
                    </section>
                )}
                {selectedCar.details && (
                    <>
                        <section className={styles.title}>
                            <Image src={selectedCar.logo} alt={selectedCar.model} width={68} height={128} />
                            <div>
                                <h1>
                                    {selectedCar.model.toUpperCase()} {selectedCar.maker.toUpperCase()}
                                </h1>
                                <p>${selectedCar.price}/day</p>
                            </div>
                        </section>
                        <div className={styles.content}>
                            <div className={styles.goBackButton}>
                                <FiArrowLeft />
                                <Link href='/'>
                                    Back to catalog
                                </Link>
                            </div>
                            <div>
                                <Image
                                    src={selectedCar.details[currentCar].main_image}
                                    alt={selectedCar.details[currentCar].color}
                                    height={380}
                                    width={720}
                                />
                            </div>

                            <div>
                                <h1>0{selectedCar.details[currentCar].id}</h1>
                                <p>{selectedCar.details[currentCar].color.toUpperCase()}</p>
                            </div>
                        </div>
                        <div className={styles.bookNow}>
                            Book Now
                            <FiArrowRight />
                        </div>
                        <div className={styles.carousel}>
                            <button type='button' onClick={handlePrevCar}>
                                <FiArrowLeft />
                            </button >
                            <Image
                                src={selectedCar.details[currentCar == 0 ? 2 : currentCar - 1]?.icon_image}
                                alt={selectedCar.model}
                                height={180}
                                width={300}
                            />
                            <Image
                                src={selectedCar.details[currentCar].icon_image}
                                alt={selectedCar.model}
                                height={240}
                                width={360}
                                className={styles.carouselImg}
                            />
                            <Image
                                src={selectedCar.details[currentCar == 2 ? 0 : currentCar + 1]?.icon_image}
                                alt={selectedCar.model}
                                height={180}
                                width={300}
                            />
                            <button type='button' onClick={handleNextCar}>
                                <FiArrowRight />
                            </button>
                        </div>
                    </>
                )}

            </main>
        </>
    );
};

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const carId = params?.carId;

    const response = await fetch(`http://localhost:3000/api/details/${carId}/`)
    const data = await response.json()
    return {
        props: {
            selectedCar: data.selectedCar[0]
        },
        revalidate: 60 * 60 * 24
    }
}