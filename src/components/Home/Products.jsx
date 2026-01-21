import ProductsPage from '@/app/products/page';
import React from 'react';

const Products = () => {
    return (
        <div className='container mx-auto'>
            <h1 className='text-2xl text-blue-950 font-bold'>All Products Here</h1>

            <ProductsPage></ProductsPage>
        </div>
    );
};

export default Products;