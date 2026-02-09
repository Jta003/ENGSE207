// server.js
const express = require('express');
const cors = require('cors');

const app = express(); // ⭐ สำคัญมาก ต้องมาก่อน app.use ⭐

// middleware
app.use(express.json());

// CORS configuration - รองรับทั้ง Local และ Railway
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8080',
            'https://localhost',
            /\.railway\.app$/   // อนุญาตทุก subdomain ของ railway.app
        ];

        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            console.log('CORS blocked:', origin);
            callback(null, true); // Lab อนุโลม
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

// test route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Railway ต้องใช้ PORT แบบนี้
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
