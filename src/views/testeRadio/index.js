// assets
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import { Card } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useRef, useState } from "react";
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import mp3_file_1 from '../../audiosRadio/Anomalous Hedges - The Mini Vandals.mp3';
// import mp3_file_2 from '../../audiosRadio/Running Errands - TrackTribe.mp3';
// import mp3_file_3 from '../../audiosRadio/To Loom Is to Love - The Mini Vandals.mp3';
// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
    height: 'calc(100vh - 210px)',
    border: '1px solid',
    borderColor: theme.palette.primary.light

}));

// =============================|| RADIO ||============================= //

export default function TesteRadio () {

    const audioPlayer = useRef();
    const [currentTime, setCurrentTime] = useState(0);
    const [seekValue, setSeekValue] = useState(0);
    const [valueVolume, setVolume] = useState(0.5);
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = React.useState('warning');
    const [alertName, setAlertName] = React.useState('');
    const [token, setToken] = useState("");


    const CLIENT_ID = "d16141272a964643b5d55e71ea6d992c"
    const REDIRECT_URI = "http://localhost:3000/radio/testeRadio"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"



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
        
        console.log(valueVolume)
        
        if(valueVolume >= '0.99'){
            setAlertType("success")
            setAlertName('Volume máximo')
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
        }else{
            setVolume(valueVolume + volume);
            audioPlayer.current.volume = valueVolume;
        }



    }; 
    const setVolumeLess = (volume) => {

        if(valueVolume <= '0.1'){
            setAlertType("success")
            setAlertName('Volume mínimo')
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
        }else{
            console.log(valueVolume)
            setVolume(valueVolume - volume);
            audioPlayer.current.volume = valueVolume;
        }
    }; 

    
    const onPlaying = () => {
        setCurrentTime(audioPlayer.current.currentTime);
        setSeekValue( ((audioPlayer.current.currentTime / audioPlayer.current.duration) * 100)  );
      };


      const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }
    
    const playSpotify = async (token) => {

      console.log(token)
      console.log('AGORA')

      const {data} = await axios.put("https://api.spotify.com/v1/me/player/play", {
          headers: {
              Authorization: `Bearer ${token}`

          },

          data: {
            "context_uri": "https://open.spotify.com/embed/album/5WCVs6FJvyIH9Zr0ZVGmge?utm_source=generator",
            "offset": {
              "position": 5
            },
            "position_ms": 0
          }
          // ,
          // params: {
          //     q: searchKey,
          //     type: "artist"
          // }
      })
  
     console.log(data)
  }
  


   // let n = 0;

    // simulateClick = (e)=> {
    //     e.click()
    //   }

    // const runSound = async () => {

    //     window.setInterval(function(){

            
    //         console.log(n);
    //         document.getElementsByTagName('button')[0].click()
    //         n++;
    //       },6000);

    //    // const myTimeout = setTimeout(myGreeting, 2000);

    // };

    // runSound();
    
    React.useEffect(() => {

      const hash = window.location.hash
      let token = window.localStorage.getItem("token")
  
      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
          window.location.hash = ""
          window.localStorage.setItem("token", token)
        }
        
        setToken(token)

        // const pressPlayPause = () =>{
        //     document.getElementsByTagName('button')[0].click();
        // }

        console.log(token)



        playSpotify(token || hash)

        // let n = 0;

        // // simulateClick = (e)=> {
        // //     e.click()
        // //   }
        
        // const runSound = async () => {
   
            
        //     window.setInterval(function(){
        //         try {
                    
        //             document.querySelectorAll('button')[0].click()

                   
        //             // const button = document.querySelectorAll('svg').getAttribute("color"); 
        //             // button.setAttribute('class', 'red-txt');
                    
        //             // console.log(button)
        //         } catch (error) {
        //             console.log(error)
        //         }
                
        //         const playRadio = window.setInterval(function(){
        //             play()
        //             console.log('p' +  n);
    
        //             n++;
        //           },6000);



        //         clearInterval(playRadio)
        //         //pause()
        //         //newVolume()
        //         document.getElementsByTagName('button')[0].click()
        //         console.log('s' + n);
 
        //         n++;
        //       },6000);


        // };
    
        // runSound();
    

      }, []);


    
    return(

        <MainCard title="Radio" secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link='https://open.spotify.com/embed/album/5WCVs6FJvyIH9Zr0ZVGmge?utm_source=generator' />}>
           
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

      {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
        : <button onClick={logout}>Logout</button>}


           
           
            <Card sx={{ overflow: 'hidden' }}>
                
           

                <audio
                src={mp3_file_1}
                ref={audioPlayer}
                onTimeUpdate={onPlaying}
                
            >
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
                    const seekto = audioPlayer.current.duration * (+e.target.value / 100);
                    audioPlayer.current.currentTime = seekto;
                    setSeekValue(e.target.value);
                    }}
                />
                <Stack spacing={2} direction="row">
             
                    <Button  variant="contained" onClick={play}>play</Button >
                    <Button  variant="contained" onClick={pause}>pause</Button >
                    <Button  variant="contained" onClick={stop}>stop</Button >
                    <Button  variant="contained" onClick={() => setSpeed(0.5)}>0.5x</Button >
                    <Button  variant="contained" onClick={() => setSpeed(1)}>1x</Button >
                    <Button  variant="contained" onClick={() => setSpeed(1.5)}>1.5x</Button >
                    <Button  variant="contained" onClick={() => setSpeed(2)}>2x</Button >
                    <Button  variant="contained" onClick={() => setVolumePlus(0.1)}>+</Button >
                    <Button  variant="contained" onClick={() => setVolumeLess(0.1)}>-</Button >
                
                </Stack>

                <IFrameWrapper title="Tabler Icons" width="100%" src='https://open.spotify.com/embed/album/5WCVs6FJvyIH9Zr0ZVGmge?utm_source=generator' />
           
            </Card>
        </MainCard>
    )
};


