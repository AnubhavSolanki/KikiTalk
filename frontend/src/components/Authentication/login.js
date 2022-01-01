import React,{useState} from 'react'
import qs from 'qs';
import axios from "axios";
import { fixPayload } from './fieldCheck';

const Login = () => {
    const [state, setstate] = useState({
        email : "",
        password : "",
    });
    
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const handleChange = (e)=>{
        const {id,value} = e.target;
        setstate(prevState =>({
            ...prevState,
            [id] : value
        }))
    }

    const fields = [
        {
            id : "email",
            type : "text",
            alias : "Email",
            value  : state.email,
            onChange : handleChange,
        },{
            id : "password",
            type : "password",
            alias : "Password",
            value : state.password,
            onChange : handleChange,
        }
    ]

    const handleLogin = async (e)=>{
        e.preventDefault();
        var payload = {
            'email': (state.email).trim(),
            'password': state.password,
        };
        try{
            payload = await fixPayload(payload);
            const response = await axios.post(`${baseUrl}/auth/login`,qs.stringify(payload)).catch(err => {
                console.log(err.response);
                throw err;
            });
            if(response.status === 200){
                console.log("Logged in");
                console.log(response);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
            {fields.map((field,index) => {
                return (<div key={index}>
                    <label> {field.alias} : </label>
                    <input id={field.id} type={field.type} value={field.value} onChange = {field.onChange}/>
                </div>)
            })}
            <button>Login</button>
            </form>
        </div>
    )
}

export default Login
