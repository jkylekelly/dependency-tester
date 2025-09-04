/**
 * Proof of Concept 5: Escape-HTML for Basic HTML Escaping
 * 
 * escape-html is a lightweight library for escaping HTML to prevent XSS attacks.
 * It's simple, fast, and perfect for basic HTML escaping needs.
 */

const escapeHtml = require('escape-html');

function demonstrateEscapeHtml() {
    console.log('=== Escape-HTML Proof of Concept ===\n');

    // Example 1: Basic HTML escaping
    const dangerousInputs = [
        '<script>alert("XSS")</script>',
        '<img src="x" onerror="alert(\'XSS\')">',
        'Hello & welcome to "our" site!',
        '<div onclick="alert(\'click\')">Click me</div>',
        'Price: $5 < $10 & > $1',
        '\'Single quotes\' and "double quotes"'
    ];

    console.log('Example 1 - Basic HTML Escaping:');
    dangerousInputs.forEach(input => {
        const escaped = escapeHtml(input);
        console.log(`Input: ${input}`);
        console.log(`Escaped: ${escaped}`);
        console.log('');
    });

    // Example 2: User input in HTML templates
    function createUserProfileHtml(userData) {
        const safeUserData = {
            name: escapeHtml(userData.name || ''),
            bio: escapeHtml(userData.bio || ''),
            website: escapeHtml(userData.website || ''),
            company: escapeHtml(userData.company || '')
        };

        return `
        <div class="user-profile">
            <h2>User Profile: ${safeUserData.name}</h2>
            <p><strong>Bio:</strong> ${safeUserData.bio}</p>
            <p><strong>Website:</strong> ${safeUserData.website}</p>
            <p><strong>Company:</strong> ${safeUserData.company}</p>
        </div>
        `;
    }

    console.log('Example 2 - User Input in HTML Templates:');
    const maliciousUserData = {
        name: '<script>alert("XSS in name")</script>John Doe',
        bio: 'Web developer & security enthusiast. Visit <script>alert("XSS")</script> my site!',
        website: 'https://example.com"><script>alert("XSS")</script><a href="',
        company: 'TechCorp <img src="x" onerror="alert(\'XSS\')">'
    };

    const safeHtml = createUserProfileHtml(maliciousUserData);
    console.log('Malicious user data:', JSON.stringify(maliciousUserData, null, 2));
    console.log('Safe HTML output:', safeHtml);
    console.log('');

    // Example 3: Form input sanitization
    function sanitizeFormInput(formData) {
        const sanitized = {};
        
        for (const [key, value] of Object.entries(formData)) {
            if (typeof value === 'string') {
                sanitized[key] = escapeHtml(value.trim());
            } else if (Array.isArray(value)) {
                sanitized[key] = value.map(item => 
                    typeof item === 'string' ? escapeHtml(item.trim()) : item
                );
            } else {
                sanitized[key] = value;
            }
        }
        
        return sanitized;
    }

    console.log('Example 3 - Form Input Sanitization:');
    const formData = {
        username: '  admin<script>alert("xss")</script>  ',
        email: 'user@example.com<script>alert("xss")</script>',
        message: 'Hello & welcome! <img src="x" onerror="alert(\'xss\')">',
        tags: ['<script>tag1</script>', 'normal tag', '<img onerror="alert(1)">'],
        age: 25 // non-string value
    };

    const sanitizedForm = sanitizeFormInput(formData);
    console.log('Original form data:', JSON.stringify(formData, null, 2));
    console.log('Sanitized form data:', JSON.stringify(sanitizedForm, null, 2));
    console.log('');

    // Example 4: Building safe HTML dynamically
    function buildSafeTable(data) {
        let html = '<table border="1">\n  <thead>\n    <tr>';
        
        // Build header
        if (data.length > 0) {
            Object.keys(data[0]).forEach(key => {
                html += `<th>${escapeHtml(key)}</th>`;
            });
        }
        html += '</tr>\n  </thead>\n  <tbody>\n';
        
        // Build rows
        data.forEach(row => {
            html += '    <tr>';
            Object.values(row).forEach(value => {
                const safeValue = typeof value === 'string' ? escapeHtml(value) : escapeHtml(String(value));
                html += `<td>${safeValue}</td>`;
            });
            html += '</tr>\n';
        });
        
        html += '  </tbody>\n</table>';
        return html;
    }

    console.log('Example 4 - Building Safe HTML Tables:');
    const tableData = [
        {
            name: 'John <script>alert("xss")</script>',
            email: 'john@example.com',
            role: 'Admin & Developer'
        },
        {
            name: 'Jane "The Hacker" <img onerror="alert(1)">',
            email: 'jane@example.com',
            role: 'Security < Expert'
        }
    ];

    const safeTable = buildSafeTable(tableData);
    console.log('Data:', JSON.stringify(tableData, null, 2));
    console.log('Safe HTML table:', safeTable);
    console.log('');

    // Example 5: Template system with escaping
    class SafeTemplate {
        constructor(template) {
            this.template = template;
        }

        render(data, autoEscape = true) {
            let result = this.template;
            
            // Replace placeholders like {{name}} with escaped values
            result = result.replace(/\{\{(\w+)\}\}/g, (match, key) => {
                const value = data[key];
                if (value === undefined || value === null) {
                    return '';
                }
                return autoEscape ? escapeHtml(String(value)) : String(value);
            });

            // Replace raw placeholders like {{{name}}} with unescaped values
            result = result.replace(/\{\{\{(\w+)\}\}\}/g, (match, key) => {
                const value = data[key];
                if (value === undefined || value === null) {
                    return '';
                }
                return String(value);
            });

            return result;
        }
    }

    console.log('Example 5 - Safe Template System:');
    const template = new SafeTemplate(`
        <div class="message">
            <h3>Message from {{author}}</h3>
            <p>Subject: {{subject}}</p>
            <div class="content">{{content}}</div>
            <div class="raw-content">{{{rawContent}}}</div>
            <small>Sent at {{timestamp}}</small>
        </div>
    `);

    const templateData = {
        author: 'Malicious User <script>alert("xss")</script>',
        subject: 'Important & Urgent!',
        content: 'This is <script>alert("content xss")</script> a message',
        rawContent: '<p>This <strong>HTML</strong> will not be escaped</p>',
        timestamp: new Date().toISOString()
    };

    const renderedTemplate = template.render(templateData);
    console.log('Template data:', JSON.stringify(templateData, null, 2));
    console.log('Rendered template:', renderedTemplate);
    console.log('');

    // Example 6: Comprehensive input sanitization utility
    class InputSanitizer {
        static escape(input) {
            if (typeof input !== 'string') {
                return input;
            }
            return escapeHtml(input);
        }

        static sanitizeObject(obj, fieldsToEscape = []) {
            const sanitized = {};
            
            for (const [key, value] of Object.entries(obj)) {
                if (fieldsToEscape.length === 0 || fieldsToEscape.includes(key)) {
                    if (typeof value === 'string') {
                        sanitized[key] = escapeHtml(value);
                    } else if (Array.isArray(value)) {
                        sanitized[key] = value.map(item => 
                            typeof item === 'string' ? escapeHtml(item) : item
                        );
                    } else if (typeof value === 'object' && value !== null) {
                        sanitized[key] = this.sanitizeObject(value, fieldsToEscape);
                    } else {
                        sanitized[key] = value;
                    }
                } else {
                    sanitized[key] = value;
                }
            }
            
            return sanitized;
        }

        static createSafeAttributes(attrs) {
            const safe = {};
            for (const [key, value] of Object.entries(attrs)) {
                safe[key] = escapeHtml(String(value));
            }
            return safe;
        }
    }

    console.log('Example 6 - Comprehensive Input Sanitization Utility:');
    const complexData = {
        user: {
            name: 'Test <script>alert("nested")</script>',
            preferences: {
                theme: 'dark & light',
                notifications: true
            }
        },
        messages: [
            'Hello <script>world</script>',
            'Second <img onerror="alert(1)"> message'
        ],
        settings: {
            api_key: 'secret123', // Should not be escaped
            title: 'My App <script>alert("xss")</script>' // Should be escaped
        }
    };

    // Escape only specific fields
    const partiallyEscaped = InputSanitizer.sanitizeObject(complexData, ['name', 'title', 'messages']);
    console.log('Original data:', JSON.stringify(complexData, null, 2));
    console.log('Partially escaped (name, title, messages):', JSON.stringify(partiallyEscaped, null, 2));

    // Escape all string fields
    const fullyEscaped = InputSanitizer.sanitizeObject(complexData);
    console.log('Fully escaped:', JSON.stringify(fullyEscaped, null, 2));
    console.log('');

    // Example of safe HTML attributes
    const attributes = {
        id: 'user-<script>alert(1)</script>',
        class: 'content & styles',
        'data-user': 'john"doe<script>'
    };
    const safeAttrs = InputSanitizer.createSafeAttributes(attributes);
    console.log('Original attributes:', attributes);
    console.log('Safe attributes:', safeAttrs);
}

// Export for use in main demo
module.exports = { demonstrateEscapeHtml };

// Run if called directly
if (require.main === module) {
    demonstrateEscapeHtml();
}