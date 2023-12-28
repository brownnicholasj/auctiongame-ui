import React from 'react';
import { spaceToCamelCase } from '../../helpers/toCamelCase';

const getDisplayValue = (
	value,
	isScore = false,
	maxScore,
	shouldDisplayBar = false
) => {
	if (isScore && shouldDisplayBar) {
		const percentage = (value / maxScore) * 100;
		return (
			<div className='score-bar-container' style={{ width: '100%' }}>
				<div className='score-bar' style={{ width: `${percentage}%` }}>
					<span className='score-value'>{value}</span>
				</div>
			</div>
		);
	}

	if (typeof value === 'boolean') {
		return value ? '✓' : '';
	}

	return value;
};

const TableRow = ({ item, headers, className }) => {
	const maxScore = item.maxScore;
	const shouldDisplayBar = className === 'user-leaderboard';

	return (
		<>
			<tr className={className + '-table-row'} onClick={item.onClick}>
				{headers.map((header) => {
					const key = spaceToCamelCase(header);
					const isScore = key === 'totalScore';
					const displayValue = getDisplayValue(
						item[key],
						isScore,
						maxScore,
						shouldDisplayBar
					);
					return <td key={key}>{displayValue}</td>;
				})}
			</tr>
		</>
	);
};

export default TableRow;
