import { useState } from 'react';
import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import {
  Table as Tablay,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
import Label from './Label';
import Scrollbar from './Scrollbar';
import { UserListHead } from './_dashboard/user';

const statusColors = { Active: 'success', Upcoming: 'warning', 'Checked Out': 'error' };

const Table = ({ rows, headings }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeFilter, setFilter] = useState('');

  if (!rows) return <p>Loading...</p>;

  const filtered = !activeFilter ? rows : rows.filter((row) => row.status === activeFilter);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <Scrollbar>
      <button
        onClick={() => {
          setFilter('Active');
        }}
      >
        Active
      </button>
      <button
        onClick={() => {
          setFilter('Upcoming');
        }}
      >
        Upcoming
      </button>
      <button
        onClick={() => {
          setFilter('Checked Out');
        }}
      >
        Checked Out
      </button>
      <button
        onClick={() => {
          setFilter('');
        }}
      >
        Clear
      </button>
      <TableContainer>
        <Tablay>
          <UserListHead
            order={order}
            orderBy={orderBy}
            headLabel={headings}
            rowCount={rows.length}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const {
                id,
                name,
                location,

                status,
                checkInTime,
                checkOutTime,
                avatarUrl
              } = row;
              const isItemSelected = selected.indexOf(name) !== -1;

              return (
                <TableRow
                  hover
                  key={id}
                  tabIndex={-1}
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                >
                  <TableCell component="th" scope="row" padding="2px">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt={name} src={avatarUrl} />
                      <Typography variant="subtitle2" noWrap>
                        {name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">{checkInTime}</TableCell>
                  <TableCell align="left">{checkOutTime}</TableCell>

                  <TableCell align="left">{location}</TableCell>
                  <TableCell align="left">
                    <Label variant="ghost" color={statusColors[status]}>
                      {sentenceCase(status)}
                    </Label>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Tablay>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Scrollbar>
  );
};

export default Table;
