import React, { useRef, useState } from 'react';
import bgImage from "../../assets/top-view-delicious-muffins-with-nuts-copy-space.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from '../../style/login_style.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() { 
  const wrapper = useRef();
  const signInContainer = useRef();
  const signUpContainer = useRef();
  const isSignUpActive = useRef(false);
  const [inputData, setInputData] = useState({ name: "", email: "", password: "", confirmPassword: ""})
  const [loginData, setLoginData] = useState({email: "", password: ""})
  const [msg, setMsg] = useState(false)
  const [loginMsg, setLoginMsg] = useState(false)
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("users")) || [];
  const [isLogedIn, setIsLogedIn] = useState()
  
  //------------------------------SIGN-UP FORM DATA-------------------------------------------------------------------
  const handleSignInInput = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value })
    
  }

  const handleSignUpSubmit = (event) => {
    event.preventDefault()

    const isEmailTaken = userData.some(
      (user) => user.email.toLowerCase() === inputData.email.toLowerCase()
    )

    const isUserNameTaken = userData.some(
      (user) => user.name.toLowerCase() === inputData.name.toLowerCase()
    )

    if(isEmailTaken || isUserNameTaken) {
      
      alert("This User already exists..")
      return
      
    }else if(!(inputData.password == inputData.confirmPassword)) {
      
      alert("Password Didn't match")
      return

    } else {

      const updateUsers = [...userData, inputData];
      
      localStorage.setItem("users", JSON.stringify(updateUsers))
      
      setInputData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      
      setMsg(true)

      setTimeout(() => {
        setMsg(false)
      }, 3000);
      handleSignInStyle(); 
    }
  }

  //---------------------------------------Form Styling-------------------------------------------------------------

  const handleSignUp = () => {
    isSignUpActive.current = true;

    if (signInContainer.current) {
      signInContainer.current.classList.remove(styles['animated-signin']);
      signInContainer.current.classList.remove(styles['sign-up']);
      void signInContainer.current.offsetWidth;
      signInContainer.current.classList.add(styles['animated-signin']);
      signInContainer.current.classList.add(styles['sign-up']);
    }

    if (signUpContainer.current) {
      signUpContainer.current.classList.remove(styles['animated-signup-back']);
      signUpContainer.current.classList.remove(styles['sign-up']);
      void signUpContainer.current.offsetWidth;
      signUpContainer.current.classList.add(styles['animated-signup']);
    }
  };

  const handleSignInStyle = () => {
    isSignUpActive.current = false;

    if (signUpContainer.current) {
      signUpContainer.current.classList.remove(styles['animated-signup']);
      void signUpContainer.current.offsetWidth;
      signUpContainer.current.classList.add(styles['animated-signup-back']);
      signUpContainer.current.classList.add(styles['sign-up']);
    }

    if (signInContainer.current) {
      signInContainer.current.classList.remove(styles['animated-signin']);
      signInContainer.current.classList.remove(styles['sign-up']);
      void signInContainer.current.offsetWidth;
    }
  };

  //--------------------------LOGIN FORM DATA----------------------------------------------------------------

  const handleLogin = (event) => {
    setLoginData({...loginData, [event.target.name] : event.target.value})
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()


    
    for(let i = 0; i < userData.length; i++) {

      if(loginData.email==userData[i].email && loginData.password==userData[i].password) {
        setIsLogedIn(loginData.email)
        localStorage.setItem("isLogedIn", JSON.stringify(loginData.email))

        navigate('/')

        setLoginMsg(true)
        setTimeout(() => {
          setLoginMsg(false)
        }, 3000);
      } else  {

      }
        
    }
  }

  //---------------------------------H T M L-----------------------------------------------------------------

  return (
    <div ref={wrapper} className={`${styles['wrapper']} flex justify-center bg-cover bg-fixed items-center min-h-screen box-border p-4 bg-gray-950`} style={{ backgroundImage: `url(${bgImage})` }} >
      {msg && (
        <h2 className='bg-[#933C24] text-white absolute top-0 p-2 rounded'>
          Sign Up Successfully!
        </h2>
      )}

      {loginMsg && (
        <h2 className='bg-[#933C24] text-white absolute top-0 p-2 rounded'>
          Login Successfully!
        </h2>
      )}
      <div ref={signUpContainer} className={`${styles['form-container']} ${styles['sign-up']} w-[275px] h-[420px] bg-gray-100 max-w-md p-6 rounded-md shadow-md`} >
        <h1 className="text-2xl font-bold text-center mb-6 text-[#933C24]">Sign Up</h1>
        <form onSubmit={handleSignUpSubmit} action="#" className="space-y-4">
          <div className={`${styles['form-group']} flex items-center border p-2 rounded border-black focus-within:border-[#933C24]`}>
            <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
            <input onChange={handleSignInInput} value={inputData.name} name='name' required type="text" placeholder="Username" className="w-full outline-none" minLength={5} maxLength={15} />
          </div>
          <div className={`${styles['form-group']} flex items-center border p-2 rounded border-black focus-within:border-[#933C24]`}>
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
            <input onChange={handleSignInInput} value={inputData.email} name='email' required type="email" placeholder="Email" className="w-full outline-none" minLength={5} maxLength={15} />
          </div>
          <div className={`${styles['form-group']} flex items-center border p-2 rounded border-black focus-within:border-[#933C24]`}>
            <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
            <input onChange={handleSignInInput} value={inputData.password} name='password' required type="password" placeholder="Password" className="w-full outline-none" minLength={5} maxLength={15} />
          </div>
          <div className={`${styles['form-group']} flex items-center border p-2 rounded border-black focus-within:border-[#933C24]`}>
            <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
            <input onChange={handleSignInInput} value={inputData.confirmPassword} name='confirmPassword' required type="password" placeholder="Confirm Password" className="w-full outline-none" minLength={5} maxLength={15} />
          </div>
          <button type="submit" className="w-full bg-[#933C24] text-white py-2 rounded hover:bg-amber-950 transition duration-200" >
            Sign Up
          </button>
          <div className={`${styles['link']}`}>
            <p>
              Already have an account?
              <span onClick={handleSignInStyle} className="text-[#933C24] cursor-pointer hover:text-amber-950 transition duration-200">
                Sign in
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* ------------------------------------Login Page---------------------------------------------- */}
      <div ref={signInContainer} className={`${styles['form-container']} ${styles['sign-in']} w-[275px] h-[420px] bg-gray-100 max-w-md p-6 rounded-md shadow-md`} >
        <h1 className="text-2xl font-bold text-center mt-8 mb-6 text-[#933C24]">Login</h1>
        <form onSubmit={handleLoginSubmit} action="#" className="space-y-6">

          <div className={`${styles['form-group']} flex items-center border p-2 rounded border-black focus-within:border-[#933C24]`}>
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
            <input onChange={handleLogin} name='email' value={loginData.email} required type="email" placeholder="Email" className="w-full outline-none" minLength={5} maxLength={25} />
          </div>

          <div className={`${styles['form-group']} flex items-center border p-2 rounded border-black focus-within:border-[#933C24]`}>
            <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
            <input onChange={handleLogin} name='password' value={loginData.password} required type="password" placeholder="Password" className="w-full outline-none" minLength={5} maxLength={15} />
          </div>

          <div className={`${styles['forgot-pass']}`}>
            <span className="text-[#933C24] hover:text-amber-950 transition duration-200">Forgot password?</span>
          </div>
          <button type="submit" className="w-full bg-[#933C24] text-white py-2 rounded hover:bg-amber-950 transition duration-200" >
            Login
          </button>
          <div className={`${styles['link']}`}>
            <p>
              Don’t have an account?
              <span onClick={handleSignUp} className="text-[#933C24] cursor-pointer hover:text-amber-950 transition duration-200">
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
