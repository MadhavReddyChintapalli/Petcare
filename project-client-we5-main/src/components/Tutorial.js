import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import ReactPlayer from 'react-player'
import '../styles/tutorials.css'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  headingSpace: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  formControl: {
    minWidth: 300,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 0
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))
const Tutorial = () => {
  const [tutorials, setTutorials] = useState([])
  const [petType, setPetType] = useState('')
  const [petList, setPetList] = useState([])
  const [filteredTutorials, setFilteredTutorials] = useState([])
  const classes = useStyles()

  const handleChange = event => {
    setPetType(event.target.value)
    if(event.target.value !== 'All'){
      var filteredTut = tutorials.filter(function(x) {
        return x.petType === event.target.value;
      });
      setFilteredTutorials(filteredTut);
    }
    else{
      setFilteredTutorials(tutorials);
    }
    
  }

  useEffect(() => {
    let token = localStorage.getItem('token')
    let config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    }
    axios.get('https://pet-care-endpoint.herokuapp.com/api/tutorial', config).then(response => {
      setTutorials(response.data);
      setFilteredTutorials(response.data)
      const pets = [...new Set(response.data.reduce((a, c) => [...a, c.petType], []))];
      var filtered = pets.filter(function(x) {
        return x !== undefined;
      });
      setPetList(filtered)
    })
  }, [])
  return (
    <div>
      <Typography className={classes.headingSpace} variant='h5' component='h5'>
        Tutorials
      </Typography>

      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-simple-select-outlined-label'>Select a Pet Type</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={petType}
          onChange={handleChange}
          style={{minWidth:300}}
          label='Pet Type'
        >
          <MenuItem  value="All">All Pets</MenuItem>
          {
            petList.map(val =>{
              return (
                <MenuItem key={val} value={val}>{val}</MenuItem>
              );
            })
          }
        </Select>
      </FormControl>
      {filteredTutorials.map(value => {
        return (
          <div key={value._id} className='react-player-container'>
            <div className='react-player-title'>{value.title}</div>
            <ReactPlayer url={value.videoUrl} />
          </div>
        )
      })}
    </div>
  )
}

export default Tutorial
