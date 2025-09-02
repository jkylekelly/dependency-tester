/**
 * POC #3: XSS Library for Cross-Site Scripting Prevention
 * 
 * The 'xss' library is a specialized tool for preventing XSS attacks by
 * filtering user input and removing malicious scripts while preserving
 * safe HTML content.
 */

const xss = require('xss');

console.log('=== POC #3: XSS Library for XSS Prevention ===\n');

// Test cases with various XSS attack vectors
const xssTestCases = [
    // Basic script injection
    '<script>alert("Basic XSS")</script>Hello World',
    
    // Event handler injection
    '<img src="x" onerror="alert(\'Image XSS\')" alt="test">',
    '<div onclick="alert(\'Click XSS\')">Click me</div>',
    '<body onload="alert(\'Body XSS\')">Content</body>',
    
    // JavaScript protocol
    '<a href="javascript:alert(\'Link XSS\')">Malicious Link</a>',
    '<iframe src="javascript:alert(\'Frame XSS\')"></iframe>',
    
    // Style-based XSS
    '<div style="background: url(javascript:alert(\'CSS XSS\'))">Styled content</div>',
    '<link rel="stylesheet" href="javascript:alert(\'CSS Link XSS\')">',
    
    // Data attribute XSS
    '<div data-custom="x" data-onclick="alert(\'Data XSS\')">Content</div>',
    
    // SVG-based XSS
    '<svg onload="alert(\'SVG XSS\')"><circle r="10"></circle></svg>',
    '<svg><script>alert("SVG Script XSS")</script></svg>',
    
    // Complex nested attacks
    '<div><script>alert("Nested")</script><p>Safe content</p><img onerror="alert(\'Img\')" src="x"></div>',
    
    // Encoded attacks
    '&lt;script&gt;alert("Encoded")&lt;/script&gt;',
    '<script>&#97;&#108;&#101;&#114;&#116;&#40;&#34;&#88;&#83;&#83;&#34;&#41;</script>',
    
    // Template injection attempts
    '{{constructor.constructor("alert(\'Template XSS\')")()}}',
    
    // Safe HTML that should be preserved
    '<p>This is <strong>safe</strong> content with <em>emphasis</em>.</p>',
    '<div class="container"><h1>Title</h1><ul><li>Item 1</li><li>Item 2</li></ul></div>'
];

console.log('=== Basic XSS Filtering ===\n');

xssTestCases.forEach((input, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Input:  ${input}`);
    console.log(`Output: ${xss(input)}`);
    console.log('---');
});

// Demonstrate custom configuration options
console.log('\n=== Custom XSS Filter Configuration ===\n');

// Example 1: Strict filtering - only allow basic text formatting
const strictOptions = {
    allowList: {
        'p': [],
        'strong': [],
        'em': [],
        'br': [],
        'span': ['class']
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
};

const htmlWithMixedContent = `
    <div class="content">
        <h1>Article Title</h1>
        <p>This paragraph has <strong>bold</strong> and <em>italic</em> text.</p>
        <script>alert('This should be completely removed')</script>
        <a href="https://example.com">This link will be removed</a>
        <span class="highlight">This span with class will be kept</span>
        <img src="test.jpg" alt="This image will be removed">
    </div>
`;

console.log('Original HTML with mixed content:');
console.log(htmlWithMixedContent);

console.log('\nStrict filtering (only p, strong, em, br, span):');
console.log(xss(htmlWithMixedContent, strictOptions));

// Example 2: Moderate filtering - allow common safe tags
const moderateOptions = {
    allowList: {
        'div': ['class', 'id'],
        'p': ['class'],
        'h1': ['class'], 'h2': ['class'], 'h3': ['class'],
        'strong': [], 'em': [], 'u': [],
        'a': ['href', 'title', 'target'],
        'img': ['src', 'alt', 'width', 'height'],
        'ul': ['class'], 'ol': ['class'], 'li': [],
        'br': [], 'hr': []
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
        'a': ['http', 'https', 'mailto'],
        'img': ['http', 'https', 'data']
    }
};

console.log('\nModerate filtering (common safe tags):');
console.log(xss(htmlWithMixedContent, moderateOptions));

// Example 3: Custom filter function
const customOptions = {
    onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
        // Allow data attributes but filter their values
        if (name.substr(0, 5) === 'data-') {
            return name + '="' + xss.escapeAttrValue(value) + '"';
        }
        // Block style attributes that might contain CSS-based XSS
        if (name === 'style') {
            return '';
        }
    },
    onTag: function (tag, html, options) {
        // Custom handling for specific tags
        if (tag === 'script') {
            // Always remove script tags completely
            return '';
        }
    }
};

const htmlWithDataAttrs = '<div data-id="123" data-action="click" style="background: red;" onclick="alert()">Test</div>';
console.log('\nOriginal with data attributes and style:');
console.log(htmlWithDataAttrs);
console.log('Custom filtered (preserve data-*, remove style and onclick):');
console.log(xss(htmlWithDataAttrs, customOptions));

// Example 4: URL filtering
console.log('\n=== URL Filtering Examples ===\n');

const urlTestCases = [
    '<a href="https://safe-site.com">Safe HTTPS link</a>',
    '<a href="http://example.com">HTTP link</a>',
    '<a href="javascript:alert(\'XSS\')">Malicious JS link</a>',
    '<a href="data:text/html,<script>alert()</script>">Data URL attack</a>',
    '<a href="mailto:user@example.com">Email link</a>',
    '<img src="https://example.com/image.jpg" alt="Safe image">',
    '<img src="javascript:alert(\'IMG XSS\')" alt="Malicious image">'
];

const urlSafeOptions = {
    allowList: {
        'a': ['href', 'title'],
        'img': ['src', 'alt']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
        'img': ['http', 'https']
    }
};

urlTestCases.forEach((url, index) => {
    console.log(`URL Test ${index + 1}:`);
    console.log(`Input:  ${url}`);
    console.log(`Output: ${xss(url, urlSafeOptions)}`);
    console.log('---');
});

// Demonstrate utility functions
console.log('\n=== XSS Utility Functions ===\n');

const testValue = '<script>alert("test")</script>safe&content';
console.log(`Original value: ${testValue}`);
console.log(`escapeHtml(): ${xss.escapeHtml(testValue)}`);
console.log(`escapeAttrValue(): ${xss.escapeAttrValue('value"with"quotes&symbols')}`);

// Performance and safety demonstration
console.log('\n=== Performance & Safety Demo ===\n');

const largeHtml = '<div>' + '<p>Safe content </p>'.repeat(100) + '<script>alert("XSS in large content")</script>' + '</div>';
console.time('XSS Filter Performance');
const filteredLarge = xss(largeHtml);
console.timeEnd('XSS Filter Performance');
console.log(`Filtered ${largeHtml.length} characters of HTML successfully`);
console.log(`Script tag removed: ${!filteredLarge.includes('<script>')}`);

console.log('\n=== Summary ===');
console.log('✅ XSS library specializes in preventing cross-site scripting attacks');
console.log('✅ Highly configurable with custom allowlists and filtering rules');
console.log('✅ Handles complex XSS vectors including event handlers and CSS injection');
console.log('✅ Provides utility functions for HTML escaping and unescaping');
console.log('✅ Good performance even with large HTML content');
console.log('✅ Actively maintained with regular security updates\n');