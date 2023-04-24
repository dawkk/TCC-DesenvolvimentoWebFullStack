import { Box, Button, Container, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, darken } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import http from "../../../../api/axios";
import IUserAddress from "../../../../interfaces/IUserAddress";
import StaticStepper from "../../Stepper";
import colorTheme from "../../../../components/ColorThemes";



const CheckoutReview = () => {
  const userLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const jwtValue = userLocalStorage.jwt;
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const [address, setAddress] = useState<IUserAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  const steps = ['Identificação', 'Confirmação de Endereço', 'Método de Pagamento', 'Revisão de pedido'];
  const activeStep = 3;

  useEffect(() => {
    const fetchUpdatedAddresses = async () => {
      try {
        const response = await http.get<IUserAddress[]>(`/users/me/addresses`, {
          headers: {
            Authorization: `Bearer ${jwtValue}`,
          },
        });
        setAddress(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (address.length === 0) {
      fetchUpdatedAddresses();
    } else if (selectedAddress === "") {
      setSelectedAddress(address[0]._id);
    }
  }, [address, jwtValue, selectedAddress]);

  const handleButtonClick = async () => {
    try {
        const payload = {
          deliveryAddress: selectedAddress,
          cartItems: cartItems,
        }
        console.log('This is payload from frontend should be address ID', selectedAddress)
        console.log('This is payload from frontend',payload)
        await http.post('/checkouts', {
          payload
        }, {
          headers: {
            Authorization: `Bearer ${jwtValue}`,
          },
        });
        navigate('/checkout/payment');
      } catch (error: unknown) {
        console.log(error);
      }
};


  return (
    <React.Fragment>
      <Container sx={{ m: 2 }}>
        <div>
          <StaticStepper steps={steps} activeStep={activeStep} />
        </div>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ backgroundColor: 'white' }}>
              <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
                  <Typography variant="h4">Listagem de Pratos</Typography>
                </Box>
              </Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      <TableCell align="center" >Imagem</TableCell>
                      <TableCell align="center">Titulo</TableCell>
                      <TableCell align="center">Descrição</TableCell>
                      <TableCell align="center">Quantidade</TableCell>
                      <TableCell align="center">Preço</TableCell>
                      <TableCell align="center">Menu</TableCell>
                      <TableCell align="center">Editar</TableCell>
                      <TableCell align="center">Excluir</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {dishes.map((dish) => (
                      <TableRow
                        key={dish._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{dish.image && <img src={dish.imageURL} alt={dish.title} height={100} width={100} />}</TableCell>
                        <TableCell align="center">{dish._id}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {dish.title}
                        </TableCell>
                        <TableCell align="center">{dish.description}</TableCell>
                        <TableCell align="center">R${dish.price}</TableCell>
                        <TableCell align="center">{dish.type}</TableCell>
                        <TableCell align="center">{dish.menu?.name}</TableCell>

                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl component="fieldset" sx={{ mb: 4, mt: 4 }}>
              <RadioGroup
                aria-label="address"
                name="address"
                value={selectedAddress}
                onChange={(event) => setSelectedAddress(event.target.value)}
              >
                {address.map((addr) => (
                  <FormControlLabel
                    key={addr._id}
                    value={addr._id}
                    control={<Radio />}
                    label={`${addr.street}, ${addr.number}, ${addr.neighborhood}, ${addr.city}, ${addr.state}`}
                    sx={{ border: '1px solid black', p: 1, mb: 2 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleButtonClick} sx={{
                backgroundColor: colorTheme.palette.primary.main, color: colorTheme.palette.secondary.light, p: 2, width: '40%',
                '&:hover': {
                  backgroundColor: darken(colorTheme.palette.primary.main, 0.2),
                },
              }}>
                Continuar
              </Button>
            </Box>
          </Box>
        </Container>

      </Container>
    </React.Fragment>
  )
}

export default CheckoutReview;