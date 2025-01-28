import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { pink,green } from '@mui/material/colors';

const columns = [
  { id: 'Event Type', label: 'Event Type', },
  { id: 'Branch', label: 'Branch', },
  {
    id: 'state',
    label: 'state',
    // minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Price',
    label: 'Price',
    // minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Address',
    label: 'Address',
    // minWidth: 170,
    // align: 'right',
    format: (value) => value.toFixed(2),
  },
//   {
//     id: 'description',
//     label: 'description',
//     // minWidth: 170,
//     // align: 'right',
//     format: (value) => value.toFixed(2),
//   },

];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

function EventTable ({data}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleCheck = (id) => {
    setData(prevData => {
      return prevData.map(row => {
        if (row.id === id) {
          return {...row, status: !row.status}
        } else {
          return row;
        }
      });
    });
  };
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <Paper sx={{ minWidth:100 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth || 0 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {/* {columns.map((column) => {
                      const value = row[column.id];
                      return ( */}
                      
                        <TableCell key={row.id} >
                            {row.event_type}
                          {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                        : value} */}
                        </TableCell>
                        <TableCell>
                        {row?.branch?.name}
                            
                        </TableCell>
                        <TableCell>
                        {row?.branch.state}
                            
                        </TableCell>
                        <TableCell>
                        {row.price}
                            
                        </TableCell>
                        <TableCell>
                        {row.description}
                            
                        </TableCell>
                        <TableCell>
                        {row?.branch?.address}
                            
                        </TableCell>
                    
                    
                        {/* <TableCell>
                        <Checkbox
                            checked={row.status}
                            onChange={(e) => {
                            const updatedRow = {...row, status: e.target.checked};
                            // handle updating the row in the state here
                            }}
                            sx={{
                            color: green[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                            }}
                        />
                        </TableCell> */}
                      {/* );
                    })} */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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

export default EventTable;


