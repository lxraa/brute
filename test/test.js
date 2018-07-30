// const fs = require("fs");
// let table = fs.readFileSync("../dict/taiguo_origin.txt");
// let rows = table.toString().split("\r\n");
// for(let row of rows){
// 	let els = row.split("\t");
// 	if(els[2]){
// 		fs.writeFileSync("../dict/taiguo_ip.txt",els[2] + "\n",{flag:"a"});
// 	}
// }

const Base = require("../components/base");

let base = new Base(__dirname + "/../dict/taiguo_ip.txt",22);
base.getAvailableIpArray();
