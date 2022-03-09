// material-ui
import Grid from '@mui/material/Grid';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SOBRE O ATPF ||============================== //

const MainPageRadio = () => (
  <MainCard title="Radio Eleva">
    <Grid container justifyContent="center">
      <img
        src="http://elevaescalada.com.br/wp-content/uploads/2020/07/Sa%C3%ADdas-de-marca_Eleva_oficiais-05-2048x1448.png"
        alt="radioX"
        loading="lazy"
        width="500"
        height="400"
      />
    </Grid>
  </MainCard>
);

export default MainPageRadio;
