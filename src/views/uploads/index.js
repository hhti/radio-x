// material-ui
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
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
import React, { useRef, useState } from 'react';
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
  borderColor: theme.palette.primary.light,
}));
// ==============================|| UPLOADS ||============================== //

const Uploads = () => {
  const urlServer = 'http://localhost:3005';

  const audioPlayer = useRef();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [audiosFile, setAudiosFile] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertName, setAlertName] = React.useState('');
  const [alertType, setAlertType] = React.useState('warning');
  const [refresh, setRefresh] = React.useState(false);
  const [audioTitle, setAudioTitle] = useState('Gestão de áudio');

  const closeMessage = () => {
    let count = 0;

    const interval = setInterval(() => {
      count++;

      if (count === 2) {
        clearInterval(interval);
        setOpen(false);
      }
    }, 2000);
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const res = await axios.post(urlServer + '/upload', formData);
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

  const pause = async () => {
    await audioPlayer.current.pause();
  };

  const stop = async () => {
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
  };

  React.useEffect(() => {}, [fileName]);

  const handleClickPlayAudio = (audioName) => {
    setFileName(audioName);

    setAudioTitle('Gestão de áudio, você está ouvindo agora:  ' + audioName);
    audioPlayer.current.play();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paramsApi = {
      audioName: event.target[0].name,
    };

    try {
      const response = await axios.delete(urlServer + '/delete', {
        data: paramsApi,
      });
      setRefresh(!refresh);
      setAlertType('success');
      setAlertName(response.data);
      setOpen(true);

      closeMessage();
    } catch (error) {
      console.log(error);
      setAlertType('error');
      setAlertName('Erro interno, contacte o Administrador');
      setOpen(true);
    }
  };

  React.useEffect(() => {
    const getAudios = async () => {
      try {
        const {
          data: { audios },
        } = await axios.get(urlServer + '/getAudios');
        setAudiosFile(audios);
      } catch (ex) {
        setAlertType('error');
        setAlertName('Contacte o Administrador !!!');
        setOpen(true);
        closeMessage();
        console.log(ex);
      }
    };

    getAudios();
  }, [refresh]);

  return (
    <MainCard title={audioTitle}>
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
          <Input
            accept="audio/mp3"
            onChange={saveFile}
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button
            variant="contained"
            component="span"
            endIcon={<FileUploadIcon />}
          >
            Upload
          </Button>
        </label>
        <label htmlFor="icon-button-file">
          <Button
            variant="contained"
            onClick={uploadFile}
            endIcon={<SendIcon />}
          >
            Enviar
          </Button>
        </label>

        <audio
          ref={audioPlayer}
          src={'http://localhost:3005/audio/' + fileName}
          controls
          autoPlay
        />
      </Stack>

      {audiosFile.map((audio) => (
        <FormControl key={audio} onSubmit={handleSubmit} sx={{ minWidth: 40 }}>
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
                  <IconButton
                    type="submit"
                    edge="end"
                    aria-label="delete"
                    name={audio}
                    onClick={() => handleSubmit}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <IconButton
                  name={audio}
                  value={audio}
                  onClick={() => handleClickPlayAudio(audio)}
                >
                  <PlayCircleFilledWhiteIcon />
                </IconButton>

                <IconButton name={audio} value={audio} onClick={() => pause()}>
                  <PauseIcon />
                </IconButton>

                <IconButton name={audio} value={audio} onClick={() => stop()}>
                  <StopIcon />
                </IconButton>

                <ListItemAvatar>
                  {' '}
                  <LibraryMusicIcon />
                </ListItemAvatar>

                <ListItemText primary={audio} />
              </ListItem>
            </List>
          </Box>
        </FormControl>
      ))}
    </MainCard>
  );
};

export default Uploads;
