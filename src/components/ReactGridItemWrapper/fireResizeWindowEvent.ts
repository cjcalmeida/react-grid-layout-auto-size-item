export const fireResizeWindowEvent = () => {
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 150);
};
