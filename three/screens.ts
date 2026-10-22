import * as THREE from 'three';

// Canvas-drawn monitor contents. Redrawn a few times a second, never every frame.

const W = 512;
const H = 320;

function makeCanvas() {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { c, ctx: c.getContext('2d')!, tex };
}

const SCRIPT = [
  ['$ git push origin main', '#E8E6F0'],
  ['  pipeline #4182 started', '#8FA6FF'],
  ['  ✓ build      42s', '#5FE39A'],
  ['  ✓ test       1m 08s', '#5FE39A'],
  ['  ✓ docker push registry/api:1.9.3', '#5FE39A'],
  ['$ kubectl rollout status deploy/api', '#E8E6F0'],
  ['  deployment "api" successfully rolled out', '#5FE39A'],
  ['$ kubectl get pods -n prod', '#E8E6F0'],
  ['  api-7f9c6d-x2k8q     1/1  Running', '#C9D4FF'],
  ['  web-5b7d9f-qq1lz     1/1  Running', '#C9D4FF'],
  ['  worker-66c8-hh2pn    1/1  Running', '#C9D4FF'],
  ['$ terraform plan', '#E8E6F0'],
  ['  No changes. Infrastructure is up-to-date.', '#FFD23F'],
  ['$ echo "ship it"', '#E8E6F0'],
  ['  ship it 🚀', '#FF8FC0'],
] as const;

export function createTerminal() {
  const { ctx, tex } = makeCanvas();
  let line = 0;
  let blink = false;

  const draw = () => {
    ctx.fillStyle = '#10131F';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#1C2135';
    ctx.fillRect(0, 0, W, 28);
    ['#FF5F57', '#FEBC2E', '#28C840'].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(18 + i * 18, 14, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#8A90B0';
    ctx.font = '600 13px monospace';
    ctx.fillText('christo@prod ~ zsh', 190, 18);

    ctx.font = '600 17px monospace';
    const visible = 12;
    const start = Math.max(0, line - visible);
    for (let i = start; i < line; i++) {
      const [text, color] = SCRIPT[i % SCRIPT.length];
      ctx.fillStyle = color;
      ctx.fillText(text, 14, 54 + (i - start) * 22);
    }
    if (blink) {
      ctx.fillStyle = '#E8E6F0';
      ctx.fillRect(14, 54 + Math.min(line - start, visible) * 22 - 14, 10, 18);
    }
    tex.needsUpdate = true;
  };

  draw();
  return {
    texture: tex,
    tick() {
      blink = !blink;
      if (blink) line++;
      if (line > SCRIPT.length * 2) line = SCRIPT.length;
      draw();
    },
  };
}

export function createDashboard() {
  const { ctx, tex } = makeCanvas();
  const points = Array.from({ length: 40 }, (_, i) => 0.5 + Math.sin(i / 4) * 0.15);
  const bars = [0.6, 0.4, 0.75, 0.3];

  const draw = () => {
    ctx.fillStyle = '#10131F';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#E8E6F0';
    ctx.font = '700 18px sans-serif';
    ctx.fillText('prod-cluster', 16, 30);
    ctx.fillStyle = '#5FE39A';
    ctx.beginPath();
    ctx.arc(150, 24, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '700 15px sans-serif';
    ctx.fillText('99.9% uptime', 380, 30);

    // Request rate line chart
    ctx.fillStyle = '#181D30';
    ctx.fillRect(16, 46, 480, 150);
    ctx.strokeStyle = '#2A3150';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(16, 46 + i * 37.5);
      ctx.lineTo(496, 46 + i * 37.5);
      ctx.stroke();
    }
    ctx.strokeStyle = '#8FA6FF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = 16 + (i / (points.length - 1)) * 480;
      const y = 186 - p * 130;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = '#8A90B0';
    ctx.font = '600 12px sans-serif';
    ctx.fillText('requests / s', 24, 64);

    // CPU bars per node
    bars.forEach((b, i) => {
      const x = 16 + i * 122;
      ctx.fillStyle = '#181D30';
      ctx.fillRect(x, 212, 110, 92);
      ctx.fillStyle = b > 0.7 ? '#FFD23F' : '#5FE39A';
      ctx.fillRect(x + 10, 296 - b * 60, 90, b * 60);
      ctx.fillStyle = '#8A90B0';
      ctx.fillText(`node-${i + 1}  ${Math.round(b * 100)}%`, x + 10, 230);
    });
    tex.needsUpdate = true;
  };

  draw();
  return {
    texture: tex,
    tick() {
      points.shift();
      const last = points[points.length - 1];
      points.push(Math.min(0.95, Math.max(0.1, last + (Math.random() - 0.5) * 0.18)));
      for (let i = 0; i < bars.length; i++) bars[i] = Math.min(0.92, Math.max(0.15, bars[i] + (Math.random() - 0.5) * 0.12));
      draw();
    },
  };
}

/** Corkboard sticky notes */
export function createNotes() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 340;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#B78A5C';
  ctx.fillRect(0, 0, 512, 340);
  const notes: [string, string, number, number, number][] = [
    ['#FFE27A', 'no deploys\non friday', 40, 40, -0.08],
    ['#A7F0C9', '99.9%\nuptime ✓', 200, 70, 0.06],
    ['#FFB3D1', 'rotate the\nsecrets!!', 350, 30, -0.04],
    ['#B9C8FF', 'k8s 1.31\nupgrade', 120, 190, 0.05],
  ];
  notes.forEach(([bg, text, x, y, r]) => {
    ctx.save();
    ctx.translate(x + 60, y + 60);
    ctx.rotate(r);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(-56, -52, 120, 120);
    ctx.fillStyle = bg;
    ctx.fillRect(-60, -60, 120, 120);
    ctx.fillStyle = '#E2445C';
    ctx.beginPath();
    ctx.arc(0, -48, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2A2140';
    ctx.font = '700 20px sans-serif';
    ctx.textAlign = 'center';
    text.split('\n').forEach((l, i) => ctx.fillText(l, 0, -6 + i * 26));
    ctx.restore();
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
