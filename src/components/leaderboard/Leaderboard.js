import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserTeamsTable from './UserTeamsTable';
import TeamRecords from './TeamRecords';

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState({ users: [] });
	const [visibleTeams, setVisibleTeams] = useState({});

	const toggleTeamsVisibility = (userId) => {
		setVisibleTeams((currentVisibleTeamsUserId) =>
			currentVisibleTeamsUserId === userId ? null : userId
		);
	};

	useEffect(() => {
		const fetchLeaderboardData = async () => {
			try {
				const response = await fetch(API_URL + '/getLeaderboardData');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setLeaderboardData(data);
			} catch (error) {
				console.error('Fetching leaderboard data failed:', error);
			}
		};

		fetchLeaderboardData();
	}, []);

	return (
		<>
			<div className='user-leaderboard-container'>
				<TableContainer
					sx={{ minWidth: 400, maxWidth: 400, marginTop: 2, marginLeft: 2 }}
					component={Paper}
				>
					<Table aria-label='leaderboard table'>
						<TableHead>
							<TableRow>
								<TableCell>Rank</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Total Score</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{leaderboardData.users.map((user) => (
								<TableRow
									key={user.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									onClick={() => toggleTeamsVisibility(user.id)}
								>
									<TableCell>{user.rank}</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.totalScore}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				{leaderboardData.users.map(
					(user) =>
						visibleTeams === user.id && (
							<UserTeamsTable
								key={user.id}
								userName={user.name}
								matchedTeams={user.matchedTeams}
							/>
						)
				)}
			</div>
			<TeamRecords />
		</>
	);
};

export default Leaderboard;
