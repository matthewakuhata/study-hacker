export const convertToDisplayTime = (seconds: number) => {
  if (seconds <= 0) {
    return "00:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const minsDisplay = mins >= 10 ? mins.toString(10) : `0${mins}`;
  const secsDisplay = secs >= 10 ? secs.toString(10) : `0${secs}`;
  return `${minsDisplay}:${secsDisplay}`;
};
