import axios from 'axios';
import { useState, useRef, useContext } from 'react';
import AuthContext from '../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [request,setRequest]=useState(false)
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const authctx=useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=async(event)=>{
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value
    const enteredPassword=passwordInputRef.current.value
    if(isLogin){
      try{
        setRequest(true)
        let response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1iK65FMYWFrjJYGx9PebXpYwZbDcaJ80',{
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        })
        authctx.login(response.data.idToken)
        setRequest(false)
      }catch(error){
        alert(error.response.data.error.message)
        setRequest(false)
      }
    }else{
      try{
        setRequest(true)
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1iK65FMYWFrjJYGx9PebXpYwZbDcaJ80',{
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        })
        setRequest(false)
      }catch(error){
        alert(error.response.data.error.message)
        setRequest(false)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!request ? <button type='submit'>{isLogin ? 'Login' :'Create Account'}</button> : 'Sending request..'}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
