import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <div style={{marginTop: "20px", textAlign: "center"}}>
        <Link to="/" className="link-home" >
          <h1><span style={{border: "2px solid blue", padding: "10px"}}>Go home</span></h1>
        </Link>
        <div>
          <img src="https://png.pngtree.com/png-clipart/20190612/original/pngtree-site-404-error-page-png-image_3407766.jpg" alt="not-found"/>
        </div>
    </div>
  </div>
);

export default NotFound;