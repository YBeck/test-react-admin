import { makeStyles } from '@material-ui/core';

const flex = {
  display: 'flex',
  alignItems: 'center',
};

const flexStyles = {
  flexRow: {
    ...flex,
  },
  flexColumn: {
    ...flex,
    flexDirection: 'column',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifystart: {
    justifyContent: 'flex-start',
  },
};

const chipStyles = {
  approved: {
    backgroundColor: '#AFDD45',
    color: '#33333',
  },
  approvedSidebar: {
    backgroundColor: '#AEDD45',
    color: '#FFFFFF',
  },
  upheld: {
    backgroundColor: '#829CB5',
    color: '#FFFFFF',
  },
  closed: {
    backgroundColor: '#829CB5',
    color: '#FFFFFF',
  },
  denied: {
    backgroundColor: '#E91F31',
    color: '#FFFFFF',
  },
  discharged: {
    backgroundColor: '#F7B500',
    color: '#FFFFFF',
  },
};

export const styles = {
  ...flexStyles,
  ...chipStyles,
  cursorPointer: {
    cursor: 'pointer',
  },
};

export const useGlobalStyles = makeStyles(theme => ({
  ...styles,
}));

export const colors = {
  yellow: '#AEDD45',
  white: '#FFFFFF',
  black: 'rgba(0,0,0,0.87)',
};
