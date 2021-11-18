/**
 * 
 * @param {Date} time 
 * @param {string} to 
 * 
 * why bother? 
 * 1. firebase timestamp is displayed as system timezone, it stores an unique time
 * https://stackoverflow.com/questions/55714631/firestore-timestamp-fromdate-not-utc 
 * 
 * 2. datePicker gives you the selected DateTime in your local TimeZone
 * 3. Users want the time to be in the timezone they select
 * 
 * deadline is essentially the same moment for any timezone
 * so db has one unique timestamp
 * for poll creation is to use the selected time(which is local) 
 * convert it to the right time in the target timezone selected by admin
 * but still stored in the local timezone (cannot figure out another way)
 * ex: I'm in CST with 21:00 selected(the datepicker gives you 21:00 CST)
 * but I want EST! 
 * so data should be 20:00 CST (eq to 21:00 EST)
 * 
 * 
 * PST 480
 * MST 420
 * CST 360
 * EST 300
 */

export default function timeConverter(inputTime, to) {
    let x = inputTime.getTimezoneOffset();
    let y = x;
    console.log("You had ", inputTime);
    if (to === "PST") {
        console.log("Oh you want PST");
        y = 480; 
    } else if (to === "MST") {
        console.log("Oh you want MST");
        y = 420; 
    } else if (to === "CST") {
        console.log("Oh you want CST");
        y = 360; 
    } else if (to === "EST") {
        console.log("Oh you want EST");
        y = 300; 
    }
    inputTime.setMinutes(inputTime.getMinutes() + y - x);
    console.log("You get: ", inputTime);
    return inputTime;
}