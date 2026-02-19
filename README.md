# 🌟 Çağatay Gürses — Professional Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## ✨ Features

- **Responsive Design**: Fully responsive layout across desktop, tablet, and mobile
- **Modern UI/UX**: Clean, professional design with smooth transitions
- **Interactive Elements**: 
  - Animated typing effect in hero section
  - Smooth scrolling navigation
  - Dynamic scroll indicators
  - Hover effects on cards and buttons
  - Mobile-friendly hamburger menu
- **Sections**:
  - Hero with animated introduction
  - About Me with profile details
  - Skills & Expertise showcased in categories
  - Professional Experience timeline
  - Education & Certifications
  - Featured Projects portfolio
  - Contact form with social links
- **Performance Optimized**: Lightweight, fast-loading experience
- **SEO Friendly**: Semantic HTML and essential meta tags

## 🚀 Getting Started

### Prerequisites

You only need a modern web browser to run this website.

### Installation

1. **Clone or download this repository**:
   ```bash
   git clone https://github.com/cagataygurses/cagatay-gurses.git
   ```

2. **Navigate to the project folder**:
   ```bash
   cd cagatay-gurses
   ```

3. **Open the website**:
   - Simply double-click on `index.html` to open it in your default browser
   - Or right-click and choose "Open with" your preferred browser

### Using a Local Server (Recommended)

For the best experience, especially when testing, use a local server:

**Option 1: Using Python**
```bash
# Python 3
python3 -m http.server 8000
```

**Option 2: Using Node.js (http-server)**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000
```

**Option 3: Using VS Code Live Server**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then open: `http://localhost:8000`

## 📝 Customization Guide

### 1. Personal Information

Update profile details in `index.html`:

- **Name**: Search for "Çağatay Gürses" and update as needed
- **Professional Title**: Update the typing text array in `script.js`:
  ```javascript
  const texts = [
      'Your Title 1',
      'Your Title 2',
      // ... add more
  ];
  ```
- **Profile Image**: Replace the profile image source in the About section
- **Contact Information**: Update email, phone, location in the Contact section
- **Social Links**: Update all social links (LinkedIn, GitHub, etc.)

### 2. Content Sections

**About Section**:
- Update the about text paragraphs
- Modify location, languages, and other info items

**Skills Section**:
- Edit skill categories and tags
- Add or remove skill categories as needed

**Experience Section**:
- Update job titles, companies, dates
- Modify job descriptions and achievements
- Add or remove timeline items

**Education Section**:
- Update degrees, universities, dates
- Modify certifications list

**Projects Section**:
- Replace project images (use your own or from free sources)
- Update project titles, descriptions, and technologies
- Add links to live projects or GitHub repos

### 3. Styling & Colors

Customize the color scheme in `styles.css`:

```css
:root {
    --primary-color: #2563eb;     /* Main brand color */
    --secondary-color: #10b981;   /* Accent color */
    --accent-color: #f59e0b;      /* Highlight color */
    /* ... modify other colors */
}
```

### 4. Images

Replace placeholder images:
- **Profile Photo**: Add your photo to the project folder and update the `<img>` src
- **Project Images**: Add project screenshots (recommended size: 600x400px)
- **Optimized formats**: Use WebP or optimized JPG/PNG for better performance

### 5. Contact Form

The contact form currently shows a success message. To make it functional:

1. **Use a Form Service** (Recommended):
   - [Formspree](https://formspree.io/): Easy integration
   - [Netlify Forms](https://www.netlify.com/products/forms/): If hosting on Netlify
   - [EmailJS](https://www.emailjs.com/): Free email service

2. **Example with Formspree**:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
       <!-- form fields -->
   </form>
   ```

3. **Or implement your own backend** using Node.js, PHP, or other technologies

## 🌐 Deployment

### Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/cagataygurses/cagatay-gurses.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Select the main branch and root folder
5. Your site will be live at `https://cagataygurses.github.io/cagatay-gurses/`

### Deploy to Netlify

1. Sign up at [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder
3. Your site is live instantly!
4. Optionally, connect your GitHub repo for automatic deployments

### Deploy to Vercel

1. Sign up at [Vercel](https://vercel.com/)
2. Install Vercel CLI: `npm i -g vercel`
3. Run: `vercel` in your project folder
4. Follow the prompts

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive features
- **Font Awesome**: Icons
- **Google Fonts**: Poppins font family

## 📄 File Structure

```
cagatay-gurses/
├── index.html          # Main HTML file
├── styles.css          # All styles and responsive design
├── script.js           # Interactive JavaScript features
└── README.md           # This file
```

## 🎨 Color Scheme

- **Primary Blue**: #2563eb - Main brand color
- **Secondary Green**: #10b981 - Success and accent
- **Accent Orange**: #f59e0b - Highlights
- **Dark Background**: #0f172a - Dark sections
- **Light Background**: #f8fafc - Light sections

## ⚡ Performance Tips

1. **Optimize Images**: Use compressed images (TinyPNG, ImageOptim)
2. **Lazy Loading**: Images load as users scroll
3. **Minify CSS/JS**: Use online minifiers before production
4. **Use CDN**: Font Awesome and fonts load from CDN for speed

## 🤝 Contributing

Feel free to fork this project and adapt it to your own portfolio needs.

## 📧 Contact

If you have questions or collaboration ideas, feel free to reach out:
- Email: cgtygrss@gmail.com
- LinkedIn: [Çağatay Gürses](https://linkedin.com/in/cagataygurses)

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎯 Next Steps

1. ✅ Update all personal information
2. ✅ Replace placeholder images with your own
3. ✅ Customize colors to match your brand
4. ✅ Add your real projects and achievements
5. ✅ Set up contact form with a service
6. ✅ Deploy to your preferred hosting platform
7. ✅ Share your portfolio with the world!

---

**Made with ❤️ by Çağatay Gürses**

*Last Updated: November 2025*
