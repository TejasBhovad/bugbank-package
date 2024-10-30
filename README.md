# BugBank npm package

This is a npm package that provides a simple API to interact with the BugBank, our bug tracking system.

## Installation

To install the package, run the following command:

```bash
npm install bugbank
```

## Usage

```javascript
import bugbankClient from "bugbank";
```

```javascript
bugbankClient.setKey(process.env.BUGBANK_SECRET);
```

```javascript
bugbankClient.sendReport(title, description, image_urls);
```
