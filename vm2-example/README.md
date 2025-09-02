# VM2 Example

This directory contains a simple example demonstrating the usage of the vm2 npm library.

## ⚠️ Security Warning

**IMPORTANT**: vm2 has known critical security vulnerabilities and has been deprecated. The library should not be used in production environments. This example is for demonstration purposes only.

From the npm warning:
> The library contains critical security issues and should not be used for production! The maintenance of the project has been discontinued. Consider migrating your code to isolated-vm.

## What is vm2?

vm2 is a sandbox that can run untrusted code with whitelisted Node's built-in modules. It allows you to execute JavaScript code in an isolated environment, preventing access to the host system.

## Installation

```bash
cd vm2-example
npm install
```

## Usage

Run the example:

```bash
node index.js
```

## Example Features

The example demonstrates:

1. **Basic arithmetic** - Simple mathematical operations
2. **Sandbox console** - Using console.log within the sandbox
3. **Variable operations** - Creating and manipulating variables
4. **Function execution** - Defining and calling functions
5. **Security demonstration** - Showing how access to Node.js modules is blocked

## Files

- `index.js` - Main example file with various vm2 usage patterns
- `package.json` - Node.js project configuration
- `README.md` - This documentation file

## Alternative Recommendations

For production use, consider:
- [isolated-vm](https://www.npmjs.com/package/isolated-vm) - A more secure alternative
- [vm](https://nodejs.org/api/vm.html) - Node.js built-in vm module (with proper security considerations)