type Throttle = <T extends (...args: any[]) => any>(
  ms: number,
  cb: T
) => (...args: Parameters<T>) => Promise<ReturnType<T>>;

export const throttle: Throttle = (ms, cb) => {
  let lastTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<typeof cb> | null = null;
  let lastResolve: ((value: ReturnType<typeof cb>) => void) | null = null;

  const trigger = () => {
    if (!lastArgs) return;
    const result = cb(...lastArgs);
    lastResolve?.(result);
    lastTime = Date.now();
    timeoutId = null;
    lastArgs = null;
    lastResolve = null;
  };

  return (...args) => {
    const now = Date.now();
    const timeSinceLast = now - lastTime;
    lastArgs = args;

    // Eğer yeterince zaman geçmişse hemen çalıştır
    if (timeSinceLast >= ms) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      const result = cb(...args);
      lastTime = now;
      return Promise.resolve(result);
    }

    // Aksi halde bekleme başlat, süre bitince son çağrıyı çalıştır
    if (!timeoutId) {
      return new Promise<ReturnType<typeof cb>>((resolve) => {
        lastResolve = resolve;
        timeoutId = setTimeout(trigger, ms - timeSinceLast);
      });
    }

    return new Promise<ReturnType<typeof cb>>((resolve) => {
      lastResolve = resolve;
    });
  };
};
