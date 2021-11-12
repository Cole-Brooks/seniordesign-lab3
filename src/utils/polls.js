/**
 * handles CRUD operations on poll objects
 */
 import {firestore} from "./firebase";

 // getPolls: returns unformatted data from database. Not very useful except as a helper to updatedPolls
 // NOTE: THIS IS A HELPER FUNCTION, DON'T EXPORT IT
 const getPolls = async () => {
     const snapshot = await firestore.collection("polls").get()
     return snapshot.docs
 }
 
 /**
  * updatedPolls
  * should be used to retrieve an array of all the polls in the database.
  * @returns {array} returnArray : all the polls in the database, formated as they're needed for the calendar
  */
 const updatedPolls = async () =>{
     const promise = getPolls();
     var returnArray = []
     promise.then(listOfPolls => {
         listOfPolls.forEach(poll => {
 
             const data = poll.data()
 
             var e = {
                     title: data['title'],
                     desc: data['desc'],
                     votes: data['votes'],
                     docId: poll.id // to be used for updates and deletes
                 }
             returnArray.push(e)
         }) 
     })
     return returnArray 
 }

 /**
  * writePoll:
  * creates a new poll with the params passed to it and pushes that poll to the database.
  * @param {string} string_title : the title of the new poll
  * @param {string} description : more information to allow users to understand what they are voting for
  * @param {array} options : an array of options that users may vote for - [optionA, optionB, ... optionN]
  */
 async function writePoll(string_title, description, options){
     console.log("attempting to write to db")
     var optionsJson = {}

     options.forEach(opt => (optionsJson[opt] = 0))
     var data = {
        title: string_title,
        desc: description,
        votes: optionsJson
     }
     firestore.collection("polls").add(data).then((docRef) => console.log("Document written with ID: ", docRef.id))
     .catch((error) => {console.error("Error adding document")})
 }
 
 /**
  * changePollVotes
  * @param {string} document_id : the document id of the poll you want to change
  * @param {map} updated_votes  : the new votes on the poll
  * @returns {number} : 0 on database error, 1 on successful update OR if no poll is found for specified document id
  */
 async function changePollVotes(document_id, updated_votes){
     console.log("attempting to change time on poll")
     firestore.collection("polls").doc(document_id).update({
         votes : updated_votes
     }).then(() => {
         console.log("poll votes successfully changed")
         return 1
     }).catch((error) => {
         console.error("database error occurred: ", error)
         return 0
     })
 }
 
 /**
  * deletePoll
  * @param {string} document_id : the document id of the poll you want to delete
  * @returns {number} : 0 on database failure, 1 on successful delete or if no poll with the specified document id is found
  */
 async function deletePoll(document_id){
     console.log("attempting to delete from db")
     firestore.collection("polls").doc(document_id).delete().then(() =>{
         console.log("Poll deleted successfully")
         return 1
     }).catch((error) => {
         console.error("Error deleting the document: ", error)
         return 0
     })
 }
 
 export { updatedPolls, writePoll, changePollVotes, deletePoll }