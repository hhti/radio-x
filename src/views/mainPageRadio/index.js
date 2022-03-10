// material-ui
import Grid from '@mui/material/Grid';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import logo from '../../assets/images/eleva.png';


// ==============================|| SOBRE O ATPF ||============================== //

const MainPageRadio = () => (
  <MainCard title="Radio Eleva">
    <Grid container justifyContent="center">
      <img
        src={logo}
        alt="radioX"
        loading="lazy"
        width="570"
        height="200"
      />
    </Grid>
  </MainCard>
);

export default MainPageRadio;
