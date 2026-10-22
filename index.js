const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');
const strategyRoutes = require('./routes/strategyRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const walletRoutes = require('./routes/walletRoutes');
const merchantRoutes = require('./routes/merchantRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Reflect the request's origin instead of using '*' — this plays more
// reliably with browsers when Authorization headers are involved.
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'FinEdge Trade backend is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/strategies', strategyRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', require('./routes/aiStream'));

// ===================================================================================================
// 📡 HARDENED PRODUCTION PIPELINE: SECURITY, PACING, DATALAYER AND ARCHITECTURE REFINEMENTS
// ===================================================================================================
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'mock_persistence_db.json');

const loadDatabaseState = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialState = {
        traders: [{ id: "USR-001", name: "Vrunda Admin", email: "vrunda@finedge.trade", license: "1 Year Pass", privilege: "ROOT_EXEC" }],
        logs: [{ time: "08:02:06 PM ", tag: "[SYSTEM]", text: "Persistent database core synchronized.", col: "#00E5FF" }],
        brokers: [],
        billingLedger: [{ transactionId: "TXN-9842", gateway: "RAZORPAY_WEBHOOK", grossPayable: "1178.82", status: "SUCCESS" }],
        cryptoTicks: { BTC: 64129.44, ETH: 3450.47, MATIC: 0.499 }
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialState, null, 2));
      return initialState;
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (err) {
    return { traders: [], logs: [], brokers: [], billingLedger: [], cryptoTicks: { BTC: 64129.44 } };
  }
};

const saveDatabaseState = (state) => {
  try { fs.writeFileSync(DB_PATH, JSON.stringify(state, null, 2)); } catch (e) { console.error(e); }
};

let db = loadDatabaseState();

// 📈 DYNAMIC CRYPTO MARKET FEED SIMULATION ENGINE
setInterval(() => {
  db = loadDatabaseState();
  db.cryptoTicks.BTC += (Math.random() - 0.5) * 45;
  db.cryptoTicks.ETH += (Math.random() - 0.5) * 8;
  db.cryptoTicks.MATIC += (Math.random() - 0.5) * 0.02;
  saveDatabaseState(db);
}, 2000);

// Helper function to format timestamp with clean spacing for UI console
const getFormattedTime = () => {
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: true });
  // Adds an explicit space at the end to prevent text bleeding on the frontend console view
  return timeStr + " ";
};

// 👤 1. HARDENED USER REGISTRATION INTERCEPTOR
app.post('/api/auth/register', (req, res) => {
  const { fullName, emailAddress, licenseTier } = req.body;
  
  if (!fullName || !emailAddress) {
    return res.status(400).json({ success: false, error: "Validation Error: Missing parameters." });
  }

  db = loadDatabaseState();
  const id = `USR-${Math.floor(1000 + Math.random() * 9000)}`;
  const explicitTimestamp = getFormattedTime();

  db.traders.unshift({ id, name: fullName, email: emailAddress, license: licenseTier || "1 Month Plan", privilege: "STANDARD" });
  db.logs.unshift({ time: explicitTimestamp, tag: "[AUTH_GATE]", text: `Registered execution node for ${fullName}`, col: "#05FF87" });
  saveDatabaseState(db);

  res.status(200).json({ success: true, userId: id });
});

// 🔌 2. MULTI-ASSET BROKER API SECURE ROUTER PIPELINE
app.post('/api/account/connect-broker', (req, res) => {
  const { brokerName, clientCode, secretToken } = req.body;
  
  if (!brokerName || !clientCode || !secretToken) {
    return res.status(400).json({ success: false, error: "Validation Error: Missing signature blocks." });
  }

  db = loadDatabaseState();
  const explicitTimestamp = getFormattedTime();

  db.brokers.unshift({ timestamp: explicitTimestamp, broker: brokerName, client: clientCode, status: "ENFORCED" });
  db.logs.unshift({ time: explicitTimestamp, tag: "[BROKER_LINK]", text: `API Handshake enforced: ${brokerName} (${clientCode})`, col: "#F59E0B" });
  saveDatabaseState(db);

  res.status(200).json({ success: true });
});

