import { useState } from 'react';
import Leaderboard from './leaderboard/leaderboard';

function WelcomeMessage() {
	const [showMessage, setShowMessage] = useState(false);

	return (
		<div>
			<button onClick={() => setShowMessage(!showMessage)}>
				Go to Leaderboard
			</button>
			{showMessage && <Leaderboard />}
		</div>
	);
}

export default WelcomeMessage;
