import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, CircularProgress, Divider, Paper, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Edit } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Storage } from '../../firebase'
import { sentsellerotp, update_user } from '../../Redux/Action/AuthAction'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import { useNavigate } from 'react-router-dom'
import AddProduct from './AddProduct';
import GetSellerOTP from './GetSellerOTP';
export default function Userdashboard() {
    const alert = useSelector(state=>state.Alert?.alert[0]?.message)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.Auth.user)
    const auth = useSelector(state => state.Auth.isAuthenticated)
    const [profile, setProfile] = useState()
    const [isAddProduct, setisAddProduct] = useState(false)
    const [isSeller, setisSeller] = useState(false)
    const [isEditProfile, setisEditProfile] = useState(false)
    const [uploadLoading, setuploadLoading] = useState(false)
    const [isChangePassword, setisChangePassword] = useState(false)
    const handleProfile = (e) => {
        setuploadLoading(true)
        const file = e.target.files[0]
        const location = ref(Storage, 'Profile' + '/' + user._id + '/' + file.name)
        const upload = uploadBytesResumable(location, file)
        upload.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)
                console.log(prog)
            },
            (error) => {
                console.log(error)
            },
            async () => {
                const url = await getDownloadURL(location)
                setProfile(url)
                dispatch(update_user({ image: url }))
                setuploadLoading(false)
            }
        )
    }
    useEffect(()=>{
        if(alert === 'Email Sent Successfully Please check your mailbox'){
            setisSeller(true)
        }
    },[alert])


    useEffect(() => {
        if (!auth) navigate('/')
    }, [auth])
    return (
        <>
            {

                uploadLoading && <Box sx={{ bgcolor: 'rgba(0,0,0,.2)', minHeight: '120vh', width: '100vw', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress sx={{ position: 'absolute', zIndex: 2 }} /></Box>
            }
            {
                isEditProfile && <EditProfile isEditProfile={isEditProfile} setisEditProfile={setisEditProfile} />
            }
            {
                isChangePassword && <ChangePassword isChangePassword={isChangePassword} setisChangePassword={setisChangePassword} />
            }
            {
                isAddProduct && <AddProduct isAddProduct={isAddProduct} setisAddProduct={setisAddProduct} />
            }
            {
                isSeller && <GetSellerOTP isSeller={isSeller} setisSeller={setisSeller} />
            }

            <Box sx={{}}>

                <Paper elevation={2} sx={{ width: '90%', mx: 'auto', mt: 2, overflowX: 'auto', p: 2 }}>
                    <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 700, textAlign: 'center', my: 2 }}>Simple User Dashboard</Typography>
                    <Divider />
                    <Divider />
                    <Box component={'label'} htmlFor='upload'>
                        <Tooltip title='Click to Upload'>
                            <Avatar src={profile ? profile : user.image} sx={{ mx: 'auto', my: 1, height: '4rem', width: '4rem', cursor: 'pointer' }} />
                        </Tooltip>

                        <Typography sx={{ textAlign: 'center', my: 1 }}>Profile</Typography>

                    </Box>
                    <input id='upload' hidden type='file' onChange={(e) => handleProfile(e)} />
                    <Divider />
                    <Table >

                        <TableBody>



                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell >{user.first_name} {user.last_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >Email</TableCell>
                                <TableCell >{user.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >Age</TableCell>
                                <TableCell >{user.age} Years</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >User Type</TableCell>
                                <TableCell sx={{ textTransform: 'uppercase', color: 'primary.main' }}>{user.user_type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Balance</TableCell>
                                <TableCell>{user.balance} PKR</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{(user.user_type === 'admin' || user.user_type === 'Seller') ? 'Add Product' : 'Become Seller'}</TableCell>
                                <TableCell><Button variant='outlined' endIcon={<AddIcon />} onClick={() => { (user.user_type === 'admin' || user.user_type === 'Seller') ? setisAddProduct(true) : (dispatch(sentsellerotp({ email: user.email }))) }}>{(user.user_type === 'admin' || user.user_type === 'Seller') ? 'Add' : 'Seller'}</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Edit Profile</TableCell>
                                <TableCell><Button variant='contained' endIcon={<Edit />} onClick={() => setisEditProfile(true)}>Edit</Button></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >Change Password</TableCell>
                                <TableCell><Button variant='contained' endIcon={<Edit />} onClick={() => setisChangePassword(true)}>Change</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </Paper>
                {
                    user.user_type === 'admin' && <>

                        <Paper elevation={2} sx={{ width: '90%', mx: 'auto', my: 2, overflowX: 'auto', p: 2 }}>
                            <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 700, textAlign: 'center', my: 2 }}>Admin Exlusive</Typography>
                            <Divider />
                            <Divider />


                            <Table >

                                <TableBody>



                                    <TableRow>
                                        <TableCell >User List</TableCell>
                                        <TableCell ><Button variant='outlined' onClick={() => navigate('/Admin/userlist')}>Users</Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Product List</TableCell>
                                        <TableCell ><Button variant='outlined' onClick={() => navigate('/Admin/productlist')}>Products</Button></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Order List</TableCell>
                                        <TableCell ><Button variant='outlined' onClick={() => navigate('/Admin/orderlist')}>Orders</Button></TableCell>
                                    </TableRow>


                                </TableBody>
                            </Table>

                        </Paper>
                    </>
                }
            </Box>
        </>
    )
}
