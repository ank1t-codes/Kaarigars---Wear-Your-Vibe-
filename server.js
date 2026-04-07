// ============================================================
//   VALORÉ — Express Server
//   server.js
// ============================================================

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Cache control for images and assets
app.use((req, res, next) => {
  if (req.url.match(/\.(png|jpg|jpeg|webp|gif|svg|ico|woff2|woff|ttf)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }
  next();
});

// Serve index.html for root and any unmatched routes (SPA-style)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n  ✦ VALORÉ server running`);
  console.log(`  → Local:   http://localhost:${PORT}\n`);
});
