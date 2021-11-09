/**
 * handles CRUD operations on event objects
 */

import {firestore} from "./firebase";

// getEvents: returns unformatted data from database. Not very useful except as a helper to updatedEvents
const getEvents = async () => {
    return (await firestore.collection("events").get()).docs;
}

// updatedEvents: returns data from database in the same format that events uses
const updatedEvents = async () =>{
    const promise = getEvents();
    var returnArray = []
    promise.then(listOfEvents => {
        listOfEvents.forEach(event => {

            const data = event.data()

            var e = [
                {
                    title: data['title'],
                    start: new Date(data['start']),
                    end: new Date(data['end']),
                    allDay: data['allDay']
                }
            ]

            returnArray.push(e)
        })
    })
}

export { getEvents, updatedEvents }