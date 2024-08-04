import React from 'react'
import './Newsletter.css'
import { Container, Row, Col } from 'reactstrap'
import foto from '../../assets/images/newsletter.png'

const Newsletter = () => {
  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg='6'>
            <div className='newsletter_content'>
              <h2>Özel Tekliflerden Haberdar Olun</h2>
              <div className='newsletter_input'>
                <input type="email" placeholder='Email adresinizi girin...' />
                <button className='btn newsletter_btn'>Abone Ol</button>
              </div>
              <p>En son indirimler, kampanyalar ve fırsatlardan haberdar olmak için bültenimize abone olun.</p>
            </div>
          </Col>
          <Col lg='6'>
            <div className="newsletter_img">
              <img src={foto} alt="Bülten Görseli" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Newsletter
