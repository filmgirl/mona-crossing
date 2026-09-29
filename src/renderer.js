import { CELL, GOALS, WIDTH, segments } from "./simulation.js";

export const PALETTE = Object.freeze({
  ink: "#34313e", cream: "#fff7df", paper: "#fffdf4", peach: "#ffb7a5",
  coral: "#e89592", pink: "#ed9eb7", mint: "#c5e7b1", grass: "#a7d59e",
  leaf: "#86bda0", darkLeaf: "#568773", lavender: "#ded4f1", purple: "#a58cbf",
  water: "#96dce2", deepWater: "#74bdce", foam: "#d2f1e8", wood: "#e7b3b0"
});
const P = PALETTE;
const BX = 80;
const BY = 96;
const octocat = new Path2D("M3 0h4v2h14V0h4v8h2v9h-2v3h-7v4h2v3h2v2h-4v-2h-2v-6h-2v8h-3v-8H9v6H7v2H4v-2h2v-4H1v-2h-3v-4h3v2h5v-2H2v-3H0V8h3Z");
const face = new Path2D("M5 8h17v2h2v6h-2v2H5v-2H3v-6h2Z");
const features = new Path2D("M7 11h2v4H7zM18 11h2v4h-2zM12 15h3v1h-3z");
const glyphs = {
  A: ["010","101","111","101","101"], B: ["110","101","110","101","110"],
  C: ["011","100","100","100","011"], D: ["110","101","101","101","110"],
  E: ["111","100","110","100","111"], F: ["111","100","110","100","100"],
  G: ["011","100","101","101","011"], H: ["101","101","111","101","101"],
  I: ["111","010","010","010","111"], J: ["001","001","001","101","010"],
  K: ["101","101","110","101","101"], L: ["100","100","100","100","111"],
  M: ["101","111","111","101","101"], N: ["101","111","111","111","101"],
  O: ["010","101","101","101","010"], P: ["110","101","110","100","100"],
  Q: ["010","101","101","111","011"], R: ["110","101","110","101","101"],
  S: ["011","100","010","001","110"], T: ["111","010","010","010","010"],
  U: ["101","101","101","101","111"], V: ["101","101","101","101","010"],
  W: ["101","101","111","111","101"], X: ["101","101","010","101","101"],
  Y: ["101","101","010","010","010"], Z: ["111","001","010","100","111"],
  "1": ["010","110","010","010","111"], "2": ["110","001","010","100","111"],
  "3": ["110","001","010","001","110"], "4": ["101","101","111","001","001"],
  "5": ["111","100","110","001","110"], "+": ["000","010","111","010","000"],
  "!": ["010","010","010","000","010"]
};

