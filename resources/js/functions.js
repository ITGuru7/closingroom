
export function getFormattedDate(date, separator='/') {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + separator + month + separator + year;
}

export function getFormattedTime(date, ampm = false) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes;
    if (ampm == true) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        strTime = hours + ':' + minutes + ' ' + ampm;
    }
    return strTime;
}

export function getFormattedID(id, length) {
    return (id?String(id).padStart(length, '0'):'')
}