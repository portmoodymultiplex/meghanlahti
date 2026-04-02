/**
 * Lahti 2026 — Preview Password Gate
 * Password: lahti
 * Remove this script tag from all pages once Meghan approves and you go live.
 */
(function () {
  // SHA-256 of "lahti"
  const HASH = "f1f606449ef4602990153edfbd439bc2440f94047fc86cc0846b5127a168f66a";

  if (sessionStorage.getItem("lahti_preview") === "granted") return;

  // Not authorized — redirect to access page, storing intended destination
  sessionStorage.setItem("lahti_redirect", window.location.pathname || "/index.html");
  window.location.replace("/preview-access.html");
})();
