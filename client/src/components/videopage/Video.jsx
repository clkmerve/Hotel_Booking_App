import "./Video.css"
import {Container,Row,Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroImg from '../../assets/images/hero-img01.jpg'
import heroImg02 from '../../assets/images/hero-img02.jpg'
import heroVideo from '../../assets/images/hero-video2.mp4'
import SearchBar from "../Search/SearchBar";

const Video = () => {
  return (
    <>
      <section>
        <Container>
            <Row>
                <Col lg='6'>
                <div className="hero_content mt-5">
                    <div className="hero_subtitle d-flex align-items-center">
                    {/* Unutulmaz Anılar Sizi Bekliyor */}                              
                    </div>
                    <h1>Rezervasyon  <span className='highlight'>Fırsatları</span></h1>
                    <p>Seyahat Otel'de hayalinizdeki tatil için hemen rezervasyon yapın! Lüks konaklama, eşsiz manzaralar ve unutulmaz anılar için mükemmel bir fırsat. İster romantik bir kaçamak, ister aile tatili olsun, her türlü ihtiyacınıza uygun seçenekler sunuyoruz.</p>
                </div>
                </Col>
                <Col lg='2'>
                <div className="hero_img-box">
                  <img src={heroImg} alt="" />
                </div>
                </Col>
                 <Col lg='2'>
                <div className="hero_img-box mt-4">
                  <video src={heroVideo} alt="" controls loop />
                </div>
                </Col>
                <Col lg='2'>
                <div className="hero_img-box mt-5">
                  <img src={heroImg02} alt="" />
                </div>
                </Col>
                <SearchBar/>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default Video
