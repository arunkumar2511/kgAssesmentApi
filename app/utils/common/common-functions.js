export function getFormattedDate(date){
    let hour = date['hour'];
    let minutes = date['minute'];
    if(minutes < 10)
        minutes = "0"+minutes;
    let meridian = 'AM';
    if(hour > 11)
        meridian = 'PM';
    if(hour > 11)
        hour = hour-12
    return hour+":"+minutes+" "+meridian
}