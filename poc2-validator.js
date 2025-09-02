/**
 * POC #2: Validator.js for General Input Validation and Sanitization
 * 
 * Validator.js is a library of string validators and sanitizers. It provides
 * comprehensive validation and basic sanitization functions for common data types.
 */

const validator = require('validator');

console.log('=== POC #2: Validator.js Input Validation & Sanitization ===\n');

// Test various types of user inputs
const testData = {
    emails: [
        'user@example.com',
        'invalid-email',
        '<script>alert("xss")</script>user@test.com',
        'user+tag@domain.co.uk',
        ''
    ],
    
    urls: [
        'https://www.example.com',
        'http://test.com/path?param=value',
        'javascript:alert("xss")',
        'ftp://files.example.com',
        'not-a-url',
        'https://malicious.com<script>alert()</script>'
    ],
    
    usernames: [
        'john_doe123',
        'admin',
        '<script>alert("xss")</script>',
        'user with spaces',
        'user@domain.com',
        'very_long_username_that_exceeds_reasonable_length_limits_and_should_be_rejected'
    ],
    
    phoneNumbers: [
        '+1-555-123-4567',
        '555.123.4567',
        '(555) 123-4567',
        'not-a-phone',
        '+44 20 7946 0958',
        '<script>alert("phone")</script>'
    ],
    
    creditCards: [
        '4532015112830366',  // Valid Visa test number
        '5555555555554444',  // Valid MasterCard test number
        '1234567890123456',  // Invalid
        '4532-0151-1283-0366',  // Valid with dashes
        '<script>alert("cc")</script>',
        ''
    ],
    
    userInput: [
        'Normal text input',
        '<script>alert("XSS")</script>',
        'Text with "quotes" and \'apostrophes\'',
        'SQL injection attempt: \'; DROP TABLE users; --',
        'Unicode: café, naïve, résumé',
        '   whitespace   around   text   '
    ]
};

// Email validation and sanitization
console.log('=== EMAIL VALIDATION & SANITIZATION ===\n');
testData.emails.forEach((email, index) => {
    console.log(`Test ${index + 1}: ${email}`);
    console.log(`  Valid: ${validator.isEmail(email)}`);
    if (email) {
        console.log(`  Normalized: ${validator.normalizeEmail(email) || 'Could not normalize'}`);
        console.log(`  Escaped: ${validator.escape(email)}`);
    }
    console.log('---');
});

// URL validation and sanitization
console.log('\n=== URL VALIDATION & SANITIZATION ===\n');
testData.urls.forEach((url, index) => {
    console.log(`Test ${index + 1}: ${url}`);
    console.log(`  Valid URL: ${validator.isURL(url)}`);
    console.log(`  Valid HTTP/HTTPS: ${validator.isURL(url, { protocols: ['http', 'https'] })}`);
    if (url) {
        console.log(`  Escaped: ${validator.escape(url)}`);
    }
    console.log('---');
});

// Username validation (custom implementation using validator functions)
console.log('\n=== USERNAME VALIDATION ===\n');
testData.usernames.forEach((username, index) => {
    console.log(`Test ${index + 1}: ${username}`);
    
    // Custom username validation rules
    const isValidLength = validator.isLength(username, { min: 3, max: 20 });
    const isAlphanumeric = validator.isAlphanumeric(username, 'en-US', { ignore: '_' });
    const containsNoHTML = !validator.contains(username, '<') && !validator.contains(username, '>');
    const trimmed = validator.trim(username);
    
    console.log(`  Valid length (3-20): ${isValidLength}`);
    console.log(`  Alphanumeric + underscore: ${isAlphanumeric}`);
    console.log(`  No HTML tags: ${containsNoHTML}`);
    console.log(`  Trimmed: "${trimmed}"`);
    console.log(`  Escaped: ${validator.escape(username)}`);
    console.log(`  Valid username: ${isValidLength && isAlphanumeric && containsNoHTML}`);
    console.log('---');
});

// Phone number validation
console.log('\n=== PHONE NUMBER VALIDATION ===\n');
testData.phoneNumbers.forEach((phone, index) => {
    console.log(`Test ${index + 1}: ${phone}`);
    console.log(`  Valid mobile (any locale): ${validator.isMobilePhone(phone)}`);
    console.log(`  Valid mobile (US): ${validator.isMobilePhone(phone, 'en-US')}`);
    console.log(`  Valid mobile (UK): ${validator.isMobilePhone(phone, 'en-GB')}`);
    if (phone) {
        console.log(`  Escaped: ${validator.escape(phone)}`);
    }
    console.log('---');
});

// Credit card validation
console.log('\n=== CREDIT CARD VALIDATION ===\n');
testData.creditCards.forEach((cc, index) => {
    console.log(`Test ${index + 1}: ${cc}`);
    if (cc) {
        console.log(`  Valid credit card: ${validator.isCreditCard(cc)}`);
        console.log(`  Escaped: ${validator.escape(cc)}`);
        // In production, you'd never log actual credit card numbers!
    }
    console.log('---');
});

// General text sanitization
console.log('\n=== GENERAL TEXT SANITIZATION ===\n');
testData.userInput.forEach((input, index) => {
    console.log(`Test ${index + 1}: ${input}`);
    console.log(`  Original: "${input}"`);
    console.log(`  Escaped HTML: "${validator.escape(input)}"`);
    console.log(`  Trimmed: "${validator.trim(input)}"`);
    console.log(`  Trimmed & Escaped: "${validator.escape(validator.trim(input))}"`);
    
    // Custom sanitization pipeline
    let sanitized = input;
    sanitized = validator.trim(sanitized);  // Remove whitespace
    sanitized = validator.escape(sanitized);  // Escape HTML
    sanitized = validator.stripLow(sanitized);  // Remove control characters
    
    console.log(`  Full sanitization: "${sanitized}"`);
    console.log('---');
});

// Demonstrate specific sanitization functions
console.log('\n=== SPECIFIC SANITIZATION FUNCTIONS ===\n');

const testText = '  <script>alert("XSS")</script>Hello World!   ';
console.log(`Original: "${testText}"`);
console.log(`escape(): "${validator.escape(testText)}"`);
console.log(`trim(): "${validator.trim(testText)}"`);
console.log(`stripLow(): "${validator.stripLow(testText)}"`);
console.log(`blacklist('<>'): "${validator.blacklist(testText, '<>')}"`);
console.log(`whitelist(letters/numbers/spaces): "${validator.whitelist(testText, 'A-Za-z0-9 ')}"`);

// Number sanitization
const numericInputs = ['123.45', '1,234.56', '$99.99', 'abc123def', '  42  '];
console.log('\n--- Numeric Sanitization ---');
numericInputs.forEach(input => {
    console.log(`"${input}" -> toFloat: ${validator.toFloat(input)} | toInt: ${validator.toInt(input)}`);
});

console.log('\n=== Summary ===');
console.log('✅ Validator.js provides comprehensive validation for common data types');
console.log('✅ Includes basic sanitization functions (escape, trim, stripLow)');
console.log('✅ Highly composable - combine multiple functions for custom validation');
console.log('✅ Excellent for form validation and user input processing');
console.log('✅ Lightweight and well-maintained with extensive test coverage\n');