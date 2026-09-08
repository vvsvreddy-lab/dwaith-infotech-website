import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Software Consulting",
    subtitle: "Architecture • Engineering • Digital Transformation",
    description:
      "We design and build scalable, secure, and high-performance software solutions for modern businesses.",
    bg: "https://images.unsplash.com/photo-1531973576160-7125cd663d86",
  },
  {
    title: "IT Staffing Solutions",
    subtitle: "Contract • Permanent • Remote Teams",
    description:
      "Hire top software engineers, AI experts, and cloud professionals aligned to your business goals.",
    bg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "End-to-End Delivery",
    subtitle: "From Idea to Production",
    description:
      "We take ownership from concept to deployment, ensuring quality, speed, and reliability at every stage.",
    bg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
];

export default function HeroCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      loop
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      style={{ height: "100vh" }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              backgroundImage: `linear-gradient(
                rgba(0,0,0,0.7),
                rgba(0,0,0,0.7)
              ), url(${slide.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              px: { xs: 2, md: 12 },
              color: "#fff",
            }}
          >
            <Box maxWidth={700}>
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
              >
                {slide.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{ opacity: 0.9, mb: 2 }}
              >
                {slide.subtitle}
              </Typography>

              <Typography
                variant="body1"
                sx={{ opacity: 0.85, mb: 4 }}
              >
                {slide.description}
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
