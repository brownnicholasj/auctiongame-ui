import React from 'react';

const TableHeader = ({ headers, className }) => {
	return (
		<thead className={className + '-table-header'}>
			<tr>
				{headers.map((header, index) => (
					<th key={index}>{header}</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
