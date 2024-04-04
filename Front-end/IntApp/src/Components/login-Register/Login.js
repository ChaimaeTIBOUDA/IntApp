import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { blue} from '@mui/material/colors';
import axios from 'axios'
import './styles.css';

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login =  () => {
         axios.post('http://localhost:5000/login', {email, password})
            .then(res => {
                console.log(res)
                if(res.data === "Success"){
                    navigate('/Dashboard')
                }else {
                    alert("Email or password incorrect")
                }
            })

    }
    return (
        <div className='container'>
            <Card sx={{
                ml:{xl:75, xs:5, lg:75,md:60, sm:28}, height: "300px", width: "400px"
            }}>
                <Typography variant='h4' color={blue[500]} sx= {{mt:1, mx:17,mb:1}} >LOGIN</Typography>
                <Box method='post'
                omponent="form"
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '40ch' },
                }}
                noValidate
                autoComplete="off">
                    <TextField
                    label="Email"
                    variant='outlined'
                        required
                        onChange={(e) => setEmail(e.target.value)} />
                    <TextField
                    label="Password"
                        type="password"
                        variant='outlined'
                        required
                        onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                    <Button variant="contained"type='submit' onClick={login}>Login</Button>
                
            </Card>
        </div>
    )
}
export default Login