export const AUTH_TOKEN_KEY = "mah-garden-token";
export const AUTH_USER_KEY = "mah-garden-user";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export type SessionData = {
  token: string;
  user: SessionUser;
};

export function getStoredSession(): SessionData | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    const rawUser = window.localStorage.getItem(AUTH_USER_KEY);

    if (!token || !rawUser) {
      return null;
    }

    const user = JSON.parse(rawUser) as SessionUser;
    if (!user?.email || !user?.name || !token) {
      return null;
    }

    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
    const decoded = JSON.parse(
      decodeURIComponent(
        atob(normalized + pad)
          .split("")
          .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
          .join(""),
      ),
    );

    if (decoded.exp && Date.now() / 1000 > decoded.exp) {
      clearStoredSession();
      return null;
    }

    return { token, user };
  } catch {
    clearStoredSession();
    return null;
  }
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
}
