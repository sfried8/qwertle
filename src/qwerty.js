const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
const locations = {};
let maxDistance = 0;
const init = () => {
  letters.forEach((l) => {
    const keyEl = document.getElementById("key-" + l);
    const keyBB = keyEl.getBoundingClientRect();
    locations[l] = [keyBB.left + keyBB.width / 2, keyBB.top + keyBB.height / 2];
  });
  maxDistance = getDistance("Q", "P");
};

const getDistance = (letterA, letterB) => {
  const aLocation = locations[letterA.toUpperCase()];
  const bLocation = locations[letterB.toUpperCase()];

  return Math.sqrt(
    Math.pow(aLocation[0] - bLocation[0], 2) +
      Math.pow(aLocation[1] - bLocation[1], 2)
  );
};
/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
 */
function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
    default:
      (r = v), (g = t), (b = p);
      break;
  }
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )})`;
}
const getColorFromDistance = (distance) => {
  if (distance === 0) {
    return "forestgreen";
  }
  return HSVtoRGB(0.01, 1, (distance / maxDistance) * 2);
};
export { getDistance, getColorFromDistance, init };
