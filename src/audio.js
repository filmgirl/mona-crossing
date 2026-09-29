const sounds = {
  hop: [[440, .045], [580, .045]],
  goal: [[523, .07], [659, .07], [784, .12]],
  death: [[220, .09], [165, .09], [110, .15]],
  round: [[523, .09], [659, .09], [784, .09], [1047, .18]]
};

export function createAudio(report) {
  let context;
  let enabled = false;
  let failed = false;
  function failure(error) {
    if (!failed) {
      failed = true;
      console.warn("Mona Crossing audio unavailable:", error);
      report("Sound could not start. The game still works. Try the Sound button again, or allow audio in your browser.");
    }
  }
  return {
    async unlock(wanted) {
      enabled = wanted;
      if (!wanted) {
        if (context?.state === "running") {
          try { await context.suspend(); } catch (error) { failure(error); }
        }
        return true;
      }
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) throw new Error("Web Audio is not supported");
        context ??= new AudioContext();
        await context.resume();
        if (context.state !== "running") throw new Error("Audio context did not resume");
        failed = false;
        return true;
      } catch (error) {
        enabled = false;
        failure(error);
        return false;
      }
    },
    play(name) {
      if (!enabled || !context || context.state !== "running" || !sounds[name]) return;
      let time = context.currentTime;
      for (const [frequency, duration] of sounds[name]) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "square";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(.045, time + .006);
        gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(time);
        oscillator.stop(time + duration + .01);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
        time += duration;
      }
    }
  };
}
