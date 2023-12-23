import React from 'react';
import { spaceToCamelCase } from '../../helpers/toCamelCase';
import UserTeamsTable from '../leaderboard/UserTeamsTable';

const getDisplayValue = (value) => {
	if (typeof value === 'boolean') {
		return value ? 'x' : '';
	}
	return value;
};

const TableRow = ({ item, headers, className }) => {
	return (
		<>
			<tr className={className + '-table-row'} onClick={item.onClick}>
				{headers.map((header) => {
					const key = spaceToCamelCase(header);
					const displayValue = getDisplayValue(item[key]);
					return <td key={key}>{displayValue}</td>;
				})}
			</tr>
			{item.isTeamsVisible && (
				// Render the user's team table here
				<tr>
					<td colSpan={headers.length}>
						{/* Assuming you have a component to render user's teams */}
						<UserTeamsTable
							userName={item.name}
							matchedTeams={item.matchedTeams}
						/>
					</td>
				</tr>
			)}
		</>
	);
};

export default TableRow;
