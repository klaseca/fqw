import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from 'store/adminSlice';
import { useMountEffect } from 'hooks/useMountEffect';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

export default function UsersList() {
  const { users } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const classes = useStyles();

  useMountEffect(() => {
    dispatch(getUsers());
  });

  return (
    <Table className={classes.table} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>Имя</TableCell>
          <TableCell>Фамиля</TableCell>
          <TableCell>Почта</TableCell>
          <TableCell>Телефон</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.userId}>
            <TableCell>
              {user.firstName}
            </TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
