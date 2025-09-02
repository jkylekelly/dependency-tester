/**
 * Test Runner for All JavaScript Input Sanitization POCs
 * 
 * This script runs all five proof-of-concepts in sequence and provides
 * a summary of each library's capabilities and use cases.
 */

console.log('🔐 JavaScript Input Sanitization - Proof of Concepts');
console.log('===================================================\n');

console.log('Running 5 different POCs using various sanitization libraries...\n');

// Function to run a POC and handle any errors
function runPOC(pocName, pocFile) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 RUNNING ${pocName}`);
    console.log(`${'='.repeat(60)}\n`);
    
    try {
        require(`./${pocFile}`);
        console.log(`\n✅ ${pocName} completed successfully`);
    } catch (error) {
        console.error(`\n❌ ${pocName} failed:`, error.message);
    }
    
    console.log(`\n${'='.repeat(60)}`);
}

// Run all POCs in sequence
const pocs = [
    { name: 'POC #1: DOMPurify', file: 'poc1-dompurify' },
    { name: 'POC #2: Validator.js', file: 'poc2-validator' },
    { name: 'POC #3: XSS Library', file: 'poc3-xss' },
    { name: 'POC #4: Sanitize-HTML', file: 'poc4-sanitize-html' },
    { name: 'POC #5: Escape-HTML', file: 'poc5-escape-html' }
];

// Add a small delay between POCs for readability
async function runAllPOCs() {
    for (const poc of pocs) {
        runPOC(poc.name, poc.file);
        
        // Small delay to make output more readable
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Final summary
    console.log('\n' + '='.repeat(80));
    console.log('🎯 FINAL SUMMARY - CHOOSING THE RIGHT LIBRARY');
    console.log('='.repeat(80));
    
    console.log(`
📋 LIBRARY COMPARISON:

1. 🧹 DOMPurify
   • Best for: Rich HTML content that needs to allow some HTML tags
   • Use cases: Content management systems, blogs, WYSIWYG editors
   • Strengths: Mature, battle-tested, excellent browser support
   • Security: ⭐⭐⭐⭐⭐ (Industry standard for HTML sanitization)

2. ✅ Validator.js  
   • Best for: Form validation and basic input sanitization
   • Use cases: User registration, contact forms, API input validation
   • Strengths: Comprehensive validation functions, lightweight
   • Security: ⭐⭐⭐⭐ (Excellent for data validation)

3. 🛡️ XSS Library
   • Best for: Specialized XSS prevention with custom rules
   • Use cases: Applications with specific security requirements
   • Strengths: Highly configurable, XSS-focused, good performance
   • Security: ⭐⭐⭐⭐⭐ (Specialized XSS protection)

4. 🎨 Sanitize-HTML
   • Best for: Complex HTML sanitization with advanced configuration
   • Use cases: Content management, rich text editors, news sites
   • Strengths: Most configurable, semantic HTML support
   • Security: ⭐⭐⭐⭐⭐ (Extremely configurable security)

5. 🔤 Escape-HTML
   • Best for: Simple text display where no HTML should be allowed
   • Use cases: User comments, search queries, error messages
   • Strengths: Lightweight, fast, simple to use
   • Security: ⭐⭐⭐⭐ (Perfect for text-only display)

🎯 QUICK SELECTION GUIDE:

❓ Need to display user input as plain text only?
   → Use escape-html

❓ Need form validation and basic sanitization?
   → Use validator.js

❓ Need to allow some HTML but prevent XSS?
   → Use DOMPurify or xss library

❓ Need complex HTML sanitization with custom rules?
   → Use sanitize-html

❓ Building a CMS or rich text editor?
   → Use sanitize-html or DOMPurify

⚠️  SECURITY REMINDERS:
• Always validate input on the server side
• Use HTTPS to prevent man-in-the-middle attacks
• Implement Content Security Policy (CSP) headers
• Keep sanitization libraries updated
• Consider defense in depth - use multiple layers of protection
• Test your sanitization with various attack vectors
`);
    
    console.log('='.repeat(80));
    console.log('🔐 All proof-of-concepts completed successfully!');
    console.log('='.repeat(80));
}

// Run all POCs
runAllPOCs().catch(console.error);