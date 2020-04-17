// get dates between dates

export let getDatesBetween = (start, end) =>{

	let array = [];
	let currentDate = new Date(start);
	while (currentDate <= end){
		array.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return array;

}

// format Dates

export function formatDate(date) {
    var d = new Date(date),
        mon = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        weekday = d.getDay(),
        weekdays = [];

        weekdays[0] = "Sun";
		weekdays[1] = "Mon";
		weekdays[2] = "Tue";
		weekdays[3] = "Wed";
		weekdays[4] = "Thur";
		weekdays[5] = "Fri";
		weekdays[6] = "Sat";

    if (mon.length < 2) mon = '0' + mon;
    if (day.length < 2) day = '0' + day;

    return `${year}-${mon}-${day} ${weekdays[weekday]}`;
}

// check if date in range

export let rangecheck = (day) => {

	let today = new Date();
	let maxday = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
	if (maxday <= day)
		{return false} 
	else { return true}
}












