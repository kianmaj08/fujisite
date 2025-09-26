// ==========================================
// APP INITIALIZATION & ROUTER
// ==========================================

class SimpleRouter {
  constructor() {
    this.routes = {
      '/': this.renderHome.bind(this),
      '/about': this.renderAbout.bind(this),
      '/kontakt': this.renderKontakt.bind(this)
    };
    this.appContainer = null;
    this.init();
  }

  init() {
    window.addEventListener('load', this.handleRoute.bind(this));
    window.addEventListener('hashchange', this.handleRoute.bind(this));
  }

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || '/';
    const route = this.routes[hash] || this.routes['/'];

    if (this.appContainer) {
      route();
    }
  }

  renderHome() {
    this.appContainer.innerHTML = `
      <div class="panels-grid">
        <div class="panel" tabindex="0" role="button" aria-label="Panel 1">
          <div class="panel-content">
            <h3>Panel 1</h3>
            <p>Dies ist der erste Inhaltsbereich. Hier können später weitere Informationen und Funktionen ergänzt werden.</p>
            <p>Die Struktur ist modular aufgebaut und ermöglicht einfache Erweiterungen.</p>
          </div>
        </div>

        <div class="panel" tabindex="0" role="button" aria-label="Panel 2">
          <div class="panel-content">
            <h3>Panel 2</h3>
            <p>Zweiter Bereich mit Liquid-Glass-Design. Alle Panels verwenden die gleiche Basis-Struktur.</p>
            <p>Hover-Effekte und 3D-Transformationen sind bereits implementiert.</p>
          </div>
        </div>

        <div class="panel" tabindex="0" role="button" aria-label="Panel 3">
          <div class="panel-content">
            <h3>Panel 3</h3>
            <p>Dritter Inhaltsbereich mit responsivem Grid-Layout. Das Design passt sich automatisch an verschiedene Bildschirmgrößen an.</p>
          </div>
        </div>

        <div class="panel" tabindex="0" role="button" aria-label="Panel 4">
          <div class="panel-content">
            <h3>Panel 4</h3>
            <p>Vierter Bereich mit Barrierefreiheits-Features. Alle Interaktionselemente sind tastaturzugänglich.</p>
            <p>ARIA-Labels und semantisches HTML sorgen für gute Screenreader-Kompatibilität.</p>
          </div>
        </div>

        <div class="panel" tabindex="0" role="button" aria-label="Panel 5">
          <div class="panel-content">
            <h3>Panel 5</h3>
            <p>Fünfter und letzter Panel-Bereich. Das System kann einfach durch weitere Panels oder neue Routen erweitert werden.</p>
            <p>Die Router-Architektur unterstützt Hash-basierte Navigation für SPA-Funktionalität.</p>
          </div>
        </div>
      </div>
    `;

    this.initPanelEffects();
  }

  renderAbout() {
    this.appContainer.innerHTML = `
      <div class="panels-grid">
        <div class="panel" tabindex="0">
          <div class="panel-content">
            <h3>Über uns</h3>
            <p>Informationen über das Oberstufe.site Projekt und das Team dahinter.</p>
            <p>Diese Seite kann später mit detaillierten Inhalten gefüllt werden.</p>
          </div>
        </div>
      </div>
    `;

    this.initPanelEffects();
  }

  renderKontakt() {
    this.appContainer.innerHTML = `
      <div class="panels-grid">
        <div class="panel" tabindex="0">
          <div class="panel-content">
            <h3>Kontakt</h3>
            <p>Hier können später Kontaktinformationen und ein Kontaktformular eingefügt werden.</p>
            <p>Das modulare System ermöglicht einfache Erweiterungen.</p>
          </div>
        </div>
      </div>
    `;

    this.initPanelEffects();
  }

  initPanelEffects() {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
      // 3D-Tilt-Effekt
      panel.addEventListener('pointermove', (e) => {
        if (!panel.matches(':hover')) return;

        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;

        panel.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      panel.addEventListener('pointerleave', () => {
        panel.style.transform = '';
      });

      // Keyboard support
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          panel.click();
        }
      });
    });
  }
}

// ==========================================
// THEME MANAGEMENT
// ==========================================

class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.loadTheme();
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    }
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme toggle icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('svg');
      if (theme === 'dark') {
        icon.innerHTML = '<path d="M9.598 1.591a.75.75 0 01.785-.175 7 7 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.5 5.5 0 107.678-7.678z" fill="currentColor"/>';
      } else {
        icon.innerHTML = '<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>';
      }
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// ==========================================
// SAKURA ANIMATION SYSTEM
// ==========================================

