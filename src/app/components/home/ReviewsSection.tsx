"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const testimonials = [
  {
    name: "Joshua M",
    quote:
      "Their professional staff and modern care truly set them apart. Highly recommended!",
  },
  {
    name: "Emily Collins",
    quote:
      "They care about results and personalization. I felt supported at every step.",
  },
  {
    name: "Chrisa Laster",
    quote:
      "A beautiful experience from start to finish. The results are stunning.",
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-white/70 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              Reviews
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-rose-950">
              Hear what our clients say
            </h2>
            <p className="mt-3 text-muted">
              Honest feedback that reflects our dedication to client care and
              glowing outcomes.
            </p>
            <Card
              className="mt-6 rounded-3xl border border-rose-100/60 bg-white shadow-soft"
              elevation={0}
            >
              <CardContent>
                <Chip
                  label="Google Reviews"
                  size="small"
                  sx={{
                    backgroundColor: "#fde8ef",
                    color: "#d66385",
                    fontWeight: 600,
                  }}
                />
                <Typography
                  variant="h4"
                  className="mt-2 text-rose-950"
                  sx={{ fontWeight: 600 }}
                >
                  5.0
                </Typography>
                <Typography variant="body2" className="text-muted">
                  Based on 104 reviews
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6">
            {testimonials.map((item) => (
              <Card
                key={item.name}
                className="rounded-3xl border border-rose-100/60 bg-white shadow-soft"
                elevation={0}
              >
                <CardContent>
                  <Typography variant="body2" className="text-muted">
                    “{item.quote}”
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className="mt-4 text-rose-900"
                    sx={{ fontWeight: 600 }}
                  >
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
