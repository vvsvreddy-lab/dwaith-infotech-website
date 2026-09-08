import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography, Button, Grid, Chip, Avatar, Rating } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import GroupsIcon from "@mui/icons-material/Groups";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import CloudIcon from "@mui/icons-material/Cloud";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Logo from "../assets/logo.png";

// ── Keyframes ─────────────────────────────────────────────────────────────────
const gradientShift = keyframes`0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}`;
const float         = keyframes`0%,100%{transform:translateY(0px)}50%{transform:translateY(-18px)}`;
const floatReverse  = keyframes`0%,100%{transform:translateY(0px)}50%{transform:translateY(18px)}`;
const floatX        = keyframes`0%,100%{transform:translateX(0px)}50%{transform:translateX(12px)}`;
const pulse         = keyframes`0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.15);opacity:1}`;
const shimmer       = keyframes`0%{background-position:-200% center}100%{background-position:200% center}`;
const slideInLeft   = keyframes`from{opacity:0;transform:translateX(-80px)}to{opacity:1;transform:translateX(0)}`;
const slideInRight  = keyframes`from{opacity:0;transform:translateX(80px)}to{opacity:1;transform:translateX(0)}`;
const marquee       = keyframes`0%{transform:translateX(0)}100%{transform:translateX(-50%)}`;
const spin          = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;
const spinReverse   = keyframes`from{transform:rotate(360deg)}to{transform:rotate(0deg)}`;
const morphShape    = keyframes`0%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}`;
const glow          = keyframes`0%,100%{box-shadow:0 0 20px rgba(255,140,0,0.4)}50%{box-shadow:0 0 60px rgba(255,140,0,0.9),0 0 100px rgba(255,100,0,0.4)}`;
const blink         = keyframes`0%,100%{opacity:1}50%{opacity:0}`;
const scanLine      = keyframes`0%{top:-100%}100%{top:200%}`;

// ── Brand Colors ──────────────────────────────────────────────────────────────
const ORANGE = "#FF8C00";
const DARK_ORANGE = "#E65100";
const BLUE = "#1565C0";
const DARK_BLUE = "#0D47A1";
const DARK_BG = "#0a0a1a";

// ── Interactive Particle Canvas ───────────────────────────────────────────────
const ParticleCanvas = ({ color = "255,140,0" }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 0.5, opacity: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.opacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color},${0.12 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      particles.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) { p.x += dx * 0.01; p.y += dy * 0.01; }
      });
      animRef.current = requestAnimationFrame(draw);
    };
    const onMouse = e => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouse);
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "all" }} />;
};

// ── Counter ───────────────────────────────────────────────────────────────────
const Counter = ({ target, inView }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const n = parseInt(target.replace(/\D/g, ""));
    let cur = 0; const step = n / 60;
    const t = setInterval(() => { cur = Math.min(cur + step, n); setV(Math.floor(cur)); if (cur >= n) clearInterval(t); }, 33);
    return () => clearInterval(t);
  }, [inView, target]);
  return <>{v}{target.includes("+") ? "+" : target.includes("%") ? "%" : ""}</>;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const CLIENTS = ["BENEFITWALL","TOYOTA","Santander","BRISTLECONE","Fidelity","ATLAS","ORCASO","BLAISSON GROUP","shipium","SGT","Lions Club International","Apex Systems","Eliassen Group","IG Group"];

const SERVICES = [
  { icon: <CodeIcon sx={{ fontSize: 44 }} />, title: "Consulting Services", desc: "Strategic guidance from industry experts to optimize your technology investments and business processes.", tags: ["Digital Roadmap", "Tech Strategy", "Process Optimization", "Advisory"], color: ORANGE },
  { icon: <CloudIcon sx={{ fontSize: 44 }} />, title: "AI-Driven Solutions", desc: "Cutting-edge artificial intelligence and machine learning solutions to automate and transform your business.", tags: ["Voice AI", "ML Models", "Automation", "NLP"], color: BLUE },
  { icon: <GroupsIcon sx={{ fontSize: 44 }} />, title: "Talent & Jobs", desc: "Connect top tech talent with the right opportunities — contract, permanent and remote across all levels.", tags: ["Contract", "Permanent", "Remote", "Screening"], color: ORANGE },
  { icon: <SchoolIcon sx={{ fontSize: 44 }} />, title: "Training Programs", desc: "Industry-leading technology training programs to upskill your workforce for the digital future.", tags: ["Full-Stack", "Cloud", "AI/ML", "Leadership"], color: BLUE },
];

