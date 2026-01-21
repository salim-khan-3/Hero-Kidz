import Hero from '@/components/Home/Hero';
import Products from '@/components/Home/Products';
import React from 'react';

const Home = () => {
  return (
    <>
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