import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

import Teclado from './teclado/';
import ModalSaldoInsuficiente from './modal/modalsaldoinsuficiente';
import ModalConfirmar from './modal/modalconfirmar';
import {handleCurrency} from './functions/';

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
    color:'#080707',
    width: '70%',
  },
  button:{
    marginTop:100,
    marginLeft:-100
  },
  form:{
    display:'inline-flex'
  },
  content:{
    display: 'block',
    padding:10,
  },
  label:{
    width:'auto',
    marginLeft:100,
    marginRight:120,
    // backgroundColor:'yellow',
    position:'static',
    fontSize:20,
    fontWeight:'bold',
    padding:'auto'
  }
}));

export default function OtroMonto() {
  const classes = useStyles();
  const [state, setState] = useState({
    monto:'0'
  });
  const delay = 30000;
  
  const [isDisable, setIsDisable] = useState(false);

  const [openSaldo, setOpenSaldo] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const user = (cookie.get('token'))?JSON.parse(cookie.get('token')):{};
  //console.log(user);
  
  const handleOpenSaldo = () => {
    setOpenSaldo(true);
  };

  const handleCloseSaldo = () => {
    setOpenSaldo(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (value) => {

    setState(state =>({
      ...state,
      ['monto']:state['monto'] + value
    }));
    //console.log(state);
    setIsDisable(true);
  }

  const resetValue = () => {
    setState({
      monto:'0'
    });

    //setInputName('');
    setIsDisable(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let saldo = Number(state.monto);

    if(saldo > Number(user.saldo)){
      handleOpenSaldo();
    }else{
      if(cookie.get('token')) cookie.remove('token');
      const resto = Number(user.saldo) - Number(saldo);
      user.saldo = resto.toString();
      user.valor = saldo.toString();
      user.tipo = "Extracción";
      cookie.set('token', JSON.stringify(user));
      router.push('./exito');
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      //router.push('/');
      if(state.monto !== '0') router.push('/');
    }, delay);
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <br/><br/>
        <Grid container spacing={1}>
        
          <Grid item xs={12}>
            
            <Typography variant="h4" gutterBottom>
                  Otro monto
              </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <div className={classes.content}>
                <TextField 
                  id="monto" 
                  align="center" 
                  name="monto"
                  variant="filled"
                  className={classes.label}
                  InputProps={{
                    readOnly: true,
                    inputMode: 'numeric'
                  }}
                  value={handleCurrency(state.monto)}
                />
                <br/><br/>
                <Button
                    //onClick={handleOpenSaldo}
                    onClick={handleOpen}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    size="medium"
                    value="1"
                >
                    Cancelar
                </Button>
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
      
      <ModalConfirmar 
        open={open}
        handleClose={handleClose}
      />
      <ModalSaldoInsuficiente
        openSaldo={openSaldo} 
        handleCloseSaldo={handleCloseSaldo}
      />
    </div>  
  );
}