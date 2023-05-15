import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography, darken, useMediaQuery } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import http from "../../../../api/axios";
import IUserAddress from "../../../../interfaces/IUserAddress";
import StaticStepper from "../../Stepper";
import colorTheme from "../../../../components/ColorThemes";
import VerticalStepper from "../../VerticalStepper";

const CheckoutAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<IUserAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [checkoutExists, setCheckoutExists] = useState<boolean>(false);
  const [checkoutId, setCheckoutId] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 1100px)');

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
    };

    if (address.length === 0) {
      fetchUpdatedAddresses();
    } else if (selectedAddress === "") {
      setSelectedAddress(address[0]._id);
    }
  }, [address, selectedAddress]);

  useEffect(() => {
    const fetchCheckoutStatus = async () => {
      try {
        const response = await http.get('/checkouts/me');
        if (response.status === 200) {
          setCheckoutExists(true);
          setCheckoutId(response.data[0]._id);
        } else {
          setCheckoutExists(false);
          setCheckoutId('');
        }
      } catch (error) {
        setCheckoutExists(false);
        setCheckoutId('');
      }
    };

    fetchCheckoutStatus();
  }, []);

  const handleButtonClick = async () => {
    try {
      const payload = {
        deliveryAddress: selectedAddress,
      };

      if (checkoutExists) {
        await http.put(`/checkouts/me/${checkoutId}`, payload, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
      } else {
        await http.post('/checkouts', payload, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
      }

      navigate('/checkout/payment');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        navigate('/401'); 
      } else {
        console.log(error);
      }
    }
  };

  const handleButtonReturn = async () => {
    try {
      navigate('/checkout');
    } catch (error: unknown) {
      console.log(error);
    }
  };



  return (
    <React.Fragment>
      <Container sx={{ m: 2 }}>
        {isMobile ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
            <VerticalStepper steps={steps} activeStep={activeStep} />
          </Box>
        ) : (
          <StaticStepper steps={steps} activeStep={activeStep} />
        )}
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
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleButtonReturn} sx={{
                  backgroundColor: colorTheme.palette.primary.main, color: colorTheme.palette.secondary.light, width: '100px',
                  '&:hover': {
                    backgroundColor: darken(colorTheme.palette.primary.main, 0.2),
                  },
                }}>
                  Voltar
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleButtonClick} sx={{
                  backgroundColor: colorTheme.palette.primary.main, color: colorTheme.palette.secondary.light, p: 2, ml: 2,
                  '&:hover': {
                    backgroundColor: darken(colorTheme.palette.primary.main, 0.2),
                  },
                }}>
                  Continuar
                </Button>
              </Box>
            </Container>
          </Box>
        </Container>

      </Container>
    </React.Fragment>
  )
}

export default CheckoutAddress;