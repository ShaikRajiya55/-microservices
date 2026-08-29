import { Engine } from '../core/Engine';

export interface TaskItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  reward: number;
  completed: boolean;
}

export interface EquipmentItem {
  id: string;
  name: string;
  tier: string;
  price: number;
  icon: string;
  color: string;
  selected?: boolean;
}

export class GameApp {
  private engine: Engine;
  private activeTab: 'rpg' | 'dashboard' = 'rpg';
  private balance: number = 5000.00;
  private currentMultiplier: number = 1.00;
  private currentBet: number = 984.27;
  private multiplierRate: number = 1.5;

  // RPG Scene State
  private playerX: number = 300;
  private playerY: number = 350;
  private playerHp: number = 85;
  private playerMaxHp: number = 100;
  private playerMp: number = 60;
  private playerMaxMp: number = 100;
  private level: number = 5;
  private xp: number = 450;
  private gold: number = 1450;
  private score: number = 8920;
  private speed: number = 220;

  private keys: Set<string> = new Set();
  private isAttacking: boolean = false;
  private attackTimer: number = 0;
  private showInventory: boolean = false;

  private goblin = { x: 520, y: 350, hp: 100, maxHp: 100, alive: true, hitTimer: 0 };
  private boss = { x: 200, y: 160, hp: 350, maxHp: 350, alive: true, hitTimer: 0 };

