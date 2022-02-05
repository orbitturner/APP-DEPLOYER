import chalkAnimation from "chalk-animation";
import { _ShowMainMenu } from "../orbit.js";

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
export const isEmpty = (obj) => obj // 👈 null and undefined check
  &&
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype;

export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export async function _GoHome() {
  const animatedString = chalkAnimation.neon(
    `🏠 RETURNING TO THE MAIN MENU ✈`
  );

  await sleep(4000);
  animatedString.stop();
  console.clear();
  _ShowMainMenu();
}