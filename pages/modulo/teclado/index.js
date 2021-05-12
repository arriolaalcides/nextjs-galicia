import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 250
    },
    box:{
        padding: 30,
    },
    text:{
        fontSize: 'auto'
    }
}));

export default function MyApp(props) {
    
    /*
        USO DE FOCUS:
        https://stackoverflow.com/questions/60380747/how-to-fake-the-focus-on-a-material-ui-textfield-from-a-button-click
        https://stackoverflow.com/questions/52222988/how-to-focus-a-material-ui-textfield-on-button-click
    */

    const classes = useStyles();
    const [state, setState] = useState({result :''});
    const [clave, setClave] = useState({res :''});
    
    return(
        <Box border={1} className={classes.box}>
            <Grid item xs={12} sm container className={classes.root} spacing={2}>
            <Grid item xs={4}>
                <Button
                    onClick={() => props.handleClick(1)}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    size="medium"
                    value="1"
                >
                    1
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    onClick={() => props.handleClick(2)}
                    variant="contained" 
                    color="secondary"
                    size="medium"
                >
                    2
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    onClick={() => props.handleClick(3)} 
                    variant="contained" 
                    color="secondary"
                    size="medium"
                >
                    3
                </Button>
            </Grid>
            {/*======*/}

            <Grid item xs={4}>
                <Button
                    onClick={() => props.handleClick(4)} 
                    variant="contained" 
                    color="secondary"
                    size="medium"
                >
                    4
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button 
                    onClick={() => props.handleClick(5)}
                    variant="contained" 
                    color="secondary"
                    size="medium"
                >
                    5
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button 
                    onClick={() => props.handleClick(6)}
                    variant="contained" 
                    color="secondary"
                    size="medium"
                >
                    6
                </Button>
            </Grid>
            {/*======*/}

            <Grid item xs={4}>
                <Button
                    onClick={() => props.handleClick(7)} 
                    variant="contained" 
                    color="secondary"
                    size="medium"
                >
                    7
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    onClick={() => props.handleClick(8)} 
                    variant="contained" 
                    color="secondary"
                    size="medium"
                >
                    8
                </Button>
            </Grid>
            <Grid item xs={4}>
            <Button 
                onClick={() => props.handleClick(9)}
                variant="contained" 
                color="secondary"
                size="medium"
            >
                9
            </Button>
        </Grid>
            {/*=======*/}

            <Grid item xs={4}>
                <Button
                //onClick={resetField} 
                onClick={() => props.resetValue()}
                variant="contained" 
                color="secondary"
                size="small"
                >
                    Borrar

                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button
                    onClick={() => props.handleClick(0)} 
                    variant="contained" 
                    color="secondary"
                    size="small"
                >
                    0
                </Button>
            </Grid>
            <Grid item xs={4}>
            <Button
                id="continuar" 
                variant="contained" 
                color="secondary"
                size="small"
                disabled={!props.handleVisible}
                type="submit"
                className={classes.text}
            >
                Continuar
            </Button>
        </Grid>
    </Grid>
        </Box>
    );

}