import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Subtitle from '../../shared/Subtitle'
import './BlogNew.css'
import MasonryImagesGallery from '../Image-gallery/MasonryImagesGallery'
const BlogNew = () => {
  return (
    <section>
      <Container>
        <Row>
            <Col lg='12' className='mt-4'>
            {/* <Subtitle subtitle={'BlogNew'}/> */}
            <h2 className='blogNew_title'>Müşterilerimizin Otel Galerilerini Ziyaret Edin</h2>
            </Col>
            <Col lg='12'>
            <MasonryImagesGallery/>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default BlogNew
