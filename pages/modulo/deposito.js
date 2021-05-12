import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import {handleCurrency} from './functions/';

import Teclado from './teclado/';
import ModalConfirmar from './modal/modalconfirmar';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto'
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
    display:'inline-flex',
    marginLeft: 90
  },
  content:{
    //display: 'block',
    padding:20
  },
  box:{
    width: '70%',
    //padding: 30,
    margin:10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  column:{
    display:'flex',
  },
  caption:{
    padding:20,
  },
  text:{
    width:'30%',
    marginLeft:10
  },
  variant:{
    marginTop:15,
  }
}));

export default function Deposito() {
  const classes = useStyles();
  const [state, setState] = useState({
    cien:'',
    dosciento:'',
    quiniento:'',
    mil:''
  });
  const [inputName,setInputName] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [montoTotal,setMontoTotal] = useState(0); // hacer similar a state para sumar
  const delay = 30000;

  const router = useRouter();
  
  const user = (cookie.get('token'))?JSON.parse(cookie.get('token')):{};

  // Reinicia el cálculo total por cada click del teclado
  const calcularDeposito = (digito,valor) =>{
    let total = 0;
    let ultimoValor = 0;
    let subTotal = valor * digito;

    ultimoValor = (digito.slice(0, -1)) * valor;
    total = (montoTotal==0)?(subTotal):((subTotal) - ultimoValor);

    setMontoTotal(montoTotal + total);
    
  }
  
  // Suma total a depositar
  const sumDeposito = () =>{
    //console.log('Monto Total:'+montoTotal);

    switch(inputName){
      case 'cien':
        calcularDeposito(state[inputName],100);
        break;
      case 'dosciento':
        calcularDeposito(state[inputName],200);
        break;
      case 'quiniento':
        calcularDeposito(state[inputName],500);
        break;
      case 'mil':
        calcularDeposito(state[inputName],1000);
        break;
    }
  }

  useEffect(() => {
    
    sumDeposito();
    
    if(state.cien == '' && state.dosciento == '' && state.quiniento == '' && state.mil == '') setIsDisable(false);
    
    const timeout = setTimeout(() => {
      router.push('./cancelacion');
    }, delay);

    return () => clearTimeout(timeout);
  }, [state]);

  const handleClick = (value) => {
    
    setIsDisable(true);
    
    if(state[inputName].length<=4){
      setState({
        ...state,
        [inputName]: state[inputName] + value
      });
    }
  }

  const handleFocus = ({target}) => {
    setInputName(target.name);
  }

  // Resta al deposito el valor de cada reseteo del teclado
  const restarDeposito = () =>{
    let total = 0;

    switch(inputName){
      case 'cien':
        total = (100 * state[inputName]);
        break;
      case 'dosciento':
        total = (200 * state[inputName]);
        break;
      case 'quiniento':
        total = (500 * state[inputName]);
        break;
      case 'mil':
        total = (1000 * state[inputName]);
        break;
      default:
        total = 0;
    }
    
    setMontoTotal(montoTotal - total);
    
  }

  const resetValue = () => {

    setState(state =>({
      ...state,
      [inputName] : state[inputName].slice(0, -1)
    }));
    restarDeposito();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(montoTotal > 0){
      if(cookie.get('token')) cookie.remove('token');
      const resto = Number(user.saldo) + Number(montoTotal);
      user.saldo = resto.toString();
      user.valor = Number(montoTotal).toString();
      user.tipo = "Depósito";
      cookie.set('token', JSON.stringify(user));
      // console.log(cookie.get('token'));
      router.push('./exito');
    }

  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} spacing={10}>
      <Box border={1} className={classes.box}>
        <Typography variant="h6" align="center" gutterBottom>
              Depósito
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <div className={classes.content}>
              <div className={classes.column}>
                <Typography 
                    variant="caption" 
                    display="block"
                    align="center" 
                    gutterBottom
                    spacing={2}
                    className={classes.caption}
                    >
                      PESOS
                </Typography>
                <Typography 
                    variant="caption" 
                    display="block"
                    align="right" 
                    gutterBottom
                    spacing={2}
                    className={classes.caption}
                    >
                      CANTIDAD
                </Typography>
              </div>
              
              <div className={classes.column}>
                <Typography 
                  variant="button" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={3}
                  className={classes.caption}
                  >
                    $100&nbsp;&nbsp;
                </Typography>
                <TextField 
                  id="cien" 
                  align="right" 
                  name="cien"
                  variant="filled" 
                  onFocus={handleFocus}
                  InputProps={{
                    readOnly: true,
                    autoFocus: false,
                    inputMode: 'numeric'
                  }}
                  value={Number(state.cien)}
                  size="small"
                  className={classes.text}
                />
              </div>
              
              <div className={classes.column}>
                <Typography 
                  variant="button" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  className={classes.caption}
                  >
                    $200&nbsp;&nbsp;
                </Typography>
                <TextField 
                  id="dosciento" 
                  align="center" 
                  placeholder=""
                  name="dosciento"
                  type="number" 
                  variant="filled"
                  onFocus={handleFocus}
                  InputProps={{
                    readOnly: true,
                    inputMode: 'numeric'
                  }}
                  value={Number(state.dosciento)}
                  className={classes.text}
                  size="small"
                />
              </div>
              
              <div className={classes.column}>
                <Typography 
                  variant="button" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  className={classes.caption}
                  >
                    $500&nbsp;&nbsp;
                </Typography>
                <TextField 
                  id="quiniento" 
                  align="center" 
                  placeholder=""
                  name="quiniento"
                  type="number" 
                  variant="filled"
                  onFocus={handleFocus}
                  InputProps={{
                    readOnly: true,
                    inputMode: 'numeric'
                  }}
                  value={Number(state.quiniento)}
                  className={classes.text}
                  size="small"
                />
              </div>
              
              <div className={classes.column}>
                <Typography 
                  variant="button" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  className={classes.caption}
                  >
                    $1000
                </Typography>
                <TextField 
                  id="mil" 
                  align="center" 
                  placeholder=""
                  name="mil"
                  type="number" 
                  variant="filled"
                  onFocus={handleFocus}
                  InputProps={{
                    readOnly: true,
                    inputMode: 'numeric'
                  }}
                  value={Number(state.mil)}
                  size="small"
                  className={classes.text}
                />
              </div>
            
            <Button
              onClick={handleOpen}
              id="cancelar" 
              variant="contained" 
              color="secondary"
              size="small"
              //disabled={!props.handleVisible}
            >
              Cancelar
            </Button>
          </div>
          <div className={classes.content}>
            <Typography variant="subtitle2" align="center" className={classes.variant} gutterBottom>
                MONTO A DEPOSITAR<br/>
                {handleCurrency(montoTotal)}
            </Typography>
            <Teclado 
              handleClick={handleClick} 
              resetValue={resetValue} 
              handleVisible={isDisable}
            />
          </div>
        </form>
      </Box>

      <ModalConfirmar 
        open={open}
        handleClose={handleClose}
      />
    </div>  
  );
}