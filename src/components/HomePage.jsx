import React, { useState } from 'react';
import './HomePage.css'; 
import mainPhoto from "/src/photos/mainpic.png"
import CVAnimation from './CVAnimation';
 
const Homepage = () => {
    
  return (
    <div className="homepage-container">
     
      <img id='main-pic' src={mainPhoto} alt="" /> 
      <div className='main-text' > <h1 className="homepage-title">Welcome to CV Generator</h1>
      <p className="homepage-description">
        Create a professional CV effortlessly with our user-friendly CV generator.
        Stand out from the crowd and showcase your skills and experience in a
        visually appealing way. Whether you're a recent graduate or an experienced
        professional, our tool provides customizable templates and intuitive
        features to help you craft a stunning CV tailored to your needs.
      </p>
        
      <div className='animations'> <CVAnimation></CVAnimation>
        </div>
      </div>
    </div>
  );
};

export default Homepage;