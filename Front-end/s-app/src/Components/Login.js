import { Card } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const Login = () => {

    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const login = async () => {
        navigate('/')
        /*await axios.get('http://localhost:5000/admin')
            .then(result => {
                result.data.map(user => {
                    if (user.email === input.email) {
                        if (user.password === input.password) {
                            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                Log In success
                            </Alert>
                            navigate('/')

                        }
                    }
                })
            })*/

    }
    return (
        <div className='login'>
            <Card sx={{
                m: 1, height: "300px"
            }}>
                <h2>Log In</h2>
                <form>
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        onChange={(e) => setInput({ ...input, email: e.target.value })} />
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        onChange={(e) => setInput({ ...input, password: e.target.value })} />
                    <button onClick={login}>Login</button>
                </form>
            </Card>
        </div>
    )
}
export default Login