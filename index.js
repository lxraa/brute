const Base = require("./components/base");

let base = new Base(__dirname + "/dict/taiguo_ip.txt",22);
base.getAvailableIpArray();