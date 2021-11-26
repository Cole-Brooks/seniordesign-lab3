import React, {useState, useEffect, useContext} from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"
import Navbar from "../components/Navbar"
import { 
    CssBaseline, 
    Box, 
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from '@mui/material';

import VotePollButton from '../components/VotePollButton';
import PublishButton from '../components/PublishButton';
import EditButton from '../components/EditButton';
import { updatedPolls, convertPoll } from '../utils/polls';
import BasicDateTimePicker from '../components/datetimePicker';
import { AuthContext } from '../context/auth';
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


function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const tmp = new Date();
    const [rows, setRows] = useState([]);
    const {user} = useContext(AuthContext);

    const createData = (rawData, user) => {
        const {deadLine: dl} = rawData;
        //console.log(user);
        const actions = (
            <div>
                <VotePollButton rawData={rawData}/>
                {rawData.status === "unPublished" ? <PublishButton rawData={rawData}/> : null}
                {user !== undefined && user.uid === rawData.createrID ? <EditButton rawData={rawData}/> : null}
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

  
const Polls = () => {
    return (
        <Layout>
            <Seo title="Polls" />
            <Navbar />
            <CssBaseline />
            <Container maxWidth="xg">
                <StickyHeadTable />
            </Container>
        </Layout>
    );
};

export default Polls;

