import { test, expect } from "@playwright/test";
import { segments, GOALS, CELL, PLAYER_HALF, WIDTH } from "../../src/simulation.js";

// A reactive observer, not a route search: read the current board, choose one
// ordinary input, then allow 360-520 ms of real wall time for the next decision.
function safe(game, row, x, margin = 12) {
  if (x < 20 || x > WIDTH - 20) return false;
  const lane = game.lanes.find(lane => lane.row === row);
  if (!lane) return true;
  if (row < 4) return segments(lane).some(segment =>
    x >= segment.x + PLAYER_HALF + margin &&
    x <= segment.x + segment.width - PLAYER_HALF - margin);
  // Leave enough road clearance to stand until the next observation.
  return !segments(lane).some(segment =>
    x + PLAYER_HALF + margin > segment.x + Math.min(0, lane.speed * .65) + 3 &&
    x - PLAYER_HALF - margin < segment.x + segment.width + Math.max(0, lane.speed * .65) - 3);
}

test("real-clock WASD delivers five gardens with human-paced river decisions", async ({ page }) => {
  await page.goto("./");
  await page.locator("#start").click();
  await page.waitForTimeout(1300);
  const snapshot = () => page.evaluate(async () => (await import("./src/app.js")).getGameSnapshot());
  const riverRows = new Set();
  const delivered = new Set();
  let carried = false;
  let previous;
  let final;
  for (let i = 0; i < 220; i++) {
    const game = await snapshot();
    final = game;
    expect(game.status).toBe("playing");
    expect(game.lives).toBeGreaterThan(0);
    game.goals.forEach((filled, index) => { if (filled) delivered.add(index); });
    if (game.round === 2) { delivered.add(4); break; }
    if (game.transition > 0) { await page.waitForTimeout(450); continue; }
    const { row, x } = game.player;
    if (row >= 1 && row <= 3) {
      riverRows.add(row);
      if (previous?.row === row && previous.move === null && Math.abs(previous.x - x) > 1) carried = true;
    }
    const target = (GOALS[game.goals.findIndex(filled => !filled)] + .5) * CELL;
    const lateral = target < x ? "left" : "right";
    const lx = x + (target < x ? -CELL : CELL);
    let move = null;
    if (row === 4 && Math.abs(target - x) >= 20) move = lateral;
    else if (row === 1) {
      if (Math.abs(target - x) <= 15) move = "up";
      else if (Math.abs(target - x) >= 20 && safe(game, row, lx)) move = lateral;
      else if (x > target + 15 && safe(game, 2, x)) move = "down";
    } else if (safe(game, row - 1, x, row <= 4 ? 12 : 8)) move = "up";
    else if (!safe(game, row, x)) {
      if (safe(game, row, lx)) move = lateral;
      else if (safe(game, row, x - (lx - x))) move = lateral === "left" ? "right" : "left";
      else if (safe(game, row + 1, x)) move = "down";
    }
    if (move) await page.keyboard.press({ up: "w", down: "s", left: "a", right: "d" }[move]);
    previous = { row, x, move };
    await page.waitForTimeout([360, 440, 520, 400, 480][i % 5]);
  }
  expect(final.round).toBe(2);
  expect([...delivered].sort()).toEqual([0, 1, 2, 3, 4]);
  expect([...riverRows].sort()).toEqual([1, 2, 3]);
  expect(carried).toBe(true);
  await expect(page.locator("#feedback")).toContainText("All five home");
});
