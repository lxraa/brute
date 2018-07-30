const fs = require("fs");
const child_process = require("child_process");
const spawn = child_process.spawn;
const Log = require("log")
const sleep = require("sleep-promise");
class Base{
	/*
		*	ip_range_file：ip范围列表
		*	port		：要扫的端口
	*/

	constructor(ip_range_file,port){
		this.ip_range_file = ip_range_file;
		this.port = port.toString();
		this.command = "zmap -p ${port} ${ip_range} -o ${out_file}".replace("${port}",this.port);

		this.log = new Log();
	}

	getIpRangeArray(){
		let origin_buffer = fs.readFileSync(this.ip_range_file);
		let results = origin_buffer.toString().replace(/\\r\\n/g,"\n").split("\n");
		for(let i = 0;i < results.length;i++){
			// 去掉空行
			if(!results[i]){
				results.splice(i,1);
			}
		}

		return results;
	}

	async getAvailableIpArray(){
		let ip_range_array = this.getIpRangeArray();
		let all_req = ip_range_array.length;
		let out_file_path = "../runtime"
		for(let i = 0;i < ip_range_array.length;i++){
			let out_file = `/out_file_${i}.txt`;
			let command = this.command.replace("${ip_range}",ip_range_array[i]).replace("${out_file}",out_file_path + out_file);
			this.log.info(`exec ${command}`);
			child_process.exec(command,(err,stdout,stderr)=>{
				all_req = all_req - 1;
				if(err){
					this.log.error(`执行命令 ${command} 时发生错误`);
					console.log(err);
					return false;
				}
				else{
					this.log.info(`${command} 完成`);
				}
			});
		}

		while(true){
			if(all_req <=0){
				break;
			}
			await sleep(100);
		}
		return true;

	}

}

module.exports = Base;