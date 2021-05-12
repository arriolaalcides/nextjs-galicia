import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import {handleCurrency} from './functions/';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

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
  const delay = 15000;

  const user = (cookie.get('token'))?JSON.parse(cookie.get('token')):{};
  console.log(user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      //router.push('/');
      router.push('/');
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={classes.root}>
      <Box border={1} className={classes.box}>
        <Typography variant="h4" align="center" gutterBottom spacing={5}>
          Su saldo es
        </Typography>
        <Typography variant="h2" align="center" gutterBottom spacing={5}>
          {handleCurrency(user.saldo)}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom spacing={5}>
          ¿Desea realizar otra operación?
        </Typography>
          <Container className={classes.span}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => router.push('./operacion')}
            >
            Si
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => router.push('./cancelacion')}
            >
            No
            </Button>
          </Container>
      </Box>
    </div>
  )
}