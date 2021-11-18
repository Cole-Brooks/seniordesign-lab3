import React, {useState, useEffect} from 'react'
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

import VotePollButton from '../components/ViewPollButton';
import { updatedPolls } from '../utils/polls';
import BasicDateTimePicker from '../components/datetimePicker';

const columns = [
    { id: 'title', label: 'Title', align: 'center', minWidth: 50 },
    { id: 'desc', label: 'Desc', align: 'center', minWidth: 200 },
    {
      id: 'deadLine',
      label: 'DeadLine',
      minWidth: 50,
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
      minWidth: 50,
      align: 'center',
    },
];

function createData(rawData) {
    const {title, desc, deadLine: dl, status, voteInfo} = rawData;
    console.log(dl);
    const actions = <VotePollButton />;
    const deadLine = (
        <BasicDateTimePicker deadLine={dl} setDeadLine={() => (null)} readOnly={true} />
    );
    console.log(deadLine);
    return { title, desc, deadLine: deadLine, status, actions };
}

  
function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const tmp = new Date();
    const [rows, setRows] = useState([
        createData({
            desc: "what to eat",
            docId: "RvBEVyCSxqJEu15huvtT",
            maxVotePerPerson: 2,
            notes: "hungry",
            status: "unPublished",
            title: "morning",
            deadLine: tmp
        })
    ]);

    // useEffect(() => {
    //     updatedPolls()
    //         .then(res => {
    //             console.log(res);
    //             setRows(res)
    //         })
    //         .catch(err => {
    //             alert("Cannot fetch data");
    //         });
    // }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
    return (
      <Paper sx={{ width: '100%', overflow: 'auto' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.title + row.desc + row.status}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === "deadLine" 
                                                ? 
                                                (value)
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