  private particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number }> = [];
  private floatingTexts: Array<{ text: string; x: number; y: number; vy: number; life: number; color: string }> = [];
  private torches: Array<{ x: number; y: number }> = [];

  private tasks: TaskItem[] = [
    { id: 't1', icon: '🏆', title: 'Achieve 2.50x Multiplier Cashout', desc: 'Cashout at 2.5x or higher in any live crash round', reward: 500, completed: false },
    { id: 't2', icon: '⚔️', title: 'Equip Dragon Lore AWP', desc: 'Acquire and equip the Legendary AWP Dragon Lore', reward: 1200, completed: false },
    { id: 't3', icon: '💎', title: 'Trade 5 High-Tier Skins', desc: 'Buy or sell 5 pieces of rare equipment in marketplace', reward: 850, completed: false }
  ];

  private equipment: EquipmentItem[] = [
    { id: 'eq1', name: 'AWP | Dragon Lore (FN)', tier: 'LEGENDARY', price: 4250.00, icon: '🎯', color: '#fbbf24' },
    { id: 'eq2', name: 'Karambit | Fade (StatTrak™)', tier: 'LEGENDARY', price: 2850.00, icon: '🔪', color: '#fbbf24' },
    { id: 'eq3', name: 'M4A4 | Howl (MW)', tier: 'MYTHIC', price: 1950.00, icon: '🦁', color: '#ec4899' },
    { id: 'eq4', name: 'Butterfly Knife | Doppler', tier: 'MYTHIC', price: 1420.00, icon: '🗡️', color: '#c084fc' },
    { id: 'eq5', name: 'AK-47 | Fire Serpent (FN)', tier: 'EPIC', price: 890.00, icon: '🐍', color: '#a855f7' },
    { id: 'eq6', name: 'Glock-18 | Fade (StatTrak™)', tier: 'RARE', price: 580.00, icon: '🔫', color: '#38bdf8' },
    { id: 'eq7', name: 'Aegis Guardian Armor Set', tier: 'EPIC', price: 1200.00, icon: '🛡️', color: '#a855f7' },
    { id: 'eq8', name: 'Phoenix Rebirth Relic', tier: 'LEGENDARY', price: 750.00, icon: '🔥', color: '#fbbf24' }
  ];

  private chatMessages = [
    { avatar: '🧙‍♂️', name: 'DaVortex', text: 'Administration, when is the next tournament? 🤔', time: '10:47', rank: 'Global Elite', level: 84 },
    { avatar: '🦁', name: 'Kerplunk', text: 'cool site, I like everything! there is something unique in it', time: '10:47', rank: 'Legendary Eagle', level: 52 },
    { avatar: '🦸‍♀️', name: 'Shanay Cruz', text: "This is the second day I've been raising money, it's just a buzz 🚀", time: '10:47', rank: 'Master Guardian', level: 39 },
    { avatar: '🥷', name: 'Serafim', text: 'Who had the maximum X today?', time: '10:47', rank: 'Supreme Master', level: 71 }
  ];

  constructor() {
    this.engine = new Engine('game-canvas');
    this.setupTorches();
    this.setupRPGInputs();
    this.renderDOM();
    this.startRPGLoop();
  }

  private setupTorches(): void {
    this.torches = [
      { x: 120, y: 60 },
      { x: 450, y: 60 },
      { x: 800, y: 60 },
      { x: 120, y: 550 },
      { x: 800, y: 550 }
    ];
  }

  private setupRPGInputs(): void {
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.key.toLowerCase());
      if (e.key === ' ' || e.code === 'Space') {
        if (!this.isAttacking) {
          this.isAttacking = true;
          this.attackTimer = 0.25;
          this.performCombatCheck();
        }
      }
      if (e.key.toLowerCase() === 'i') {
        this.showInventory = !this.showInventory;
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
  }

  private performCombatCheck(): void {
    if (this.goblin.alive) {
      const distG = Math.hypot(this.playerX - this.goblin.x, this.playerY - this.goblin.y);
      if (distG < 75) {
        const dmg = Math.floor(25 + Math.random() * 15);
        this.goblin.hp -= dmg;
        this.goblin.hitTimer = 0.3;
        this.score += 150;
        this.spawnFloatingText(`-${dmg} CRIT!`, this.goblin.x, this.goblin.y - 20, '#f59e0b');
        if (this.goblin.hp <= 0) {
          this.goblin.alive = false;
          this.gold += 350;
          this.xp += 250;
          this.spawnFloatingText('+350 Gold!', this.goblin.x, this.goblin.y, '#fbbf24');
        }
      }
    }

    if (this.boss.alive) {
      const distB = Math.hypot(this.playerX - this.boss.x, this.playerY - this.boss.y);
      if (distB < 95) {
        const dmg = Math.floor(35 + Math.random() * 20);
        this.boss.hp -= dmg;
        this.boss.hitTimer = 0.3;
        this.score += 300;
        this.spawnFloatingText(`-${dmg} HEAVY!`, this.boss.x, this.boss.y - 30, '#ef4444');
        if (this.boss.hp <= 0) {
          this.boss.alive = false;
          this.gold += 1000;
          this.xp += 800;
          this.level += 1;
          this.spawnFloatingText('BOSS SLAIN! LEVEL UP!', this.boss.x, this.boss.y, '#a855f7');
        }
      }
    }
  }

  private spawnFloatingText(text: string, x: number, y: number, color: string): void {
    this.floatingTexts.push({ text, x, y, vy: -40, life: 1.0, color });
  }

  private startRPGLoop(): void {
    this.engine.onUpdate = (dt) => {
      if (this.activeTab !== 'rpg') return;

      let dx = 0;
      let dy = 0;
      if (this.keys.has('a') || this.keys.has('arrowleft')) dx -= 1;
      if (this.keys.has('d') || this.keys.has('arrowright')) dx += 1;
      if (this.keys.has('w') || this.keys.has('arrowup')) dy -= 1;
      if (this.keys.has('s') || this.keys.has('arrowdown')) dy += 1;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      this.playerX += dx * this.speed * dt;
      this.playerY += dy * this.speed * dt;

      this.playerX = Math.max(40, Math.min(this.engine.canvas.width - 40, this.playerX));
      this.playerY = Math.max(40, Math.min(this.engine.canvas.height - 40, this.playerY));

      if (this.isAttacking) {
        this.attackTimer -= dt;
        if (this.attackTimer <= 0) this.isAttacking = false;
      }

      if (this.goblin.hitTimer > 0) this.goblin.hitTimer -= dt;
      if (this.boss.hitTimer > 0) this.boss.hitTimer -= dt;

      this.floatingTexts.forEach(ft => {
        ft.y += ft.vy * dt;
        ft.life -= dt;
      });
      this.floatingTexts = this.floatingTexts.filter(ft => ft.life > 0);
    };

    this.engine.onRender = (ctx) => {
      if (this.activeTab !== 'rpg') return;

      const w = ctx.canvas.width;
      const h = ctx.canvas.height;

      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const tileSize = 64;
      for (let x = 0; x < w; x += tileSize) {
        for (let y = 0; y < h; y += tileSize) {
          ctx.strokeRect(x, y, tileSize, tileSize);
          ctx.fillStyle = '#111827';
          ctx.fillRect(x + 8, y + 8, 16, 12);
        }
      }

      this.torches.forEach(t => {
        const glow = ctx.createRadialGradient(t.x, t.y, 5, t.x, t.y, 80);
        glow.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 80, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(t.x, t.y - 2, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      const portalX = w - 140;
      const portalY = 160;
      const portalGrad = ctx.createRadialGradient(portalX, portalY, 5, portalX, portalY, 50);
      portalGrad.addColorStop(0, '#c084fc');
      portalGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = portalGrad;
      ctx.beginPath();
      ctx.arc(portalX, portalY, 50, 0, Math.PI * 2);
      ctx.fill();

      if (this.boss.alive) {
        const bx = this.boss.x;
        const by = this.boss.y;
        ctx.fillStyle = this.boss.hitTimer > 0 ? '#ffffff' : '#7c3aed';
        ctx.beginPath();
        ctx.arc(bx, by, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f3e8ff';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('Shadow Archdemon (Boss)', bx - 70, by - 45);
      }

      if (this.goblin.alive) {
        const gx = this.goblin.x;
        const gy = this.goblin.y;
        ctx.fillStyle = this.goblin.hitTimer > 0 ? '#ffffff' : '#dc2626';
        ctx.beginPath();
        ctx.arc(gx, gy, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Goblin Warlord Lv.4', gx - 55, gy - 30);
      }

      const px = this.playerX;
      const py = this.playerY;
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(px, py, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      if (this.isAttacking) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(px, py, 50, -Math.PI * 0.45, Math.PI * 0.45);
        ctx.stroke();
      }

      ctx.fillStyle = '#f0f9ff';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Hero Knight (You)', px - 45, py - 32);

      this.floatingTexts.forEach(ft => {
        ctx.fillStyle = ft.color;
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(ft.text, ft.x - 20, ft.y);
      });

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(16, 16, 420, 90);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 16, 420, 90);

      ctx.fillStyle = '#60a5fa';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('AETHERIA RPG QUEST ENGINE', 30, 40);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px sans-serif';
      ctx.fillText(`HP: ${this.playerHp}/100  |  MP: ${this.playerMp}/100  |  Level: ${this.level}`, 30, 62);
      ctx.fillText(`Gold: ${this.gold}g  |  Score: ${this.score}`, 30, 82);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(16, h - 50, 480, 36);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText('CONTROLS: [WASD] Move | [Space] Attack | [I] Inventory Grid', 30, h - 28);
    };

    this.engine.start();
  }

  private renderDOM(): void {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    appEl.innerHTML = `
      <div class="dashboard-container">
        <!-- 1. Left Icon Navigation -->
        <div class="icon-nav">
          <div class="logo-btn" id="nav-logo" title="⚡ Instant Bonus Gift">⚡</div>
          <div class="nav-group">
            <div class="nav-item ${this.activeTab === 'rpg' ? 'active' : ''}" id="nav-rpg" title="🎮 Play 2D RPG Game">
              <span class="icon">🎮</span>
              <span>RPG Game</span>
            </div>
            <div class="nav-item ${this.activeTab === 'dashboard' ? 'active' : ''}" id="nav-dashboard" title="📈 Crash Multiplier">
              <span class="icon">📈</span>
              <span>Crash</span>
            </div>
            <div class="nav-item" id="nav-upgrade" title="⚡ Skin Upgrader Machine">
              <span class="icon">⚡</span>
              <span>Upgrade</span>
            </div>
            <div class="nav-item" id="nav-bonuses" title="🎁 Daily Rewards & Bonus Vault">
              <span class="icon">🎁</span>
              <span>Bonuses</span>
            </div>
          </div>
          <div class="nav-group" style="margin-top: auto;">
            <div class="nav-item" id="nav-support" title="🎧 24/7 AI Customer Support"><span class="icon">🎧</span></div>
            <div class="nav-item" id="nav-tournaments" title="🏆 $50,000 Esports Tournaments"><span class="icon">🏆</span></div>
            <div class="nav-item" id="nav-region" title="🌍 Region & Language"><span class="icon">🇺🇸</span></div>
          </div>
        </div>

        <!-- 2. Online Chat Sidebar -->
        <div class="chat-sidebar">
          <div class="chat-header">
            <h3>💬 Live Chat</h3>
            <div class="lang-selector" id="lang-selector-btn">🇺🇸 Eng ▾</div>
          </div>

          <div class="discord-promo">
            <h4>JOIN OUR</h4>
            <h3>DISCORD COMMUNITY</h3>
            <button class="discord-btn" id="discord-join-btn">Join Now</button>
          </div>

          <div class="chat-feed" id="chat-feed">
            ${this.chatMessages.map(m => `
              <div class="chat-msg" data-user-name="${m.name}">
                <div class="avatar">${m.avatar}</div>
                <div class="msg-body">
                  <div class="msg-meta">
                    <span class="username">${m.name}</span>
                    <span class="time">${m.time}</span>
                  </div>
                  <div>${m.text}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="chat-input-area">
            <input type="text" id="chat-input" class="chat-input" placeholder="Type a message..." />
            <button class="send-btn" id="send-chat-btn">➤</button>
          </div>
        </div>

        <!-- 3. Center Content Area -->
        <div class="center-content">
          <div class="top-header">
            <div class="mode-tabs">
              <button class="mode-tab-btn ${this.activeTab === 'rpg' ? 'active' : ''}" id="tab-btn-rpg">🎮 RPG Game Scene</button>
              <button class="mode-tab-btn ${this.activeTab === 'dashboard' ? 'active' : ''}" id="tab-btn-dashboard">📈 Esports Crash Dashboard</button>
            </div>
            <div class="balance-box">
              <div class="val-display" id="user-balance">$${this.balance.toFixed(2)}</div>
              <button class="deposit-btn" id="deposit-btn">+ Deposit</button>
              <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700;">
                <span>👑</span>
                <span>Yev Ledo</span>
              </div>
            </div>
          </div>

          <!-- RPG Game Viewport -->
          <div class="game-canvas-container" id="rpg-viewport-box" style="display: ${this.activeTab === 'rpg' ? 'flex' : 'none'};">
            <canvas id="game-canvas"></canvas>
          </div>

          <!-- Esports Dashboard Viewport -->
          <div class="game-viewport" id="dashboard-viewport-box" style="display: ${this.activeTab === 'dashboard' ? 'flex' : 'none'};">
            <!-- Active Bet Card -->
            <div>
              <div class="section-title">🎯 Active Bet & Win Predictor</div>
              <div class="potential-win-card">
                <div class="item-preview">
                  <div class="item-img-box" id="active-item-icon">🎯</div>
                  <div>
                    <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase;">Factory New</div>
                    <div style="font-weight: 800; font-size: 15px;" id="active-item-name">AWP | Dragon Lore</div>
                    <div style="color: #ef4444; font-size: 13px; font-weight: 800;" id="active-item-mult">x${this.multiplierRate}x Target</div>
                  </div>
                </div>

                <div class="bet-info-vals">
                  <div class="val-group">
                    <label>Editable Bet ($)</label>
                    <input type="number" id="bet-input-val" value="${this.currentBet}" style="width: 130px; border-bottom: 2px solid #3b82f6;" />
                  </div>
                  <div class="val-group">
                    <label>Est. Win Payout</label>
                    <div class="amount" id="est-win-val" style="color: #10b981;">$${(this.currentBet * this.multiplierRate).toFixed(2)}</div>
                  </div>
                </div>

                <button class="grab-btn" id="grab-btn">Grab Cashout!</button>
              </div>

              <div class="multiplier-bar">
                <button class="mult-btn" data-mult="1.1">1.1x</button>
                <button class="mult-btn active" data-mult="1.5">1.5x</button>
                <button class="mult-btn" data-mult="2.0">2.0x</button>
                <button class="mult-btn" data-mult="3.0">3.0x</button>
              </div>
            </div>

            <!-- Editable Tasks Section -->
            <div class="tasks-card">
              <div class="section-title" style="justify-content: space-between;">
                <span>📋 Interactive Quests & Editable Tasks</span>
                <button class="task-btn" id="add-task-btn">+ Add Custom Task</button>
              </div>
              <div class="tasks-list" id="tasks-list-container">
                ${this.renderTasksHTML()}
              </div>
            </div>

            <!-- Live Round Players Table -->
            <div class="round-table-card">
              <div class="table-header">
                <span style="font-weight: 800; font-size: 14px;">Live Round Players</span>
                <span>💰 $14,850.00 &nbsp;&nbsp; 👥 245 Players</span>
              </div>
              <div class="player-row">
                <div class="player-meta">
                  <div class="avatar">👨‍🚀</div>
                  <span class="username">DaVortex ($1,200.00)</span>
                </div>
                <span class="status-badge cashed">2.45x Cashout</span>
              </div>
              <div class="player-row">
                <div class="player-meta">
                  <div class="avatar">👾</div>
                  <span class="username">Kerplunk ($450.00)</span>
                </div>
                <span class="status-badge in-game">In Round...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Right Sidebar - Crash Chart & Editable Equipment -->
        <div class="right-sidebar">
          <div>
            <div class="section-title">📊 Multiplier Graph</div>
            <div class="crash-graph-card">
              <canvas id="crash-graph-canvas" width="284" height="150"></canvas>
              <div class="multiplier-overlay" id="crash-multiplier-text">x1.00</div>
            </div>
          </div>

          <!-- Editable Equipment Armory -->
          <div class="market-section">
            <div class="market-header">
              <span>🎒 Equipment Armory</span>
              <span style="color: #00d2ff; font-family: var(--font-mono);">$${this.balance.toFixed(2)}</span>
            </div>

            <div class="skins-grid" id="skins-grid-container">
              ${this.renderEquipmentHTML()}
            </div>

            <div class="market-actions">
              <button class="act-btn sell" id="sell-equipment-btn">Sell Selected</button>
              <button class="act-btn buy" id="buy-equipment-btn">Equip Gear</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.startCrashGraph();
  }

  private renderTasksHTML(): string {
    return this.tasks.map(t => `
      <div class="task-item">
        <div class="task-info">
          <div class="task-icon">${t.icon}</div>
          <div>
            <div class="task-title">${t.title}</div>
            <div class="task-desc">${t.desc}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="task-reward">+ $${t.reward}</div>
          <button class="task-btn ${t.completed ? 'completed' : ''}" data-task-id="${t.id}">
            ${t.completed ? '✓ Completed' : 'Complete'}
          </button>
          <button class="task-btn edit-task-btn" data-edit-id="${t.id}">✏️ Edit</button>
        </div>
      </div>
    `).join('');
  }

  private renderEquipmentHTML(): string {
    return this.equipment.map(eq => `
      <div class="skin-card ${eq.selected ? 'selected' : ''}" data-eq-id="${eq.id}">
        <div style="font-size: 10px; color: ${eq.color}; font-weight: 800;">${eq.tier}</div>
        <div class="skin-icon-lg">${eq.icon}</div>
        <div class="skin-title">${eq.name}</div>
        <div class="skin-price">$${eq.price.toFixed(2)}</div>
        <div class="edit-item-badge" data-edit-eq-id="${eq.id}">✏️ Edit Icon</div>
      </div>
    `).join('');
  }

  private bindEvents(): void {
    // 1. Logo Button Instant Bonus Box Modal
    document.getElementById('nav-logo')?.addEventListener('click', () => {
      this.balance += 500;
      this.updateBalanceDisplay();
      this.showModal('⚡ Instant Bonus Claimed!', 'You claimed a free $500.00 balance boost!');
    });

    // 2. Mode Switcher Tabs
    const rpgTab = document.getElementById('tab-btn-rpg');
    const dashTab = document.getElementById('tab-btn-dashboard');
    const navRpg = document.getElementById('nav-rpg');
    const navDash = document.getElementById('nav-dashboard');

    const setMode = (mode: 'rpg' | 'dashboard') => {
      this.activeTab = mode;
      const rpgBox = document.getElementById('rpg-viewport-box');
      const dashBox = document.getElementById('dashboard-viewport-box');
      if (rpgBox && dashBox) {
        rpgBox.style.display = mode === 'rpg' ? 'flex' : 'none';
        dashBox.style.display = mode === 'dashboard' ? 'flex' : 'none';
      }
      if (rpgTab) rpgTab.classList.toggle('active', mode === 'rpg');
      if (dashTab) dashTab.classList.toggle('active', mode === 'dashboard');
      if (navRpg) navRpg.classList.toggle('active', mode === 'rpg');
      if (navDash) navDash.classList.toggle('active', mode === 'dashboard');
    };

    rpgTab?.addEventListener('click', () => setMode('rpg'));
    dashTab?.addEventListener('click', () => setMode('dashboard'));
    navRpg?.addEventListener('click', () => setMode('rpg'));
    navDash?.addEventListener('click', () => setMode('dashboard'));

    // 3. Upgrader Icon Navigation
    document.getElementById('nav-upgrade')?.addEventListener('click', () => {
      this.showModal('⚡ Item Upgrader Machine', 'Select an item from your armory to upgrade up to 10x multiplier!');
    });

    // 4. Bonuses Icon Navigation
    document.getElementById('nav-bonuses')?.addEventListener('click', () => {
      this.balance += 250;
      this.updateBalanceDisplay();
      this.showModal('🎁 Daily Bonus Unlocked!', 'You unlocked your daily $250.00 reward!');
    });

    // 5. 24/7 Support Icon Navigation
    document.getElementById('nav-support')?.addEventListener('click', () => {
      this.showModal('🎧 Live Support AI Agent', 'Our 24/7 support is online. All game servers are running perfectly at 60 FPS!');
    });

    // 6. Tournaments Icon Navigation
    document.getElementById('nav-tournaments')?.addEventListener('click', () => {
      this.showModal('🏆 $50,000 Esports Tournament', 'Current Season Leaderboard: You are ranked #4 globally with 8,920 pts!');
    });

    // 7. Region & Language Selectors
    const openLangModal = () => {
      this.showModal('🌍 Region & Language Settings', 'Select language: 🇺🇸 English | 🇮🇳 Telugu | 🇪🇸 Spanish | 🇩🇪 German | 🇯🇵 Japanese');
    };
    document.getElementById('nav-region')?.addEventListener('click', openLangModal);
    document.getElementById('lang-selector-btn')?.addEventListener('click', openLangModal);

    // 8. Discord Join Button
    document.getElementById('discord-join-btn')?.addEventListener('click', () => {
      this.showModal('👾 Discord VIP Community', 'Joining official Aetheria Esports Discord community server! Welcome!');
    });

    // 9. Chat User Profiles Click Event
    document.getElementById('chat-feed')?.addEventListener('click', (e) => {
      const msgEl = (e.target as HTMLElement).closest('.chat-msg');
      if (msgEl) {
        const userName = msgEl.getAttribute('data-user-name') || 'Player';
        const user = this.chatMessages.find(m => m.name === userName);
        if (user) {
          this.showModal(`👤 ${user.name} Profile`, `Rank: ${user.rank} | Level: ${user.level} | Total Wins: $4,850.00`);
        }
      }
    });

    // 10. Edit Equipment Icon Modal Event
    const skinGrid = document.getElementById('skins-grid-container');
    if (skinGrid) {
      skinGrid.addEventListener('click', (e) => {
        const editBadge = (e.target as HTMLElement).closest('.edit-item-badge');
        if (editBadge) {
          e.stopPropagation();
          const eqId = editBadge.getAttribute('data-edit-eq-id');
          const item = this.equipment.find(i => i.id === eqId);
          if (item) {
            this.openItemEditorModal(item);
          }
          return;
        }

        const card = (e.target as HTMLElement).closest('.skin-card') as HTMLElement;
        if (card) {
          const eqId = card.getAttribute('data-eq-id');
          const item = this.equipment.find(i => i.id === eqId);
          if (item) {
            item.selected = !item.selected;
            card.classList.toggle('selected', item.selected);
          }
        }
      });
    }

    // Editable Bet Input
    const betInput = document.getElementById('bet-input-val') as HTMLInputElement;
    if (betInput) {
      betInput.addEventListener('input', () => {
        this.currentBet = parseFloat(betInput.value) || 0;
        this.updateEstWin();
      });
    }

    // Multiplier Button Selection
    const multBtns = document.querySelectorAll('.mult-btn');
    multBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        multBtns.forEach(b => b.classList.remove('active'));
        const target = e.currentTarget as HTMLElement;
        target.classList.add('active');
        const mult = parseFloat(target.getAttribute('data-mult') || '1.5');
        this.multiplierRate = mult;
        const multDisplay = document.getElementById('active-item-mult');
        if (multDisplay) multDisplay.innerText = `x${this.multiplierRate.toFixed(1)}x Target`;
        this.updateEstWin();
      });
    });

    // Grab Cashout Event
    const grabBtn = document.getElementById('grab-btn');
    if (grabBtn) {
      grabBtn.addEventListener('click', () => {
        const win = this.currentBet * this.multiplierRate;
        this.balance += win;
        this.updateBalanceDisplay();
        this.showModal('🎉 CASH OUT SUCCESSFUL!', `You cashed out $${win.toFixed(2)} at ${this.multiplierRate}x multiplier!`);
      });
    }

    // Deposit Button Event
    const depBtn = document.getElementById('deposit-btn');
    if (depBtn) {
      depBtn.addEventListener('click', () => {
        this.balance += 1000;
        this.updateBalanceDisplay();
        this.showModal('💳 Deposit Successful', '$1,000.00 added to your active wallet balance!');
      });
    }

    // Task Complete & Edit Buttons
    const tasksContainer = document.getElementById('tasks-list-container');
    if (tasksContainer) {
      tasksContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const taskId = target.getAttribute('data-task-id');
        if (taskId) {
          const task = this.tasks.find(t => t.id === taskId);
          if (task && !task.completed) {
            task.completed = true;
            this.balance += task.reward;
            this.updateBalanceDisplay();
            target.classList.add('completed');
            target.innerText = '✓ Completed';
            this.showModal('🎉 Task Completed!', `+$${task.reward} added to your balance!`);
          }
        }

        const editId = target.getAttribute('data-edit-id');
        if (editId) {
          const task = this.tasks.find(t => t.id === editId);
          if (task) {
            const newTitle = prompt('Edit Task Title:', task.title);
            if (newTitle && newTitle.trim()) {
              task.title = newTitle.trim();
              if (tasksContainer) tasksContainer.innerHTML = this.renderTasksHTML();
            }
          }
        }
      });
    }

    // Add Custom Task Button
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
      addTaskBtn.addEventListener('click', () => {
        const title = prompt('Enter New Task Title:', 'Achieve 3.0x Multiplier');
        if (title && title.trim()) {
          this.tasks.push({
            id: `t_${Date.now()}`,
            icon: '⭐',
            title: title.trim(),
            desc: 'Custom player challenge',
            reward: 600,
            completed: false
          });
          if (tasksContainer) tasksContainer.innerHTML = this.renderTasksHTML();
        }
      });
    }

    // Live Chat Input Sender
    const sendBtn = document.getElementById('send-chat-btn');
    const inputEl = document.getElementById('chat-input') as HTMLInputElement;
    if (sendBtn && inputEl) {
      sendBtn.addEventListener('click', () => {
        if (inputEl.value.trim()) {
          this.addChatMessage('😎 You', inputEl.value.trim());
          inputEl.value = '';
        }
      });
    }
  }

  private showModal(title: string, message: string): void {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card">
        <h3>${title}</h3>
        <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">${message}</p>
        <div class="modal-actions">
          <button class="task-btn completed" id="modal-ok-btn">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#modal-ok-btn')?.addEventListener('click', () => modal.remove());
  }

  private openItemEditorModal(item: EquipmentItem): void {
    const icons = ['🎯', '🔪', '🦁', '🗡️', '🐍', '🔫', '🛡️', '🔥', '⚔️', '🏹', '💎', '👑'];
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card">
        <h3>✏️ Edit Item & Icon</h3>
        <div class="modal-form-group">
          <label>Item Name</label>
          <input type="text" id="modal-item-name" class="modal-input" value="${item.name}" />
        </div>
        <div class="modal-form-group">
          <label>Price ($)</label>
          <input type="number" id="modal-item-price" class="modal-input" value="${item.price}" />
        </div>
        <div class="modal-form-group">
          <label>Select Icon</label>
          <div class="icon-picker-grid">
            ${icons.map(ic => `<div class="icon-choice ${ic === item.icon ? 'selected' : ''}" data-icon="${ic}">${ic}</div>`).join('')}
          </div>
        </div>
        <div class="modal-actions">
          <button class="task-btn" id="modal-cancel-btn">Cancel</button>
          <button class="task-btn completed" id="modal-save-btn">Save Changes</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    let selectedIcon = item.icon;
    modal.querySelectorAll('.icon-choice').forEach(el => {
      el.addEventListener('click', () => {
        modal.querySelectorAll('.icon-choice').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        selectedIcon = el.getAttribute('data-icon') || selectedIcon;
      });
    });

    modal.querySelector('#modal-cancel-btn')?.addEventListener('click', () => modal.remove());
    modal.querySelector('#modal-save-btn')?.addEventListener('click', () => {
      const nameInput = modal.querySelector('#modal-item-name') as HTMLInputElement;
      const priceInput = modal.querySelector('#modal-item-price') as HTMLInputElement;
      if (nameInput && priceInput) {
        item.name = nameInput.value.trim() || item.name;
        item.price = parseFloat(priceInput.value) || item.price;
        item.icon = selectedIcon;
        const grid = document.getElementById('skins-grid-container');
        if (grid) grid.innerHTML = this.renderEquipmentHTML();
      }
      modal.remove();
    });
  }

  private updateEstWin(): void {
    const estEl = document.getElementById('est-win-val');
    if (estEl) {
      estEl.innerText = `$${(this.currentBet * this.multiplierRate).toFixed(2)}`;
    }
  }

  private updateBalanceDisplay(): void {
    const balEl = document.getElementById('user-balance');
    if (balEl) balEl.innerText = `$${this.balance.toFixed(2)}`;
  }

  private addChatMessage(name: string, text: string): void {
    const feed = document.getElementById('chat-feed');
    if (!feed) return;
    const div = document.createElement('div');
    div.className = 'chat-msg';
    div.innerHTML = `
      <div class="avatar">😎</div>
      <div class="msg-body">
        <div class="msg-meta">
          <span class="username">${name}</span>
          <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div>${text}</div>
      </div>
    `;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }

  private startCrashGraph(): void {
    const canvas = document.getElementById('crash-graph-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const animate = () => {
      time += 0.025;
      this.currentMultiplier = 1.00 + Math.pow(time * 0.4, 1.8);
      if (this.currentMultiplier > 6.0) {
        time = 0;
      }

      const txt = document.getElementById('crash-multiplier-text');
      if (txt) txt.innerText = `x${this.currentMultiplier.toFixed(2)}`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(20, canvas.height - 20);
      const endX = Math.min(canvas.width - 30, 20 + time * 35);
      const endY = Math.max(30, canvas.height - 20 - (this.currentMultiplier * 20));

      ctx.quadraticCurveTo(canvas.width * 0.5, canvas.height - 30, endX, endY);
      ctx.strokeStyle = '#00d2ff';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(endX, endY, 6, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  public run(): void {
    this.engine.start();
  }
}