import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useRouter } from 'next/router';

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
    marginLeft: 'auto',
    marginRight:'auto'
  },
  container:{
    //display:'flex',
    marginLeft: 30,
    padding:10,
    width: '50%'
  },
  box:{
    padding: 10,
  }
}));

export default function FirstPost() {
  const classes = useStyles();
  const router = useRouter();
  const delay = 5000;

  useEffect(() => { console.log('useEffect');
    const timeout = setTimeout(() => { console.log('Cancelacion');
      router.push('/');
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div className={classes.root}>
      <Box border={1} className={classes.box}>
        <Typography variant="h4" align="center" gutterBottom spacing={10}>
          La operación ha sido cancelada
        </Typography>
      </Box>
    </div>
  )
}
// Listar datos
// https://vercel.com/guides/deploying-next-and-storyblok-with-vercel