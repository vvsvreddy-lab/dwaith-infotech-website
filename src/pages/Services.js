import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Chip, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import StorageIcon from "@mui/icons-material/Storage";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { keyframes } from "@mui/system";

const gradientShift = keyframes`0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}`;
const float = keyframes`0%,100%{transform:translateY(0px)}50%{transform:translateY(-10px)}`;

const ORANGE = "#FF8C00";
const DARK_ORANGE = "#E65100";
const DARK_BG = "#0a0a1a";

const offerings = [
  { icon: <PsychologyIcon sx={{ fontSize: 48 }} />, title: "AI Solutions & Integration", desc: "Cutting-edge artificial intelligence solutions to automate processes and drive intelligent decision-making across your organization.", benefits: ["Custom AI model development", "Natural Language Processing", "Computer Vision solutions", "AI-powered automation"], color: ORANGE },
  { icon: <CodeIcon sx={{ fontSize: 48 }} />, title: "Application Development", desc: "Custom software applications designed to meet your unique business requirements and drive digital transformation at scale.", benefits: ["Tailored solutions for your needs", "Scalable architecture", "User-centric design", "Continuous support & maintenance"], color: DARK_ORANGE },
  { icon: <LightbulbIcon sx={{ fontSize: 48 }} />, title: "Advisory & Consulting", desc: "Strategic guidance from industry experts to optimize your technology investments and improve business processes.", benefits: ["Technology landscape analysis", "Digital transformation roadmaps", "Technology selection guidance", "Process optimization"], color: ORANGE },
  { icon: <AutoGraphIcon sx={{ fontSize: 48 }} />, title: "Business Intelligence", desc: "Transform raw data into strategic insights that drive informed decisions and competitive advantages for your business.", benefits: ["Executive dashboards", "Real-time reporting", "KPI tracking", "Predictive analytics"], color: DARK_ORANGE },
  { icon: <AnalyticsIcon sx={{ fontSize: 48 }} />, title: "Data & Analytics", desc: "Build a data-driven culture with advanced analytics capabilities that unlock hidden value in your organizational data.", benefits: ["Data engineering pipelines", "Machine learning models", "Data visualization", "Statistical analysis"], color: ORANGE },
  { icon: <StorageIcon sx={{ fontSize: 48 }} />, title: "Data Engineering", desc: "Build reliable, scalable data infrastructure to ensure your data is accessible, secure, and ready for analysis.", benefits: ["Data warehouse design", "ETL pipeline development", "Data quality management", "Cloud data platforms"], color: DARK_ORANGE },
];

const industries = [
  { title: "Banking & Finance", icon: "🏦", desc: "Secure, compliant solutions for financial institutions" },
  { title: "Healthcare & Life Sciences", icon: "🏥", desc: "HIPAA-compliant health tech solutions" },
  { title: "Manufacturing", icon: "🏭", desc: "Smart factory and Industry 4.0 solutions" },
  { title: "Education", icon: "🎓", desc: "EdTech platforms and learning management systems" },
  { title: "Energy & Utilities", icon: "⚡", desc: "Digital solutions for energy management" },
  { title: "Retail & E-Commerce", icon: "🛒", desc: "Personalized shopping experiences at scale" },
];

