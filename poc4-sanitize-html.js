/**
 * POC #4: Sanitize-HTML for Configurable HTML Sanitization
 * 
 * Sanitize-HTML provides robust HTML sanitization with extensive configuration
 * options. It's designed to be highly customizable while maintaining security.
 */

const sanitizeHtml = require('sanitize-html');

console.log('=== POC #4: Sanitize-HTML for Configurable Sanitization ===\n');

// Test cases with various HTML content
const htmlTestCases = [
    // Rich content that should be partially preserved
    `<div class="article">
        <h1>Article Title</h1>
        <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
        <a href="https://example.com" target="_blank">External link</a>
        <img src="https://example.com/image.jpg" alt="Description" width="300">
        <ul>
            <li>List item 1</li>
            <li>List item 2 with <code>inline code</code></li>
        </ul>
        <blockquote>This is a quote from someone important.</blockquote>
    </div>`,
    
    // Malicious content mixed with safe content
    `<div>
        <p>Safe paragraph</p>
        <script>alert('XSS Attack!')</script>
        <img src="x" onerror="alert('Image XSS')" alt="test">
        <a href="javascript:alert('Link XSS')">Malicious link</a>
        <div onclick="alert('Click XSS')">Clickable div</div>
        <style>body { background: red; }</style>
        <form><input type="text" name="test"></form>
    </div>`,
    
    // Complex nested structures
    `<article class="post">
        <header>
            <h2 class="title">Blog Post</h2>
            <meta name="author" content="John Doe">
            <time datetime="2023-01-01">January 1, 2023</time>
        </header>
        <section class="content">
            <p>Post content with <mark>highlighted text</mark>.</p>
            <figure>
                <img src="image.jpg" alt="Figure">
                <figcaption>Image caption</figcaption>
            </figure>
            <table>
                <thead><tr><th>Header 1</th><th>Header 2</th></tr></thead>
                <tbody><tr><td>Data 1</td><td>Data 2</td></tr></tbody>
            </table>
        </section>
        <script>maliciousCode()</script>
    </article>`,
    
    // Social media style content
    `<div class="social-post">
        <p>Check out this cool site: <a href="https://example.com">example.com</a></p>
        <p>Here's an emoji: 😀 and some hashtags: #webdev #security</p>
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
        <script>stealData()</script>
    </div>`
];

console.log('=== Default Sanitization ===\n');

htmlTestCases.forEach((html, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Original:');
    console.log(html);
    console.log('\nDefault Sanitized:');
    console.log(sanitizeHtml(html));
    console.log('\n' + '='.repeat(80) + '\n');
});

// Demonstrate different configuration presets
console.log('=== Configuration Examples ===\n');

const richContent = htmlTestCases[0]; // Use the first test case for configuration demos

// 1. Strict configuration - minimal HTML allowed
const strictConfig = {
    allowedTags: ['p', 'br', 'strong', 'em'],
    allowedAttributes: {},
    allowedSchemes: []
};

console.log('1. Strict Configuration (only basic text formatting):');
console.log(sanitizeHtml(richContent, strictConfig));
console.log('\n---\n');

// 2. Blog post configuration - allow rich content formatting
const blogConfig = {
    allowedTags: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'u', 's', 'sub', 'sup',
        'ul', 'ol', 'li',
        'blockquote', 'pre', 'code',
        'a', 'img',
        'div', 'span'
    ],
    allowedAttributes: {
        'a': ['href', 'title', 'target'],
        'img': ['src', 'alt', 'width', 'height'],
        'div': ['class'],
        'span': ['class'],
        'h1': ['class'], 'h2': ['class'], 'h3': ['class'],
        'p': ['class']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
        'img': ['http', 'https', 'data']
    },
    allowedSchemesAppliedToAttributes: ['href', 'src']
};

console.log('2. Blog Configuration (rich content allowed):');
console.log(sanitizeHtml(richContent, blogConfig));
console.log('\n---\n');

// 3. Comments configuration - moderate restrictions
const commentsConfig = {
    allowedTags: ['p', 'br', 'strong', 'em', 'a', 'code'],
    allowedAttributes: {
        'a': ['href']
    },
    allowedSchemes: ['http', 'https'],
    textFilter: function(text) {
        // Custom text filtering - limit length and remove excessive whitespace
        return text.substring(0, 1000).replace(/\s+/g, ' ').trim();
    }
};

console.log('3. Comments Configuration (moderate restrictions):');
console.log(sanitizeHtml(htmlTestCases[1], commentsConfig));
console.log('\n---\n');

