"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ConsultSection() {
  return (
    <section id="consult" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 rounded-[36px] border border-rose-100/60 bg-white/90 p-10 shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              Complimentary Consultations
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-rose-950">
              Discover your ideal treatment plan
            </h2>
            <p className="mt-4 text-muted">
              We tailor services to your goals with a personal consultation that
              guides you from small changes to radiant transformation.
            </p>
            <Button
              variant="contained"
              className="mt-6 shadow-soft"
              sx={{
                borderRadius: "999px",
                backgroundColor: "#d66385",
                paddingX: 3,
                paddingY: 1.2,
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#c45578" },
              }}
            >
              Book Free Consultation
            </Button>
          </div>
          <Card className="rounded-3xl bg-rose-50/70" elevation={0}>
            <CardContent className="space-y-4">
              <Typography
                variant="caption"
                className="text-rose-500"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                Offers
              </Typography>
              <Typography
                variant="h6"
                className="text-rose-950"
                sx={{ fontWeight: 600 }}
              >
                Use code “SOPHIE10” for 10% off
              </Typography>
              <Typography variant="body2" className="text-muted">
                We are open 7 days a week.
              </Typography>
              <div className="mt-6 h-40 rounded-2xl bg-[radial-gradient(circle_at_top,#fbd1c8,#f6b2c8)]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
