import { Card, Typography, Box, TableContainer, Paper, Table, TableBody, TableRow, TableCell, Grid, Stack, createTheme } from '@mui/material'
import React, { useState } from 'react'
import { blue } from '@mui/material/colors';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import Link from '@mui/material/Link';
import useFetch from '../useFetch';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadialBarChart, RadialBar,
} from "recharts";

export default function Dashboard() {
  const [value, setValue] = useState("")
  const [data, setData] = useState()
  const Data = useFetch(`http://localhost:5000/filter/?stat=${"on going"}`)
  const Data2 = useFetch(`http://localhost:5000/filter/?stat=${"on wait"}`)
  const num_ongoing = useFetch(`http://localhost:5000/ongoing`)
  const num_onwait = useFetch(`http://localhost:5000/onwait`)

  const Sdata = [
    {
      name: "Jan",
      ns: 10,
    },
    {
      name: "Fev",
      ns: 20,
    },
    {
      name: "Mar",
      ns: 20,
    },
    {
      name: "Avr",
      ns: 20,
    },
    {
      name: "Mai",
      ns: 20,
    },
    {
      name: "Juin",
      ns: 20,
    },
    {
      name: "Juil",
      ns: 15,
    },
    {
      name: "Aout",
      ns: 10,
    },
    {
      name: "Sept",
      ns: 15,
    },
    {
      name: "Oct",
      ns: 5,
    },
    {
      name: "Nov",
      ns: 6,
    },
    {
      name: "Dec",
      ns: 10,
    },
  ]
  const Adata = [
    {
      name: 2018,
      ns: 15,
      fill: "#0d47a1",
    },
    {
      name: 2019,
      ns: 20,
      fill: "#1565c0",
    },
    {
      name: 2020,
      ns: 30,
      fill: "#1976d2",
    },
    {
      name: 2021,
      ns: 32,
      fill: "#1e88e5",
    },
    {
      name: 2022,
      ns: 25,
      fill: "#2196f3",
    },
    {
      name: 2023,
      ns: 27,
      fill: "#42a5f5",
    },
    {
      name: 2024,
      ns: 6,
      fill: "#64b5f6",
    },
  ]
  const style = {
    top: 55,
    left: 300,
    lineHeight: "20px",
  }
  

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={5}
          textAnchor="end"
          fill="#666"
          transform="rotate(-30)"
        >
          {payload.value}
        </text>
      </g>
    )
  }

  return (
    <div className='dash'>
      <Stack direction={{xs: 'column', sm: 'column',lg: 'row', md: 'row', xl:'row'}}>
      <Card sx={{ mt: 10, width: '340px', height: '100px', ml:{xs:8, sm:25, lg:15, md:15, xl:35} }} >
          {num_ongoing && num_ongoing.map((d) => (
            <div>
              <Typography variant='h4' color={blue[500]} sx={{  ml:2, mt:4 }}>{d.number}</Typography>
            </div>
          ))}
          <Typography component="div" variant='h6' color={blue[500]} sx={{ mx: 'auto', mt: -4, ml: 6 }}>On going Interns</Typography>
          <Groups2TwoToneIcon sx={{ fontSize: 55, ml:32, mt:-10}} color='primary' />
      </Card>
      <Card sx={{ width: '340px', height: '100px', ml:{xs:8,sm:25, lg:15}, mt:{xs:2, sm:3,lg:10}}} >
          {num_onwait && num_onwait.map((d) => (
            <div>
             <Typography variant='h4' color={blue[500]} sx={{  ml:2, mt:4 }}>{d.number}</Typography>
            </div>
          ))}
          <Typography component="div" variant='h6' color={blue[500]} sx={{ mx: 'auto', mt: -4, ml: 6 }}>On wait Interns</Typography>
          <Groups2TwoToneIcon sx={{ fontSize: 55, ml:32, mt:-10}} color='primary' />
      </Card>
      </Stack>
      <Stack direction={{xs: 'column', sm: 'column',lg: 'row'}}>
        <Box>
      <Typography variant='h4' color='primary'sx={{mt: 3, ml:{xs:8,sm:15, lg:15, md:20, xl:30}}}>Trainee rate in 2023</Typography>
      <Card sx={{width:{lg:400, xs:350, sm:600},height:'300px', mt:2, ml:{xs:8,sm:15, lg:15, md:20, xl:30}}}>
      <LineChart
      width={420}
      height={300}
      data={Sdata}
      margin={{
        top: 10,
        right:40,
        bottom:5,
        left:0,
      }}
    >
      <XAxis dataKey="name" tick={<CustomizedAxisTick />}  />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="ns"
        stroke="#2979ff"
        activeDot={{ r: 8 }}
      />
    </LineChart>
    </Card>
    </Box>
    <Box>
    <Typography variant='h4' color="primary" sx={{mt:2.5, ml:{xs:8, sm:15,md:20,lg:4,xl:15}}}>Yearlly Trainee rate </Typography>
    <Card sx={{width:{lg:400, xs:350, sm:600},height:'300px', ml:{xs:8, sm:15, lg:4, md:20, xl:15}, mt:2.5}}>
    <RadialBarChart
      width={300}
      height={300}
      cx={150}
      cy={150}
      innerRadius={20}
      outerRadius={140}
      barSize={13}
      data={Adata}
    >
      <Tooltip />
      <RadialBar
        label={{ position: "insideTop", fill: "#fff", fontSize: "12px" }}
        background
        dataKey="ns"
      />
      <Legend
        iconSize={10}
        width={120}
        height={140}
        layout="vertical"
        verticalAlign="top"
        wrapperStyle={style}
      />
      
    </RadialBarChart>
    </Card>
    </Box>
    </Stack>
    <Box>
      <Typography variant='h4' color='primary' sx={{ mt: 3, ml:{xs:8,sm:15, lg:15, md:20, xl:30} }}>On going Interns</Typography>
      <Link href="/Interns" sx={{ ml:{lg: 95, xs:25.8, sm:65, xl:125}}} underline='hover' color='inherit'>Display all Interns</Link>
      <TableContainer component={Paper} sx={{ mt: 1, ml:{xs:8, lg:15, sm:15, md:20, xl:30}, width:{
        xs:350, lg:840, sm:600, xl:950}}}>
        <Table>
          <TableBody sx={{width: '680px'}}>
            {Data && Data.map((item) => (
              <TableRow key={item.id}>
                <Link href={`/IntDetails/${item._id}`}>
                  <TableCell component="th" scope="row" sx={{width: '280px'}}>
                    {item.name} {item.firstname}
                  </TableCell>
                  <TableCell align="right" sx={{width: '280px'}}>{item.duration}</TableCell>
                  <TableCell align="right" sx={{width: '280px'}}>{item.stat}</TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <Box>
      <Typography variant='h4' color='primary' sx={{ mt: 3, ml:{xs:8, lg:15, sm:15, md:20, xl:30} }}>On wait Interns</Typography>
      <Link href="/Interns" sx={{ ml: {lg: 95, xs:25.8, sm:65, xl:125}}} underline='hover' color='inherit' >Display all Interns</Link>
      <TableContainer component={Paper} sx={{ mt: 1, ml:{xs:8, lg:15, sm:15, md:20, xl:30}, width:{
        xs: 350, lg: 840, sm:600, xl:950
      } }}>
        <Table>
          <TableBody>
            {Data2 && Data2.map((item) => (
              <TableRow key={item._id}>
                <Link href={`/IntDetails/${item._id}`}>
                  <TableCell component="th" scope="row" sx={{width: '280px'}}>
                    {item.name} {item.firstname}
                  </TableCell>
                  <TableCell align="right" sx={{width: '280px'}}>{item.duration}</TableCell>
                  <TableCell align="right" sx={{width: '280px'}}>{item.stat}</TableCell>
                </Link>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </div>

  )
}
