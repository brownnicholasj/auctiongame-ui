import React from 'react';
import TableContainer from '../table/TableContainer';

const UserTeamsTable = ({ userName, matchedTeams }) => {
	return (
		<>
			<div key={userName}>
				<h2 className='user-teams-header'>{userName}'s Teams</h2>
				<TableContainer
					data={matchedTeams}
					headers={[
						'Name',
						'Wins',
						'Losses',
						'Division Winner',
						'Playoff Berth',
						'Total Score',
					]}
					className='user-teams'
				/>
			</div>
		</>
	);
};

export default UserTeamsTable;
