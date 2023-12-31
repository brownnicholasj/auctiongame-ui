import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import {
	sortTeamsByConference,
	groupTeamsByConferenceAndDivision,
} from '../../helpers/teamHelpers';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from '@mui/material/Grid';

const TeamRecords = () => {
	const [recordData, setRecordData] = useState({ teams: [] });

	useEffect(() => {
		const fetchTeamRecordData = async () => {
			try {
				const response = await fetch(API_URL + '/getAllSeasonData');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				const sortedTeams = sortTeamsByConference(data.teams);
				const groupedTeams = groupTeamsByConferenceAndDivision(sortedTeams);
				setRecordData({ teams: groupedTeams });
			} catch (error) {
				console.error('Fetching teamRecords data failed:', error);
			}
		};

		fetchTeamRecordData();
	}, []);

	return (
		<>
			<div className='team-records-container'>
				<Grid container spacing={2}>
					{Object.entries(recordData.teams).map(([group, teams]) => (
						<Grid item xs={12} md={6} lg={3} key={group}>
							<TableContainer
								component={Paper}
								sx={{ marginBottom: 2, marginTop: 2 }}
							>
								<Table aria-label={`${group} team records`} stickyHeader>
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell align='right'>Wins</TableCell>
											<TableCell align='right'>Losses</TableCell>
											<TableCell align='right'>Playoff Berth</TableCell>
											<TableCell align='right'>Division Winner</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{teams.map(
											({
												name,
												wins,
												losses,
												playoffBerth,
												divisionWinner,
											}) => (
												<TableRow key={name} sx={{ height: '62px' }}>
													<TableCell component='th' scope='row'>
														{name}
													</TableCell>
													<TableCell align='right'>{wins}</TableCell>
													<TableCell align='right'>{losses}</TableCell>
													<TableCell align='right'>
														{playoffBerth ? <CheckCircleIcon /> : ''}
													</TableCell>
													<TableCell align='right'>
														{divisionWinner ? <CheckCircleIcon /> : ''}
													</TableCell>
												</TableRow>
											)
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					))}
				</Grid>
			</div>
		</>
	);
};

export default TeamRecords;
