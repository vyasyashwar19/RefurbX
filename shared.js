// Shared navbar/footer HTML injector
const NAVBAR = `
<header class="glass sticky top-0 z-50 border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(0,219,233,0.08)]">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
    <div class="flex items-center gap-8">
      <a href="/" class="flex items-center gap-3">
        <img src="/assets/logo.png" alt="RefurbX" class="h-10 w-10 object-contain"/>
        <span class="font-grotesk font-bold text-xl text-primary-fixed-dim tracking-tight">RefurbX</span>
      </a>
      <nav class="hidden md:flex items-center gap-6" id="main-nav"></nav>
    </div>
    <div class="flex items-center gap-4">
      <div class="relative hidden md:block">
        <input id="search-input" type="text" placeholder="Search devices..." class="bg-surface-container border border-outline-variant/50 rounded-none text-sm px-4 py-2 pl-10 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary-fixed-dim w-52 transition-all font-work"/>
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
        <div id="search-results" class="absolute top-full left-0 w-72 bg-surface-container-low border border-outline-variant/50 shadow-xl z-50 hidden max-h-80 overflow-y-auto"></div>
      </div>
      <a href="/cart" class="relative text-on-surface-variant hover:text-primary-fixed-dim transition-colors">
        <span class="material-symbols-outlined">shopping_cart</span>
        <span class="cart-count absolute -top-1.5 -right-1.5 bg-primary-fixed-dim text-on-primary-fixed text-[9px] font-bold w-4 h-4 rounded-full items-center justify-center font-grotesk hidden"></span>
      </a>
      <a href="/account" class="text-on-surface-variant hover:text-primary-fixed-dim transition-colors">
        <span class="material-symbols-outlined">account_circle</span>
      </a>
      <button id="mobile-menu-toggle" class="md:hidden text-on-surface-variant"><span class="material-symbols-outlined">menu</span></button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden bg-surface-container-low border-t border-outline-variant/30 px-6 py-4 space-y-3">
    <a href="/smartphones" class="block font-grotesk text-sm text-on-surface-variant py-2">Smartphones</a>
    <a href="/laptops" class="block font-grotesk text-sm text-on-surface-variant py-2">Laptops</a>
    <a href="/sell" class="block font-grotesk text-sm text-on-surface-variant py-2">Sell Gadget</a>
    <a href="/process" class="block font-grotesk text-sm text-on-surface-variant py-2">Our Process</a>
    <a href="/support" class="block font-grotesk text-sm text-on-surface-variant py-2">Support</a>
  </div>
</header>`;

const NAV_LINKS = [
  { href: '/smartphones', label: 'Smartphones' },
  { href: '/laptops', label: 'Laptops' },
  { href: '/sell', label: 'Sell Gadget' },
  { href: '/process', label: 'Our Process' },
  { href: '/support', label: 'Support' },
];

const FOOTER = `
<footer class="bg-surface-container-lowest border-t border-outline-variant/20 mt-0">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 py-16">
    <div class="grid md:grid-cols-4 gap-10 mb-12">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <img src="/assets/logo.png" alt="RefurbX" class="h-8 w-8 object-contain"/>
          <span class="font-grotesk font-bold text-lg text-primary-fixed-dim">RefurbX</span>
        </div>
        <p class="font-work text-sm text-on-surface-variant leading-relaxed">Precision renewed. India's most trusted refurbishment marketplace — Est. 2026.</p>
      </div>
      <div>
        <h4 class="font-grotesk text-xs text-on-surface-variant uppercase tracking-widest mb-4">Shop</h4>
        <div class="space-y-2">
          <a href="/smartphones" class="block font-work text-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Smartphones</a>
          <a href="/laptops" class="block font-work text-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Laptops</a>
        </div>
      </div>
      <div>
        <h4 class="font-grotesk text-xs text-on-surface-variant uppercase tracking-widest mb-4">Sell</h4>
        <div class="space-y-2">
          <a href="/sell" class="block font-work text-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Sell Your Gadget</a>
          <a href="/quote" class="block font-work text-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Get Instant Quote</a>
        </div>
      </div>
      <div>
        <h4 class="font-grotesk text-xs text-on-surface-variant uppercase tracking-widest mb-4">Help</h4>
        <div class="space-y-2">
          <a href="/support" class="block font-work text-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Support Center</a>
          <a href="/track" class="block font-work text-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Track Order</a>
          <a href="/account" class="block font-work text-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors">My Account</a>
        </div>
      </div>
    </div>
    <div class="border-t border-outline-variant/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="font-grotesk text-xs text-on-surface-variant">© 2026 RefurbX Technologies. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="font-grotesk text-xs text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Privacy</a>
        <a href="#" class="font-grotesk text-xs text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Terms</a>
        <a href="#" class="font-grotesk text-xs text-on-surface-variant hover:text-primary-fixed-dim transition-colors">Warranty</a>
      </div>
    </div>
  </div>
</footer>`;

function injectShared(activePage) {
  document.getElementById('navbar-placeholder').innerHTML = NAVBAR;
  document.getElementById('footer-placeholder').innerHTML = FOOTER;
  const nav = document.getElementById('main-nav');
  if (nav) {
    nav.innerHTML = NAV_LINKS.map(l => `
      <a href="${l.href}" class="font-grotesk text-sm font-medium tracking-wide transition-colors ${activePage === l.href ? 'text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-0.5' : 'text-on-surface-variant hover:text-primary-fixed-dim'}">${l.label}</a>
    `).join('');
  }
}
