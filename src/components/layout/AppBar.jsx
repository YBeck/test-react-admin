import React, { useState } from 'react';
import clsx from 'clsx';

import {
  AppBar,
  UserMenu,
  MenuItemLink,
  ReferenceInput,
  SimpleForm,
  AutocompleteInput,
  SelectInput,
  translate,
} from 'react-admin';
import { useDispatch, connect } from 'react-redux';
import compose from 'recompose/compose';
import { facilityActions } from '../../state/actions';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import SettingsIcon from '@material-ui/icons/Settings';
import { useStyles } from './appbar.styles';
import {
  Typography,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { icons } from '../../design';
const { DashboardIcon, SearchIcon } = icons;

const MyUserMenu = props => (
  <UserMenu {...props} style={{ color: 'yellow', background: 'yellow' }}>
    <MenuItemLink
      to='/configuration'
      primaryText='Configuration'
      leftIcon={<SettingsIcon />}
    />
  </UserMenu>
);

const SelectFacility = ({ facilityActions, ...props }) => {
  const [facilityId, setFacilityId] = useState(1);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setFacilityId(value);
    dispatch(facilityActions.getFacility(value));
  };
  return (
    <TextField
      select
      className={classes.topForm}
      value={facilityId}
      onChange={handleChange}
      name='facilityId'
      classes={{
        root: clsx(classes.selectRoot, classes.dense),
      }}
      margin='dense'
      variant='outlined'
    >
      {props.choices &&
        props.choices.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
    </TextField>
  );
};

const MyAppBarView = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userType = 'mltc'; // MAKE REAL
  console.log({ appProps: props });
  return (
    <AppBar
      {...props}
      userMenu={<MyUserMenu />}
      className={clsx(
        classes.root,
        { [classes.cmsTopbarMltc]: userType === 'mltc' },
        { [classes.cmsTopbarSubacute]: userType === 'subacute' },
      )}
    >
      <img src='/images/logo.png' alt='logo' className={classes.logo} />
      <Typography classes={{ root: classes.title }}>CMS Auths</Typography>
      <SimpleForm toolbar={null} resource='users'>
        <ReferenceInput
          {...props}
          source='userId'
          reference='users'
          label='Users'
          perPage={100}
          sort={{ field: 'name', order: 'ASC' }}
          // filter={{ userId: 25 }}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <SelectFacility facilityActions={facilityActions} />
        </ReferenceInput>
      </SimpleForm>
      <span className={classes.spacer} />
      <Tooltip title='Search' placement='bottom'>
        <IconButton>
          <SearchIcon className={classes.dashboard} />
        </IconButton>
      </Tooltip>
      <Tooltip title='Dashboard' placement='bottom'>
        <IconButton onClick={() => dispatch(push('/'))}>
          <DashboardIcon className={classes.dashboard} />
        </IconButton>
      </Tooltip>
      {/* <Typography
        color='inherit'
        className={classes.title}
        id='react-admin-title'
      /> */}
    </AppBar>
  );
};

// const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

// function onChange(e) {
//   console.log("on change ", e);

// }

const mapStateToProps = state => {
  const { facility: { facility } = {} } = state;
  return {
    facility,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(facilityActions, dispatch),
  },
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // translate,
);

export const MyAppBar = enhance(MyAppBarView);
