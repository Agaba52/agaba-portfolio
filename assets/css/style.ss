/* Starter stylesheet — expand freely. index.html depends on these classes. */
:root { --cyan: #22d3ee; }
html { scroll-padding-top: 5rem; }

.hero-grid {
  background-image:
    linear-gradient(rgba(34,211,238,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34,211,238,.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
}

.cursor { color: var(--cyan); animation: blink .8s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

.card-hover { transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
.card-hover:hover { transform: translateY(-5px); border-color: rgba(34,211,238,.5); box-shadow: 0 0 25px rgba(34,211,238,.15); }

.logo-chip {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2.5rem; height: 2.5rem; border-radius: .75rem;
  background: #18181b; border: 1px solid #27272a; transition: all .25s ease;
}
.logo-chip:hover { border-color: var(--cyan); transform: translateY(-2px); }

.logo-tile {
  display: inline-flex; align-items: center; justify-content: center;
  width: 3rem; height: 3rem; border-radius: .75rem; background: #fff; padding: .5rem;
}
.logo-tile img { width: 100%; height: 100%; object-fit: contain; }

.nav-link.active { color: var(--cyan); }

/* Scroll reveal (only hidden when JS is running) */
.js .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
.js .reveal.visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .js .reveal { opacity: 1; transform: none; transition: none; }
  .cursor { animation: none; }
}
