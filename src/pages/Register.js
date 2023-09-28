import React , { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {API_BASE_URL} from '../../src/config'
import { useNavigate} from 'react-router-dom'




const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    


    const signup = (event) => {
        event.preventDefault();

        setLoading(true)
        const requestdata = {firstName : firstName, lastName ,  email, password}
        

        axios.post(`${API_BASE_URL}/signup`, requestdata)
        .then((result)=>{
            if(result){
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'User registered successfully'
            })
        }

        navigate('/Login');

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

        })
        .catch((error)=>{
            console.log(error)
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Some problem occured'
            })

        })
    }
  return (
    <div>
        <div className='login-form'>
        
        <div className='topp'>
        <form onSubmit={(e) => signup(e)}>
          <h2 className='text-center'>Registration form</h2>
          { loading ?<div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Last Name</label>
            <input type="text" value={lastName} onChange={(ev) => setLastName(ev.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Email Address</label>
            <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="exampleInputPassword1" />
          </div>
          
          <button type="submit" className=" form-control btn btn-primary">Submit</button>
          
        </form>
            </div>
            </div>
    </div>
  )
}

export default Register