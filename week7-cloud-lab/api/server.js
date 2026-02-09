// server.js
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/database');

const app = express(); // ⭐ ต้องอยู่ก่อน app.use ⭐

// middleware
app.use(express.json());

// Import modules
const taskRoutes = require('./src/routes/taskRoutes');

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8080',
            'https://localhost',
            /\.railway\.app$/
        ];

        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });

        callback(null, true); // lab อนุโลมทั้งหมด
    },
    credentials: true
};

app.use(cors(corsOptions));

/* =========================
   API ROUTES (สำคัญมาก)
   ========================= */

// Health Check (อาจารย์ใช้)
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        data: {
            status: 'healthy',
            database: 'railway',
            timestamp: new Date().toISOString()
        }
    });
});
// root (ไว้เช็คว่า server รัน)
app.get('/', (req, res) => {
    res.send('API is running');
});
// Task routes
app.use('/api/tasks', taskRoutes);



// Railway PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
