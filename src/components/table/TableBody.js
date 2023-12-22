import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ data, headers, className }) => {
	return (
		<tbody className={className + '-table-body'}>
			{data.map((item, index) => (
				<TableRow
					key={index}
					item={item}
					headers={headers}
					className={className}
				/>
			))}
		</tbody>
	);
};

export default TableBody;
