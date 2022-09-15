import React from "react";
import {useNavigate} from 'react-router'
import classes from "../styles/PageNotFound.module.css";

export default function PageNotFound() {
    const navigate = useNavigate()
    const pageHandler = ()=>{
        navigate('/')
    }
  return (
    <div className={classes.page}>
      <h1>Страница не была найденна</h1>
      <button type="button" onClick={pageHandler}>Назад</button>
    </div>
  );
}
