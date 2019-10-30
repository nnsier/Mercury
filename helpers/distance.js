export const calculateDistance = (coords1, coords2) => {
  const lat1 = coords1.latitude;
  const lat2 = coords2.latitude;
  const lon1 = coords1.longitude;
  const lon2 = coords2.longitude;
  console.log(`this is lat1 ${lat1}`)
  console.log(`this is lat2 ${lat2}`)
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000* 0.000621371; // meters to miles
};

