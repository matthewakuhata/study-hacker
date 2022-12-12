export const convertToDisplayTime = (
  seconds: number,
  type: string = "colon"
) => {
  if (seconds <= 0) {
    return "00:00";
  }

  const totalMinutes = Math.floor(seconds / 60);

  const hr = Math.floor(totalMinutes / 60);
  const min = totalMinutes % 60;
  const sec = Math.floor(seconds % 60);

  const parts: { [key: string]: number } = { hr, min, sec };

  const hrsDisplay = hr >= 10 ? hr.toString(10) : `0${hr}`;
  const minsDisplay = min >= 10 ? min.toString(10) : `0${min}`;
  const secsDisplay = sec >= 10 ? sec.toString(10) : `0${sec}`;

  switch (type) {
    case "colon":
      return hr
        ? `${hrsDisplay}:${minsDisplay}:${secsDisplay}`
        : `${minsDisplay}:${secsDisplay}`;
    case "hms":
      let hms = hr ? hr + "h" : "";
      hms += min ? ` ${min}m` : "";
      hms += sec ? ` ${sec}s` : "";

      return hms;
    default:
      return `${hrsDisplay}:${minsDisplay}:${secsDisplay}`;
  }
  return;
};
