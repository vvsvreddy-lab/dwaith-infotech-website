import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography, Button, Grid, Chip, Avatar, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import VerifiedIcon from "@mui/icons-material/Verified";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import HandshakeIcon from "@mui/icons-material/Handshake";

const gradientShift = keyframes`0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}`;
const float = keyframes`0%,100%{transform:translateY(0px)}50%{transform:translateY(-15px)}`;
const floatReverse = keyframes`0%,100%{transform:translateY(0px)}50%{transform:translateY(15px)}`;
const floatX = keyframes`0%,100%{transform:translateX(0px)}50%{transform:translateX(12px)}`;
const pulse = keyframes`0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.15);opacity:1}`;
const shimmer = keyframes`0%{background-position:-200% center}100%{background-position:200% center}`;
const slideInLeft = keyframes`from{opacity:0;transform:translateX(-80px)}to{opacity:1;transform:translateX(0)}`;
const slideInRight = keyframes`from{opacity:0;transform:translateX(80px)}to{opacity:1;transform:translateX(0)}`;
const marquee = keyframes`0%{transform:translateX(0)}100%{transform:translateX(-50%)}`;
const spin = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;
const spinReverse = keyframes`from{transform:rotate(360deg)}to{transform:rotate(0deg)}`;
const morphShape = keyframes`0%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}`;
const glow = keyframes`0%,100%{box-shadow:0 0 20px rgba(255,140,0,0.4)}50%{box-shadow:0 0 60px rgba(255,140,0,0.9)}`;
const blink = keyframes`0%,100%{opacity:1}50%{opacity:0}`;
const scanLine = keyframes`0%{top:-100%}100%{top:200%}`;
const fadeInUp = keyframes`from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}`;

const ORANGE = "#FF8C00";
const DARK_ORANGE = "#E65100";
const DARK_BG = "#0a0a1a";

// Particle Canvas
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
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
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,0,${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,140,0,${0.12*(1-d/100)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      particles.forEach(p => { const dx = mx-p.x, dy = my-p.y; const d = Math.sqrt(dx*dx+dy*dy); if (d < 150) { p.x += dx*0.01; p.y += dy*0.01; } });
      animRef.current = requestAnimationFrame(draw);
    };
    const onMouse = e => { const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX-rect.left, y: e.clientY-rect.top }; };
    canvas.addEventListener("mousemove", onMouse); draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"all" }} />;
};

// Counter
const Counter = ({ target, inView }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const n = parseInt(target.replace(/\D/g, ""));
    let cur = 0; const step = n / 60;
    const t = setInterval(() => { cur = Math.min(cur+step,n); setV(Math.floor(cur)); if (cur>=n) clearInterval(t); }, 33);
    return () => clearInterval(t);
  }, [inView, target]);
  return <>{v}{target.includes("+") ? "+" : target.includes("%") ? "%" : ""}</>;
};

const CLIENTS = ["BENEFITWALL","TOYOTA","Santander","BRISTLECONE","Fidelity","ATLAS","ORCASO","BLAISSON GROUP","Shipium","SGT","Lions Club Int'l","Apex Systems","Eliassen Group","IG Group"];

const SOLUTIONS = [
  { icon: <RecordVoiceOverIcon sx={{ fontSize:44 }} />, title:"Voice AI Technology", desc:"Conversational AI that understands intent and hands off smoothly to human experts — transforming customer support at scale.", tags:["NLP","Voice Bots","Intent AI","Human Handoff"], color:ORANGE, highlight:"Used by Fortune 100 companies" },
  { icon: <PsychologyIcon sx={{ fontSize:44 }} />, title:"AI Solutions & Integration", desc:"End-to-end AI implementation — from strategy to deployment. We embed intelligence into your existing business workflows.", tags:["ML Models","AI Strategy","Integration","Automation"], color:DARK_ORANGE, highlight:"35% avg cost reduction" },
  { icon: <AnalyticsIcon sx={{ fontSize:44 }} />, title:"Data & Business Intelligence", desc:"Transform raw data into strategic assets. Real-time dashboards, predictive models and actionable insights for decision makers.", tags:["BI Dashboards","ETL","Predictive","Big Data"], color:ORANGE, highlight:"Real-time insights" },
  { icon: <LightbulbIcon sx={{ fontSize:44 }} />, title:"Advisory & Consulting", desc:"Strategic technology guidance from industry veterans. We help you navigate digital trends and make informed technology investments.", tags:["Digital Roadmap","Tech Strategy","Risk Analysis","ROI"], color:DARK_ORANGE, highlight:"Fortune 100 trusted" },
  { icon: <BusinessCenterIcon sx={{ fontSize:44 }} />, title:"Application Development", desc:"Custom software built around your unique business requirements. Scalable, user-centric and built to grow with your organization.", tags:["Web Apps","Mobile","SaaS","APIs"], color:ORANGE, highlight:"On-time delivery" },
  { icon: <AutoFixHighIcon sx={{ fontSize:44 }} />, title:"Digital Transformation", desc:"Full-spectrum digital evolution — modernizing legacy systems, automating workflows and building future-ready technology ecosystems.", tags:["Legacy Modernization","Cloud","DevOps","Process"], color:DARK_ORANGE, highlight:"End-to-end support" },
];

