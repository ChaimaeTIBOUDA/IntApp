import React from 'react'
import { Avatar, Button, Card, CardActionArea, CardContent, Chip, Dialog, DialogActions, DialogTitle, FormControl, IconButton, Input, InputLabel, Select, Stack, Tooltip } from '@mui/material'
import { blue, indigo, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { useNavigate, Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box, Typography, Drawer } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import axios from 'axios';

const Interns = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [name, setName] = useState()
  const [firstname, setFirstname] = useState()
  const [cin, setCin] = useState()
  const [adress, setAdress] = useState()
  const [phone, setPhone] = useState()
  const [degree, setDegree] = useState()
  const [field, setField] = useState()
  const [duration, setDuration] = useState()
  const [stat, setStat] = useState()
  const [users, setUsers] = useState([])
  const [value, setValue] = useState()
  const sortOption = ["name"]
  const [sortValue, setSortValue] = useState()
  useEffect(()=> {
      axios.get('http://localhost:5000')
      .then(res => {
        console.log(res)
        setUsers(res.data)})
      .catch(err => console.log(err))
  }, [])

  const handelSearch = async () => {
    return await axios.get(`http://localhost:5000/search/${value}`)
    .then((response) => {
      console.log(response)
      setUsers(response.data)
      setValue("")
    })
    .catch((err)=> console.log(err))
  }

  const handleSort = async (e) => {
    let value = e.target.value
    setSortValue(value)
    return await axios.get(`http://localhost:5000/sort`)
    .then((response) => {
      console.log(response)
      setUsers(response.data)
    })
    .catch((err)=> console.log(err))
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
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: blue[400],
    '&:hover': {
      backgroundColor: blue[700],
    },
  }));
  const handleclick = () => {
    const stag = { name, firstname, cin, adress, phone, degree, field, duration, stat }
    axios.post('http://localhost:5000/Add', stag )
    .then((res) => {
      setIsDrawerOpen(false)
      window.location.reload()
    })
    .catch(err=>console.log(err))
  }
   const handleFilter = async (statut) => {
     return await axios.get(`http://localhost:5000/filter/?stat=${statut}`)
     .then((response) => {
       setUsers(response.data)
     })
     .catch((err)=>console.log(err))

   }
   const handleDelete = (id) => {
    axios.delete('http://localhost:5000/deleteUser/'+id)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err)=>console.log(err))
   }
   const handledelte = () => {
    axios.get('http://localhost:5000')
    .then((response) => {
      setUsers(response.data)
    })
    .catch((err)=>console.log(err))
   }
 
  return (
      <div className='Stag'>
        <Typography variant='h3' gutterBottom color={blue[500]}
        sx={{ml:{lg:70, xs:20, sm:40, md:58, xl:90}, mt:12}}
        >Interns</Typography>
        <Box sx={{ml:{lg:67, xs:25, sm:40, md:55, xl:90}, display: "flex", flexWrap: "wrap", width:{
          xs: 80,lg: 150
        }, }}>
        <Stack direction={{xs: 'column', sm:'row', lg: 'row'}}>
        <Chip  onClick={()=>{handleFilter("on going")}} onDelete={handledelte}  clickable label="on going" sx={{mr:2}}/>
        <Chip  onClick={()=>{handleFilter("on wait")}} onDelete={handledelte} clickable label="on wait" sx={{mt:{xs:1, lg:0, sm:0}}}/>
        </Stack>
        </Box>
        <TextField
        id="standard-search"
          variant="standard"
          sx={{ml:12, width:{xs:130, lg:200, sm:180, md:200, xl:220}, mt:{lg:-15, sx:0, md: -12}}}
          helperText="Search intern"
          color='primary' 
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <IconButton onClick={handelSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        value={value}
        onChange={(e)=>setValue(e.target.value)}></TextField>
        <Stack direction={{xs: 'column', lg: 'row', sm:'column'}}>
          <Box sx={{ml:10}}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
            <InputLabel>Sort by</InputLabel>
            <Select 
            id="sort"
            label="Sort by"
            sx={{width:"100px"}}
            value={sortValue}
            onChange={handleSort}
            >
              {sortOption.map((item, index) => (
              <MenuItem value={item} key={index}>{item}</MenuItem>
              ))}
            </Select>
            </FormControl>
            </Box>
            <ColorButton sx={{width:'200px', ml:{xs:28, lg:100, sm:65, md:90, xl:150}}}
              onClick={() => setIsDrawerOpen(true)}>Add an intern</ColorButton>
            <Drawer className='add'
              anchor='right'
              color={blue[500]}
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Box
                component="form"
                width='300px'
                mt={1}
                ml={2}
                mr={0.5}
                noValidate
                autoComplete="off"
              >
                <Typography
                  variant='h5'
                  mt={7}
                  textAlign="center"
                >Add Intern</Typography>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Last name"
                  variant="outlined"
                  size='small'
                  margin='normal'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="First name"
                  size='small'
                  margin='normal'
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <TextField
                  id="CIN"
                  required
                  fullWidth
                  label="CIN"
                  type="text"
                  inputMode='numeric'
                  pattern="[0-9]*"
                  variant="outlined"
                  size='small'
                  margin='normal'
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  id="Adress"
                  label="Adress"
                  variant="outlined"
                  size='small'
                  margin='normal'
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                />
                <TextField
                  id="Phone"
                  required
                  fullWidth
                  label="Phone"
                  type="text"
                  inputMode='numeric'
                  pattern="[0-9]*"
                  variant="outlined"
                  size='small'
                  margin='normal'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  id="degree"
                  select
                  fullWidth
                  required
                  label="Degree"
                  variant="outlined"
                  margin='normal'
                  size='small'
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                >
                  {niveau.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  fullWidth
                  id="Field of degree"
                  label="Field of degree"
                  variant="outlined"
                  size='small'
                  margin='normal'
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                />
                
                 <TextField
                  id="duration"
                  select
                  required
                  fullWidth
                  label="Duration of internship"
                  variant="outlined"
                  size='small'
                  margin='normal'
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >{Duration.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
                <TextField
                  id="Statut"
                  select
                  required
                  fullWidth
                  label="Statement of internship"
                  variant="outlined"
                  margin='normal'
                  size='small'
                  value={stat}
                  onChange={(e) => setStat(e.target.value)}
                >
          <MenuItem value="on going">on going</MenuItem>
          <MenuItem value="on wait">on wait</MenuItem>
                </TextField>
              </Box>
              <Button variant="outlined" size="medium"
                sx={{ ml: 3, width:'100px', mt:2 }}
                onClick={() => setIsDrawerOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" size="medium"
                sx={{ ml:20, mt: -4.4, width:'100px', mb:2 }}
                onClick={handleclick}>
                Add
              </Button>
            </Drawer>
            </Stack>
          <Stack sx={{mt:2}}>
            {
              users && users.map((d)=> (
              <div className='list' key={d._id}>
                  <Card sx={{width:{xs:350,lg:1150, sm:700, md:900, xl:1550},
                  height:'100px', mt:1, ml:{lg:10, xs:9}}}
                  >
                    <CardActionArea>
                  <CardContent sx={{ flex: '1 0 auto' }}
                  >
                  <Link to={`/IntDetails/${d._id}`}>
                    <Avatar sx={{width: 56, height: 56}}></Avatar>
                    <Typography component="div" variant='h6' color={grey[900]} sx={{mt:-8, ml:8}}>
                      {d.name} {d.firstname}
                    </Typography>
                    </Link>
                    <Typography variant='subtitle2'sx={{ml:8}}>
                      {d.degree} {d.field}
                    </Typography>
                    <Typography variant="subtitle" sx={{ml:8}}>statement of internship: {d.stat}</Typography>
                 
                  <Tooltip title="Edit">
                  <Link to={`/Edit/${d._id}`}>
                  <IconButton aria-label="modify" edge='end' sx={{ml:{lg:140, xs:33, sm:65, md:70, xl:143}, mt:{lg:-5, xs:-10}}} color='primary' >
                  <CreateTwoToneIcon  />
                  </IconButton>
                  </Link>
                  </Tooltip>
                  <Tooltip title="Delete">
                  <IconButton aria-label="delete" edge='end' sx={{ml:{lg:1, xs:36, sm:70, md:102, xl:180}, mt:{lg:-9, xs:-14}}} color='primary' onClick={()=>{handleDelete(d._id)}} >
                  <DeleteIcon/>
                  </IconButton>
                  </Tooltip>
                  </CardContent>
                  </CardActionArea>
                  </Card>
              </div>
            ))}
          </Stack>
            <Pagination count={3} variant="outlined" color="primary"
              sx={{ ml:{xs:15, lg:60, sm:35, md:45, xl:85}, mt:2 }}
            />
      </div>
  )
}
export default Interns
