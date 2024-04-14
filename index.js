const process = require('node:process');
const fs = require('node:fs');

process.on('uncaughtException', (err, origin) => {
    console.log("Inside custom handler for `uncaughtException`.");

    fs.writeSync(
        process.stderr.fd,
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}\n`,
    );

    process.exitCode = 30;
});

setTimeout(() => {
    console.log('This will still run.');
}, 500);

// Intentionally cause an exception, but don't catch it.
nonexistentFunc();
console.log('This will not run.');