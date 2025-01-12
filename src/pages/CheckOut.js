import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isShippingDifferent, setIsShippingDifferent] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);

    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(storedCart);

            const total = storedCart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            setTotalAmount(parseFloat(total.toFixed(2))); // Ensure consistent formatting
        } catch (error) {
            console.error("Error loading cart items from localStorage:", error);
        }
    }, []);

    const handlePaymentSuccess = (details, data) => {
        alert(`Transaction completed by ${details.payer.name.given_name}`);
        console.log("Transaction Details:", details, data);
    };

    const initialPayPalOptions = {
        "client-id": "ASLMGKdtntQ5vKqo-ehR6BwiW4xQWjAbhtrx5J5XBgE6vU7c4xyanrx8_pFkphseiA-rNJn3OUTduAap",
        currency: "USD",
    };

    const handleShippingToggle = () => {
        setIsShippingDifferent(!isShippingDifferent);
    };

    const handleCreateAccountToggle = () => {
        setCreateAccount(!createAccount);
    };

    // Handle the "Go to Home" button click
    const handleGoToHome = () => {
        navigate("/"); // Navigate to the home page
    };

    return (
        <div className="container-fluid bg-secondary mb-5">
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                <h1 className="font-weight-semi-bold text-uppercase mb-3">Checkout</h1>
                <div className="d-inline-flex">
                    <p className="m-0"><a href="/">Home</a></p>
                    <p className="m-0 px-2">-</p>
                    <p className="m-0">Checkout</p>
                </div>
            </div>

            {/* Checkout Section */}
            <div className="untree_co-section">
                <div className="container">
                    <div className="row">
                        {/* Billing Details */}
                        <div className="col-md-6">
                            <section>
                                <h4>Billing Details</h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First Name *</label>
                                        <input type="text" className="form-control" id="firstName" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last Name *</label>
                                        <input type="text" className="form-control" id="lastName" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="company">Company Name (Optional)</label>
                                    <input type="text" className="form-control" id="company" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address">Street Address *</label>
                                    <input type="text" className="form-control" id="address" placeholder="House number and street name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city">Town/City *</label>
                                    <input type="text" className="form-control" id="city" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email Address *</label>
                                    <input type="email" className="form-control" id="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone">Phone *</label>
                                    <input type="tel" className="form-control" id="phone" required />
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="createAccount"
                                        checked={createAccount}
                                        onChange={handleCreateAccountToggle}
                                    />
                                    <label className="form-check-label" htmlFor="createAccount">
                                        Create an account?
                                    </label>
                                </div>
                                {createAccount && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="accountEmail">Account Email *</label>
                                            <input type="email" className="form-control" id="accountEmail" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password">Account Password *</label>
                                            <input type="password" className="form-control" id="password" required />
                                        </div>
                                    </>
                                )}
                            </section>

                            {/* Shipping Details */}
                            <section className="mt-4">
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="differentShipping"
                                        checked={isShippingDifferent}
                                        onChange={handleShippingToggle}
                                    />
                                    <label className="form-check-label" htmlFor="differentShipping">
                                        Ship to a different address?
                                    </label>
                                </div>
                                {isShippingDifferent && (
                                    <div>
                                        <h4>Shipping Details</h4>
                                        <div className="mb-3">
                                            <label htmlFor="shippingAddress">Street Address *</label>
                                            <input type="text" className="form-control" id="shippingAddress" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="shippingCity">Town/City *</label>
                                            <input type="text" className="form-control" id="shippingCity" required />
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Order Summary */}
                        <div className="col-md-6">
                            <div className="row mb-5">
                                <div className="col-md-12">
                                    <h2 className="h3 mb-3 text-black">Your Order</h2>
                                    <div className="p-3 p-lg-5 border bg-white">
                                        {cartItems.length > 0 ? (
                                            <table className="table site-block-order-table mb-5">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>
                                                                {item.title} <strong className="mx-2">x</strong>{" "}
                                                                {item.quantity}
                                                            </td>
                                                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Order Total</strong>
                                                        </td>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>${totalAmount}</strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="alert alert-warning" role="alert">
                                                Your cart is empty. <button className="btn btn-primary" onClick={handleGoToHome}>Please go back home</button>
                                            </div>
                                        )}

                                        {/* PayPal Payment Section */}
                                        {cartItems.length > 0 && (
                                            <PayPalScriptProvider options={initialPayPalOptions}>
                                                <PayPalButtons
                                                    style={{ layout: "vertical" }}
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: totalAmount,
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order.capture().then((details) => {
                                                            handlePaymentSuccess(details, data);
                                                        });
                                                    }}
                                                    onError={(err) => {
                                                        console.error("PayPal Checkout Error:", err);
                                                        alert("There was an error processing your payment. Please try again.");
                                                    }}
                                                />
                                            </PayPalScriptProvider>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
