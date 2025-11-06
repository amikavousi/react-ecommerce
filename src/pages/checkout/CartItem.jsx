import dayjs from 'dayjs';
import axios from 'axios';
import { formatMoney } from '../../utils/money';


export function CartItem({ cartItem, loadCart, deliveryOptions }) {

    const selectedDeliveryDate = deliveryOptions.find((deliveryOption) => {
        return deliveryOption.id === cartItem.deliveryOptionId
    });

    const deleteFromCart = async () => {
        await axios.delete(`/api/cart-items/${cartItem.product.id}`);
        loadCart();
    }

    return (
        <div className="cart-item-container">
            <div className="delivery-date">
                Delivery date: {dayjs(selectedDeliveryDate.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
                <img className="product-image"
                    src={cartItem.product.image} />

                <div className="cart-item-details">
                    <div className="product-name">
                        {cartItem.product.name}
                    </div>
                    <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                        <span>
                            Quantity: <span className="quantity-label">
                                {cartItem.quantity}
                            </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                            Update
                        </span>
                        <span className="delete-quantity-link link-primary"
                            onClick={deleteFromCart}>
                            Delete
                        </span>
                    </div>
                </div>

                <div className="delivery-options">
                    <div className="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    {deliveryOptions.length > 0 && deliveryOptions.map((option) => {
                        let shippingPrice = "FREE Shipping";

                        if (option.priceCents > 0) {
                            shippingPrice = formatMoney(option.priceCents);
                        }

                        return (
                            <div key={option.id} className="delivery-option">
                                <input type="radio" checked={cartItem.deliveryOptionId === option.id}
                                    className="delivery-option-input"
                                    name={`delivery-option-${cartItem.productId}`} />
                                <div>
                                    <div className="delivery-option-date">
                                        {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                    </div>
                                    <div className="delivery-option-price">
                                        {shippingPrice}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}