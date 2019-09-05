import { makeStyles } from '@material-ui/core';
import { styles, colors } from '../../design';
// import { maxWidth } from '@material-ui/system';
export const useStyles = makeStyles(theme => ({
  sidebar: {
    height: 'calc(100vh - 45px)',
    position: 'fixed',
    overflowY: 'auto',
    width: 'inherit',
  },
  marginTop: {
    marginTop: 35,
  },
  rootCases: {
    border: '1px solid #CCCCCC',
    backgroundColor: 'rgba(130,156,181,0.28)',
    paddingTop: 0,
    '& .MuiPaper-root': {
      height: '100%',
      marginTop: 0,
    },
    // boxShadow: [
    //   [0, 2, 10, 0, 'rgba(0,0,0,0.16)'],
    //   [0, 2, 5, 0, 'rgba(0,0,0,0.5)'],
    // ],
  },
  iconContainer: {
    display: 'inline-flex',
    minWidth: 40,
    flexShrink: 0,
  },
  withCaseContainer: {
    marginTop: '4.5em',
    paddingTop: 0,
  },
  gutters: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  casesContainer: {
    backgroundColor: '#FFFFFF',
    boxShadow: [
      [0, 2, 4, 0, 'rgba(0,0,0,0.2)'],
      [0, 1, 5, 0, 'rgba(0,0,0,0.13)'],
    ],
    ...styles.flexRow,
    minWidth: '100%',
    height: 95,
    ...styles.cursorPointer,
  },
  casesAbsolute: {
    position: 'fixed',
    top: 43,
    zIndex: 100,
    width: 'inherit',
    backgroundColor: colors.white,
  },
  allCases: {
    height: 50,
    boxShadow: [
      [0, 2, 4, 0, 'rgba(0,0,0,0.2)'],
      [0, 1, 5, 0, 'rgba(0,0,0,0.13)'],
    ],
    ...styles.flexRow,
    ...styles.justifyBetween,
    fontSize: 14,
    fontWeight: 600,
    paddingRight: 10,
    paddingLeft: 20,
  },
  casesNameContainer: {
    ...styles.flexColumn,
    ...styles.justifyCenter,
    alignItems: 'flex-start',
  },
  caseTitle: {
    fontSize: 13,
    fontWeight: 600,
  },
  avatar: {
    marginRight: 10,
  },
  navBack: {
    ...styles.flexRow,
    ...styles.justifystart,
    paddingLeft: 16,
    position: 'fixed',
    bottom: 30,
  },
  backIcon: {
    marginRight: 30,
  },
}));
