import { Box, Button, Container, Typography, darken } from "@mui/material";
import React, { useEffect, useState } from "react";
import IUser from "../../../interfaces/IUser";
import http from "../../../api/axios";
import LoginFormFields from "../../Authentication/Login/LoginFormFields";
import IUserAddress from "../../../interfaces/IUserAddress";
import StaticStepper from "../Stepper";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../../components/ColorThemes";


const CheckoutIdentification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [address, setAddress] = useState<IUserAddress[]>([]);
  const userLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const jwtValue = userLocalStorage.jwt;
  const navigate = useNavigate();

  const steps = ['Identificação', 'Confirmação de Endereço', 'Método de Pagamento', 'Revisão de dados'];
  const activeStep = 0;


  const fetchUserData = async () => {
    try {
      await http.get<IUser>(`/users/me`, {
        headers: {
          Authorization: `Bearer ${jwtValue}`,
        },
      })
        .then(response => {
          const updatingUserValues: IUser = response.data;
          setUser(updatingUserValues);
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.log(error);
        })
    } catch (error: unknown) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchUpdatedAddresses = async () => {
      try {
        await http.get<IUserAddress[]>(`/users/me/addresses`, {
          headers: {
            Authorization: `Bearer ${jwtValue}`,
          },
        })
          .then(response => {
            setAddress([...response.data]);
          })
          .catch(error => {
            console.log(error);
          })
      } catch (error: unknown) {
        console.log(error);
      }
    }

    if (isLoggedIn && address) {
      fetchUpdatedAddresses();
    }
  }, [isLoggedIn, address])

  useEffect(() => {

    if (userLocalStorage) {
      fetchUserData();
    }
  }, [])

  const handleButtonClick = async () => {
    try {

      navigate('/checkout/address');
        
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
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' , mb:3}}>
          <Typography variant="h6" gutterBottom>
            Identificação
          </Typography>
        </Box>
        {isLoggedIn ? (
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" gutterBottom>
                <strong>Nome:</strong> {user?.firstName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Sobrenome:</strong> {user?.lastName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user?.email}
              </Typography>
      

              <Box sx={{ display: 'flex', justifyContent: 'center', mt:4 }}>
                <Button onClick={handleButtonClick} sx={{
                  backgroundColor: colorTheme.palette.primary.main, color: colorTheme.palette.secondary.light, p: 2, width: '80%',
                  '&:hover': {
                    backgroundColor: darken(colorTheme.palette.primary.main, 0.2),
                  },
                }}>
                  Continuar
                </Button>
              </Box>
            </Box>
          </Container>
        ) : (
          <Container maxWidth="sm" sx={{}}>
            <LoginFormFields />
          </Container>
        )
        }
      </Container>
    </React.Fragment>
  )
}

export default CheckoutIdentification;