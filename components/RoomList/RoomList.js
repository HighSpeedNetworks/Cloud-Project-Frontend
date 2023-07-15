import {
	View,
} from '@aws-amplify/ui-react'

import React from 'react';
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Typography from '@mui/material/Typography';


export const RoomList = ({ handleMenuToggle, rooms = [] }) => {
	return (
		<View>
			<TableContainer component={Paper} style={{ marginTop: '1rem' }}>
        		<Table>
        		  <TableHead>
        		    <TableRow
					style={{
						backgroundColor: '#59c2af',
					  }}>
        		    <TableCell>
						<Typography variant="subtitle1" style={{ display: 'flex', alignItems: 'center' }}>
							Rooms <MeetingRoomIcon style={{ marginRight: '8px', verticalAlign: 'middle' }}/>
		      			</Typography>
					</TableCell>
        		    </TableRow>
        		  </TableHead>
        		  <TableBody>
        		    {rooms.map((room) => (
						<TableRow key={room.id}
							onClick={() => {
								console.log(room.id)
								handleMenuToggle(room.id)
							}}
							style={{ cursor: 'pointer' }}
					  		hover
						>
						<TableCell>{room.name}</TableCell>
						</TableRow>
        		    ))}
        		  </TableBody>
        		</Table>
      		</TableContainer>
		</View>
	)
}
