/**
 * POC #1: DOMPurify for HTML Sanitization
 * 
 * DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, 
 * MathML and SVG. It's written in JavaScript and works in all modern browsers.
 */

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Create a JSDOM window for server-side usage
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

console.log('=== POC #1: DOMPurify HTML Sanitization ===\n');

// Test cases with potentially malicious HTML input
const testInputs = [
    // Basic XSS attempt
    '<script>alert("XSS Attack!")</script><p>Safe content</p>',
    
    // Event handler injection
    '<img src="x" onerror="alert(\'XSS via onerror\')" />',
    
    // JavaScript protocol
    '<a href="javascript:alert(\'XSS via href\')">Click me</a>',
    
    // Style-based XSS
    '<div style="background: url(javascript:alert(\'CSS XSS\'))">Content</div>',
    
    // Complex nested HTML with mixed content
    '<div><h1>Title</h1><p>Safe paragraph</p><script>malicious()</script><strong>Bold text</strong></div>',
    
    // SVG-based XSS
    '<svg onload="alert(\'SVG XSS\')"><circle r="10"></circle></svg>'
];

console.log('Testing various malicious inputs:\n');

testInputs.forEach((input, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Input:  ${input}`);
    
    // Basic sanitization
    const sanitized = DOMPurify.sanitize(input);
    console.log(`Output: ${sanitized}`);
    
    // Custom configuration example - allow only specific tags
    const customSanitized = DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'strong', 'em', 'div'],
        ALLOWED_ATTR: []
    });
    console.log(`Custom: ${customSanitized}`);
    console.log('---');
});

// Demonstrate configuration options
console.log('\n=== Configuration Examples ===\n');

const complexHtml = `
    <div class="content" id="main">
        <h1>Article Title</h1>
        <p>This is a <strong>safe</strong> paragraph with <em>emphasis</em>.</p>
        <a href="https://example.com" target="_blank">External link</a>
        <script>alert('This should be removed')</script>
        <img src="image.jpg" alt="Description" onload="malicious()">
        <style>body { background: red; }</style>
    </div>
`;

console.log('Original HTML:');
console.log(complexHtml);

console.log('\n1. Default sanitization:');
console.log(DOMPurify.sanitize(complexHtml));

console.log('\n2. Allow specific tags and attributes:');
console.log(DOMPurify.sanitize(complexHtml, {
    ALLOWED_TAGS: ['div', 'h1', 'p', 'strong', 'em', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'id'],
    ALLOW_DATA_ATTR: false
}));

console.log('\n3. Text-only output:');
console.log(DOMPurify.sanitize(complexHtml, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true
}));

console.log('\n4. Safe links only (remove javascript: and data: protocols):');
console.log(DOMPurify.sanitize('<a href="javascript:alert()">Bad</a><a href="https://safe.com">Good</a>', {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|ftp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
}));

console.log('\n=== Summary ===');
console.log('✅ DOMPurify effectively removes dangerous scripts and event handlers');
console.log('✅ Preserves safe HTML structure and content');
console.log('✅ Highly configurable with custom tag and attribute allowlists');
console.log('✅ Works in both browser and Node.js environments');
console.log('✅ Battle-tested and widely used in production applications\n');