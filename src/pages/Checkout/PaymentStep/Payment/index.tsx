import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography, darken, useMediaQuery } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import http from "../../../../api/axios";
import StaticStepper from "../../Stepper";
import colorTheme from "../../../../components/ColorThemes";
import IPaymentMethod from "../../../../interfaces/IPaymentMethod";
import VerticalStepper from "../../VerticalStepper";

const CheckoutPayment = () => {
  const userLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const jwtValue = userLocalStorage.jwt;
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 1100px)');

  const steps = ['Identificação', 'Confirmação de Endereço', 'Método de Pagamento', 'Revisão de dados'];
  const activeStep = 2;

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await http.get<IPaymentMethod[]>(`/paymentMethods`, {
          headers: {
            Authorization: `Bearer ${jwtValue}`,
          },
        });
        setPaymentMethod(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymentMethods();
  }, [jwtValue]);

  const handleButtonClick = async () => {
    try {
      const response = await http.get('/checkouts/me', {
        headers: {
          Authorization: `Bearer ${jwtValue}`,
        },
      });
      const checkoutId = response.data[0]._id;
      await http.put(`/checkouts/me/${checkoutId}`, {
        paymentMethod: selectedPaymentMethod,
      }, {
        headers: {
          Authorization: `Bearer ${jwtValue}`,
        },
      });
      navigate('/checkout/review');
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
      navigate('/checkout/address');
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Confirmação de Endereço
          </Typography>
        </Box>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <FormControl component="fieldset" sx={{ mb: 4, mt: 4 }}>
              <RadioGroup
                aria-label="paymentMethod"
                name="paymentMethod"
                value={selectedPaymentMethod}
                onChange={(event) => setSelectedPaymentMethod(event.target.value)}
              >
                {paymentMethod.map((payment) => (
                  <FormControlLabel
                    key={payment._id}
                    value={payment._id}
                    control={<Radio />}
                    label={`${payment.name}`}
                    sx={{ border: '1px solid black', p: 1, mb: 2 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Container>
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

      </Container>
    </React.Fragment>
  )
}

export default CheckoutPayment;