# Playwright Automation Framework

## Overview

This project is developed using **Playwright with TypeScript** for automating UI and API test scenarios.

The framework follows the **Page Object Model (POM)** design pattern and includes environment configuration, reusable utilities, retry support, parallel execution, HTML reporting, and Allure reporting.

---

# Project Structure

```
config/
data/
pages/
tests/
utils/
.env.qa
.env.uat
playwright.config.ts
package.json
README.md
```

---

# Prerequisites

* Node.js
* npm

---

# Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Run Tests

Run all tests:

```bash
npm test
```

Run UI tests:

```bash
npm run test:ui
```

Run API tests:

```bash
npm run test:api
```

Run tests in headed mode:

```bash
npm run test:headed
```

---

# Reports

### Playwright HTML Report

```bash
npm run report
```

### Allure Report

Generate report:

```bash
npm run allure:generate
```

Open report:

```bash
npm run allure:open
```

Generate and open report:

```bash
npm run allure
```

---

# Features

* Page Object Model (POM)
* UI Automation
* API Automation
* Environment Configuration (.env)
* Parallel Execution
* Retry Mechanism
* HTML Report
* Allure Report
* Screenshot on Failure
* Video Recording on Failure
* Trace Collection on Retry

---

# Test Coverage

## UI Tests

### Login

* Valid Login
* Locked User
* Empty Username
* Empty Password
* Invalid Password
* Logout

### Inventory

* Verify Products
* Product Sorting
* Product Details Validation

### Cart

* Add Products
* Remove Products
* Cart Validation

### Checkout

* Complete Checkout
* Order Confirmation
* Price Validation
* Validation Error Handling

## API Tests

* GET User
* POST User
* PUT User
* DELETE User
* Login (Positive)
* Login (Negative)

---

# Environment

QA

```
ENV=qa
```

UAT

```
ENV=uat
```

Example:

```bash
ENV=qa npm test
```

---

# Author

Praveenkumar Raj
