# 🧩 QR Maze Adventure ✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Qrious](https://img.shields.io/badge/Qrious.js-QR_Codes-blue?style=flat-square)](https://github.com/neocotic/qrious)

**Turn your name (or any text!) into a unique, playable maze game!**

QR Maze Adventure is a fun web application that generates a QR code from the text you enter and then uses that QR code's pattern to construct a challenging maze for you to navigate.

---

**[➡️ View Live Demo (Link to your deployed site here!) ⬅️]**

---

![Screenshot of QR Maze Adventure showing QR code and maze side-by-side](<./path/to/your/screenshot.png>)  
*(Replace the above line with an actual screenshot or GIF of your application)*

---

## 🚀 Features

*   **Text-to-QR:** Enter any text (like your name) to generate a unique QR code.
*   **QR-to-Maze:** Magically transforms the generated QR code's pattern into a playable maze grid.
*   **Interactive Gameplay:** Navigate the maze using Arrow Keys or WASD.
*   **Download QR:** Save the generated QR code as a PNG image.
*   **Start/Pause:** Control the game flow.
*   **Share Your Maze:** Easily share a link to the specific maze you generated via Twitter, Facebook, WhatsApp, or by copying the link.
*   **Responsive Design:** Looks great on both desktop and mobile devices thanks to Tailwind CSS.
*   **Visually Appealing:** Clean interface with subtle animations and loading indicators.

---

## 🤔 How It Works

1.  **Input:** You provide a string of text (e.g., "Pixel Explorer").
2.  **QR Generation:** The application uses the [Qrious.js](https://github.com/neocotic/qrious) library to generate a QR code representing that text. This QR code is displayed visually.
3.  **Maze Construction:** The core magic happens here! The application analyzes the pixel data (or module data) of the generated QR code. The black and white modules of the QR code are interpreted to define the walls and paths of the maze grid.
4.  **Rendering:** The maze is drawn onto an HTML Canvas element.
5.  **Gameplay:** JavaScript handles user input (keyboard events) to move a player character through the maze, checking for collisions with the walls derived from the QR code.
6.  **Sharing:** When you generate a maze, a unique URL can be created (potentially encoding the input text or maze data) that allows others to play the *exact* same maze.

---

## 🛠️ Technologies Used

*   **HTML5:** Structure of the web page.
*   **CSS3 & Tailwind CSS:** Styling and responsive design.
*   **Vanilla JavaScript:** Core application logic, DOM manipulation, game mechanics, and event handling.
*   **Qrious.js:** For generating QR codes dynamically on the client-side.
*   **HTML Canvas API:** For drawing and rendering the maze and handling game visuals.
*   **Font Awesome:** For icons.

---

## 🚦 Getting Started / Usage

No complex setup required!

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/qr-maze-adventure.git
    cd qr-maze-adventure
    ```
    *(Replace `your-username/qr-maze-adventure` with your actual repository path)*

2.  **Open `index.html`:** Simply open the `index.html` file in your favorite web browser.

That's it! You can now enter text, generate QR codes and mazes, and play.

---

## 📸 Screenshots

*(Add more screenshots here if desired, showing different aspects like gameplay, sharing, mobile view, etc.)*

**Example 1: Initial Screen**
![Screenshot of the initial input screen](<./path/to/your/screenshot_initial.png>)

**Example 2: Gameplay**
![Screenshot of the maze being played](<./path/to/your/screenshot_gameplay.png>)

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements, find a bug, or want to add new features:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please ensure your code follows the existing style and add comments where necessary.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information (if you have one, otherwise state it's MIT).

---

## 🙏 Acknowledgements

*   [Qrious.js](https://github.com/neocotic/qrious) for the excellent QR code generation library.
*   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
*   [Font Awesome](https://fontawesome.com/) for the icons.

---

Enjoy your QR Maze Adventure! 🎉