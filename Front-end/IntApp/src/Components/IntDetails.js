import { Avatar, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { useNavigate, useParams, Link, Form } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { blue } from '@mui/material/colors'
import axios from 'axios'
import useFetch from '../useFetch'
import { styled } from '@mui/material/styles';

const IntDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [image, setImage] = useState('')
    const Data = useFetch(`http://localhost:5000/User/` + id)



    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/deleteUser/' + id)
            .then(result => {
                console.log(result)
                navigate('/Interns')
            })
            .catch(err => console.log(err))
    }
    //Apload photo
    const handelPhoto = () => {
        const formdata = new FormData()
        FormData.append("image", image)
        axios.post('http://localhost:5000/AddPhoto')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Typography variant='h3' color={blue[500]}
                sx={{ ml: { lg: 60, xs: 15, sm: 25, md: 35, xl: 65 }, mt: 12, mb: 3 }}
            >
                Information of intern
            </Typography>
            <Card sx={{ ml: { lg: 50, xs: 8, sm: 25, md: 35, xl: 65 }, height: { lg: 600, sx: 600, md: 600 }, width: { lg: 500, xs: 400, md: 500 } }}>
                <CardContent>
                    {Data && (
                        <div >
                            <img className='profileimg' id='profile-pic' src='https://i.pinimg.com/564x/ad/73/1c/ad731cd0da0641bb16090f25778ef0fd.jpg' />
                            <Box component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: { lg: '25ch', xs: '18ch', md: '25ch' } },
                                }}
                                noValidate
                                autoComplete="off">
                                <TextField
                                    label="Last name"
                                    value={Data.name}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    margin='normal'
                                    color='primary'
                                    focused />
                                <TextField
                                    label="First name"
                                    value={Data.firstname}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    margin='normal'
                                    focused />
                                <TextField
                                    label="CIN"
                                    value={Data.cin}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    margin='normal'
                                    focused />
                                <TextField
                                    label="Adress"
                                    defaultValue={Data.adress}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    margin='normal'
                                    focused />
                                <TextField
                                    label="Phone"
                                    defaultValue={Data.phone}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    margin='normal'
                                    focused />
                                <TextField
                                    label="Degree"
                                    defaultValue={Data.degree}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    focused
                                    margin='normal' />
                                <TextField
                                    label="Field of study"
                                    defaultValue={Data.field}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    margin='normal'
                                    focused />
                                <TextField
                                    label="Duration of internship"
                                    defaultValue={Data.duration}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    margin='normal'
                                    focused />
                                <TextField
                                    label="Statement of internship"
                                    defaultValue={Data.stat}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    margin='normal'
                                    focused />
                            </Box>
                            <Link to={`/Edit/${Data._id}`}>
                                <Button variant='contained' sx={{ ml: { lg: 12, xs: 10 } }}>Edit</Button></Link>
                            <Button variant='contained' sx={{ ml: { lg: 2, xs: 1 } }} onClick={() => handleDelete(Data._id)}>Delete</Button>
                        </div>
                    )}
                </CardContent>

            </Card>
        </div>
    )
}
export default IntDetails