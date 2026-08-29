/**
 * OmniAPI - Apps & API Data Pipeline Observability Dashboard
 * Main Application & API Gateway Server
 */
const http = require('http');
const PORT = process.env.PORT || 8000;

const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Pipeline Observability Dashboard - OmniAPI</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800;900&family=JetBrains+Mono:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #0a0d16;
            --card-bg: rgba(14, 21, 37, 0.95);
            --card-border: rgba(45, 62, 95, 0.6);
            --green: #22c55e;
            --green-glow: rgba(34, 197, 94, 0.35);
            --amber: #f59e0b;
            --amber-glow: rgba(245, 158, 11, 0.35);
            --red: #ef4444;
            --blue: #38bdf8;
            --purple: #a855f7;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            min-height: 100vh;
            padding: 24px;
            background-image: 
                radial-gradient(circle at 50% 10%, rgba(56, 189, 248, 0.08), transparent 60%),
                linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
            background-size: 100% 100%, 24px 24px, 24px 24px;
        }

        .main-wrapper {
            max-width: 1480px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 22px;
        }

        /* HEADER TITLE */
        .dash-header {
            text-align: center;
            margin-bottom: 4px;
        }

        .dash-title {
            font-family: 'Outfit', sans-serif;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }

        /* TOP SLA PILLS BAR */
        .sla-pills-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
        }

        .sla-pill {
            padding: 12px 20px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.15);
            transition: all 0.3s ease;
        }

        .pill-green {
            background: linear-gradient(135deg, #15803d, #166534);
            color: #ffffff;
            border-color: rgba(34, 197, 94, 0.5);
            box-shadow: 0 0 20px var(--green-glow);
        }

        .pill-amber {
            background: linear-gradient(135deg, #b45309, #78350f);
            color: #ffffff;
            border-color: rgba(245, 158, 11, 0.5);
            box-shadow: 0 0 20px var(--amber-glow);
            animation: pulseWarning 2s infinite alternate;
        }

        @keyframes pulseWarning {
            0% { box-shadow: 0 0 10px rgba(245, 158, 11, 0.3); }
            100% { box-shadow: 0 0 25px rgba(245, 158, 11, 0.7); }
        }

        /* PIPELINE STAGES FLOW ROW */
        .pipeline-flow-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            position: relative;
        }

        .stage-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            padding: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease;
        }

        .stage-card:hover {
            border-color: var(--blue);
            transform: translateY(-2px);
        }

        /* Connecting Animated Arrows between stages */
        .stage-card:not(:last-child)::after {
            content: '➔';
            position: absolute;
            right: -22px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 28px;
            color: var(--amber);
            text-shadow: 0 0 12px var(--amber-glow);
            z-index: 10;
            animation: flowArrow 1.2s infinite ease-in-out;
        }

        .stage-card:first-child::after { color: #ef4444; animation-delay: 0s; }
        .stage-card:nth-child(2)::after { color: #f59e0b; animation-delay: 0.3s; }
        .stage-card:nth-child(3)::after { color: #22c55e; animation-delay: 0.6s; }

        @keyframes flowArrow {
            0% { opacity: 0.3; transform: translateY(-50%) translateX(-4px); }
            50% { opacity: 1; transform: translateY(-50%) translateX(4px); text-shadow: 0 0 20px currentColor; }
            100% { opacity: 0.3; transform: translateY(-50%) translateX(-4px); }
        }

        .stage-title {
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 14px;
            text-align: center;
        }

        .stage-icon-box {
            width: 100%;
            height: 95px;
            background: rgba(8, 13, 26, 0.9);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 16px;
            position: relative;
            overflow: hidden;
        }

        /* --- ANIMATED SVG ICON STYLES --- */

        /* Stage 1: Sources (Floating Cloud & Pulsing DB) */
        .icon-sources-cloud {
            animation: floatCloud 2.5s ease-in-out infinite alternate;
        }
        @keyframes floatCloud {
            0% { transform: translateY(-2px); }
            100% { transform: translateY(3px); }
        }

        .icon-sources-db {
            animation: pulseDb 1.8s ease-in-out infinite alternate;
        }
        @keyframes pulseDb {
            0% { opacity: 0.7; stroke: #38bdf8; }
            100% { opacity: 1; stroke: #00f2fe; stroke-width: 5px; filter: drop-shadow(0 0 8px #00f2fe); }
        }

        /* Stage 2: Transformation (Spinning Gear Icon) */
        .icon-gear-spin {
            transform-origin: center;
            animation: spinGear 4s linear infinite;
        }
        @keyframes spinGear {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Stage 3: Data Warehouse (Blinking LED Slots) */
        .icon-led-blink {
            animation: blinkLed 1.2s ease-in-out infinite alternate;
        }
        @keyframes blinkLed {
            0% { opacity: 0.2; }
            100% { opacity: 1; filter: drop-shadow(0 0 6px #22c55e); }
        }

        /* Stage 4: Analytics Dashboard (Growing Chart Lines & Screen Glow) */
        .icon-chart-grow {
            animation: chartPulse 2s infinite ease-in-out;
        }
        @keyframes chartPulse {
            0% { stroke-dashoffset: 20; opacity: 0.6; }
            50% { stroke-dashoffset: 0; opacity: 1; filter: drop-shadow(0 0 8px #a855f7); }
            100% { stroke-dashoffset: 20; opacity: 0.6; }
        }

        .stage-metrics {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-size: 13px;
        }

        .metric-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .metric-label {
            color: var(--text-muted);
            font-weight: 600;
        }

        .metric-val {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            color: #ffffff;
        }

        .val-red { color: #ef4444; }
        .val-amber { color: #f59e0b; }
        .val-green { color: #22c55e; }

        /* CHARTS MIDDLE ROW */
        .charts-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
        }

        .chart-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            padding: 18px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        }

        .chart-title {
            font-family: 'Outfit', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 12px;
            text-align: center;
        }

        canvas.chart-canvas {
            width: 100%;
            height: 180px;
            background: rgba(6, 10, 20, 0.9);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* BOTTOM GAUGES ROW */
        .gauges-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            padding: 20px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        }

        .gauges-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }

        .gauge-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .gauge-title {
            font-size: 13px;
            font-weight: 700;
            color: var(--text-muted);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .gauge-svg-box {
            position: relative;
            width: 140px;
            height: 85px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

        .gauge-val-text {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 900;
            color: #ffffff;
            position: absolute;
            bottom: 4px;
        }

        .gauge-status-icon {
            margin-top: 6px;
            font-size: 14px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .status-green { color: #22c55e; }
        .status-amber { color: #f59e0b; }

        /* BUTTON BAR */
        .action-bar {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 6px;
        }

        .btn {
            background: linear-gradient(135deg, #38bdf8, #2563eb);
            border: none;
            color: #ffffff;
            font-weight: 700;
            padding: 10px 24px;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(56, 189, 248, 0.5);
        }

        .btn-warning {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
        }

        .toast-container { position: fixed; bottom: 24px; right: 24px; z-index: 1000; display: flex; flex-direction: column; gap: 10px; }
        .toast {
            background: #0f172a; border: 1px solid var(--blue); box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
            color: #fff; padding: 14px 22px; border-radius: 12px; font-size: 13px;
            display: flex; align-items: center; gap: 12px; animation: slideIn 0.3s ease-out forwards;
        }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    </style>
</head>
<body>

    <div class="main-wrapper">

        <!-- HEADER TITLE -->
        <div class="dash-header">
            <h1 class="dash-title">Data Pipeline Observability Dashboard</h1>
        </div>

        <!-- TOP SLA PILLS BAR -->
        <div class="sla-pills-bar">
            <div class="sla-pill pill-green">
                <span>ETL SLA Compliance:</span> <strong>98%</strong>
            </div>
            <div class="sla-pill pill-green">
                <span>Data Latency SLA:</span> <strong>95%</strong>
            </div>
            <div class="sla-pill pill-amber">
                <span>Error Rate SLA:</span> <strong>92%</strong>
            </div>
            <div class="sla-pill pill-green">
                <span>Report SLA Compliance:</span> <strong>96%</strong>
            </div>
        </div>

        <!-- PIPELINE STAGES FLOW ROW -->
        <div class="pipeline-flow-container">

            <!-- STAGE 1: SOURCES -->
            <div class="stage-card">
                <div class="stage-title">Sources</div>
                <div class="stage-icon-box">
                    <svg class="stage-icon-svg icon-sources-cloud" viewBox="0 0 64 64" fill="none">
                        <path class="icon-sources-db" d="M16 20C16 16.6863 23.1634 14 32 14C40.8366 14 48 16.6863 48 20M16 20C16 23.3137 23.1634 26 32 26C40.8366 26 48 23.3137 48 20M16 20V44C16 47.3137 23.1634 50 32 50C40.8366 50 48 47.3137 48 44V20" stroke="#38bdf8" stroke-width="4"/>
                        <path class="icon-sources-db" d="M16 32C16 35.3137 23.1634 38 32 38C40.8366 38 48 35.3137 48 32" stroke="#38bdf8" stroke-width="4"/>
                    </svg>
                </div>
                <div class="stage-metrics">
                    <div class="metric-row">
                        <span class="metric-label">Data Volume:</span>
                        <span class="metric-val" id="srcVol">850 <small>GB/hr</small></span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Latency:</span>
                        <span class="metric-val" id="srcLat">120 <small>ms</small></span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Error Rate:</span>
                        <span class="metric-val val-red" id="srcErr">0.5%</span>
                    </div>
                </div>
            </div>

            <!-- STAGE 2: TRANSFORMATION -->
            <div class="stage-card">
                <div class="stage-title">Transformation</div>
                <div class="stage-icon-box">
                    <svg class="stage-icon-svg icon-gear-spin" viewBox="0 0 64 64" fill="none">
                        <path d="M32 12V20M32 44V52M12 32H20M44 32H52M17.8 17.8L23.5 23.5M40.5 40.5L46.2 46.2M17.8 46.2L23.5 40.5M40.5 23.5L46.2 17.8" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
                        <circle cx="32" cy="32" r="10" stroke="#f59e0b" stroke-width="4"/>
                    </svg>
                </div>
                <div class="stage-metrics">
                    <div class="metric-row">
                        <span class="metric-label">Data Processed:</span>
                        <span class="metric-val" id="transVol">780 <small>GB/hr</small></span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Latency:</span>
                        <span class="metric-val" id="transLat">5.2 <small>min</small></span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Error Rate:</span>
                        <span class="metric-val val-amber" id="transErr">1.4%</span>
                    </div>
                </div>
            </div>

            <!-- STAGE 3: DATA WAREHOUSE -->
            <div class="stage-card">
                <div class="stage-title">Data Warehouse</div>
                <div class="stage-icon-box">
                    <svg class="stage-icon-svg" viewBox="0 0 64 64" fill="none">
                        <rect x="14" y="14" width="36" height="12" rx="3" stroke="#22c55e" stroke-width="4"/>
                        <rect x="14" y="38" width="36" height="12" rx="3" stroke="#22c55e" stroke-width="4"/>
                        <line class="icon-led-blink" x1="22" y1="20" x2="28" y2="20" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
                        <line class="icon-led-blink" x1="22" y1="44" x2="28" y2="44" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="stage-metrics">
                    <div class="metric-row">
                        <span class="metric-label">Data Stored:</span>
                        <span class="metric-val" id="dwVol">20.5 <small>TB</small></span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Latency:</span>
                        <span class="metric-val" id="dwLat">3.8 <small>min</small></span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Error Rate:</span>
                        <span class="metric-val val-green" id="dwErr">0.2%</span>
                    </div>
                </div>
            </div>

            <!-- STAGE 4: ANALYTICS DASHBOARD -->
            <div class="stage-card">
                <div class="stage-title">Analytics Dashboard</div>
                <div class="stage-icon-box">
                    <svg class="stage-icon-svg" viewBox="0 0 64 64" fill="none">
                        <rect x="12" y="14" width="40" height="28" rx="3" stroke="#a855f7" stroke-width="4"/>
                        <path d="M24 50H40M32 42V50" stroke="#a855f7" stroke-width="4" stroke-linecap="round"/>
                        <path class="icon-chart-grow" stroke-dasharray="20" d="M20 32L28 24L36 28L44 20" stroke="#a855f7" stroke-width="4" stroke-linecap="round"/>
                    </svg>
                </div>
                <div class="stage-metrics">
                    <div class="metric-row">
                        <span class="metric-label">Reports Generated:</span>
                        <span class="metric-val" id="repVol">15.4K <small>/hr</small></span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Dashboard Latency:</span>
                        <span class="metric-val" id="repLat">1.2 <small>sec</small></span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Error Rate:</span>
                        <span class="metric-val val-green" id="repErr">0.1%</span>
                    </div>
                </div>
            </div>

        </div>

        <!-- CHARTS MIDDLE ROW -->
        <div class="charts-row">
            <!-- LATENCY OVER TIME -->
            <div class="chart-card">
                <div class="chart-title">Latency Over Time</div>
                <canvas id="latencyChart" class="chart-canvas"></canvas>
            </div>

            <!-- ERROR RATE TRENDS -->
            <div class="chart-card">
                <div class="chart-title">Error Rate Trends</div>
                <canvas id="errorChart" class="chart-canvas"></canvas>
            </div>

            <!-- DATA THROUGHPUT -->
            <div class="chart-card">
                <div class="chart-title">Data Throughput</div>
                <canvas id="throughputChart" class="chart-canvas"></canvas>
            </div>
        </div>

        <!-- BOTTOM GAUGES CARD -->
        <div class="gauges-card">
            <div class="gauges-grid">
                
                <!-- GAUGE 1 -->
                <div class="gauge-item">
                    <div class="gauge-title">SLA Compliance Summary</div>
                    <div class="gauge-svg-box">
                        <svg width="140" height="85" viewBox="0 0 140 85">
                            <path d="M 15 75 A 55 55 0 0 1 125 75" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="14" stroke-linecap="round"/>
                            <path d="M 15 75 A 55 55 0 0 1 123 70" fill="none" stroke="#22c55e" stroke-width="14" stroke-linecap="round"/>
                        </svg>
                        <div class="gauge-val-text" id="g1">98%</div>
                    </div>
                    <div class="gauge-status-icon status-green">✔ Compliant</div>
                </div>

                <!-- GAUGE 2 -->
                <div class="gauge-item">
                    <div class="gauge-title">Latency SLA</div>
                    <div class="gauge-svg-box">
                        <svg width="140" height="85" viewBox="0 0 140 85">
                            <path d="M 15 75 A 55 55 0 0 1 125 75" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="14" stroke-linecap="round"/>
                            <path d="M 15 75 A 55 55 0 0 1 118 64" fill="none" stroke="#22c55e" stroke-width="14" stroke-linecap="round"/>
                        </svg>
                        <div class="gauge-val-text" id="g2">95%</div>
                    </div>
                    <div class="gauge-status-icon status-green">✔ Compliant</div>
                </div>

                <!-- GAUGE 3 -->
                <div class="gauge-item">
                    <div class="gauge-title">Error Rate SLA</div>
                    <div class="gauge-svg-box">
                        <svg width="140" height="85" viewBox="0 0 140 85">
                            <path d="M 15 75 A 55 55 0 0 1 125 75" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="14" stroke-linecap="round"/>
                            <path d="M 15 75 A 55 55 0 0 1 110 52" fill="none" stroke="#f59e0b" stroke-width="14" stroke-linecap="round"/>
                        </svg>
                        <div class="gauge-val-text" id="g3">92%</div>
                    </div>
                    <div class="gauge-status-icon status-amber">⚠ Warning</div>
                </div>

                <!-- GAUGE 4 -->
                <div class="gauge-item">
                    <div class="gauge-title">Report SLA</div>
                    <div class="gauge-svg-box">
                        <svg width="140" height="85" viewBox="0 0 140 85">
                            <path d="M 15 75 A 55 55 0 0 1 125 75" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="14" stroke-linecap="round"/>
                            <path d="M 15 75 A 55 55 0 0 1 120 67" fill="none" stroke="#22c55e" stroke-width="14" stroke-linecap="round"/>
                        </svg>
                        <div class="gauge-val-text" id="g4">96%</div>
                    </div>
                    <div class="gauge-status-icon status-green">✔ Compliant</div>
                </div>

            </div>
        </div>

        <!-- CONTROLS -->
        <div class="action-bar">
            <button class="btn" onclick="triggerRefresh()">⚡ Refresh Pipeline SLA Metrics</button>
            <button class="btn btn-warning" onclick="simulateAnomaly()">💥 Simulate Pipeline Load Surge</button>
        </div>

    </div>

    <div id="toastContainer" class="toast-container"></div>

    <script>
        function showToast(msg) {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = '<span>⚙️</span> <span>' + msg + '</span>';
            container.appendChild(toast);
            setTimeout(function() { toast.remove(); }, 3500);
        }

        function triggerRefresh() {
            showToast('Refreshed all 4 Data Pipeline Stage Icons & SLAs!');
            drawLatencyChart();
            drawErrorChart();
            drawThroughputChart();
        }

        function simulateAnomaly() {
            showToast('Simulated 1,200 GB/hr Traffic Surge on Sources Stage!');
            document.getElementById('srcVol').innerHTML = '1,200 <small>GB/hr</small>';
            setTimeout(function() {
                document.getElementById('srcVol').innerHTML = '850 <small>GB/hr</small>';
            }, 4000);
        }

        // Live ticker updating numbers dynamically
        setInterval(function() {
            const v = (840 + Math.floor(Math.random() * 20));
            document.getElementById('srcVol').innerHTML = v + ' <small>GB/hr</small>';
            const r = (15.2 + (Math.random() * 0.4)).toFixed(1);
            document.getElementById('repVol').innerHTML = r + 'K <small>/hr</small>';
        }, 1500);

        // --- DRAW LATENCY OVER TIME CHART ---
        let shiftOffset = 0;
        function drawLatencyChart() {
            const c = document.getElementById('latencyChart');
            const ctx = c.getContext('2d');
            c.width = c.parentElement.clientWidth - 36;
            c.height = 180;

            const w = c.width, h = c.height;
            ctx.clearRect(0,0,w,h);

            // Grid
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            for(let y = 30; y < h; y += 35) {
                ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke();
            }

            // Line 1: Blue
            ctx.beginPath(); ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.5;
            const p1 = [40, 60, 50, 75, 45, 80, 55, 90 + Math.sin(shiftOffset)*10];
            const step = w / (p1.length - 1);
            ctx.moveTo(0, h - p1[0]);
            for(let i=1; i<p1.length; i++) ctx.lineTo(i*step, h - p1[i]);
            ctx.stroke();

            // Line 2: Green
            ctx.beginPath(); ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2.5;
            const p2 = [80, 100, 130, 95, 110, 85, 120, 100 + Math.cos(shiftOffset)*10];
            ctx.moveTo(0, h - p2[0]);
            for(let i=1; i<p2.length; i++) ctx.lineTo(i*step, h - p2[i]);
            ctx.stroke();

            // Line 3: Orange
            ctx.beginPath(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2.5;
            const p3 = [25, 30, 20, 40, 25, 50, 35, 45 + Math.sin(shiftOffset)*5];
            ctx.moveTo(0, h - p3[0]);
            for(let i=1; i<p3.length; i++) ctx.lineTo(i*step, h - p3[i]);
            ctx.stroke();

            shiftOffset += 0.1;
            requestAnimationFrame(drawLatencyChart);
        }

        // --- DRAW ERROR RATE TRENDS CHART ---
        function drawErrorChart() {
            const c = document.getElementById('errorChart');
            const ctx = c.getContext('2d');
            c.width = c.parentElement.clientWidth - 36;
            c.height = 180;

            const w = c.width, h = c.height;
            ctx.clearRect(0,0,w,h);

            const groups = [
                { b1: 100, b2: 60, label: 'Sources' },
                { b1: 130, b2: 80, label: 'Transform' },
                { b1: 90, b2: 50, label: 'Warehouse' }
            ];

            const groupW = w / 3;
            groups.forEach((g, idx) => {
                const xBase = idx * groupW + 30;
                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(xBase, h - g.b1, 24, g.b1);
                ctx.fillStyle = idx === 1 ? '#f59e0b' : '#22c55e';
                ctx.fillRect(xBase + 30, h - g.b2, 24, g.b2);
            });
        }

        // --- DRAW DATA THROUGHPUT CHART ---
        function drawThroughputChart() {
            const c = document.getElementById('throughputChart');
            const ctx = c.getContext('2d');
            c.width = c.parentElement.clientWidth - 36;
            c.height = 180;

            const w = c.width, h = c.height;
            ctx.clearRect(0,0,w,h);

            const bars = [
                { h1: 80, h2: 130, label: 'Incoming Data' },
                { h1: 140, h2: 90, label: 'Processed Data' },
                { h1: 160, h2: 100, label: 'Stored Data' }
            ];

            const groupW = w / 3;
            bars.forEach((g, idx) => {
                const xBase = idx * groupW + 25;
                ctx.fillStyle = '#2563eb';
                ctx.fillRect(xBase, h - g.h1, 24, g.h1);
                ctx.fillStyle = '#22c55e';
                ctx.fillRect(xBase + 30, h - g.h2, 24, g.h2);
            });
        }

        window.addEventListener('resize', function() {
            drawErrorChart();
            drawThroughputChart();
        });

        drawLatencyChart();
        drawErrorChart();
        drawThroughputChart();
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(DASHBOARD_HTML);
    } else if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', platform: 'Data Pipeline Observability Dashboard', uptime: process.uptime() }));
    } else if (req.url === '/modules') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            pipeline_stages: 4,
            animated_icons: true,
            total_loc: 525112
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`[Data Pipeline Observability] Server running on http://localhost:${PORT}`);
});
