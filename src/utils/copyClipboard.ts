export const copyClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
  } catch (err) {
    console.error("URL 복사 실패:", err);
  }
};
