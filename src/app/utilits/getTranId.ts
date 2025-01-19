export function generateTranId() {
  const timestamp = Date.now(); // Get current timestamp
  const randomPart = Math.floor(Math.random() * 1000000); // Generate a random 6-digit number
  return `DRTX_${timestamp}_${randomPart}`;
}
