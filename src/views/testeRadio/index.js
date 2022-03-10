import { PlaylistPlay } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import StopIcon from '@mui/icons-material/Stop';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { Buffer } from 'buffer/';
import React, { useRef, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { apiSpotify } from '../../services';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'code';

const refreshToken = async () => {
  const { refresh_token } = JSON.parse(window.localStorage.getItem('token'));

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
  });

  const response = await apiSpotify.post(
    'https://accounts.spotify.com/api/token',
    params,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString('base64')}`,
      },
    }
  );

  const { access_token, refresh_token: new_refresh_token } = response.data;

  window.localStorage.setItem(
    'token',
    JSON.stringify({ access_token, refresh_token: new_refresh_token })
  );

  apiSpotify.defaults.headers['Authorization'] = `Bearer ${access_token}`;

  return access_token;
};

apiSpotify.interceptors.response.use(null, async (error) => {
  if (error.response.status === 401) {
    const token = await refreshToken();
    error.config.headers['Authorization'] = `Bearer ${token}`;

    return apiSpotify.request(error.config);
  }

  return Promise.reject(error);
});

export default function TesteRadio() {
  const urlServer = 'http://localhost:3005'

  const audioPlayer = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [valueVolume, setVolume] = useState(0.5);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = React.useState('warning');
  const [alertName, setAlertName] = React.useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistIndex, setSelectedPlayListIndex] = useState(-1);
  const [audio, setAudio] = React.useState("");
  const [time, setTime] = React.useState(30);
  const [audiosFile, setAudiosFile] = useState({});

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


  const handleSwitchingSongs =()=>{
    //selectedPlaylistIndex 
  }
  
  const handleChange = (event) => {
    setAudio(event.target.value);
    console.log(event.target.value)
  };

  const handleChangeTIme = (event) => {
    setTime(event.target.value);
    console.log(event.target.value)
  };


  const play = () => {
    audioPlayer.current.play();
  };

  const pause = () => {
    audioPlayer.current.pause();
  };

  const stop = () => {
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
  };

  const setSpeed = (speed) => {
    audioPlayer.current.playbackRate = speed;
  };

  const setVolumePlus = (volume) => {
    console.log(valueVolume);
    if (valueVolume >= '0.99') {
      setAlertType('success');
      setAlertName('Volume máximo');
      setOpen(true);

      let count = 0;

      const interval = setInterval(() => {
        count++;

        if (count === 2) {
          clearInterval(interval);
          setOpen(false);
        }
      }, 1000);

      return;
    } else {
      setVolume(valueVolume + volume);
      audioPlayer.current.volume = valueVolume;
    }
  };
  
  const setVolumeLess = (volume) => {
    if (valueVolume <= '0.1') {
      setAlertType('success');
      setAlertName('Volume mínimo');
      setOpen(true);

      setVolume(0.0);
      audioPlayer.current.volume = valueVolume;

      let count = 0;

      const interval = setInterval(() => {
        count++;

        if (count === 2) {
          clearInterval(interval);
          setOpen(false);
        }
      }, 1000);
      return;
    } else {
      console.log(valueVolume);
      setVolume(valueVolume - volume);
      audioPlayer.current.volume = valueVolume;
    }
  };

  const onPlaying = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setSeekValue(
      (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
    );
  };

  const logout = () => {
    setIsLogged(false);
    window.localStorage.removeItem('token');
  };

  const handleClickPlayList = (index, uri) => async () => {
    const {
      data: { devices },
    } = await apiSpotify.get('/me/player/devices');

    const filteredDevices = devices.filter(({ type }) => type === 'Computer');

    if (!filteredDevices.length) {
      return;
    }

    setSelectedPlayListIndex(index);

    const { id } = filteredDevices[0];

    await apiSpotify.put(`/me/player/play?device_id=${id}`, {
      context_uri: uri,
    });
  };

  React.useEffect(() => {
    const search = window.location.search;
    const token = JSON.parse(window.localStorage.getItem('token'));

    if (token) {
      setIsLogged(true);
      apiSpotify.defaults.headers[
        'Authorization'
      ] = `Bearer ${token.access_token}`;
      return;
    }

    if (search) {
      const code = new URLSearchParams(search.substring(1)).get('code');

      const fetchToken = async () => {
        const params = new URLSearchParams({
          code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        });

        const response = await apiSpotify.post(
          'https://accounts.spotify.com/api/token',
          params,
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${CLIENT_ID}:${CLIENT_SECRET}`
              ).toString('base64')}`,
            },
          }
        );

        const { access_token, refresh_token } = response.data;

        apiSpotify.defaults.headers['Authorization'] = `Bearer ${access_token}`;

        window.localStorage.setItem(
          'token',
          JSON.stringify({ access_token, refresh_token })
        );

        setIsLogged(true);

        window.location.search = '';
      };

      fetchToken();

    }

  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(event)

  }  

  React.useEffect(() => {
    const fetchData = async () => {
      const [
        { data },
        {
          data: { context },
        },
      ] = await Promise.all([
        apiSpotify.get('/me/playlists'),
        apiSpotify.get('/me/player/currently-playing'),
      ]);

      const playlists = data.items.map(({ id, name, uri }) => ({
        id,
        name,
        uri,
      }));

      const currentPlayListIndex = context
        ? playlists.findIndex(({ uri }) => uri === context.uri)
        : -1;

      setPlaylists(playlists);
      setSelectedPlayListIndex(currentPlayListIndex);
    };

    if (isLogged) {
      fetchData();
      return;
    }

    setPlaylists([]);
    setSelectedPlayListIndex(-1);
  }, [isLogged]);

  React.useEffect(() => {
    const getAudios = async () => {
      
      try {
        const res = await axios.get(urlServer+"/getAudios" );
        setAudiosFile(res.data);
        setAudio(Object.keys(res.data)[0]);
        stop();
  
      } catch (ex) {
        setAlertType('error');
        setAlertName('Contacte o Administrador !!!');
        setOpen(true);
        closeMessage();
        console.log(ex);
      }
    }

    getAudios();
    
    if (isLogged) {
      getAudios();
      return;
    }
    
  },[]);

  React.useEffect(() => { 
  }, [audio]); 

  return (
    <MainCard
      title="Radio Eleva"
      secondary=
        {!isLogged ?(

        <IconButton color="primary" aria-label="Loggin Spotify"  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-read-collaborative playlist-read-private user-read-playback-state user-modify-playback-state`}>
          <SettingsPowerIcon />
        </IconButton>
        ) : (
        <IconButton color="primary" onClick={logout} title= "Logout Spotify" aria-label="Logout Spotify">
          <LogoutIcon />
        </IconButton>
        )}
    >
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

      <Card sx={{ overflow: 'hidden' }}>

        <audio ref={audioPlayer} src={urlServer+'/audio/'+audio} autoPlay onTimeUpdate={onPlaying}/>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={seekValue}
          onChange={(e) => {
            const seekto =
              audioPlayer.current.duration * (+e.target.value / 100);
            audioPlayer.current.currentTime = seekto;
            setSeekValue(e.target.value);
          }}
        />

        <Stack spacing={1} direction="row">
          <IconButton aria-label="less" title='Abaixar volume' onClick={() => setVolumeLess(0.1)}>
            <VolumeDownIcon />
          </IconButton>

          <IconButton aria-label="play" title='play' onClick={play}>
            <PlayCircleFilledWhiteIcon />
          </IconButton>

          <IconButton aria-label="pause" title='pause' onClick={pause}>
            <PauseCircleIcon />
          </IconButton>

          <IconButton aria-label="stop" title='stop' onClick={stop}>
            <StopIcon />
          </IconButton>

          <IconButton aria-label="plus" title='Aumentar volume' onClick={() => setVolumePlus(0.1)}>
            <VolumeUpIcon />
          </IconButton>
        </Stack>


        <Stack spacing={2} direction="row" sx={{ m: 1, minWidth: 180 }}>
      {/* <FormControl onSubmit={handleSubmit} sx={{ m: 1, minWidth: 180 }}> */}
        <InputLabel id="demo-simple-select-label" 
                 sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                  '& .MuiButton-root': { m: 1, width: '20ch' },
                  '& .MuiInputLabel-root': { m: 1, width: '60ch' },
                }}
        
        >Áudios:</InputLabel>

        <Select
          labelId="audio"
          id="id_audio"
          value={audio}
          label="Audio"
          onChange={handleChange}
        >
        {Object.entries(audiosFile).map(([audioKey, _]) => (
          <MenuItem key ={audioKey} value={audioKey}>{audioKey}</MenuItem>
        ))}

        </Select>

        <InputLabel id="id_time">Tempo:</InputLabel>
        <Select
          labelId="time"
          id="time"
          value={time}
          label="time"
          onChange={handleChangeTIme}
        >
          <MenuItem value={20}>20 Minutos</MenuItem>
          <MenuItem value={30}>30 Minutos</MenuItem>
          <MenuItem value={40}>40 Minutos</MenuItem>
          <MenuItem value={60}>1 Hora</MenuItem>
        </Select>
      {/* </FormControl> */}
      </Stack>

        <List>
          {playlists.map(({ id, name, uri }, index) => (
            <ListItemButton
              key={id}
              selected={selectedPlaylistIndex === index}
              onClick={handleClickPlayList(index, uri)}
            >
              <ListItemIcon>
                <PlaylistPlay />
              </ListItemIcon>

              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </List>
      </Card>
    </MainCard>
  );
}
