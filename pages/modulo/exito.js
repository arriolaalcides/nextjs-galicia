import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useRouter } from 'next/router';
import cookie from 'js-cookie';

import {handleCurrency} from './functions/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button:{
    marginLeft: 185,
  },
  box:{
    width: '75%',
    padding: 30,
    margin:10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  span:{
    display:'flex',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop:15
  }
}));

export default function Saldo() {

  const classes = useStyles();
  const router = useRouter();
  const delay = 10000;

  useEffect(() => { console.log('useEffectExito');
    const timeout = setTimeout(() => {
      router.push('/');
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const user = (cookie.get('token'))?JSON.parse(cookie.get('token')):{};
  
  return (
    <div className={classes.root}>
      <Box border={1} className={classes.box}>
        <Typography variant="h4" align="center" gutterBottom spacing={5}>
          Su {user.tipo} de monto {handleCurrency(user.valor)},<br/>
          en la cuenta N°{user.dni},<br/>
          fue realizado con éxito.
        </Typography>
      </Box>
    </div>
  )
}