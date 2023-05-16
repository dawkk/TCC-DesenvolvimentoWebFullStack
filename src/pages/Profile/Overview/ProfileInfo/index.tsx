import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import http from '../../../../api/axios';
import IUser from '../../../../interfaces/IUser';
import IUserProfileData from '../../../../interfaces/IUserProfileData';
import styles from './ProfileInfo.module.scss'

const ProfileInfo = () => {
  const [userValues, setUserValues] = useState<IUserProfileData>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await http.get<IUser>(`/users/me`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            const updatingUserValues: IUserProfileData = response.data;
            setUserValues(updatingUserValues);
          })
          .catch(error => {
            console.log(error);
          })
      } catch (error: unknown) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);


  return (
    <>
      <Grid container sx={{p:4}}>
        <Grid item xs={12} className={styles.GridBackground} sx={{mt:2,mb:1}}>
          <Typography variant="subtitle2" className={styles.Title}>Nome:</Typography>
          <Typography className={styles.Properties}>{userValues?.firstName ?? ''}</Typography>
        </Grid>

        <Grid item xs={12} className={styles.GridBackground} sx={{mt:1,mb:1}}>
          <Typography variant="subtitle2"  className={styles.Title}>Sobrenome:</Typography>
          <Typography className={styles.Properties}>{userValues?.lastName ?? ''}</Typography>
        </Grid>

        <Grid item xs={12} className={styles.GridBackground} sx={{mt:1,mb:1}}>
          <Typography variant="subtitle2" className={styles.Title}>Email:</Typography>
          <Typography className={styles.Properties}>{userValues?.email ?? ''}</Typography>
        </Grid>
        
         
        <Grid item xs={12} className={styles.GridBackground} sx={{mt:1,mb:2}}>
          <Typography variant="subtitle2" className={styles.Title}>Celular:</Typography>
          <Typography className={styles.Properties}>{userValues?.cellphone ?? ''}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfileInfo;