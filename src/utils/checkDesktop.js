export default function checkDesktop() {
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  const isTablet = /iPad/i.test(navigator.userAgent);
  const isDesktop = !isMobile && !isTablet;
  return isDesktop;
}