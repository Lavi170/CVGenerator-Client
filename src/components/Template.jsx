import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Template({ setTemplate }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();



  const handleNext = async (e) => {
    e.preventDefault();
    const selectedInput = document.querySelector(
      'input[name="template"]:checked'
    );
    const selectedId = selectedInput ? selectedInput.id : null;
    setTemplate(selectedId);
    navigate("/addCv");
  };

  return (
    <div className="choose-template">
      <h2>Choose Your Template</h2>
      <form onSubmit={(e)=> handleNext(e)}>
        <div className="cv-block">
          <div>
            <label htmlFor="first-label">
              {" "}
            <div className="cv-block-pic" >  <img src="https://i.ibb.co/ssYcbVC/curly-brackets.jpg" alt="" /> </div>
              <input id="first-label" type="radio" name="template" required/>
            </label>
          </div>
          <div>
            <label htmlFor="second-label">
              {" "}
             <div className="cv-block-pic"> <img
                src="https://marketplace.canva.com/EAE8mhdnw_g/2/0/1131w/canva-grey-clean-cv-resume-photo-pIsBixsev8I.jpg"
                alt=""
              /> </div>
              <input id="second-label" type="radio" name="template" required/>
            </label>
          </div>
        </div>
        <div>
          {" "}
          <button
            className="template-button2"
            type="submit"
            
          >
            Next
          </button>{" "}
        </div>
      </form>
    </div>
  );
}

export default Template;
