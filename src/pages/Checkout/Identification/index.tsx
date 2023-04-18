import { Box, Container, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import IUser from "../../../interfaces/IUser";
import http from "../../../api/axios";
import LoginFormFields from "../../Authentication/Login/LoginFormFields";
import IUserAddress from "../../../interfaces/IUserAddress";


const CheckoutIdentification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [address, setAddress] = useState<IUserAddress[]>([]);
  const userLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const jwtValue = userLocalStorage.jwt;
  const [selectedAddress, setSelectedAddress] = useState<string>('');

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

  return (
    <React.Fragment>
      <Container sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Box>
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
              <FormControl component="fieldset">
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
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </Container>
        ) : (
          <Container maxWidth="md" sx={{}}>
            <LoginFormFields />
          </Container>
        )
        }
      </Container>
    </React.Fragment>
  )
}

export default CheckoutIdentification;