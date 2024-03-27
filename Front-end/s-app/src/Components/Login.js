import { Box, Card, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { blue, indigo, grey } from '@mui/material/colors';
import axios from 'axios'
import '../login.css';

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login =  () => {
         axios.post('http://localhost:5000/login', {email, password})
            .then(res => {
                console.log(res)
                if(res.data == "Success"){
                    navigate('/')
                }else {
                    alert("Email or password incorrect")
                }
            })

    }
    return (
        <div className='login'>
            <Card sx={{
                ml:70, mt:20, height: "400px", width: "400px"
            }}>
                <Typography variant='h4' color={blue[500]} sx= {{mt:1, mx:17,mb:1}} >LogIn</Typography>
                <Box method='post'
                omponent="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                    <TextField
                    label="Email"
                    variant='filled'
                        required
                        onChange={(e) => setEmail(e.target.value)} />
                    <TextField
                    label="Password"
                        type="password"
                        variant='filled'
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                    <button type='submit' onClick={login}>Login</button>
                
            </Card>
        </div>
    )
}
export default Login