import "./CampaignItem.css";

const CampaignItem = () => {
  return (
    <div className="campaign-item">
      <h3 className="campaign-title">
        Büyük Yaz İndirimi <br />
        Otel Rezervasyonlarında <br />
        %50'ye Varan İndirim
      </h3>
      <p className="campaign-desc">
        Bu yaz tatilinizi daha uygun hale getirin! Seçili otellerde %50'ye varan indirimler sizi bekliyor.
      </p>
      <a href="#" className="btn btn-primary">
        Tümünü Gör
        <i className="bi bi-arrow-right"></i>
      </a>
    </div>
  );
};

export default CampaignItem;