export default function Services() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero */}
      <Box sx={{
        background: `linear-gradient(-45deg, ${DARK_BG}, #1a0800, #1a0500, ${DARK_BG})`,
        backgroundSize: "400% 400%",
        animation: `${gradientShift} 10s ease infinite`,
        py: 15, mt: 8, position: "relative", overflow: "hidden",
      }}>
        <Box sx={{ position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(255,140,0,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,140,0,0.3) 1px,transparent 1px)",
          backgroundSize: "60px 60px" }} />
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", color: "white", position: "relative", zIndex: 1 }}>
            <Typography variant="overline" sx={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "0.18em", mb: 2, display: "block", color: "#FFB74D" }}>
              COMPREHENSIVE SOLUTIONS
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, mb: 3 }}>
              Our Services
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: "700px", mx: "auto", opacity: 0.85, lineHeight: 1.8 }}>
              From AI solutions to consulting — we deliver end-to-end technology services that drive real business outcomes
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Core Services */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="overline" sx={{ color: ORANGE, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em" }}>WHAT WE OFFER</Typography>
          <Typography variant="h2" sx={{ mt: 2, mb: 2, color: "#0A1929", fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" } }}>
            Core Service Offerings
          </Typography>
          <Typography sx={{ color: "#546e7a", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
            Explore how we can help your business thrive with our comprehensive technology solutions
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {offerings.map((s, i) => (
            <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "100%", maxWidth: 360, p: 4, borderRadius: 4,
                border: `1px solid ${s.color}22`, bgcolor: "white",
                position: "relative", overflow: "hidden", cursor: "pointer",
                transition: "all 0.4s ease",
                "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                  background: `linear-gradient(90deg,${s.color},${s.color}88)` },
                "&:hover": { boxShadow: `0 24px 60px ${s.color}22`, transform: "translateY(-10px)",
                  border: `1px solid ${s.color}44`,
                  "& .svc-icon": { background: `linear-gradient(135deg,${s.color},${s.color}cc)`, color: "white",
                    transform: "scale(1.1) rotate(5deg)" } } }}>
                <Box className="svc-icon" sx={{ width: 72, height: 72, borderRadius: 3,
                  background: `${s.color}12`, color: s.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  mb: 2.5, transition: "all 0.3s ease" }}>
                  {s.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 800, color: "#0A1929" }}>{s.title}</Typography>
                <Typography variant="body2" sx={{ color: "#546e7a", mb: 2.5, lineHeight: 1.7 }}>{s.desc}</Typography>
                <List dense>
                  {s.benefits.map((b, j) => (
                    <ListItem key={j} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CheckCircleIcon sx={{ fontSize: 16, color: s.color }} />
                      </ListItemIcon>
                      <ListItemText primary={b} primaryTypographyProps={{ fontSize: "0.82rem", color: "#546e7a" }} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Industries */}
      <Box sx={{ bgcolor: "#F5F9FF", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: ORANGE, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em" }}>INDUSTRY EXPERTISE</Typography>
            <Typography variant="h2" sx={{ mt: 2, mb: 2, color: "#0A1929", fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" } }}>
              Industries We Serve
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {industries.map((ind, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper sx={{ p: 4, borderRadius: 3, border: `1px solid ${ORANGE}15`,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: `0 12px 40px ${ORANGE}15`,
                    border: `1px solid ${ORANGE}44` } }}>
                  <Typography sx={{ fontSize: "2.5rem", mb: 1.5 }}>{ind.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0A1929", mb: 1 }}>{ind.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#546e7a" }}>{ind.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{
        background: `linear-gradient(135deg, ${DARK_BG}, #1a0800, ${DARK_ORANGE}33)`,
        py: 10,
      }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ color: "white", fontWeight: 900, mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}>
            Ready to <Box component="em" sx={{ color: ORANGE, fontStyle: "normal" }}>supercharge</Box> your<br />AI Transformation?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 4, lineHeight: 1.8 }}>
            Let's discuss how Dwaith Infotech can accelerate your digital transformation journey.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Box component={Link} to="/contact"
              sx={{ px: 4, py: 1.8, borderRadius: "50px", fontWeight: 700, fontSize: "1rem",
                background: `linear-gradient(135deg,${ORANGE},${DARK_ORANGE})`,
                color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 1,
                boxShadow: `0 8px 32px rgba(255,140,0,0.4)`,
                "&:hover": { transform: "translateY(-4px)", boxShadow: `0 16px 48px rgba(255,140,0,0.6)` } }}>
              Contact Us <ArrowForwardIcon />
            </Box>
            <Box component={Link} to="/contact"
              sx={{ px: 4, py: 1.8, borderRadius: "50px", fontWeight: 600, fontSize: "1rem",
                border: "2px solid rgba(255,140,0,0.6)", color: "white", textDecoration: "none",
                "&:hover": { background: "rgba(255,140,0,0.15)", transform: "translateY(-4px)" } }}>
              Book a Free Consultation
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
