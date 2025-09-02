/**
 * POC #5: Escape-HTML for Basic HTML Escaping
 * 
 * Escape-HTML is a lightweight library that provides basic HTML escaping
 * functionality. It's perfect for simple use cases where you need to safely
 * display user input as text without allowing any HTML.
 */

const escapeHtml = require('escape-html');

console.log('=== POC #5: Escape-HTML for Basic HTML Escaping ===\n');

// Test cases with various types of content that need escaping
const testInputs = [
    // Basic HTML tags
    '<script>alert("XSS Attack")</script>',
    '<div>Normal content</div>',
    '<img src="x" onerror="alert(\'XSS\')">',
    
    // HTML with attributes
    '<a href="https://example.com" onclick="malicious()">Link</a>',
    '<input type="text" value="user input">',
    '<button onclick="alert(\'clicked\')">Click me</button>',
    
    // Special characters that need escaping
    'Text with "double quotes" and \'single quotes\'',
    'Ampersand & symbols need escaping',
    'Less than < and greater than > symbols',
    'Copyright © and trademark ™ symbols',
    
    // Mixed content
    'User said: <script>alert("hack")</script> "This is quoted text"',
    'Math: 5 < 10 && 10 > 5 & result = true',
    'HTML entities: &amp; &lt; &gt; &quot; &#39;',
    
    // Common user input scenarios
    'Username: <admin>',
    'Search query: "cats & dogs"',
    'Comment: I think <strong>this</strong> is great!',
    'Email: user@domain.com <script>alert()</script>',
    
    // Unicode and special characters
    'Unicode: café, naïve, résumé, 你好',
    'Emoji: 😀 😎 🚀 💻',
    'Symbols: →→→ ←←← ↑↑↑ ↓↓↓',
    
    // Empty and whitespace
    '',
    '   ',
    '\n\t\r',
    
    // Large text
    'A'.repeat(1000) + '<script>alert("long text XSS")</script>',
    
    // SQL injection attempts (though escape-html is for HTML, not SQL)
    'Username: admin\'; DROP TABLE users; --',
    'Search: \' OR 1=1 --'
];

console.log('=== Basic HTML Escaping Tests ===\n');

