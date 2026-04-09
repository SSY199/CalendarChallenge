export const sendNotification = (title: string, body: string): void => {
  // Guard for SSR / non-browser environments
  if (typeof window === "undefined" || !("Notification" in window)) return;

  const show = () => new Notification(title, { body, icon: "/favicon.ico" });

  if (Notification.permission === "granted") {
    show();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") show();
      })
      .catch(() => {
        // Permission request failed or was interrupted; silently ignore
      });
  }
};
