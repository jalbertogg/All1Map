export const applyTheme = (theme) => {
  let element = document.getElementById("root");

  if (theme === 'light') {
    element.classList.remove("dark-theme");
    element.classList.add("light-theme");
  } else {
    element.classList.remove("light-theme");
    element.classList.add("dark-theme");
  }
};
