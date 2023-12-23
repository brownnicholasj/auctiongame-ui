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
			<div>
				<h1 className='user-leaderboard-header'>User Leaderboard</h1>
				<TableContainer
					data={leaderboardData.users.map((user) => ({
						rank: user.rank,
						name: user.name,
						totalScore: user.totalScore,
						onClick: () => toggleTeamsVisibility(user.id),
						isTeamsVisible: visibleTeams[user.id] || false,
					}))}
					headers={['Rank', 'Name', 'Total Score']}
					className='user-leaderboard'
				/>
			</div>
			{/* {leaderboardData.users.map((user) => (
				<div key={user.id}>
					<h2 className='user-teams-header'>{user.name}'s Teams</h2>
					<TableContainer
						data={user.matchedTeams}
						headers={[
							'Name',
							'Wins',
							'Losses',
							'Division Winner',
							'Playoff Berth',
						]}
						className='user-teams'
					/>
				</div>
			))} */}
		</>
	);
};

export default Leaderboard;
