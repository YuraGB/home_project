import { randomBytes, pbkdf2Sync } from "@/server/lib/crypto";

export function generatePassword(password: string) {
  const salt = randomBytes(32).toString("hex");
  const genHash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString(
    "hex",
  );
  return {
    salt: salt,
    hash: genHash,
  };
}
export function validPassword(password: string, hash: string, salt: string) {
  const checkHash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString(
    "hex",
  );
  return hash === checkHash;
}
