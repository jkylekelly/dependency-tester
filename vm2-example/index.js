const { VM } = require('vm2');

console.log('vm2 Example - Running untrusted code in a sandbox');
console.log('='.repeat(50));

// Create a new VM instance
const vm = new VM({
    timeout: 1000,
    sandbox: {
        console: {
            log: (...args) => console.log('[Sandbox]:', ...args)
        }
    }
});

// Example 1: Basic code execution
console.log('\n1. Basic arithmetic:');
try {
    const result = vm.run('2 + 3');
    console.log('Result:', result);
} catch (err) {
    console.error('Error:', err.message);
}

// Example 2: Using sandbox console
console.log('\n2. Using sandbox console:');
try {
    vm.run('console.log("Hello from inside the sandbox!")');
} catch (err) {
    console.error('Error:', err.message);
}

// Example 3: Creating and using variables
console.log('\n3. Variable operations:');
try {
    const result = vm.run(`
        let x = 10;
        let y = 20;
        let sum = x + y;
        console.log('Sum calculated inside sandbox:', sum);
        sum;
    `);
    console.log('Returned value:', result);
} catch (err) {
    console.error('Error:', err.message);
}

// Example 4: Function execution
console.log('\n4. Function execution:');
try {
    const result = vm.run(`
        function factorial(n) {
            if (n <= 1) return 1;
            return n * factorial(n - 1);
        }
        
        let result = factorial(5);
        console.log('Factorial of 5:', result);
        result;
    `);
    console.log('Factorial result:', result);
} catch (err) {
    console.error('Error:', err.message);
}

// Example 5: Demonstrating security - this should be blocked
console.log('\n5. Security demonstration (should be blocked):');
try {
    vm.run('require("fs")');
    console.log('ERROR: This should not have worked!');
} catch (err) {
    console.log('✓ Successfully blocked attempt to access fs module');
}

console.log('\n' + '='.repeat(50));
console.log('vm2 example completed successfully!');