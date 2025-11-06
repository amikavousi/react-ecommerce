import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function ProductCard({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);

    function selectQuantity(event) {
        setQuantity(Number(event.target.value));
    }

    // function addToCart() {
    //    axios.post('/api/cart-items', {
    //         productId: product.id,
    //         quantity
    //     });

    //     loadCart();
    // }

    const addToCart = async () => {
        // we should await the axios post request to ensure it completes before loading the cart
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity
        });

        await loadCart();
    }

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container"
                onChange={selectQuantity}
            >
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
                onClick={addToCart}
            >
                Add to Cart
            </button>
        </div>
    );
}