function rect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}
function frame(ctx, x, y, w, h, color, line = 2) {
  rect(ctx, x, y, w, h, P.ink);
  rect(ctx, x + line, y + line, w - line * 2, h - line * 2, color);
}
function label(ctx, text, x, y, size = 1, color = P.ink) {
  for (const char of text.toUpperCase()) {
    const glyph = glyphs[char];
    if (glyph) glyph.forEach((row, gy) => [...row].forEach((bit, gx) => {
      if (bit === "1") rect(ctx, x + gx * size, y + gy * size, size, size, color);
    }));
    x += size * 4;
  }
}
function branch(ctx, x, y, color = P.ink) {
  rect(ctx, x + 3, y, 2, 16, color);
  rect(ctx, x + 4, y + 8, 8, 2, color);
  rect(ctx, x + 10, y + 3, 2, 7, color);
  frame(ctx, x, y, 8, 6, P.paper, 2);
  frame(ctx, x, y + 12, 8, 6, P.paper, 2);
  frame(ctx, x + 8, y, 7, 6, P.paper, 2);
}
function flower(ctx, x, y, color = P.pink) {
  rect(ctx, x, y + 3, 2, 7, P.darkLeaf);
  rect(ctx, x - 3, y + 7, 3, 2, P.leaf);
  rect(ctx, x - 3, y, 8, 3, color);
  rect(ctx, x - 1, y - 2, 4, 7, color);
  rect(ctx, x, y + 1, 2, 2, P.cream);
}
function tree(ctx, x, y, variant = 0) {
  rect(ctx, x - 4, y + 9, 8, 21, P.ink);
  rect(ctx, x - 2, y + 9, 4, 19, P.wood);
  rect(ctx, x - 16, y - 11, 32, 29, P.ink);
  rect(ctx, x - 21, y - 3, 42, 14, P.ink);
  rect(ctx, x - 12, y - 16, 24, 36, P.ink);
  rect(ctx, x - 14, y - 9, 28, 26, variant ? P.lavender : P.mint);
  rect(ctx, x - 19, y - 1, 38, 10, variant ? P.purple : P.grass);
  rect(ctx, x - 10, y - 14, 20, 5, variant ? P.lavender : P.mint);
  rect(ctx, x - 9, y - 7, 5, 3, P.cream);
  rect(ctx, x + 5, y + 11, 7, 3, variant ? P.purple : P.leaf);
  rect(ctx, x - 6, y + 17, 12, 2, P.darkLeaf);
}
function lawn(ctx, x, y, w, h) {
  rect(ctx, x, y, w, h, P.mint);
  for (let yy = y + 4; yy < y + h - 4; yy += 8) {
    for (let xx = x + 4; xx < x + w - 4; xx += 8) {
      rect(ctx, xx, yy, 5, 5, ((xx + yy) / 8) % 3 < 1 ? P.grass : P.leaf);
    }
  }
}
function house(ctx, x, y, color, roof) {
  rect(ctx, x + 4, y + 11, 64, 54, P.purple);
  frame(ctx, x, y + 10, 64, 49, color);
  frame(ctx, x - 4, y + 4, 72, 15, roof);
  rect(ctx, x, y + 5, 64, 3, P.cream);
  for (let i = 0; i < 4; i++) rect(ctx, x + 4 + i * 16, y + 14, 8, 3, P.paper);
  frame(ctx, x + 8, y + 26, 12, 19, P.lavender);
  rect(ctx, x + 12, y + 28, 3, 15, P.paper);
  frame(ctx, x + 44, y + 26, 12, 19, P.lavender);
  rect(ctx, x + 48, y + 28, 3, 15, P.paper);
  frame(ctx, x + 25, y + 26, 15, 33, P.peach);
  rect(ctx, x + 34, y + 43, 3, 3, P.ink);
  frame(ctx, x + 20, y + 59, 26, 7, P.paper);
  frame(ctx, x + 22, y - 4, 21, 13, P.paper);
  label(ctx, "REPO", x + 25, y, 1);
}
function mona(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.translate(Math.round(x - 13 * scale), Math.round(y - 14 * scale));
  ctx.scale(scale, scale);
  ctx.fillStyle = P.ink;
  ctx.fill(octocat);
  ctx.fillStyle = P.paper;
  ctx.fill(face);
  ctx.fillStyle = P.ink;
  ctx.fill(features);
  ctx.restore();
}
function bench(ctx, x, y) {
  frame(ctx, x, y, 36, 10, P.peach);
  rect(ctx, x + 3, y + 3, 30, 2, P.cream);
  frame(ctx, x - 2, y + 12, 40, 5, P.peach);
  rect(ctx, x + 2, y + 17, 3, 6, P.ink);
  rect(ctx, x + 31, y + 17, 3, 6, P.ink);
}

