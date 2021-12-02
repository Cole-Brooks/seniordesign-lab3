// //import React from 'react'
// import Layout from "../components/layout"
// import Seo from "../components/seo"

// import Navbar from "../components/Navbar"

// import {firestore} from "../utils/firebase"



// // const db = firestore.database();

// class CreateEvent extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             eventTitle:"",
//             eventDate:"",
//             startTime:"",
//             endTime:""
//         }
//       }


//      handleSubmit(item,type){

//         let itemValue = item.target.value;
//         switch(type){
//             case "eventTitle" :{
//                 this.setState({eventTitle: itemValue}); 
//             }
//             case "eventDate" :{
//                 this.setState({eventDate: itemValue}); 
//             }
//             case "startTime" :{
//                 this.setState({startTime: itemValue}); 
//             }
//             case "endTime" :{
//                 this.setState({endTime: itemValue}); 
//             }
           
//         }

//         console.log("all",this.state)
//      }

//      submit(){
//          let obj = {};
//          obj.eventTitle = this.state.eventTitle;
//          obj.eventDate = this.state.eventDate;
//          obj.startTime = this.state.startTime;
//          obj.endTime = this.state.endTime;
//          console.log("submit data", obj);

//          alert("Event " + obj.eventTitle + " has been created!");


//         console.log("start time: " + obj.eventDate.slice(8));
    
//         firestore.collection("events").add({
            
//             end : 
//             [
//                 parseInt(obj.eventDate.slice(0,4)),
//                 parseInt(obj.eventDate.slice(5,7)),
//                 parseInt(obj.eventDate.slice(8)),

//                 parseInt(obj.startTime.slice(0,2)),
//                 parseInt(obj.startTime.slice(3))
//             ],
//             start : 
//             [
//                 parseInt(obj.eventDate.slice(0,4)),
//                 parseInt(obj.eventDate.slice(5,7)),
//                 parseInt(obj.eventDate.slice(8)),

//                 parseInt(obj.endTime.slice(0,2)),
//                 parseInt(obj.endTime.slice(3))
//             ],
//             title : obj.eventTitle

//             });

//      }


//     render(){
//         return (
//             <Layout>
    
//                 <Seo title="CreateEvent" />
//                 <Navbar />
//                 <main>
//                     <h1> Create Event </h1>
                
//                     <input type="text" id="eventTitle" placeHolder="Event Title" onChange={(item)=>this.handleSubmit(item,"eventTitle")}></input><br></br>
//                     <label>Event Date: </label>
//                     <input type="date" placeHolder="Event Date" onChange={(item)=>this.handleSubmit(item,"eventDate")}></input><br></br>
//                     <label>Start Time: </label>
//                     <input type="time" placeHolder="Start Time" onChange={(item)=>this.handleSubmit(item,"startTime")}></input><br></br>
//                     <label>End Time: </label>
//                     <input type="time" placeHolder="End Time" onChange={(item)=>this.handleSubmit(item,"endTime")}></input><br></br>
                
//                     <button onClick={()=>this.submit()}> Submit </button>
                    
//                 </main>
//             </Layout>
//         );
//     }
    
// }

// export default CreateEvent 





import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import { 
    Grid, 
    TextField, 
    Button, 
    Typography, 
    MenuItem, 
    FormControl, 
    Select, 
    InputLabel, 
    Box } from '@mui/material';
import Navbar from "../components/Navbar"
import BasicDateTimePicker from '../components/datetimePicker';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
// import { TimePicker } from 'antd';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";  
import { writeEvent } from '../utils/events';
import timeConverter from '../utils/timeConverter';
import {firestore} from "../utils/firebase";


// import TimePicker from '@mui/lab/TimePicker';
  

