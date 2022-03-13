export const unixToTime = (unixTime: number) => {
	const date = new Date(unixTime * 1000)
	let hours = date.getHours()
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	const ampm = hours >= 12 ? 'PM' : 'AM'
	hours = hours % 12
	hours = hours ? hours : 12
	return `${hours}:${minutes} ${ampm}`
}

export const unixToDate = (unixTime: number) => {
	const newDate = new Date(unixTime * 1000)
	const weekday = new Intl.DateTimeFormat('en', {weekday: 'short'}).format(newDate)
	const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(newDate)
	const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(newDate)
	return `${weekday}, ${month} ${day}`
}

export const customDateFormat = (date: Date) => {
	const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(date)
	const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date)
	const hours = date.getHours()
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	return `${month} ${day} ${hours}:${minutes}`
}
