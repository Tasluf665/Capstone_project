import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, TextField, Paper, Typography, Fade, useTheme } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const Chatbot = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text: input },
      // Placeholder bot reply
      { from: "bot", text: "I'm just a placeholder! Soon I'll be powered by Google Agent." },
    ]);
    setInput("");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Fade in={!open}>
        <IconButton
          color="primary"
          size="large"
          onClick={() => setOpen(true)}
          sx={{ boxShadow: 3, bgcolor: theme.palette.primary.main }}
        >
          <ChatIcon fontSize="large" sx={{ color: theme.palette.primary.contrastText }} />
        </IconButton>
      </Fade>
      <Fade in={open}>
        <Paper
          elevation={6}
          sx={{
            width: 340,
            height: 420,
            display: open ? "flex" : "none",
            flexDirection: "column",
            position: "relative",
            mt: 2,
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: theme.palette.primary.dark,
              color: theme.palette.primary.contrastText,
              px: 2,
              py: 1,
            }}
          >
            <Typography variant="subtitle1">Chatbot</Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "inherit" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              bgcolor: theme.palette.primary.main,
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  mb: 1.5,
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: msg.from === "user"
                      ? theme.palette.secondary.main
                      : theme.palette.background.paper,
                    color: msg.from === "user"
                      ? theme.palette.secondary.contrastText || theme.palette.getContrastText(theme.palette.secondary.main)
                      : theme.palette.text.primary,
                    maxWidth: "80%",
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <Box component="form" onSubmit={handleSend} sx={{ display: "flex", p: 1, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              sx={{
                mr: 1,
                bgcolor: theme.palette.background.paper,
                '& .MuiInputBase-root': {
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.dark,
                  },
                },
                '& .MuiInputBase-input': {
                  color: theme.palette.text.primary,
                },
              }}
              autoComplete="off"
            />
            <IconButton type="submit" color="primary" disabled={!input.trim()}>
              <ChatIcon />
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default Chatbot; 