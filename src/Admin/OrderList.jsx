import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, CircularProgress, Divider, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutline, Edit } from '@mui/icons-material'

import { deleteorder, getallorders, updateorder } from '../Redux/Action/OrderAction'
import { useNavigate } from 'react-router-dom'
export default function OrderList() {
    const dispatch = useDispatch()
    const productlist = useSelector(state => state.Order.allorders)
    const userorder = useSelector(state => state.Order.userorders)
    const usertype = useSelector(state => state.Auth.user?.user_type)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getallorders())
    }, [dispatch])

    useEffect(() => {
        if (!usertype) navigate('/')
    }, [])

    return (
        <>


            <Box>

                <Paper elevation={2} sx={{ width: '90%', mx: 'auto', my: 2, overflowX: 'auto', p: 2 }}>
                    <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 700, textAlign: 'center', my: 2 }}>Order List</Typography>
                    <Divider />
                    <Divider />

                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Ordered Products</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Delivery</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>



                            {
                                (usertype === 'admin' ? (productlist && productlist) : (userorder && userorder))?.map((order) => <TableRow>
                                    <TableCell >{order.product.length}</TableCell>
                                    <TableCell >{order.totalAmount}</TableCell>
                                    <TableCell >{order.isPaid}</TableCell>
                                    <TableCell >{order.createdBy.first_name} {order.createdBy.last_name}</TableCell>
                                    <TableCell ><Tooltip title={order.deliveryStatus === 'delivered' ? 'Delivered' : 'Pendding'}><FormControlLabel checked={order.deliveryStatus === 'delivered' ? true : false} control={<Switch checked={order.deliveryStatus === 'delivered' ? true : false} disabled={order.deliveryStatus === 'delivered' ? true : false} onClick={() => dispatch(updateorder(order._id))} />} label={order.deliveryStatus} /></Tooltip></TableCell>
                                    <TableCell ><DeleteOutline sx={{ color: 'error.main', cursor: 'pointer' }} onClick={() => dispatch(deleteorder(order._id))} /></TableCell>
                                </TableRow>)
                            }


                        </TableBody>
                    </Table>

                </Paper>

            </Box>
        </>
    )
}
