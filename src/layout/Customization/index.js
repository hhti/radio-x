// material-ui
import { useTheme } from '@mui/material/styles';
import { IconCamera, IconDeviceLaptop, IconMaximize } from '@tabler/icons';
import config from 'config';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendLocal } from 'services';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from 'store/actions';

// constant
const icons = { IconCamera, IconMaximize, IconDeviceLaptop };
// concat 'px'
function valueText(value) {
    return `${value}px`;
}

// ==============================|| FERRAMENTAS ATPF ||============================== //

const Customization = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    // state - border radius
    const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
    const handleBorderRadius = (event, newValue) => {
        setBorderRadius(newValue);
    };

    useEffect(() => {
        dispatch({ type: SET_BORDER_RADIUS, borderRadius });
    }, [dispatch, borderRadius]);

    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    // state - font family
    const [fontFamily, setFontFamily] = useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);


    const handleClickScreenButtonHotKey = () => {
        backendLocal
            .get(config.pathBaseUrl + '/executesnippingtoohotkey')
            .then((res) => {
                console.log(res.data);
            });
    }

    const handleClickOpenProgram = () => {
        backendLocal
            .get('/executesnippingtool')
            .then((res) => {
                console.log(res.data);
            });
    }

    const handleClickOpenPromptAtpf = () => {
        backendLocal
            .get('/executeprompt')
            .then((res) => {
                console.log(res.data);
            });
    }



    return (

<></>
        // <>
        //     {/* toggle button */}
        //     <Tooltip title="Ferramentas ATPF">
        //         <Fab
        //             component="div"
        //             onClick={handleToggle}
        //             size="medium"
        //             variant="circular"
        //             color="secondary"
        //             sx={{
        //                 borderRadius: 0,
        //                 borderTopLeftRadius: '50%',
        //                 borderBottomLeftRadius: '50%',
        //                 borderTopRightRadius: '50%',
        //                 borderBottomRightRadius: '4px',
        //                 top: '25%',
        //                 position: 'fixed',
        //                 right: 10,
        //                 zIndex: theme.zIndex.speedDial
        //             }}
        //         >
        //             <AnimateButton type="rotate">
        //                 <IconButton color="inherit" size="large" disableRipple>
        //                     <IconSettings />
        //                 </IconButton>
        //             </AnimateButton>
        //         </Fab>
        //     </Tooltip>

        //     <Drawer
        //         anchor="right"
        //         onClose={handleToggle}
        //         open={open}
        //         PaperProps={{
        //             sx: {
        //                 width: 280
        //             }
        //         }}
        //     >
        //         <PerfectScrollbar component="div">
        //             <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
        //                 <Grid item xs={12}>
        //                     {/* font family */}
        //                     <SubCard title="Configurações Layout ATPF">
        //                         <FormControl>
        //                             <RadioGroup
        //                                 aria-label="font-family"
        //                                 value={fontFamily}
        //                                 onChange={(e) => setFontFamily(e.target.value)}
        //                                 name="row-radio-buttons-group"
        //                             >
        //                                 <FormControlLabel
        //                                     value="Roboto"
        //                                     control={<Radio />}
        //                                     label="Roboto"
        //                                     sx={{
        //                                         '& .MuiSvgIcon-root': { fontSize: 28 },
        //                                         '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
        //                                     }}
        //                                 />
        //                                 <FormControlLabel
        //                                     value="Poppins"
        //                                     control={<Radio />}
        //                                     label="Poppins"
        //                                     sx={{
        //                                         '& .MuiSvgIcon-root': { fontSize: 28 },
        //                                         '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
        //                                     }}
        //                                 />
        //                                 <FormControlLabel
        //                                     value="Inter"
        //                                     control={<Radio />}
        //                                     label="Inter"
        //                                     sx={{
        //                                         '& .MuiSvgIcon-root': { fontSize: 28 },
        //                                         '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
        //                                     }}
        //                                 />
        //                             </RadioGroup>
        //                         </FormControl>
        //                     </SubCard>
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     {/* border radius */}
        //                     <SubCard title="Ferramentas ATPF">
        //                         <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 0.1 }}>

        //                             <Grid item xs>
        //                                 <Tooltip title="Tirar ScreenShot" placement="top-start">
        //                                     <IconButton color="success" aria-label={icons.IconCamera} onClick={handleClickScreenButtonHotKey}>
        //                                         <CameraIcon color="success" fontSize='large' />
        //                                     </IconButton>
        //                                 </Tooltip>

        //                                 <Tooltip title="Acionar Ferramenta de Captura do Windows" placement="top-start">
        //                                     <IconButton aria-label="add an alarm" size="large" sx={{ fontSize: 80 }} onClick={handleClickOpenProgram}>
        //                                         <PhotoCameraIcon color="action" fontSize='large' />
        //                                     </IconButton>
        //                                 </Tooltip>

        //                                 <Tooltip title="Prompt ATPF" placement="top-start">
        //                                     <IconButton color="secondary" aria-label="add an alarm" size="large" sx={{ fontSize: 80 }} onClick={handleClickOpenPromptAtpf}>
        //                                         <ComputerIcon color="secondary" fontSize='large' />
        //                                     </IconButton>
        //                                 </Tooltip>
        //                             </Grid>

        //                         </Grid>
        //                     </SubCard>
        //                 </Grid>
        //             </Grid>
        //         </PerfectScrollbar>
        //     </Drawer>
        // </>
    );
};

export default Customization;
