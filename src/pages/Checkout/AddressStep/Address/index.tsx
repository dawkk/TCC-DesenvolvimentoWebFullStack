import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography, darken } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import http from "../../../../api/axios";
import IUserAddress from "../../../../interfaces/IUserAddress";
import StaticStepper from "../../Stepper";
import colorTheme from "../../../../components/ColorThemes";
import ICartItem from "../../../../interfaces/ICartItem";



const CheckoutAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<IUserAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const steps = ['Identificação', 'Confirmação de Endereço', 'Método de Pagamento', 'Revisão de dados'];
  const activeStep = 1;
 
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
      const items = JSON.parse(localStorage.getItem('cartItems') || '[]') as ICartItem[];
      setCartItems(items);
    
    };
  
    if (address.length === 0) {
      fetchUpdatedAddresses();
    } else if (selectedAddress === "") {
      setSelectedAddress(address[0]._id);
    }
  }, [address, selectedAddress]);

  const handleButtonClick = async () => {
    try {
      const formattedCartItems = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
        const payload = {
          deliveryAddress: selectedAddress,
          cartItems: formattedCartItems,
        }
        console.log('This is payload from frontend should be address ID', selectedAddress)
        console.log('This is payload from frontend',payload)
        await http.post('/checkouts', {
          payload
        }, {
          headers: {
            'Content-Type': 'application/json'
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
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h6" gutterBottom>
            Confirmação de Endereço
          </Typography>
        </Box>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>

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

export default CheckoutAddress;