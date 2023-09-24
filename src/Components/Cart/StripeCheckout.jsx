import React, { useEffect } from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import baseurl from '../../baseurl'
import baselocalurl from '../../baselocalurl'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import { createorder } from '../../Redux/Action/OrderAction'
import { useNavigate } from 'react-router-dom'


export default function StripeCheckout() {
    let cartlist = useSelector(state => state.Cart.cart)
    let user = useSelector(state => state.Auth.user)
    const Stripe = useStripe()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let subtotal = 0
    let discount = 0
    let shipping = 0

    for (let index = 0; index < cartlist.length; index++) {
        const element = cartlist[index];
        subtotal += Math.round(element.product.price * element.quantity)
        discount += Math.round(element.product.discount * element.quantity)
        shipping += Math.round(element.product.price * .1 * element.quantity)

    }
    useEffect(() => {
        if (!user._id) navigate('/')
    }, [user])

    let payment = async () => {

        try {
            const product = await axios.post(`${baseurl}/payment/create-checkout-session`, { productlist: cartlist, email: user.email, successUrl: `${baselocalurl}/success`, cancelUrl: `${baselocalurl}/cancel`, total: subtotal + shipping - discount })
            console.log(product)
            const checkoutResult = await Stripe.redirectToCheckout({ sessionId: product.data.data })



        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        payment()
    }, [])


    return (
        <Box sx={{ height: '100vh', width: '100vw', bgcolor: 'rgba(0,0,0,.3)', zIndex: 1, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress sx={{ position: 'relative', zIndex: 2 }} /></Box>
    )
}
