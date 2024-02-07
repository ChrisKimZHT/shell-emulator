/* Ciallo～(∠・ω< )⌒★ */
const cialloType = ["Ciallo～(∠・ω< )⌒☆", "Ciallo～(∠・ω< )⌒★"]
const colorType = ["aqua", "coral", "red", "greenyellow", "pink", "green", "blue", "yellow", "orange", "gray"]
const scrollamountRange = [8, 32]
const sizeRange = [5, 20]

function randomOne() {
  const ciallo = cialloType[Math.floor(Math.random() * cialloType.length)]
  const color = colorType[Math.floor(Math.random() * colorType.length)]
  const scrollamount = Math.floor(Math.random() * (scrollamountRange[1] - scrollamountRange[0])) + scrollamountRange[0]
  const size = Math.floor(Math.random() * (sizeRange[1] - sizeRange[0])) + sizeRange[0]
  return `<marquee behavior="scroll" direction="right" scrollamount="${scrollamount}" style="line-height: normal;"><font color="${color}" size="${size}px">${ciallo}</font></marquee>`
}

export default function ciallo(cwd, args) {
  if (args.length > 0) {
    return "ciallo: too many arguments";
  }
  const result = ["idea from <a href=\"https://ciallo.cc/\" target=\"_blank\">ciallo.cc</a>."];
  for (let i = 0; i < 10; i++) {
    result.push(randomOne());
  }
  return result.join("");
}
/* Ciallo～(∠・ω< )⌒★ */ 