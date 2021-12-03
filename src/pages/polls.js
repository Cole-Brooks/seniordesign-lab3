import React, {useState, useEffect, useContext} from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Navbar from "../components/Navbar"
import { 
    CssBaseline, 
    Box, 
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    MenuItem, 
    FormControl, 
    Select, 
    InputLabel
} from '@mui/material';
import { navigate } from "gatsby";
import BasicDateTimePicker from '../components/datetimePicker';
import timeConverter from '../utils/timeConverter';
import { AuthContext } from '../context/auth';
import VotePollButton from '../components/VotePollButton';
import PublishButton from '../components/PublishButton';
import { updatedPolls, convertPoll, changePoll} from '../utils/polls';
// https://www.codegrepper.com/code-examples/javascript/first+10+character+of+string+js
// https://stackoverflow.com/questions/42083181/is-it-possible-to-return-empty-in-react-render-function
const columns = [
    { id: 'title', label: 'Title', align: 'center', minWidth: 50 },
    { id: 'desc', label: 'Desc', align: 'center', minWidth: 50 },
    {
      id: 'deadLine',
      label: 'DeadLine',
      minWidth: 300,
      align: 'center',
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 50,
      align: 'center',
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 240,
      align: 'center',
    },
];


function StickyHeadTable(props) {
    const {setEditPoll} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const tmp = new Date();
    const [rows, setRows] = useState([]);
    const {user} = useContext(AuthContext);

    const createData = (rawData, user) => {
        const {deadLine: dl} = rawData;
        const actions = (
            <div>
                <VotePollButton rawData={rawData}/>
                {
                    user !== undefined && user.uid === rawData.createrID && rawData.status === "unPublished" 
                    ? 
                    <PublishButton rawData={rawData}/>
                    : 
                    null
                }
                {
                    user !== undefined && user.uid === rawData.createrID 
                    ? 
                    <Button onClick={() => {
                        console.log(rawData); 
                        setEditPoll(rawData);
                    }}> Edit 
                    </ Button> 
                    : 
                    null
                }
            </div>
        );
        const deadLine = (
            <BasicDateTimePicker deadLine={dl} setDeadLine={() => (null)} readOnly={true} />
        );
        return {...rawData, deadLine: deadLine, actions };
    }
    
    useEffect(() => {
        updatedPolls()
            .then(listOfPolls => {
                let returnArray = [];
                // console.log(res);
                listOfPolls.forEach(poll => {
                    let e = convertPoll(poll);
                    returnArray.push(createData(e, user));
                }); 
                // console.log(returnArray);
                setRows(returnArray);
            })
            .catch(err => {
                alert("Cannot fetch data");
            });
    }, [user]);




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
    return (
        <Paper sx={{ width: '100%', overflow: 'auto' }}>
            {/* <p>{rows.length}</p>
            <button onClick={() => {setBtn(btn + 1)}}>
                clickMe
            </button> */}
            <TableContainer sx={{ maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.docId}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === "desc" 
                                                    ? 
                                                    (value.slice(0, 20) + (value.length >= 20 ? "..." : ""))
                                                    : value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        }
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

const EditPollPane = (props) => {
    const {editPoll, setEditPoll} = props;
    const [ maxVotePerPerson, setMaxVotePerPerson ] = useState(editPoll.maxVotePerPerson);
    const [ title, setTitle ] = useState(editPoll.title);
    const [ desc, setDesc ] = useState(editPoll.desc);
    const [ notes, setNotes ] = useState(editPoll.notes);
    const [ optArr, setOptArr ] = useState(Object.keys(editPoll.voteInfo));
    const [ deadLine, setDeadLine ] = useState(editPoll.deadLine);
    const [ timeZone, setTimeZone ] = useState("");
    const [ vError, setVError ] = useState({});

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
        const err = validate();
        if (Object.keys(err).length !== 0) {
            let errMsg = "";
            for (let key in err) {
                errMsg = errMsg.concat(err[key]).concat("\n");
            }
            alert(errMsg);
            console.log("error");
            return;
        }
        const newPoll = {
            title: title,
            desc: desc,
            notes: notes,
            maxVotePerPerson: maxVotePerPerson,
            voteInfo: optArr.filter(opt => opt.length !== 0),
            deadLine: timeConverter(new Date(deadLine.getTime()), timeZone),
            status: editPoll.status,
            createrID: editPoll.createrID
        };
        console.log(newPoll);
        changePoll(editPoll.docId, "all", newPoll)
            .then(() => {
                console.log("Document changed with ID: ", editPoll.docId);
                setEditPoll(null);
                navigate("/polls");
            })
            .catch((error) => {alert("Error adding document");});
    }

    return (
            <Box sx={{ flexGrow: 1 }}>
                <br />
                <Typography variant="h5" component="div" gutterBottom>
                    Editing a Poll!
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
                            defaultValue={editPoll.title}
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
                            defaultValue={editPoll.desc}
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
                            defaultValue={editPoll.notes}
                            placeholder="Ex: ASAP"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Max Number of Votes for Each Voter"
                            placeholder="1"
                            defaultValue={editPoll.maxVotePerPerson}
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
                                defaultValue={Object.keys(editPoll.voteInfo)[0]}
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
                                defaultValue={Object.keys(editPoll.voteInfo)[1]}
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
                                defaultValue={Object.keys(editPoll.voteInfo)[2]}
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
                                defaultValue={Object.keys(editPoll.voteInfo)[3]}
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
        
    )
}

  
const Polls = () => {
    const [editPoll, setEditPoll] = useState(null);
    return (
        <Layout>
            <Seo title="Polls" />
            <Navbar />
            <CssBaseline />
            <Container>
                { !editPoll 
                    ?
                    <StickyHeadTable setEditPoll={setEditPoll}/>
                    :
                    <EditPollPane editPoll={editPoll} setEditPoll={setEditPoll}/>
                }

            </Container>
        </Layout>
    );
};

export default Polls;

