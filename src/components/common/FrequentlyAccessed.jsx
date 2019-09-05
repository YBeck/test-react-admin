import React, { useState } from 'react';

import clsx from 'clsx';
import {
  makeStyles,
  Fab,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  Tooltip,
  ClickAwayListener,
} from '@material-ui/core';
import { icons, styles } from '../../design';
const { AddIcon, InsertCommentIcon, EventIcon } = icons;

const useStyles = makeStyles(theme => ({
  fabPosition: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: 20,
    ...styles.flexColumn,
  },
  fab: {
    backgroundColor: '#24B7F6',
    animation: 'spin 6s linear infinite',
    '&:hover': {
      backgroundColor: '#24B7F6',
    },
  },
  rotate: {
    transform: 'rotate(45deg)',
  },
  optionsContainer: {
    marginBottom: 15,
    marginLeft: 20,
  },
}));

export const FrequentlyAccessed = props => {
  const classes = useStyles();
  const [optionsOpen, setOptionsOpen] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setOptionsOpen(false)}>
      <div className={classes.fabPosition}>
        <Fade in={optionsOpen} className={classes.optionsContainer}>
          <List>
            <ListItem>
              <Tooltip title='Add Communication' placement='left'>
                <ListItemAvatar>
                  <Fab size='small'>
                    <InsertCommentIcon />
                  </Fab>
                </ListItemAvatar>
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip title='Add Event' placement='left'>
                <ListItemAvatar>
                  <Fab size='small'>
                    <EventIcon />
                  </Fab>
                </ListItemAvatar>
              </Tooltip>
            </ListItem>
          </List>
        </Fade>
        <Fab
          className={clsx(classes.fab, {[classes.rotate]: optionsOpen})}
          color='primary'
          size='medium'
          onClick={() => setOptionsOpen(!optionsOpen)}
        >
          {<AddIcon />}
        </Fab>
      </div>
    </ClickAwayListener>
  );
};
