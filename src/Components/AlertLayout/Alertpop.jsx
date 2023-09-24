import React, { forwardRef} from "react";

import MuiAlert from '@mui/material/Alert'
import { Snackbar, Stack } from "@mui/material";
import { useSelector } from "react-redux";



const CustomizeAlert = forwardRef(function Alert(props,ref) {
    return <MuiAlert variant="filled" {...props} ref={ref}/>
    
})



export default function Alertpop() {
    const alert = useSelector(state=>state.Alert.alert)
    const handleClose = (event,reason) =>{
        // if(reason === 'clickaway'){
        //     return
        // }
    }
  return (
    <Stack spacing={2}>
{
    alert.length > 0 && alert.map((m)=><Stack>
        <Snackbar open={true} anchorOrigin={{vertical:'top',horizontal:'center'}} onClose={handleClose}>
        <CustomizeAlert severity={m.type ? 'success' : 'error'} variant='filled'>
        {
            m.message
        }
    </CustomizeAlert>
        </Snackbar>
    </Stack>
        )
}
    </Stack>
  )
}
