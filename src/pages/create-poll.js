import React, {useState} from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import {Grid, TextField, Button, Typography} from '@mui/material';
import Navbar from "../components/Navbar"
import BasicDateTimePicker from '../components/datetimePicker';
import { writePoll } from '../utils/polls';

const CreatePoll = () => {
    const [ maxVotePerPerson, setMaxVotePerPerson ] = useState(1);
    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ notes, setNotes ] = useState("");
    const [ optArr, setOptArr ] = useState(["opt1", "opt2", "", ""]);
    const [ deadLine, setDeadLine ] = useState(new Date());

    const handleSubmission = e => {
        e.preventDefault();
        const dl = [deadLine.getUTCFullYear(), deadLine.getUTCMonth() + 1, deadLine.getUTCDate(), deadLine.getUTCHours(), deadLine.getUTCMinutes()];
        const newPoll = {
            title: title,
            desc: desc,
            notes: notes,
            maxVotePerPerson: maxVotePerPerson,
            voteInfo: optArr.filter(opt => opt.length != 0),
            UTCdl: dl
        };
        writePoll(newPoll);
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
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="Title"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
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
                        label="Max Number of Votes for Each Voter"
                        placeholder="1"
                        onChange={(e) => {setMaxVotePerPerson(Number(e.target.value));}}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="string">
                        Options
                    </Typography>
                </Grid>
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
                <Grid item>
                    <BasicDateTimePicker deadLine={deadLine} setDeadLine={setDeadLine}/>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSubmission}>submit</Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default CreatePoll
