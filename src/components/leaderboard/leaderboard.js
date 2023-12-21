import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';

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
		<div>
			<h1>User Leaderboard</h1>
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>User</th>
						<th>Total Score</th>
					</tr>
				</thead>
				<tbody>
					{leaderboardData.users.map((user, index) => (
						<tr key={user.id}>
							<td>{user.rank}</td>
							<td>{user.name}</td>
							<td>{user.totalScore}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Leaderboard;