class SakuraManager {
  constructor() {
    this.sakuraLayer = document.getElementById('sakura-layer');
    this.isEnabled = localStorage.getItem('sakura-enabled') !== 'false';
    this.flybyInterval = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    const sakuraToggle = document.getElementById('sakura-toggle');
    if (sakuraToggle) {
      sakuraToggle.addEventListener('click', this.toggle.bind(this));
      this.updateToggleState();
    }

    // Nur aktivieren wenn nicht reduced-motion
    if (this.isEnabled && !this.prefersReducedMotion) {
      this.startPeriodicFlybys();
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('sakura-enabled', this.isEnabled.toString());
    this.updateToggleState();

    if (this.isEnabled && !this.prefersReducedMotion) {
      this.startPeriodicFlybys();
    } else {
      this.stopPeriodicFlybys();
      this.clearPetals();
    }
  }

  updateToggleState() {
    const toggle = document.getElementById('sakura-toggle');
    if (toggle) {
      toggle.style.opacity = this.isEnabled ? '1' : '0.5';
      toggle.setAttribute('aria-pressed', this.isEnabled.toString());
    }
  }

  createPetal(size = 20, duration = 12000, delay = 0) {
    if (!this.isEnabled || this.prefersReducedMotion) return null;

    const petal = document.createElement('div');
    petal.className = 'sakura-petal';

    // Zufällige Eigenschaften
    const startX = Math.random() * window.innerWidth + 100;
    const startY = -50 - (Math.random() * 100);
    const rotation = Math.random() * 360;

    petal.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${startX}px;
      top: ${startY}px;
      transform: rotate(${rotation}deg);
      animation: flowAcross ${duration}ms linear ${delay}ms forwards, 
                 windSway ${4000 + Math.random() * 2000}ms ease-in-out infinite;
    `;

    return petal;
  }

  spawnSwooshBurst() {
    if (!this.isEnabled || this.prefersReducedMotion) return;

    const petalCount = 36 + Math.floor(Math.random() * 44); // 36-80 Blätter

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';

      const size = 10 + Math.random() * 18; // 10-28px
      const startX = window.innerWidth + 50 + (Math.random() * 200);
      const startY = -50 - (Math.random() * 150);
      const rotation = Math.random() * 360;
      const duration = 2000 + Math.random() * 2200; // 2-4.2s
      const delay = Math.random() * 1000;

      petal.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startX}px;
        top: ${startY}px;
        transform: rotate(${rotation}deg);
        animation: swooshAcross ${duration}ms ease-out ${delay}ms forwards,
                   windSway ${3000 + Math.random() * 1000}ms ease-in-out infinite;
      `;

      this.sakuraLayer.appendChild(petal);

      // Entfernen nach Animation
      setTimeout(() => {
        if (petal.parentNode) {
          petal.parentNode.removeChild(petal);
        }
      }, duration + delay + 500);
    }
  }

