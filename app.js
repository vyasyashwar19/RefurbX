// RefurbX Shared App Utilities
const RefurbX = {
  api: {
    async get(endpoint) {
      const r = await fetch('/api' + endpoint);
      return r.json();
    },
    async post(endpoint, data) {
      const r = await fetch('/api' + endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      return r.json();
    },
    async put(endpoint, data) {
      const r = await fetch('/api' + endpoint, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      return r.json();
    },
    async delete(endpoint) {
      const r = await fetch('/api' + endpoint, { method: 'DELETE' });
      return r.json();
    }
  },

  formatPrice(p) { return '₹' + p.toLocaleString('en-IN'); },

  async updateCartCount() {
    try {
      const { count } = await this.api.get('/cart');
      document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
      });
    } catch (e) {}
  },

  async addToCart(productId) {
    const btn = document.querySelector(`[data-add-cart="${productId}"]`);
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span>'; }
    try {
      await this.api.post('/cart', { productId, qty: 1 });
      await this.updateCartCount();
      this.showToast('Added to cart!', 'success');
    } catch (e) { this.showToast('Error adding to cart', 'error'); }
    if (btn) { btn.disabled = false; btn.innerHTML = '<span class="material-symbols-outlined">add_shopping_cart</span>'; }
  },

  showToast(msg, type = 'success') {
    const t = document.createElement('div');
    const icon = type === 'success' ? 'check_circle' : 'error';
    const color = type === 'success' ? '#00dbe9' : '#ff4444';
    t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;background:#1e2020;border:1px solid ${color};color:#e2e2e2;padding:16px 24px;display:flex;align-items:center;gap:12px;font-family:'Space Grotesk',sans-serif;font-size:14px;box-shadow:0 0 20px rgba(0,219,233,0.2);animation:slideIn 0.3s ease;`;
    t.innerHTML = `<span class="material-symbols-outlined" style="color:${color}">${icon}</span>${msg}`;
    document.body.appendChild(t);
    const style = document.createElement('style');
    style.textContent = '@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}';
    document.head.appendChild(style);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 2500);
  },

  initSearch() {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!input || !results) return;
    let timeout;
    input.addEventListener('input', () => {
      clearTimeout(timeout);
      const q = input.value.trim();
      if (q.length < 2) { results.style.display = 'none'; return; }
      timeout = setTimeout(async () => {
        const data = await this.api.get('/search?q=' + encodeURIComponent(q));
        if (data.results.length === 0) { results.style.display = 'none'; return; }
        results.innerHTML = data.results.map(p => `
          <a href="/product?id=${p.id}" class="flex items-center gap-4 p-3 hover:bg-surface-container-high transition-colors">
            <div class="w-10 h-10 bg-surface-container-highest rounded flex items-center justify-center text-primary-fixed-dim">
              <span class="material-symbols-outlined text-sm">${p.category === 'smartphone' ? 'smartphone' : 'laptop'}</span>
            </div>
            <div>
              <div class="font-medium text-on-surface text-sm">${p.name}</div>
              <div class="text-xs text-on-surface-variant">${p.category} · ${RefurbX.formatPrice(p.price)}</div>
            </div>
          </a>
        `).join('');
        results.style.display = 'block';
      }, 300);
    });
    document.addEventListener('click', (e) => { if (!input.contains(e.target)) results.style.display = 'none'; });
  },

  initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => menu.classList.toggle('hidden'));
  }
};

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  RefurbX.updateCartCount();
  RefurbX.initSearch();
  RefurbX.initMobileMenu();
});
