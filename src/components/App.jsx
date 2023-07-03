import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Layout from "./Layout";
import CreateCv from "./CreateCv";
import Template from "./Template";
import Result from "./Result";
import MyProfile from "./MyProfile";
import UserPage from "./UserPage";
import Homepage from "./HomePage";
import Edit from "./Edit";
function App() {
  const [template, setTemplate] = useState("");

  console.log(template);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<UserPage></UserPage>}>
            <Route path="" element={<Login></Login>}></Route>
            <Route path="Signup" element={<Signup></Signup>}></Route>
          </Route>
          <Route path="/homepage" element={<Homepage></Homepage>}></Route>
          <Route
            path="template"
            element={<Template setTemplate={setTemplate}></Template>}
          ></Route>
          <Route
            path="addCv"
            element={<CreateCv template={template}></CreateCv>}
          ></Route>
          <Route path="finalCv" element={<Result></Result>}></Route>
          <Route path="myProfile" element={<MyProfile></MyProfile>}></Route>
          <Route path="/Edit/:id" element={<Edit></Edit>}></Route>
          {/* <Route path="/*" element={<NotFound></NotFound>}></Route> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
