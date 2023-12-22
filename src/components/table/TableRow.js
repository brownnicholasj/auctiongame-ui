import React from 'react';
import { spaceToCamelCase } from '../../helpers/toCamelCase';

const TableRow = ({ item, headers, className }) => {
	return (
		<tr className={className + '-table-row'}>
			{headers.map((header) => {
				const key = spaceToCamelCase(header);
				return <td key={key}>{item[key]}</td>;
			})}
		</tr>
	);
};

export default TableRow;
