export function formatDuration(duration) {
  if (!duration) return "";
  const mapping = {
    "hourly": "Hourly",
    "daily": "Daily",
    "weekly": "Weekly",
    "monthly": "Monthly",
    "one-time": "One Time"
  };
  return mapping[duration.toLowerCase()] || duration;
}
