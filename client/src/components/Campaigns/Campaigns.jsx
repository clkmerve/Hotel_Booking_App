import CampaignItem from "./CampaignItem";
import "./Campaigns.css"

const Campaigns = () => {
  return (
    <section className="campaigns">
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Kampanyalar</h1>
      <div className="container">
        <div className="campaigns-wrapper">
          <CampaignItem />
          <CampaignItem />
        </div>
        <div className="campaigns-wrapper">
          <CampaignItem />
          <CampaignItem />
        </div>
      </div>
    </section>
  );
};

export default Campaigns;