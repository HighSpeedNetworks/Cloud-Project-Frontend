import { Flex, useTheme, View } from '@aws-amplify/ui-react'
import { useEffect, useState } from 'react'
import { withSSRContext } from 'aws-amplify'
import { InputArea } from '../../components/InputArea'
import { MessageList } from '../../components/Message'
import { ConversationBar } from '../../components/ConversationBar'
import config from '../../src/aws-exports'
import { Amplify, API } from 'aws-amplify'
import { listMessagesForRoom, listRooms } from '../../src/graphql/queries'
import { createMessage } from '../../src/graphql/mutations'
import { onCreateMessageByRoomId } from '../../src/graphql/subscriptions'
import { useRouter } from 'next/router'

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Grid from '@mui/system/Unstable_Grid/Grid'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'


Amplify.configure({ ...config, ssr: true })

function RoomPage({ roomsList, currentRoomData, username }) {
	console.log(username)
	const { tokens } = useTheme()
	const router = useRouter()
	const [messages, setMessages] = useState([])
	const [rooms, setRooms] = useState(roomsList)
	const [currentRoom, setCurrentRoom] = useState(currentRoomData)

	const handleMessageSend = async (newMessage, imgKey) => {
		const createNewMsg = async (text, imageId) => {
			let content = { text, imageId }
			return await API.graphql({
				query: createMessage,
				variables: {
					input: {
						content,
						roomId: currentRoom.id,
					},
				},
			})
		}
		if (newMessage && !imgKey) {
			createNewMsg(newMessage).then(({ data }) =>
				setMessages([data.createMessage, ...messages])
			)
		} else if (!newMessage && imgKey) {
			console.log('the imgkey', imgKey)
			createNewMsg(undefined, imgKey).then(({ data }) =>
				setMessages([data.createMessage, ...messages])
			)
		}
	}

	const handleRoomChange = (roomID) => {
		const newRoom = rooms.find((room) => room.id === roomID)
		setCurrentRoom(newRoom)
		router.push(`/rooms/${roomID}`)
	}

	const handleClick = () => {
		const rootUrl = window.location.origin;
		window.location.href = rootUrl;
	};

	useEffect(() => {
		API.graphql({
			query: listMessagesForRoom,
			variables: {
				roomId: currentRoom.id,
				sortDirection: 'DESC',
			},
		}).then(({ data }) => setMessages(data.listMessagesForRoom.items))
	}, [currentRoom.id])

	useEffect(() => {
		const subscription = API.graphql({
			query: onCreateMessageByRoomId,
			variables: { roomId: currentRoom.id },
		}).subscribe({
			next: ({ value }) => {
				if (value.data.onCreateMessageByRoomId.owner !== username) {
					console.log(value.data.onCreateMessageByRoomId)
					setMessages((currMsgs) => [
						value.data.onCreateMessageByRoomId,
						...currMsgs,
					])
				}
			},
		})

		return () => subscription.unsubscribe()
	}, [currentRoom.id, username])


	return (
		<View>
			<AppBar position="static" style={{backgroundColor:'#3e8a7b',borderRadius: '5px',}}>
      			<Toolbar style={{ justifyContent: 'space-between' }}>
        			<Typography variant="h6" component="div">
          				High Speed Network Chat Application
        			</Typography>

					<Button variant="contained" endIcon={<KeyboardReturnIcon />}
					 	style={{ alignContent:'end', color: 'white', backgroundColor:'#367569'}}
						onClick={handleClick}>Back</Button>

      			</Toolbar>
    		</AppBar>

			<Box display="flex" justifyContent="center" alignItems="center" height="70vh"
				style={{marginTop:'30px'}}>
				<Flex direction="column" height="85vh" width='1000px'>
					<Grid container spacing={2}
						style={{borderRadius: '5px',padding: '1rem', width:'100%'}}>
						<Grid item xs={10} style={{width:'40%'}}>
							<ConversationBar rooms={rooms} onRoomChange={handleRoomChange} />
						</Grid>
		    			<Grid item xs={10} style={{width:'60%'}}>
							<View flex={{ base: 0, medium: 1 }}>

								<View margin="0 auto" maxWidth={{ base: '95vw', medium: '100vw',alignContent:'center' }}>

									<TableContainer component={Paper} style={{ marginTop: '1rem' }}>
        								<Table>
        								  <TableHead>
        								    <TableRow
											style={{
												backgroundColor: '#59c2af',
											  }}>
        								    <TableCell>
												<Typography variant="h6" 
													style={{display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															borderRadius: '5px',
															textAlign: 'center', 
															alignItems: 'center' }}>
													{currentRoom.name}
		      									</Typography>
											</TableCell>
        								    </TableRow>
        								  </TableHead>
        								</Table>
      								</TableContainer>
									<Flex direction="column" height="77vh">
										<MessageList messages={messages} myUsername={username} 
											style={{margin:'10px'}}/>
										<InputArea onMessageSend={handleMessageSend} />
									</Flex>
								</View>
							</View>
						</Grid>
					</Grid>
				</Flex>
			</Box>
		</View>
	)
}

export default RoomPage

export async function getServerSideProps(context) {
	const { API, Auth } = withSSRContext(context)
	try {
		const user = await Auth.currentAuthenticatedUser()
		const { data } = await API.graphql({
			query: listRooms,
		})

		const currentRoomData = data.listRooms.items.find(
			(room) => room.id === context.params.roomId
		)

		return {
			props: {
				currentRoomData,
				username: user.username,
				roomsList: data.listRooms.items,
			},
		}
	} catch (err) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
}
