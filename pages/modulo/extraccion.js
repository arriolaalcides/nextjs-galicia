import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import ModalSaldoInsuficiente from './modal/modalsaldoinsuficiente';
import ModalConfirmar from './modal/modalconfirmar';

import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color:'#080707',
    width: '70%',
  },
  button:{
    width: '75%',
    padding: theme.spacing(1),
    marginTop:30,
    marginLeft:35,
    // marginRight:50
    //marginLeft: theme.spacing(5)
  },
  buttonCancel:{
    //width: '100%',
    padding: theme.spacing(1),
    marginRight:10,
    marginLeft:10
  },
  form:{
    display:'flex',
    marginLeft: 'auto',
    marginRight:'auto',
    marginLeft: theme.spacing(25),
    marginRight:theme.spacing(25),
  },
  content:{
    display: 'block',
    padding:10,
    marginLeft: 'auto',
    marginRight:'auto'
  },
  container:{
    marginLeft: 30,
    padding:10,
    width: '50%'
  },
  box:{
    width: '100%',
    padding: 30,
    margin:10,
    marginLeft: 10,
    marginRight: 10
  },
  div:{
    marginLeft:10,
    marginRight:10
  },
  modal: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  span:{
    display:'flex',
    // marginLeft: 'auto',
    // marginRight:'auto',
  }
}));

export default function Operacion() {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openSaldo, setOpenSaldo] = useState(false);
  const delay = 30000;
  const [isDisable,setIsDisable] = useState(false);
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    setIsDisable(true);
  };

  const user = (cookie.get('token'))?JSON.parse(cookie.get('token')):{};
  //console.log(user);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenSaldo = () => {
    setOpenSaldo(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSaldo = () => {
    setOpenSaldo(false);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
  
    if(Number(value) <= Number(user.saldo)){
      if(cookie.get('token')) cookie.remove('token');
      const resto = Number(user.saldo) - Number(value);
      user.saldo = resto.toString();
      user.valor = value.toString();
      user.tipo = "Extracción";
      cookie.set('token', JSON.stringify(user));
      // console.log(cookie.get('token'));
      router.push('./exito');
    }
    else if(value=='otro'){
      router.push('./otromonto');
    } 
    else{
      handleOpenSaldo();
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      //router.push('/');
      if(value !== '') router.push('/');
    }, delay);
    return () => clearTimeout(timeout);
  }, [value]);

  //console.log(user);
  return (
    
    <div className={classes.root} >
      <Grid container spacing={3}>
        <Grid item xs={9} className={classes.container}>
          <Box border={1} className={classes.box}>
              <Typography variant="h4" align="center" gutterBottom spacing={5}>
                Extracción
              </Typography>
              <Container>
                <form  className={classes.form} onSubmit={handleSubmit}>
                  <div className={classes.div}>
                    <FormControl component="fieldset">
                      <Box border={1} className={classes.box}>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                          <FormControlLabel value="500" control={<Radio />} label="$500" />
                          <FormControlLabel value="2000" control={<Radio />} label="$2.000" />
                          <FormControlLabel value="3000" control={<Radio />} label="$3.000" />
                        </RadioGroup>
                      </Box>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        size="medium"
                        onClick={handleOpen}
                      >
                        Cancelar
                      </Button>
                    </FormControl>
                  </div>
                  <div className={classes.div}>
                    <FormControl component="fieldset">
                      <Box border={1} className={classes.box}>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                          <FormControlLabel value="5000" control={<Radio />} label="$5.000" />
                          <FormControlLabel value="6000" control={<Radio />} label="$6.000" />
                          <FormControlLabel value="otro" control={<Radio />} label="Otro monto" />
                        </RadioGroup>
                      </Box>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        size="medium"
                        disabled={!isDisable}
                      >
                        Continuar
                      </Button>
                    </FormControl>
                  </div>
                </form>
              </Container>
          </Box>
        </Grid>
      </Grid>

      <ModalConfirmar 
        open={open}
        handleClose={handleClose}
      />
      <ModalSaldoInsuficiente
        openSaldo={openSaldo} 
        handleCloseSaldo={handleCloseSaldo}
      />
        
    </div>
  )
}