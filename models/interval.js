class Interval {
  constructor(id, latitude, longitude, timestamp, jogs_referenceId) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timestamp = timestamp;
    this.jogs_referenceId = jogs_referenceId;
  }
}

export default Interval;