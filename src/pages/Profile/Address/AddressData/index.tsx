import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import http from '../../../../api/axios';
import IUserAddress from '../../../../interfaces/IUserAddress';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './AddressData.module.scss'
import CustomizedSnackbars from '../../../../components/Alerts/Snackbar';


const AddressData = () => {
  const [showSucessAlert, setShowSucessAlert] = useState<boolean>(false);
  const [showFailAlert, setShowFailAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const [address, setAddress] = useState<IUserAddress[]>([]);


  useEffect(() => {
    const fetchUpdatedAddresses = async () => {
      try {
        const response = await http.get<IUserAddress[]>(`/users/me/addresses`, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        setAddress(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (address.length === 0) {
      fetchUpdatedAddresses();
    }

  }, [address]);

  const inactivateAddress = (_id: string) => {
    try {
      const config = { _id, statusActive: false };
      http.put(`/users/me/addresses/${_id}`, config)
        .then(() => {
          const listAddresses = address.filter(addr => addr._id !== _id)
          setAddress([...listAddresses])
        })
      setShowSucessAlert(true);
      setShowFailAlert(false);
    } catch (error) {
      console.log(error);
      setShowSucessAlert(false);
      setShowFailAlert(true);
    }
  }

  const EditAddress = (_id: string) => {
    navigate(`/profile/address/${_id}`);
  }

  const CreateAddress = () => {
    navigate('/profile/address/create');
  };


  return (
    <>
      <Container className={styles.Container}>
        <Button onClick={CreateAddress} variant='contained'>Adicionar Novo Endereço</Button>
        {address.map((addr, index) => (
          <Grid container key={addr._id} className={styles.GridContainer} >
            <Grid item xs={12} className={styles.GridItem}>
              <Typography variant="subtitle2" className={styles.Subtitle}>Endereço:</Typography>
              <Typography>{`${addr.street}, ${addr.number}, ${addr.neighborhood}, ${addr.city}, ${addr.state}, ${addr.additionalInfo}, ${addr.zipcode}`}</Typography>
            </Grid>
            <Grid item xs={12} className={styles.GridContainerButton}>
              <Button onClick={() => addr._id && EditAddress(addr._id)} variant='contained' className={styles.Button}data-testid={`address-edit-button-${index}`} sx={{mr:1}}><EditIcon /></Button>
              <Button onClick={() => addr._id && inactivateAddress(addr._id)} variant='contained' className={styles.Button} data-testid={`address-delete-button-${index}`}><DeleteForeverIcon /></Button>
            </Grid>
          </Grid>
        ))}
        {showSucessAlert &&
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomizedSnackbars
              open={showSucessAlert}
              message="Endereço removido com sucesso!"
              severity="success"
              onClose={() => setShowSucessAlert(false)}
            />
          </Box>
        }
        {showFailAlert &&
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomizedSnackbars
              open={showFailAlert}
              message="Erro: Endereço não foi removido. Por favor entre em contato com a administração."
              severity="error"
              onClose={() => setShowFailAlert(false)}
            />
          </Box>
        }
      </Container>
    </>
  )
}

export default AddressData;