import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Modal from '@material-ui/core/Modal';

import { useRouter } from 'next/router';

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

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = (props) => {
  const top = 60;
  const left = 60;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SaldoInsuficiente(props) {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const router = useRouter();

  const handleClick = (url) =>{
    //props.setOpenSaldo(false);
    router.push('./'+url);
  }

  return(
      <div>
          <Modal
            open={props.openSaldo}
            onClose={() => props.handleCloseSaldo()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.modal}>
              <h3 id="simple-modal-title">Su saldo es insuficiente. Puede consultar su saldo, probar con otro monto o cancelar la operación.</h3>
              <Container className={classes.span}>
                <Button
                  value="cancelar"
                  variant="contained"
                  color="secondary"
                  className={classes.buttonCancel}
                  size="medium"
                  onClick={() => handleClick('cancelacion')}
                >
                  Cancelar
                </Button>
                <Button
                  id="saldo"
                  variant="contained"
                  color="secondary"
                  className={classes.buttonCancel}
                  size="medium"
                  onClick={() => handleClick('saldo')}
                >
                  Consultar saldo
                </Button>
                <Button
                  id="otromonto"
                  variant="contained"
                  color="secondary"
                  className={classes.buttonCancel}
                  size="medium"
                  onClick={() => handleClick('otromonto')}
                >
                  Otro monto
                </Button>
              </Container>
            </div>
          </Modal>
      </div>
  )
}