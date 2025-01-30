const EventEmitter = require('events');
const event = new EventEmitter();

event.on('greet', (arg)=>{
    console.log(`Hello ${arg.username}, you are a ${arg.prof}`);
})

event.on('greet', ()=>{
    console.log(`hello Akash`);
})

console.log(`Akash`);

event.emit('greet', {username:"Akash", prof: "Full Stack Engineer"})



