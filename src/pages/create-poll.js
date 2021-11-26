import React, {useContext, useEffect, useState} from 'react';
import { navigate } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
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
import { writePoll } from '../utils/polls';
import timeConverter from '../utils/timeConverter';
import { AuthContext } from '../context/auth';

// https://stackoverflow.com/questions/1090815/how-to-clone-a-date-object 
const CreatePoll = () => {
    const [ maxVotePerPerson, setMaxVotePerPerson ] = useState(1);
    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ notes, setNotes ] = useState("");
    const [ optArr, setOptArr ] = useState(["", "", "", ""]);
    const [ deadLine, setDeadLine ] = useState(new Date());
    const [ timeZone, setTimeZone ] = useState("");
    const [ vError, setVError ] = useState({});
    const {user} = useContext(AuthContext);

    // only changes timezone label
    const changeTimeZone = e => {
        setTimeZone(e.target.value);
        console.log(e.target.value);
    };
    
    
    const changeDeadLine = (e) => {
        e.setSeconds(0);
        setDeadLine(e);
        // console.log(e);
    }
    
    const validate = () => {
        const errors = {};
        
        if (title.trim() === "") {
            errors.title = "Title needed!";
        }
        
        if (desc.trim() === "") {
            errors.desc = "Description needed!";
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

        if (timeZone === "" || timeConverter(new Date(deadLine.getTime()), timeZone) <= new Date().getTime()) {
            errors.deadLine = "Invalid deadLine!";
        }

        setVError(errors);
        return errors;
    }

    const handleSubmission = e => {
        e.preventDefault();
        console.log(typeof user.uid);

        const err = validate();
        //console.log("Err is", err);
        if (Object.keys(err).length !== 0) {
            let errMsg = "";
            for (let key in err) {
                errMsg = errMsg.concat(err[key]).concat("\n");
            }
            alert(errMsg);
            console.log("error");
            return;
        }
        //console.log("valid");
        // const dl = [deadLine.getYear(), deadLine.getMonth() + 1, deadLine.getDate(), deadLine.getHours(), deadLine.getMinutes()];

        const newPoll = {
            title: title,
            desc: desc,
            notes: notes,
            maxVotePerPerson: maxVotePerPerson,
            voteInfo: optArr.filter(opt => opt.length !== 0),
            deadLine: timeConverter(new Date(deadLine.getTime()), timeZone),
            status: "unPublished",
            createrID: user.uid
        };
        console.log(newPoll);
        writePoll(newPoll)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                navigate("/");
            })
            .catch((error) => {alert("Error adding document");});
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
                    Create a New Poll!
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
                            required
                            label="Description"
                            onChange={(e) => {
                                setDesc(e.target.value);
                            }}
                            error={vError["desc"] !== undefined}
                            helperText={vError["desc"] !== undefined ? vError["desc"] : null}
                            placeholder="Give a vote on the programming languages you like!"
                            multiline
                            rows={4}
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            defaultValue={1}
                            label="Max Number of Votes for Each Voter"
                            placeholder="1"
                            error={vError["maxVotePerPerson"] !== undefined}
                            onChange={(e) => {setMaxVotePerPerson(Number(e.target.value));}}
                            helperText={vError["maxVotePerPerson"] !== undefined ? vError["maxVotePerPerson"] : null}
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
                                required
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
                                required
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
                        <BasicDateTimePicker deadLine={deadLine} setDeadLine={changeDeadLine}/>
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
