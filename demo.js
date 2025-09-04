/**
 * Main Demo: JavaScript Input Sanitization Proof-of-Concepts
 * 
 * This file demonstrates 5 different approaches to sanitizing user input in JavaScript
 * using different third-party packages, each with their own strengths and use cases.
 */

const { demonstrateDOMPurify } = require('./sanitization-examples/1-dompurify-poc');
const { demonstrateValidator } = require('./sanitization-examples/2-validator-poc');
const { demonstrateXSS } = require('./sanitization-examples/3-xss-poc');
const { demonstrateSanitizeHtml } = require('./sanitization-examples/4-sanitize-html-poc');
const { demonstrateEscapeHtml } = require('./sanitization-examples/5-escape-html-poc');

function printHeader(title) {
    console.log('\n' + '='.repeat(80));
    console.log(`  ${title}`);
    console.log('='.repeat(80) + '\n');
}

function printPackageComparison() {
    console.log(`
PACKAGE COMPARISON SUMMARY:

1. DOMPurify (dompurify)
   - Best for: HTML/SVG/MathML sanitization in browsers and Node.js
   - Strengths: Very fast, battle-tested, supports complex HTML structures
   - Use cases: User-generated HTML content, rich text editors, email content
   - Size: ~45KB minified

2. Validator.js (validator)
   - Best for: Input validation and basic sanitization
   - Strengths: Comprehensive validation functions, email/URL handling
   - Use cases: Form validation, data type checking, email normalization
   - Size: ~65KB minified

3. XSS Package (xss)
   - Best for: XSS protection with flexible filtering
   - Strengths: Highly configurable, good CSS filtering, lightweight
   - Use cases: User comments, blog posts, content management systems
   - Size: ~25KB minified

4. Sanitize-HTML (sanitize-html)
   - Best for: Advanced HTML sanitization with complex rules
   - Strengths: Very flexible, powerful transformation features, good defaults
   - Use cases: Rich content editors, article publishing, complex HTML processing
   - Size: ~150KB minified

5. Escape-HTML (escape-html)
   - Best for: Basic HTML escaping for templates
   - Strengths: Very lightweight, fast, simple to use
   - Use cases: Template systems, basic HTML escaping, performance-critical apps
   - Size: ~2KB minified

RECOMMENDATIONS:
- For basic escaping: escape-html
- For form validation: validator
- For rich HTML content: DOMPurify or sanitize-html
- For user comments/posts: xss package
- For maximum flexibility: sanitize-html
    `);
}

function runAllDemos() {
    console.log('JavaScript Input Sanitization - Proof of Concepts Demo');
    console.log('This demo showcases 5 different sanitization libraries and their capabilities.');
    
    printPackageComparison();

    try {
        printHeader('1. DOMPurify - HTML/SVG/MathML Sanitization');
        demonstrateDOMPurify();

        printHeader('2. Validator.js - Input Validation and Sanitization');
        demonstrateValidator();

        printHeader('3. XSS Package - Cross-Site Scripting Protection');
        demonstrateXSS();

        printHeader('4. Sanitize-HTML - Advanced HTML Sanitization');
        demonstrateSanitizeHtml();

        printHeader('5. Escape-HTML - Basic HTML Escaping');
        demonstrateEscapeHtml();

        printHeader('Demo Complete');
        console.log('All sanitization proof-of-concepts have been demonstrated.');
        console.log('Each library has its own strengths and is suitable for different use cases.');
        console.log('Choose the one that best fits your specific security requirements and performance needs.');

    } catch (error) {
        console.error('Error running demos:', error);
        process.exit(1);
    }
}

// Run the demo
if (require.main === module) {
    runAllDemos();
}

module.exports = {
    runAllDemos,
    demonstrateDOMPurify,
    demonstrateValidator,
    demonstrateXSS,
    demonstrateSanitizeHtml,
    demonstrateEscapeHtml
};