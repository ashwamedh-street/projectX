import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AuthUserContext from '../../../Contexts/AuthUserContext'
import ProcessActivity from './ProcessActivity';
import CommentBox from './CommentBox'
const useButtonStyles = makeStyles({
    outer:{
        display:'flex',
        justifyContent:'space-evenly',
        width:'100%',
        // border : '2px solid black'
    },
    table:{
        width:'90%',
        border:'1px solid black'
    },
})

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const GetApprovalCell =()=>{
  const authUser = useContext(AuthUserContext).authUser;
  if(!authUser) return null;

  return(
    <TableCell align = 'right'>Approve</TableCell>
  )
}
function GetApprovalCellButton(){
  const authUser = useContext(AuthUserContext).authUser
  if(!authUser) return null
  return(
    <TableCell align = 'right' >
      <ProcessActivity/>
    </TableCell>
  )
}

function Row(props) {
  const { row } = props; //row data received as props
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
    
    <TableRow className={classes.root}>
    <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
    </TableCell>
    <TableCell component="th" scope="row">{row.name}</TableCell>
    <TableCell component="th" scope="row">{row.title}</TableCell>
    <TableCell align="right">{row.category}</TableCell>
    <TableCell align="right">{row.date}</TableCell>
    <TableCell align="right">{row.status}</TableCell>
    {GetApprovalCellButton()}
    </TableRow>
    <TableRow>
    {/* dropdown */}
    <TableCell style={{ paddingBottom: 0, paddingTop: 0,backgroundColor:'lightgrey' }} colSpan={8}>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <Box margin={1} >
            <Typography variant="h6" gutterBottom component="div">
              Description
            </Typography>
            <div>{row.history}</div>
            {/* ****************************************************************************************** */}
            <CommentBox data = {row}/>
            {/* ****************************************************************************************** */}
        </Box>
        </Collapse>
    </TableCell>
    </TableRow> 
</React.Fragment>
);
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const TableStructure = (props) =>{
    const {rows} = props;
    const classes = useButtonStyles()
    return (
      <div className = {classes.outer}>
        
          <TableContainer component={Paper} class = {classes.table}>
          <Table aria-label="collapsible table">
              <TableHead>
              <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Department</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  {GetApprovalCell()}
              </TableRow>
              </TableHead>
              <TableBody>
            {/* ********************************************************************************* */}
              {rows.map((row) => (
                  <Row key={row.name} row={row} />
              ))}
            {/* ********************************************************************************* */}

              </TableBody>
          </Table>
          </TableContainer>
          {/* <Modal refreshTable = {refreshTable} isTableReady = {isTableReady}/> */}
      </div>
    );
}
export default TableStructure;