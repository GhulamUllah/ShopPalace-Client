import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { user_signup } from '../../Redux/Action/AuthAction'

export default function Signup({ issignup, setissignup, setislogin }) {
    const alert = useSelector(state=>state.Alert?.alert[0]?.message)
    
   

    const theme = createTheme()
    const [first_name, setfirst_name] = useState()
    const [last_name, setlast_name] = useState()
    const [age, setage] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(alert === 'Signed up Successfully' || alert === 'Email Already Exists, Please Login'){
            setislogin(true)
            setissignup(false)
        }
    },[alert])
    return (
        <Dialog open={issignup} fullWidth>
            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Signup Form</Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                        <TextField
                            placeholder='First name'

                            onChange={(e) => setfirst_name(e.target.value)}
                        />

                        <TextField
                            placeholder='Last name'

                            onChange={(e) => setlast_name(e.target.value)}
                        />
                    </Box>
                    <TextField
                        placeholder='Age'
                        type='number'
                        sx={{ width: '90%' }}
                        onChange={(e) => setage(e.target.value)}
                    />
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
                    <Link sx={{ cursor: 'pointer', mt: 1 }} onClick={() => { setislogin(true); setissignup(false) }}>Already user?</Link>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setissignup(false)}>Cancel</Button>
                <Button variant='contained' disabled={!email || !password || !age || !first_name || !last_name} onClick={() => { dispatch(user_signup({ first_name, last_name, age, email, password })) }}>Sign Up</Button>
            </DialogActions>
        </Dialog>
    )
}
