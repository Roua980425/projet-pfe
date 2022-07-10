import { useLocation,useNavigate } from "react-router-dom"
import React, { Component }  from 'react';

export const setToken = (token)=>{

    localStorage.setItem('temitope', token)// make up your own token
}

export const fetchToken = (token)=>{

    return localStorage.getItem('temitope')
}

export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){

        return <useNavigate to='/' state ={{from : location}}/>;
    }

    return children;
}
