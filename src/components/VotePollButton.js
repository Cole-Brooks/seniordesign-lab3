import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    Modal,
    Grid,
} from '@mui/material';
import IncDecButton from './IncDecButton';
import { changePoll } from '../utils/polls';
import { navigate } from 'gatsby-link';
// https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
// https://stackoverflow.com/questions/38364400/index-inside-map-function
// https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



function VotePollButton(props) {
    const { rawData } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ votesLeft, setVotesLeft ] = useState(rawData.maxVotePerPerson);
    const [ myVotes, setMyVotes ] = useState(new Array(Object.keys(rawData.voteInfo).length).fill(0));

    const printVotes = (voteInfo) => {
        let printRes = "";
        Object.keys(voteInfo).map(opt => {
            printRes = printRes.concat(`${opt}: ${voteInfo[opt]} \n`);
        })
        return printRes;
    };

    const printChoice = (updated, old) => {
        let printRes = "";
        Object.keys(updated).map(opt => {
            printRes = printRes.concat(`${opt}: ${updated[opt] - old[opt]} \n`);
        })
        return printRes;
    }

    const handleSubmission = () => {
        // console.log(myVotes, rawData.voteInfo);
        const newVoteInfo = {...rawData.voteInfo};
        // console.log(newVoteInfo);
        Object.keys(rawData.voteInfo).map((key, idx) => {
            newVoteInfo[key] = newVoteInfo[key] + myVotes[idx]
        });
        // console.log(newVoteInfo);
        changePoll(rawData.docId, "voteInfo", newVoteInfo)
            .then(() => {
                // let votePrint = null;
                let votePrint = printVotes(newVoteInfo);
                let yourVotes = printChoice(newVoteInfo, rawData.voteInfo)
                alert(`Vote Submitted! 
                \n Title: ${rawData.title}
                \n Description: ${rawData.desc}
                \n DeadLine(local): ${rawData.deadLine}
                \n Notes/Comments: ${rawData.notes}
                \n You voted: \n ${yourVotes}
                \n CurrentVotes: \n ${votePrint}
                `);
                handleClose();
                window.location.reload(false);
            })
            .catch(() => {
                alert("Error voting!");
            })
    };


    const changeVotes = (idx, val) => {
        const updated = [...myVotes];
        updated[idx] = val;
        setMyVotes(updated);
        let sum = updated.reduce((a, c) => (a + c), 0);
        setVotesLeft(rawData.maxVotePerPerson - sum);
    };
    
    return (
      <div>
        <Button onClick={handleOpen}>vote</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Options
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="h2">
                        Votes left: {votesLeft}
                    </Typography>
                </Grid >
                {
                    Object.keys(rawData.voteInfo)
                        .map((opt, idx) => {
                            return (
                                <Grid container key={idx}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {opt}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IncDecButton idx={idx} minNumOption={0} votesLeft={votesLeft} cbFunc={changeVotes}/>
                                    </Grid>
                                </ Grid>
                            )
                        }) 
                }
                <Grid item xs={6}>
                    <Button onClick={() => {alert("cancelled"); handleClose();}}>Cancel</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleSubmission}>Submit</Button>
                </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
}

export default VotePollButton;