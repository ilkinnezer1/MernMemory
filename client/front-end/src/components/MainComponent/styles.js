import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  searchButton:{
    background: "#6a7ff5"
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));