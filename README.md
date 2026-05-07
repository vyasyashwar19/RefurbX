# RefurbX — Premium Refurbished Tech Marketplace
> Precision Renewed. Est. 2026.

A full-stack e-commerce website for **RefurbX** — India's premium refurbished smartphone and laptop marketplace. Built with Node.js/Express backend + Vanilla HTML/CSS/JS frontend (no build tools required).

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open in browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
refurbx/
├── server.js              # Express backend + REST API
├── package.json
├── public/
│   ├── index.html         # Homepage
│   ├── smartphones.html   # Smartphone catalog + filters
│   ├── laptops.html       # Laptop catalog + filters
│   ├── product.html       # Product detail page
│   ├── cart.html          # Shopping cart
│   ├── checkout.html      # Secure checkout + payment
│   ├── sell.html          # Sell your gadget landing
│   ├── quote.html         # AI-powered quote generator (4-step)
│   ├── track.html         # Order pipeline tracker
│   ├── account.html       # User dashboard
│   ├── process.html       # Refurbishment process page
│   ├── support.html       # Support center + FAQ
│   └── assets/
│       ├── logo.png       # RefurbX brand logo
│       ├── app.js         # Shared utilities (cart, search, toast)
│       ├── shared.js      # Navbar/footer injection
│       └── base.css       # Shared CSS tokens
```

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (filter: category, brand, condition, storage, price, sort) |
| GET | `/api/products/:id` | Single product detail |
| GET | `/api/cart` | Get cart contents |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:productId` | Update item quantity |
| DELETE | `/api/cart/:productId` | Remove item from cart |
| POST | `/api/quote` | Calculate sell quote (AI engine) |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/:id` | Track order by ID |
| GET | `/api/search?q=` | Search products |
| GET | `/api/health` | Server health check |

---

## 🌐 Pages

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Hero, featured deals, process pipeline |
| Smartphones | `/smartphones` | Catalog with sidebar filters |
| Laptops | `/laptops` | Catalog with sidebar filters |
| Product | `/product?id=1` | Detail, 40-point inspection, tabs |
| Cart | `/cart` | Cart items, promo codes, summary |
| Checkout | `/checkout` | Shipping + payment + order placement |
| Sell | `/sell` | BuyBack landing page |
| Quote | `/quote` | 4-step AI quote wizard |
| Track | `/track` | Live order pipeline tracker |
| Account | `/account` | Dashboard with eco stats |
| Process | `/process` | 4-stage refurbishment detail |
| Support | `/support` | FAQ accordion + contact form |

---

## ☁️ Deploy to Production

### Option 1 — Render.com (Recommended, Free Tier)
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect repo, set **Start Command**: `npm start`
4. Set environment: `NODE_ENV=production`
5. Deploy ✅

### Option 2 — Railway.app
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Option 3 — Heroku
```bash
heroku create refurbx-app
git push heroku main
heroku open
```

### Option 4 — VPS (Ubuntu/Nginx)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# Clone and run
npm install
npm start

# PM2 for process management
npm install -g pm2
pm2 start server.js --name refurbx
pm2 startup && pm2 save

# Nginx reverse proxy
# Point nginx to localhost:3000
```

---

## ⚙️ Environment Variables

```bash
PORT=3000             # Default: 3000
NODE_ENV=production   # Set for production
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#121414` |
| Surface | `#1e2020` |
| Cyan Accent | `#00dbe9` |
| On-Accent | `#002022` |
| Text Primary | `#e2e2e2` |
| Text Muted | `#b9cacb` |
| Border | `#2A3838` |

**Fonts**: Space Grotesk (headings/UI) + Work Sans (body)

---

## 🛠 Tech Stack

- **Backend**: Node.js + Express 4
- **Frontend**: Vanilla HTML5 + Tailwind CSS CDN + Vanilla JS
- **State**: Server-side sessions (express-session)
- **Security**: Helmet.js, CORS, compression
- **No database required** (in-memory for demo; swap for MongoDB/PostgreSQL for production)

---

## 🔒 Production Checklist

- [ ] Replace `express-session` secret with env variable
- [ ] Add MongoDB/PostgreSQL for persistent data
- [ ] Set `NODE_ENV=production`
- [ ] Configure HTTPS (auto on Render/Railway)
- [ ] Add rate limiting (`express-rate-limit`)
- [ ] Set up payment gateway (Razorpay/PayU integration)

---

**© 2026 RefurbX Technologies — Precision Renewed.**
