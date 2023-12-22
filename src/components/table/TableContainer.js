import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const TableContainer = ({ data, headers }) => {
	return (
		<table>
			<TableHeader headers={headers} />
			<TableBody data={data} headers={headers} />
		</table>
	);
};

export default TableContainer;
