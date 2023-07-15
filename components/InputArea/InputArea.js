import {
	label,
	View,
} from '@aws-amplify/ui-react'
import { Storage } from 'aws-amplify'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';
//import chatbg from '../../Images/chatbg.jpg'
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';


export const InputArea = ({ onMessageSend }) => {
	const [selectedImage, setSelectedImage] = useState(null)
	const [messageText, setMessageText] = useState('')

	const uploadFile = async (selectedPic) => {
		const { key } = await Storage.put(selectedPic.name, selectedPic, {
			contentType: selectedPic.type,
		})

		return key
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault()
		let key
		if (selectedImage) {
			key = await uploadFile(selectedImage)
		}

		onMessageSend(messageText, key)
		setMessageText('')
	}

	return (
		<View
			style={{
				borderTop: '1px solid lightgray',
				padding: '5px',
			}}
		>
			<div>
				<form style={{ display: 'flex', width: '100%', marginTop: '1rem' }}>
      				<TextField
						rows={2}
      					id="outlined-basic"
      					label="Type a Massage"
      					variant="outlined"
						onChange={(e) => {
							setMessageText(e.target.value)
						}}
						value={messageText}
      					style={{ width: '90%', marginRight: '1rem' }}
      				/>
					<input accept="image/*" id="icon-button-file" type="file"
						onChange={(e) => setSelectedImage(e.target.files[0])} hidden/>
  					<label htmlFor="icon-button-file" style={{ width: '10%', marginRight: '1rem', verticalAlign:'center'}}>
						<Tooltip title="Attach File" placement="top">
							<IconButton component="span" >
  					    		<AttachFileIcon sx={{ fontSize: 35, color: grey[900],verticalAlign:'center' }}/>
  					  		</IconButton>
						</Tooltip>
  					</label>
      			</form>
				<form onSubmit={handleFormSubmit} style={{ display: 'flex', width: '100%', marginTop: '1rem' }}>
      				<Button
      				  variant="contained"
      				  endIcon={<SendIcon />}
      				  style={{ color: 'white', backgroundColor: '#367569',
						width: '100%', fontSize: '0.67rem', verticalAlign:'center'  }}
      				  type="submit"
      				>
      					Send
      				</Button>
      			</form>
				
			</div>
		</View>
	)
}
