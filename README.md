# CrUX Backend

A modern web application for analyzing and visualizing Chrome User Experience Report (CrUX) data for multiple URLs. This dashboard helps you monitor and compare key web performance metrics across different webpages.

Frontend is deployed on [https://crux-frontend-flame.vercel.app/](https://crux-frontend-flame.vercel.app/)

## Features

- **Bulk URL Analysis**: Input multiple URLs to analyze their performance metrics simultaneously
- **Key Performance Metrics**:
  - LCP (Largest Contentful Paint)
  - FCP (First Contentful Paint)
  - CLS (Cumulative Layout Shift)
  - INP (Interaction to Next Paint)
  - TTFB (Time to First Byte)
- **Interactive Data Table**:
  - Sortable columns for each metric
  - Filter results by URL
  - Toggle visibility of specific metrics
  - Hide error entries
- **Modern UI**: Built with Material-UI for a clean and responsive interface

## Tech Stack

- Node.js
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dwivedi-gaurav/crux-backend.git
   cd crux-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. Enter one or more URLs in the text area (one URL per line)
2. Click "Fetch CrUX Data" to retrieve performance metrics
3. Use the filters to:
   - Toggle specific metrics on/off
   - Filter results by URL
   - Hide error entries
4. Sort the data by clicking on column headers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
