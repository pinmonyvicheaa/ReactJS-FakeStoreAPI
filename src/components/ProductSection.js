import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));

    // Trigger storage event manually to update cart count in Header
    window.dispatchEvent(new Event("storage"));

    setPopupMessage(`${product.title} has been added to your cart.`);
    setTimeout(() => setPopupMessage(""), 3000); // Clear the popup after 3 seconds
  };

  if (loading) {
    return <div className="text-center py-5 text-primary">Loading...</div>;
  }

  return (
    <div className="container-fluid pt-4">
      {/* Centered Trendy Products Title */}
      <div className="text-center mb-4">
        <h5 className="section-title">
          <span className="px-3 py-1 bg-warning text-dark rounded">Trendy Products</span>
        </h5>
      </div>
      <div className="row px-xl-4 pb-3">
        {products.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-4" key={product.id}>
            <div className="card product-item border shadow-sm">
              <div className="card-header product-img bg-light border p-0 position-relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid w-100 rounded-top"
                  style={{ maxHeight: "180px", objectFit: "contain" }}
                />
              </div>
              <div className="card-body text-center p-3 bg-light">
                <h6 className="text-truncate text-dark" title={product.title}>
                  {product.title}
                </h6>
                <h6 className="text-success">${product.price.toFixed(2)}</h6>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center bg-white p-2">
                <button
                  className="btn btn-sm btn-info text-white"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {popupMessage && (
        <div
          className="popup-message shadow-lg"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#17a2b8",
            color: "white",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "1rem",
            zIndex: 1050,
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>{popupMessage}</div>
          <button
            onClick={() => navigate("/cart")}
            style={{
              marginTop: "10px",
              backgroundColor: "#ffc107",
              color: "#212529",
              border: "none",
              padding: "5px 15px",
              fontSize: "0.9rem",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
