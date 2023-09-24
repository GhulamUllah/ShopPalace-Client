import { Box, Button, Paper, TextField, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { addtocart } from '../../Redux/Action/CartAction';
import { paginate_Product } from '../../Redux/Action/ProductAction';

export default function Pagination() {
    const productlist = useSelector(state => state.Product.paginate.data)
    let pageArray = useSelector(state=>state.Product.paginate.totalPages)
    
   
 
   
    const searchlist = useSelector(state => state.Product.search)
    const [page,setpage] = useState(1)
    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch(paginate_Product({page:page}))
    },[page,dispatch])
    const theme = createTheme()

    return (
        <>
           
            <Box >
            <Typography variant='h4' sx={{color:'success.main',fontWeight:700,textDecoration:'underline',my:2,textAlign:'center'}}>Paginate Products</Typography>

            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,280px))', gap: 2, p: 2,boxShadow:theme.shadows[5],m:2,justifyContent:'center',overflowX:'auto' }}>
                {
                    productlist && productlist.map((item) => <Paper elevation={3} sx={{ p: 1, overflow: 'hidden', position: 'relative' }}>
                        <Box sx={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                            <img src={item.image} alt='No internet' style={{ height: '100%' }} />
                        </Box>
                        <Box>
                            <Typography><b>Title: </b>{item.name}</Typography>
                            <Typography><b>Description: </b>{item.description}</Typography>
                            <Typography><b>Category: </b>{item.category}</Typography>
                        </Box>
                        <Box>
                            <Button variant='outlined' endIcon={<AddShoppingCartIcon />} onClick={() => dispatch(addtocart(item._id))}>Add</Button>
                        </Box>



                        <Box sx={{ bgcolor: 'primary.light', borderRadius: '2px', position: 'absolute', top: '8px', right: '8px', display: 'flex' }}>
                            <Typography variant='h7' color='#fff' sx={{ p: .5 }}>Discount: {item.discount}</Typography>
                        </Box>
                        <Box sx={{ borderRadius: '2px', position: 'absolute', bottom: '8px', right: '8px', display: 'flex' }}>
                            <Typography variant='h7' fontWeight={700} color={'primary.main'}>Price: {item.price} PKR</Typography>
                        </Box>
                    </Paper>)
                }
            </Box>
            <Paper elevation={2} sx={{display:'flex',justifyContent:'center',gap:2,py:2,mx:2,overflowX:'auto'}}>
                <ChevronLeftIcon sx={{fontSize:'2.5rem',color:'success.light',cursor:'pointer'}} onClick={()=>setpage(page > 1 ? page - 1 : page)}/>
                {
                    pageArray?.length > 0 ? pageArray.map((item) => <Button variant={item === page ? 'contained' : 'outlined'} onClick={()=>setpage(item)}>{item}</Button>): <Button variant='contained'>1</Button>
                }
                <ChevronRightIcon sx={{fontSize:'2.5rem',color:'success.main',cursor:'pointer'}} onClick={()=>setpage(pageArray.length > page ? page + 1 : page)}/>
            </Paper>
        </>
    )
}
