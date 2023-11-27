export default function formatTime(time_ms: number) {
  const d = new Date(time_ms);
  return `${d.getMinutes()}:${String(d.getSeconds()).padStart(2, '0')}`;
}
