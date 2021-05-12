import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <Grid item xs={10} sm container spacing={0}>
              <Grid item xs={5}>
                <Typography 
                  variant="caption" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  >
                    PESOS
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography 
                  variant="caption" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  >
                    CANTIDAD
                </Typography>
              </Grid>
              
              <Grid item xs={5}>
                <Typography 
                  variant="button" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  >
                    $100
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField 
                  id="cien" 
                  align="center" 
                  placeholder="" 
                  name="cien"
                  variant="filled" 
                  onFocus={handleFocus}
                  InputProps={{
                    readOnly: true,
                    autoFocus: false,
                    inputMode: 'numeric'
                  }}
                  value={state.cien}
                  size="small"
                />
              </Grid>

              <Grid item xs={5}>
                <Typography 
                  variant="button" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  >
                    $200
                </Typography>
              </Grid>
              <Grid item xs={5}>
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
                  value={state.dosciento}
                />
              </Grid>

              <Grid item xs={5}>
                <Typography 
                  variant="button" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  >
                    $500
                </Typography>
              </Grid>
              <Grid item xs={5}>
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
                  value={state.quiniento}
                />
              </Grid>

              <Grid item xs={5}>
                <Typography 
                  variant="button" 
                  display="block"
                  align="center" 
                  gutterBottom
                  spacing={2}
                  >
                    $1000
                </Typography>
              </Grid>
              <Grid item xs={5}>
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
                  value={state.mil}
                />
              </Grid>
            </Grid>
    </div>
  )
}
