import React, {useState} from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import {Grid, TextField, Button, Typography} from '@mui/material';
import {AdapterDateFns, LocalizationProvider, DateTimePicker} from "@mui/lab";
import IncDecButton from '../components/IncDecButton';

import Navbar from "../components/Navbar"

const CreatePoll = () => {
    const [ numVotes, setNumVotes ] = useState(1);
    const [ numOpt, setNumOpt ] = useState(1);
    const [ title, setTitle ] = useState("");
    const [ optArr, setOptArr ] = useState([""]);
    const [ deadline, setDeadLine] = useState(new Date());

    const handleSubmission = e => {
        e.preventDefault();
        console.log(title);
    }

    return (
        <Layout>
            <Navbar />
            <Seo title="CreatePoll" />
            <Grid container>
                <TextField
                    fullWidth
                    required
                    label="Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    placeholder="What's your favorate programming language?"
                />
                <TextField
                    fullWidth
                    required
                    label="Description"
                    placeholder="Give a vote on the programming languages you like!"
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    label="Notes/Comments"
                    placeholder="Ex: ASAP"
                />
                <TextField
                    fullWidth
                    label="Max Number of Votes for Each Voter"
                    placeholder="1"
                    onChange={(e) => {setNumVotes(Number(e.target.value));}}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="DateTimePicker"
                        value={deadline}
                        onChange={(newValue) => {
                            setDeadLine(newValue);
                        }}
                    />
                </LocalizationProvider>
                <Grid item xs={4}>
                    <Typography variant="string">
                        Options
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <IncDecButton minNumOption={1} maxNumOption={10} cbFunc={setNumOpt}/>
                </Grid>
                <Button onClick={handleSubmission}>submit</Button>
            </Grid>
        </Layout>
    )
}

export default CreatePoll