const CASE_STUDIES = [
  { icon:"🎙️", client:"Fortune 500 Support Team", title:"Voice AI Cuts Query Time by 70%", challenge:"High-volume customer queries overwhelming support staff", solution:"Deployed conversational AI with intelligent human handoff", result:"70% queries automated, 40% cost reduction, 98% satisfaction", tags:["Voice AI","NLP","Automation"] },
  { icon:"📊", client:"Global Financial Institution", title:"Real-Time BI Transforms Decisions", challenge:"Data siloed across 12 systems with no unified view", solution:"Built centralized BI platform with real-time dashboards", result:"Executive decisions 3x faster, $2M saved annually", tags:["BI","Data Engineering","Analytics"] },
  { icon:"🤖", client:"Healthcare Provider Network", title:"AI Automates 60% of Admin Work", challenge:"Manual administrative processes consuming clinical time", solution:"Custom AI workflows automating scheduling and billing", result:"60% admin work automated, 30% more patient time", tags:["AI","Automation","Healthcare"] },
];

const TESTIMONIALS = [
  { name:"James Wilson", pos:"VP Operations, Toyota USA", av:"JW", text:"Dwaith's Voice AI solution handles 70% of our customer queries automatically. The ROI was clear within the first quarter. Exceptional technology and support." },
  { name:"Priya Sharma", pos:"Director, Fidelity Investments", av:"PS", text:"The BI platform Dwaith built gives our executives real-time insights that have transformed how we make decisions. Truly game-changing technology." },
  { name:"Robert Martinez", pos:"CTO, Santander Bank", av:"RM", text:"Dwaith delivered our digital transformation roadmap on time and under budget. Their strategic advisory team is second to none." },
];

