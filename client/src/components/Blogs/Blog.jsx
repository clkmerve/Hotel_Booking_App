import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './Blog.css'
import Testimonial from '../Testimonial/Testimonial'
const Blog = () => {
  return (
    <section>
      <Container>
        <Row>
            <Col lg='12'>
            <h2 className="testimonial_title">Müşterilerimiz Otel Rezervasyon Sitemiz Hakkında Ne Diyor?</h2>
            </Col>
            <Col lg='12'>
            <Testimonial/>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Blog
