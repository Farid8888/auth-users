import { useState, useRef, useContext,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState('')
  
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

useEffect(()=>{
  if(error){
    toast.error(error,{
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     })
   }
   return ()=>setError('')
},[error])

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;


    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxjZWy_jPeAhtycK-gdONvDToWrViZrco'
    } else {
      url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxjZWy_jPeAhtycK-gdONvDToWrViZrco'
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            const errMess = data.error.message
            let errorMessage = 'Authentication failed!';
            if(errMess === 'EMAIL_EXISTS'){
              errorMessage = 'Пользователь существует'
            }else if(errMess === 'WEAK_PASSWORD : Password should be at least 6 characters'){
              errorMessage ='Слабый пароль'
            }else if(errMess === 'EMAIL_NOT_FOUND'){
              errorMessage = 'Пользователь не найден'
            }else if(errMess === 'INVALID_PASSWORD'){
              errorMessage = 'Неправильный пароль'
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history('/users');
      })
      .catch((err) => {
        setError(err.message)
      });
  };

  return (
    <section className={classes.auth}>
      <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
theme={'colored'}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
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
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
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
