import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header.jsx';
import { ProductCard } from './ProductCard.jsx';
import "./HomePage.css";


export function HomePage({cart}) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        });

    }, []);

    return (
        <>
            <Header cartItems={cart} />

            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}