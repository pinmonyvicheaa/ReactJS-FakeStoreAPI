import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
      setLoading(false);
    } catch (err) {
      setError("Error loading cart data");
      setLoading(false);
    }
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  if (loading) return <p className="text-center text-primary">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div>
      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
          <div className="d-inline-flex">
            <p className="m-0"><a href="/">Home</a></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shopping Cart</p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            {cartItems.length === 0 ? (
              <div className="text-center">
                <h4 className="font-weight-bold text-muted mb-4">
                  Your cart is empty! Go back to the Home page.
                </h4>
                <Link to="/" className="btn btn-warning">Go to Home</Link>
              </div>
            ) : (
              <table className="table table-hover shadow-sm">
                <thead className="bg-primary text-dark">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded mr-2"
                          style={{ width: "50px" }}
                        />
                        {item.title}
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-primary mr-2"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, (item.quantity || 1) - 1)
                              )
                            }
                          >
                            -
                          </button>
                          <span className="font-weight-bold mx-2">
                            {item.quantity || 1}
                          </span>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="col-lg-4">
              <div className="card border-light shadow">
                <div className="card-header bg-primary text-dark">
                  <h4 className="font-weight-bold m-0">Cart Summary</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>${calculateTotal().toFixed(2)}</h6>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <div className="d-flex justify-content-between mb-3">
                    <h5>Total</h5>
                    <h5>${calculateTotal().toFixed(2)}</h5>
                  </div>
                  <Link to="/checkout">
                    <button className="btn btn-block btn-primary">Proceed to Checkout</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
