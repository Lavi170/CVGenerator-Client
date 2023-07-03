import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Template2.css"
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function Template2({mainData}) {

  const [randomId,setRandomId] = useState(Math.random().toString(36))

  const firstName = mainData.firstName;
  const lastName = mainData.lastName;
  const jobTitle = mainData.jobTitle;
  const theEmail = mainData.theEmail;
  const img = mainData.img;
  const phone = mainData.phone;
  const address = mainData.address;
  const summary = mainData.summary;
  const skills = mainData.skills;
  const experience = mainData.experience;
  const education = mainData.education;
  const languages = mainData.languages;
  const hobbies = mainData.hobbies;

  let token = JSON.parse(localStorage.getItem("user")).token;

  const deleteCv = async (theId)=> {
    try{
const deleteThis = await axios.patch("https://cvgeneratorapinew.onrender.com/user/deleteCv", {
    cvid: theId , token: token 
    
})
if(window.location.href.includes("/myProfile")){
        window.location.reload()
      }
      else{
        navigate("/myProfile");

      }
}
catch(err) {
    console.log(err);
}
}

    const navigate = useNavigate();
    
  const convertHtmlToPdf = () => {
    const input = document.getElementById(randomId)
    const pxWidth = input.offsetWidth
    const pxHeight = input.offsetHeight

    html2canvas(input, {
        width: pxWidth,
        height: pxHeight,
        scale: 1.8,
        allowTaint: true,
        useCORS: true

    })
    .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF('portrait', 'px', [pxWidth, pxHeight]);
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("my-resume.pdf")
    })
}
  
  return (
    <>
    <div className="tool-div"><div className="tool-bar">
        <button onClick={convertHtmlToPdf} className="remove-defult scale-up"><PictureAsPdfIcon fontSize="small"/></button>
        <Link className="remove-defult scale-up" to={`/Edit/${mainData._id}`}><EditIcon fontSize="small"/></Link>
        <button className="remove-defult scale-up" onClick={()=>deleteCv(mainData._id)}><DeleteIcon fontSize="small"/></button>
        </div></div>
        <div id={randomId} className="cv-container">
          <div id="top-section">
            <div id="gray-section">
              <div id="name-title-section">
                <div id="name-title">
                  <h1 id="first-name">{firstName} </h1>
                  <h1 id="last-name">{lastName}</h1>
                </div>
                <h4>{jobTitle}</h4>
              </div>
            </div>
            <img id="profile-img" src={img} alt="" />
          </div>
          <div id="bottom-section">
            <div id="left-section">
              <div className="contact-div">
                <div className="contact-info-div">
                  <PhoneIcon fontSize="small" />{" "}
                  <span className="contact-info">{phone}</span>
                </div>
                <div className="contact-info-div">
                  <EmailIcon fontSize="small" />{" "}
                  <span className="contact-info">{theEmail}</span>
                </div>
                <div className="contact-info-div">
                  <LocationOnIcon fontSize="small" />{" "}
                  <span className="contact-info">{address}</span>
                </div>
              </div>
  
              <div className="info-cubes-section">
                <h3>SKILLS</h3>
                <ul>
                  {skills?.map((item,index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
  
              <div className="info-cubes-section">
                <h3 className="cube-title">EDUCATION</h3>
                {education}
              </div>
            </div>
  
            <div id="right-section">
              <div id="profile-section">
                <h3 className="cube-title">PROFILE</h3>
                {summary}
              </div>
              <div className="info-cubes-section">
                <h3 >EXPERIENCE</h3>
                <ul>
                  {experience?.map((item,index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        </>
    );
  }
export default Template2;