testInputs.forEach((input, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Input:  "${input}"`);
    console.log(`Output: "${escapeHtml(input)}"`);
    
    // Show the difference more clearly for HTML content
    if (input.includes('<') || input.includes('>') || input.includes('&') || input.includes('"')) {
        console.log(`Safe:   ${input === escapeHtml(input) ? 'No change needed' : 'HTML escaped'}`);
    }
    console.log('---');
});

// Demonstrate common use cases
console.log('\n=== Common Use Case Examples ===\n');

// 1. User profile display
console.log('1. User Profile Display:');
const userProfile = {
    name: 'John <script>alert("XSS")</script> Doe',
    bio: 'I love coding & teaching. Check out my site: <a href="malicious.com">click here</a>',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com'
};

console.log('Original user data:');
console.log(JSON.stringify(userProfile, null, 2));

console.log('\nSafely escaped for HTML display:');
Object.keys(userProfile).forEach(key => {
    console.log(`${key}: "${escapeHtml(userProfile[key])}"`);
});
console.log('---\n');

// 2. Comment system
console.log('2. Comment System:');
const comments = [
    'This is a great article!',
    'I disagree with the <strong>main point</strong>.',
    '<script>stealCookies()</script>Nice post!',
    'What about "edge cases" & special scenarios?',
    'Check this out: <a href="javascript:alert()">link</a>'
];

console.log('Original comments:');
comments.forEach((comment, i) => console.log(`  ${i + 1}. ${comment}`));

console.log('\nSafely escaped comments:');
comments.forEach((comment, i) => {
    console.log(`  ${i + 1}. ${escapeHtml(comment)}`);
});
console.log('---\n');

// 3. Search results display
console.log('3. Search Results Display:');
const searchQueries = [
    'javascript tutorials',
    '<script>alert("search XSS")</script>',
    'cats & dogs',
    '"machine learning" basics',
    'node.js > python',
    'SQL: SELECT * FROM users WHERE name = "admin"'
];

console.log('Search queries and safe display:');
searchQueries.forEach((query, i) => {
    console.log(`Query ${i + 1}: ${query}`);
    console.log(`Safe:    ${escapeHtml(query)}`);
    console.log(`HTML:    <p>You searched for: "${escapeHtml(query)}"</p>`);
    console.log('---');
});

// 4. Form error messages
console.log('\n4. Form Error Messages:');
const formErrors = [
    'Please enter a valid email address',
    'Password must contain at least one "special" character',
    'Username cannot contain < or > characters',
    'Error: <script>alert("form XSS")</script> Invalid input',
    'Field "user_name" is required & cannot be empty'
];

console.log('Form errors safely displayed:');
formErrors.forEach((error, i) => {
    const safeError = escapeHtml(error);
    console.log(`Error ${i + 1}: <div class="error">${safeError}</div>`);
});
console.log('---\n');

// 5. Data attributes
console.log('5. HTML Data Attributes:');
const dataValues = [
    'simple-value',
    'value with spaces',
    'value"with"quotes',
    'value<with>html',
    'value&with&ampersands',
    '<script>alert("data attr XSS")</script>'
];

console.log('Safe data attribute values:');
dataValues.forEach((value, i) => {
    const safeValue = escapeHtml(value);
    console.log(`<div data-value="${safeValue}">Content ${i + 1}</div>`);
});
console.log('---\n');

// Performance demonstration
console.log('=== Performance Test ===\n');

const performanceTests = [
    { name: 'Short text', input: 'Hello <world>' },
    { name: 'Medium text', input: 'A'.repeat(100) + '<script>alert()</script>' + 'B'.repeat(100) },
    { name: 'Long text', input: 'C'.repeat(10000) + '<script>alert()</script>' + 'D'.repeat(10000) },
    { name: 'Many escapes', input: '<>&"\''.repeat(1000) }
];

performanceTests.forEach(test => {
    console.time(`Escape ${test.name}`);
    const result = escapeHtml(test.input);
    console.timeEnd(`Escape ${test.name}`);
    console.log(`  Input length: ${test.input.length}`);
    console.log(`  Output length: ${result.length}`);
    console.log(`  Contains HTML: ${test.input !== result}`);
    console.log('---');
});

// Comparison with manual escaping
console.log('\n=== Comparison with Manual Escaping ===\n');

function manualEscape(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const comparisonTests = [
    '<script>alert()</script>',
    'Text with "quotes" & symbols',
    'Already escaped: &lt;div&gt;',
    'Mixed: <p>Text & "quotes"</p>'
];

console.log('Library vs Manual Escaping:');
comparisonTests.forEach((test, i) => {
    const libraryResult = escapeHtml(test);
    const manualResult = manualEscape(test);
    
    console.log(`Test ${i + 1}: ${test}`);
    console.log(`Library: ${libraryResult}`);
    console.log(`Manual:  ${manualResult}`);
    console.log(`Match:   ${libraryResult === manualResult}`);
    console.log('---');
});

// Integration example with template strings
console.log('\n=== Template Integration Example ===\n');

function createUserCard(user) {
    const safeName = escapeHtml(user.name);
    const safeEmail = escapeHtml(user.email);
    const safeBio = escapeHtml(user.bio);
    
    return `
        <div class="user-card">
            <h3>${safeName}</h3>
            <p class="email">${safeEmail}</p>
            <p class="bio">${safeBio}</p>
            <div data-user-id="${escapeHtml(user.id)}">
                Actions
            </div>
        </div>
    `.trim();
}

const dangerousUser = {
    id: '123<script>alert()</script>',
    name: 'Hacker <img src="x" onerror="alert()">',
    email: 'hacker@evil.com<script>steal()</script>',
    bio: 'I am a "security researcher" & I test XSS vulnerabilities.'
};

console.log('Dangerous user data:');
console.log(JSON.stringify(dangerousUser, null, 2));

console.log('\nSafe HTML template output:');
console.log(createUserCard(dangerousUser));

console.log('\n=== Summary ===');
console.log('✅ Escape-HTML provides simple, reliable HTML escaping');
console.log('✅ Perfect for displaying user input as plain text');
console.log('✅ Lightweight with minimal dependencies');
console.log('✅ Excellent performance even with large amounts of text');
console.log('✅ Essential building block for preventing XSS in templates');
console.log('✅ Use when you want to show user input exactly as typed (no HTML)');
console.log('⚠️  Does not allow any HTML - use other libraries for rich content\n');