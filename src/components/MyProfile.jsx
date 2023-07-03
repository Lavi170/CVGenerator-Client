import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Template1 from "./Template1";
import Template2 from "./Template2";
import "./MyProfile.css";
function MyProfile() {
  const [refresh,setRefresh] = useState(true)

  const [cvArr, setCvArr] = useState([]);
  const [user, setUser] = useState({});
  let token = JSON.parse(localStorage.getItem("user")).token;

  let Template1Arr = [];
  let Template2Arr = [];
  Template1Arr = cvArr.filter((item, index) => item.template == "first-label");
  Template2Arr = cvArr.filter((item, index) => item.template == "second-label");

  useEffect(()=>{
    setTimeout(() => {
      setRefresh(false)
    }, 1200);
  },[])

  useEffect(() => {
    const realuser = axios
      .post("https://cvgeneratorapi.onrender.com/user/getUser", {
        token: JSON.parse(localStorage.getItem("user")).token,
        
      })
      .then((data) => {
        setUser(data.data);
        setTimeout(() => {
          setRefresh(false)
        }, 1200);
      });

    const ans = axios
      .post("https://cvgeneratorapi.onrender.com/user/finalCv", {
        token: token,
      })
      .then((data) => {
        setCvArr(data.data.userInfo.cvs);
        setUser(data.data);
        setTimeout(() => {
          setRefresh(false)
        }, 1200);
      });
  }, []);

  const deleteCv = async (idd) => {
    try {
      const deleteThis = await axios.patch(
        "https://cvgeneratorapi.onrender.com/user/deleteCv",
        {
          cvid: idd,
          token: token,
        }
      );
      setTimeout(() => {
        setRefresh(false)
      }, 1200);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);

  return (
    <>
      {refresh ? (
        <div class="loader">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
        <div class="bar10"></div>
        <div class="bar11"></div>
        <div class="bar12"></div>
    </div>
      ) : (
        <>
          {Template2Arr.length === 0 && Template1Arr.length === 0 ? (
            <div className="no-fav-pic">
              <h1>No CV's Created Yet</h1>
              <p>You haven't created any CVs yet. Start exploring and create one now!</p>
            </div>
          ) : (
            <div>
              {Template2Arr.map((mainData, index) => {
                return (
                  <div key={index} className="small-template">
                    <Template2 mainData={mainData} />
                  </div>
                );
              })}
              {Template1Arr.map((mainData, index) => {
                return (
                  <div key={index} className="small-template">
                    <Template1 mainData={mainData} />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyProfile;