export default function Home() {
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsInView(true); }, { threshold: 0.1 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Typewriter
  const words = ["Voice AI Technology","AI Solutions","Data Intelligence","Digital Transformation","Advisory Services","Smart Automation"];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && displayed.length < word.length) { setDisplayed(word.slice(0, displayed.length+1)); }
      else if (deleting && displayed.length > 0) { setDisplayed(word.slice(0, displayed.length-1)); }
      else if (!deleting) { setTimeout(() => setDeleting(true), 1500); }
      else { setDeleting(false); setWordIdx(i => (i+1) % words.length); }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, wordIdx]);

  return (
    <Box sx={{ overflow:"hidden" }}>

      {/* ═══ HERO ═══ */}
      <Box sx={{
        minHeight:"100vh", position:"relative",
        display:"flex", alignItems:"center", overflow:"hidden",
        background:`linear-gradient(-45deg,${DARK_BG},#1a0800,#150500,${DARK_BG},#0a0a1a,#1a0800)`,
        backgroundSize:"600% 600%", animation:`${gradientShift} 10s ease infinite`,
      }}>
        <ParticleCanvas />
        <Box sx={{ position:"absolute",inset:0,opacity:0.04,
          backgroundImage:"linear-gradient(rgba(255,140,0,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,140,0,0.3) 1px,transparent 1px)",
          backgroundSize:"60px 60px" }} />
        {/* Scan line */}
        <Box sx={{ position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:1 }}>
          <Box sx={{ position:"absolute",left:0,right:0,height:"2px",
            background:"linear-gradient(90deg,transparent,rgba(255,140,0,0.5),transparent)",
            animation:`${scanLine} 6s linear infinite` }} />
        </Box>
        {/* 3D Orbiting rings */}
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
              width:10,height:10,borderRadius:"50%",bgcolor:"#FFB74D" }} />
          </Box>
          <Box sx={{ position:"absolute",inset:60,
            background:"radial-gradient(circle,rgba(255,140,0,0.35),rgba(230,81,0,0.1))",
            animation:`${morphShape} 8s ease-in-out infinite` }} />
          <Box sx={{ position:"absolute",inset:95,borderRadius:"50%",
            background:`linear-gradient(135deg,${ORANGE},${DARK_ORANGE})`,
            boxShadow:`0 0 40px rgba(255,140,0,0.8)`,
            animation:`${glow} 3s ease-in-out infinite`,
            display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Typography sx={{ color:"white",fontWeight:900,fontSize:"0.6rem",textAlign:"center",lineHeight:1.2 }}>
              AI<br/>POWERED
            </Typography>
          </Box>
        </Box>

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
                  <Typography sx={{ color:"rgba(255,255,255,0.9)",fontSize:"0.82rem",fontWeight:600 }}>
                    🚀 Preferred Partner for Fortune 100 Companies
                  </Typography>
                </Box>

                {/* Main heading */}
                <Typography sx={{ fontSize:{xs:"2.4rem",md:"3.8rem"},fontWeight:900,lineHeight:1.05,mb:1,color:"white" }}>
                  Pushing the
                </Typography>
                <Box sx={{ fontSize:{xs:"2.4rem",md:"3.8rem"},fontWeight:900,lineHeight:1.05,mb:1.5,
                  background:`linear-gradient(90deg,${ORANGE} 0%,#FFD54F 40%,${ORANGE} 100%)`,
                  backgroundSize:"200% auto",backgroundClip:"text",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                  animation:`${shimmer} 3s linear infinite`,display:"inline-block" }}>
                  Boundaries
                </Box>
                <Typography sx={{ fontSize:{xs:"2.4rem",md:"3.8rem"},fontWeight:900,lineHeight:1.05,mb:2,color:"rgba(255,255,255,0.9)" }}>
                  with AI & Tech
                </Typography>

                {/* Typewriter */}
                <Box sx={{ display:"flex",alignItems:"center",gap:1,mb:3,minHeight:48 }}>
                  <Typography sx={{ fontSize:{xs:"1rem",md:"1.3rem"},fontWeight:700,color:"#FFB74D" }}>Specializing in</Typography>
                  <Typography sx={{ fontSize:{xs:"1rem",md:"1.3rem"},fontWeight:700,
                    color:"white",borderRight:`3px solid ${ORANGE}`,pr:0.5,
                    animation:`${blink} 1s step-end infinite` }}>
                    {displayed}
                  </Typography>
                </Box>

                <Typography sx={{ mb:4,color:"rgba(255,255,255,0.8)",lineHeight:1.8,maxWidth:520,fontSize:"1rem" }}>
                  Dwaith Infotech Inc merges technology and visual design to create innovative, impactful solutions. We push the boundaries with AI and technology to solve real business challenges — from Voice AI to full digital transformation.
                </Typography>

                <Box sx={{ display:"flex",gap:2,flexWrap:"wrap",mb:4 }}>
                  <Button component={Link} to="/contact" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                    sx={{ px:4,py:1.8,fontSize:"1rem",fontWeight:700,
                      background:`linear-gradient(135deg,${ORANGE},${DARK_ORANGE})`,
                      color:"white",borderRadius:"50px",
                      boxShadow:`0 8px 32px rgba(255,140,0,0.4)`,
                      "&:hover":{transform:"translateY(-5px)",boxShadow:`0 20px 60px rgba(255,140,0,0.6)`} }}>
                    Start Your AI Journey
                  </Button>
                  <Button component={Link} to="/services" variant="outlined" size="large"
                    sx={{ px:4,py:1.8,fontSize:"1rem",fontWeight:600,
                      borderColor:"rgba(255,140,0,0.5)",color:"white",
                      borderRadius:"50px",borderWidth:2,
                      background:"rgba(255,140,0,0.05)",backdropFilter:"blur(10px)",
                      "&:hover":{borderWidth:2,background:"rgba(255,140,0,0.15)",transform:"translateY(-5px)"} }}>
                    Explore Solutions
                  </Button>
                </Box>

                <Box sx={{ display:"flex",gap:3,flexWrap:"wrap" }}>
                  {["Fortune 100 Partner","AI-First Approach","24/7 Support","Proven ROI"].map((t,i)=>(
                    <Box key={i} sx={{ display:"flex",alignItems:"center",gap:0.8 }}>
                      <CheckCircleIcon sx={{ color:"#4CAF50",fontSize:16 }} />
                      <Typography sx={{ color:"rgba(255,255,255,0.75)",fontSize:"0.8rem",fontWeight:500 }}>{t}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Right — Stats card */}
            <Grid item xs={12} md={6}>
              <Box sx={{ animation:`${slideInRight} 0.9s ease-out 0.25s both`,
                display:"flex",justifyContent:"center" }}>
                <Box sx={{ position:"relative",animation:`${float} 7s ease-in-out infinite` }}>
                  <Box sx={{ width:{xs:300,md:350},p:4,borderRadius:4,
                    background:"rgba(255,255,255,0.06)",backdropFilter:"blur(30px)",
                    border:"1px solid rgba(255,140,0,0.2)",
                    boxShadow:"0 30px 80px rgba(0,0,0,0.5)",
                    position:"relative",overflow:"hidden" }}>
                    <Box sx={{ position:"absolute",top:0,left:0,right:0,height:"1px",
                      background:`linear-gradient(90deg,transparent,rgba(255,140,0,0.8),transparent)`,
                      animation:`${shimmer} 3s linear infinite` }} />
                    <Box sx={{ display:"flex",alignItems:"center",gap:1.5,mb:3 }}>
                      <Box sx={{ width:8,height:8,borderRadius:"50%",bgcolor:"#4CAF50",
                        animation:`${pulse} 1.5s ease-in-out infinite`,boxShadow:"0 0 10px #4CAF50" }} />
                      <Typography sx={{ color:"rgba(255,255,255,0.6)",fontSize:"0.72rem",letterSpacing:"0.15em",textTransform:"uppercase" }}>
                        AI Impact Metrics
                      </Typography>
                    </Box>
                    {[
                      { label:"Query Automation Rate",  v:70, color:"#4CAF50" },
                      { label:"Client Satisfaction",    v:98, color:ORANGE },
                      { label:"Cost Reduction Avg",     v:35, color:"#2196F3" },
                      { label:"On-Time Delivery",       v:96, color:"#9C27B0" },
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
                      {[["20+","Projects"],["10+","Clients"],["3","Industries"]].map(([n,l],i)=>(
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
                    { text:"🤖 70% Automated",  bg:"rgba(76,175,80,0.92)",   top:-22,right:-30,anim:floatReverse,dur:"4s" },
                    { text:"💡 AI-First",        bg:`rgba(255,140,0,0.92)`,   bottom:-18,left:-25,anim:float,dur:"5s" },
                    { text:"⚡ Real-time",        bg:`rgba(33,150,243,0.92)`,  top:"40%",right:-50,anim:floatX,dur:"6s" },
                  ].map((c,i)=>(
                    <Box key={i} sx={{ position:"absolute",px:2,py:1,borderRadius:2,whiteSpace:"nowrap",
                      background:c.bg,top:c.top,right:c.right,bottom:c.bottom,left:c.left,
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
                boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
                transition:"all 0.3s ease",
                "&:hover":{ transform:"translateY(-6px)",boxShadow:`0 12px 40px rgba(255,140,0,0.2)`,border:`1px solid ${ORANGE}44` } }}>
                <Typography sx={{ fontWeight:700,color:DARK_ORANGE,fontSize:"0.88rem" }}>{c}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ═══ STATS ═══ */}
      <Box ref={statsRef} sx={{ bgcolor:"#F5F9FF",pb:12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              { n:"70%",  label:"Queries Automated",    icon:"🤖", color:ORANGE },
              { n:"35%",  label:"Avg Cost Reduction",   icon:"💰", color:DARK_ORANGE },
              { n:"98%",  label:"Client Satisfaction",  icon:"⭐", color:ORANGE },
              { n:"3x",   label:"Faster Decisions",     icon:"⚡", color:DARK_ORANGE },
            ].map((s,i)=>(
              <Grid item xs={6} md={3} key={i}>
                <Box sx={{ textAlign:"center",p:4,borderRadius:4,bgcolor:"white",
                  border:`1px solid ${s.color}22`,
                  boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
                  transition:"all 0.4s ease",cursor:"default",
                  "&:hover":{ boxShadow:`0 24px 80px ${s.color}30`,transform:"translateY(-12px)" } }}>
                  <Typography sx={{ fontSize:"2rem",mb:1 }}>{s.icon}</Typography>
                  <Typography sx={{ fontWeight:900,fontSize:{xs:"2.2rem",md:"3rem"},
                    color:s.color,lineHeight:1,mb:0.5 }}>{s.n}</Typography>
                  <Typography sx={{ color:"#546e7a",fontWeight:600,fontSize:"0.82rem",
                    textTransform:"uppercase",letterSpacing:"0.08em" }}>{s.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ SOLUTIONS ═══ */}
      <Box sx={{ py:14,bgcolor:"white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center",mb:10 }}>
            <Typography variant="overline" sx={{ color:ORANGE,fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.18em" }}>OUR SOLUTIONS</Typography>
            <Typography variant="h2" sx={{ mt:2,mb:2,color:"#0A1929",fontWeight:900,fontSize:{xs:"2rem",md:"3.2rem"} }}>
              AI-Powered Business Solutions
            </Typography>
            <Typography sx={{ color:"#546e7a",maxWidth:600,mx:"auto",fontSize:"1rem",lineHeight:1.8 }}>
              From Voice AI to full digital transformation — we deliver solutions that push the boundaries of what's possible
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {SOLUTIONS.map((s,i)=>(
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ height:"100%",p:4,borderRadius:4,
                  border:`1px solid ${s.color}22`,bgcolor:"white",
                  position:"relative",overflow:"hidden",cursor:"pointer",
                  transition:"all 0.4s ease",
                  "&::before":{ content:'""',position:"absolute",top:0,left:0,right:0,height:"3px",
                    background:`linear-gradient(90deg,${s.color},${s.color}88)` },
                  "&:hover":{ boxShadow:`0 32px 80px ${s.color}22`,transform:"translateY(-12px)",
                    border:`1px solid ${s.color}44`,
                    "& .svc-icon":{ background:`linear-gradient(135deg,${s.color},${s.color}cc)`,color:"white",
                      transform:"scale(1.15) rotate(8deg)" } } }}>
                  <Box className="svc-icon" sx={{ width:68,height:68,borderRadius:3,
                    background:`${s.color}12`,color:s.color,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    mb:2.5,transition:"all 0.35s ease" }}>
                    {s.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb:1.5,fontWeight:800,color:"#0A1929" }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color:"#546e7a",mb:2,lineHeight:1.7 }}>{s.desc}</Typography>
                  <Box sx={{ display:"inline-flex",alignItems:"center",gap:0.5,
                    px:1.5,py:0.5,borderRadius:"20px",bgcolor:`${s.color}15`,mb:2 }}>
                    <VerifiedIcon sx={{ fontSize:14,color:s.color }} />
                    <Typography sx={{ fontSize:"0.72rem",fontWeight:700,color:s.color }}>{s.highlight}</Typography>
                  </Box>
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

      {/* ═══ CASE STUDIES ═══ */}
      <Box sx={{ py:14,bgcolor:"#F5F9FF" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign:"center",mb:10 }}>
            <Typography variant="overline" sx={{ color:ORANGE,fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.18em" }}>SUCCESS STORIES</Typography>
            <Typography variant="h2" sx={{ mt:2,mb:2,color:"#0A1929",fontWeight:900,fontSize:{xs:"2rem",md:"3.2rem"} }}>
              Real Results for Real Businesses
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {CASE_STUDIES.map((c,i)=>(
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{ p:4,borderRadius:4,bgcolor:"white",height:"100%",
                  border:`1px solid rgba(255,140,0,0.15)`,
                  boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
                  transition:"all 0.4s ease",
                  "&:hover":{ boxShadow:`0 24px 80px rgba(255,140,0,0.15)`,transform:"translateY(-10px)",
                    border:`1px solid rgba(255,140,0,0.4)` } }}>
                  <Typography sx={{ fontSize:"2.5rem",mb:2 }}>{c.icon}</Typography>
                  <Typography variant="overline" sx={{ color:ORANGE,fontWeight:700,fontSize:"0.7rem" }}>{c.client}</Typography>
                  <Typography variant="h6" sx={{ my:1.5,fontWeight:800,color:"#0A1929" }}>{c.title}</Typography>
                  <Box sx={{ mb:2 }}>
                    <Typography variant="body2" sx={{ color:"#546e7a",fontWeight:600,mb:0.5 }}>Challenge:</Typography>
                    <Typography variant="body2" sx={{ color:"#546e7a",mb:1.5,lineHeight:1.6 }}>{c.challenge}</Typography>
                    <Typography variant="body2" sx={{ color:"#546e7a",fontWeight:600,mb:0.5 }}>Solution:</Typography>
                    <Typography variant="body2" sx={{ color:"#546e7a",mb:1.5,lineHeight:1.6 }}>{c.solution}</Typography>
                    <Box sx={{ p:2,borderRadius:2,bgcolor:`rgba(255,140,0,0.08)`,border:`1px solid rgba(255,140,0,0.2)` }}>
                      <Typography variant="body2" sx={{ color:DARK_ORANGE,fontWeight:700 }}>✅ {c.result}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display:"flex",flexWrap:"wrap",gap:0.8,mt:2 }}>
                    {c.tags.map((t,j)=>(
                      <Chip key={j} label={t} size="small"
                        sx={{ bgcolor:`rgba(255,140,0,0.1)`,color:ORANGE,fontWeight:700,fontSize:"0.7rem" }} />
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
        <ParticleCanvas />
        <Container maxWidth="lg" sx={{ position:"relative",zIndex:2 }}>
          <Box sx={{ textAlign:"center",mb:10 }}>
            <Typography variant="overline" sx={{ color:"#FFB74D",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.18em" }}>WHY DWAITH INFOTECH</Typography>
            <Typography variant="h2" sx={{ mt:2,color:"white",fontWeight:900,fontSize:{xs:"2rem",md:"3.2rem"} }}>
              The AI-First Technology Partner
            </Typography>
            <Typography sx={{ color:"rgba(255,255,255,0.7)",mt:2,maxWidth:600,mx:"auto" }}>
              Engineered for the complex demands of global enterprises — merging cutting-edge AI with governance, precision and operational resilience
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {[
              { icon:<RocketLaunchIcon sx={{fontSize:52}}/>,  title:"AI-First Approach",        stat:"70%",  sl:"Automation",      desc:"We embed AI at the core of every solution — not as an afterthought, but as the primary driver of business value." },
              { icon:<VerifiedIcon sx={{fontSize:52}}/>,      title:"Fortune 100 Trusted",      stat:"100%", sl:"Enterprise Ready", desc:"Proven track record with Fortune 100 companies across banking, healthcare, manufacturing and retail." },
              { icon:<HandshakeIcon sx={{fontSize:52}}/>,     title:"Obsessive Client Focus",   stat:"98%",  sl:"Satisfaction",     desc:"Relentlessly aligned to client success with unwavering commitment to excellence and measurable outcomes." },
              { icon:<AutoFixHighIcon sx={{fontSize:52}}/>,   title:"Proven Value Delivery",    stat:"35%",  sl:"Cost Reduction",   desc:"Proven track record delivering tangible results that drive business transformation and real cost savings." },
            ].map((item,i)=>(
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box sx={{ p:4,borderRadius:4,textAlign:"center",
                  background:"rgba(255,255,255,0.05)",backdropFilter:"blur(24px)",
                  border:"1px solid rgba(255,140,0,0.12)",
                  transition:"all 0.4s ease",
                  "&:hover":{ background:"rgba(255,255,255,0.1)",
                    border:`1px solid rgba(255,140,0,0.35)`,
                    boxShadow:"0 24px 80px rgba(0,0,0,0.5)",transform:"translateY(-12px)",
                    "& .why-icon":{ color:"#FFB74D",transform:"scale(1.2) rotate(10deg)" } } }}>
                  <Box className="why-icon" sx={{ color:ORANGE,mb:2,transition:"all 0.3s ease" }}>{item.icon}</Box>
                  <Typography sx={{ color:"white",fontWeight:900,fontSize:"2.8rem",lineHeight:1,
                    textShadow:"0 0 30px rgba(255,140,0,0.6)",mb:0.3 }}>{item.stat}</Typography>
                  <Typography sx={{ color:"#FFB74D",fontSize:"0.72rem",fontWeight:600,
                    letterSpacing:"0.12em",textTransform:"uppercase",mb:2 }}>{item.sl}</Typography>
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
            <Typography variant="overline" sx={{ color:ORANGE,fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.18em" }}>CLIENT TESTIMONIALS</Typography>
            <Typography variant="h2" sx={{ mt:2,color:"#0A1929",fontWeight:900,fontSize:{xs:"2rem",md:"3.2rem"} }}>
              What Our Clients Say
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {TESTIMONIALS.map((t,i)=>(
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{ p:4,borderRadius:4,bgcolor:"white",height:"100%",
                  border:`1px solid rgba(255,140,0,0.15)`,
                  boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
                  position:"relative",overflow:"hidden",
                  transition:"all 0.4s ease",
                  "&:hover":{ boxShadow:`0 24px 80px rgba(255,140,0,0.15)`,transform:"translateY(-10px)" } }}>
                  <FormatQuoteIcon sx={{ position:"absolute",top:16,right:16,fontSize:70,color:"rgba(255,140,0,0.07)" }} />
                  <Rating value={5} readOnly size="small" sx={{ mb:2,"& .MuiRating-iconFilled":{ color:ORANGE } }} />
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
      <Box sx={{ py:14,position:"relative",overflow:"hidden",
        background:`linear-gradient(-45deg,${DARK_BG},#1a0800,${DARK_ORANGE}33,#1a0500,${DARK_BG})`,
        backgroundSize:"400% 400%",animation:`${gradientShift} 10s ease infinite` }}>
        <ParticleCanvas />
        <Container maxWidth="md" sx={{ position:"relative",zIndex:2,textAlign:"center" }}>
          <Typography variant="h2" sx={{ color:"white",fontWeight:900,mb:2,
            fontSize:{xs:"2rem",md:"3.8rem"} }}>
            Ready to Push{" "}
            <Box component="span" sx={{
              background:`linear-gradient(90deg,${ORANGE},#FFD54F,${ORANGE})`,
              backgroundSize:"200% auto",backgroundClip:"text",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              animation:`${shimmer} 3s linear infinite` }}>
              the Boundaries?
            </Box>
          </Typography>
          <Typography sx={{ color:"rgba(255,255,255,0.8)",mb:5,
            maxWidth:580,mx:"auto",lineHeight:1.8,fontSize:"1.05rem" }}>
            Join Fortune 100 companies transforming their business with Dwaith Infotech's AI-powered solutions. Let's build something extraordinary together.
          </Typography>
          <Box sx={{ display:"flex",gap:2,justifyContent:"center",flexWrap:"wrap" }}>
            <Button component={Link} to="/contact" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
              sx={{ px:5,py:2,fontSize:"1.05rem",fontWeight:800,
                background:`linear-gradient(135deg,${ORANGE},${DARK_ORANGE})`,
                color:"white",borderRadius:"50px",
                boxShadow:`0 8px 40px rgba(255,140,0,0.5)`,
                "&:hover":{transform:"translateY(-6px) scale(1.03)",
                  boxShadow:`0 20px 60px rgba(255,140,0,0.7)`} }}>
              Start Your AI Journey
            </Button>
            <Button component={Link} to="/contact" variant="outlined" size="large"
              sx={{ px:5,py:2,fontSize:"1.05rem",fontWeight:700,
                borderColor:"rgba(255,140,0,0.6)",color:"white",
                borderRadius:"50px",borderWidth:2,backdropFilter:"blur(10px)",
                background:"rgba(255,140,0,0.05)",
                "&:hover":{borderWidth:2,background:"rgba(255,140,0,0.15)",transform:"translateY(-6px)"} }}>
              Book a Free Consultation
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
