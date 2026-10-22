
export const AUTH_TOKEN_KEY = "mah-garden-token";
export const AUTH_USER_KEY = "mah-garden-user";

export type SessionRole = "admin" | "user";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: SessionRole;
};

export type SessionData = {
  token: string;
  user: SessionUser;
};

type JwtPayload = {
  exp?: number;
  sub?: string;
  id?: string;
  email?: string;
  name?: string;
  role?: string;
};

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");

    if (parts.length !== 3 || !parts[1]) {
      return null;
    }

    const normalized = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padded =
      normalized +
      "=".repeat((4 - (normalized.length % 4)) % 4);

    const binary = atob(padded);

    const bytes = Uint8Array.from(
      binary,
      (character) => character.charCodeAt(0),
    );

    const decoded = new TextDecoder().decode(bytes);

    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

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

    const parsedUser: unknown = JSON.parse(rawUser);

    if (
      typeof parsedUser !== "object" ||
      parsedUser === null
    ) {
      clearStoredSession();
      return null;
    }

    const candidate = parsedUser as Partial<SessionUser>;

    if (
      typeof candidate.id !== "string" ||
      typeof candidate.name !== "string" ||
      typeof candidate.email !== "string" ||
      (candidate.role !== "admin" && candidate.role !== "user")
    ) {
      clearStoredSession();
      return null;
    }

    const payload = decodeJwtPayload(token);

    if (!payload) {
      clearStoredSession();
      return null;
    }

    // Expired token: clear the local session.
    if (
      typeof payload.exp === "number" &&
      Date.now() / 1000 >= payload.exp
    ) {
      clearStoredSession();
      return null;
    }

    return {
      token,
      user: {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        role: candidate.role,
      },
    };
  } catch {
    clearStoredSession();
    return null;
  }
}

export function clearStoredSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
}
