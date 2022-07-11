import React, { useState, useEffect } from 'react'
import {
  Link
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import MUIDataTable from 'mui-datatables'
import HomeIcon from '@material-ui/icons/Home'
import Fab from '@material-ui/core/Fab'
import ky from 'ky'

import { useSnackbar } from 'notistack'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  fab: {
    marginTop: theme.spacing(4)
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'center'
  },
  logodiv: {
    marginBottom: theme.spacing(8),
    backgroundColor: 'transparent '
  },
  logo: {
    cursor: 'pointer'
  },
  margin: {
    marginTop: theme.spacing(4),
    backgroundColor: '#013b6c'
  },
  table: {
    marginTop: '10%'
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
  const [dataset, setDataset] = useState()

  const getLtik = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const ltik = searchParams.get('ltik')
    if (!ltik) throw new Error('Missing lti key.')
    return ltik
  }

  const errorPrompt = async (message) => {
    enqueueSnackbar(message, { variant: 'error' })
  }

  // Retrieves resource dataset
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await ky.get('/members', { credentials: 'include', headers: { Authorization: 'Bearer ' + getLtik() } }).json()
        console.log(members)
        setDataset(members)
      } catch (err) {
        console.log(err)
        errorPrompt('Failed retrieving members! ' + err)
      }
    }
    fetchMembers()
  }, [])

  // Configuring data table
  const columns = [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'roles',
      label: 'Role'
    }
  ]

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    disableToolbarSelect: true,
    download: false,
    print: false,
    searchOpen: false,
    viewColumns: false,
    filter: false,
    selectableRowsOnClick: false,
    rowsPerPage: 5,
    responsive: 'scrollFullHeight'
  }

  return (
    <Container component='main' maxWidth='lg'>
      <CssBaseline />
      <div style={{ display: "flex" }}>
        <Typography variant='h3' style={{ display: "flex", margin: "auto" }}>Names and Roles</Typography>
      </div>
      <div className={classes.paper}>
        <Grid container>
          <Grid item xs={12} className={classes.table}>
            <MUIDataTable
              title='Members:'
              data={dataset}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
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
