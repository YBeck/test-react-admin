import React from "react";
import { List, Datagrid, TextField, EmailField, UrlField } from "react-admin";
import UserIcon from '@material-ui/icons/Group';

const MyUrlField = ({ record = {}, source }) => (
  <a href={record[source]}>{record[source]}</a>
);

export const UserList = props => {
  return (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <TextField source="website" />
      <MyUrlField source="website" />
      {/* <TextField source="company.name" /> */}
    </Datagrid>
  </List>
)};

export const userResource = {
  name: 'Users',
  list: UserList,
  icon: UserIcon,
  options: { label: 'Users' },
};
