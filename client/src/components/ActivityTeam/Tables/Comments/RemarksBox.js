import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Divider, Avatar, Grid, Paper, IconButton } from "@material-ui/core";
import TeamDataContext from "../../../../Contexts/TeamDataContext";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import AuthUserContext from "../../../../Contexts/AuthUserContext";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
// import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root:{
      margin: theme.spacing(1),
      // width: '25ch',
      display:'flex',
      alignItems:'center',
      
    },
  
}));

const GetRemarks = (data)=>{          

  const classes = useStyles();
  const deleteRemark = (e) =>{
    console.log(e.currentTarget.value,'remark id')
    const url = `/api/${authUser.uid}/teamActivity/delete`;
    axios.post(url,{
      userId:data.userId,
      activityId:data._id,
      typeId : e.currentTarget.value,
      type:'remark'
    }).then((res)=>{
      console.log(res.data)
      setTeamData(res.data)
    }).catch((err)=>{
      console.log(err);
    })
    //refreshing here
    setRefresh()
  }

  const authUser = useContext(AuthUserContext).authUser;
  const {refresh,setRefresh} = useContext(AuthUserContext);
  const setTeamData = useContext(TeamDataContext).setTeamData;
  
  if(!data) return
  if(!data.remarks) return 

  const remarks = data.remarks
  const name = data.name
  const res = remarks.map(remark => {
    return (
      <div>
      <Grid container wrap="nowrap" spacing={2} style = {{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <div style = {{display:'flex',margin:'2px'}}>
          <Grid item style = {{margin:'5px'}}>
            <Avatar alt="net slow hai" src={imgLink} className = {classes.small} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth style = {{margin:'5px'}}>
            <h4 style={{ margin: 0, textAlign: "left" }}>{remark.name}</h4>
            <p style={{ textAlign: "left" ,margin:'2px'}}>
              {remark.text}
            </p>
          </Grid>
        </div>
        <IconButton value = {remark._id} onClick = {deleteRemark}>
            <DeleteIcon></DeleteIcon>
        </IconButton>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
      </div>
    )
  });
  return res;
}

const NewRemark = (data)=>{
  // console.log(data)
  const classes = useStyles();

  const [text,setText] = useState("");
  const authUser = useContext(AuthUserContext).authUser;
  const {refresh,setRefresh} = useContext(AuthUserContext);
  const setTeamData = useContext(TeamDataContext).setTeamData;

  const onSubmit = (e)=>{
    e.preventDefault();
    setText("");
    const url = `/api/${authUser.uid}/teamActivity/addRemark`;
    axios.post(url,{
      uid:data.userId,
      _id:data._id,
      name:authUser.name,
      text,
      time : Date.now(),
    }).then((res)=>{
      console.log(res.data)
      setTeamData(res.data)
    }).catch((err)=>{
      console.log(err);
    })
    //refreshing here
    setRefresh()
  }

  return(
   <Grid container wrap="nowrap" spacing={2}>
    <Grid item>
      <Avatar alt="Remy Sharp" src={imgLink} />
    </Grid>
    <Grid justifyContent="left" item xs zeroMinWidth>
      <h4 style={{ margin: 0, textAlign: "left" }}>{authUser.name}</h4>

      <form className={classes.root} noValidate autoComplete="off" onSubmit = {onSubmit} >
        <TextField
            style ={{width:'80%'}}
            id="outlined-textarea"
            size = "small"
            placeholder="This remark will be visible to the publisher of this activity"
            multiline
            value = {text}
            variant="outlined"
            onChange = {(e)=>{setText(e.target.value);}}
        />
        <IconButton color="primary" aria-label="approve" type = "submit" onClick = {onSubmit} >
          <SendIcon />
        </IconButton>
      </form>
    </Grid>
  </Grid>
  )
}
const imgLink = "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

function App(props) {
  const {data} = props;
  const {refresh} = useContext(AuthUserContext);
  //process commments
  useEffect(()=>{
    console.log(data,'refreshed');
  },[data])

  return (
    <div style={{ }} className="App">
      <h2>Remarks</h2>
        <Paper style={{ padding: "20px 10px" }}>
        {GetRemarks(data)}
        {NewRemark(data)}
      </Paper>
    </div>
  );
}

export default App;