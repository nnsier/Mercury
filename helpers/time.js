export const convertTimestamp = (runningTime) => {
    const time = {}
    const rawHours = Math.floor(
        (runningTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
    const rawMinutes = Math.floor((runningTime % (1000 * 60 * 60)) / (1000 * 60));
    const rawSeconds = Math.floor((runningTime % (1000 * 60)) / 1000);
    const rawMilliseconds = runningTime % 1000;
    time.hours = (rawHours < 10) ? `0${rawHours}` : rawHours;
    time.minutes = (rawMinutes < 10) ? `0${rawMinutes}` : rawMinutes;
    time.seconds = (rawSeconds < 10) ? `0${rawSeconds}`: rawSeconds;
    time.milliseconds = (rawMilliseconds < 10) ? `00${rawMilliseconds}` : ((rawMilliseconds < 100) ? `0${rawMilliseconds}` : rawMilliseconds);
    return time;
}

export const timeToString = (runningTime) => {
    const {milliseconds,seconds,minutes,hours} = convertTimestamp(runningTime);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`
}

export const timestampTrimmed = (runningTime) => {
    const milliseconds = runningTime % 1000;
    console.log(`${milliseconds}ms`);
    const hours = milliseconds/(1000*60*60);
    return hours;
}