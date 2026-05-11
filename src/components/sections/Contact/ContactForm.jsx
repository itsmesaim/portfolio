"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import confetti from "canvas-confetti";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const REASON_OPTIONS = [
  { value: "role", label: "Full-time role" },
  { value: "freelance", label: "Freelance / Contract" },
  { value: "collab", label: "Collaboration" },
  { value: "other", label: "Just saying hi" },
];

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { reason: "role" } });

  const onSubmit = async (data) => {
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          reason:
            REASON_OPTIONS.find((r) => r.value === data.reason)?.label ??
            data.reason,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      reset();
      confetti({
        particleCount: 90,
        spread: 75,
        colors: ["#3EFFC2", "#00C896", "#6FFFCF", "#F5F5F5"],
        origin: { y: 0.65 },
      });
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong. Email me directly at saimkaskar1@gmail.com",
      );
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 4,
          background: "#1C1C1C",
          border: "1px solid rgba(62,255,194,0.3)",
          borderRadius: 3,
        }}
      >
        <CheckCircleOutlinedIcon
          sx={{ color: "#3EFFC2", fontSize: 56, mb: 2 }}
        />
        <Typography variant="h4" sx={{ color: "#3EFFC2", mb: 2 }}>
          Message sent ✓
        </Typography>
        <Typography sx={{ color: "#A0A0A0" }}>
          I&apos;ll get back to you within 24 hours.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
      noValidate
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2.5,
        }}
      >
        <TextField
          fullWidth
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>
      <TextField
        select
        fullWidth
        label="What's this about?"
        defaultValue="role"
        {...register("reason")}
      >
        {REASON_OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        multiline
        rows={5}
        label="Message"
        {...register("message", { required: "A message helps!" })}
        error={!!errors.message}
        helperText={errors.message?.message}
      />
      {error && (
        <Alert
          severity="error"
          sx={{
            background: "rgba(255,107,107,0.1)",
            border: "1px solid rgba(255,107,107,0.3)",
          }}
        >
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={sending}
        sx={{ alignSelf: "flex-start", minWidth: 160 }}
      >
        {sending ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={18} color="inherit" />
            Sending...
          </Box>
        ) : (
          "Send Message"
        )}
      </Button>
    </Box>
  );
}
