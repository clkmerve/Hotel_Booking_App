import "./Tabs.css";

const Tabs = () => {
  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a href="#" className="tab-button active" data-id="desc">
            Otel Detayları
          </a>
        </li>
        <li>
          <a href="#" className="tab-button" data-id="info">
            {/* Additional information */}
          </a>
        </li>
        <li>
          <a href="#" className="tab-button" data-id="reviews">
            {/* Reviews */}
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div className="tab-panel-descriptions content active" id="desc">
          <p>
          Huzur Dolu Bir Kaçış: Lüks ve Konforun Buluştuğu Otel Deneyimi

Hayatın koşuşturmasından uzaklaşmak için mükemmel bir kaçış noktası arıyorsanız, lüks ve konforun bir araya geldiği bu otel tam size göre! Doğanın kucağında sakin bir tatilin keyfini çıkarırken, modern olanakların sunduğu rahatlığı da hissedeceksiniz. Günün yorgunluğunu spa olanaklarıyla atarken, lezzet dolu restoranlarımızda damak zevkinize hitap eden lezzetleri keşfedeceksiniz. Her detayın özenle düşünüldüğü bu özel mekanda, unutulmaz anlar ve huzur dolu bir deneyim sizi bekliyor. Siz de bu eşsiz atmosferde kendinizi yeniden keşfedin!</p>
        
        </div>
        <div className="tab-panel-information content" id="info">
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                    White
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  <p>XXS, XS, S, M, L, XL, XXL</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <Reviews /> */}
      </div>
    </div>
  );
};

export default Tabs;