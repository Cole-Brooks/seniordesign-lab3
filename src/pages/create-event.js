import React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"

import Navbar from "../components/Navbar"

class CreateEvent extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {value: ''};
    
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            eventTitle:"",
            eventDate:"",
            eventTime:""
        }
      }


     handleSubmit(item,type){
        
        // var jFirst = document.getElementById("eventTitle").value;
        // var jLast = document.getElementById("eventDate").value;
        // alert(this.state.value);
        // e.preventDefault();
        
        let itemValue = item.target.value;
        switch(type){
            case "eventTitle" :{
                this.setState({eventTitle: itemValue}); 
            }
            case "eventDate" :{
                this.setState({eventDate: itemValue}); 
            }
            case "eventTime" :{
                this.setState({eventTime: itemValue}); 
            }
           
        }
        console.log("all",this.state)
     }

     submit(){
         let obj = {};
         obj.eventTitle = this.state.eventTitle;
         obj.eventDate = this.state.eventDate;
         obj.eventTime = this.state.eventTime;
         console.log("submit data", obj);

     }

    //  handleChange(e) {
    //     this.setState({value: e.target.value});
    //   }

    render(){
        return (
            <Layout>
    
                <Seo title="CreateEvent" />
                <Navbar />
                <main>
                    <h1> Create Event </h1>
                
                    <input type="text" placeHolder="Event Title" onChange={(item)=>this.handleSubmit(item,"eventTitle")}></input><br></br>
                    
                    <input type="date" placeHolder="Event Date" onChange={(item)=>this.handleSubmit(item,"eventDate")}></input><br></br>
                    
                    <input type="time" placeHolder="Event Time" onChange={(item)=>this.handleSubmit(item,"eventTime")}></input><br></br>
                

                    <button onClick={()=>this.submit()}> Submit </button>
                    
                </main>
            </Layout>
        );
    }
    
}

export default CreateEvent
