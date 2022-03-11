// material-ui
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SOBRE O ATPF ||============================== //

const Sobre = () => (
  <MainCard title="Sobre a Radio Eleva">
    <Typography variant="body2">
      Está é a radio Eleva, elevando o nível.
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

    <Grid container justifyContent="center">
      <Typography variant="body2">
        Feito com{' '}
        <FavoriteIcon aria-label="add to shopping cart" fontSize="small" />,
        dúvidas ou problemas, nos contacte:{' '}
        <SecondaryAction
          title="WhatsApp Tiago"
          icon={
            <WhatsAppIcon aria-label="add to shopping cart" fontSize="small" />
          }
          link={`https://api.whatsapp.com/send?phone=5561995050113&text=Ol%C3%A1%2C%20prezado%2C%20espero%20que%20esteja%20bem%2C%20em%20que%20podemos%20ajudar%3F`}
        />{' '}
        ou{' '}
        <SecondaryAction
          title="WhatsApp Walber"
          icon={
            <WhatsAppIcon aria-label="add to shopping cart" fontSize="small" />
          }
          link={`https://api.whatsapp.com/send?phone=5561996060684&text=Ol%C3%A1%2C%20prezado%2C%20espero%20que%20esteja%20bem%2C%20em%20que%20podemos%20ajudar%3F`}
        />
      </Typography>
    </Grid>
  </MainCard>
);

export default Sobre;
