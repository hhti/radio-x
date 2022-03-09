import { PlaylistPlay } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import {
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { Buffer } from 'buffer/';
import React, { useRef, useState } from 'react';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
// import mp3_file_1 from '../../audiosRadio/Anomalous Hedges - The Mini Vandals.mp3';

// const CLIENT_ID = '559b706675da46a088b20c69f8b36e61';
// const CLIENT_SECRET = 'c080da0fdc0d44ed88e775c40168ebde';
const CLIENT_ID = 'd16141272a964643b5d55e71ea6d992c';
const CLIENT_SECRET = 'bbb152370c624c9bbdd10f1fbf27d979';
const REDIRECT_URI = 'http://localhost:3000/testeRadio';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'code';

const refreshToken = async () => {
  const { refresh_token } = JSON.parse(window.localStorage.getItem('token'));

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token
  });

  const response = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: { 
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`
    }
  });

  const { access_token, refresh_token: new_refresh_token } = response.data;

  window.localStorage.setItem('token', JSON.stringify({ access_token, refresh_token: new_refresh_token }));

  axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;

  return access_token;
}

axios.interceptors.response.use(null, async (error) => {
  if(error.response.status === 401) {
    const token = await refreshToken();
    error.config.headers['Authorization'] = `Bearer ${token}`;
    
    return axios.request(error.config);
  }

  return Promise.reject(error);
});

export default function TesteRadio() {
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
    setSelectedPlayListIndex(index);

    await axios.put('https://api.spotify.com/v1/me/player/play', {
      context_uri: uri,
    });
  };

  React.useEffect(() => {
    const search = window.location.search;
    const token = JSON.parse(window.localStorage.getItem('token'));

    if (token) {
      setIsLogged(true);
      axios.defaults.headers['Authorization'] = `Bearer ${token.access_token}`;
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

        const response = await axios.post(
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

        axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;

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

  React.useEffect(() => {
    const fetchData = async () => {
      const [
        { data },
        {
          data: { context },
        },
      ] = await Promise.all([
        axios.get('https://api.spotify.com/v1/me/playlists'),
        axios.get('https://api.spotify.com/v1/me/player/currently-playing'),
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
    }

    setPlaylists([]);
    setSelectedPlayListIndex(-1);
  }, [isLogged]);

  return (
    <MainCard
      title="Radio"
      secondary={
        <SecondaryAction
          icon={<LinkIcon fontSize="small" />}
          link="https://open.spotify.com/embed/album/5WCVs6FJvyIH9Zr0ZVGmge?utm_source=generator"
        />
      }
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

      {!isLogged ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-read-collaborative playlist-read-private user-read-playback-state user-modify-playback-state`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      <Card sx={{ overflow: 'hidden' }}>
        {/* <audio src={mp3_file_1} ref={audioPlayer} onTimeUpdate={onPlaying}> */}
        <audio src='' ref={audioPlayer} onTimeUpdate={onPlaying}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>

        {/* <p>{currentTime}</p> */}
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
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={play}>
            play
          </Button>
          <Button variant="contained" onClick={pause}>
            pause
          </Button>
          <Button variant="contained" onClick={stop}>
            stop
          </Button>
          <Button variant="contained" onClick={() => setSpeed(0.5)}>
            0.5x
          </Button>
          <Button variant="contained" onClick={() => setSpeed(1)}>
            1x
          </Button>
          <Button variant="contained" onClick={() => setSpeed(1.5)}>
            1.5x
          </Button>
          <Button variant="contained" onClick={() => setSpeed(2)}>
            2x
          </Button>
          <Button variant="contained" onClick={() => setVolumePlus(0.1)}>
            +
          </Button>
          <Button variant="contained" onClick={() => setVolumeLess(0.1)}>
            -
          </Button>
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
