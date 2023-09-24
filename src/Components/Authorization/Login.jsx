import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link } from '@mui/material'
import { user_login } from '../../Redux/Action/AuthAction'
import Forget from './Forget'
import { useNavigate } from 'react-router-dom'

export default function Login({ islogin, setislogin, setissignup }) {
    const alert = useSelector(state=>state.Alert?.alert[0]?.message)

    const theme = createTheme()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [isforget, setisforget] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(()=>{
        if(alert === 'Logged in Successfully'){
    setislogin(false)
    navigate('/Dashboard')

        }
    },[alert])

    return (
        <Dialog open={islogin} fullWidth>
            {isforget && <Forget setisforget={setisforget} isforget={isforget} islogin={islogin} setislogin={setislogin} />}
            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Login Form</Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                    <TextField
                        placeholder='Email'
                        type='email'
                        sx={{ width: '90%' }}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <TextField
                        placeholder='Password'
                        type='password'
                        sx={{ width: '90%' }}
                        onChange={(e) => setpassword(e.target.value)}
                    />

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%', mt: 1 }}>
                    <Link sx={{ cursor: 'pointer' }} onClick={() => { setisforget(true) }}>Forget Password?</Link>
                    <Link sx={{ cursor: 'pointer' }} onClick={() => { setislogin(false); setissignup(true) }}>No Account?</Link>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setislogin(false)}>Cancel</Button>
                <Button variant='contained' onClick={() => { dispatch(user_login({ email, password })) }}>Login</Button>
            </DialogActions>
        </Dialog>
    )
}
