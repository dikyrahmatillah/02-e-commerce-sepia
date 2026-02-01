"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function FooterSection() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#2c1b1a",
        color: "#f5ede8",
        borderTop: "1px solid rgba(216, 145, 160, 0.2)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 7 } }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 6 },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2.2fr 2fr 2fr 2fr",
            },
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", color: "#d7b3a6" }}
            >
              Quick Links
            </Typography>
            <List sx={{ mt: 2 }} disablePadding>
              {[
                ["Home", "#"],
                ["About Us", "#about"],
                ["Gallery", "#gallery"],
                ["Pricing", "#pricing"],
                ["Shop", "#products"],
                ["Blog", "#blog"],
                ["Contact", "#contact"],
              ].map((item) => (
                <ListItem key={item[0]} sx={{ py: 0.5, px: 0 }} disableGutters>
                  <Link
                    href={item[1]}
                    underline="none"
                    color="inherit"
                    sx={{ color: "#efe2dc", fontSize: "0.95rem" }}
                  >
                    {item[0]}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", color: "#d7b3a6" }}
            >
              Professional Services
            </Typography>
            <List sx={{ mt: 2 }} disablePadding>
              {[
                "Business Analysis",
                "Strategic Planning",
                "Process Consulting",
                "Performance Review",
                "Growth Strategy",
                "Market Research",
                "Digital Solutions",
                "Results Implementation",
              ].map((item) => (
                <ListItem key={item} sx={{ py: 0.5, px: 0 }} disableGutters>
                  <Typography sx={{ color: "#efe2dc", fontSize: "0.95rem" }}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", color: "#d7b3a6" }}
            >
              Business Solutions
            </Typography>
            <List sx={{ mt: 2 }} disablePadding>
              {[
                "Growth Strategy",
                "Process Optimization",
                "Market Expansion",
                "Strategic Planning",
                "Digital Transformation",
                "Team Development",
                "Performance Enhancement",
                "Revenue Growth",
              ].map((item) => (
                <ListItem key={item} sx={{ py: 0.5, px: 0 }} disableGutters>
                  <Typography sx={{ color: "#efe2dc", fontSize: "0.95rem" }}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.2em", color: "#d7b3a6" }}
            >
              Stay Connected
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {[FacebookRoundedIcon, InstagramIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#f7e8e1",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>

            <Stack spacing={2} sx={{ mt: 3 }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <LocationOnOutlinedIcon sx={{ color: "#d7b3a6", mt: 0.1 }} />
                <Typography sx={{ color: "#efe2dc", fontSize: "0.95rem" }}>
                  Level 1 Suite 11, The Street Suburb, NSW Australia
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneOutlinedIcon sx={{ color: "#d7b3a6" }} />
                <Typography sx={{ color: "#efe2dc", fontSize: "0.95rem" }}>
                  02 1234 4456
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 6 },
            display: "grid",
            gap: 3,
            alignItems: "center",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr 1fr" },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                height: 54,
                width: 54,
                borderRadius: "50%",
                bgcolor: "#c79b45",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2c1b1a",
                fontWeight: 800,
                fontSize: "1.25rem",
              }}
            >
              S
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontFamily: "serif", fontWeight: 600 }}
              >
                Sophia
              </Typography>
              <Typography variant="caption" sx={{ color: "#d7b3a6" }}>
                ALL PURPOSE THEME
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={4}
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
            <Link href="#" underline="none" sx={{ color: "#efe2dc" }}>
              Privacy Policy
            </Link>
            <Link href="#" underline="none" sx={{ color: "#efe2dc" }}>
              Terms &amp; Conditions
            </Link>
          </Stack>

          <Stack
            direction="row"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
          >
            <Link
              href="#top"
              underline="none"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: "#f4f0ed",
                color: "#2c1b1a",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ArrowUpwardIcon fontSize="small" /> Back to top
            </Link>
          </Stack>
        </Box>
      </Container>

      <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <Container
          maxWidth="lg"
          sx={{
            py: 2.5,
            display: "grid",
            gap: 2,
            alignItems: "center",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr 1.2fr" },
          }}
        >
          <Typography variant="caption" sx={{ color: "#d7b3a6" }}>
            Copyright © 2026 Sophia | All Rights Reserved.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            {["Mastercard", "PayPal", "VISA", "G Pay", "Apple Pay"].map(
              (item) => (
                <Typography
                  key={item}
                  variant="caption"
                  sx={{ color: "#efe2dc", fontWeight: 600 }}
                >
                  {item}
                </Typography>
              ),
            )}
          </Stack>
          <Typography
            variant="caption"
            sx={{ color: "#d7b3a6", textAlign: { xs: "left", md: "right" } }}
          >
            Design by WP Custom Themes
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