function background(ctx) {
  rect(ctx, 0, 0, 640, 512, P.cream);
  lawn(ctx, 0, 0, 640, 96);
  rect(ctx, 0, 78, 640, 18, P.cream);
  for (const [i, col] of GOALS.entries()) {
    house(ctx, BX + col * CELL - 16, 15, i % 2 ? P.lavender : P.cream,
      [P.peach, P.mint, P.pink, P.water, P.peach][i]);
    flower(ctx, BX + col * CELL - 27, 82, P.pink);
    flower(ctx, BX + col * CELL + 51, 82, P.purple);
  }
  lawn(ctx, BX, BY, WIDTH, CELL);
  rect(ctx, BX, BY + CELL, WIDTH, CELL * 3, P.water);
  rect(ctx, BX, BY + CELL, WIDTH, 3, P.purple);
  rect(ctx, BX, BY + CELL * 4 - 3, WIDTH, 3, P.deepWater);
  rect(ctx, BX, BY + CELL * 4, WIDTH, CELL, P.cream);
  rect(ctx, BX, BY + CELL * 4, WIDTH, 3, P.paper);
  rect(ctx, BX, BY + CELL * 5, WIDTH, CELL * 2, P.pink);
  rect(ctx, BX, BY + CELL * 5, WIDTH, 3, P.ink);
  rect(ctx, BX, BY + CELL * 6, WIDTH, 1, P.cream);
  rect(ctx, BX, BY + CELL * 7, WIDTH, CELL, P.mint);
  rect(ctx, BX, BY + CELL * 7, WIDTH, 3, P.leaf);
  rect(ctx, BX, BY + CELL * 8 - 3, WIDTH, 3, P.leaf);
  rect(ctx, BX, BY + CELL * 8, WIDTH, CELL * 2, P.peach);
  rect(ctx, BX, BY + CELL * 8, WIDTH, 3, P.ink);
  rect(ctx, BX, BY + CELL * 9, WIDTH, 1, P.cream);
  rect(ctx, BX, BY + CELL * 10, WIDTH, CELL, P.cream);
  rect(ctx, BX, BY + CELL * 10, WIDTH, 3, P.ink);
  for (let x = BX + 6; x < BX + WIDTH; x += 32) {
    rect(ctx, x, BY + CELL * 4 + 27, 18, 2, P.purple);
    rect(ctx, x, BY + CELL * 10 + 27, 18, 2, P.wood);
    rect(ctx, x, BY + CELL * 6 - 2, 15, 2, P.cream);
    rect(ctx, x, BY + CELL * 9 - 2, 15, 2, P.cream);
    rect(ctx, x + 3, BY + CELL * 7 + 11, 4, 4, P.grass);
    rect(ctx, x + 11, BY + CELL * 7 + 19, 4, 4, P.leaf);
  }
  for (const col of GOALS) {
    frame(ctx, BX + col * CELL, BY, 32, 32, P.paper);
    rect(ctx, BX + col * CELL + 4, BY + 4, 24, 21, P.grass);
    label(ctx, "MAIN", BX + col * CELL + 8, BY + 14, 1);
    rect(ctx, BX + col * CELL + 13, BY + 25, 6, 7, P.cream);
  }
  for (const x of [0, 560]) {
    rect(ctx, x, 94, 80, 354, P.cream);
    rect(ctx, x + (x ? 0 : 77), 96, 3, 352, P.ink);
    for (let y = 101; y < 446; y += 16) {
      rect(ctx, x + 6, y, 67, 1, P.wood);
      rect(ctx, x + ((y / 16) % 2 ? 35 : 20), y, 1, 16, P.wood);
    }
    tree(ctx, x + 40, 131);
    tree(ctx, x + 35, 203, 1);
    bench(ctx, x + 20, 245);
    flower(ctx, x + 14, 238);
    flower(ctx, x + 65, 239, P.purple);
    tree(ctx, x + 42, 341);
    frame(ctx, x + 23, 285, 34, 17, P.lavender);
    label(ctx, x ? "BUG" : "GIT", x + 28, 291, 1);
    rect(ctx, x + 38, 302, 4, 14, P.ink);
    frame(ctx, x + 23, 382, 29, 19, P.water);
    rect(ctx, x + 26, 386, 23, 3, P.ink);
    rect(ctx, x + 32, 401, 5, 18, P.ink);
    flower(ctx, x + 62, 423, P.purple);
  }
  lawn(ctx, 0, 448, 640, 64);
  rect(ctx, 190, 448, 260, 64, P.cream);
  frame(ctx, 224, 467, 192, 23, P.lavender);
  label(ctx, "COMMIT COMMONS", 234, 473, 2);
  rect(ctx, 226, 490, 4, 9, P.ink);
  rect(ctx, 410, 490, 4, 9, P.ink);
  bench(ctx, 112, 469);
  bench(ctx, 490, 469);
  tree(ctx, 37, 32);
  tree(ctx, 601, 33, 1);
  for (const x of [66, 170, 465, 572]) flower(ctx, x, 477, P.pink);
}

function platform(ctx, segment, lane) {
  const x = BX + segment.x;
  const y = BY + lane.row * CELL + 4;
  const w = segment.width;
  if (lane.kind === "log") {
    frame(ctx, x, y + 2, w, 24, P.wood);
    rect(ctx, x + 4, y + 5, w - 8, 3, P.cream);
    rect(ctx, x + 4, y + 20, w - 8, 2, P.coral);
    rect(ctx, x + 8, y + 12, w - 16, 2, P.ink);
    for (let offset = 18; offset < w - 8; offset += 27) {
      frame(ctx, x + offset, y + 8, 10, 10, P.paper);
      rect(ctx, x + offset + 3, y + 11, 4, 4, P.pink);
    }
    rect(ctx, x + 4, y + 10, 2, 8, P.coral);
    rect(ctx, x + w - 6, y + 10, 2, 8, P.coral);
  } else {
    frame(ctx, x + 3, y + 4, w - 6, 20, P.paper);
    rect(ctx, x, y + 9, w, 10, P.ink);
    rect(ctx, x + 3, y + 10, w - 6, 8, P.paper);
    rect(ctx, x + 7, y + 23, w - 14, 3, P.purple);
    frame(ctx, x + 17, y + 1, 24, 22, P.pink);
    label(ctx, "PR", x + 21, y + 7, 2);
    branch(ctx, x + 67, y + 5);
    rect(ctx, x + 45, y + 8, 9, 8, P.water);
  }
}

