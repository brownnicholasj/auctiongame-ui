import React, { useState, useEffect } from 'react';
import { GETSEASONDATA } from '../../helpers/backEndData';
import TableContainer from '../table/TableContainer';
import {
	sortTeamsByConference,
	groupTeamsByConferenceAndDivision,
} from '../../helpers/teamHelpers';

const TeamRecords = () => {
	const [recordData, setRecordData] = useState({ teams: [] });

	useEffect(() => {
		const sortedTeams = sortTeamsByConference(GETSEASONDATA.teams);
		setRecordData({ teams: sortedTeams });
	}, []);

	const groupedData = groupTeamsByConferenceAndDivision(recordData.teams);

	return (
		<>
			<div className='team-records-container'>
				{Object.entries(groupedData).map(([group, teams]) => (
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