// 4. Social media configuration with custom transformations
const socialConfig = {
    allowedTags: ['p', 'br', 'a', 'strong', 'em'],
    allowedAttributes: {
        'a': ['href', 'rel']
    },
    allowedSchemes: ['http', 'https'],
    transformTags: {
        'a': function(tagName, attribs) {
            // Add rel="nofollow" to all external links for SEO
            return {
                tagName: 'a',
                attribs: {
                    href: attribs.href,
                    rel: 'nofollow noopener',
                    target: '_blank'
                }
            };
        }
    },
    exclusiveFilter: function(frame) {
        // Remove any content that looks like spam
        if (frame.tag === 'a' && frame.text && frame.text.toLowerCase().includes('viagra')) {
            return false;
        }
        return true;
    }
};

console.log('4. Social Media Configuration (with link transformation):');
console.log(sanitizeHtml(htmlTestCases[3], socialConfig));
console.log('\n---\n');

// 5. News article configuration - preserve semantic HTML
const newsConfig = {
    allowedTags: [
        'article', 'section', 'header', 'footer',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'mark', 'small',
        'ul', 'ol', 'li',
        'blockquote', 'cite',
        'figure', 'figcaption', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'a', 'time',
        'div', 'span'
    ],
    allowedAttributes: {
        'article': ['class'],
        'section': ['class'],
        'header': ['class'],
        'h1': ['class'], 'h2': ['class'], 'h3': ['class'],
        'p': ['class'],
        'a': ['href', 'rel', 'target'],
        'img': ['src', 'alt', 'width', 'height'],
        'time': ['datetime'],
        'figure': ['class'],
        'table': ['class'],
        'div': ['class'],
        'span': ['class']
    },
    allowedSchemes: ['http', 'https'],
    nonTextTags: ['style', 'script', 'textarea', 'noscript']
};

console.log('5. News Article Configuration (semantic HTML preserved):');
console.log(sanitizeHtml(htmlTestCases[2], newsConfig));
console.log('\n---\n');

// Demonstrate advanced features
console.log('=== Advanced Features ===\n');

// Custom parser options
const customParserConfig = {
    allowedTags: ['p', 'strong', 'em', 'a'],
    allowedAttributes: {
        'a': ['href']
    },
    parser: {
        lowerCaseAttributeNames: false  // Preserve original case
    }
};

const mixedCaseHtml = '<P>Text with <A HREF="https://example.COM">MIXED case</A> tags</P>';
console.log('Mixed case HTML preservation:');
console.log(`Original: ${mixedCaseHtml}`);
console.log(`Sanitized: ${sanitizeHtml(mixedCaseHtml, customParserConfig)}`);
console.log('\n---\n');

// URL validation and transformation
const urlValidationConfig = {
    allowedTags: ['a', 'img'],
    allowedAttributes: {
        'a': ['href'],
        'img': ['src', 'alt']
    },
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
    transformTags: {
        'img': function(tagName, attribs) {
            // Validate image URLs and add loading attribute
            if (attribs.src && (attribs.src.startsWith('http://') || attribs.src.startsWith('https://'))) {
                return {
                    tagName: 'img',
                    attribs: {
                        src: attribs.src,
                        alt: attribs.alt || 'Image',
                        loading: 'lazy'
                    }
                };
            }
            return false; // Remove invalid images
        }
    }
};

const urlTestHtml = `
    <a href="https://safe-site.com">Safe link</a>
    <a href="javascript:alert('xss')">Malicious link</a>
    <img src="https://example.com/image.jpg" alt="Valid image">
    <img src="data:image/gif;base64,invalid" alt="Invalid image">
`;

console.log('URL validation and transformation:');
console.log(`Original: ${urlTestHtml}`);
console.log(`Sanitized: ${sanitizeHtml(urlTestHtml, urlValidationConfig)}`);

console.log('\n=== Performance Test ===\n');

// Generate large HTML content for performance testing
const largeHtml = '<div>' + 
    '<p>This is a test paragraph with <strong>bold</strong> text. </p>'.repeat(1000) +
    '<script>alert("This should be removed")</script>' +
    '</div>';

console.time('Sanitize Large HTML');
const sanitizedLarge = sanitizeHtml(largeHtml);
console.timeEnd('Sanitize Large HTML');

console.log(`Processed ${largeHtml.length} characters`);
console.log(`Output length: ${sanitizedLarge.length} characters`);
console.log(`Script removed: ${!sanitizedLarge.includes('<script>')}`);

console.log('\n=== Summary ===');
console.log('✅ Sanitize-HTML offers the most comprehensive configuration options');
console.log('✅ Supports semantic HTML preservation for content-rich applications');
console.log('✅ Includes advanced features like tag transformation and custom filters');
console.log('✅ Excellent for CMS, blogs, and applications requiring rich text editing');
console.log('✅ Strong performance even with large HTML documents');
console.log('✅ Highly active development with regular security updates\n');