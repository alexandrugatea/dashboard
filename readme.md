# 📊 Dashboard Project

A **Webpack-powered** dashboard project featuring **inline JavaScript and CSS**, optimized asset handling, and a structured build process.

## 🚀 Features

- **Webpack 5** with development and production configurations
- **Inline JavaScript and CSS** for improved performance
- **Babel** for JavaScript transpilation
- **SCSS** support with PostCSS and Autoprefixer
- **Asset management** for images and fonts
- **Live-reloading development server**
- **Prettier** for automatic code formatting

---

## 📥 Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd dashboard
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

---

## 🛠 Usage

### 🔧 Development Mode

To start the development server with hot-reloading:

```sh
npm run dev
```

This launches `webpack serve` on port **3399** and watches for file changes.

### 📦 Production Build

To generate a production-ready build:

```sh
npm run build
```

This compiles and optimizes assets into the `build` folder.

### 🧹 Cleaning the Project

To remove the `build` folder, `node_modules`, and `package-lock.json`:

```sh
npm run clear
```

### ✨ Formatting Code

To format JavaScript, SCSS, HTML, and JSON files:

```sh
npm run format
```

---

## 📂 Project Structure

```
/dashboard
├── src/               # Source files
│   ├── js/           # JavaScript files
│   ├── scss/         # SCSS styles
│   ├── images/       # Image assets
│   ├── fonts/        # Font assets
│   ├── index.html    # Main HTML file
│   ├── icons.html    # Icons HTML file (dev mode only)
├── build/            # Compiled output (generated after build)
├── webpack.config.js # Webpack configuration
├── package.json      # Project metadata & dependencies
├── .gitignore        # Ignored files
├── README.md         # Documentation
```

---

## 📌 Dependencies

### 🛠 Development Dependencies

- `webpack`, `webpack-cli`, `webpack-dev-server`
- `babel-loader`, `@babel/core`, `@babel/preset-env`
- `sass-loader`, `css-loader`, `style-loader`, `mini-css-extract-plugin`
- `html-webpack-plugin`, `html-inline-css-webpack-plugin`
- `terser-webpack-plugin`
- `prettier` (for formatting)

---

## 📢 Notes

- JavaScript and CSS are **inlined** in production builds.
- Development mode includes `icons.html` (excluded in production builds).
- Images and fonts are copied to the `build` folder if they exist.

---

## 👤 Author

**Alexandru Gatea**

## 📜 License

ISC

