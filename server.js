const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname)));
app.use(session({
  secret: process.env.SESSION_SECRET || 'refurbx-secret-2026',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

const products = [
  { id: 1, name: 'iPhone 15 Pro', brand: 'Apple', category: 'smartphone', storage: '256GB', ram: '8GB', battery: 95, grade: 'A+', condition: 'Excellent', price: 98900, mrp: 134900, color: 'Natural Titanium', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80', warranty: '12 months', rating: 4.9, reviews: 312 },
  { id: 2, name: 'iPhone 14 Pro Max', brand: 'Apple', category: 'smartphone', storage: '256GB', ram: '6GB', battery: 92, grade: 'A+', condition: 'Excellent', price: 84999, mrp: 119900, color: 'Deep Purple', image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&q=80', warranty: '12 months', rating: 4.8, reviews: 487 },
  { id: 3, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'smartphone', storage: '256GB', ram: '12GB', battery: 94, grade: 'A', condition: 'Excellent', price: 79999, mrp: 109999, color: 'Titanium Black', image: 'https://images.unsplash.com/photo-1706016660688-2aa1f7cace55?w=600&q=80', warranty: '12 months', rating: 4.7, reviews: 256 },
  { id: 4, name: 'Google Pixel 8 Pro', brand: 'Google', category: 'smartphone', storage: '128GB', ram: '12GB', battery: 93, grade: 'A+', condition: 'Excellent', price: 54999, mrp: 84999, color: 'Obsidian', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', warranty: '12 months', rating: 4.8, reviews: 189 },
  { id: 5, name: 'OnePlus 12', brand: 'OnePlus', category: 'smartphone', storage: '256GB', ram: '16GB', battery: 91, grade: 'A', condition: 'Excellent', price: 44999, mrp: 64999, color: 'Silky Black', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80', warranty: '12 months', rating: 4.6, reviews: 143 },
  { id: 6, name: 'Samsung Galaxy S23', brand: 'Samsung', category: 'smartphone', storage: '128GB', ram: '8GB', battery: 89, grade: 'A', condition: 'Good', price: 39999, mrp: 74999, color: 'Phantom Black', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80', warranty: '12 months', rating: 4.5, reviews: 322 },
  { id: 7, name: 'MacBook Air M2', brand: 'Apple', category: 'laptop', storage: '512GB', ram: '16GB', battery: 93, grade: 'A+', condition: 'Excellent', price: 72499, mrp: 119900, color: 'Midnight Navy', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80', warranty: '12 months', rating: 4.9, reviews: 298 },
  { id: 8, name: 'MacBook Pro 14 M3', brand: 'Apple', category: 'laptop', storage: '1TB', ram: '18GB', battery: 95, grade: 'A+', condition: 'Excellent', price: 134999, mrp: 189900, color: 'Space Black', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80', warranty: '12 months', rating: 4.9, reviews: 156 },
  { id: 9, name: 'Dell XPS 15', brand: 'Dell', category: 'laptop', storage: '512GB', ram: '32GB', battery: 88, grade: 'A', condition: 'Excellent', price: 89999, mrp: 149999, color: 'Platinum Silver', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80', warranty: '12 months', rating: 4.7, reviews: 201 },
  { id: 10, name: 'Lenovo ThinkPad X1', brand: 'Lenovo', category: 'laptop', storage: '512GB', ram: '16GB', battery: 91, grade: 'A+', condition: 'Excellent', price: 67999, mrp: 119999, color: 'Carbon Black', image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&q=80', warranty: '12 months', rating: 4.8, reviews: 134 },
  { id: 11, name: 'HP Precision Book G5', brand: 'HP', category: 'laptop', storage: '1TB', ram: '32GB', battery: 86, grade: 'A', condition: 'Good', price: 112000, mrp: 159999, color: 'Matte Black', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80', warranty: '12 months', rating: 4.6, reviews: 87 },
  { id: 12, name: 'ASUS ROG Zephyrus', brand: 'ASUS', category: 'laptop', storage: '1TB', ram: '32GB', battery: 85, grade: 'A', condition: 'Good', price: 98999, mrp: 159999, color: 'Moonlight White', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80', warranty: '12 months', rating: 4.7, reviews: 167 },
];

const quoteMultipliers = {
  condition: { Excellent: 0.65, Good: 0.50, Fair: 0.35, Cracked: 0.15 },
  battery: (b) => b >= 90 ? 1.0 : b >= 80 ? 0.9 : b >= 70 ? 0.75 : 0.5,
  accessories: { original_box: 0.05, charger: 0.03, earphones: 0.02 }
};

const basePrices = {
  'iPhone 15 Pro': 80000, 'iPhone 14 Pro Max': 70000, 'iPhone 13 Pro': 55000,
  'Samsung Galaxy S24 Ultra': 65000, 'Samsung Galaxy S23': 45000,
  'Google Pixel 8 Pro': 50000, 'OnePlus 12': 40000,
  'MacBook Air M2': 90000, 'MacBook Pro 14': 130000,
  'Dell XPS 15': 80000, 'Lenovo ThinkPad X1': 70000,
};

const orders = [
  { id: 'RX-90124', productName: 'iPhone 14 Pro Max', status: 'Out for Delivery', stage: 4, eta: '2026-05-08', price: 84999 },
  { id: 'RX-88420', productName: 'MacBook Air M2', status: 'Quality Control', stage: 3, eta: '2026-05-10', price: 72499 },
];

app.get('/api/products', (req, res) => {
  let results = [...products];
  const { category, brand, condition, storage, minPrice, maxPrice, sort } = req.query;
  if (category) results = results.filter(p => p.category === category);
  if (brand) results = results.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  if (condition) results = results.filter(p => p.condition === condition);
  if (storage) results = results.filter(p => p.storage === storage);
  if (minPrice) results = results.filter(p => p.price >= parseInt(minPrice));
  if (maxPrice) results = results.filter(p => p.price <= parseInt(maxPrice));
  if (sort === 'price_asc') results.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') results.sort((a, b) => b.price - a.price);
  if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
  res.json({ products: results, total: results.length });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.get('/api/cart', (req, res) => {
  if (!req.session.cart) req.session.cart = [];
  const cart = req.session.cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  });
  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.qty, 0);
  res.json({ cart, total, count: cart.reduce((s, i) => s + i.qty, 0) });
});

app.post('/api/cart', (req, res) => {
  if (!req.session.cart) req.session.cart = [];
  const { productId, qty = 1 } = req.body;
  const existing = req.session.cart.find(i => i.productId === productId);
  if (existing) { existing.qty += qty; }
  else { req.session.cart.push({ productId, qty }); }
  res.json({ success: true, cartCount: req.session.cart.reduce((s, i) => s + i.qty, 0) });
});

app.put('/api/cart/:productId', (req, res) => {
  if (!req.session.cart) req.session.cart = [];
  const id = parseInt(req.params.productId);
  const { qty } = req.body;
  if (qty <= 0) { req.session.cart = req.session.cart.filter(i => i.productId !== id); }
  else { const item = req.session.cart.find(i => i.productId === id); if (item) item.qty = qty; }
  res.json({ success: true });
});

app.delete('/api/cart/:productId', (req, res) => {
  if (!req.session.cart) req.session.cart = [];
  req.session.cart = req.session.cart.filter(i => i.productId !== parseInt(req.params.productId));
  res.json({ success: true });
});

app.post('/api/quote', (req, res) => {
  const { deviceName, condition, batteryHealth, accessories = [] } = req.body;
  const base = basePrices[deviceName] || 30000;
  const condMult = quoteMultipliers.condition[condition] || 0.4;
  const batMult = quoteMultipliers.battery(parseInt(batteryHealth) || 85);
  let accBonus = accessories.reduce((s, a) => s + (quoteMultipliers.accessories[a] || 0), 0);
  const quote = Math.round(base * condMult * batMult * (1 + accBonus));
  const range = { min: Math.round(quote * 0.95), max: Math.round(quote * 1.05) };
  setTimeout(() => res.json({ quote, range, deviceName, condition, batteryHealth }), 1200);
});

app.post('/api/orders', (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  const orderId = 'RX-' + Math.floor(Math.random() * 90000 + 10000);
  const eta = new Date(); eta.setDate(eta.getDate() + 3);
  const order = { id: orderId, items: req.session.cart, status: 'Order Placed', stage: 1, eta: eta.toISOString().split('T')[0] };
  orders.push(order);
  req.session.cart = [];
  res.json({ success: true, orderId, eta: order.eta });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const results = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  ).slice(0, 8);
  res.json({ results });
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', brand: 'RefurbX', version: '1.0.0' }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
['smartphones', 'laptops', 'product', 'cart', 'checkout', 'sell', 'quote', 'track', 'account', 'process', 'support'].forEach(page => {
  app.get(`/${page}`, (req, res) => res.sendFile(path.join(__dirname, `${page}.html`)));
  app.get(`/${page}.html`, (req, res) => res.sendFile(path.join(__dirname, `${page}.html`)));
});

app.listen(PORT, () => console.log(`\n🚀 RefurbX server running at http://localhost:${PORT}\n`));
module.exports = app;
