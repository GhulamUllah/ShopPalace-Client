import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link } from '@mui/material'
import { reset_password, reset_password_otp, user_login } from '../../Redux/Action/AuthAction'

export default function GetForgetOTP({ isforgetotp, setisforgetotp,isforget, setisforget }) {
    const alert = useSelector(state=>state.Alert?.alert[0]?.message)

    const theme = createTheme()
    const [otp, setotp] = useState()
    const [email, setemail] = useState()
    const [newpassword, setnewpassword] = useState()
    const dispatch = useDispatch()
    setisforget(alert === 'Password Reset Successfully' ? false : true)

    return (
        <Dialog open={isforgetotp} fullWidth>
            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Enter Your OTP</Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                    <TextField
                        placeholder='Your OTP Here'

                        onChange={(e) => setotp(e.target.value)}
                    />
                    <TextField
                        placeholder='Your Email'
                        type='email'
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <TextField
                        placeholder='Your New Password'
                        type='password'
                        onChange={(e) => setnewpassword(e.target.value)}
                    />


                </Box>

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => { setisforgetotp(false) }}>Cancel</Button>
                <Button variant='contained' onClick={() => { dispatch(reset_password_otp({ otp,email,newpassword }))}}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
