# JavaScript Input Sanitization - Proof of Concepts

This repository contains **5 different proof-of-concepts** for sanitizing user input in JavaScript, each using a different third-party package. These POCs demonstrate various approaches to input sanitization and XSS prevention.

## 🔐 Libraries Covered

1. **[DOMPurify](https://github.com/cure53/DOMPurify)** - DOM-only HTML sanitizer
2. **[Validator.js](https://github.com/validatorjs/validator.js)** - String validation and sanitization
3. **[XSS](https://github.com/leizongmin/js-xss)** - XSS prevention library
4. **[Sanitize-HTML](https://github.com/apostrophecms/sanitize-html)** - Configurable HTML sanitizer
5. **[Escape-HTML](https://github.com/component/escape-html)** - Basic HTML escaping

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Run all POCs at once
npm test

# Or run individual POCs
npm run poc1  # DOMPurify
npm run poc2  # Validator.js
npm run poc3  # XSS Library
npm run poc4  # Sanitize-HTML
npm run poc5  # Escape-HTML
```

## 📋 Library Comparison

| Library | Best For | Security Rating | Use Case |
|---------|----------|----------------|----------|
| **DOMPurify** | Rich HTML content | ⭐⭐⭐⭐⭐ | CMS, blogs, WYSIWYG editors |
| **Validator.js** | Form validation | ⭐⭐⭐⭐ | User registration, API validation |
| **XSS** | XSS prevention | ⭐⭐⭐⭐⭐ | Custom security requirements |
| **Sanitize-HTML** | Complex HTML rules | ⭐⭐⭐⭐⭐ | Content management, news sites |
| **Escape-HTML** | Text-only display | ⭐⭐⭐⭐ | Comments, search queries |

## 🎯 When to Use What?

### 🔤 Use **Escape-HTML** when:
- You want to display user input as plain text only
- Simple comments system
- Search query display
- Error messages
- No HTML tags should be allowed

### ✅ Use **Validator.js** when:
- Validating form inputs (email, phone, URLs, etc.)
- Sanitizing simple text inputs
- API input validation
- Need comprehensive validation functions

### 🧹 Use **DOMPurify** when:
- Building rich text editors
- Content management systems
- Allowing safe HTML tags while preventing XSS
- Need browser and Node.js compatibility
- Industry-standard HTML sanitization

### 🛡️ Use **XSS Library** when:
- Need specialized XSS prevention
- Custom security requirements
- Fine-grained control over filtering
- Performance is critical

### 🎨 Use **Sanitize-HTML** when:
- Need maximum configuration flexibility
- Complex HTML sanitization rules
- Preserving semantic HTML structure
- Advanced tag transformation requirements

## 📁 File Structure

```
├── package.json              # Project dependencies and scripts
├── poc1-dompurify.js         # DOMPurify examples
├── poc2-validator.js         # Validator.js examples  
├── poc3-xss.js              # XSS library examples
├── poc4-sanitize-html.js    # Sanitize-HTML examples
├── poc5-escape-html.js      # Escape-HTML examples
├── test-all-pocs.js         # Test runner for all POCs
└── README.md                # This file
```

## 🔍 What Each POC Demonstrates

### POC #1: DOMPurify
- HTML sanitization with XSS prevention
- Custom configuration options
- Browser and Node.js usage
- Performance with large HTML content

### POC #2: Validator.js
- Email, URL, phone number validation
- Custom username validation rules
- Credit card number validation
- Text sanitization functions

### POC #3: XSS Library
- XSS attack vector prevention
- Custom filtering rules
- URL validation and transformation
- Performance optimization

### POC #4: Sanitize-HTML
- Rich HTML content sanitization
- Multiple configuration presets
- Advanced tag transformation
- Semantic HTML preservation

### POC #5: Escape-HTML
- Basic HTML character escaping
- Template integration examples
- Performance testing
- Common use case scenarios

## ⚠️ Security Best Practices

1. **Always validate input on the server side** - Never trust client-side validation alone
2. **Use HTTPS** - Prevent man-in-the-middle attacks
3. **Implement CSP headers** - Add Content Security Policy for additional protection
4. **Keep libraries updated** - Regularly update sanitization libraries
5. **Defense in depth** - Use multiple layers of protection
6. **Test thoroughly** - Test sanitization with various attack vectors

## 🛠️ Dependencies

All dependencies are automatically installed with `npm install`:

- `dompurify: ^3.0.8` - HTML sanitization
- `validator: ^13.11.0` - Input validation and sanitization  
- `xss: ^1.0.15` - XSS prevention
- `sanitize-html: ^2.12.1` - Configurable HTML sanitization
- `escape-html: ^1.0.3` - Basic HTML escaping
- `jsdom: ^24.0.0` - DOM implementation for server-side DOMPurify

## 📖 Additional Resources

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## 🤝 Contributing

Feel free to suggest improvements or add additional examples to the existing POCs!

## 📄 License

This project is licensed under the MIT License.