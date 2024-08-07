// determine if a color is light or dark
export function isLightColor(color) {
  // For named colors, convert to hex first
  const hexColor = nameToHex(color);

  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is light
  return brightness > 128;
}

// Helper function to convert color names to hex
const nameToHex = (name) => {
  // Create a temporary element to use the browser's color parsing
  const temp = document.createElement("div");
  temp.style.color = name;
  document.body.appendChild(temp);
  const computedColor = getComputedStyle(temp).color;
  document.body.removeChild(temp);

  // Extract RGB values
  const match = computedColor.match(/\d+/g);
  if (match) {
    const [r, g, b] = match.map(Number);
    // Convert RGB to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  return name; // Return original value if conversion fails
};