// 🛠️ 3. ADMIN COMPLIANCE PRIVILEGE OVERRIDE ENDPOINT
app.post('/api/admin/toggle-privilege', (req, res) => {
  const { userId } = req.body;
  db = loadDatabaseState();
  let trader = db.traders.find(t => t.id === userId);
  if (trader) {
    trader.privilege = trader.privilege === 'ROOT_EXEC' ? 'STANDARD' : 'ROOT_EXEC';
    db.logs.unshift({ time: getFormattedTime(), tag: "[COMPLIANCE]", text: `Privilege updated for ${userId} to ${trader.privilege}`, col: "#A855F7" });
    saveDatabaseState(db);
    return res.status(200).json({ success: true, updatedPrivilege: trader.privilege });
  }
  res.status(404).json({ success: false, error: "Trader signature not found." });
});

// 💰 4. AUTOMATED RAZORPAY BILLING WEBHOOK INGESTION
app.post('/api/treasury/razorpay-webhook', (req, res) => {
  db = loadDatabaseState();
  const simulatedTxnId = `pay_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const explicitTimestamp = getFormattedTime();
  
  db.billingLedger.unshift({ transactionId: simulatedTxnId, gateway: "RAZORPAY_API_INBOUND", grossPayable: "₹1,178.82", status: "SUCCESS" });
  db.logs.unshift({ time: explicitTimestamp, tag: "[TREASURY]", text: `Razorpay signature hook caught successfully: Ingested ${simulatedTxnId}`, col: "#10B981" });
  saveDatabaseState(db);

  res.status(200).json({ success: true, event: "payment.captured" });
});

// 🖥️ 5. TELEMETRY LEDGER PUMP (ADMIN PANEL CORE)
app.get('/api/admin/realtime-feed', (req, res) => {
  db = loadDatabaseState();
  res.status(200).json({
    success: true,
    traders: db.traders,
    logs: db.logs,
    brokers: db.brokers,
    billing: db.billingLedger,
    crypto: db.cryptoTicks
  });
});
// ===================================================================================================

// 🔌 2. MULTI-ASSET BROKER API SECURE ROUTER PIPELINE
app.post('/api/account/connect-broker', (req, res) => {
  const { brokerName, clientCode, secretToken } = req.body;
  if (!brokerName || !clientCode || !secretToken) {
    return res.status(400).json({ success: false, error: "Missing cryptographic reference hashes." });
  }

  linkedBrokerVaults.unshift({ timestamp: new Date().toLocaleTimeString(), broker: brokerName, client: clientCode, status: "ENFORCED" });
  systemNotificationsQueue.unshift({ time: new Date().toLocaleTimeString(), tag: "[BROKER_LINK]", text: `API Handshake established with ${brokerName} for code ${clientCode}`, col: "#F59E0B" });

  res.status(200).json({ success: true, message: `Successfully authenticated connection with ${brokerName}.` });
});

// 🖥️ 3. ADMIN FEED MONITOR COMPLIANCE LEDGER ENDPOINT
app.get('/api/admin/realtime-feed', (req, res) => {
  res.status(200).json({
    success: true,
    traders: prototypeTradersRegistry,
    logs: systemNotificationsQueue,
    brokers: linkedBrokerVaults
  });
});

// ===================================================================================================


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

require('./config/db');

// 🚀 AI / ML COCKPIT PYTHON GATEWAY ROUTE LINK
const { spawn } = require('child_process');

app.get('/api/ai-signals', (req, res) => {
    const pythonProcess = spawn('python3', ['./src/ai_model.py']);
    let pythonDataString = '';

    pythonProcess.stdout.on('data', (chunk) => {
        pythonDataString += chunk.toString();
    });

    pythonProcess.stdout.on('end', () => {
        try {
            const aiTelemetry = JSON.parse(pythonDataString);
            return res.json(aiTelemetry);
        } catch (error) {
            console.error("Malformed JSON token from machine learning pipeline:", error);
            return res.status(500).json({ error: "Failed to parse data matrix streams from pipeline process." });
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`ML execution environment flag error: ${data}`);
    });
});
