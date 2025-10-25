import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import "./HomePage.css";


export function HomePage() {

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products').then(response => {
            setProducts(response.data);
        });

        axios.get('http://localhost:3000/api/cart-items').then(response => {
            console.log(response.data);
            setCartItems(response.data);
        });

    }, []);

    return (
        <>
            <Header cartItems={cartItems} />

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