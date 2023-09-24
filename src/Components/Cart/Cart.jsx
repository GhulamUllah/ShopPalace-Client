import { ArrowForward, DeleteForever } from '@mui/icons-material'
import { Box, Button, Input, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dectocart, delfromcart, inctocart, payment } from '../../Redux/Action/CartAction'
import { createorder } from '../../Redux/Action/OrderAction'

export default function Cart() {
    let cartlist = useSelector(state => state.Cart.cart)
    let auth = useSelector(state => state.Auth.isAuthenticated)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let subtotal = 0
    let discount = 0
    let shipping = 0
    for (let index = 0; index < cartlist?.length; index++) {
        const element = cartlist[index];
        subtotal += Math.round(element.product.price * element.quantity)
        discount += Math.round(element.product.discount * element.quantity)
        shipping += Math.round(element.product.price * .1 * element.quantity)

    }
    const handlePayment = async () => {
        const order = await dispatch(createorder({ productlist: cartlist, totalDiscount: discount, totalAmount: subtotal + shipping - discount }))
        navigate('/stripe-checkout')

    }

    useEffect(() => {
        if (!auth) navigate('/')
    }, [auth])

    return (
        <>
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                <Typography variant='h5' fontWeight={700} color={'primary.main'} textAlign={'center'} mb={1}>PoshPalace.com</Typography>
                <Paper elevation={2} sx={{ overflowX: 'auto' }}>
                    <Typography variant='h5' fontWeight={600} color={'secondary.main'} textAlign={'center'}>Cart Summary</Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TableRow><TableCell>Subtotal</TableCell></TableRow>
                                    <TableRow><TableCell>Shipping</TableCell></TableRow>
                                    <TableRow><TableCell>Discount</TableCell></TableRow>
                                    <TableRow><TableCell>Total</TableCell></TableRow>
                                </TableCell>
                                <TableCell>
                                    <TableRow><TableCell>{subtotal} PKR</TableCell></TableRow>
                                    <TableRow><TableCell>{shipping} PKR</TableCell></TableRow>
                                    <TableRow><TableCell>{discount} PKR</TableCell></TableRow>
                                    <TableRow><TableCell>{subtotal + shipping - discount} PKR</TableCell></TableRow>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button variant='contained' sx={{ display: 'flex', my: 2, mx: 'auto' }} endIcon={<ArrowForward />} onClick={handlePayment}>Checkout</Button>
                </Paper>

                <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                    <Typography variant='h5' fontWeight={600} color={'secondary.main'} textAlign={'center'} my={1}>Cart Items</Typography>

                    {
                        cartlist?.length > 0 ? cartlist.map((item) => <Paper elevation={3} sx={{ p: 2, display: 'flex', justifyContent: 'space-around' }}>
                            <Box sx={{ width: '200px' }}>
                                <img src={item.product.image} alt='loading' style={{ width: '100%' }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '400px' }}>
                                <Typography variant='h7' fontWeight={600} color={'primary.main'}><b>Title: </b>{item.product.name}</Typography>
                                <Typography variant='h7' fontWeight={600} color={'primary.main'}><b>Description: </b>{item.product.description}</Typography>
                                <Typography variant='h7' fontWeight={600} color={'primary.main'}><b>Price: </b>{item.product.price}</Typography>
                                <Typography variant='h7' fontWeight={600} color={'primary.main'}><b>Brand: </b>{item.product.brand}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ color: 'secondary.dark', fontWeight: 600, mr: 1 }}>Quantity:</Typography>
                                    <Button variant='contained' onClick={() => dispatch(dectocart(item._id))}>-</Button>
                                    <Button variant='outlined' disableTouchRipple sx={{ cursor: 'default' }}>{item.quantity}</Button>
                                    <Button variant='contained' onClick={() => dispatch(inctocart(item._id))}>+</Button>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                <Typography variant='h7' fontWeight={600} color={'primary.main'}><b>Category: </b>{item.product.category}</Typography>
                                <Typography variant='h7' fontWeight={600} color={'primary.main'}><b>Added on: </b>{item.updatedAt.slice(0, 10)}</Typography>
                                <Button variant='outlined' endIcon={<DeleteForever />} onClick={() => dispatch(delfromcart(item._id))}>Delete</Button>

                            </Box>
                        </Paper>) : <Paper elevation={3} sx={{ height: '200px', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='h4' fontWeight={700} color={'primary.dark'}>No Item in Cart Yet...!</Typography>
                            <Button variant='contained' onClick={() => navigate('/Product')}>Shop Now</Button>
                        </Paper>
                    }
                </Paper>

            </Box>




        </>
    )
}
