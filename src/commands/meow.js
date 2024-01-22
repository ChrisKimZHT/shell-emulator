import axios from "axios";

let imgPrefix = "";
let imgList = [];

axios.get("https://assets.zouht.com/img/diona/list.json").then((res) => {
  imgPrefix = res.data.prefix;
  imgList = res.data.list;
}).catch(() => {
  console.log("Failed to fetch diona image list.")
  console.log("Command meow will not work.")
});

export default function meow(cwd, args) {
  cwd, args;
  let imgFile = imgList[Math.floor(Math.random() * imgList.length)];
  let imgURL = imgPrefix + imgFile;
  return `<a href="${imgURL}" target="_blank">${imgFile}</a>`;
}

