import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link } from '@mui/material'
import { become_seller_otp} from '../../Redux/Action/AuthAction'

export default function GetSellerOTP({ isSeller, setisSeller }) {
    const alert = useSelector(state=>state.Alert?.alert[0]?.message)
    setisSeller(alert === 'User Details Updated' ? false : true)

    const theme = createTheme()
    const [otp, setotp] = useState()
    const dispatch = useDispatch()

    return (
        <Dialog open={isSeller} fullWidth>
            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Check Your mailBox and Enter OTP</Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                    <TextField
                        placeholder='Your OTP Here'

                        onChange={(e) => setotp(e.target.value)}
                    />


                </Box>

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => { setisSeller(false) }}>Cancel</Button>
                <Button variant='contained' onClick={() => dispatch(become_seller_otp({ otp: otp }))}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
