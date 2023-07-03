import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const [experienceArr, setExperienceArr] = useState([""]);
  const [skillsArray, setSkillsArray] = useState([""]);
  const { id } = useParams();
  console.log(id);

  const [cvsArr, setCvsArr] = useState([]);
  const [cvToEdit, setCvToEdit] = useState({});
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("user")).token;

    axios
      .post("https://cvgeneratorapi.onrender.com/user/finalCv", {
        token: token,
      })
      .then((data) => {
        console.log(data);
        setCvsArr(data.data.userInfo.cvs);
        setCvToEdit(data.data.userInfo.cvs.find(item => item._id === id));
        setExperienceArr(data.data.userInfo.cvs.find(item => item._id === id).experience)
        setSkillsArray(data.data.userInfo.cvs.find(item => item._id === id).skills)
      });
  }, []);


  function deleteModel(theIndex) {
    setSkillsArray(prev => prev.filter((item, index) => index !== theIndex));
  }

  function deleteMe(theIndex) {
    setExperienceArr(experienceArr.filter((item, index) => index !== theIndex));
  }

  function addSkill() {
    setSkillsArray(prev => [...prev, ""]);
  }

  function editSkill(skillIndex, e) {
    const newArr = [...skillsArray];
    newArr[skillIndex] = e.target.value;
    setSkillsArray(newArr);
  }

  function addExperience() {
    setExperienceArr(prev => [...prev, ""]);
  }

  function editExperience(expIndex, e) {
    const newArr = [...experienceArr];
    newArr[expIndex] = e.target.value;
    setExperienceArr(newArr);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const img = e.target[2].value;
    const theEmail = e.target[3].value;
    const phone = e.target[4].value;
    const address = e.target[5].value;
    const jobTitle = e.target[6].value;
    const summary = e.target[7].value;
    const education = e.target[8].value;
    const languages = e.target[9].value;
    const hobbies = e.target[10].value;

    try {
      const data = await axios.patch("https://cvgeneratorapi.onrender.com/user/editCv", {
        token: token.token,
        firstName,
        lastName,
        img,
        phone,
        address,
        jobTitle,
        theEmail,
        summary,
        skills: skillsArray,
        experience: experienceArr,
        education,
        languages,
        hobbies,
        template: cvToEdit.template,
        cvIdToChange: id
      });
      navigate("/myProfile")
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <form id="info-form" onSubmit={handleSubmitForm}>
          <div id="form-container">
            <input className="input-field" type="text" placeholder="first name" defaultValue={cvToEdit.firstName} />
            <input className="input-field" type="text" placeholder="last name" defaultValue={cvToEdit.lastName} />
            <input className="input-field" type="text" placeholder="img" defaultValue={cvToEdit.img} />
            <input className="input-field" type="email" placeholder="email" defaultValue={cvToEdit.theEmail} />
            <input className="input-field" type="text" placeholder="phone" defaultValue={cvToEdit.phone} />
            <input className="input-field" type="text" placeholder="address" defaultValue={cvToEdit.address} />
            <input className="input-field" type="text" placeholder="job title" defaultValue={cvToEdit.jobTitle} />
            <textarea className="input-field textarea-field" placeholder="summary" maxLength={150} defaultValue={cvToEdit.summary} />
            <textarea className="input-field textarea-field" placeholder="education" defaultValue={cvToEdit.summary} />
            <input className="input-field" type="text" placeholder="languages" defaultValue={cvToEdit.languages} />
            <input className="input-field" type="text" placeholder="hobbies" defaultValue={cvToEdit.hobbies} />
            <h1>skills:</h1>
            {skillsArray.map((item, index) => (
              <div className="add-input" key={index}>
                <input
                  className="added-input-field"
                  type="text"
                  placeholder={`skill ${index + 1}`}
                  value={item}
                  onChange={(e) => editSkill(index, e)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => deleteModel(index)}>
                    x
                  </button>
                )}
              </div>
            ))}
            <button
              className="btn1"
              type="button"
              onClick={addSkill}
            >
              add another skill
            </button>

            <h1>Experience:</h1>
            {experienceArr.map((item, index) => (
              <div className="add-input" key={index}>
                <textarea
                  className="added-input-field"
                  placeholder={`experience ${index + 1}`}
                  value={item}
                  onChange={(e) => editExperience(index, e)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => deleteMe(index)}>
                    x
                  </button>
                )}
              </div>
            ))}
            <button
              className="btn1"
              type="button"
              onClick={addExperience}
            >
              add another experience
            </button>
          </div>
          <button className="btn1" type="submit">Save Info</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;