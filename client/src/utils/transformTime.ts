export function transformTime(time: string) {
	const pastDate = new Date(time);
	const curDate = new Date();
	const diffDate = curDate.getTime() - pastDate.getTime();

	const minutes = Math.floor(diffDate / 60 / 1000);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const week = pastDate.getDate() * 7 * 24 * 60 * 60 * 1000;

	if (minutes < 1) {
		return "Now";
	} else if (minutes >= 1 && minutes < 60) {
		return `${minutes}min`;
	} else if (minutes > 60 && hours >= 1) {
		return `${hours}h`;
	} else if (hours > 60 && days >= 1) {
		return `${days}d`;
	} else if (diffDate >= week) {
		return pastDate.toLocaleDateString("bg-BG", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	}
}
