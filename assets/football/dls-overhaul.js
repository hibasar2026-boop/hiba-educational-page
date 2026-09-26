(() => {
  const players = [
    ['01','حارس المرمى','🧤'], ['04','قلب الدفاع','🛡️'], ['05','قلب الدفاع','🛡️'],
    ['07','الجناح الأيمن','⚡'], ['08','وسط الميدان','🎯'], ['10','صانع اللعب','✨'],
    ['11','الجناح الأيسر','🔥'], ['09','رأس الحربة','⚽']
  ];
  const esc = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const menuBar = () => `<div class="dls-menu-bar" data-dls-menu-bar>
    <button class="active" data-dls-mode="quick"><b>⚡</b>مباراة سريعة</button>
    <button data-dls-mode="team"><b>🏆</b>إدارة الفريق</button>
    <button data-dls-mode="help"><b>✦</b>تطوير النادي</button>
  </div>`;
  const identity = () => `<div class="dls-brand-line"><strong>BLUE UNITED</strong><span>الموسم 2026 · المستوى 12</span></div>`;
  function toast(message) {
    document.querySelector('.dls-toast')?.remove();
    const el = document.createElement('div'); el.className = 'dls-toast'; el.textContent = message;
    document.body.appendChild(el); setTimeout(() => el.remove(), 2300);
  }
  function closeOverlay() { document.querySelector('.dls-form-overlay')?.remove(); }
  function teamOverlay() {
    closeOverlay();
    const overlay = document.createElement('div'); overlay.className = 'dls-form-overlay';
    overlay.innerHTML = `<section class="dls-form-card" role="dialog" aria-modal="true" aria-label="إدارة الفريق">
      <header class="dls-form-header"><div><div class="dls-overall"><b>78</b> TEAM RATING · BLUE UNITED</div><h2>إدارة الفريق</h2><p>غيّر التشكيلة، راقب الأدوار، واستعد للمباراة القادمة.</p></div><button class="dls-close" data-dls-close aria-label="إغلاق">×</button></header>
      <div class="dls-formation"><span>التشكيلة الحالية</span><strong>4 - 3 - 3</strong><span>الاستحواذ 64٪ · اللياقة 91٪</span></div>
      <div class="dls-team-grid">${players.map(([num, role, icon]) => `<article class="dls-player"><div class="avatar">${icon}</div><b>${esc(role)}</b><small>#${num} · 78 OVR</small></article>`).join('')}</div>
      <div class="dls-actions"><button class="primary" data-dls-toast="تم حفظ التشكيلة 4 - 3 - 3">حفظ التشكيلة</button><button data-dls-toast="خطة الضغط العالي مفعّلة">تفعيل الضغط العالي</button><button data-dls-toast="تم اختيار أسلوب الاستحواذ">أسلوب الاستحواذ</button></div>
    </section>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (event) => { if (event.target === overlay || event.target.closest('[data-dls-close]')) closeOverlay(); const action = event.target.closest('[data-dls-toast]'); if(action) toast(action.dataset.dlsToast); });
  }
  function helpOverlay() {
    closeOverlay();
    const overlay = document.createElement('div'); overlay.className = 'dls-form-overlay';
    overlay.innerHTML = `<section class="dls-form-card" role="dialog" aria-modal="true" aria-label="تطوير النادي"><header class="dls-form-header"><div><div class="dls-overall"><b>12</b> CLUB LEVEL</div><h2>تطوير النادي</h2><p>كل مباراة تمنحك خبرة تساعدك على بناء فريق أقوى.</p></div><button class="dls-close" data-dls-close aria-label="إغلاق">×</button></header><div class="dls-team-grid"><article class="dls-player"><div class="avatar">🏟️</div><b>الملعب</b><small>المستوى 4 · 82٪</small></article><article class="dls-player"><div class="avatar">🏋️</div><b>مركز التدريب</b><small>المستوى 3 · 64٪</small></article><article class="dls-player"><div class="avatar">💰</div><b>الرصيد</b><small>12,450 COINS</small></article><article class="dls-player"><div class="avatar">🏅</div><b>الترتيب</b><small>الدوري البرونزي</small></article></div><div class="dls-actions"><button class="primary" data-dls-toast="تم فتح تحدي التدريب">ابدأ تحدي التدريب</button></div></section>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (event) => { if (event.target === overlay || event.target.closest('[data-dls-close]')) closeOverlay(); const action = event.target.closest('[data-dls-toast]'); if(action) toast(action.dataset.dlsToast); });
  }
  function enhanceMenu() {
    const actions = document.querySelector('.menu-actions');
    if (!actions || actions.querySelector('[data-dls-enhanced]')) return;
    const marker = document.createElement('div'); marker.dataset.dlsEnhanced = 'true'; marker.innerHTML = identity() + menuBar();
    actions.prepend(marker);
    marker.addEventListener('click', (event) => { const mode = event.target.closest('[data-dls-mode]')?.dataset.dlsMode; if(mode === 'team') teamOverlay(); if(mode === 'help') helpOverlay(); if(mode === 'quick') toast('وضع المباراة السريعة جاهز — اختر مدة المباراة ثم ابدأ اللعب'); });
  }
  function observe() { enhanceMenu(); new MutationObserver(enhanceMenu).observe(document.getElementById('root') || document.body, {childList:true, subtree:true}); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observe); else observe();
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeOverlay(); });
})();
