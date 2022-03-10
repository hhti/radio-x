import CottageIcon from '@mui/icons-material/Cottage';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
// assets
import { IconMoonStars, IconSun } from '@tabler/icons';
import logo from 'assets/images/eleva.png';
import { useEffect, useRef, useState } from 'react';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';


const ProfileSection = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const renderPeriodDay = () => {
    let h = new Date().toLocaleTimeString('pt-BR', {
      hour: 'numeric',
      hour12: false,
    });
    //let h = new Date().getHours();
    switch (true) {
      case h <= 5:
        return 'Boa madrugada';
      case h < 12:
        return 'Bom dia';
      case h < 18:
        return 'Boa tarde';
      default:
        return 'Boa noite';
    }
  };
  const renderIconDay = () => {
    let h = new Date().toLocaleTimeString('pt-BR', {
      hour: 'numeric',
      hour12: false,
    });
    //let h = new Date().getHours();
    switch (true) {
      case h <= 5:
        return <IconMoonStars />;
      case h < 12:
        return <IconSun />;
      case h < 18:
        return <IconSun />;
      default:
        return <IconMoonStars />;
    }
  };

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={logo}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <CottageIcon
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        {renderIconDay()}
                        <Typography variant="h4">
                          {renderPeriodDay()},
                        </Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          academia Eleva
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider />
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: '100%',
                      maxHeight: 'calc(100vh - 250px)',
                      overflowX: 'hidden',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%',
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                          },
                        }}
                      >
                        {/* <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 1}
                                                    onClick={(event) => handleListItemClick(event, 1)}
                                                >
                                                    <ListItemIcon>
                                                        <IconBook stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Grid container spacing={1} justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="body2">Últimos artigos Tech Writers</Typography>
                                                                </Grid>
                         
                                                            </Grid>
                                                        }
                                                    />
                                                </ListItemButton> */}

                        {/* <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 1}
                                                    onClick={(event) => handleClickHelp(event, 1)}
                                                >
                                                    <ListItemIcon>
                                                        <IconMailOpened stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Grid container spacing={1} justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="body2">Abrir um chamado(Portal QA)</Typography>
                                                                </Grid>
                         
                                                            </Grid>
                                                        }
                                                    />
                                                </ListItemButton> */}
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
