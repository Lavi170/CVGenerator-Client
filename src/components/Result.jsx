import axios from "axios";
import React, { useEffect, useState } from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import { Button } from "@mui/material";
import {Link} from 'react-router-dom'
const Result = () => {
  const [mainData, setMainData] = useState([])
  console.log(mainData.template);
  const templateKind = mainData.template
  useEffect(() => {
        axios
        .post("https://cvgeneratorapinew.onrender.com/user/finalCv", { token : JSON.parse(localStorage.getItem("user")).token })
        .then((data) => {
        setMainData(data.data.userInfo.cvs[data.data.userInfo.cvs.length-1])
            console.log(mainData);
        });
  }, []);
  
  return <div>{templateKind=="first-label"&&<Template1 mainData={mainData}/>}
  {templateKind=="second-label"&&<Template2 mainData={mainData}/>}
  </div>;

};

export default Result;