// https://stackoverflow.com/questions/1090815/how-to-clone-a-date-object 
const CreatePoll = () => {
    const [ maxVotePerPerson, setMaxVotePerPerson ] = useState(1);
    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ notes, setNotes ] = useState("");
    const [ optArr, setOptArr ] = useState(["", "", "", ""]);
    const [ date, setDate ] = useState(new Date());
    const [startTime, setValue] = React.useState(new Date('2014-08-18T00:00:00'));
    const [ endTime, setEndTime ] = React.useState(new Date('2014-08-18T00:00:00'));
    const [ timeZone, setTimeZone ] = useState("");
    const [ vError, setVError ] = useState({});
   
    const handleChange = (newValue) => {
      setValue(newValue);
    };

    
    
    // const db = firestore.database();

    // this.state = {
    //     eventTitle:"",
    //     eventDate:"",
    //     startTime:"",
    //     endTime:""
    // }

    // only changes timezone label
    const changeTimeZone = e => {
        setTimeZone(e.target.value);
        console.log(e.target.value);
    };
    
    
    // const changeDeadLine = (e) => {
    //     e.setSeconds(0);
    //     setDeadLine(e);
    //     // console.log(e);
    // }


    // function onChange(time, timeString) {
    //     console.log(time, timeString);
    // }

    // ReactDOM.render(
    //     <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
    //     mountNode,
    // );
      
    const validate = () => {
        const errors = {};
        
        if (title.trim() === "") {
            errors.title = "Title needed!";
        }
        
        if (optArr[0].trim() === "") {
            errors.optArr1 = "First option needed!";
        }

        if (optArr[1].trim() === "") {
            errors.optArr2 = "Second option needed!"
        }
        
        if (maxVotePerPerson < 1 || maxVotePerPerson > 10) {
            errors.maxVotePerPerson = "max vote per participant should be between 1 to 10"
        }

        if (timeZone === "" || timeConverter(new Date(date.getTime()), timeZone) <= new Date().getTime()) {
            errors.deadLine = "Invalid deadLine!";
        }

        setVError(errors);
        return errors;
    }

    const handleSubmission = e => {
        e.preventDefault();

        const err = validate();
        console.log("Err is", err);
        if (Object.keys(err).length !== 0) {
            let errMsg = "";
            for (let key in err) {
                errMsg = errMsg.concat(err[key]).concat("\n");
            }
            alert(errMsg);
            console.log("error");
            return;
        }
        console.log("valid");
        // const dl = [deadLine.getYear(), deadLine.getMonth() + 1, deadLine.getDate(), deadLine.getHours(), deadLine.getMinutes()];
        const temp =  JSON.stringify(date);
        const newEvent = {

            title: title,
            start: 
                [
                    parseInt(temp.slice(0,4)),
                    parseInt(temp.slice(5,7)),
                    parseInt(temp.slice(8)),
        
                    // parseInt(temp.slice(0,2)),
                    // parseInt(temp.slice(3))
                ],
            end : 
                [
                    parseInt(temp.slice(0,4)),
                    parseInt(temp.slice(5,7)),
                    parseInt(temp.slice(8)),
            
                    // parseInt(temp.slice(0,2)),
                    // parseInt(temp.slice(3))
                ],
            timeZone: timeZone,
            //attendants: attendees,
            allDay: false
        };
        console.log(temp);
      
        console.log(newEvent);
        writeEvent(newEvent);
        // console.log(title);
        // console.log(desc);
        // console.log(notes);
        // console.log(maxVotePerPerson);
        // console.log(optArr);
        // console.log(dl);
    }

    return (
        <Layout>
            <Navbar />
            <Seo title="CreatePoll" />
            <Box sx={{ flexGrow: 1 }}>
                <br />
                <Typography variant="h5" component="div" gutterBottom>
                    Create a New Event!
                </Typography>
                <Grid container rowSpacing={3} alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Title"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            error={vError["title"] !== undefined}
                            helperText={vError["title"] !== undefined ? vError["title"] : null}
                            placeholder="What's your favorate programming language?"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Notes/Comments"
                            onChange={(e) => {
                                setNotes(e.target.value);
                            }}
                            placeholder="Ex: ASAP"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="string">
                            Options
                        </Typography>
                    </Grid>
                    <br />
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                label="Option1"
                                placeholder="Java"
                                onChange={(e) => {
                                    const curArr = [...optArr];
                                    curArr[0] = e.target.value;
                                    setOptArr(curArr);
                                }}
                                error={vError["optArr1"] !== undefined}
                                helperText={vError["optArr1"] !== undefined ? vError["optArr1"] : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Option2"
                                placeholder="Python"
                                onChange={(e) => {
                                    const curArr = [...optArr];
                                    curArr[1] = e.target.value;
                                    setOptArr(curArr);
                                }}
                                error={vError["optArr2"] !== undefined}
                                helperText={vError["optArr2"] !== undefined ? vError["optArr2"] : null}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Option3"
                                placeholder="JS"
                                onChange={(e) => {
                                    const curArr = [...optArr];
                                    curArr[2] = e.target.value;
                                    setOptArr(curArr);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Option4"
                                placeholder="C++"
                                onChange={(e) => {
                                    const curArr = [...optArr];
                                    curArr[3] = e.target.value;
                                    setOptArr(curArr);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        Date
                        <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>TimeZone</InputLabel>
                            <Select
                                value={timeZone}
                                onChange={changeTimeZone}
                            >
                                <MenuItem value={"PST"}>PST</MenuItem>
                                <MenuItem value={"MST"}>MST</MenuItem>
                                <MenuItem value={"CST"}>CST</MenuItem>
                                <MenuItem value={"EST"}>EST</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        Start Time <br></br>
                        <TimePicker
                            label="Time"
                            value={startTime}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        End Time <br></br>
                        <TimePicker
                            label="Time"
                            value={endTime}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleSubmission}>submit</Button>
                    </Grid>
                </Grid>
            </Box>
            
        </Layout>
    )
}

export default CreatePoll
