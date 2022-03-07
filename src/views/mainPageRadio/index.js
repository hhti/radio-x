// material-ui
import Grid from '@mui/material/Grid';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SOBRE O ATPF ||============================== //

const MainPageRadio = () => (
  <MainCard title="Radio X">
    <Grid container justifyContent="center">
      <img
        src="https://www.imagensempng.com.br/wp-content/uploads/2021/07/04-17.png"
        alt="radioX"
        loading="lazy"
        width="500"
        height="400"
      />
    </Grid>
  </MainCard>
);

export default MainPageRadio;
