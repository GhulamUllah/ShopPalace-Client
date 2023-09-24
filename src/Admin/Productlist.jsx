import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, CircularProgress, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutline, Edit } from '@mui/icons-material'

import { allusers, delete_user } from '../Redux/Action/AuthAction'
import { deleteproduct, getsingleproduct } from '../Redux/Action/ProductAction'
import EditProduct from './EditProduct'
import { useNavigate } from 'react-router-dom'
export default function ProductList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector(state => state.Auth.isAuthenticated)
    const productlist = useSelector(state => state.Product.allproducts)
    const [isEdit, setisEdit] = useState(false)
    useEffect(() => {
        dispatch(allusers())
    }, [])

    useEffect(() => {
        if (!auth) navigate('/')
    }, [auth])

    return (
        <>
            {
                isEdit && <EditProduct isEdit={isEdit} setisEdit={setisEdit} />
            }

            <Box >

                <Paper elevation={2} sx={{ width: '90%', mx: 'auto', mt: 2, overflowX: 'auto', p: 2 }}>
                    <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 700, textAlign: 'center', my: 2 }}>Product List</Typography>
                    <Divider />
                    <Divider />

                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>



                            {
                                productlist && productlist.map((product) => <TableRow>
                                    <TableCell >{product.name}</TableCell>
                                    <TableCell >{product.price}</TableCell>
                                    <TableCell >{product.stock}</TableCell>
                                    <TableCell ><Edit sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => { dispatch(getsingleproduct(product._id)); setisEdit(true) }} /></TableCell>
                                    <TableCell ><DeleteOutline sx={{ color: 'error.main', cursor: 'pointer' }} onClick={() => dispatch(deleteproduct(product._id))} /></TableCell>
                                </TableRow>)
                            }


                        </TableBody>
                    </Table>

                </Paper>

            </Box>
        </>
    )
}
