import { makeStyles } from '@material-ui/core';
import { colors } from '../../design';

export const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: 50,
    backgroundColor: '#000154',
  },
  title: {
    fontSize: 21,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginRight: 75,
  },
  cmsTopbarSubacute: {
    ...getAvatarStyle('cmsTopbarSubacute'),
  },
  cmsTopbarMltc: {
    ...getAvatarStyle('cmsTopbarMltc'),
  },
  spacer: {
    flex: 1,
  },
  selectRoot: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
  },
  dense: {
    marginTop: '2.5px',
    marginBottom: '2.5px',
  },
  topForm: {
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: 3.5,
      paddingBottom: 3.5,
      paddingLeft: 25,
      fontSize: 12,
      width: 160,
    },
  },
  dashboard: {
    color: colors.white,
    cursor: 'pointer',
  },
  logo: {
    height: 36,
    marginRight: 10,
    'user-drag': 'none',
    'user-select': 'none',
    '-moz-user-select': 'none',
    '-webkit-user-drag': 'none',
    '-webkit-user-select': 'none',
    '-ms-user-select': 'none',
  },
}));

const avatarColors = {
  cmsTopbarSubacute: '#F57C00',
  cmsTopbarMltc: '#F7B500',
};

function getAvatarStyle(className) {
  return {
    '& div': {
      '& div': {
        '& button': {
          '& .MuiIconButton-label': {
            borderRadius: 15,
            backgroundColor: avatarColors[className],
          },
        },
      },
    },
  };
}
