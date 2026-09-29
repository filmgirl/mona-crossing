import { advance, hop, GOALS } from "../../src/simulation.js";

export function copyGame(game) {
  return { ...game, player: { ...game.player }, goals: [...game.goals],
    lanes: game.lanes.map(lane => ({ ...lane })), events: [] };
}

// Search only observes simulation copies; browser callers execute real controls.
export function planRoute(initial, goal) {
  let frontier = [{ game: copyGame(initial), actions: [] }];
  const target = (GOALS[goal] + .5) * 32;
  for (let depth = 0; depth < 180; depth++) {
    const next = new Map();
    for (const node of frontier) {
      for (const direction of ["up", "left", "right", "wait", "down"]) {
        const game = copyGame(node.game);
        if (direction !== "wait") hop(game, direction);
        const success = game.events.some(event => event.type === "goal" && event.index === goal);
        if (game.lives !== initial.lives || game.events.some(event => event.type === "goal" && event.index !== goal)) continue;
        const actions = [...node.actions, direction];
        if (success) return actions;
        for (let i = 0; i < 10; i++) advance(game, .016);
        if (game.lives !== initial.lives) continue;
        game.events.length = 0;
        const key = `${game.player.row}:${Math.round(game.player.x / 4)}`;
        if (!next.has(key)) next.set(key, { game, actions });
      }
    }
    frontier = [...next.values()].sort((a, b) =>
      (a.game.player.row * 30 + Math.abs(a.game.player.x - target)) -
      (b.game.player.row * 30 + Math.abs(b.game.player.x - target))
    ).slice(0, 600);
    if (!frontier.length) break;
  }
  throw new Error(`No playable route to garden ${goal + 1}`);
}