const STATS = [
  { n: "20+", label: "Projects Delivered", icon: <AutoGraphIcon sx={{ fontSize: 32 }} />, color: ORANGE },
  { n: "10+", label: "Happy Clients",       icon: <WorkspacePremiumIcon sx={{ fontSize: 32 }} />, color: BLUE },
  { n: "98%",  label: "Satisfaction Rate",   icon: <TrendingUpIcon sx={{ fontSize: 32 }} />, color: ORANGE },
  { n: "2+",  label: "Years Experience",    icon: <SpeedIcon sx={{ fontSize: 32 }} />, color: BLUE },
];

const TESTIMONIALS = [
  { name: "James Wilson",    pos: "VP Operations, Toyota USA",    av: "JW", text: "Dwaith's consulting team provided exceptional strategic guidance. Their AI-driven approach helped us cut operational costs by 35%." },
  { name: "Priya Sharma",    pos: "Director, Fidelity Investments", av: "PS", text: "The Voice AI solution Dwaith built for us handles 70% of our customer queries automatically. Game changing technology." },
  { name: "Robert Martinez", pos: "CTO, Santander Bank",          av: "RM", text: "Dwaith delivered our digital transformation roadmap on time and under budget. Their team is incredibly professional." },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const { ref: statsRef,        inView: statsInView }        = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: servicesRef,     inView: servicesInView }     = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: ctaRef,          inView: ctaInView }          = useInView({ triggerOnce: true, threshold: 0.1 });

  // Typewriter
  const words = ["AI-Driven Solutions", "Consulting Services", "Voice AI Technology", "Digital Transformation", "Talent & Jobs"];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && displayed.length < word.length) {
        setDisplayed(word.slice(0, displayed.length + 1));
      } else if (deleting && displayed.length > 0) {
        setDisplayed(word.slice(0, displayed.length - 1));
      } else if (!deleting) {
        setTimeout(() => setDeleting(true), 1500);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, wordIdx]);

  return (
    <Box sx={{ overflow: "hidden" }}>

      {/* ═══ HERO ═══ */}
      <Box sx={{
        minHeight: "100vh", position: "relative",
        display: "flex", alignItems: "center", overflow: "hidden",
        background: `linear-gradient(-45deg, ${DARK_BG}, #1a0a00, #1a0500, ${DARK_BG}, #0a0a1a, #1a0800)`,
        backgroundSize: "600% 600%",
        animation: `${gradientShift} 10s ease infinite`,
      }}>
        <ParticleCanvas color="255,140,0" />

        {/* Grid */}
        <Box sx={{ position:"absolute",inset:0,opacity:0.04,
          backgroundImage:"linear-gradient(rgba(255,140,0,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,140,0,0.3) 1px,transparent 1px)",
          backgroundSize:"60px 60px" }} />

        {/* Scan line */}
        <Box sx={{ position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:1 }}>
          <Box sx={{ position:"absolute",left:0,right:0,height:"2px",
            background:"linear-gradient(90deg,transparent,rgba(255,140,0,0.5),transparent)",
            animation:`${scanLine} 6s linear infinite` }} />
        </Box>

        {/* 3D Orbiting rings - right side */}
        <Box sx={{ position:"absolute",top:"50%",right:"6%",transform:"translateY(-50%)",
          width:260,height:260,pointerEvents:"none",zIndex:1 }}>
          <Box sx={{ position:"absolute",inset:0,border:"1px solid rgba(255,140,0,0.25)",
            borderRadius:"50%",animation:`${spin} 20s linear infinite` }}>
            <Box sx={{ position:"absolute",top:-6,left:"50%",transform:"translateX(-50%)",
              width:12,height:12,borderRadius:"50%",bgcolor:ORANGE,
              boxShadow:`0 0 10px ${ORANGE}`,animation:`${pulse} 2s ease-in-out infinite` }} />
          </Box>
          <Box sx={{ position:"absolute",inset:30,border:"1px solid rgba(255,140,0,0.15)",
            borderRadius:"50%",animation:`${spinReverse} 14s linear infinite` }}>
            <Box sx={{ position:"absolute",top:-5,left:"50%",transform:"translateX(-50%)",
              width:10,height:10,borderRadius:"50%",bgcolor:"#FFB74D",
              boxShadow:"0 0 8px #FFB74D" }} />
          </Box>
          <Box sx={{ position:"absolute",inset:60,
            background:`radial-gradient(circle,rgba(255,140,0,0.35),rgba(230,81,0,0.1))`,
            animation:`${morphShape} 8s ease-in-out infinite`,
            boxShadow:`0 0 60px rgba(255,140,0,0.35)` }} />
          <Box sx={{ position:"absolute",inset:95,borderRadius:"50%",
            background:`linear-gradient(135deg,${ORANGE},${DARK_ORANGE})`,
            boxShadow:`0 0 40px rgba(255,140,0,0.8)`,
            animation:`${glow} 3s ease-in-out infinite`,
            display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Typography sx={{ color:"white",fontWeight:900,fontSize:"0.65rem",textAlign:"center",lineHeight:1.2 }}>
              DWAITH<br/>TECH
            </Typography>
          </Box>
        </Box>

        {/* Floating shapes */}
        {[
          { w:80,h:80,top:"10%",left:"5%",dur:"7s" },
          { w:50,h:50,bottom:"15%",left:"3%",dur:"5s" },
        ].map((s,i)=>(
          <Box key={i} sx={{ position:"absolute",width:s.w,height:s.h,
            top:s.top,left:s.left,bottom:s.bottom,
            border:`1px solid rgba(255,140,0,0.2)`,
            borderRadius:"30% 70% 70% 30%/30% 30% 70% 70%",
            background:"linear-gradient(135deg,rgba(255,140,0,0.1),rgba(255,255,255,0.02))",
            animation:`${float} ${s.dur} ease-in-out infinite`,
            opacity:0.15,pointerEvents:"none" }} />
        ))}

        <Container maxWidth="lg" sx={{ position:"relative",zIndex:2,pt:14,pb:10 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ animation:`${slideInLeft} 0.9s ease-out both` }}>
                {/* Badge */}
                <Box sx={{ display:"inline-flex",alignItems:"center",gap:1,
                  px:2.5,py:1,mb:3,borderRadius:"50px",
                  background:"rgba(255,140,0,0.1)",backdropFilter:"blur(20px)",
                  border:"1px solid rgba(255,140,0,0.3)",
                  animation:`${glow} 4s ease-in-out infinite` }}>
                  <Box sx={{ width:8,height:8,borderRadius:"50%",bgcolor:"#4CAF50",
                    animation:`${pulse} 1.5s ease-in-out infinite`,boxShadow:"0 0 10px #4CAF50" }} />
                  <Typography sx={{ color:"rgba(255,255,255,0.9)",fontSize:"0.82rem",fontWeight:600,letterSpacing:"0.06em" }}>
                    🚀 Trusted by 200+ Companies Worldwide
                  </Typography>
                </Box>

                {/* Heading */}
                <Typography sx={{ fontSize:{xs:"2.6rem",md:"4rem"},fontWeight:900,lineHeight:1.05,mb:1.5,color:"white",letterSpacing:"-0.02em" }}>
                  Building
                </Typography>
                <Box sx={{ fontSize:{xs:"2.6rem",md:"4rem"},fontWeight:900,lineHeight:1.05,mb:1.5,
                  background:`linear-gradient(90deg,${ORANGE} 0%,#FFD54F 40%,${ORANGE} 100%)`,
                  backgroundSize:"200% auto",backgroundClip:"text",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                  animation:`${shimmer} 3s linear infinite`,display:"inline-block" }}>
                  What's Next
                </Box>

                {/* Typewriter */}
                <Box sx={{ display:"flex",alignItems:"center",gap:1,mb:3,minHeight:56 }}>
                  <Typography sx={{ fontSize:{xs:"1.1rem",md:"1.4rem"},fontWeight:700,color:"#FFB74D" }}>with</Typography>
                  <Typography sx={{ fontSize:{xs:"1.1rem",md:"1.4rem"},fontWeight:700,
                    color:"white",borderRight:`3px solid ${ORANGE}`,pr:0.5,
                    animation:`${blink} 1s step-end infinite` }}>
                    {displayed}
                  </Typography>
                </Box>

                <Typography sx={{ mb:4,color:"rgba(255,255,255,0.8)",lineHeight:1.8,maxWidth:520,fontSize:"1rem" }}>
                  Dwaith Infotech Inc merges technology and visual design to create innovative, impactful solutions — pushing the boundaries with AI and technology to solve real business challenges.
                </Typography>

                <Box sx={{ display:"flex",gap:2,flexWrap:"wrap",mb:4 }}>
                  <Button component={Link} to="/contact" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                    sx={{ px:4,py:1.8,fontSize:"1rem",fontWeight:700,
                      background:`linear-gradient(135deg,${ORANGE},${DARK_ORANGE})`,
                      color:"white",borderRadius:"50px",
                      boxShadow:`0 8px 32px rgba(255,140,0,0.4)`,
                      "&:hover":{transform:"translateY(-5px) scale(1.03)",
                        boxShadow:`0 20px 60px rgba(255,140,0,0.6)`} }}>
                    Get Started
                  </Button>
                  <Button component={Link} to="/services" variant="outlined" size="large"
                    sx={{ px:4,py:1.8,fontSize:"1rem",fontWeight:600,
                      borderColor:"rgba(255,140,0,0.6)",color:"white",
                      borderRadius:"50px",borderWidth:2,
                      backdropFilter:"blur(10px)",background:"rgba(255,140,0,0.05)",
                      "&:hover":{borderWidth:2,background:"rgba(255,140,0,0.15)",transform:"translateY(-5px)"} }}>
                    Our Services
                  </Button>
                </Box>

                <Box sx={{ display:"flex",gap:3,flexWrap:"wrap" }}>
                  {["ISO Certified","5★ Rated","24/7 Support","< 1hr Response"].map((t,i)=>(
                    <Box key={i} sx={{ display:"flex",alignItems:"center",gap:0.8 }}>
                      <CheckCircleIcon sx={{ color:"#4CAF50",fontSize:16 }} />
                      <Typography sx={{ color:"rgba(255,255,255,0.75)",fontSize:"0.8rem",fontWeight:500 }}>{t}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Right — Glass dashboard */}
            <Grid item xs={12} md={6}>
              <Box sx={{ animation:`${slideInRight} 0.9s ease-out 0.25s both`,
                display:"flex",justifyContent:"center" }}>
                <Box sx={{ position:"relative",animation:`${float} 7s ease-in-out infinite` }}>
                  {/* Main glass card */}
                  <Box sx={{ width:{xs:300,md:350},p:4,borderRadius:4,
                    background:"rgba(255,255,255,0.06)",backdropFilter:"blur(30px)",
                    border:"1px solid rgba(255,140,0,0.2)",
                    boxShadow:`0 30px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.1)`,
                    position:"relative",overflow:"hidden" }}>
                    <Box sx={{ position:"absolute",top:0,left:0,right:0,height:"1px",
                      background:`linear-gradient(90deg,transparent,rgba(255,140,0,0.8),transparent)`,
                      animation:`${shimmer} 3s linear infinite` }} />
                    <Box sx={{ display:"flex",alignItems:"center",gap:1.5,mb:3 }}>
                      <Box sx={{ width:8,height:8,borderRadius:"50%",bgcolor:"#4CAF50",
                        animation:`${pulse} 1.5s ease-in-out infinite`,boxShadow:"0 0 10px #4CAF50" }} />
                      <Typography sx={{ color:"rgba(255,255,255,0.6)",fontSize:"0.72rem",
                        letterSpacing:"0.15em",textTransform:"uppercase" }}>Live Performance</Typography>
                    </Box>
                    {[
                      { label:"Client Satisfaction", v:98, color:"#4CAF50" },
                      { label:"Project Success",     v:96, color:ORANGE },
                      { label:"On-Time Delivery",    v:94, color:BLUE },
                      { label:"Team Performance",    v:99, color:"#9C27B0" },
                    ].map((item,i)=>(
                      <Box key={i} sx={{ mb:2.5 }}>
                        <Box sx={{ display:"flex",justifyContent:"space-between",mb:0.5 }}>
                          <Typography sx={{ color:"rgba(255,255,255,0.75)",fontSize:"0.78rem" }}>{item.label}</Typography>
                          <Typography sx={{ color:"white",fontSize:"0.78rem",fontWeight:700 }}>{item.v}%</Typography>
                        </Box>
                        <Box sx={{ height:6,borderRadius:3,bgcolor:"rgba(255,255,255,0.08)",overflow:"hidden" }}>
                          <Box sx={{ height:"100%",borderRadius:3,width:`${item.v}%`,
                            background:`linear-gradient(90deg,${item.color}88,${item.color})`,
                            boxShadow:`0 0 12px ${item.color}` }} />
                        </Box>
                      </Box>
                    ))}
                    <Box sx={{ mt:3,pt:2.5,borderTop:`1px solid rgba(255,140,0,0.15)`,
                      display:"flex",justifyContent:"space-between" }}>
                      {[["20+","Projects"],["10+","Clients"],["2+","Years"]].map(([n,l],i)=>(
                        <Box key={i} sx={{ textAlign:"center" }}>
                          <Typography sx={{ color:"white",fontWeight:900,fontSize:"1.6rem",
                            textShadow:`0 0 20px rgba(255,140,0,0.6)` }}>{n}</Typography>
                          <Typography sx={{ color:"rgba(255,255,255,0.5)",fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.1em" }}>{l}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Floating chips */}
                  {[
                    { text:"⬆ 40% Growth",  bg:"rgba(76,175,80,0.92)",   t:-22,r:-30,anim:floatReverse,dur:"4s" },
                    { text:"🏆 Top Rated",   bg:`rgba(255,140,0,0.92)`,   b:-18,l:-25,anim:float,dur:"5s" },
                    { text:"⚡ Agile",        bg:`rgba(21,101,192,0.92)`,  t:"40%",r:-45,anim:floatX,dur:"6s" },
                  ].map((c,i)=>(
                    <Box key={i} sx={{ position:"absolute",px:2,py:1,borderRadius:2,whiteSpace:"nowrap",
                      background:c.bg,backdropFilter:"blur(10px)",
                      top:c.t,right:c.r,bottom:c.b,left:c.l,
                      animation:`${c.anim} ${c.dur} ease-in-out infinite`,
                      boxShadow:"0 8px 24px rgba(0,0,0,0.4)" }}>
                      <Typography sx={{ color:"white",fontSize:"0.72rem",fontWeight:700 }}>{c.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Wave */}
        <Box sx={{ position:"absolute",bottom:-2,left:0,right:0,zIndex:2 }}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="#F5F9FF"/>
          </svg>
        </Box>
      </Box>

      {/* ═══ CLIENT MARQUEE ═══ */}
      <Box sx={{ bgcolor:"#F5F9FF",py:6,overflow:"hidden" }}>
        <Typography variant="overline" sx={{ display:"block",textAlign:"center",mb:3,
          color:ORANGE,fontWeight:700,letterSpacing:"0.18em",fontSize:"0.78rem" }}>
          TRUSTED BY LEADING ORGANIZATIONS
        </Typography>
        <Box sx={{ position:"relative",overflow:"hidden",
          "&::before,&::after":{ content:'""',position:"absolute",top:0,bottom:0,width:120,zIndex:2 },
          "&::before":{ left:0,background:"linear-gradient(90deg,#F5F9FF,transparent)" },
          "&::after":{ right:0,background:"linear-gradient(-90deg,#F5F9FF,transparent)" } }}>
          <Box sx={{ display:"flex",gap:5,width:"max-content",
            animation:`${marquee} 25s linear infinite`,
            "&:hover":{ animationPlayState:"paused" } }}>
            {[...CLIENTS,...CLIENTS].map((c,i)=>(
              <Box key={i} sx={{ px:3,py:1.5,borderRadius:2,whiteSpace:"nowrap",
                bgcolor:"white",border:`1px solid rgba(255,140,0,0.15)`,
                boxShadow:"0 2px 12px rgba(0,0,0,0.06)",cursor:"default",
                transition:"all 0.3s ease",
                "&:hover":{ transform:"translateY(-6px) scale(1.05)",
                  boxShadow:`0 12px 40px rgba(255,140,0,0.2)`,border:`1px solid ${ORANGE}44` } }}>
                <Typography sx={{ fontWeight:700,color:DARK_ORANGE,fontSize:"0.88rem",letterSpacing:"0.04em" }}>{c}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ═══ STATS ═══ */}
      <Box ref={statsRef} sx={{ bgcolor:"#F5F9FF",pb:12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {STATS.map((s,i)=>(
              <Grid item xs={6} md={3} key={i}>
                <Box sx={{ textAlign:"center",p:4,borderRadius:4,bgcolor:"white",
                  border:`1px solid ${s.color}22`,
                  boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
                  transition:"all 0.4s ease",cursor:"default",
                  "&:hover":{ boxShadow:`0 24px 80px ${s.color}30`,
                    transform:"translateY(-12px) scale(1.03)",border:`1px solid ${s.color}44` } }}>
                  <Box sx={{ color:s.color,mb:1.5 }}>{s.icon}</Box>
                  <Typography sx={{ fontWeight:900,fontSize:{xs:"2.2rem",md:"3rem"},
                    color:s.color,lineHeight:1,mb:0.5 }}>
                    <Counter target={s.n} inView={statsInView} />
                  </Typography>
                  <Typography sx={{ color:"#546e7a",fontWeight:600,fontSize:"0.82rem",
                    textTransform:"uppercase",letterSpacing:"0.08em" }}>{s.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ SERVICES ═══ */}
      <Box ref={servicesRef} sx={{ py:14,bgcolor:"white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center",mb:10 }}>
            <Typography variant="overline" sx={{ color:ORANGE,fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.18em" }}>WHAT WE OFFER</Typography>
            <Typography variant="h2" sx={{ mt:2,mb:2,color:"#0A1929",fontWeight:900,fontSize:{xs:"2rem",md:"3.2rem"} }}>
              Comprehensive Technology Solutions
            </Typography>
            <Typography sx={{ color:"#546e7a",maxWidth:600,mx:"auto",fontSize:"1rem",lineHeight:1.8 }}>
              From talent to technology — your full-stack digital transformation partner
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {SERVICES.map((s,i)=>(
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box sx={{ height:"100%",p:4,borderRadius:4,
                  border:`1px solid ${s.color}22`,bgcolor:"white",
                  position:"relative",overflow:"hidden",cursor:"pointer",
                  transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  "&::before":{ content:'""',position:"absolute",top:0,left:0,right:0,height:"3px",
                    background:`linear-gradient(90deg,${s.color},${s.color}88)`,
                    boxShadow:`0 0 12px ${s.color}` },
                  "&:hover":{ boxShadow:`0 32px 80px ${s.color}22`,
                    border:`1px solid ${s.color}44`,transform:"translateY(-12px)",
                    "& .svc-icon":{ transform:"scale(1.15) rotate(8deg)",
                      background:`linear-gradient(135deg,${s.color},${s.color}cc)`,color:"white",
                      boxShadow:`0 8px 30px ${s.color}60` } } }}>
                  <Box className="svc-icon" sx={{ width:68,height:68,borderRadius:3,
                    background:`${s.color}12`,color:s.color,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    mb:2.5,transition:"all 0.35s ease" }}>
                    {s.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb:1.5,fontWeight:800,color:"#0A1929" }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color:"#546e7a",mb:2.5,lineHeight:1.7 }}>{s.desc}</Typography>
                  <Box sx={{ display:"flex",flexWrap:"wrap",gap:0.8 }}>
                    {s.tags.map((t,j)=>(
                      <Chip key={j} label={t} size="small"
                        sx={{ bgcolor:`${s.color}10`,color:s.color,fontWeight:700,fontSize:"0.7rem",
                          border:`1px solid ${s.color}25` }} />
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ WHY DWAITH ═══ */}
      <Box sx={{ py:14,position:"relative",overflow:"hidden",
        background:`linear-gradient(150deg,${DARK_BG} 0%,#1a0800 40%,#1a0500 100%)` }}>
        <ParticleCanvas color="255,140,0" />
        <Box sx={{ position:"absolute",inset:0,opacity:0.04,
          backgroundImage:`radial-gradient(circle,rgba(255,140,0,0.6) 1px,transparent 1px)`,
          backgroundSize:"40px 40px" }} />
        <Container maxWidth="lg" sx={{ position:"relative",zIndex:2 }}>
          <Box sx={{ textAlign:"center",mb:10 }}>
            <Typography variant="overline" sx={{ color:"#FFB74D",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.18em" }}>WHY DWAITH INFOTECH</Typography>
            <Typography variant="h2" sx={{ mt:2,color:"white",fontWeight:900,fontSize:{xs:"2rem",md:"3.2rem"} }}>
              Technology · Innovation · Solutions
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {[
              { icon:<TrendingUpIcon sx={{fontSize:52}}/>,  title:"Proven Track Record",   stat:"98%", sl:"Success Rate",   desc:"20+ successful projects with AI-driven solutions that deliver measurable business impact." },
              { icon:<SecurityIcon sx={{fontSize:52}}/>,    title:"Enterprise Security",    stat:"100%",sl:"Compliance",     desc:"ISO 27001 certified with bank-grade security and full data protection." },
              { icon:<SpeedIcon sx={{fontSize:52}}/>,       title:"Agile Delivery",         stat:"40%", sl:"Faster",         desc:"2-week sprint cycles with rapid deployment and continuous improvement." },
              { icon:<SupportAgentIcon sx={{fontSize:52}}/>,title:"24/7 Support",           stat:"4.9★",sl:"Rating",         desc:"Round-the-clock technical support with < 1 hour response time." },
            ].map((item,i)=>(
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box sx={{ p:4,borderRadius:4,textAlign:"center",
                  background:"rgba(255,255,255,0.05)",backdropFilter:"blur(24px)",
                  border:"1px solid rgba(255,140,0,0.12)",
                  transition:"all 0.4s ease",
                  "&:hover":{ background:"rgba(255,255,255,0.1)",
                    border:`1px solid rgba(255,140,0,0.35)`,
                    boxShadow:`0 24px 80px rgba(0,0,0,0.5)`,transform:"translateY(-12px)",
                    "& .why-icon":{ color:"#FFB74D",transform:"scale(1.2) rotate(10deg)" } } }}>
                  <Box className="why-icon" sx={{ color:ORANGE,mb:2,transition:"all 0.3s ease" }}>{item.icon}</Box>
                  <Typography sx={{ color:"white",fontWeight:900,fontSize:"2.8rem",lineHeight:1,
                    textShadow:`0 0 30px rgba(255,140,0,0.6)`,mb:0.3 }}>{item.stat}</Typography>
                  <Typography sx={{ color:"#FFB74D",fontSize:"0.72rem",fontWeight:600,letterSpacing:"0.12em",
                    textTransform:"uppercase",mb:2 }}>{item.sl}</Typography>
                  <Typography variant="h6" sx={{ color:"white",fontWeight:800,mb:1.5,fontSize:"1rem" }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color:"rgba(255,255,255,0.65)",lineHeight:1.7,fontSize:"0.85rem" }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box sx={{ position:"absolute",bottom:-2,left:0,right:0,zIndex:3 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="#F5F9FF"/>
          </svg>
        </Box>
      </Box>

      {/* ═══ TESTIMONIALS ═══ */}
      <Box sx={{ py:14,bgcolor:"#F5F9FF" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center",mb:10 }}>
            <Typography variant="overline" sx={{ color:ORANGE,fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.18em" }}>TESTIMONIALS</Typography>
            <Typography variant="h2" sx={{ mt:2,color:"#0A1929",fontWeight:900,fontSize:{xs:"2rem",md:"3.2rem"} }}>
              Trusted by Industry Leaders
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {TESTIMONIALS.map((t,i)=>(
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{ p:4,borderRadius:4,bgcolor:"white",height:"100%",
                  border:`1px solid ${ORANGE}22`,
                  boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
                  position:"relative",overflow:"hidden",
                  transition:"all 0.4s ease",
                  "&:hover":{ boxShadow:`0 24px 80px rgba(255,140,0,0.15)`,
                    transform:"translateY(-10px)",border:`1px solid ${ORANGE}44` } }}>
                  <FormatQuoteIcon sx={{ position:"absolute",top:16,right:16,fontSize:70,
                    color:`rgba(255,140,0,0.07)` }} />
                  <Rating value={5} readOnly size="small" sx={{ mb:2,
                    "& .MuiRating-iconFilled":{ color:ORANGE } }} />
                  <Typography sx={{ mb:3,lineHeight:1.8,fontStyle:"italic",color:"#37474F",fontSize:"0.92rem" }}>
                    "{t.text}"
                  </Typography>
                  <Box sx={{ display:"flex",alignItems:"center",gap:2 }}>
                    <Avatar sx={{ background:`linear-gradient(135deg,${ORANGE},${DARK_ORANGE})`,
                      width:50,height:50,fontWeight:800,fontSize:"1rem",
                      boxShadow:`0 4px 16px rgba(255,140,0,0.4)` }}>{t.av}</Avatar>
                    <Box>
                      <Typography sx={{ fontWeight:800,color:"#0A1929",fontSize:"0.95rem" }}>{t.name}</Typography>
                      <Typography sx={{ color:"#546e7a",fontSize:"0.78rem" }}>{t.pos}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ CTA ═══ */}
      <Box ref={ctaRef} sx={{ py:14,position:"relative",overflow:"hidden",
        background:`linear-gradient(-45deg,${DARK_BG},#1a0800,${DARK_ORANGE}44,#1a0500,${DARK_BG})`,
        backgroundSize:"400% 400%",animation:`${gradientShift} 10s ease infinite` }}>
        <ParticleCanvas color="255,140,0" />
        <Container maxWidth="md" sx={{ position:"relative",zIndex:2,textAlign:"center" }}>
          <Typography variant="h2" sx={{ color:"white",fontWeight:900,mb:2,
            fontSize:{xs:"2rem",md:"3.8rem"},letterSpacing:"-0.02em" }}>
            Ready to Push{" "}
            <Box component="span" sx={{
              background:`linear-gradient(90deg,${ORANGE},#FFD54F,${ORANGE})`,
              backgroundSize:"200% auto",backgroundClip:"text",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              animation:`${shimmer} 3s linear infinite` }}>
              The Boundaries?
            </Box>
          </Typography>
          <Typography sx={{ color:"rgba(255,255,255,0.8)",mb:5,
            maxWidth:580,mx:"auto",lineHeight:1.8,fontSize:"1.05rem" }}>
            Let's discuss how Dwaith Infotech Inc can help you merge technology and innovation to create impactful solutions for your business.
          </Typography>
          <Box sx={{ display:"flex",gap:2,justifyContent:"center",flexWrap:"wrap" }}>
            <Button component={Link} to="/contact" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
              sx={{ px:5,py:2,fontSize:"1.05rem",fontWeight:800,
                background:`linear-gradient(135deg,${ORANGE},${DARK_ORANGE})`,
                color:"white",borderRadius:"50px",
                boxShadow:`0 8px 40px rgba(255,140,0,0.5)`,
                "&:hover":{transform:"translateY(-6px) scale(1.03)",
                  boxShadow:`0 20px 60px rgba(255,140,0,0.7)`} }}>
              Contact Us Today
            </Button>
            <Button component={Link} to="/services" variant="outlined" size="large"
              sx={{ px:5,py:2,fontSize:"1.05rem",fontWeight:700,
                borderColor:"rgba(255,140,0,0.6)",color:"white",
                borderRadius:"50px",borderWidth:2,backdropFilter:"blur(10px)",
                background:"rgba(255,140,0,0.05)",
                "&:hover":{borderWidth:2,background:"rgba(255,140,0,0.15)",transform:"translateY(-6px)"} }}>
              View Services
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
