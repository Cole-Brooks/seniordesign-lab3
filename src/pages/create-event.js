import React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"

import Navbar from "../components/Navbar"

import {firestore} from "../utils/firebase"



// const db = firestore.database();

class CreateEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventTitle:"",
            eventDate:"",
            startTime:"",
            endTime:""
        }
      }


     handleSubmit(item,type){

        let itemValue = item.target.value;
        switch(type){
            case "eventTitle" :{
                this.setState({eventTitle: itemValue}); 
            }
            case "eventDate" :{
                this.setState({eventDate: itemValue}); 
            }
            case "startTime" :{
                this.setState({startTime: itemValue}); 
            }
            case "endTime" :{
                this.setState({endTime: itemValue}); 
            }
           
        }

        console.log("all",this.state)
     }

     submit(){
         let obj = {};
         obj.eventTitle = this.state.eventTitle;
         obj.eventDate = this.state.eventDate;
         obj.startTime = this.state.startTime;
         obj.endTime = this.state.endTime;
         console.log("submit data", obj);

         alert("Event " + obj.eventTitle + " has been created!");


        console.log("start time: " + obj.eventDate.slice(8));
    
        firestore.collection("events").add({
            
            end : 
            [
                parseInt(obj.eventDate.slice(0,4)),
                parseInt(obj.eventDate.slice(5,7)),
                parseInt(obj.eventDate.slice(8)),

                parseInt(obj.startTime.slice(0,2)),
                parseInt(obj.startTime.slice(3))
            ],
            start : 
            [
                parseInt(obj.eventDate.slice(0,4)),
                parseInt(obj.eventDate.slice(5,7)),
                parseInt(obj.eventDate.slice(8)),

                parseInt(obj.endTime.slice(0,2)),
                parseInt(obj.endTime.slice(3))
            ],
            title : obj.eventTitle

            });

     }


    render(){
        return (
            <Layout>
    
                <Seo title="CreateEvent" />
                <Navbar />
                <main>
                    <h1> Create Event </h1>
                
                    <input type="text" id="eventTitle" placeHolder="Event Title" onChange={(item)=>this.handleSubmit(item,"eventTitle")}></input><br></br>
                    <label>Event Date: </label>
                    <input type="date" placeHolder="Event Date" onChange={(item)=>this.handleSubmit(item,"eventDate")}></input><br></br>
                    <label>Start Time: </label>
                    <input type="time" placeHolder="Start Time" onChange={(item)=>this.handleSubmit(item,"startTime")}></input><br></br>
                    <label>End Time: </label>
                    <input type="time" placeHolder="End Time" onChange={(item)=>this.handleSubmit(item,"endTime")}></input><br></br>
                
                    <button onClick={()=>this.submit()}> Submit </button>
                    
                </main>
            </Layout>
        );
    }
    
}

export default CreateEvent
