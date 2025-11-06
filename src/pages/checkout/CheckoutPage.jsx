import './CheckoutPage.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { CartItem } from './CartItem';
import './checkout-header.css';
import { formatMoney } from '../../utils/money';


export function CheckoutPage({ cart, loadCart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    const loadPaymentSummary = async () => {
        const response = await axios.get('/api/payment-summary');
        setPaymentSummary(response.data);
    };


    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime').then(response => {
            setDeliveryOptions(response.data);
        });

        loadPaymentSummary();
    }, [cart]);

    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">{paymentSummary && paymentSummary.totalItems} items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cart.map((cartItem) => {
                            return (<CartItem cartItem={cartItem} deliveryOptions={deliveryOptions} key={cartItem.productId} loadCart={loadCart} />);
                        })}

                    </div>

                    {paymentSummary && (
                        <>
                            <div className="payment-summary">
                                <div className="payment-summary-title">
                                    Payment Summary
                                </div>

                                <div className="payment-summary-row">
                                    <div>Items ({paymentSummary.totalItems}):</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}