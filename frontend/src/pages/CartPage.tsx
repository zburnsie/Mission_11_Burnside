import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div key={item.bookId} className="col-12 mb-3 border-bottom pb-2">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <strong>{item.title}</strong>
                  </div>
                  <div className="col-md-2">${item.price.toFixed(2)}</div>
                  <div className="col-md-2">Qty: {item.quantity}</div>
                  <div className="col-md-2">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="col-md-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.bookId)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-12 mt-4">
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
            <Button className="mt-3 me-2" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
            <Button variant="warning" className="mt-3" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
