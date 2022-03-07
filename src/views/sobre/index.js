// material-ui
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SOBRE O ATPF ||============================== //

const Sobre = () => (
  <MainCard title="Sobre a Radio X">
    <Typography variant="body2">
      Está é a radio X, deixa que da música cuidamos nós.
    </Typography>
    <Grid container justifyContent="center">
      <img
        src="https://i.pinimg.com/originals/50/38/f6/5038f6672f089f3a50c4f075feddfc42.gif"
        alt="atpf"
        loading="lazy"
        width="150"
        height="150"
      />
    </Grid>
  </MainCard>
);

export default Sobre;
