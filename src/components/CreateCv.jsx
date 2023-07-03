
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateCv.css'
function CreateCv({ template }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const [experienceArr, setExperienceArr] = useState([""]);
  const [skillsArray, setSkillsArray] = useState([""]);

  function deleteModel(theIndex) {
    setSkillsArray(prev => prev.filter((item, index) => index !== theIndex));
  }

  function deleteMe(theIndex) {
    setExperienceArr(prev => prev.filter((item, index) => index !== theIndex));
  }

  function addSkill() {
    setSkillsArray(prev => [...prev, ""]);
  }

  function editSkill(index, e) {
    const newArr = [...skillsArray];
    newArr[index] = e.target.value;
    setSkillsArray(newArr);
    console.log(skillsArray);
  }

  function addExperience() {
    setExperienceArr(prev => [...prev, ""]);
  }

  useEffect(()=>{
    if (template == "") {
      navigate("/template")
    }
    },[])

  function editExperience(index, e) {
    const newArr = [...experienceArr];
    newArr[index] = e.target.value;
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
      console.log(token.token);
      const data = await axios.patch("https://cvgeneratorapinew.onrender.com/user/addCv", {
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
        template: template,
      });
      navigate("/finalCv");
      e.target.reset();
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
            <input className="input-field" type="text" placeholder="first name" />
            <input className="input-field" type="text" placeholder="last name" />
            <input className="input-field" type="text" placeholder="img" />
            <input className="input-field" type="email" placeholder="email" />
            <input className="input-field" type="text" placeholder="phone" />
            <input className="input-field" type="text" placeholder="address" />
            <input className="input-field" type="text" placeholder="job title" />
            <textarea className="input-field textarea-field" placeholder="summary" maxLength={150} />
            <textarea
              className="input-field textarea-field"
              placeholder="education"
            />
            <input
              className="input-field"
              type="text"
              placeholder="languages"
            />
            <input className="input-field" type="text" placeholder="hobbies" />
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
              className="add-btn"
              type="button"
              onClick={addSkill}
            >
              add another skill
            </button>

            <h1>Experience:</h1>
            {experienceArr.map((item, index) => (
              <div className="add-input" key={index}>
                <textarea
                  className="added-input-field textarea-field"
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
              className="add-btn"
              type="button"
              onClick={addExperience}
            >
              add another experience
            </button>
          </div>
          <button className="submit-btn" type="submit">Save Info</button>
        </form>
      </div>
    </div>
  );
}

export default CreateCv;
