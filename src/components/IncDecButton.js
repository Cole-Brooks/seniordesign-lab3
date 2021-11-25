import React, { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';
// https://stackoverflow.com/questions/59305603/increment-and-decrement-button-via-material-ui-buttongroup 
export default function IncDecButton(props) {
    const { minNumOption, votesLeft, cbFunc, idx} = props;
    const [count, setCount] = useState(minNumOption);

    const handleIncrement = () => {
        const newVal = count + 1;
        setCount(newVal);
        cbFunc(idx, newVal);
    };

    const handleDecrement = () => {
        const newVal = count - 1;
        setCount(newVal);
        cbFunc(idx, newVal);
    };

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
        {<Button onClick={handleIncrement} disabled={votesLeft <= 0}>+</Button> }
        <Button disabled color="info">{count}</Button>
        {<Button onClick={handleDecrement} disabled={count <= minNumOption}>-</Button> }
        </ButtonGroup>
    );
}