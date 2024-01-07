import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import TableContainer from '../table/TableContainer';
import {
	sortTeamsByConference,
	groupTeamsByConferenceAndDivision,
} from '../../helpers/teamHelpers';

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
				{Object.entries(recordData.teams).map(([group, teams]) => (
					<div key={group}>
						<TableContainer
							data={teams.map(({ name, wins, losses, playoffBerth }) => ({
								name,
								wins,
								losses,
								playoffBerth,
							}))}
							headers={['Name', 'Wins', 'Losses', 'Playoff Berth']}
							className='team-records'
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default TeamRecords;
