import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';

import Teclado from './modulo/teclado/';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 250,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    //color: theme.palette.text.secondary,
    color:'#080707',
    width: '70%',
  },
  button:{
    width: '25%',
  },
  form:{
    display:'inline-flex'
  },
  content:{
    display: 'block',
    padding:10
  },
  box:{
    width: '70%',
    //padding: 30,
    margin:10,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

export default function ComplexGrid() {
  const classes = useStyles();
  const [state, setState] = useState({
    dni:'',
    clave:''
  });
  const [inputName,setInputName] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const router = useRouter();

  cookie.remove('token');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if(state.dni!== '' || state.clave!==''){
        //console.log(`You're typing "${state.dni}" : "${state.clave}" now!`);
        resetValue();
      }
    }
    , 20000);

    return () => clearTimeout(timeoutId);
  }, [state]);

  const handleDisable = (lengthDNI,lengthClave) => {
    if(lengthDNI >= 7 && lengthClave == 3){
      setIsDisable(!isDisable);
    }
  }

  const handleTimeout = () => {
    console.log('Click\n');
    const timer = setTimeout(() => {
      console.log('Timeout Reset\n');
      resetValue();
    },20000);
    clearTimeout(timer);
  }

  /*
    const handleChange = (e) => {
      const {name,value} = e.target;
      setState({
        ...state,
        [name]:value
      })
    }
  */

  const handleClick = (value) => {

    if((state.dni.length<=8) && (state.clave.length<=3)){
      setState(state =>({
        ...state,
        [inputName] : state[inputName] + value
      }));
    }
    handleDisable(state.dni.length,state.clave.length);
    //handleTimeout();
  }

  const handleFocus = ({target}) => {
    setInputName(target.name);
    //handleTimeout();
  }

  const resetValue = () => {
    setState({
      dni:'',
      clave:''
    });

    setInputName('');
    setIsDisable(false);
    //console.log('RESET\n');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = 'http://localhost:3000/api/users/'+state.dni+'/'+state.clave;
    
    const res = await fetch(baseUrl);
  
    if(res.status != 200) {
      alert('Datos incorrectos.');
    }else{
      let data = await res.json();
      // console.log(data);
      cookie.set('token', JSON.stringify(data));
      router.push('./modulo/operacion');
    }
    
  }

  // Chequear con librería de estilo reactboot y ver porqué no toma el valor del botón.
  // https://codesandbox.io/s/github/hodgef/react-simple-keyboard-demos/tree/uc-multiple-inputs/

  return (
    <div className={classes.root}>
      <Box border={1} className={classes.box}>
        <Paper className={classes.paper}>
          <Typography variant="subtitle2" align="left" gutterBottom spacing={1}>
              Cajero Automático TASI
          </Typography>
          <br/><br/>
          <Grid container spacing={1}>
          
            <Grid item xs={12}>
              
              <Typography variant="subtitle2" gutterBottom>
                    Ingrese DNI y Clave
                </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <div className={classes.content}>
                  <TextField 
                    id="dni" 
                    align="center" 
                    placeholder="DNI" 
                    name="dni"
                    variant="filled" 
                    onFocus={handleFocus}
                    InputProps={{
                      readOnly: true,
                      autoFocus: false,
                      inputMode: 'numeric'
                    }}
                    value={state.dni}
                  />
                  <br/><br/>
                  <TextField 
                    id="clave" 
                    align="center" 
                    placeholder="Clave"
                    name="clave"
                    type="number" 
                    variant="filled"
                    onFocus={handleFocus}
                    InputProps={{
                      readOnly: true,
                      inputMode: 'numeric'
                    }}
                    value={state.clave}
                    />
                  </div>
                  <Teclado 
                    handleClick={handleClick} 
                    resetValue={resetValue} 
                    handleVisible={isDisable}
                  />
              </form>
            </Grid>
            
          </Grid>
        </Paper>
      </Box>
    </div>  
  );
}