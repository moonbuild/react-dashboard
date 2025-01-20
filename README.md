# Multi-Language Dashboard with Infinite Query and APIs

## Overview
A React dashboard featuring:
- **Graphs** populated with data from a public API.
- **Table** with paginated data and infinite scrolling using React Query.
- **State Management** via Zustand.
- **Multi-language support** using `react-i18next`.

## APIs
- **Table API**: `GET https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10`
- **Graph API**: `GET https://dummyjson.com/users`

## Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/moonbuild/react-dashboard.git
   cd react-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```

## Features

- **Graphs**: Displayed with data fetched from the API (e.g., bar/pie charts).
- **Table**: Paginated with infinite scrolling powered by React Query.
- **State Management**: Zustand handles user preferences.
- **Localization**: Supports English and Spanish with `react-i18next`.


## License
GNU3 Apache
