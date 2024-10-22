import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import moment from "moment";
import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Groups2Icon from '@mui/icons-material/Groups2';
import Person4Icon from '@mui/icons-material/Person4';
import Groups3Icon from '@mui/icons-material/Groups3';
import ChatIcon from '@mui/icons-material/Chat';
import { CurveBtn, SearchField } from '../../components/styles/StyledComponent';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';


const Dashboard = () => {
  const Appbar = <Paper elevation={10} sx={{ borderRadius: '1rem', padding: '2rem', margin: '1rem 0'}}>
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      <AdminPanelSettingsIcon sx={{ fontSize: '3rem' }} />
      <SearchField />
      <CurveBtn>Search</CurveBtn>
      <Box flexGrow={1} />
      <Typography display={{ xs: 'none', lg: 'block' }} color={'rgba(0,0,0,0.7)'} textAlign={'center'}>{moment().format('dddd, D MMMM YYYY')}</Typography>
      <NotificationsNoneIcon />
    </Stack>
  </Paper>

  const Widgets = <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'1rem'} justifyContent={'space-between'} margin={'2rem 0'}>
    <Widget title={'Users'} value={20} Icon={<Person4Icon />} />
    <Widget title={'chats'} value={20} Icon={<Groups3Icon />} />
    <Widget title={'messages'} value={20} Icon={<ChatIcon />} />
  </Stack>
  return (
    <AdminLayout>
      <Container component={'main'}>
        {
          Appbar
        }
        <Stack direction={'row'} spacing={'2rem'} flexWrap={'wrap'}>
          <Paper elevation={5} sx={{ padding: '2rem 3rem', borderRadius: '1rem', maxWidth: '45rem', width: '100%', height: '25rem' }}>
            <Typography variant='h5' margin={'1rem 2rem'}>last Message</Typography>
            <LineChart value={[23,55,11,66]}/>
          </Paper>
          <Paper 
          elevation={3}
          sx={{
            padding: '1rem',
            borderRadius: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', sm: '50%' },
            position: 'relative',
            width: '100%',
            maxWidth: '25rem',
            height: '25rem'
          }}>
            <DoughnutChart/>
            <Stack sx={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%'
            }} spacing={'1rem'}>
              <Groups2Icon />
              <Typography>Vs</Typography>
              <Person4Icon />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  )
}
const Widget = ({ title, value, Icon }) => <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem 0', borderRadius: '1.5rem', width: '20rem'}}>
  <Stack alignItems={'center'} spacing={'1rem'}>
    <Box sx={{
      color: 'rgba(0,0,0,0.7)',
      borderRadius: "50%",
      border: `5px solid rgba(0,0,0,0.9)`,
      width: "3rem",
      height: "3rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {value}
    </Box>
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      {Icon}
      <Typography>{title}</Typography>
    </Stack>
  </Stack>
</Paper>
export default Dashboard