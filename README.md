# Game Dev Story - Combination Table

A web application that helps players find the best genre and type combinations for their games in Game Dev Story by Kairosoft.

## 🎮 Live Demo

Visit the live application: [https://[username].github.io/gds-combos/](https://[username].github.io/gds-combos/)

## ✨ Features

- **Combination Selector**: Interactive tool to select genre and type combinations and see their ratings
- **Full Matrix View**: Complete overview of all genre/type combinations with color-coded ratings
- **Unlock Manager**: Track which genres and types you've unlocked in your game
- **Local Storage**: Your unlock progress is saved locally in your browser
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[username]/gds-combos.git
cd gds-combos
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **CSS3** - Styling
- **GitHub Pages** - Hosting

## 📊 How to Use

### Combination Selector
1. Select a genre from the dropdown
2. Select a type from the dropdown
3. View the combination rating and details

### Full Matrix
- View all possible combinations in a grid format
- Ratings are color-coded (green = excellent, yellow = good, red = poor)
- Click on any cell to see detailed information

### Unlock Manager
- Check off genres and types as you unlock them in your game
- The matrix view will highlight combinations you can currently make
- Your progress is automatically saved

## 🎯 Rating System

- **S Rank (9-10)**: Excellent combinations - highest sales potential
- **A Rank (7-8)**: Very good combinations
- **B Rank (5-6)**: Good combinations
- **C Rank (3-4)**: Average combinations
- **D Rank (1-2)**: Poor combinations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Data and game mechanics from **Game Dev Story** by Kairosoft
- Community contributions for combination data accuracy

## 🐛 Bug Reports

If you find any bugs or have suggestions for improvements, please [open an issue](https://github.com/[username]/gds-combos/issues).
