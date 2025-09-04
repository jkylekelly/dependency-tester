/**
 * Proof of Concept 3: XSS Package for Cross-Site Scripting Protection
 * 
 * The xss package is designed to sanitize untrusted HTML to prevent XSS attacks.
 * It's lightweight and provides flexible filtering options.
 */

const xss = require('xss');

function demonstrateXSS() {
    console.log('=== XSS Package Proof of Concept ===\n');

    // Example 1: Basic XSS protection
    const maliciousInputs = [
        '<script>alert("XSS Attack!")</script>',
        '<img src="x" onerror="alert(\'XSS\')">',
        '<a href="javascript:alert(\'XSS\')">Click me</a>',
        '<div onclick="alert(\'XSS\')">Click me</div>',
        '<iframe src="javascript:alert(\'XSS\')"></iframe>'
    ];

    console.log('Example 1 - Basic XSS Protection:');
    maliciousInputs.forEach(input => {
        const sanitized = xss(input);
        console.log(`Input: ${input}`);
        console.log(`Sanitized: ${sanitized}`);
        console.log('');
    });

    // Example 2: Preserving safe HTML content
    const mixedContent = `
        <div class="content">
            <h1>Welcome to Our Site</h1>
            <p>This is <strong>safe</strong> content with <em>emphasis</em>.</p>
            <script>alert('This should be removed!');</script>
            <a href="https://example.com">Safe external link</a>
            <a href="javascript:alert('XSS')">Dangerous link</a>
            <img src="image.jpg" alt="Safe image">
            <img src="x" onerror="alert('XSS')">
        </div>
    `;

    console.log('Example 2 - Mixed Content Sanitization:');
    console.log('Input:', mixedContent);
    console.log('Sanitized:', xss(mixedContent));
    console.log('');

    // Example 3: Custom whitelist configuration
    const customOptions = {
        whiteList: {
            h1: [],
            h2: [],
            p: [],
            strong: [],
            em: [],
            a: ['href', 'title'],
            img: ['src', 'alt', 'width', 'height']
        },
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
    };

    const htmlWithVariousTags = `
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <p>Paragraph with <strong>bold</strong> and <em>italic</em> text</p>
        <div>This div will be removed</div>
        <script>alert('This script will be completely removed');</script>
        <a href="https://example.com" title="Example">Safe Link</a>
        <a href="javascript:alert('xss')" onclick="alert('xss')">Dangerous Link</a>
        <img src="image.jpg" alt="Image" width="100" height="100">
        <span>This span will be removed but content preserved</span>
    `;

    console.log('Example 3 - Custom Whitelist Configuration:');
    console.log('Input:', htmlWithVariousTags);
    console.log('Sanitized:', xss(htmlWithVariousTags, customOptions));
    console.log('');

    // Example 4: CSS filtering
    const htmlWithCSS = `
        <div style="background: url('javascript:alert(1)')">
            <p style="color: red; font-size: 16px;">Normal styling</p>
            <p style="background-image: url('javascript:alert(2)')">Malicious CSS</p>
            <p style="expression(alert('IE XSS'))">IE Expression XSS</p>
        </div>
    `;

    const cssFilterOptions = {
        css: {
            whiteList: {
                color: true,
                'font-size': true,
                'text-align': true,
                'background-color': true
            }
        }
    };

    console.log('Example 4 - CSS Filtering:');
    console.log('Input:', htmlWithCSS);
    console.log('Sanitized:', xss(htmlWithCSS, cssFilterOptions));
    console.log('');

    // Example 5: URL filtering and validation
    const urlFilterOptions = {
        onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
            if (name === 'href' || name === 'src') {
                // Only allow http/https URLs
                if (/^https?:\/\//.test(value)) {
                    return name + '="' + xss.escapeAttrValue(value) + '"';
                }
                return name + '="#"'; // Replace with safe default
            }
        }
    };

    const htmlWithUrls = `
        <a href="https://example.com">HTTPS Link</a>
        <a href="http://example.com">HTTP Link</a>
        <a href="javascript:alert('xss')">JavaScript Link</a>
        <a href="data:text/html,<script>alert('xss')</script>">Data URL</a>
        <img src="https://example.com/image.jpg" alt="HTTPS Image">
        <img src="javascript:alert('xss')" alt="JavaScript Image">
    `;

    console.log('Example 5 - URL Filtering:');
    console.log('Input:', htmlWithUrls);
    console.log('Sanitized:', xss(htmlWithUrls, urlFilterOptions));
    console.log('');

    // Example 6: User-generated content sanitization
    function sanitizeUserContent(content, level = 'normal') {
        let options;

        switch (level) {
            case 'strict':
                options = {
                    whiteList: {
                        p: [],
                        br: [],
                        strong: [],
                        em: []
                    },
                    stripIgnoreTag: true,
                    stripIgnoreTagBody: ['script', 'style']
                };
                break;
                
            case 'normal':
                options = {
                    whiteList: {
                        h1: [], h2: [], h3: [],
                        p: [], br: [],
                        strong: [], em: [], u: [],
                        a: ['href', 'title'],
                        img: ['src', 'alt', 'width', 'height'],
                        ul: [], ol: [], li: []
                    },
                    stripIgnoreTag: true,
                    stripIgnoreTagBody: ['script', 'style']
                };
                break;
                
            case 'permissive':
                // Use default xss options but with additional protections
                options = {
                    onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
                        // Block javascript: and data: URLs
                        if ((name === 'href' || name === 'src') && 
                            /^(javascript|data):/i.test(value)) {
                            return '';
                        }
                    }
                };
                break;
                
            default:
                options = {};
        }

        return xss(content, options);
    }

    console.log('Example 6 - User Content Sanitization Levels:');
    const userContent = `
        <h1>User Blog Post</h1>
        <p>This is my <strong>blog post</strong> with <em>formatting</em>.</p>
        <script>alert('malicious script');</script>
        <a href="https://example.com">Good link</a>
        <a href="javascript:alert('xss')">Bad link</a>
        <img src="image.jpg" alt="Image">
        <style>body { background: red; }</style>
        <div onclick="alert('xss')">Clickable div</div>
    `;

    ['strict', 'normal', 'permissive'].forEach(level => {
        const result = sanitizeUserContent(userContent, level);
        console.log(`Level: ${level}`);
        console.log(`Result: ${result}`);
        console.log('');
    });
}

// Export for use in main demo
module.exports = { demonstrateXSS };

// Run if called directly
if (require.main === module) {
    demonstrateXSS();
}