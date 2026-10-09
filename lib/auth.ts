import crypto from "node:crypto";

const AUTH_SECRET =
  process.env.AUTH_SECRET ||
  process.env.JWT_SECRET;

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [salt, hash] = storedHash.split(":");
  const derived = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(derived, "hex"),
    );
  } catch {
    return false;
  }
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function createAuthToken(user: {
  id: string;
  email: string;
  name: string;
}) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: now,
    exp: now + 60 * 60 * 24 * 7,
  };

  const encodedHeader = encodeBase64Url(JSON.stringify(header));
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(signingInput)
    .digest("base64url");

  return `${signingInput}.${signature}`;
}

export function verifyAuthToken(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const [headerBase64, payloadBase64, signature] = parts;
    const signingInput = `${headerBase64}.${payloadBase64}`;
    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(signingInput)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature),
      )
    ) {
      return null;
    }

    const payload = JSON.parse(decodeBase64Url(payloadBase64));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
