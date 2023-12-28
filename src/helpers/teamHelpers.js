export const sortTeamsByConference = (teams) => {
	return teams.sort((a, b) => {
		if (a.conference === 'AFC' && b.conference === 'NFC') {
			return -1;
		} else if (a.conference === 'NFC' && b.conference === 'AFC') {
			return 1;
		}
		return 0;
	});
};

export const groupTeamsByConferenceAndDivision = (teams) => {
	const groupedTeams = teams.reduce((acc, team) => {
		const key = team.conference + '-' + team.division;
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(team);
		return acc;
	}, {});

	for (const group in groupedTeams) {
		groupedTeams[group].sort((a, b) => b.wins - a.wins);
	}

	return groupedTeams;
};
