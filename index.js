const SSH = require("./components/ssh");
let taiguo_ip_file = `${__dirname}/dict/taiguo_ip.txt`;
// let out_file = __dirname + "/user-pass.txt";
let ssh = new SSH(taiguo_ip_file);
ssh.bruteIp();