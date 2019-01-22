# Scrapatron

Scrapatron is a tool that "scrapes" aka bulk downloads various assets from a target URL. The moral and legal implications of scraping should not be discussed / connected with this tool - this is merely a utility.

**Options**

    -u (or --url) is required and expects a valid starting point URL

**Usage**

    npm start -- --u https://www.myexampleurl.com

**Roadmap:**

- Implement image scraper
- Unit tests for image scraper
- Implement arbitrary content scraper
- Unit tests for arbitrary content scraper
- Implement URL navigator
- Unit tests for URL navigator
- Implement different output strategies (per type, per URL)
- Unit tests

**Hooks:**

- pre-commit hook is active. TSC must pass.

