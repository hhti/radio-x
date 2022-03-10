// material-ui
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';


const Input = styled('input')({
  display: 'none',
});

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(10vh - 10px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light
}));
// ==============================|| UPLOADS ||============================== //

const Uploads = () => {

  const urlServer = 'http://localhost:3005'

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [audiosFile, setAudiosFile] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertName, setAlertName] = React.useState('');
  const [alertType, setAlertType] = React.useState('warning');
  const [refresh, setRefresh] = React.useState(false);
  const [playAudio, setPlayAudio] = React.useState();
  const [audioTitle, setAudioTitle] = useState("Gestão de áudio");

  const closeMessage =()=>{
    let count = 0;

    const interval = setInterval(() => {
      count++;

      if (count === 2) {
        clearInterval(interval);
        setOpen(false);
      }

    }, 2000);
  }

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    try {
      const res = await axios.post(
        urlServer+"/upload",
        formData
      );
      console.log(res);
      setAlertType('success');
      setAlertName('Upload feito com sucesso !!!');
      setRefresh(!refresh);
      setOpen(true);
      closeMessage();

    } catch (ex) {
      setAlertType('error');
      setAlertName('Falha no Upload !!!');
      setOpen(true);
      closeMessage();
      console.log(ex);
    }
  };

  const handleClickPlayAudio = async (audioName) => {

    console.log(audioName);
    setFileName(audioName)
    setAudioTitle('')
    setAudioTitle('Gestão de áudio, você está ouvindo agora:  '+audioName)
    

    // return (
    //   <IFrameWrapper id = {'id_'+audioName} width="100%" src={'http://localhost:3005/audio/'+audioName} />
    // )
    // const paramsApi = {
    //   fileName: audioName
    // };
    // console.log(paramsApi);

    // try {
    //   const response = await axios.get('http://localhost:3005/audio', { fileName:audioName, });
    //   console.log(response)
    //   setPlayAudio(response.headers) 

    //   return response.headers;

    // }
    // catch (error) {
    //   console.log(error)
    //   setAlertType("error");
    //   setAlertName('Erro interno, contacte o Administrador');
    //   setOpen(true);
    // }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const paramsApi = {
      audioName: event.target[0].name
    };
    
    try {
      const response = await axios.delete(urlServer+'/delete', { data: paramsApi });
      console.log("ENTROU")

      console.log(response);

      setRefresh(!refresh);
      setAlertType("success");
      setAlertName(response.data);
      setOpen(true);

      closeMessage();

    }
    catch (error) {
      console.log(error)
      setAlertType("error");
      setAlertName('Erro interno, contacte o Administrador');
      setOpen(true);
    }

  }


  React.useEffect(() => {
    const getAudios = async () => {

      try {
        const res = await axios.get(urlServer+"/getAudios" );
        setAudiosFile(res.data)
  
      } catch (ex) {
        setAlertType('error');
        setAlertName('Contacte o Administrador !!!');
        setOpen(true);
        closeMessage();
        console.log(ex);
      }
    }

    getAudios()
  },[refresh])
  
return (

  <MainCard title={audioTitle} >

    <Collapse in={open}>
            <Alert
              variant="filled"
              severity={alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alertName}
            </Alert>
    </Collapse>

    <Stack direction="row" alignItems="center" spacing={2}>
    <label htmlFor="contained-button-file">
      <Input accept="audio/mp3" onChange={saveFile} id="contained-button-file" multiple type="file" />
      <Button variant="contained" component="span" endIcon={<FileUploadIcon />}>
        Upload
      </Button>
    </label>
    <label htmlFor="icon-button-file">
    <Button variant="contained" onClick={uploadFile}  endIcon={<SendIcon />}>
        Enviar
      </Button>
    </label>
    {!fileName ? '':<IFrameWrapper width="100%" src={'http://localhost:3005/audio/'+fileName} />}
  </Stack>
  
  {Object.entries(audiosFile).map(([audiosName, _]) => (

    <FormControl key={audiosName} onSubmit={handleSubmit}  sx={{ minWidth: 40 }}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '25ch' },
        '& .MuiButton-root': { width: '20ch' },
        '& .MuiSelect-root': { width: '25ch' },
        '& .MuiList-root': { width: '80ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <List dense sx={{ display: 'block' }}>
        <Divider />
        <ListItem
          secondaryAction={
            <IconButton type="submit" edge="end" aria-label="delete" name={audiosName}  onClick={() => handleSubmit} >
              <DeleteIcon />
              
            </IconButton>
          }
        >
          <IconButton  name={audiosName} value ={audiosName} onClick={() => handleClickPlayAudio(audiosName)} >
            <PlayCircleFilledWhiteIcon  /> 
          </IconButton>

          <ListItemAvatar > <LibraryMusicIcon /></ListItemAvatar>
          
          <ListItemText primary={audiosName} />
        </ListItem>
      </List>
      {/* <span>{playAudio}</span> */}
    </Box>

    </FormControl>


    ))}
    
</MainCard>



);
};

export default Uploads;
