import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link } from '@mui/material'
import { change_password, update_user } from '../../Redux/Action/AuthAction'

export default function ChangePassword({ isChangePassword, setisChangePassword }) {
    const theme = createTheme()
    const [oldpassword, setoldpassword] = useState()
    const [newpassword, setnewpassword] = useState()
    const dispatch = useDispatch()





    return (
        <Dialog open={isChangePassword} fullWidth>

            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Change Password</Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                    <TextField
                        placeholder='Current Password'

                        onChange={(e) => setoldpassword(e.target.value)}
                    />
                    <TextField
                        placeholder='New Password'

                        onChange={(e) => setnewpassword(e.target.value)}
                    />


                </Box>

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => { setisChangePassword(false) }}>Cancel</Button>
                <Button variant='contained' onClick={() => { dispatch(change_password({ oldpassword, newpassword })); setisChangePassword(false) }}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}
