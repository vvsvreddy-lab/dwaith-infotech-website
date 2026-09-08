import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Button, Box, IconButton,
  Drawer, List, ListItem, ListItemText,
  useMediaQuery, useTheme, Container, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoIcon from '../assets/logo-icon.png';
import { keyframes } from '@mui/system';

const shimmer = keyframes`0%{background-position:-200% center}100%{background-position:200% center}`;
const glow = keyframes`0%,100%{box-shadow:0 0 10px rgba(255,140,0,0.3)}50%{box-shadow:0 0 30px rgba(255,140,0,0.8)}`;

const ORANGE = "#FF8C00";
const DARK_ORANGE = "#E65100";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home',     path: '/' },
    { name: 'About',    path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Training', path: '/training' },
    { name: 'Contact',  path: '/contact' },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          background: '#ffffff',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,140,0,0.15)'
            : '1px solid rgba(255,140,0,0.08)',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>

            {/* ── Logo + Company Name ── */}
            <Box
              onClick={handleLogoClick}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                textDecoration: 'none', cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              {/* Clean icon only - no background box */}
              <img
                src={LogoIcon}
                style={{ height: '52px', width: '52px', objectFit: 'contain', pointerEvents: 'none' }}
                alt="Dwaith Icon"
              />
              {/* Company name styled like Image 3 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1, pointerEvents: 'none' }}>
                <Typography sx={{
                  fontFamily: '"Rajdhani", "Arial Black", sans-serif',
                  fontWeight: 900, fontSize: '1.6rem', letterSpacing: '0.08em',
                  color: '#0D1B4B', lineHeight: 1,
                }}>
                  DWAITH
                </Typography>
                <Typography sx={{
                  fontFamily: '"Rajdhani", "Inter", sans-serif',
                  fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.22em',
                  color: ORANGE, textTransform: 'uppercase', lineHeight: 1.2,
                }}>
                  INFOTECH INC
                </Typography>
                <Typography sx={{
                  fontFamily: '"Inter", sans-serif', fontWeight: 400,
                  fontSize: '0.48rem', letterSpacing: '0.18em',
                  color: '#9E9E9E', textTransform: 'uppercase',
                }}>
                  TECHNOLOGY · INNOVATION · SOLUTIONS
                </Typography>
              </Box>
            </Box>

            {/* ── Desktop Nav ── */}
            {!isMobile ? (
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.name}
                    component={Link} to={item.path}
                    sx={{
                      color: location.pathname === item.path ? ORANGE : '#37474F',
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      px: 2, fontSize: '0.9rem',
                      position: 'relative',
                      '&::after': {
                        content: '""', position: 'absolute',
                        bottom: 8, left: '50%', transform: 'translateX(-50%)',
                        width: location.pathname === item.path ? '60%' : '0%',
                        height: '3px',
                        background: `linear-gradient(90deg, ${DARK_ORANGE}, ${ORANGE})`,
                        borderRadius: '3px', transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        color: ORANGE,
                        bgcolor: 'rgba(255,140,0,0.05)',
                        '&::after': { width: '60%' },
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
                <Button
                  component={Link} to="/contact"
                  variant="contained"
                  sx={{
                    ml: 2, px: 3, py: 1, fontWeight: 700, borderRadius: '50px',
                    background: `linear-gradient(135deg, ${DARK_ORANGE} 0%, ${ORANGE} 100%)`,
                    boxShadow: `0 4px 14px rgba(255,140,0,0.4)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, #BF360C 0%, ${DARK_ORANGE} 100%)`,
                      boxShadow: `0 6px 20px rgba(255,140,0,0.6)`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            ) : (
              <IconButton sx={{ color: ORANGE }} onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <List sx={{ width: 260, pt: 4 }}>
          {menuItems.map((item) => (
            <ListItem
              button key={item.name}
              component={Link} to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                py: 2,
                borderLeft: location.pathname === item.path
                  ? `3px solid ${ORANGE}`
                  : '3px solid transparent',
                '&:hover': { bgcolor: 'rgba(255,140,0,0.06)' },
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  color: location.pathname === item.path ? ORANGE : '#37474F',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
