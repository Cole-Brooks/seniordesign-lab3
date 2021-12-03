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
    IconButton,
    RemoveIcon,
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
import { makeStyles } from '@material-ui/core/styles';
import { Container } from 'react-bootstrap';

// import {firestore} from "../utils/firebase"




// import TimePicker from '@mui/lab/TimePicker';
  

// https://stackoverflow.com/questions/1090815/how-to-clone-a-date-object 
const CreatePoll = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root':{
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();


    const [ maxVotePerPerson, setMaxVotePerPerson ] = useState(1);
    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ notes, setNotes ] = useState("");
    const [ optArr, setOptArr ] = useState(["", "", "", ""]);
    const [ date, setDate ] = useState(new Date());
    const [startTime, setValue] = React.useState(new Date());
    const [ endTime, setEndTime ] = React.useState(new Date());
    const [ timeZone, setTimeZone ] = useState("CST");
    const [ vError, setVError ] = useState({});
    const [ inputFields, setInputFields ] = useState([
        { name: '', email: '' },
    ])


    // const db = firestore.database();
   
    const handleChange = (newValue) => {
      setValue(newValue);
    };

    const handleChangeInput = (index, event) =>{
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { name: '', email: '' }])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    // only changes timezone label
    const changeTimeZone = e => {
        setTimeZone(e.target.value);
        console.log(e.target.value);
    };
    
      
    const validate = () => {
        const errors = {};
        
        if (title.trim() === "") {
            errors.title = "Title needed!";
        }

        setVError(errors);
        return errors;
    }

    const handleSubmission = e => {
        e.preventDefault();

        const err = validate();
        console.log("Err is", err);
        // if (Object.keys(err).length !== 0) {
        //     let errMsg = "";
        //     for (let key in err) {
        //         errMsg = errMsg.concat(err[key]).concat("\n");
        //     }
        //     alert(errMsg);
        //     console.log("error");
        //     return;
        // }
        console.log("valid");
        
        console.log("InputFields", inputFields);
        const temp =  JSON.stringify(date);
        const temp2 =  JSON.stringify(startTime);
        const temp3 =  JSON.stringify(startTime);
        // console.log(temp);
        // console.log(temp2);
        // console.log(temp3);

        // console.log((temp.slice(1,5)));
        // console.log(temp.slice(6,8));
        // console.log(temp.slice(9,11));
        // console.log(temp2.slice(1,3));
        // console.log(temp2.slice(4,6));


        


        const newEvent = {

            title: title,
            start: 
                [
                    parseInt(temp.slice(1,5)),
                    parseInt(temp.slice(6,8))-1,
                    parseInt(temp.slice(9,11)),
        
                    parseInt(temp2.slice(1,3)),
                    parseInt(temp2.slice(4,6))
                ],
            end : 
                [
                    parseInt(temp.slice(1,5)),
                    parseInt(temp.slice(6,8))-1,
                    parseInt(temp.slice(9,11)),
        
                    parseInt(temp3.slice(1,3)),
                    parseInt(temp3.slice(4,6))
                ],
            timeZone: timeZone,
            attendants: inputFields, 
            allDay: false
        };  
        
        

        firestore.collection("events").add({
            title: title,
            start: 
                [
                    parseInt(temp.slice(1,5)),
                    parseInt(temp.slice(6,8))-1,
                    parseInt(temp.slice(9,11)),
        
                    parseInt(temp2.slice(1,3)),
                    parseInt(temp2.slice(4,6))
                ],
            end : 
                [
                    parseInt(temp.slice(1,5)),
                    parseInt(temp.slice(6,8))-1,
                    parseInt(temp.slice(9,11)),
        
                    parseInt(temp3.slice(1,3)),
                    parseInt(temp3.slice(4,6))
                ],
            timeZone: timeZone,
            attendants: inputFields, 
            allDay: false
        });
      
        console.log(timeZone);
        // writeEvent(newEvent["title"], newEvent["start"], newEvent["end"], newEvent["timeZone"], newEvent["attendees"]);
       
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
                        Attendees
                        <form className = {classes.root} onSubmit = {handleSubmit}>
                        { inputFields.map((inputField, index) => (
                            <div key= {index}>
                                <TextField
                                    name= "name"
                                    label = "Name"
                                    variant = "filled"
                                    value = {inputField.name}
                                    onChange = {event => handleChangeInput(index, event)}
                                    />
                                <TextField
                                    name= "email"
                                    label = "Email Address"
                                    variant = "filled"
                                    value = {inputField.email}
                                    onChange = {event => handleChangeInput(index, event)}
                                />
                                <Button onClick={() => handleRemoveFields(index)}>
                                    Remove
                                </Button>
                                <Button onClick={() => handleAddFields()}>
                                    Add
                                </Button>
                            </div>
                        ))}
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant = "contained" color = "primary" onClick={handleSubmission}>submit</Button>
                    </Grid>
                </Grid>
            </Box>
            
        </Layout>
    )
}

export default CreatePoll
