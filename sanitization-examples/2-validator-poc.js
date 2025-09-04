/**
 * Proof of Concept 2: Validator.js for Input Validation and Sanitization
 * 
 * Validator.js is a library of string validators and sanitizers.
 * It provides functions to validate and sanitize different types of user input.
 */

const validator = require('validator');

function demonstrateValidator() {
    console.log('=== Validator.js Proof of Concept ===\n');

    // Example 1: Email validation and sanitization
    const emailInputs = [
        'user@example.com',
        'INVALID.EMAIL',
        'test+tag@domain.co.uk',
        'user@domain..com',
        '  spaced@email.com  '
    ];

    console.log('Example 1 - Email Validation and Sanitization:');
    emailInputs.forEach(email => {
        const isValid = validator.isEmail(email);
        const normalized = validator.normalizeEmail(email) || 'Invalid email';
        const escaped = validator.escape(email);
        
        console.log(`Input: "${email}"`);
        console.log(`  Valid: ${isValid}`);
        console.log(`  Normalized: ${normalized}`);
        console.log(`  Escaped: ${escaped}`);
        console.log('');
    });

    // Example 2: HTML escaping and unescaping
    const htmlInputs = [
        '<script>alert("xss")</script>',
        'Hello & welcome to "our" site!',
        '<img src="x" onerror="alert(1)">',
        'Price: $5 < $10 & > $1'
    ];

    console.log('Example 2 - HTML Escaping:');
    htmlInputs.forEach(html => {
        const escaped = validator.escape(html);
        const unescaped = validator.unescape(escaped);
        
        console.log(`Input: ${html}`);
        console.log(`  Escaped: ${escaped}`);
        console.log(`  Unescaped: ${unescaped}`);
        console.log('');
    });

    // Example 3: URL validation and sanitization
    const urlInputs = [
        'https://example.com',
        'http://malicious.com/path?param=<script>',
        'ftp://files.example.com',
        'javascript:alert("xss")',
        'https://user:pass@secure.com/path'
    ];

    console.log('Example 3 - URL Validation:');
    urlInputs.forEach(url => {
        const isURL = validator.isURL(url);
        const isSecureURL = validator.isURL(url, { protocols: ['https'] });
        const escaped = validator.escape(url);
        
        console.log(`Input: ${url}`);
        console.log(`  Valid URL: ${isURL}`);
        console.log(`  Secure HTTPS: ${isSecureURL}`);
        console.log(`  Escaped: ${escaped}`);
        console.log('');
    });

    // Example 4: Whitelist sanitization
    const mixedInputs = [
        'Hello123World!@#',
        'user_name-123',
        '<script>alert(1)</script>normal_text',
        'email@domain.com'
    ];

    console.log('Example 4 - Whitelist Sanitization (alphanumeric + underscore only):');
    mixedInputs.forEach(input => {
        const whitelisted = validator.whitelist(input, 'a-zA-Z0-9_');
        const blacklisted = validator.blacklist(input, '<>"\'/');
        
        console.log(`Input: ${input}`);
        console.log(`  Whitelisted (a-zA-Z0-9_): ${whitelisted}`);
        console.log(`  Blacklisted (<>"'/): ${blacklisted}`);
        console.log('');
    });

    // Example 5: Comprehensive input sanitization function
    function sanitizeUserInput(input, type = 'general') {
        if (!input || typeof input !== 'string') {
            return '';
        }

        // Trim whitespace
        let sanitized = validator.trim(input);

        switch (type) {
            case 'email':
                if (validator.isEmail(sanitized)) {
                    return validator.normalizeEmail(sanitized);
                }
                return null; // Invalid email
                
            case 'url':
                if (validator.isURL(sanitized)) {
                    return validator.escape(sanitized);
                }
                return null; // Invalid URL
                
            case 'alphanumeric':
                return validator.whitelist(sanitized, 'a-zA-Z0-9 ');
                
            case 'html':
                return validator.escape(sanitized);
                
            default:
                // General sanitization: escape HTML and remove most special chars
                return validator.escape(validator.blacklist(sanitized, '<>"\'/;()'));
        }
    }

    console.log('Example 5 - Comprehensive Sanitization Function:');
    const testInputs = [
        { value: '  user@example.com  ', type: 'email' },
        { value: 'https://example.com/path?q=<test>', type: 'url' },
        { value: 'User Name 123!@#', type: 'alphanumeric' },
        { value: '<script>alert("xss")</script>', type: 'html' },
        { value: 'General input with "quotes" & symbols!', type: 'general' }
    ];

    testInputs.forEach(({ value, type }) => {
        const result = sanitizeUserInput(value, type);
        console.log(`Input: "${value}" (type: ${type})`);
        console.log(`  Sanitized: ${result}`);
        console.log('');
    });
}

// Export for use in main demo
module.exports = { demonstrateValidator };

// Run if called directly
if (require.main === module) {
    demonstrateValidator();
}