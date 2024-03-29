import React, { useState } from "react";
import './Template1.css'
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Template1 = ({ mainData }) => {
console.log(mainData);
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
  console.log(experience);

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
   {/* <div id="big-cv-div"> <button onClick={convertHtmlToPdf} id="pdf-btn">Convert To PDF</button>
   <Link to={`/Edit/${mainData._id}`}>Edit</Link> */}
  <div className="tool-div"> <div className="tool-bar">
        <button onClick={convertHtmlToPdf} className="remove-defult scale-up"><PictureAsPdfIcon fontSize="small"/></button>
        <Link className="remove-defult scale-up" to={`/Edit/${mainData._id}`}><EditIcon fontSize="small"/></Link>
        <button className="remove-defult scale-up" onClick={()=>deleteCv(mainData._id)}><DeleteIcon fontSize="small"/></button>
        </div></div>
    <div id={randomId} className="cv-container">
      <nav className="cv-navbar">
        <div className="name">{`Applicant Name: ${firstName} ${lastName}`}</div>
        <div>{`Address: ${address}`}</div>
        <div>{`Email: ${theEmail}`}</div>
        <div>{`Personal Number: ${phone}`}</div>
      </nav>
      <div className="cv-mainpage">
        <div className="cv-section">
          <h1>Summary</h1>
          <p>{summary}</p>
        </div>
        <div className="cv-section">
          <h1>Previous Experience</h1>
          <div className="writing-p">
            {experience?.map((item, index) => (
              <div key={index}>
                {index + 1}{")"} {item}
              </div>
            ))}
          </div>
        </div>
        <div className="cv-section">
          <h3>Job Title</h3>
          <div className="writing-p">{jobTitle}</div>
        </div>
        <div className="cv-section">
          <h1>Skills</h1>
          <div className="writing-p">
           <ul> {skills?.map((item, index) => (
              <li key={index}>
                 {item}
              </li>
            ))}
            </ul>
          </div>
        </div>
        <div className="cv-section">
          <h1>Education</h1>
          <div className="writing-p">{education}</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Template1;