function vehicle(ctx, segment, lane, index) {
  const x = BX + segment.x;
  const y = BY + lane.row * CELL + 4;
  const w = segment.width;
  if (lane.kind === "conflict") {
    frame(ctx, x + 2, y + 2, w - 4, 22, P.lavender);
    frame(ctx, x + w - 16, y + 4, 14, 18, P.cream);
    rect(ctx, x + w - 13, y + 6, 7, 5, P.water);
    label(ctx, "!", x + 12, y + 7, 2, P.ink);
    branch(ctx, x + 26, y + 5);
  } else {
    const color = index % 2 ? P.cream : P.purple;
    rect(ctx, x + 7, y, w - 14, 26, P.ink);
    frame(ctx, x + 2, y + 3, w - 4, 20, color);
    rect(ctx, x + w / 2 - 1, y + 4, 2, 18, P.ink);
    rect(ctx, x + 7, y + 7, 6, 5, P.paper);
    rect(ctx, x + w - 13, y + 7, 6, 5, P.paper);
    rect(ctx, x + 5, y + 5, 3, 3, P.ink);
    rect(ctx, x + w - 8, y + 5, 3, 3, P.ink);
    rect(ctx, x - 2, y + 7, 5, 3, P.ink);
    rect(ctx, x + w - 3, y + 7, 5, 3, P.ink);
    rect(ctx, x - 2, y + 17, 5, 3, P.ink);
    rect(ctx, x + w - 3, y + 17, 5, 3, P.ink);
  }
  rect(ctx, x + 7, y + 24, 7, 3, P.ink);
  rect(ctx, x + w - 14, y + 24, 7, 3, P.ink);
}

export function createRenderer(canvas, { reducedMotion = false } = {}) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("Canvas 2D is unavailable. Try a current browser with graphics enabled.");
  const scene = document.createElement("canvas");
  scene.width = 640;
  scene.height = 512;
  background(scene.getContext("2d"));
  let effect = null;
  return {
    event(event, time) {
      if (event.type === "goal" || event.type === "death" || event.type === "round") {
        effect = { ...event, time };
      }
    },
    draw(game) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(scene, 0, 0);
      ctx.save();
      ctx.beginPath();
      ctx.rect(BX, BY + CELL, WIDTH, CELL * 9);
      ctx.clip();
      if (!reducedMotion) {
        const offset = Math.floor(game.elapsed * 9) % 40;
        for (let row = 1; row <= 3; row++) {
          for (let x = -40; x < WIDTH; x += 40) {
            rect(ctx, BX + x + offset, BY + row * CELL + 14, 13, 2, P.foam);
            rect(ctx, BX + x + offset + 18, BY + row * CELL + 26, 5, 1, P.deepWater);
          }
        }
      }
      for (const lane of game.lanes) {
        segments(lane).forEach((segment, i) => {
          if (lane.kind === "log" || lane.kind === "ferry") platform(ctx, segment, lane);
          else vehicle(ctx, segment, lane, i);
        });
      }
      ctx.restore();
      for (const [i, col] of GOALS.entries()) {
        if (game.goals[i]) {
          rect(ctx, BX + col * CELL + 3, BY + 3, 26, 26, P.lavender);
          mona(ctx, BX + (col + 0.5) * CELL, BY + 16, 0.75);
        }
      }
      const x = BX + game.player.x;
      const y = BY + game.player.row * CELL + 16;
      rect(ctx, x - 12, y + 13, 24, 3, P.purple);
      mona(ctx, x, y);
      if (effect && game.elapsed - effect.time < 0.65 && !reducedMotion) {
        const age = game.elapsed - effect.time;
        const centerX = effect.type === "goal" ? BX + (GOALS[effect.index] + 0.5) * CELL : x;
        const centerY = effect.type === "goal" ? BY + 16 : y;
        for (let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4;
          const radius = 12 + age * 36;
          rect(ctx, centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius,
            3, 3, effect.type === "death" ? P.pink : P.cream);
        }
      }
    }
  };
}
