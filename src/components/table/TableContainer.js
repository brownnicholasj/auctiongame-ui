import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const TableContainer = ({ data, headers, className }) => {
	return (
		<table className={className + '-table-container'}>
			<TableHeader headers={headers} className={className} />
			<TableBody data={data} headers={headers} className={className} />
		</table>
	);
};

export default TableContainer;
