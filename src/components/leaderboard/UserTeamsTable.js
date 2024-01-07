import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserTeamsTable = ({ userName, matchedTeams }) => {
	return (
		<>
			<div key={userName} className='user-teams-container'>
				<h2 className='user-teams-header'>{userName}'s Teams</h2>
				<TableContainer component={Paper}>
					<Table aria-label={`${userName}'s teams`}>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='right'>Wins</TableCell>
								<TableCell align='right'>Losses</TableCell>
								<TableCell align='right'>Division Winner</TableCell>
								<TableCell align='right'>Playoff Berth</TableCell>
								<TableCell align='right'>Total Score</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{matchedTeams.map((team) => (
								<TableRow key={team.name}>
									<TableCell component='th' scope='row'>
										{team.name}
									</TableCell>
									<TableCell align='right'>{team.wins}</TableCell>
									<TableCell align='right'>{team.losses}</TableCell>
									<TableCell align='right'>
										{team.divisionWinner ? <CheckCircleIcon /> : ''}
									</TableCell>
									<TableCell align='right'>
										{team.playoffBerth ? <CheckCircleIcon /> : ''}
									</TableCell>
									<TableCell align='right'>{team.totalScore}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	);
};

export default UserTeamsTable;
