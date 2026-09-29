export function createStorage(storage, report) {
  let available = true;
  function unavailable(error) {
    if (available) {
      available = false;
      console.warn("Mona Crossing cannot use local storage:", error);
      report("Local saves are unavailable. Your best and sound setting last only this visit. Allow site storage to save them.");
    }
  }
  return {
    load() {
      try {
        const raw = storage.getItem("mona-crossing:v1");
        if (!raw) return { best: 0, sound: false };
        const data = JSON.parse(raw);
        if (!data || !Number.isSafeInteger(data.best) || data.best < 0 || typeof data.sound !== "boolean") {
          throw new Error("Saved data is invalid");
        }
        return data;
      } catch (error) {
        unavailable(error);
        return { best: 0, sound: false };
      }
    },
    save(data) {
      if (!available) return;
      try { storage.setItem("mona-crossing:v1", JSON.stringify(data)); }
      catch (error) { unavailable(error); }
    }
  };
}
