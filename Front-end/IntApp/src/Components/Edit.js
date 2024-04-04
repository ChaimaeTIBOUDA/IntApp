import { Box, Button, Card, CardContent, Avatar, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import useFetch from '../useFetch'
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors'


const Edit = () => {

    const [name, setName] = useState('')
  const [firstname, setFirstname] = useState('')
  const [cin, setCin] = useState('')
  const [adress, setAdress] = useState('')
  const [phone, setPhone] = useState('')
  const [degree, setDegree] = useState('')
  const [field, setField] = useState('')
  const [duration, setDuration] = useState('')
  const [stat, setStat] = useState('')
    const [users, setUsers] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const Data = useFetch(`http://localhost:5000/User/` +id)
    const handleUpdate = () => {
        const stag = { name, firstname, cin, adress, phone, degree, field, duration, stat }
        axios.put("http://localhost:5000/Edit/" +id, stag)
    .then((res) =>
    console.log(res),
    navigate("/Interns"))
    .catch(err => console.log(err))
    }
    const niveau = [
      {
        value: 'Bac+2',
        label: 'Bac+2'
      },
      {
        value: 'Bac+3',
        label: 'Bac+3'
      },
      {
        value: 'Bac+5',
        label: 'Bac+5'
      }
    ]
    const Duration = [
      {
        value: '3 months',
        label: '3 months',
      },
      {
        value: '2 months',
        label: '2 months',
      },
      {
        value: '6 months',
        label: '6 months',
      },
      {
        value: '1 months',
        label: '1 months',
      },
    ]
    return (
        
        <div>
        <Typography variant='h3'color='primary' sx={{ml:{lg:55, xs:15, sm:25, md:43, xl:65}, mt:10}}>Edit Intern Information</Typography>
           <Card sx={{ml:{lg:50, xs:8, sm:25, md:35, xl:70}, height:{lg:550, md:550, sm:550, sx:500}, width:{lg:500, xs:400, md:500}, mt:3}}>
            <CardContent>
                <Box component="form"
      sx={{
        '& .MuiTextField-root': { m:1, width: {lg:'25ch', xs:'18ch', md:'25ch'} },
      }}
      noValidate
      autoComplete="off">
        <Avatar sx={{width: 80, height: 80, mx:{lg:25, xs:16, md:22}, mb:2, "&:hover": {
          color:"red"
        }}}/>
        {Data && (
                    <div>
                <TextField
                label="Name"
                value={Data.name}
                margin='normal'
                color='primary'
                focused 
                onChange={e => setName(e.target.value)}
                />
                <TextField
                label="First Name"
                defaultValue={Data.firstname}
                margin='normal'
                focused
                onChange={e => setFirstname(e.target.value)}
                />
                <TextField
                label="CIN"
                defaultValue={Data.cin}
                margin='normal'
                focused 
                onChange={e => setCin(e.target.value)}
                />
                <TextField
                label="Adress"
                defaultValue={Data.adress}
                margin='normal'
                focused
                onChange={e => setAdress(e.target.value)}
                />
                <TextField
                label="Phone"
                defaultValue={Data.phone}
                margin='normal' 
                focused
                onChange={e => setPhone(e.target.value)}
                />
                <TextField
                label="Degree"
                select
                defaultValue={Data.degree}
                focused
                margin='normal'
                onChange={e => setDegree(e.target.value)}
                >
                 {niveau.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))} 
                </TextField>
                <TextField
                label="Field"
                defaultValue={Data.field}
                margin='normal'
                onChange={e => setField(e.target.value)}
                focused/>
                <TextField
                label="Duration of internship"
                select
                defaultValue={Data.duration}
                margin='normal' 
                focused
                onChange={e => setDuration(e.target.value)}
                >
                  {Duration.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))} 
                </TextField>
                <TextField
                label="Statut de stage"
                sx={{ml:10}}
                defaultValue={Data.stat}
                margin='normal'
                onChange={e => setStat(e.target.value)}
                focused />
                </div>
        )}
                </Box>
                <Button variant='contained' onClick={handleUpdate} sx={{ml:{lg:12, xs:5}}}>Update</Button>
                <Button variant='contained' onClick={() => navigate('/Stagiaires')} sx={{ml:{lg:2, xs:1}}}>Cancel</Button>
                </CardContent>
            </Card>  
            
        </div>
    )
}
export default Edit