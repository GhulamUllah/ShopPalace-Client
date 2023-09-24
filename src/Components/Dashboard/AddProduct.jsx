import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, createTheme, Box, Link, CircularProgress } from '@mui/material'
import { Add, PhotoCamera } from '@mui/icons-material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { green } from '@mui/material/colors'
import { add_product } from '../../Redux/Action/ProductAction'
import { Storage } from '../../firebase'

export default function AddProduct({ isAddProduct, setisAddProduct }) {
    const loading = useSelector(state => state.Product.loading)
    const user = useSelector(state => state.Auth.user)
    const [uploadLoading, setuploadLoading] = useState(false)
    const theme = createTheme()
    const [name, setname] = useState()
    const [description, setdescription] = useState()
    const [price, setprice] = useState()
    const [image, setimage] = useState()
    const [stock, setstock] = useState()
    const [brand, setbrand] = useState()
    const [Discount, setdiscount] = useState()
    const [category, setcategory] = useState()
    const dispatch = useDispatch()

    console.log(name)


    const handleUpload = (file) => {
        console.log(file)
        setuploadLoading(true)
        const location = ref(Storage, 'Product' + '/' + user._id + '/' + file.name)
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
        <Dialog open={isAddProduct} fullWidth>
            {
                uploadLoading && <Box sx={{ bgcolor: 'rgba(0,0,0,.2)', minHeight: '120vh', width: '100vw', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress sx={{ position: 'absolute', zIndex: 2 }} /></Box>

            }
            <DialogTitle>
                <Typography variant='h5' sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>Add Product</Typography>
            </DialogTitle>
            {
                !loading ? <DialogContent>
                    <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center', my: 2 }}>
                        <img src={image ? image : 'https://cdn2.vectorstock.com/i/1000x1000/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg'} alt='Internet connection Problem' style={{ height: '100%' }} />
                    </Box>
                    <Box component='form' sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
                        <TextField
                            placeholder='Name of Product'

                            onChange={(e) => setname(e.target.value)}
                        />
                        <TextField
                            placeholder='Description of Product'

                            onChange={(e) => setdescription(e.target.value)}
                        />
                        <TextField
                            placeholder='Price'
                            type='number'
                            onChange={(e) => setprice(e.target.value)}
                        />
                        <TextField
                            placeholder='Stock'
                            type='number'
                            onChange={(e) => setstock(e.target.value)}
                        />
                        <TextField
                            placeholder='Brand'

                            onChange={(e) => setbrand(e.target.value)}
                        />
                        <TextField
                            placeholder='Category'

                            onChange={(e) => setcategory(e.target.value)}
                        />
                        <TextField
                            placeholder='Discount'
                            type='number'
                            onChange={(e) => setdiscount(e.target.value)}
                        />
                        <Box component={'label'} htmlFor='up' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer', border: '2px dashed' + theme.palette.primary.main }}>
                            <CloudUploadIcon sx={{ color: 'primary.main', fontSize: '50px' }} />
                            <Typography>Upload image</Typography>
                        </Box>
                        <input hidden id='up' type='file' onChange={(e) => handleUpload(e.target.files[0])} />



                    </Box>

                </DialogContent> : <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}><CircularProgress /> <Typography>Product is Loading Please Wait...</Typography></Box>
            }
            <DialogActions>
                <Button variant='outlined' onClick={() => { setisAddProduct(false) }}>Cancel</Button>
                <Button variant='contained' disabled={!image || !description || !name || !price || !brand || !category || !Discount || !stock} onClick={() => dispatch(add_product({ discount: Discount, name: name, description: description, brand: brand, image: image, price: price, stock: stock, category: category }))} endIcon={uploadLoading ? <CircularProgress size={24} /> : <Add />}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
