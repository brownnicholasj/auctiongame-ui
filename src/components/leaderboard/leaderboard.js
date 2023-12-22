import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import TableContainer from '../table/TableContainer';

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState({ users: [] });

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
			<div>
				<h1>User Leaderboard</h1>
				<TableContainer
					data={leaderboardData.users.map((user) => ({
						rank: user.rank,
						name: user.name,
						totalScore: user.totalScore,
					}))}
					headers={['Rank', 'Name', 'Total Score']}
				/>
			</div>
			{leaderboardData.users.map((user) => (
				<div key={user.id}>
					<h2>{user.name}'s Teams</h2>
					<TableContainer
						data={user.matchedTeams}
						headers={['Name', 'Wins', 'Losses']}
					/>
				</div>
			))}
		</>
	);
};

export default Leaderboard;
