"use strict";

const nav = document.querySelector("#navigation");
const menu = document.querySelector(".menu-toggle");
const toast = document.querySelector("#toast");
const citation = document.querySelector("#citation-dialog");
let toastTimeout;

function setMenu(open) {
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", event => {
  if (!event.target.closest(".site-header")) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});

function notify(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 3000);
}

async function copyText(value, successMessage) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(value);
    notify(successMessage);
  } catch {
    // Support directly opened files and browsers without Clipboard API access.
    const fallback = document.createElement("textarea");
    fallback.value = value;
    fallback.setAttribute("aria-label", "Text to copy");
    fallback.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    const active = document.activeElement;
    (citation.open ? citation : document.body).appendChild(fallback);
    fallback.select();
    const copied = document.execCommand("copy");
    fallback.remove();
    active?.focus();
    notify(copied ? successMessage : "Please select and copy the text manually.");
  }
}

document.querySelectorAll("[data-copy-email]").forEach(button => {
  button.addEventListener("click", () => copyText(button.dataset.copyEmail, "Email address copied"));
});
document.querySelector("[data-open-citation]").addEventListener("click", () => citation.showModal());
document.querySelector("[data-close-citation]").addEventListener("click", () => citation.close());
document.querySelector("[data-copy-citation]").addEventListener("click", () => copyText(document.querySelector("#bibtex").textContent.trim(), "BibTeX copied"));
citation.addEventListener("click", event => {
  const bounds = citation.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) citation.close();
});

const navLinks = [...nav.querySelectorAll("a")];
function updateActiveSection() {
  const sections = navLinks.map(link => document.querySelector(link.getAttribute("href")));
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 150) current = section;
  }
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) current = sections[sections.length - 1];
  navLinks.forEach(link => {
    const active = link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
let scrollFrame;
window.addEventListener("scroll", () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    updateActiveSection();
    scrollFrame = null;
  });
}, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 640) setMenu(false);
  updateActiveSection();
});
document.querySelector("#year").textContent = new Date().getFullYear();
updateActiveSection();
