import { Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const columns = [
    { id: 'tiny', label: 'Tiny', minWidth: 60 },
    { id: 'full', label: 'Full', minWidth: 100 },
];

export default function FCTable({ urls }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const server = "localhost:5000/";
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleLink = (link) => {
        console.log("You CLicked", link);
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table 
                stickyHeader 
                aria-label="sticky table"
                testid="URLsTable"
                >
                    <TableHead
                    testid="URLsTableHeader"
                    >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {urls
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((url) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={url.tiny}>
                                        {columns.map((column) => {
                                            const value = url[column.id];
                                            return (
                                                <TableCell 
                                                key={column.id} 
                                                align={column.align}
                                                testid={`URLTable_${column.id}_${value}`}
                                                >
                                                    {column.id === "tiny" ?
                                                        <Link
                                                            //component={"button"}
                                                            onClick={() => handleLink(value)}
                                                        >
                                                            {server + value}
                                                        </Link> :
                                                        value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={urls.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
