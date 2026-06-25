# Selenium TypeScript Automation Framework

A maintainable and scalable Selenium automation framework built with TypeScript, Mocha, and Chai for [Automation Exercise](https://automationexercise.com/).

## 🚀 Getting Started

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/) (Recommended: Latest LTS).
- **Browsers**: Ensure you have Google Chrome and/or Mozilla Firefox installed.

### Installation

Before running any tests, install the project dependencies:

```powershell
npm install
```

## 🛠️ Running Tests

The framework supports multi-browser execution and headless mode.

### Chrome Execution
```powershell
# Standard mode
npm run test:chrome

# Headless mode (Recommended for CI/local background runs)
npm run test:chrome -- --headless
```

### Firefox Execution
```powershell
# Standard mode
npm run test:firefox

# Headless mode
npm run test:firefox -- --headless
```

## 📊 Reports & Screenshots

- **Test Report**: After execution, a detailed HTML report is generated in the `reports/` directory.
- **Screenshots**: If a test fails, a screenshot is automatically captured and saved in the `screenshots/` directory.

## 🏗️ Project Structure

- `src/pages/`: Page Object Model implementation.
- `src/tests/`: Test specs and failure capture hooks.
- `src/utils/`: Configuration, Logger, and Driver initialization.
- `package.json`: Dependency management and test scripts.
