var daemon = require("daemonize2").setup({
    main: "server.js",
    name: "traffic-recorder",
    pidfile: "traffic-recorder.pid",
    args: process.argv.slice(3)
});

switch (process.argv[2]) {

    case "start":
        daemon.start();
        break;

    case "stop":
        daemon.stop();
        break;

    default:
        console.log("Usage: [start|stop]");
}