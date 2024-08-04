import "./Header.css";
import { useCart } from "../context/CartProvider";
import { LogoutOutlined } from "@ant-design/icons";
const Header = () => {
   const user = localStorage.getItem("user");
  const { cartItems ,clearCart} = useCart();

  const handleLogout = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("user");
      clearCart(); // Sepeti temizle
      message.success("Başarıyla çıkış yaptınız");
      window.location.href = "/";
    }
  };


  return (
    <header>
      <div className="global-notification">
        <div className="container">
          <p>
            Tatil Fırsatlarını Kaçırmamak için Yerinizi Ayırın!
            <a href="/"> TRAVEL</a>
          </p>
        </div>
      </div>
      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>
            <div className="header-left">
              <a href="/" className="logo">
                TRAVEL
              </a>
            </div>
            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <a href="/city" className="menu-link active">
                      Şehirler
                      <i className="bi bi-chevron-down"></i>
                    </a>
                    <div className="menu-dropdown-wrapper">
                      <ul className="menu-dropdown-content">
                        <li>
                          <a href="#">Yurt İçi </a>
                        </li>
                        <li>
                          <a href="#">Yurt Dışı </a>
                        </li>
                        <li>
                          <a href="#">Yaz Fırsatları</a>
                        </li>
                        <li>
                          <a href="#">Kuşadası </a>
                        </li>
                        <li>
                          <a href="#">Bodrum </a>
                        </li>
                        <li>
                          <a href="#">Belek </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="menu-list-item megamenu-wrapper">
                    <a href="/hotel" className="menu-link">
                      Oteller
                      <i className="bi bi-chevron-down"></i>
                    </a>
                    <div className="menu-dropdown-wrapper">
                      <div className="menu-dropdown-megamenu">
                        <div className="megamenu-links">
                          <div className="megamenu-products">
                            <h3 className="megamenu-products-title">
                              Yurt İçi Otelleri
                            </h3>
                            <ul className="megamenu-menu-list">
                              <li>
                                <a href="#">Bodrum Otelleri</a>
                              </li>
                              <li>
                                <a href="#">Kuşadası Otelleri</a>
                              </li>
                              <li>
                                <a href="#">Belek Otelleri</a>
                              </li>
                              <li>
                                <a href="#">Antalya Otelleri</a>
                              </li>
                              <li>
                                <a href="#">Fethiye Otelleri</a>
                              </li>
                              <li>
                                <a href="#">Marmaris Otelleri</a>
                              </li>
                            </ul>
                          </div>
                          <div className="megamenu-products">
                            <h3 className="megamenu-products-title">
                              Yurt Dışı Otelleri
                            </h3>
                            <ul className="megamenu-menu-list">
                              <li>
                                <a href="#">Paris Otelleri</a>
                              </li>
                              <li>
                                <a href="#">Dubai Otelleri</a>
                              </li>
                              <li>
                                <a href="#">Amsterdam Otelleri</a>
                              </li>
                              <li>
                                <a href="#">Londra Otelleri</a>
                              </li>
                            </ul>
                          </div>
                          <div className="megamenu-products">
                            <h3 className="megamenu-products-title">
                              Yaz Fırsatları
                            </h3>
                            <ul className="megamenu-menu-list">
                              <li>
                                <a href="#">Kuşadası Yaz Fırsatları</a>
                              </li>
                              <li>
                                <a href="#">Fethiye Yaz Fırsatları</a>
                              </li>
                              <li>
                                <a href="#">Kemer Yaz Fırsatları</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="megamenu-single">
                          <a href="#">
                            <img src="img/images (1).jpg" alt="" />
                          </a>
                          <h3 className="megamenu-single-title">
                            Yaz Fırsatları Başladı!
                          </h3>
                          <h4 className="megamenu-single-subtitle">
                            İndirimleri Değerlendir Tatile Avantajlı Çık!
                          </h4>
                          <a
                            href="#"
                            className="megamenu-single-button btn btn-sm"
                          >
                            Rezervasyon Yap!
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="menu-list-item">
                    <a href="/blog" className="menu-link">
                      Blog
                    </a>
                  </li>
                  <li className="menu-list-item">
                    <a href="/contact" className="menu-link">
                      İletişim
                    </a>
                  </li>
                </ul>
              </nav>
              <i className="bi-x-circle" id="close-sidebar"></i>
            </div>
            <div className="header-right">
              <div className="header-right-links">
                <a href="/login" className="header-account">
                  <i className="bi bi-person"></i>
                </a>
                {/* <button className="search-button">
                  <i className="bi bi-search"></i>
                </button> */}
                {/* <a href="#">
                  <i className="bi bi-heart"></i>
                </a> */}
                <div className="header-cart">
                  <a href="/cart" className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">
                      {cartItems.length}
                    </span>{" "}
                    {/* Sepetteki ürün sayısını göster */}
                  </a>
                </div>

                {user && (
                  <button
                    className="search-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Çıkış yapmak istediğinize emin misiniz?"
                        )
                      ) {
                        localStorage.removeItem("user");
                        clearCart(); // Çıkış yapılırken sepeti temizle
                        window.location.href = "/";
                      }
                    }}
                  >
                    <i>
                      <LogoutOutlined />
                    </i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;