  spawnFlyby() {
    if (!this.isEnabled || this.prefersReducedMotion) return;

    const petalCount = 2 + Math.floor(Math.random() * 2); // 2-3 Blätter

    for (let i = 0; i < petalCount; i++) {
      const size = 15 + Math.random() * 15;
      const duration = 9000 + Math.random() * 6000; // 9-15s
      const delay = Math.random() * 2000;

      const petal = this.createPetal(size, duration, delay);
      if (petal) {
        this.sakuraLayer.appendChild(petal);

        // Entfernen nach Animation
        setTimeout(() => {
          if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
          }
        }, duration + delay + 500);
      }
    }
  }

  startPeriodicFlybys() {
    this.stopPeriodicFlybys();

    const scheduleNext = () => {
      const delay = 10000 + Math.random() * 20000; // 10-30s
      this.flybyInterval = setTimeout(() => {
        this.spawnFlyby();
        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }

  stopPeriodicFlybys() {
    if (this.flybyInterval) {
      clearTimeout(this.flybyInterval);
      this.flybyInterval = null;
    }
  }

  clearPetals() {
    while (this.sakuraLayer.firstChild) {
      this.sakuraLayer.removeChild(this.sakuraLayer.firstChild);
    }
  }
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

class SearchManager {
  constructor() {
    this.searchForm = document.querySelector('.search-form');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.currentHighlights = [];
    this.init();
  }

  init() {
    if (this.searchForm && this.searchInput) {
      this.searchForm.addEventListener('submit', this.handleSearch.bind(this));
      this.searchInput.addEventListener('input', this.handleInput.bind(this));

      // Esc zum Schließen der Ergebnisse
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.clearSearch();
        }
      });
    }
  }

  handleInput(e) {
    if (e.target.value.trim() === '') {
      this.clearSearch();
    }
  }

  handleSearch(e) {
    e.preventDefault();
    const query = this.searchInput.value.trim();

    if (query.length < 2) {
      this.showResults('Suchbegriff zu kurz (mindestens 2 Zeichen)');
      return;
    }

    this.performSearch(query);
  }

  performSearch(query) {
    this.clearHighlights();

    const walker = document.createTreeWalker(
      document.getElementById('main-content'),
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Ignoriere Script- und Style-Elemente
          const parent = node.parentElement;
          if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    let matchCount = 0;
    const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');

    textNodes.forEach(textNode => {
      const text = textNode.textContent;
      if (regex.test(text)) {
        const matches = text.match(regex);
        if (matches) {
          matchCount += matches.length;

          // Erstelle neuen HTML-Inhalt mit Highlights
          const highlightedText = text.replace(regex, '<mark class="search-hit">$1</mark>');

          // Ersetze den Textknoten mit HTML
          const wrapper = document.createElement('span');
          wrapper.innerHTML = highlightedText;

          // Sammle die neuen Highlight-Elemente
          const highlights = wrapper.querySelectorAll('.search-hit');
          this.currentHighlights.push(...highlights);

          textNode.parentNode.insertBefore(wrapper, textNode);
          textNode.parentNode.removeChild(textNode);
        }
      }
    });

    if (matchCount > 0) {
      this.showResults(`${matchCount} Treffer gefunden`);
      this.scrollToFirstResult();
    } else {
      this.showResults('Keine Treffer gefunden');
    }
  }

  scrollToFirstResult() {
    if (this.currentHighlights.length > 0) {
      const firstHighlight = this.currentHighlights[0];
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      firstHighlight.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'center'
      });

      // Fokus für Screenreader
      firstHighlight.setAttribute('tabindex', '-1');
      firstHighlight.focus();
    }
  }

  clearHighlights() {
    this.currentHighlights.forEach(highlight => {
      const parent = highlight.parentNode;
      if (parent) {
        parent.replaceWith(...parent.childNodes);
      }
    });
    this.currentHighlights = [];

    // Normalisiere Text-Knoten wieder
    const walker = document.createTreeWalker(
      document.getElementById('main-content'),
      NodeFilter.SHOW_TEXT
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    // Merge aufeinanderfolgende Text-Knoten
    textNodes.forEach(textNode => {
      if (textNode.nextSibling && textNode.nextSibling.nodeType === Node.TEXT_NODE) {
        textNode.textContent += textNode.nextSibling.textContent;
        textNode.parentNode.removeChild(textNode.nextSibling);
      }
    });
  }

  showResults(message) {
    this.searchResults.textContent = message;
    this.searchResults.classList.add('active');
    this.searchResults.setAttribute('aria-live', 'polite');
  }

  clearSearch() {
    this.clearHighlights();
    this.searchResults.classList.remove('active');
    this.searchResults.textContent = '';
    this.searchInput.value = '';
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// ==========================================
// CURSOR GLOW EFFECT
// ==========================================

class CursorGlow {
  constructor() {
    this.cursorGlow = document.getElementById('cursor-glow');
    this.isActive = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    if (this.prefersReducedMotion || !this.cursorGlow) return;

    // Nur bei Mausbewegung aktivieren
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // Bei Tastatureingabe deaktivieren
    document.addEventListener('keydown', this.deactivate.bind(this));

    // Bei Touch deaktivieren
    document.addEventListener('touchstart', this.deactivate.bind(this));
  }

  handleMouseMove(e) {
    if (this.prefersReducedMotion) return;

    this.cursorGlow.style.left = e.clientX + 'px';
    this.cursorGlow.style.top = e.clientY + 'px';

    if (!this.isActive) {
      this.activate();
    }
  }

  activate() {
    this.isActive = true;
    this.cursorGlow.classList.add('active');
  }

  deactivate() {
    this.isActive = false;
    this.cursorGlow.classList.remove('active');
  }
}

// ==========================================
// SCROLL EFFECTS
// ==========================================

class ScrollManager {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.heroTitle = document.querySelector('.hero-title');
    this.heroSubtitle = document.querySelector('.hero-subtitle');
    this.init();
  }

  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));

    // Trigger initial scroll check
    this.handleScroll();
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // Navbar blur effect
    if (this.navbar) {
      if (scrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    }
  }
}

// ==========================================
// MAIN APP INITIALIZATION
// ==========================================

class App {
  constructor() {
    this.router = null;
    this.themeManager = null;
    this.sakuraManager = null;
    this.searchManager = null;
    this.cursorGlow = null;
    this.scrollManager = null;
    this.loader = document.getElementById('loader');
  }

  async init() {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }

    // Initialize managers
    this.themeManager = new ThemeManager();
    this.sakuraManager = new SakuraManager();
    this.searchManager = new SearchManager();
    this.cursorGlow = new CursorGlow();
    this.scrollManager = new ScrollManager();

    // Initialize router
    this.router = new SimpleRouter();
    this.router.appContainer = document.getElementById('app');

    // Initial route rendering
    this.router.handleRoute();

    // Start intro animation sequence
    await this.startIntroSequence();
  }

  async startIntroSequence() {
    // Schneller Sakura-Swoosh
    this.sakuraManager.spawnSwooshBurst();

    // Warte kurz für den Swoosh
    setTimeout(() => {
      this.hideLoader();
      this.showHeroText();
    }, 1500);

    // Fallback: Loader nach 3s verstecken
    setTimeout(() => {
      if (!this.loader.classList.contains('hidden')) {
        this.hideLoader();
        this.showHeroText();
      }
    }, 3000);
  }

  hideLoader() {
    if (this.loader) {
      this.loader.classList.add('hidden');
    }
  }

  showHeroText() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle) heroTitle.classList.add('fade-in');
    if (heroSubtitle) heroSubtitle.classList.add('fade-in');
  }
}

// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init().catch(console.error);
});