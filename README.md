

# 💱 Multi-Asset Currency Converter

### 🚀 Real-time Fiat & Crypto Conversion Platform

A modern **production-ready multi-asset converter** supporting both **crypto and fiat currencies** with real-time rates, sleek UI, and blazing fast performance.

Built with **React + Vite + Node.js + Coinbase API** and deployed on **Vercel**.

---

## 🖼️ UI Preview

### 🔥 Main Converter UI

![Main UI](frontend/public/preview/main.png)

### 🪙 Crypto Asset Selector

![Crypto Selector](frontend/public/preview/asset-crypto.png)

### 💵 Fiat Asset Selector

![Fiat Selector](frontend/public/preview/asset-fiat.png)

---

# ✨ Features

### ⚡ Real-Time Conversion

* Live crypto & fiat exchange rates
* Powered by Coinbase API
* Instant calculation

### 🧠 Smart Asset Selector

* Search by currency name or code
* Separate **Fiat & Crypto tabs**
* 100+ crypto supported
* 60+ fiat currencies

### 🎨 Premium UI/UX

* Glassmorphism dark theme
* Smooth transitions
* Live update indicator
* Mobile responsive
* Clean fintech-grade design

### 🔁 Bidirectional Conversion

Convert:

* Crypto ➜ Fiat
* Fiat ➜ Crypto
* Crypto ➜ Crypto
* Fiat ➜ Fiat

### ☁️ Production Ready

* Vercel deployment config
* Environment variable support
* Clean modular structure
* API separated architecture

---

# 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Component-based architecture
* Axios API calls

### Backend

* Node.js
* Express
* Coinbase exchange API
* Environment secured

### Deployment

* Vercel (frontend + backend)
* Serverless API routes

---

# 📁 Project Structure

```
Multi-Asset-Converter/
│
├── api/                       # Serverless API for Vercel
│   ├── server.js              # Express server
│   ├── package.json           # API dependencies
│   └── src/
│       ├── api/
│       │   └── convert.js     # Conversion route
│       └── lib/
│           └── coinbase.js    # Coinbase API logic
│
├── backend/                   # Original backend (local dev)
│   └── ...
│
├── frontend/
│   ├── Components/
│   │   ├── AmountInput.jsx
│   │   ├── AssetSelector.jsx
│   │   ├── ConversionResult.jsx
│   │   ├── ConverterForm.jsx
│   │   ├── RealTimeIcon.jsx
│   │   └── StepButton.jsx
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── lib/currencies.js
│   │   └── services/api.js
│   │
│   ├── public/
│   └── index.html
│
├── vercel.json
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env` (for local development)

```
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

For production (Vercel):

```
VITE_API_URL=
```

**Note:** Leave `VITE_API_URL` empty in production to use relative paths.

---

# 🧪 Local Development

## 1️⃣ Clone repo

```bash
git clone https://github.com/MrAsacker/Multi-Asset-Converter.git
cd  Multi-Asset-Converter
```

## 2️⃣ Install dependencies

### API (Backend)

```bash
cd api
yarn install
```

### Frontend

```bash
cd ../frontend
yarn install
```

---

## 3️⃣ Run locally

### Start API

```bash
cd api
yarn start
```

### Start frontend

```bash
cd frontend
yarn dev
```

App runs at:

```
http://localhost:5173
```

---

# 🌍 API Endpoint

### Get Exchange Rates

```
GET /api/convert?base=USD
```

### Response

```json
{
  "success": true,
  "base": "USD",
  "rates": {
    "BTC": 0.00001448,
    "EUR": 0.84625,
    "GBP": 0.73457,
    ...
  }
}
```

---

# 🚀 Deployment (Vercel)

Already configured using:

```
vercel.json
```

### Deploy instantly

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables

Set these in your Vercel dashboard:

| Variable | Value | Environment |
|----------|-------|-------------|
| `FRONTEND_URL` | `https://your-project.vercel.app` | Production |
| `VITE_API_URL` | *(empty)* | Production |
| `NODE_ENV` | `production` | Production |

---

# 🔒 Security Notes

* `.env` ignored via gitignore
* No API keys exposed to frontend
* Server handles rate fetching
* Production safe

---

# 📈 Future Improvements

* 📊 Price charts
* ⭐ Favorites currencies
* 🔔 Rate alerts
* 🌐 Multi-language
* 📱 PWA support
* 🪙 More exchanges (Binance, Kraken)

---

# 👨‍💻 Author

**Built with obsession for clean UI & speed**

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🚀 Deploy your own version

---

# 🏆 License

MIT License — free to use & modify.
