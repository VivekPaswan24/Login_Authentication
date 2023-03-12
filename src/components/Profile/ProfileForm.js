import axios from 'axios';
import { useContext, useRef } from 'react';
import AuthContext from '../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef=useRef();

  const authCtx=useContext(AuthContext);

  const passwordChangeHnadler=async(event)=>{
    event.preventDefault();

    const enteredNewPassword=newPasswordInputRef.current.value;

    try{
      await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB1iK65FMYWFrjJYGx9PebXpYwZbDcaJ80',{
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:true
      })
      alert('Password Changed')
    }catch(error){
      alert(error.response.data.error.message)
    }

  }

  return (
    <form className={classes.form} onSubmit={passwordChangeHnadler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
