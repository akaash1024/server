const os = require('os');


console.log(`Platform`, os.platform());
console.log(`User`, os.userInfo());
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.uptime());
console.log(os.homedir());
console.log(`Host Name`, os.hostname());
console.log(os.networkInterfaces());
console.log(os.cpus());
console.log(os.tmpdir());
console.log(os.type());


