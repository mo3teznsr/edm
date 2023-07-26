// material-ui

import { Button, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {  IconPencil } from '@tabler/icons';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { Box } from '@mui/system';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';

const HomePage = () => {
const navigate=useNavigate();
const theme=useTheme()
  const user=useSelector(state=>state.user)
  const [customer,setCustomer]=useState()
  const [open, setOpen] = useState(false);
  const scriptedRef = useScriptRef();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    if(!user)
    {

      navigate('/')
    }
  })
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    ...(user?.editor?[{
      field:"edit",
      headerName:"action",
      filterable: false,
      sortable:false,
      renderCell: (params) => {
       
        return (
     <IconButton onClick={()=>{
      setCustomer(params.row)
     handleClickOpen()
     }}>
      <IconPencil/>
     </IconButton>
      )},
    }]:[])
  ];
  
  const [rows,setRows] = useState([
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]);
 return (
<>
  
  <MainCard  title="Customers">
     <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowSelection={false}
      />
    </div>
  </MainCard>
  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Customer Update</DialogTitle>
        <DialogContent>
        <Formik
        initialValues={customer}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(255).required(),
          lastName: Yup.string().max(255).required(),
          age: Yup.number().required(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            
             console.log(values)
             const newRows=rows.map((row)=>{
              return {
                ...row,
                ...(row.id==customer.id&&{...values})
              }
             })
             setRows(newRows)
             handleClose()
              setStatus({ success: true });
             
              setSubmitting(false);
            
          } catch (err) {
         
            if (scriptedRef.current) {
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >

          
            <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login"> firstName</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.firstName}
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="firstName"
                inputProps={{}}
              />
              {touched.firstName && errors.firstName && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.firstName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login"> Last name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.lastName}
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="lastName"
                inputProps={{}}
              />
              {touched.lastName && errors.lastName && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.lastName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.age && errors.age)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Age</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="text"
                value={values.age}
                name="age"
                onBlur={handleBlur}
                onChange={handleChange}
                label="age"
                inputProps={{}}
              />
              {touched.age && errors.age && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.age}
                </FormHelperText>
              )}
            </FormControl>
            
          
          

            <Box sx={{ mt: 2 ,display:"flex",gap:"8px"}}>
            <AnimateButton>
                <Button disableElevation disabled={isSubmitting} onClick={handleClose} sx={{borderRadius:"12px"}}  size="large" type="button" variant="contained" color="warning">
                 concel
                </Button>
              </AnimateButton>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} sx={{borderRadius:"12px"}}  size="large" type="submit" variant="contained" color="secondary">
                  Update
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
        </DialogContent>
      
      </Dialog>
  </>
)};

export default HomePage;
