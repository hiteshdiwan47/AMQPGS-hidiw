// theme.js

export const setTheme = (mode) => {
  localStorage.setItem("theme", mode);

  if (mode === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  // 🔥 notify all components
  window.dispatchEvent(new Event("theme-change"));
};

export const toggleTheme = () => {
  const current = localStorage.getItem("theme") || "light";
  const newTheme = current === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

export const initTheme = () => {
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
};