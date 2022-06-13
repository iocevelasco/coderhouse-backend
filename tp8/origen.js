const random_rgba = () =>  {
  const o = Math.round
  const r = Math.random
  const s = 255;
  return `rgba(${o(r()*s)},${o(r()*s)},${o(r()*s)},'${r().toFixed(1)})`;
}

const colorGenerator = () => {
  return Math.round(Math.random*256)
}

class GenerarColores

const color = random_rgba()

console.log('color', color)
console.log('color', color)