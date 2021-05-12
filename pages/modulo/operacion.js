import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import ModalConfirmar from './modal/modalconfirmar';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color:'#080707',
    width: '70%',
  },
  button:{
    width: '25%',
    padding: theme.spacing(1),
    marginLeft: theme.spacing(10)
  },
  form:{
    display:'flex',
    padding: theme.spacing(1),
    marginLeft: 'auto',
    marginRight:'auto'
  },
  content:{
    display: 'block',
    padding:10,
    marginLeft: 100
  },
  container:{
    marginLeft: 30,
    padding:10,
    width: '50%'
  },
  box:{
    padding: 10,
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

export default function Operacion() {
  const classes = useStyles();
  const router = useRouter();
  
  const [open, setOpen] = useState(false);
  const delay = 60000;

  //console.log(cookie.get('token'));
  const user = JSON.parse(cookie.get('token'))||{};
  //console.log(user);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('./cancelacion');
    }, delay);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    
    <div className={classes.root} >
      <Grid container spacing={3}>
        <Grid item xs={9} className={classes.container}>
          <Box border={1} className={classes.box}>
              <Typography variant="h4" align="center" gutterBottom spacing={5}>
                Bienvenido {user.nombre}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom spacing={5}>
                ¿Qué operación deseas realizar?
              </Typography>
              <Container className={classes.content}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  size="small"
                  onClick={() => router.push('./extraccion')}
                >
                  Extracción
                </Button>
                <Button
                  onClick={() => router.push('./deposito')}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  size="small"
                >
                  Depósito
                </Button>
              </Container>
              
              <Button
                  onClick={() => router.push('./saldo')}
                  variant="contained"
                  color="primary"
                  className={classes.form}
                  size="small"
                >
                  Consulta de Saldo
                </Button>
                <br/><br/>
              <Button
                onClick={handleOpen}
                variant="contained"
                color="secondary"
                className={classes.button}
                size="small"
            >
              Cancelar
            </Button>
          </Box>
        </Grid>
      </Grid>

      <ModalConfirmar 
        open={open}
        handleClose={handleClose}
      />
    </div>
  )
}