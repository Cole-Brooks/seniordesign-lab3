/**
 * handles CRUD operations on event objects
 */
import {firestore} from "./firebase";

// getEvents: returns unformatted data from database. Not very useful except as a helper to updatedEvents
// NOTE: THIS IS A HELPER FUNCTION, DON'T EXPORT IT
const getEvents = async () => {
    const snapshot = await firestore.collection("events").get()
    return snapshot.docs
}

/**
 * updatedEvents
 * @returns {array} returnArray : all the events in the database, formated as they're needed for the calendar
 */
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
                    allDay: data['allDay'],
                    attendants: data['attendants'],
                    docId: event.id // to be used for updates and deletes
                }

            returnArray.push(e)
        }) 
    })
    return returnArray 
}

/**
 * writeEvent:
 * creates a new event with the params passed to it and pushes that event to the database.
 * @param {string} string_title : the title of the new event
 * @param {array} start_time : the start time of the event. Format should be [<year>, <month>, <day>, <hour>, <minute>]
 * @param {array} end_time : the end time of the event. Format should be [<year>, <month>, <day>, <hour>, <minute>]
 * @param {array} attendees : an array of json attendants with fields for email and name for each attendant
 */
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

/**
 * changeEventAttendants
 * @param {string} document_id : the document id of the event you want to change as a string
 * @param {array} new_attendants : an array of json attendants with fields for email and name for each attendant
 * @returns {number} : 0 on database error, 1 on successful update OR if no event is found for specified document id
 */
async function changeEventAttendants(document_id, new_attendants){
    console.log("attempting to change attendants on event")
    firestore.collection("events").doc(document_id).update({
        attendants: new_attendants
    }).then(() => {
        console.log("event attendants updated")
        return 1
    }).catch((error) => {
        console.error("database error occurred: ", error)
        return 0
    })
}

/**
 * changeEventTimes
 * @param {string} document_id : the document id of the event you want to change
 * @param {array} new_start  : the new start time of the event you want to change. Format should be [<year>, <month>, <day>, <hour>, <minute>]
 * @param {array} new_end  : the new end time of the event you want to change. Format should be [<year>, <month>, <day>, <hour>, <minute>]
 * @returns {number} : 0 on database error, 1 on successful update OR if no event is found for specified document id
 */
async function changeEventTimes(document_id, new_start, new_end){
    console.log("attempting to change time on event")
    firestore.collection("events").doc(document_id).update({
        start: new_start,
        end: new_end
    }).then(() => {
        console.log("event time successfully changed")
        return 1
    }).catch((error) => {
        console.error("database error occurred: ", error)
        return 0
    })
}

/**
 * deleteEvent
 * @param {string} document_id : the document id of the event you want to delete
 * @returns {number} : 0 on database failure, 1 on successful delete or if no event with the specified document id is found
 */
async function deleteEvent(document_id){
    console.log("attempting to delete from db")
    firestore.collection("events").doc(document_id).delete().then(() =>{
        console.log("Event deleted successfully")
        return 1
    }).catch((error) => {
        console.error("Error deleting the document: ", error)
        return 0
    })
}

export { updatedEvents, writeEvent, changeEventAttendants,changeEventTimes, deleteEvent}