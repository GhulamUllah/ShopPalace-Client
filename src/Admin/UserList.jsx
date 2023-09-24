import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, CircularProgress, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutline, Edit } from '@mui/icons-material'

import { allusers, delete_user } from '../Redux/Action/AuthAction'
import { useNavigate } from 'react-router-dom'
export default function UserList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector(state => state.Auth.isAuthenticated)
    const userlist = useSelector(state => state.Auth.userlist)

    useEffect(() => {
        dispatch(allusers())
    }, [])

    useEffect(() => {
        if (!auth) navigate('/')
    }, [auth])

    return (
        <>


            <Box >

                <Paper elevation={2} sx={{ width: '90%', mx: 'auto', mt: 2, overflowX: 'auto', p: 2 }}>
                    <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 700, textAlign: 'center', my: 2 }}>User List</Typography>
                    <Divider />
                    <Divider />

                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>



                            {
                                userlist && userlist.map((user) => <TableRow>
                                    <TableCell >{user.first_name} {user.last_name}</TableCell>
                                    <TableCell >{user.balance} PKR</TableCell>
                                    <TableCell >{user.user_type}</TableCell>
                                    <TableCell ><DeleteOutline sx={{ color: 'error.main', cursor: 'pointer' }} onClick={() => dispatch(delete_user(user._id))} /></TableCell>
                                </TableRow>)
                            }


                        </TableBody>
                    </Table>

                </Paper>

            </Box>
        </>
    )
}
