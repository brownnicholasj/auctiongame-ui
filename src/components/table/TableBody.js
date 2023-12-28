import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ data, headers, className }) => {
	const maxScore = Math.max(...data.map((item) => item.totalScore));

	return (
		<tbody className={className + '-table-body'}>
			{data.map((item, index) => (
				<TableRow
					key={index}
					item={{ ...item, maxScore }}
					headers={headers}
					className={className}
				/>
			))}
		</tbody>
	);
};

export default TableBody;
