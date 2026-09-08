import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LogoIcon from "../assets/logo-icon.png";
import { keyframes } from "@mui/system";

const ORANGE = "#FF8C00";
const DARK_ORANGE = "#E65100";

const float = keyframes`0%,100%{transform:translateY(0px)}50%{transform:translateY(-12px)}`;
const pulse = keyframes`0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}`;
const rotate = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;
const dash = keyframes`0%{stroke-dashoffset:1000}100%{stroke-dashoffset:0}`;
const glow = keyframes`0%,100%{filter:drop-shadow(0 0 4px rgba(255,140,0,0.4))}50%{filter:drop-shadow(0 0 12px rgba(255,140,0,0.9))}`;
const floatParticle = keyframes`0%{transform:translateY(0px) translateX(0px);opacity:0.8}50%{transform:translateY(-20px) translateX(10px);opacity:1}100%{transform:translateY(0px) translateX(0px);opacity:0.8}`;

// 3D Tech Tree SVG Component
const TechTree3D = () => (
  <Box sx={{
    width: "100%", maxWidth: 420, mx: "auto",
    animation: `${float} 6s ease-in-out infinite`,
    filter: "drop-shadow(0 20px 40px rgba(255,140,0,0.3))",
  }}>
    <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      <defs>
        {/* Gradients */}
        <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a0800" />
          <stop offset="40%" stopColor={ORANGE} />
          <stop offset="100%" stopColor={DARK_ORANGE} />
        </linearGradient>
        <linearGradient id="branchGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={DARK_ORANGE} />
          <stop offset="100%" stopColor="#FFD54F" />
        </linearGradient>
        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ORANGE} stopOpacity="0.8" />
          <stop offset="100%" stopColor={DARK_ORANGE} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1565C0" />
          <stop offset="100%" stopColor="#42A5F5" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD54F" stopOpacity="1" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
        </radialGradient>
        <filter id="glow3d">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="200" cy="465" rx="120" ry="12" fill="rgba(255,140,0,0.15)" />

      {/* Main trunk - 3D effect */}
      <path d="M185,440 Q190,360 195,280 Q198,220 200,160" stroke="url(#trunkGrad)" strokeWidth="18" fill="none" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 8px rgba(255,140,0,0.5))" }} />
      {/* Trunk highlight */}
      <path d="M188,440 Q193,360 198,280 Q201,220 203,160" stroke="rgba(255,213,79,0.3)" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Main curve branch (like the original) */}
      <path d="M200,300 Q160,240 120,180 Q80,120 100,60 Q120,20 160,10 Q200,0 230,20 Q260,40 250,80" stroke="url(#branchGrad)" strokeWidth="14" fill="none" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px rgba(255,140,0,0.6))" }} />
      {/* Branch highlight */}
      <path d="M202,298 Q162,238 122,178 Q82,118 102,58" stroke="rgba(255,213,79,0.25)" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Sub branches */}
      <path d="M170,200 Q140,170 110,150" stroke={ORANGE} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M150,250 Q115,235 90,220" stroke={ORANGE} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M220,180 Q250,160 270,140" stroke="#FFB74D" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M230,230 Q265,215 285,200" stroke="#FFB74D" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M190,350 Q155,340 130,330" stroke={ORANGE} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M195,390 Q160,385 135,375" stroke={ORANGE} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Circuit board pattern nodes */}
      {[
        { cx: 200, cy: 160, r: 10, color: "#FFD54F", delay: "0s" },
        { cx: 120, cy: 180, r: 8,  color: ORANGE,    delay: "0.5s" },
        { cx: 100, cy: 60,  r: 12, color: "#FFD54F", delay: "1s" },
        { cx: 160, cy: 10,  r: 7,  color: ORANGE,    delay: "1.5s" },
        { cx: 230, cy: 20,  r: 8,  color: "#FFD54F", delay: "0.8s" },
        { cx: 250, cy: 80,  r: 7,  color: ORANGE,    delay: "0.3s" },
        { cx: 110, cy: 150, r: 6,  color: "#FFB74D", delay: "1.2s" },
        { cx: 90,  cy: 220, r: 6,  color: "#FFB74D", delay: "0.7s" },
        { cx: 270, cy: 140, r: 6,  color: "#FFB74D", delay: "0.9s" },
        { cx: 285, cy: 200, r: 5,  color: ORANGE,    delay: "1.4s" },
        { cx: 130, cy: 330, r: 5,  color: "#FFB74D", delay: "0.4s" },
        { cx: 135, cy: 375, r: 5,  color: ORANGE,    delay: "1.1s" },
      ].map((n, i) => (
        <g key={i}>
          {/* Glow circle */}
          <circle cx={n.cx} cy={n.cy} r={n.r * 2.5} fill={n.color} opacity="0.1" />
          {/* Main node */}
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color}
            style={{ animation: `${pulse} ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: n.delay,
              filter: `drop-shadow(0 0 6px ${n.color})` }} />
          {/* Inner highlight */}
          <circle cx={n.cx - n.r * 0.3} cy={n.cy - n.r * 0.3} r={n.r * 0.4} fill="rgba(255,255,255,0.5)" />
        </g>
      ))}

      {/* Floating particles */}
      {[
        { x: 80, y: 100, size: 4, delay: "0s", dur: "3s" },
        { x: 300, y: 80, size: 3, delay: "1s", dur: "4s" },
        { x: 60, y: 280, size: 3, delay: "2s", dur: "3.5s" },
        { x: 320, y: 250, size: 4, delay: "0.5s", dur: "5s" },
        { x: 150, y: 420, size: 3, delay: "1.5s", dur: "4s" },
        { x: 280, y: 350, size: 3, delay: "2.5s", dur: "3s" },
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.size} fill={ORANGE} opacity="0.6"
          style={{ animation: `${floatParticle} ${p.dur} ease-in-out infinite`, animationDelay: p.delay,
            filter: `drop-shadow(0 0 4px ${ORANGE})` }} />
      ))}

      {/* 3D Gear wheels at base */}
      <g transform="translate(120, 410)">
        {/* Outer gear */}
        <circle cx="0" cy="0" r="32" fill="none" stroke={ORANGE} strokeWidth="3"
          strokeDasharray="8 4" style={{ animation: `${rotate} 8s linear infinite`,
            filter: `drop-shadow(0 0 6px ${ORANGE})` }} />
        <circle cx="0" cy="0" r="22" fill="#1a0800" stroke="#FFB74D" strokeWidth="2" />
        <circle cx="0" cy="0" r="10" fill={ORANGE} style={{ filter: `drop-shadow(0 0 8px ${ORANGE})` }} />
        {/* Gear teeth */}
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <rect key={i} x="-4" y="-36" width="8" height="10" rx="2" fill={ORANGE}
            transform={`rotate(${angle})`} opacity="0.9" />
        ))}
        {/* Inner circle */}
        <circle cx="0" cy="0" r="5" fill="#FFD54F" />
      </g>

      {/* Second gear */}
      <g transform="translate(270, 415)">
        <circle cx="0" cy="0" r="24" fill="none" stroke="#FFB74D" strokeWidth="3"
          strokeDasharray="6 3" style={{ animation: `${rotate} 6s linear infinite reverse`,
            filter: `drop-shadow(0 0 5px #FFB74D)` }} />
        <circle cx="0" cy="0" r="16" fill="#1a0800" stroke={ORANGE} strokeWidth="2" />
        <circle cx="0" cy="0" r="8" fill="#FFB74D" style={{ filter: `drop-shadow(0 0 6px #FFB74D)` }} />
        {[0,60,120,180,240,300].map((angle, i) => (
          <rect key={i} x="-3" y="-27" width="6" height="8" rx="2" fill="#FFB74D"
            transform={`rotate(${angle})`} opacity="0.9" />
        ))}
        <circle cx="0" cy="0" r="4" fill={ORANGE} />
      </g>

      {/* Connecting axle */}
      <line x1="152" y1="410" x2="246" y2="415" stroke={ORANGE} strokeWidth="3"
        strokeDasharray="4 3" opacity="0.6" />

      {/* Data flow lines (circuit) */}
      <path d="M200,160 L200,120 L240,120 L240,90" stroke="#FFD54F" strokeWidth="1.5"
        fill="none" strokeDasharray="4 3" opacity="0.5" />
      <path d="M120,180 L80,180 L80,140" stroke={ORANGE} strokeWidth="1.5"
        fill="none" strokeDasharray="4 3" opacity="0.4" />

      {/* Floating tech icons */}
      {/* AI chip */}
      <g transform="translate(310, 120)" opacity="0.85"
        style={{ animation: `${float} 4s ease-in-out infinite`, animationDelay: "0.5s" }}>
        <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#1a0800"
          stroke={ORANGE} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 6px ${ORANGE})` }} />
        <rect x="-10" y="-10" width="20" height="20" rx="3" fill={ORANGE} opacity="0.3" />
        <text x="0" y="5" textAnchor="middle" fill={ORANGE} fontSize="12" fontWeight="bold">AI</text>
        {[[-18,-6],[18,-6],[-6,-18],[-6,18],[6,-18],[6,18]].map(([dx,dy],i) => (
          <rect key={i} x={dx-3} y={dy-3} width="6" height="6" rx="1" fill={ORANGE} opacity="0.8" />
        ))}
      </g>

      {/* Network icon */}
      <g transform="translate(55, 160)" opacity="0.8"
        style={{ animation: `${float} 5s ease-in-out infinite`, animationDelay: "1s" }}>
        <circle cx="0" cy="0" r="16" fill="#1a0800" stroke="#FFB74D" strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 5px #FFB74D)` }} />
        <circle cx="0" cy="-6" r="3" fill="#FFB74D" />
        <circle cx="-6" cy="4" r="3" fill="#FFB74D" />
        <circle cx="6" cy="4" r="3" fill="#FFB74D" />
        <line x1="0" y1="-3" x2="-5" y2="3" stroke="#FFB74D" strokeWidth="1" />
        <line x1="0" y1="-3" x2="5" y2="3" stroke="#FFB74D" strokeWidth="1" />
      </g>

      {/* Label */}
      <text x="200" y="460" textAnchor="middle" fill="rgba(255,140,0,0.5)"
        fontSize="11" fontWeight="600" letterSpacing="3">TECHNOLOGY · INNOVATION</text>
    </svg>
  </Box>
);

export default function Footer() {
  return (
    <Box component="footer" sx={{
      background: "linear-gradient(135deg, #0a0a1a 0%, #1a0800 50%, #0a0a1a 100%)",
      color: "white", pt: 8, pb: 4,
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">

          {/* 3D Tree Art */}
          <Grid item xs={12} md={4}>
            <TechTree3D />
            <Typography sx={{ textAlign: "center", color: "rgba(255,140,0,0.5)",
              fontSize: "0.75rem", letterSpacing: "0.2em", mt: 1 }}>
              Ideas in Motion
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: ORANGE,
                  fontSize: "0.85rem", letterSpacing: "0.1em" }}>SERVICES</Typography>
                {["AI Solutions", "Application Dev", "Consulting", "Business Intelligence", "Data & Analytics"].map((s) => (
                  <Typography key={s} component={Link} to="/services"
                    sx={{ display: "block", mb: 1, color: "rgba(255,255,255,0.65)",
                      fontSize: "0.82rem", textDecoration: "none",
                      transition: "all 0.2s", "&:hover": { color: ORANGE, paddingLeft: "6px" } }}>
                    › {s}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: ORANGE,
                  fontSize: "0.85rem", letterSpacing: "0.1em" }}>COMPANY</Typography>
                {[["About", "/about"], ["Services", "/services"], ["Training", "/training"], ["Contact", "/contact"]].map(([label, path]) => (
                  <Typography key={label} component={Link} to={path}
                    sx={{ display: "block", mb: 1, color: "rgba(255,255,255,0.65)",
                      fontSize: "0.82rem", textDecoration: "none",
                      transition: "all 0.2s", "&:hover": { color: ORANGE, paddingLeft: "6px" } }}>
                    › {label}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <img src={LogoIcon} style={{ height: "40px", objectFit: "contain" }} alt="Dwaith" />
              <Box>
                <Typography sx={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 900,
                  fontSize: "1.2rem",
                  background: `linear-gradient(135deg, ${DARK_ORANGE}, ${ORANGE})`,
                  backgroundClip: "text", WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent" }}>DWAITH</Typography>
                <Typography sx={{ fontSize: "0.55rem", letterSpacing: "0.15em",
                  color: "#888", textTransform: "uppercase" }}>Infotech Inc</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.65, mb: 2, lineHeight: 1.7, fontSize: "0.82rem" }}>
              Pushing boundaries with AI and Technology. Merging innovation with impactful solutions.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5, fontSize: "0.82rem" }}>📍 3415 Cluster Road Suite 141</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5, fontSize: "0.82rem" }}>Plano, TX, USA</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5, fontSize: "0.82rem" }}>📧 info@dwaithinc.com</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 2, fontSize: "0.82rem" }}>📞 +1 (945) 369-8417</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[<FacebookIcon />, <TwitterIcon />, <LinkedInIcon />, <InstagramIcon />].map((icon, i) => (
                <IconButton key={i} size="small" sx={{ color: "white",
                  bgcolor: "rgba(255,140,0,0.15)", border: "1px solid rgba(255,140,0,0.2)",
                  "&:hover": { bgcolor: "rgba(255,140,0,0.3)", transform: "translateY(-4px)" } }}>
                  {icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: "1px solid rgba(255,140,0,0.12)", mt: 4, pt: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ opacity: 0.5, fontSize: "0.78rem" }}>
            © {new Date().getFullYear()} Dwaith Infotech Inc. All rights reserved. · Technology · Innovation · Solutions
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
