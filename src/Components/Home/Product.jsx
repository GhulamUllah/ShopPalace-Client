import { Box, Button, Input, ListItem, Paper, TextField, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux'
import { search_Product, sort_Product } from '../../Redux/Action/ProductAction';
import { addtocart } from '../../Redux/Action/CartAction';
import { ArrowDownward } from '@mui/icons-material';
import Login from '../Authorization/Login';

export default function Product() {
    const theme = createTheme()
    const productlist = useSelector(state => state.Product.allproducts)
    const searchlist = useSelector(state => state.Product.search)
    const auth = useSelector(state => state.Auth.isAuthenticated)
    const sortlist = useSelector(state => state.Product.sort)
    const [search, setsearch] = useState()
    const [sort, setSort] = useState(false)
    const [islogin, setislogin] = useState(false)
    const dispatch = useDispatch()
    const handleSearch = () => {
        dispatch(search_Product({ search: search }))
    }
    const handleSort = async(item) =>{
        const res = await dispatch(sort_Product({sort:item}))
       setSort(false)
       
    }
    console.log(auth)
    return (
        <>
        {
            islogin && <Login islogin={islogin} setislogin={setislogin}/>
        }
            <Box sx={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Box sx={{ position: 'relative', m: 2, p: 2, display: 'flex', gap: 2, justifyContent: 'center' }} className='SeachClass'>
                <TextField placeholder='Search' onChange={(e) => setsearch(e.target.value)} />
                <Button variant='contained' endIcon={<SearchIcon />} onClick={handleSearch}>Search</Button>

            </Box>
            <Box sx={{position:'relative'}}>
                <Button variant='outlined' endIcon={<ArrowDownward/>} onClick={()=>setSort(!sort)}>Sort</Button>
                <Box sx={{display:sort ? 'block' : 'none',position:'absolute',zIndex:'tooltip',bgcolor:'lightgray',width:'100%'}}>
                    {
                        ['ABC','CBA','123','321'].map((item)=><ListItem sx={{color:'primary.dark',borderBottom:'1px solid gray',width:'100%','&:hover':{bgcolor:'lightblue'}}} onClick={()=>handleSort(item)}>
                            {item}
                        </ListItem>)
                    }

                </Box>
            </Box>
            </Box>
            {
                (searchlist && searchlist?.length > 0) && <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 600, m: 2, textDecoration: 'underline' }}>Searched For <b style={{ color: '#9c27b0' }}>{search}</b></Typography>
            }
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,280px))', gap: 2, p: 2,boxShadow:theme.shadows[5],m:2,justifyContent:'center',overflowX:'auto' }}>
                {
                    ((sortlist.length > 0) ? sortlist : (searchlist && searchlist?.length > 0) ? searchlist : productlist).map((item) => <Paper elevation={3} sx={{ p: 2, overflow: 'hidden', position: 'relative' }}>
                        <Box sx={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
                            <img src={item.image} alt='No internet' style={{ height: '100%' }} />
                        </Box>
                        <Box>
                            <Typography sx={{my:1,color:'primary.dark'}}><b style={{color:theme.palette.info.dark}}>Title: </b>{item.name}</Typography>
                            <Typography sx={{my:1,color:'secondary.main'}}><b style={{color:theme.palette.info.dark}}>Description: </b>{item.description}</Typography>
                            <Typography sx={{my:1,color:'success.light'}}><b style={{color:theme.palette.info.dark}}>Category: </b>{item.category}</Typography>
                        </Box>
                        <Box>
                            <Button variant='outlined' endIcon={<AddShoppingCartIcon />} onClick={() => auth ? dispatch(addtocart(item._id)) : setislogin(true) } sx={{my:2}}>Add</Button>
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
        </>
    )
}
