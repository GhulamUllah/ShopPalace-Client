import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link } from '@mui/material'
import { update_user } from '../../Redux/Action/AuthAction'

export default function EditProfile({ isEditProfile, setisEditProfile }) {
    const theme = createTheme()
    const [first_name, setfirst_name] = useState()
    const [last_name, setlast_name] = useState()
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)


    useEffect(() => {
        setfirst_name(user.first_name)
        setlast_name(user.last_name)
    }, [])

    return (
        <Dialog open={isEditProfile} fullWidth>

            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Edit Profile</Typography>
            </DialogTitle>
            <DialogContent>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                    <TextField
                        value={first_name ? first_name : ''}

                        onChange={(e) => setfirst_name(e.target.value)}
                    />
                    <TextField
                        value={last_name ? last_name : ''}

                        onChange={(e) => setlast_name(e.target.value)}
                    />


                </Box>

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => { setisEditProfile(false) }}>Cancel</Button>
                <Button variant='contained' onClick={() => { dispatch(update_user({ first_name, last_name })); setisEditProfile(false) }}>Change</Button>
            </DialogActions>
        </Dialog>
    )
}
