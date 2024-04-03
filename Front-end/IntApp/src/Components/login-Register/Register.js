import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { blue} from '@mui/material/colors';
import axios from 'axios'
import './styles.css';

const Register = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [firstname, setFirstname] = useState('')
    const [username, setUsename] = useState('')

    const Register =  () => {
         axios.post('http://localhost:5000/register', {email, password, name, firstname, username})
         .then((res) => {
            console.log(res)
            navigate('/')
          })
          .catch(err=>console.log(err)) 
    }
    return (
        <div className='container'>
            <Card sx={{
                ml:{xl:80, xs:5, lg:75,md:60, sm:28},  height: "500px", width: "400px"
            }}>
                <Typography variant='h4' color={blue[500]} sx= {{mt:1, ml:2,mb:1}} >Add another user</Typography>
                <Box method='post'
                omponent="form"
                sx={{
                  '& .MuiTextField-root': { m:1, width: '40ch' },
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
                        <TextField
                    label="Firstname"
                        type="text"
                        variant='outlined'
                        required
                        onChange={(e) => setFirstname(e.target.value)} />
                        <TextField
                    label="Name"
                        type="text"
                        variant='outlined'
                        required
                        onChange={(e) => setName(e.target.value)} />
                        <TextField
                    label="User_name"
                        type="text"
                        variant='outlined'
                        required
                        onChange={(e) => setUsename(e.target.value)} />
                        </Box>
                    <Button variant="contained"type='submit' onClick={Register}>Add</Button>
                
            </Card>
        </div>
    )
}
export default Register