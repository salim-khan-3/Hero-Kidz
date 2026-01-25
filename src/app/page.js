import Hero from '@/components/Home/Hero';
import Products from '@/components/Home/Products';
import Tast from '@/components/Tast';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const Home = async() => {

  const session = await getServerSession(authOptions);
  return (
    <>
    <Tast></Tast>
    <p>{JSON.stringify(session)}</p>
      <section>
        <Hero></Hero>
      </section>
      <section>
        <Products></Products>
      </section>
    </>
  );
};

export default Home;