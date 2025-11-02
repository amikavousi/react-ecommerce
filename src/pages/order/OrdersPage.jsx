import './OrdersPage.css';
import { Header } from '../../components/Header';
import { ProductDetails } from './ProductDetails.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

export function OrdersPage({ cart }) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders?expand=products').then(response => {
      setOrders(response.data);
    })
  }, []);

  return (
    <>
      <Header cartItems={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.length > 0 && orders.map(order => {
            return (
              <div key={order.id} className="order-container">

                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM d')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">

                  {order.products.map(orderProduct => {
                   return (
                    <ProductDetails key={orderProduct.id} orderProduct={orderProduct} />
                   );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}