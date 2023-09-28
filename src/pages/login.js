import React , { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {API_BASE_URL} from '../../src/config'
import {useDispatch} from 'react-redux';
import {Link ,  useNavigate} from 'react-router-dom'



const Login = () => {

  const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const [loading, setLoading] = useState(false);

        const dispatch = useDispatch();
        const navigate = useNavigate();
        
    
    
        const login = (event) => {
            event.preventDefault();
    
            setLoading(true)
            const requestdata = { email, password}
    
            axios.post(`${API_BASE_URL}/login`, requestdata)
            
            .then((result)=>{
                
                if(result){
                setLoading(false);

                localStorage.setItem("token", result.data.result.token);
                localStorage.setItem('user', JSON.stringify(result.data.result.user));

                dispatch({ type: 'LOGIN_SUCCESS' , payload: result.data.result.user });
                setLoading(false);
                navigate('/AddSale');
                
            }
    
            
            setEmail('');
            setPassword('');
    
            })
            .catch((error)=>{
                console.log(error)
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error
                })
    
            })
        }
  return (
    <div className='login-form'>
        
<div className='topp'>
<form onSubmit={(e)=>login(e)}>
  <h2 className='text-center'>Login form</h2>

  { loading ?<div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" onChange={(ev) => setEmail(ev.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" onChange={(ev) => setPassword(ev.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" className=" form-control btn btn-primary">Submit</button>
  <Link to="/Register">
  <button type="submit" className=" form-control  btn mt-3">Dont have an account ? Register Here</button></Link>
</form>
    </div>
    </div>
  )
}

export default Login