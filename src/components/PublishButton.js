import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    Modal,
    Grid,
} from '@mui/material';
import { changePoll } from '../utils/polls';
import { navigate } from 'gatsby-link';


// https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
// https://stackoverflow.com/questions/38364400/index-inside-map-function
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


function PublishButton(props) {
    return (
      <div>
        <Button onClick={() => {
            changePoll(props.rawData.docId, "status", "Published")
                .then(() => {
                    alert("Published successfully");
                    navigate("/");
                }).catch((error) => {
                    console.error("database error occurred: ", error);
                });
        }}>
            publish
        </Button>
      </div>
    );
}

export default PublishButton;