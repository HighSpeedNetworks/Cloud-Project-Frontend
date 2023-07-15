import {
	Link,
	View,
	withAuthenticator,
} from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { listRooms } from '../src/graphql/queries'
import { createRoom } from '../src/graphql/mutations'
import NextLink from 'next/link'
import config from '../src/aws-exports'
import { Amplify } from 'aws-amplify'

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
//import makeStyles from '@mui/material/styles/makeStyles'


Amplify.configure({ ...config, ssr: true })

/*const useStyles = makeStyles((theme) => ({
	root: {
	  backgroundImage: 'url("../AUT.jpg")',
	  backgroundSize: 'cover',
	  backgroundPosition: 'center',
	  width: '100%',
	  height: '100vh',
	  display: 'flex',
	  flexDirection: 'column',
	  justifyContent: 'center',
	  alignItems: 'center',
	},
  }));*/

function Home({ signOut, user }) {
	const [rooms, setRooms] = useState([])
	const [roomName, setRoomName] = useState('')

	//TODO: add bg image
	//const classes = useStyles();

	useEffect(() => {
		API.graphql({
			query: listRooms,
		}).then(({ data }) => {
			setRooms(data.listRooms.items)
		})
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const { data } = await API.graphql({
			query: createRoom,
			variables: {
				input: {
					name: roomName,
				},
			},
		})

		setRooms([...rooms, data.createRoom])
	}

	return (
		<View>

			<AppBar position="static" style={{backgroundColor:'#3e8a7b',borderRadius: '5px',}}>
      			<Toolbar style={{ justifyContent: 'space-between' }}>
        			<Typography variant="h6" component="div">
          				High Speed Network Chat Application
        			</Typography>

					<Button variant="contained" endIcon={<LogoutIcon />}
					 	style={{ alignContent:'end', color: 'white', backgroundColor:'#367569'}}
						onClick={signOut}>Sign Out</Button>

      			</Toolbar>
    		</AppBar>

			<Box display="flex" justifyContent="center" alignItems="center" height="100vh" >
				<Container maxWidth="md" backgroundColor="#367569"
					style={{
						background: 'linear-gradient(rgba(54, 117, 105, 0.1), rgba(54, 117, 105, 0.1)), #bdfff3',
						borderRadius: '5px',
						padding: '1rem',
					  }}>
		    		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

		      			<Typography variant="subtitle1" style={{ width: '100%', textAlign: 'left' }}>
		        			Hi, {user.username}. Select a room to chat in or create your own public room.
		      			</Typography>

      					<form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', marginTop: '1rem' }}>
      			  			<TextField
      			  			  id="outlined-basic"
      			  			  label="New Room Name"
      			  			  variant="outlined"
      			  			  onChange={(e) => setRoomName(e.target.value)}
      			  			  style={{ width: '80%', marginRight: '1rem' }}
      			  			/>
      			  			<Button
      			  			  variant="contained"
      			  			  endIcon={<DoneAllIcon />}
      			  			  style={{ color: 'white', backgroundColor: '#367569',
								width: '20%', fontSize: '0.67rem', verticalAlign:'center'  }}
      			  			  type="submit"
      			  			>
      			  				Submit Room
      			  			</Button>
      					</form>

						<TableContainer component={Paper} style={{ marginTop: '1rem' }}>
        					<Table>
        					  <TableHead>
        					    <TableRow
								style={{
									backgroundColor: '#59c2af',
								  }}>
        					    <TableCell>
									<Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
										Application Rooms <MeetingRoomIcon style={{ marginRight: '8px', verticalAlign: 'middle' }}/>
		      						</Typography>
								</TableCell>
        					    </TableRow>
        					  </TableHead>
        					  <TableBody>
        					    {rooms.map((room) => (
        					      <TableRow key={room.id}
								  	style={{ cursor: 'pointer' }}
								  	hover>

        					        <TableCell>
        					          <NextLink href={`/rooms/${room.id}`}>
        					            <Link>{room.name}</Link>
        					          </NextLink>
        					        </TableCell>
        					      </TableRow>
        					    ))}
        					  </TableBody>
        					</Table>
      					</TableContainer>

    				</div>
  				</Container>
			</Box>
		
		</View>
	)
}

export default withAuthenticator(Home, {
	signUpAttributes: ['email', 'given_name', 'family_name'],
})
