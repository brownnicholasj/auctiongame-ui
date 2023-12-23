import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import TableContainer from '../table/TableContainer';

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState({ users: [] });
	const [visibleTeams, setVisibleTeams] = useState({});

	const toggleTeamsVisibility = (userId) => {
		setVisibleTeams((prevState) => ({
			...prevState,
			[userId]: !prevState[userId],
		}));
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
				<h1 className='user-leaderboard-header'>User Leaderboard</h1>
				<TableContainer
					data={leaderboardData.users.map((user) => ({
						rank: user.rank,
						name: user.name,
						totalScore: user.totalScore,
						matchedTeams: user.matchedTeams,
						onClick: () => toggleTeamsVisibility(user.id),
						isTeamsVisible: visibleTeams[user.id] || false,
					}))}
					headers={['Rank', 'Name', 'Total Score']}
					className='user-leaderboard'
				/>
			</div>
		</>
	);
};

export default Leaderboard;
