import React from 'react'
import image from '../../Best-Ecommerce-Platforms.webp'
import { Box, Paper, createTheme } from '@mui/material'
import Product from './Product'

export default function Homepage() {
    const theme = createTheme()
    return (
        <div className='Homepage'>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', my: 2 }}>
                <img src={image} alt='Loading' style={{ width: '95%', margin: '5px auto', boxShadow: theme.shadows[10], aspectRatio: '16/9' }} />
                <Paper elevation={2} sx={{ my: 2 }}>
                    <Product />
                </Paper>
            </Box>
        </div>
    )
}
