import React, {useEffect, useState, useContext} from 'react'
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
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";  
import {firestore} from "../utils/firebase";
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from "gatsby";
import { AuthContext } from "../context/auth"


const CreateEvent = () => {
    const { user } = useContext(AuthContext)
    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root':{
                margin: theme.spacing(1)
            }
        }
    }))

    const classes = useStyles();

    const [ title, setTitle ] = useState("");
    const [ date, setDate ] = useState(new Date());
    const [startTime, setValue] = React.useState(new Date());
    const [ endTime, setEndTime ] = React.useState(new Date());
    const [ timeZone, setTimeZone ] = useState("CST");
    const [ vError, setVError ] = useState({});
    const [ inputFields, setInputFields ] = useState([
        { name: '', email: '' },
    ])


   
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
        // console.log(e.target.value);
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
        // console.log("Err is", err);
       
        // console.log("valid");
        
        // console.log("InputFields", inputFields);
        const temp =  JSON.stringify(date);
        const temp2 =  JSON.stringify(startTime);
        const temp3 =  JSON.stringify(startTime);        

        let uid = "CREATED BY GUEST"
        if(user != null){
            uid = user.uid
        }

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
            allDay: false,
            owner: uid
        });

        navigate("/");
      
        // console.log(timeZone);
        
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

export default CreateEvent