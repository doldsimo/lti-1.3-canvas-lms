import React, { useState } from 'react'
import {
  Link
} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Slider from '@material-ui/core/Slider'
import Input from '@material-ui/core/Input'

import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation'
import HomeIcon from '@material-ui/icons/Home'
import ky from 'ky'

import { useSnackbar } from 'notistack'

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
  }
}))

export default function App() {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [value, setValue] = useState(70)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value))
  }

  const getLtik = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const ltik = searchParams.get('ltik')
    if (!ltik) throw new Error('Missing lti key.')
    return ltik
  }

  const handleBlur = () => {
    if (value < 0) {
      setValue(0)
    } else if (value > 100) {
      setValue(100)
    }
  }

  const successPrompt = async (grade) => {
    enqueueSnackbar('Grade ' + grade + ' succesfully sent!', { variant: 'success' })
  }

  const errorPrompt = async (message) => {
    enqueueSnackbar(message, { variant: 'error' })
  }

  const submit = async e => {
    const grade = value
    try {
      e.preventDefault()
      const body = {
        grade: grade
      }

      await ky.post('/grade', { credentials: 'include', json: body, headers: { Authorization: 'Bearer ' + getLtik() } })
      successPrompt(grade)
    } catch (err) {
      console.log(err)
      errorPrompt('Failed sending grade to platform! ' + err)
    }
  }

  const ltijs = async () => {
    const win = window.open('https://cvmcosta.me/ltijs', '_blank')
    win.focus()
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>

        <Typography variant='h3'>Grading Service</Typography>

        <Typography variant='h5' gutterBottom style={{marginTop: "2em"}}>
          Select your grade:
        </Typography>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs>
            <Slider
              value={typeof value === 'number' ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby='input-slider'
              color='primary'
              classes={{ thumbColorPrimary: classes.slider, rail: classes.slider, track: classes.slider }}
              className={classes.sliderstyle}
            />
          </Grid>
          <Grid item>
            <Input
              className={classes.input}
              value={value}
              margin='none'
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider'
              }}
            />
          </Grid>
        </Grid>
        <Fab variant='extended' color='primary' aria-label='add' className={classes.margin} onClick={submit}>
          <NavigationIcon className={classes.extendedIcon} />
          Submit
        </Fab>
      </div>
      <Link
        to={{
          pathname: '/',
          search: document.location.search
        }}
      >
        <Fab color='primary' aria-label='home' className={classes.home}>
          <HomeIcon />
        </Fab>
      </Link>
    </Container>
  )
}
