import React, { Fragment, useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { uiActions } from '../../state/actions';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router';
import format from 'date-fns/format';

import { ListItem, List, Avatar, Typography, Chip } from '@material-ui/core';
import { useStyles } from './sidebar.styles';
import { convertToObj } from '../../utils';

import { icons, colors } from '../../design';
const { ArrowDropDownIcon } = icons;

const CaseItem = ({
  id: caseId,
  name_first,
  name_last,
  start_date,
  date_end,
  avatar,
  status,
  showArrowIcon,
  toggleList,
  reduxActions,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  function navigateToCase() {
    dispatch(reduxActions.updateSidebar(caseId + ''));
    dispatch(push(`/cases/${caseId}`));
  }
  return (
    <ListItem
      classes={{
        root: classes.casesContainer,
        gutters: classes.gutters,
      }}
      onClick={showArrowIcon ? toggleList : navigateToCase}
    >
      <Avatar src={avatar} classes={{ root: classes.avatar }} />
      <div>
        <Typography className={classes.caseTitle}>{`${name_first} ${name_last} - ${date_end}`}</Typography>
        <Typography variant='caption' display='block'>
          {`${start_date}-${format(Date.now(), 'M/d/yy')}`}
        </Typography>
        <Chip
          style={{ background: colors.yellow, color: colors.white }}
          size='small'
          label={status}
        />
      </div>
      {showArrowIcon && <ArrowDropDownIcon />}
    </ListItem>
  );
};

const AllCasesDropdown = ({ userType, toggleList }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.allCases} onClick={toggleList}>
      {`All Cases - ${userType}`}
      <ArrowDropDownIcon />
    </ListItem>
  );
};
const SidebarCasesView = ({ reduxActions, sidebarCase, profile, ...props }) => {
  const [expandList, setExpandList] = useState(false);
  const classes = useStyles();
  function toggleList() {
    setExpandList(!expandList);
  }
  function displayCases(cases, caseId) {
    const { [caseId]: selectedCase, ...otherCases } = cases;
    return (
      <Fragment>
        {sidebarCase ? (
          <CaseItem {...selectedCase} showArrowIcon toggleList={toggleList} />
        ) : (
          <AllCasesDropdown userType={profile ? getUserDivision(profile) : ''} toggleList={toggleList}/> // MAKE REAL
        )}
        {expandList &&
          Object.keys(otherCases).map(id => {
            return (
              <CaseItem key={id} {...cases[id]} reduxActions={reduxActions} />
            );
          })}
      </Fragment>
    );
  }
  return (
    <div className={classes.casesAbsolute}>
      <List component='div' style={{ paddingBottom: 0 }}>
        {displayCases(cases, sidebarCase)}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  const { user: { profile } = {} } = state;  
  return {
    profile,
  };
};

const mapDispatchToProps = dispatch => ({
  reduxActions: {
    ...bindActionCreators(uiActions, dispatch),
  },
});

export const SidebarCases = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(SidebarCasesView);

var cases = convertToObj([
  {
    id: 1,
    name_first: 'John',
    name_last: 'Friedman',
    start_date: '6/1/19',
    date_end: '7/1/19',
    status: 'Approved',
    avatar: '/images/avatar.png',
  },
  {
    id: 2,
    name_first: 'John',
    name_last: 'Friedman',
    start_date: '6/1/19',
    date_end: '7/1/19',
    status: 'Discharged',
    avatar: '/images/avatar.png',
  },
  {
    id: 3,
    name_first: 'John',
    name_last: 'Friedman',
    start_date: '6/1/19',
    date_end: '7/1/19',
    status: 'Approved',
    avatar: '/images/avatar.png',
  },
  {
    id: 4,
    name_first: 'John',
    name_last: 'Friedman',
    start_date: '6/1/19',
    date_end: '7/1/19',
    status: 'Approved',
    avatar: '/images/avatar.png',
  },
  {
    id: 5,
    name_first: 'Zanvil',
    name_last: 'Green',
    start_date: '6/1/19',
    date_end: '7/1/19',
    status: 'Approved',
    avatar: '/images/avatar.png',
  },
]);


function getUserDivision(profile) {
  const { is_mltc, is_subacute } = profile
  if(is_mltc && is_subacute) {
    return ''
  } else {
    if(is_mltc) {
      return 'MLTC'
    } else {
      return 'Subacute'
    }
  }
}