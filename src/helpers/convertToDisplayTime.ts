export const convertToDisplayTime = (
  seconds: number,
  type: string = "colon"
) => {
  if (seconds <= 0) {
    return "00:00";
  }
  const hr = Math.floor(seconds / 3600);
  const min = Math.floor((seconds / 3600 - hr) * 60);
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
      return Object.keys(parts)
        .map((key) =>
          parts[key] > 0
            ? parts[key].toString() + (parts[key] > 1 ? key + "s" : key)
            : ""
        )
        .join(" ");
    default:
      return `${hrsDisplay}:${minsDisplay}:${secsDisplay}`;
  }
  return;
};
