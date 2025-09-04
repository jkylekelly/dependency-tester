# Dependency Tester - JavaScript Input Sanitization Proof-of-Concepts

This repository contains 5 different proof-of-concepts for sanitizing user input in JavaScript, each using a different third-party package. These examples demonstrate various approaches to preventing XSS attacks and sanitizing user-generated content.

## 📦 Packages Demonstrated

### 1. **DOMPurify** - HTML/SVG/MathML Sanitization
- **Package**: `dompurify`
- **Best for**: HTML, SVG, and MathML sanitization in browsers and Node.js
- **Strengths**: Very fast, battle-tested, supports complex HTML structures
- **Use cases**: User-generated HTML content, rich text editors, email content
- **Size**: ~45KB minified

### 2. **Validator.js** - Input Validation and Sanitization
- **Package**: `validator`
- **Best for**: Input validation and basic sanitization
- **Strengths**: Comprehensive validation functions, email/URL handling
- **Use cases**: Form validation, data type checking, email normalization
- **Size**: ~65KB minified

### 3. **XSS Package** - Cross-Site Scripting Protection
- **Package**: `xss`
- **Best for**: XSS protection with flexible filtering
- **Strengths**: Highly configurable, good CSS filtering, lightweight
- **Use cases**: User comments, blog posts, content management systems
- **Size**: ~25KB minified

### 4. **Sanitize-HTML** - Advanced HTML Sanitization
- **Package**: `sanitize-html`
- **Best for**: Advanced HTML sanitization with complex rules
- **Strengths**: Very flexible, powerful transformation features, good defaults
- **Use cases**: Rich content editors, article publishing, complex HTML processing
- **Size**: ~150KB minified

### 5. **Escape-HTML** - Basic HTML Escaping
- **Package**: `escape-html`
- **Best for**: Basic HTML escaping for templates
- **Strengths**: Very lightweight, fast, simple to use
- **Use cases**: Template systems, basic HTML escaping, performance-critical apps
- **Size**: ~2KB minified

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run all demos**:
   ```bash
   npm run demo
   ```

3. **Run individual demos**:
   ```bash
   npm run demo:dompurify      # DOMPurify examples
   npm run demo:validator      # Validator.js examples
   npm run demo:xss           # XSS package examples
   npm run demo:sanitize-html # Sanitize-HTML examples
   npm run demo:escape-html   # Escape-HTML examples
   ```

## 📁 Project Structure

```
├── demo.js                              # Main demo showcasing all packages
├── sanitization-examples/
│   ├── 1-dompurify-poc.js              # DOMPurify proof-of-concept
│   ├── 2-validator-poc.js              # Validator.js proof-of-concept
│   ├── 3-xss-poc.js                    # XSS package proof-of-concept
│   ├── 4-sanitize-html-poc.js          # Sanitize-HTML proof-of-concept
│   └── 5-escape-html-poc.js            # Escape-HTML proof-of-concept
├── package.json                         # Node.js dependencies and scripts
└── README.md                           # This file
```

## 🔍 What Each Demo Shows

### DOMPurify Examples
- Basic XSS prevention
- Script tag removal
- Mixed content sanitization
- Custom configuration options
- SVG sanitization

### Validator.js Examples
- Email validation and normalization
- HTML escaping and unescaping
- URL validation
- Whitelist/blacklist sanitization
- Comprehensive input sanitization

### XSS Package Examples
- Basic XSS protection
- HTML content preservation
- Custom whitelist configuration
- CSS filtering
- URL filtering and validation
- User-generated content sanitization

### Sanitize-HTML Examples
- Default strict sanitization
- Blog post sanitization
- Custom URL filtering
- Text extraction
- Advanced configuration
- Content type-based sanitization

### Escape-HTML Examples
- Basic HTML escaping
- User input in templates
- Form input sanitization
- Dynamic HTML building
- Template system with escaping
- Comprehensive sanitization utility

## 🛡️ Security Features Demonstrated

- **XSS Prevention**: Protection against Cross-Site Scripting attacks
- **HTML Sanitization**: Safe processing of user-generated HTML
- **Input Validation**: Checking and cleaning various input types
- **URL Filtering**: Preventing dangerous URLs and protocols
- **CSS Filtering**: Removing malicious CSS expressions
- **Attribute Sanitization**: Cleaning HTML attributes safely
- **Template Safety**: Safe rendering in template systems

## 📊 Package Recommendations

- **For basic escaping**: `escape-html`
- **For form validation**: `validator`
- **For rich HTML content**: `dompurify` or `sanitize-html`
- **For user comments/posts**: `xss` package
- **For maximum flexibility**: `sanitize-html`

## 🔧 Installation Details

All packages are installed with secure versions that have been checked for vulnerabilities:

```bash
npm install dompurify@^3.2.4 validator@^13.12.0 xss@^1.0.15 sanitize-html@^2.13.0 escape-html@^1.0.3 jsdom
```

## ⚠️ Security Notes

- Always validate and sanitize user input on both client and server sides
- Choose the right tool for your specific use case
- Keep packages updated to get security fixes
- Test your sanitization logic thoroughly
- Consider the performance impact of different sanitization approaches

## 🧪 Testing

Each proof-of-concept includes comprehensive examples showing:
- Malicious input handling
- Edge cases
- Configuration options
- Real-world scenarios
- Best practices

Run `npm run demo` to see all examples in action!