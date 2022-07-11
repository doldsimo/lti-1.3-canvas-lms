import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  logodiv: {
    marginBottom: theme.spacing(8),
    backgroundColor: 'transparent '
  },
  logo: {
    cursor: 'pointer'
  },
  logo1: {
    cursor: 'pointer',
    margin: 'auto',
    '@media (max-height: 700px)': {
      maxWidth: '80%'
    }
  },
  slider: {
    backgroundColor: '#013b6c'
  },
  sliderstyle: {
    marginTop: theme.spacing(3)
  },
  margin: {
    marginTop: theme.spacing(4),
    backgroundColor: '#013b6c'
  },
  table: {
    marginTop: theme.spacing(4)
  },
  home: {
    backgroundColor: '#013b6c',
    position: 'fixed',
    bottom: '1vh',
    left: '1vh'
  },
  maindiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}))

export default function App () {
  const classes = useStyles()

  const ltijs = async () => {
    const win = window.open('https://cvmcosta.me/ltijs', '_blank')
    win.focus()
  }

  return (
    <Container className={classes.maindiv} component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>

        <Grid container className={classes.logo}>
          <Grid item xs className={classes.logo1 + ' blank'}>
            <Image
              className={classes.logo}
              src='https://raw.githubusercontent.com/Cvmcosta/ltijs/master/docs/logo-300.svg'
              onClick={ltijs}
              disableSpinner
            />
          </Grid>
        </Grid>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  )
}
