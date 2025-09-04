/**
 * Proof of Concept 4: Sanitize-HTML for Advanced HTML Sanitization
 * 
 * sanitize-html provides a rich set of features for cleaning up user-submitted HTML,
 * preserving only the parts you want. It's highly configurable and secure by default.
 */

const sanitizeHtml = require('sanitize-html');

function demonstrateSanitizeHtml() {
    console.log('=== Sanitize-HTML Proof of Concept ===\n');

    // Example 1: Default sanitization (very strict)
    const messyHtml = `
        <h1>Title</h1>
        <script>alert('xss')</script>
        <p onclick="alert('click')">Paragraph with <strong>bold</strong> text</p>
        <img src="x" onerror="alert('xss')">
        <a href="javascript:alert('xss')">Dangerous link</a>
        <a href="https://example.com">Safe link</a>
        <div style="background: url('javascript:alert(1)')">Styled div</div>
    `;

    console.log('Example 1 - Default Sanitization (very strict):');
    console.log('Input:', messyHtml);
    console.log('Sanitized:', sanitizeHtml(messyHtml));
    console.log('');

    // Example 2: Blog post sanitization (more permissive)
    const blogPostOptions = {
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'hr',
            'strong', 'em', 'u', 's', 'sup', 'sub',
            'a', 'img',
            'ul', 'ol', 'li',
            'blockquote', 'code', 'pre'
        ],
        allowedAttributes: {
            'a': ['href', 'title'],
            'img': ['src', 'alt', 'width', 'height'],
            '*': ['class'] // Allow class attribute on all tags
        },
        allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
    };

    const blogContent = `
        <h1>My Blog Post</h1>
        <p>Welcome to my <strong>awesome</strong> blog post!</p>
        <script>alert('This should be removed');</script>
        <p>Here's a <a href="https://example.com" title="Example">safe link</a></p>
        <p>And here's a <a href="javascript:alert('xss')">dangerous link</a></p>
        <img src="image.jpg" alt="Blog image" width="300" height="200">
        <img src="x" onerror="alert('xss')" alt="Malicious image">
        <ul class="my-list">
            <li>List item 1</li>
            <li>List item 2</li>
        </ul>
        <code>console.log('Some code');</code>
        <div onclick="alert('xss')" class="container">This div will be removed</div>
    `;

    console.log('Example 2 - Blog Post Sanitization:');
    console.log('Input:', blogContent);
    console.log('Sanitized:', sanitizeHtml(blogContent, blogPostOptions));
    console.log('');

    // Example 3: Custom URL filtering
    const urlFilterOptions = {
        allowedTags: ['a', 'p', 'img'],
        allowedAttributes: {
            'a': ['href'],
            'img': ['src', 'alt']
        },
        transformTags: {
            'a': function(tagName, attribs) {
                // Only allow https URLs, block everything else
                if (attribs.href && !attribs.href.startsWith('https://')) {
                    return {
                        tagName: 'span',
                        attribs: {}
                    };
                }
                // Add rel="noopener" for security
                return {
                    tagName: 'a',
                    attribs: {
                        href: attribs.href,
                        rel: 'noopener'
                    }
                };
            }
        }
    };

    const contentWithUrls = `
        <p>Check out these links:</p>
        <a href="https://secure.example.com">HTTPS Link (allowed)</a>
        <a href="http://insecure.example.com">HTTP Link (will be converted to span)</a>
        <a href="javascript:alert('xss')">JavaScript Link (will be converted to span)</a>
        <img src="https://example.com/image.jpg" alt="Image">
    `;

    console.log('Example 3 - Custom URL Filtering:');
    console.log('Input:', contentWithUrls);
    console.log('Sanitized:', sanitizeHtml(contentWithUrls, urlFilterOptions));
    console.log('');

    // Example 4: Text extraction (strip all HTML)
    const textOnlyOptions = {
        allowedTags: [],
        allowedAttributes: {}
    };

    const htmlWithFormatting = `
        <h1>Important Announcement</h1>
        <p>This is <strong>very important</strong> information!</p>
        <script>alert('malicious');</script>
        <a href="https://example.com">Click here</a>
        <img src="image.jpg" alt="Important image">
    `;

    console.log('Example 4 - Text Extraction (strip all HTML):');
    console.log('Input:', htmlWithFormatting);
    console.log('Text only:', sanitizeHtml(htmlWithFormatting, textOnlyOptions));
    console.log('');

    // Example 5: Advanced configuration with custom filters
    const advancedOptions = {
        allowedTags: ['p', 'br', 'strong', 'em', 'a', 'img', 'div'],
        allowedAttributes: {
            'a': ['href', 'title'],
            'img': ['src', 'alt', 'width', 'height'],
            'div': ['class']
        },
        // Custom filter for href attributes
        allowedSchemes: ['http', 'https', 'mailto'],
        allowedSchemesByTag: {
            img: ['http', 'https', 'data']
        },
        // Transform tags and attributes
        transformTags: {
            'h1': 'strong',
            'h2': 'strong',
            'h3': 'strong'
        },
        // Filter function to modify attributes
        filter: function(token) {
            // Add target="_blank" to external links
            if (token.tag === 'a' && token.attrs && token.attrs.href) {
                const href = token.attrs.href;
                if (href.startsWith('http://') || href.startsWith('https://')) {
                    token.attrs.target = '_blank';
                    token.attrs.rel = 'noopener noreferrer';
                }
            }
            return token;
        },
        // Exclusive filter for dangerous content
        exclusiveFilter: function(frame) {
            // Remove any remaining onclick, onload, etc.
            if (frame.tag && frame.attribs) {
                for (let attr in frame.attribs) {
                    if (attr.toLowerCase().startsWith('on')) {
                        delete frame.attribs[attr];
                    }
                }
            }
            return true;
        }
    };

    const complexHtml = `
        <div class="content">
            <h1>This will become strong</h1>
            <h2>This will also become strong</h2>
            <p>Regular paragraph with <em>emphasis</em></p>
            <a href="https://external.com">External link</a>
            <a href="mailto:test@example.com">Email link</a>
            <a href="/internal">Internal link</a>
            <img src="data:image/png;base64,iVBORw0KGgo=" alt="Base64 image">
            <script>alert('removed');</script>
            <p onclick="alert('removed')" onload="alert('removed')">Paragraph with events</p>
        </div>
    `;

    console.log('Example 5 - Advanced Configuration:');
    console.log('Input:', complexHtml);
    console.log('Sanitized:', sanitizeHtml(complexHtml, advancedOptions));
    console.log('');

    // Example 6: Practical sanitization function for different content types
    function sanitizeContent(html, contentType = 'general') {
        const configs = {
            strict: {
                allowedTags: ['p', 'br', 'strong', 'em'],
                allowedAttributes: {}
            },
            
            comment: {
                allowedTags: ['p', 'br', 'strong', 'em', 'a'],
                allowedAttributes: {
                    'a': ['href']
                },
                allowedSchemes: ['http', 'https'],
                transformTags: {
                    'a': function(tagName, attribs) {
                        return {
                            tagName: 'a',
                            attribs: {
                                href: attribs.href,
                                rel: 'nofollow noopener',
                                target: '_blank'
                            }
                        };
                    }
                }
            },
            
            article: {
                allowedTags: [
                    'h1', 'h2', 'h3', 'p', 'br', 'hr',
                    'strong', 'em', 'u', 'a', 'img',
                    'ul', 'ol', 'li', 'blockquote', 'code'
                ],
                allowedAttributes: {
                    'a': ['href', 'title'],
                    'img': ['src', 'alt', 'width', 'height']
                },
                allowedSchemes: ['http', 'https']
            },
            
            general: {
                allowedTags: ['p', 'br', 'strong', 'em', 'a'],
                allowedAttributes: {
                    'a': ['href']
                },
                allowedSchemes: ['http', 'https', 'mailto']
            }
        };

        return sanitizeHtml(html, configs[contentType] || configs.general);
    }

    console.log('Example 6 - Content Type-Based Sanitization:');
    const testContent = `
        <h1>Title</h1>
        <p>Content with <strong>formatting</strong> and <a href="https://example.com">links</a></p>
        <script>alert('xss');</script>
        <img src="image.jpg" alt="Image">
        <ul><li>List item</li></ul>
    `;

    ['strict', 'comment', 'article', 'general'].forEach(type => {
        const result = sanitizeContent(testContent, type);
        console.log(`Type: ${type}`);
        console.log(`Result: ${result}`);
        console.log('');
    });
}

// Export for use in main demo
module.exports = { demonstrateSanitizeHtml };

// Run if called directly
if (require.main === module) {
    demonstrateSanitizeHtml();
}