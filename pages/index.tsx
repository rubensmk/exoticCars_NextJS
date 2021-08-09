/* eslint-disable @next/next/link-passhref */

import { GetStaticProps } from 'next';
import React from 'react';
import CarCard from '../components/CarCard';
import Header from '../components/Header';
import styles from '../styles/home.module.scss'
import Link from 'next/link'

export interface ICarDetails {
  id: number;
  color: string;
  icon_image: string;
  main_image: string;
}
export interface ICar {
  id: number;
  model: string;
  maker: string;
  price: number;
  image: string;
  logo: string;
  details: ICarDetails[];
}

export default function Home({ allCars }: any) {

  return (
    <>
      <Header />
      <main className={`${styles.container} ${styles.fadeInImage}`}>
        {allCars.map((car: any) => (
          <Link href={`details/${car.id}`} key={car.id}>
            <CarCard
              data={car}

            />
          </Link>

        ))}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/cars')
  const data = await response.json()

  return {
    props: {
      allCars: data.cars,
    },
    revalidate: 60 * 60 * 24
  }
}