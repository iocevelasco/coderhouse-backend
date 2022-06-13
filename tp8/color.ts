const colorGenerator = () => {
  return Math.floor(Math.random*256)
}

class GenerarColores {
  randomColor ()  {
    const red = colorGenerator()
    const blue = colorGenerator()
    const green = colorGenerator()
    return `rgb(${red}, ${blue}, ${green})`
  }
}


const pepe = new GenerarColores.randomColor()

