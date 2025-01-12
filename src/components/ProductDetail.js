import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Navigation hook
  const [product, setProduct] = useState(null); // State to hold product details
  const [loading, setLoading] = useState(true); // Loading state
  const [popupMessage, setPopupMessage] = useState(""); // State to manage popup message visibility

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    setPopupMessage(`${product.title} has been added to your cart.`);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Shop Detail
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="/">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop Detail</p>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-3">{product.title}</h1>
            <h4 className="text-muted mb-3">${product.price}</h4>
            <p className="mb-3">{product.description}</p>
            <div className="d-flex">
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
        {popupMessage && (
          <div
            className="popup-message"
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "1rem",
              zIndex: 9999,
            }}
          >
            {popupMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
