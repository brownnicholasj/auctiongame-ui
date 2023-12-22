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
		<tr className={className + '-table-row'}>
			{headers.map((header) => {
				const key = spaceToCamelCase(header);
				const displayValue = getDisplayValue(item[key]);
				return <td key={key}>{displayValue}</td>;
			})}
		</tr>
	);
};

export default TableRow;
