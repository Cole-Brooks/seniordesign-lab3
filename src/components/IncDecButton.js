import React, { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';
// https://stackoverflow.com/questions/59305603/increment-and-decrement-button-via-material-ui-buttongroup 
export default function IncDecButton(props) {
  const { minNumOption, maxNumOption, cbFunc } = props;

  const [count, setCount] = useState(minNumOption);

  const handleIncrement = () => {
    setCount(count + 1);
    cbFunc(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    cbFunc(count + 1);
  };

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      {<Button onClick={handleIncrement} disabled={count >= maxNumOption}>+</Button> }
      <Button disabled color="info">{count}</Button>
      {<Button onClick={handleDecrement} disabled={count <= minNumOption}>-</Button> }
    </ButtonGroup>
  );
}