import React, {useState, useEffect} from 'react'
import axios from 'axios'



const Login =  () => {
    
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [refresh,setRefresh] = useState(true)

useEffect(()=>{
  setTimeout(() => {
    setRefresh(false)
  }, 1200);
},[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        try{
         
          const token = await axios.post(
            "http://localhost:3006/user",{email:email, password: password}
            )
            window.location.reload();
            console.log(token.data);
            localStorage.setItem('user',JSON.stringify(token.data))
            window.location.href = '/homepage';
        }catch (err) {
          if (err.response && err.response.status === 401) {
            alert('Invalid email or password. Please try again.');
          } else {
            console.log(err);
          }
        }
    
        setEmail('');
        setPassword('');
      };


  return (
    <div className='userpage'>
      {refresh ? (
        <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>
      ):(
      <div className='signup-block'>
      <form className='signup-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <br />
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
         required={true}
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='btn1' type="submit">Login</button>
      <br />
      <h5>Dont Have An Account? <a href="/Signup">Sign Up Here</a></h5>
    </form>
      </div>)}
    </div>
  )
}

export default Login