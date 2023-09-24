import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link } from '@mui/material'
import { reset_password, user_login } from '../../Redux/Action/AuthAction'
import GetForgetOTP from './GetForgetOTP'

export default function Forget({ islogin, setislogin, setissignup, isforget, setisforget }) {
    const alert = useSelector(state=>state.Alert?.alert[0]?.message)
    
    const theme = createTheme()
    const [email, setemail] = useState()
    const [isforgetotp, setisforgetotp] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(alert === 'Email Sent Successfully') setisforgetotp( true )

    },[alert])
    return (
        <Dialog open={isforget} fullWidth>
            {
                isforgetotp && <GetForgetOTP isforgetotp={isforgetotp} setisforgetotp={setisforgetotp} isforget={isforget} setisforget={setisforget}/>
            }
            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Forget You Password Don't Worry</Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                    <TextField
                        placeholder='Email'

                        onChange={(e) => setemail(e.target.value)}
                    />


                </Box>

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => { setisforget(false) }}>Cancel</Button>
                <Button variant='contained' onClick={() => { dispatch(reset_password({ email })) }}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
