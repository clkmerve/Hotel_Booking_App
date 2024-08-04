import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Layout } from './layouts/Layout.jsx'
import { BrowserRouter } from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Layout>  
    <App/>
  </Layout>
  </BrowserRouter>
);