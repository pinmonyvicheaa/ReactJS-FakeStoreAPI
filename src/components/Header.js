import React, { useState, useEffect } from 'react';

export const Header = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Fetch images from Fake Store API for the carousel
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // Extract the first two product images
        const images = data.slice(0, 2).map((item) => item.image);
        setCarouselImages(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  // Function to update the cart count based on localStorage
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = storedCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    // Initially set the cart count
    updateCartCount();

    // Listen to localStorage changes (for cart updates)
    const interval = setInterval(() => {
      updateCartCount(); // Periodically check for cart updates
    }, 1000); // Check every 1 second

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return (
    <div>
      {/* Topbar Start */}
      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark" href="#">
                FAQs
              </a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href="#">
                Help
              </a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href="#">
                Support
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark px-2" href="https://www.facebook.com/roninchea/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="text-dark px-2" href="https://x.com/monyvichea">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-dark px-2" href="https://www.linkedin.com/in/pinmonyvichea/">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="text-dark px-2" href="https://www.instagram.com/p.vichea/">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-dark pl-2" href="https://www.youtube.com/@monyvicheapin">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a href="#" className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <img src="img/vendor-3.jpg" alt="Logo" />
              </h1>
            </a>
          </div>
          <div className="col-lg-6 col-6 text-left">
            <form action="#">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for products" />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-6 text-right">
            <a href="/cart" className="btn border">
              <i className="fas fa-shopping-cart text-primary"></i>
              <span className="badge">{cartCount}</span>
            </a>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}
            >
              <h6 className="m-0">Categories</h6>
              <i className="fa fa-angle-down text-dark"></i>
            </a>
            <nav
              className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
              id="navbar-vertical"
            >
              <div className="navbar-nav w-100 overflow-hidden" style={{ height: '410px' }}>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link" data-toggle="dropdown">
                    Dresses <i className="fa fa-angle-down float-right mt-1"></i>
                  </a>
                  <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                    <a href="#" className="dropdown-item">
                      Men's Dresses
                    </a>
                    <a href="#" className="dropdown-item">
                      Women's Dresses
                    </a>
                    <a href="#" className="dropdown-item">
                      Baby's Dresses
                    </a>
                  </div>
                </div>
                <a href="#" className="nav-item nav-link">
                  Shirts
                </a>
                <a href="#" className="nav-item nav-link">
                  Jeans
                </a>
                <a href="#" className="nav-item nav-link">
                  Swimwear
                </a>
                <a href="#" className="nav-item nav-link">
                  Sleepwear
                </a>
                <a href="#" className="nav-item nav-link">
                  Sportswear
                </a>
                <a href="#" className="nav-item nav-link">
                  Jumpsuits
                </a>
                <a href="#" className="nav-item nav-link">
                  Blazers
                </a>
                <a href="#" className="nav-item nav-link">
                  Jackets
                </a>
                <a href="#" className="nav-item nav-link">
                  Shoes
                </a>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href="#" className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">
                  <img src="img/vendor-3.jpg" alt="Logo" />
                </h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                  <a href="/" className="nav-item nav-link active">
                    Home
                  </a>
                  <a href="/shop" className="nav-item nav-link">
                    Shop
                  </a>
                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                      Pages
                    </a>
                    <div className="dropdown-menu rounded-0 m-0">
                      <a href="/cart" className="dropdown-item">
                        Shopping Cart
                      </a>
                      <a href="/checkout" className="dropdown-item">
                        Checkout
                      </a>
                    </div>
                  </div>
                  <a href="/contact" className="nav-item nav-link">
                    Contact
                  </a>
                </div>
                <div className="navbar-nav ml-auto py-0">
                  <a href="/" className="nav-item nav-link">
                    Login
                  </a>
                  <a href="/" className="nav-item nav-link">
                    Register
                  </a>
                </div>
              </div>
            </nav>
            <div id="header-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {carouselImages.length > 0 ? (
                  carouselImages.map((image, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? 'active' : ''}`}
                      style={{ height: '410px' }}
                      key={index}
                    >
                      <img className="img-fluid" src={image} alt={`Carousel Item ${index + 1}`} />
                      <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: '700px' }}>
                          <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                          <h3 className="display-4 text-white font-weight-semi-bold mb-4">Shop Now</h3>
                          <a href="/shop" className="btn btn-light py-2 px-3">
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="carousel-item active" style={{ height: '410px' }}>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
              <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                  <span className="carousel-control-prev-icon mb-n2"></span>
                </div>
              </a>
              <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                  <span className="carousel-control-next-icon mb-n2"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar End */}
    </div>
  );
};
