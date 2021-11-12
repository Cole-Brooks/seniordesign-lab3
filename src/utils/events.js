/**
 * handles CRUD operations on event objects
 */
import {addDoc, collection} from "firebase/firestore"
import {firestore} from "./firebase";

// getEvents: returns unformatted data from database. Not very useful except as a helper to updatedEvents
const getEvents = async () => {
    // return (await firestore.collection("events").get()).docs;
    const snapshot = await firestore.collection("events").get()
    // snapshot.docs.forEach(doc => console.log(doc.data()))

    return snapshot.docs
}

// updatedEvents: returns data from database in the same format that events uses
const updatedEvents = async () =>{
    const promise = getEvents();
    var returnArray = []
    promise.then(listOfEvents => {
        listOfEvents.forEach(event => {

            const data = event.data()
            var e = {
                    title: data['title'],
                    start: new Date(data['start'][0], data['start'][1], data['start'][2], data['start'][3]),
                    end: new Date(data['end'][0], data['end'][1], data['end'][2], data['end'][3]),
                    allDay: data['allDay']
                }

            returnArray.push(e)
        }) 
    })
    return returnArray 
}

// writeEvent takes all the parameters necessary for creating an event and writing it to the firestore database. example written below
    // writeEvent("Event Title", [<s_year>,<s_month>,<s_day>,<s_hour>,<s_minute>],[<e_year>,<e_month>,<e_day>,<e_hour>,<e_minute>], attendees)
async function writeEvent(string_title, start_time, end_time, attendees){
    console.log("attempting to write to db")
    var data = {
        title: string_title,
        start: start_time,
        end: end_time,
        attendants: attendees,
        allDay: false
    }
    firestore.collection("events").add(data).then((docRef) => console.log("Document written with ID: ", docRef.id))
    .catch((error) => {console.error("Error adding document")})
}

export { getEvents, updatedEvents, writeEvent}