# Demo
The web app is deployed to below URL with connection to [OAK Testnet](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.testnet.oak.tech#/explorer)

https://polkagrant.com

# Installation

```
yarn
```

Run debug build with NextJs in `localhost:3000`

```
yarn next-dev
```

# Folder Structure

```
/packages
    /landing
	/src		// Source code of pages and components
	    /containers
	    /pages
	    /common
	        /assets // Static resources e.g. images and fonts
```

# Stack We Have Used

1. Yarn Workspace
1. React Js and Next Js
1. Styled System and Styled Components
1. Polkadot.js client library
1. Tecent Cloud Serverless

# Deployment

### Build

To build a release version run below commands.

```
yarn next-build

// To check the build version locally run below command
// Not necessary if you don't want to check on your local.

yarn next-start
```

If you want to host the static html version of your nextjs project then run the below command to build static version

```
yarn next-export
```
