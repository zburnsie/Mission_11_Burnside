import { useCart } from '../context/CartContext'; // This is how we access the cart context

const CartSummary = () => {
  const { cart } = useCart(); // Getting the cart from context

  // Calculate total items and total price
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-summary">
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default CartSummary;
