import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ data, headers }) => {
	return (
		<tbody>
			{data.map((item, index) => (
				<TableRow key={index} item={item} headers={headers} />
			))}
		</tbody>
	);
};

export default TableBody;
