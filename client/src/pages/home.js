import React, { useState, useEffect } from 'react'
import {
  Link
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Fab from '@material-ui/core/Fab'
import GradeIcon from '@material-ui/icons/Grade'
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import 'animate.css'
import ky from 'ky'

import { useSnackbar } from 'notistack'
import Quiz from '../components/Quiz'

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
  slider: {
    backgroundColor: '#013b6c'
  },
  sliderstyle: {
    marginTop: theme.spacing(3)
  },
  margin: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    backgroundColor: '#013b6c'
  },
  table1: {
    marginBottom: theme.spacing(4)
  },
  table2: {
    marginTop: theme.spacing(4)
  }
}))

export default function Home() {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [info, setInfo] = useState()

  const errorPrompt = async (message) => {
    enqueueSnackbar(message, { variant: 'error' })
  }

  const getLtik = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const ltik = searchParams.get('ltik')
    if (!ltik) throw new Error('Missing lti key.')
    return ltik
  }

  useEffect(() => {
    const getInfo = async () => {
      try {
        const launchInfo = await ky.get('/info', { credentials: 'include', headers: { Authorization: 'Bearer ' + getLtik() } }).json()
        setInfo(launchInfo)
      } catch (err) {
        console.log(err)
        errorPrompt('Failed trying to retrieve custom parameters! ' + err)
      }
    }
    getInfo()
  }, [])

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant='h3'>Java Programming Quiz</Typography>

        <Quiz />
        
        <Typography variant='body1'>Other Services from LTI:</Typography>
        <Grid item xs >
          <Tooltip title='Grades Service' aria-label='grades'>
            <Link to={{
              pathname: '/grades',
              search: document.location.search
            }}>
              <Fab color='primary' aria-label='add' className={classes.margin}>
                <GradeIcon />
              </Fab>
            </Link>
          </Tooltip>
          <Tooltip title='Student Informations' aria-label='informations'>
            <Link to={{
              pathname: '/informations',
              search: document.location.search
            }}>
              <Fab color='primary' aria-label='add' className={classes.margin}>
                <InfoIcon />
              </Fab>
            </Link>
          </Tooltip>
          <Tooltip title='Names and Roles Service' aria-label='namesandroles'>
            <Link to={{
              pathname: '/namesandroles',
              search: document.location.search
            }}>
              <Fab color='primary' aria-label='add' className={classes.margin}>
                <PersonIcon />
              </Fab>
            </Link>
          </Tooltip>
        </Grid>
      </div>
    </Container>
  )
}
