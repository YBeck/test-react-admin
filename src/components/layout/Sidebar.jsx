import React, { Fragment } from 'react';
import clsx from 'clsx';
import { connect, useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import {
  Sidebar as AdminSidebar,
  MenuItemLink,
  WithPermissions,
} from 'react-admin';
import { SidebarCases } from './SidebarCases';
import { uiActions } from '../../state/actions';
import { push } from 'connected-react-router';
import { Link, withRouter } from 'react-router-dom';

import { MenuItem, List, Typography } from '@material-ui/core';
import { useStyles } from './sidebar.styles';

import { icons } from '../../design';
const { TimeIcon, KeyboardBackspaceIcon } = icons;

const MySidebarView = ({
  reduxActions,
  sidebarCase,
  staticContext,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    location: { pathname },
  } = props;
  const routeArr = pathname.split('/');
  const caseId = routeArr[2];

  return routeArr[1] !== 'cases' ? (
    <AdminSidebar {...props} className={classes.marginTop}>
      <Fragment>
        <SidebarCases {...props} />
        <div className={classes.sidebar}>{props.children}</div>
      </Fragment>
    </AdminSidebar>
  ) : (
    <AdminSidebar {...props}>
      <Fragment>
        <SidebarCases {...{ ...props, sidebarCase: caseId }} />
        <div className={clsx(classes.sidebar, classes.rootCases)}>
          <List classes={{ root: classes.withCaseContainer }}>
            <MenuItemLink
              //  onClick={() => dispatch(push(`/cases/${2}/profile`))}
              to={`/cases/${caseId}/profile`}
              primaryText={'Profile'}
              leftIcon={<TimeIcon />}
            />
            <MenuItemLink
              //  onClick={() => dispatch(push(`/cases/${2}/account`))}
              to={`/cases/${caseId}/account`}
              primaryText={'My account'}
              leftIcon={<TimeIcon />}
            />
            <MenuItemLink
              //  onClick={() => dispatch(push(`/cases/${2}/Logout`))}
              to={`/cases/${caseId}/Logout`}
              primaryText={'Logout'}
              leftIcon={<TimeIcon />}
            />

            <MenuItem onClick={() => dispatch(push(`/cases/${caseId}/Logout`))}>
              <div className={classes.iconContainer}>
                <TimeIcon />
              </div>
              <span>Logout</span>
            </MenuItem>
            <MenuItem onClick={() => dispatch(push(`/cases/${caseId}/Logout`))}>
              <div className={classes.iconContainer}>
                <TimeIcon />
              </div>
              <span>Logout</span>
            </MenuItem>
          </List>
          <Link to='/facility'>
            <Typography
              color='primary'
              align='center'
              className={classes.navBack}
            >
              <KeyboardBackspaceIcon className={classes.backIcon} />
              <span>Back to Facility</span>
            </Typography>
          </Link>
        </div>
      </Fragment>
    </AdminSidebar>
  );
};

const mapStateToProps = state => {
  const { ui: { sidebarCase } = {} } = state;
  return {
    sidebarCase,
  };
};

const mapDispatchToProps = dispatch => ({
  reduxActions: {
    ...bindActionCreators(uiActions, dispatch),
  },
});

export const MySidebar = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(MySidebarView);

// let _facilityId = 0;

// const currentFacility = {
//   get id() {
//     return _facilityId;
//   },
//   set id(value) {
//     _facilityId = value;
//     localStorage.setItem('facilityId', value);
//   },
//   load() {
//     _facilityId = parseInt(localStorage.getItem('facilityId') || '0');
//   },
// };
