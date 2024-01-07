import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import TableContainer from '../table/TableContainer';
// import { GETLEADERBOARDDATA } from '../../helpers/backEndData';
import UserTeamsTable from './UserTeamsTable';
import TeamRecords from './TeamRecords';

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState({ users: [] });
	const [visibleTeams, setVisibleTeams] = useState({});

	const toggleTeamsVisibility = (userId) => {
		// Set the visibleUserId to the clicked user's ID if it's not already showing, or to null if it is (to hide it)
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
		// setLeaderboardData(GETLEADERBOARDDATA);
	}, []);

	return (
		<>
			<div className='user-leaderboard-container'>
				<TableContainer
					data={leaderboardData.users.map((user) => ({
						rank: user.rank,
						name: user.name,
						totalScore: user.totalScore,
						matchedTeams: user.matchedTeams,
						onClick: () => toggleTeamsVisibility(user.id),
					}))}
					headers={['Name', 'Total Score']}
					className='user-leaderboard'
				/>
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
