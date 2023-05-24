import { Box, Button, Container, FormControl, FormControlLabel, Modal, Radio, RadioGroup, Typography, darken, useMediaQuery } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import http from "../../../../api/axios";
import IUserAddress from "../../../../interfaces/IUserAddress";
import StaticStepper from "../../Stepper";
import colorTheme from "../../../../components/ColorThemes";
import VerticalStepper from "../../VerticalStepper";
import FormCreateAddress from "../../../Profile/Address/CreateAddress/FormCreateAddress";

const CheckoutAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<IUserAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [checkoutExists, setCheckoutExists] = useState<boolean>(false);
  const [checkoutId, setCheckoutId] = useState<string>('');
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 1100px)');

  const steps = ['Identificação', 'Confirmação de Endereço', 'Método de Pagamento', 'Revisão de dados'];
  const activeStep = 1;

  const fetchUpdatedAddresses = async () => {
    try {
      const response = await http.get<IUserAddress[]>(`/users/me/addresses`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log('Address response.data', response.data)
      const filteredAddresses = response.data.filter((address) => {
        return (
          address.city.trim() !== '' &&
          address.state.trim() !== '' &&
          address.neighborhood.trim() !== '' &&
          address.street.trim() !== '' &&
          address.number !== null &&
          address.zipcode.trim() !== ''
        );
      });
      setAddress(filteredAddresses);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCheckoutStatus = async () => {
    try {
      const response = await http.get('/checkouts/me');
      if (response.status === 200 && response.data.length > 0) {
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

  useEffect(() => {
    fetchUpdatedAddresses();
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleModalOpen = () => {
    setOpen(true);
  };



  const handleModalClose = () => {
    setOpen(false);
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
                {address.map((addr, index) => (
                  <FormControlLabel
                    key={addr._id}
                    value={addr._id}
                    control={<Radio />}
                    label={`${addr.street}, ${addr.number}, ${addr.neighborhood}, ${addr.city}, ${addr.state}`}
                    sx={{ border: '1px solid black', p: 1, mb: 2 }}
                    data-testid={`address-${index}`}
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
                }} data-testid={`checkout-address-return`}>
                  Voltar
                </Button>
              </Box>
              <Button onClick={handleModalOpen} sx={{
                backgroundColor: colorTheme.palette.primary.main, color: colorTheme.palette.secondary.light, p: 2, ml: 2, '&:hover': {
                  backgroundColor: darken(colorTheme.palette.primary.main, 0.2),
                },
              }} data-testid={`checkout-address-create-address`}>
                Adicionar novo endereço
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleButtonClick} sx={{
                  backgroundColor: colorTheme.palette.primary.main, color: colorTheme.palette.secondary.light, p: 2, ml: 2,
                  '&:hover': {
                    backgroundColor: darken(colorTheme.palette.primary.main, 0.2),
                  },
                }} data-testid={`checkout-address-continue`}>
                  Continuar
                </Button>
              </Box>

              <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                  <Typography variant="h6" id="modal-title" sx={{ mb: 2 }}>
                    Criar novo endereço
                  </Typography>
                  <FormCreateAddress />
                </Box>
              </Modal>
            </Container>
          </Box>
        </Container>

      </Container>
    </React.Fragment>
  )
}

export default CheckoutAddress;