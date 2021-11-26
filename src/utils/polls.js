/**
 * handles CRUD operations on poll objects
 * https://stackoverflow.com/questions/55714631/firestore-timestamp-fromdate-not-utc
 */

import {firestore} from "./firebase";
import firebase from "firebase/app";
// getPolls: returns unformatted data from database. Not very useful except as a helper to updatedPolls
// NOTE: THIS IS A HELPER FUNCTION, DON'T EXPORT IT
const getPolls = async () => {

    const snapshot = await firestore.collection("polls").get();
    return snapshot.docs;
}
 
/**
 * updatedPolls
 * should be used to retrieve an array of all the polls in the database.
 * @returns {array} returnArray : all the polls in the database, formated as they're needed for the calendar
 */
const updatedPolls = async () =>{
    return getPolls();
}

const convertPoll = (poll) => {
    const data = poll.data();
    return {
        title: data['title'],
        desc: data['desc'],
        notes: data['notes'],
        voteInfo: data['voteInfo'],
        maxVotePerPerson: data['maxVotePerPerson'],
        deadLine: data['deadLine'].toDate(),
        status: data['status'],
        docId: poll.id, // to be used for updates and deletes
        createrID: data['createrID']
    };
}
/**
 * writePoll:
 * creates a new poll with the params passed to it and pushes that poll to the database.
 * @param {string} title : the title of the new poll
 * @param {string} desc : more information to allow users to understand what they are voting for
 * @param {array} voteInfo : an array of options that users may vote for - [optionA, optionB, ... optionN]
 */
async function writePoll(p){
    const {title, desc, notes, maxVotePerPerson, voteInfo, deadLine, status, createrID} = p;
    console.log("attempting to write to db");
    const optionsJson = {};

    voteInfo.forEach(opt => (optionsJson[opt] = 0));
    const data = {
        title: title,
        desc: desc,
        notes: notes,
        voteInfo: optionsJson,
        maxVotePerPerson: maxVotePerPerson,
        deadLine: firebase.firestore.Timestamp.fromDate(deadLine),
        status: status,
        createrID: createrID
    };
    const result = await firestore.collection("polls").add(data);
    return result;
}
 
// /**
//  * changePollVotes
//  * @param {string} document_id : the document id of the poll you want to change
//  * @param {map} updated_votes  : the new votes on the poll
//  * @returns {number} : 0 on database error, 1 on successful update OR if no poll is found for specified document id
//  */
// async function changePoll(document_id, attributeName, newVal) {
//     console.log("attempting to change time on poll");
    
// }
// https://stackoverflow.com/questions/48046672/update-a-field-in-an-object-in-firestore 
async function changePoll(document_id, attributeName, newVal) {
    if (attributeName === "status") {
        const res = await firestore.collection("polls").doc(document_id).update({
            [attributeName]: newVal,
        });
        return res;
    } else if (attributeName === "voteInfo") {
        console.log(attributeName);
        console.log(newVal);
        const res = await firestore.collection("polls").doc(document_id).update({
            [attributeName]: newVal,
        });
        return res;
    } else {
        return false;
    }
}
 
/**
 * deletePoll
 * @param {string} document_id : the document id of the poll you want to delete
 * @returns {number} : 0 on database failure, 1 on successful delete or if no poll with the specified document id is found
 */
async function deletePoll(document_id) {
    console.log("attempting to delete from db");
    firestore.collection("polls").doc(document_id).delete().then(() =>{
        console.log("Poll deleted successfully");
        return 1;
    }).catch((error) => {
        console.error("Error deleting the document: ", error);
        return 0;
    });
}
 
export { updatedPolls, writePoll, changePoll, deletePoll, convertPoll };
