import { Box, Button, Card, CardContent, Avatar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import useFetch from '../useFetch'
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

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
  const [image, setImage] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const Data = useFetch(`http://localhost:5000/User/` + id)
  const handleUpdate = () => {
    const stag = { name, firstname, cin, adress, phone, degree, field, duration, stat }
    axios.patch("http://localhost:5000/Edit/" + id, stag)
      .then((res) =>
        console.log(res),
        navigate("/Dashboard"))
      .catch (err => console.log(err))
  }
    const Pic = () => {
      let profilePic = document.getElementById("profile-pic")
      let hiddenInput = document.getElementById("hidden-input")
      hiddenInput.onchange = function () {
        profilePic.src = URL.createObjectURL(hiddenInput.files[0])
      }
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
        value: '1 month',
        label: '1 month',
      },
      {
        value: '2 months',
        label: '2 months',
      },
      {
        value: '3 months',
        label: '3 months',
      },
      {
        value: '6 months',
        label: '6 months',
      },
    ]
    return (

      <div>
        <Typography variant='h3' color='primary' sx={{ ml: { lg: 55, xs: 15, sm: 25, md: 43, xl: 65 }, mt: 10 }}>Edit Intern Information</Typography>
        <Card sx={{ ml: { lg: 50, xs: 8, sm: 25, md: 35, xl: 70 }, height: { lg: 570, md: 570, sm: 570, sx: 570 }, width: { lg: 500, xs: 400, md: 500 }, mt: 3 }}>
          <CardContent>
            <Box component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: { lg: '25ch', xs: '18ch', md: '25ch' } },
              }}
              noValidate
              autoComplete="off">
              <img className='profileimg' id='profile-pic' src='https://i.pinimg.com/564x/ad/73/1c/ad731cd0da0641bb16090f25778ef0fd.jpg' />
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ ml: { lg: 15, sm: 12 } }}
              >
                Upload image
                <VisuallyHiddenInput type="file" id='hidden-input' onClick={Pic} onChange={(e) => setImage(e.target.files[0])} />
              </Button>
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
                    focused />
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
                    id="Statut"
                    select
                    required
                    focused
                    fullWidth
                    label="Statement of internship"
                    margin='normal'
                    size='small'
                    defaultValue={Data.stat}
                    onChange={(e) => setStat(e.target.value)}
                  >
                    <MenuItem value="on going">on going</MenuItem>
                    <MenuItem value="on wait">on wait</MenuItem>
                  </TextField>
                </div>
              )}
            </Box>
            <Button variant='contained' onClick={handleUpdate} sx={{ ml: { lg: 12, xs: 5 } }}>Update</Button>
            <Button variant='contained' onClick={() => navigate('/Interns')} sx={{ ml: { lg: 2, xs: 1 } }}>Cancel</Button>
          </CardContent>
        </Card>

      </div>
    )
  }
  export default Edit