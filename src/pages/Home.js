import React from 'react';
import ProductSection from '../components/ProductSection';
import { Header } from '../components/Header'; // Named import (curly braces)

const Home = () => {
  return (
    <div>
      <Header />
      <div className="mt">
        <ProductSection />
      </div>
    </div>
  );
};

export default Home;
