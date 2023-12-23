import React from 'react';
import { spaceToCamelCase } from '../../helpers/toCamelCase';

const getDisplayValue = (value) => {
	if (typeof value === 'boolean') {
		return value ? 'x' : '';
	}
	return value;
};

const TableRow = ({ item, headers, className }) => {
	return (
		<>
			<tr className={className + '-table-row'}>
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
						<UserTeamsTable userId={item.id} />
					</td>
				</tr>
			)}
		</>
	);
};

export default TableRow;
