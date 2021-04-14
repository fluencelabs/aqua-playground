# Aqua playground

Repository demonstrating the how to start writing aqua and integrate it into a typescript application

## Getting started

**Warning: java is required to be installed in order to use aqua compiler** 

Install dependencies

```
npm install
```

To compile the aqua files execute

```
npm run compile-aqua
```

To start the program execute

```
npm run cli
```

If everything works correctly the following should be printed into the console:

```

Relay external addresses:  [ '/ip4/165.227.164.206/tcp/7001', '/ip4/165.227.164.206/tcp/9001/ws' ]
```

Now try to uncomment the following lines in `helloWorld.aqua` and run the compiler once again

```
-- func getPeerExternalTimestamp(otherNodePeerId: string) -> u64:
--     on otherNodePeerId:
--         res <- Peer.timestamp_sec()
--     <- res

```

Now, the new function should appear in generated `helloWorld.ts` Uncomment everything in `index.ts` and run the program again.

The following should be printed to the console:

```
Relay external addresses:  [ '/ip4/165.227.164.206/tcp/7001', '/ip4/165.227.164.206/tcp/9001/ws' ]
Relay timestamp:  1618429933
```



## Project structure

Aqua source files are located in `src/aqua`directory.

Aqua files are compiled into .ts located in `/src/compiled` directory

## References

\- Documentation for the compiler can be found in the official repo: https://github.com/fluencelabs/aqua