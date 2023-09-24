import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link, CircularProgress } from '@mui/material'
import { Camera, MicNone, PhotoCamera } from '@mui/icons-material'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { Storage } from '../firebase'
import { green } from '@mui/material/colors'
import { update_product } from '../Redux/Action/ProductAction'

export default function EditProduct({ isEdit, setisEdit }) {
    const product = useSelector(state => state.Product.single)
    const loading = useSelector(state => state.Product.loading)
    const [uploadLoading, setuploadLoading] = useState(false)
    const theme = createTheme()
    const [name, setname] = useState()
    const [description, setdescription] = useState()
    const [price, setprice] = useState()
    const [image, setimage] = useState()
    const [stock, setstock] = useState()
    const [brand, setbrand] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        setname(product.name)
        setdescription(product.description)
        setprice(product.price)
        setimage(product.image)
        setstock(product.stock)
        setbrand(product.brand)
    }, [product])


    const handleProductImage = (file) => {
        setuploadLoading(true)
        const location = ref(Storage, 'Product' + '/' + product._id + file.name)
        const upload = uploadBytesResumable(location, file)
        upload.on(
            "state_changed",
            (snap) => {
                console.log(Math.round(snap.bytesTransferred / snap.totalBytes * 100))
            },
            (err) => console.log(err),
            async () => {
                const url = await getDownloadURL(location)
                setimage(url)
                setuploadLoading(false)
            }

        )
    }

    return (
        <Dialog open={isEdit} fullWidth>
            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Edit Product</Typography>
            </DialogTitle>
            {
                !loading ? <DialogContent>
                    <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center' }}>
                        <img src={image ? image : ''} alt='Internet connection Problem' style={{ height: '100%' }} />
                    </Box>
                    <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                        <TextField
                            value={name ? name : ''}

                            onChange={(e) => setname(e.target.value)}
                        />
                        <TextField
                            value={description ? description : ''}

                            onChange={(e) => setdescription(e.target.value)}
                        />
                        <TextField
                            value={price ? price : ''}

                            onChange={(e) => setprice(e.target.value)}
                        />
                        <TextField
                            value={stock ? stock : ''}

                            onChange={(e) => setstock(e.target.value)}
                        />
                        <TextField
                            value={brand ? brand : ''}

                            onChange={(e) => setbrand(e.target.value)}
                        />
                        <Button disabled={uploadLoading} component='label' htmlFor='upload' endIcon={uploadLoading ? <CircularProgress size={24} sx={{ color: `${green}` }} /> : <PhotoCamera />} variant='contained'>Upload</Button>
                        <input hidden id='upload' type='file' onChange={(e) => handleProductImage(e.target.files[0])} />



                    </Box>

                </DialogContent> : <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}><CircularProgress /> <Typography>Product is Loading Please Wait...</Typography></Box>
            }
            <DialogActions>
                <Button variant='outlined' onClick={() => { setisEdit(false) }}>Cancel</Button>
                <Button variant='contained' onClick={() => { dispatch(update_product({ name: name, description: description, brand: brand, image: image, price: price, stock: stock }, product._id)); setisEdit(false) }}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
