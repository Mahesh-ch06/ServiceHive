const AUTH_KEY = "smart_leads_auth";

export const storage = {
  get: () => {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set: (value: unknown) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(value));
  },
  clear: () => {
    localStorage.removeItem(AUTH_KEY);
  }
};
