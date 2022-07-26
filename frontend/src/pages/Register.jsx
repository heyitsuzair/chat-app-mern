import React from 'react';
import { useState,useEffect } from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/img/logo.png'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
function Register() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        username:'',
        email:'',
        password:'',
        cpassword:''
    })
    const toastOptions = {
        position:'top-right',
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        if(handleValidation()){
            const {password,username,email} = value;
         const {data}=  await axios.post(registerRoute,{
            username,email,password
           });
           if(data.status === false){
            toast.error(data.msg,toastOptions)
           }
           else if(data.status === true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.insertUser))
            navigate('/');
           }
        }
    }
    const handleValidation =  ()=>{
        const {password,cpassword,username,email} = value;
        if(cpassword!==password){
            toast.error('Password And Confrim Password Should Be Same',toastOptions);
            return false;
        }
        else if(username.length < 3){
            toast.error('Username Should Be Greater Than 3 Characters',toastOptions)
            return false;
        }
        else if(password.length < 8){
            toast.error('Password Should Be Equal Or  Greater Than 8 Characters',toastOptions)
            return false;
        }
        else if(email === ''){
            toast.error('Email Is Required',toastOptions)
            return false;
        }
        return true;
    }
    const handleChange = (e)=>{
        setValue({...value,[e.target.name]:e.target.value});
    }
  return (
    <>
        <FormContainer>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="brand">
                    <img src={logo} alt="" />
                    <h1>Chat App</h1>
                </div>
                <input type="text" name="username" placeholder='Username' onChange={(e)=> handleChange(e)} value={value.username} />
                <input type="email" name="email" placeholder='Email' onChange={(e)=> handleChange(e)} value={value.email} />
                <input type="password" name="password" placeholder='Password' onChange={(e)=> handleChange(e)} value={value.password} />
                <input type="password" name="cpassword" placeholder='Confirm Password' onChange={(e)=> handleChange(e)} value={value.cpassword} />
                <button type="submit">Create User</button>
                <span>Already Have An Account? <Link to="/login">Login</Link> </span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </>
  )
}
const FormContainer = styled.div `
height:100vh;
width:100vw;
display:flex;
justify-content:center;
align-items:center;
gap:1rem;
flex-direction:column;
background-color:#131324;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:.1rem solid #4e0eff;
        border-radius:.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:.1rem solid #997af0;
            outline:none;
        }
    }
    button{
        background-color:#997af0;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:.5s ease-in-out;
        &:hover{
            background-color:#4e0eff;
        }
    }
    span{
        color:white;
        text-transform:uppercase;
        a {
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
}
`;

export default Register;