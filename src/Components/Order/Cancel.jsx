import { Box, Button, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createorder, updatepayment } from '../../Redux/Action/OrderAction'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Cancel() {
    const ord = useSelector(state => state.Order.userorders)
    const order = ord[ord?.length - 1]

    const dispatch = useDispatch()
    const navigate = useNavigate()
   

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant='h5' sx={{ color: 'error.light', fontWeight: 600, textAlign: 'center', textDecoration: 'underline dotted #467540' }}>Order Cancelled</Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Key</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>{order?._id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Products Ordered</TableCell>
                            <TableCell>{order?.product?.length}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>{order?.totalAmount} PKR</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total Discount</TableCell>
                            <TableCell>{order?.totalDiscount} PKR</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>{order?.isPaid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Delivery Status</TableCell>
                            <TableCell>{order?.deliveryStatus}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <Button variant='contained' endIcon={<ArrowBack />} onClick={() => navigate('/product')} sx={{ my: 2, display: 'flex', mx: 'auto' }}>Shopping</Button>
            </Paper>
        </Box>
    )
}
