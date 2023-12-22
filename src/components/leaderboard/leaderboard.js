import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import TableContainer from '../table/TableContainer';

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState({ users: [] });

	const userHeaders = ['Rank', 'Name', 'Total Score'];

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
			<TableContainer data={leaderboardData} headers={userHeaders} />
		</div>
	);
};

export default Leaderboard;
