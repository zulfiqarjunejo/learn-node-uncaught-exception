# learn-node-uncaught-exception

This repository is part of my `learn advanced node` series and focuses on `uncaughtException`.

## learnings

When an exception is not caught by our application's code, it bubbles all the way up to `Event Handler`. Node.JS, by default, prints the stack trace to `stderr`and exits the process with exitCode 1.

We can register a custom handler for the uncaught exception in the following way:

```javascript
process.on('uncaughtException', (err, origin) => {
    console.log("Inside custom handler for `uncaughtException`.");

    fs.writeSync(
        process.stderr.fd,
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}\n`,
    );

    process.exitCode = 30;
});
```

P.S: In the custom handler, we have to define the exitCode. If it is not defined, the process will exit with code 0.

Recommended way to handle `uncaughtException` is to synchronously clean up the resources, connections etc and then restart the process.

We can register a monitor by attaching the following listener:

```javascript
process.on('uncaughtExceptionMonitor', (err, origin) => {
    // custom logic... logging or sending an email to admins etc.
});
```

Registering an `uncaughtExceptionMonitor` listener does modify the default behavior of `uncaughtException` if no handler is set.