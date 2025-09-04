/**
 * Proof of Concept 1: DOMPurify for HTML Sanitization
 * 
 * DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, 
 * MathML and SVG. It's written in JavaScript and works in all modern browsers.
 */

// Import DOMPurify (works in both Node.js and browser environments)
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Create a window object for DOMPurify to use in Node.js
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function demonstrateDOMPurify() {
    console.log('=== DOMPurify Proof of Concept ===\n');

    // Example 1: Basic XSS prevention
    const maliciousHTML1 = '<img src="x" onerror="alert(\'XSS Attack!\')">';
    const sanitized1 = DOMPurify.sanitize(maliciousHTML1);
    console.log('Example 1 - Basic XSS Prevention:');
    console.log('Input:', maliciousHTML1);
    console.log('Sanitized:', sanitized1);
    console.log('');

    // Example 2: Script tag removal
    const maliciousHTML2 = '<p>Hello <script>alert("malicious")</script> World</p>';
    const sanitized2 = DOMPurify.sanitize(maliciousHTML2);
    console.log('Example 2 - Script Tag Removal:');
    console.log('Input:', maliciousHTML2);
    console.log('Sanitized:', sanitized2);
    console.log('');

    // Example 3: Preserving safe HTML while removing dangerous content
    const mixedHTML = `
        <div>
            <h1>Safe Content</h1>
            <p>This is <strong>safe</strong> HTML content.</p>
            <script>alert('This is dangerous!');</script>
            <img src="x" onerror="alert('XSS')">
            <a href="javascript:alert('XSS')">Dangerous Link</a>
            <a href="https://example.com">Safe Link</a>
        </div>
    `;
    const sanitized3 = DOMPurify.sanitize(mixedHTML);
    console.log('Example 3 - Mixed Content Sanitization:');
    console.log('Input:', mixedHTML);
    console.log('Sanitized:', sanitized3);
    console.log('');

    // Example 4: Custom configuration - allowing only specific tags
    const restrictiveConfig = { ALLOWED_TAGS: ['p', 'strong', 'em'] };
    const htmlWithVariousTags = '<h1>Title</h1><p>Paragraph with <strong>bold</strong> and <em>italic</em> text</p><div>Div content</div>';
    const sanitized4 = DOMPurify.sanitize(htmlWithVariousTags, restrictiveConfig);
    console.log('Example 4 - Custom Configuration (only p, strong, em tags allowed):');
    console.log('Input:', htmlWithVariousTags);
    console.log('Sanitized:', sanitized4);
    console.log('');

    // Example 5: SVG sanitization
    const maliciousSVG = '<svg><script>alert("XSS in SVG")</script></svg>';
    const sanitized5 = DOMPurify.sanitize(maliciousSVG);
    console.log('Example 5 - SVG Sanitization:');
    console.log('Input:', maliciousSVG);
    console.log('Sanitized:', sanitized5);
    console.log('');
}

// Export for use in main demo
module.exports = { demonstrateDOMPurify };

// Run if called directly
if (require.main === module) {
    demonstrateDOMPurify();
}