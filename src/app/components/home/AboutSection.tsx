"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const services = [
  "Strategic Consultation",
  "Process Optimization",
  "Performance Enhancement",
  "Digital Solutions",
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white/70 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Services
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-rose-950">
            Comprehensive beauty services in Sydney
          </h2>
          <p className="mt-4 text-muted">
            Elevate your confidence with professional treatments, strategic
            skincare planning, and supportive follow-up tailored to your needs.
          </p>
          <Button
            variant="outlined"
            className="mt-6"
            sx={{
              borderRadius: "999px",
              borderColor: "#f3d0da",
              color: "#7a4e44",
              paddingX: 3,
              paddingY: 1.1,
              textTransform: "none",
              fontSize: "0.9rem",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#eab8c6",
                backgroundColor: "rgba(250, 227, 234, 0.35)",
              },
            }}
          >
            Book Online
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((item) => (
            <Card
              key={item}
              className="rounded-3xl border border-rose-100/60 bg-white shadow-soft"
              elevation={0}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  className="text-rose-900"
                  sx={{ fontWeight: 600 }}
                >
                  {item}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
