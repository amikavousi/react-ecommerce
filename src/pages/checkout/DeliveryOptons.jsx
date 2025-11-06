import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function DeliveryOptions({ option, cartItem, loadCart }) {

    let shippingPrice = "FREE Shipping";

    if (option.priceCents > 0) {
        shippingPrice = formatMoney(option.priceCents);
    }

    const updateDeliveryOption = async () => {
        await axios.put(`/api/cart-items/${cartItem.product.id}`, {
            deliveryOptionId: option.id
        });

        await loadCart();
    }


    return (
        <div key={option.id} className="delivery-option" onClick={updateDeliveryOption}>
            <input type="radio"
                checked={cartItem.deliveryOptionId === option.id}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
                onChange={() => { }}
            />
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
}