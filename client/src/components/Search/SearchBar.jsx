

import React, { useState, useRef } from 'react';
import './SearchBar.css';
import { FormGroup, Form, Col } from 'reactstrap';
import { EnvironmentFilled, FieldTimeOutlined, UsergroupAddOutlined, SearchOutlined } from '@ant-design/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const cityNameRef = useRef('');
  const dateRef = useRef(null);
  const maxGroupSizeRef = useRef(null);

  const navigate = useNavigate();

  const searchHandler = () => {
    const cityName = cityNameRef.current.value;

    if (cityName === '') {
      alert('Lütfen bir şehir adı giriniz.');
      return;
    }

    // Şehir adını /city sayfasına yönlendir
    navigate(`/city?cityname=${encodeURIComponent(cityName)}`);
  };

  return (
    <Col lg='12'>
      <div className='search_bar'>
        <Form className='d-flex align-items-center gap-4'>
          <FormGroup className='d-flex gap-3 form_group form_group-fast'>
            <span><EnvironmentFilled /> </span>
            <div>
              <h6>Şehir Adı</h6>
              <input type="text" placeholder='Hangi şehri arıyorsunuz?' ref={cityNameRef} />
            </div>
          </FormGroup>
          <FormGroup className='d-flex gap-3 form_group form_group-last'>
            <span><FieldTimeOutlined /></span>
            <div>
              <h6>Tarih Aralığı</h6>
              <DatePicker
                selected={startDate}
                onChange={(dates) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                placeholderText="Tarih Aralığı Seçin"
                className="date_picker_input"
                ref={dateRef}
              />
            </div>
          </FormGroup>
          {/* <FormGroup className='d-flex gap-3 form_group form_group-fast'>
            <span><UsergroupAddOutlined /> </span>
            <div>
              <h6>Kişi Sayısı</h6>
              <input type="number" placeholder='0' ref={maxGroupSizeRef} />
            </div>
          </FormGroup> */}
          <span className="search_icon" type='submit' onClick={searchHandler}>
            <i><SearchOutlined /></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
