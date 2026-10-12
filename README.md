# Tech Lynx Hub — The Sky Gen Project 02

A responsive, single-page business landing page for a proposed software development and IT consulting agency that also promotes practical learning for aspiring developers.

## Project links

- **Live website:** Add the deployed Vercel or Netlify URL here after deployment.
- **GitHub repository:** Add the public repository URL here after publishing the source code.

## Business concept

Tech Lynx Hub is a modern Software Development and IT Consulting Agency concept focused on helping businesses turn ideas into practical digital solutions while creating learning opportunities for young developers. The proposed service offering includes web development, custom software solutions, UI/UX design, mobile application development, IT consulting, and developer training and mentorship. This landing page introduces the concept, presents illustrative pricing plans and sample testimonials, answers common questions, and provides a contact form interface.

## Project structure

```text
tsg-webdev-p02-EhtishamMushtaq/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── .gitignore
└── README.md
```

## Technology stack

- **HTML5** — semantic page structure and accessible form controls.
- **CSS3** — custom brand styling, responsive layouts, transitions, and reduced-motion support.
- **Bootstrap 5.3.8** — responsive grid and utilities loaded through the official CDN.
- **Vanilla JavaScript** — mobile menu, active section highlighting, testimonial slider, FAQ accordion, contact form validation, and dynamic copyright year.
- **Unsplash** — Hero photograph with responsive image sources and photographer credit.
- **Google Maps embed** — illustrative country-level reference, not a verified office address.

## Features

- Sticky navigation with a responsive mobile menu.
- Hero section with a responsive Unsplash image, `srcset`, `sizes`, explicit dimensions, and high fetch priority.
- Six responsive service cards.
- Three illustrative pricing plans, with Growth highlighted as the recommended example.
- Three-slide testimonial slider with previous/next controls, indicator dots, and keyboard arrow support.
- Six-question single-open FAQ accordion.
- Contact form with client-side validation feedback.
- Responsive Google Maps iframe with lazy loading.
- Final call-to-action and responsive footer.
- Skip-to-content link and visible keyboard focus styles.
- Layout rules for desktop, tablet, mobile, and narrow screens.

## Run locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the VS Code Live Server extension, or open it directly in a browser.
4. Keep an internet connection available for Bootstrap, Unsplash, and Google Maps resources.

No npm installation or build step is required for this static website.

## Quality checks

Test the page in Chrome at these viewport sizes:

- Mobile: `390 × 844`
- Tablet: `768 × 1024`
- Desktop: `1440 × 900`
- Additional narrow-screen check: `320px` wide

Check the browser Console, all internal navigation links, the mobile menu, the testimonial slider, FAQ accordion, contact form feedback, and Google Maps loading. Run Lighthouse on the deployed website and record the actual scores in the final submission; do not claim scores that have not been measured.

## Important demonstration notes

- Testimonials are illustrative sample content, not verified customer reviews.
- Pricing values are demonstration examples, not confirmed market rates or commercial offers.
- The map shows Pakistan as a regional reference; it does not identify a verified Tech Lynx Hub office.
- The contact form validates entered data in the browser only. It is not connected to an email provider, API, or backend and does not send or store messages.
- Tech Lynx Hub is presented as a business concept for this internship project; this page does not prove that an operating agency or particular services are currently available.

These disclosures should remain unless the corresponding information is verified and the form is connected to a real message-delivery service.

## Unsplash photo credit

Hero photo: **Bayu Syaits**, “Laptop and phone on a desk with coding software open,” [Unsplash photo page](https://unsplash.com/photos/laptop-and-phone-on-a-desk-with-coding-software-open-oYzjGQ7LCVE), [photographer profile](https://unsplash.com/@bayusyaits).

## Deployment settings

This project is a static website. The project root is the folder containing `index.html`.

- **Build command:** None required.
- **Publish/output directory:** Project root (`.`) for a static-host configuration that asks for a publish directory.
- **Entry file:** `index.html`.