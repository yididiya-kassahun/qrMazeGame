document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const generateBtn = document.getElementById("generateBtn");
  const loadingIndicator = document.getElementById("loading");
  const qrDisplayCanvas = document.getElementById("qrCanvasVisible");
  const qrOffscreenCanvas = document.getElementById("qrCanvasOffscreen");
  const mazeCanvas = document.getElementById("mazeCanvas");
  const gameContainer = document.getElementById("game-container");
  const overlayMessage = document.getElementById("overlay-message");
  const mazeCtx = mazeCanvas.getContext("2d");
  const qrOffscreenCtx = qrOffscreenCanvas.getContext("2d");
  const qrDisplayCtx = qrDisplayCanvas.getContext("2d");
  const shareContainer = document.getElementById("share-container");
  const shareTwitter = document.getElementById("share-twitter");
  const shareFacebook = document.getElementById("share-facebook");
  const shareWhatsapp = document.getElementById("share-whatsapp");
  const copyLinkBtn = document.getElementById("copy-link-btn");
  const copyFeedback = document.getElementById("copy-feedback");
  const startGameBtn = document.getElementById("startGameBtn");
  const pauseGameBtn = document.getElementById("pauseGameBtn");
  const downloadQrBtn = document.getElementById("downloadQrBtn");

  const MAZE_DIMENSION = 21;
  const CELL_SIZE = Math.floor(mazeCanvas.width / MAZE_DIMENSION); 
  mazeCanvas.width = CELL_SIZE * MAZE_DIMENSION; 
  mazeCanvas.height = CELL_SIZE * MAZE_DIMENSION;
  const WALL_COLOR_DARK = "#333333";
  const WALL_COLOR_LIGHT = "#cccccc";
  const PATH_COLOR = "#f0f0f0";
  const PLAYER_COLOR = "#3498db"; 
  const START_COLOR = "#2ecc71"; 
  const END_COLOR = "#e74c3c"; 
  const QR_CODE_SIZE = 200;
  const SHADE_PERCENT = 15; 
  const WALL_BORDER_THICKNESS = Math.max(1, Math.floor(CELL_SIZE * 0.08)); 

  // --- Game State ---
  let mazeGrid = [];
  let playerPos = { r: 1, c: 1 };
  let endPos = { r: MAZE_DIMENSION - 2, c: MAZE_DIMENSION - 2 };
  let qrImageData = null;
  let gameActive = false;
  let gamePaused = false;
  let gameOver = false;
  let currentMazeName = "";
  let countdownInterval = null;
  let canStartGame = false;

  // --- Color Helper Functions ---
  function lightenColor(hex, percent) {
    hex = hex.replace(/^\s*#|\s*$/g, "");
    if (hex.length == 3) {
      hex = hex.replace(/(.)/g, "$1$1");
    }
    let r = parseInt(hex.substr(0, 2), 16),
      g = parseInt(hex.substr(2, 2), 16),
      b = parseInt(hex.substr(4, 2), 16);
    percent = percent / 100;
    r = Math.min(255, Math.floor(r * (1 + percent)));
    g = Math.min(255, Math.floor(g * (1 + percent)));
    b = Math.min(255, Math.floor(b * (1 + percent)));
    return (
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0")
    );
  }
  function darkenColor(hex, percent) {
    hex = hex.replace(/^\s*#|\s*$/g, "");
    if (hex.length == 3) {
      hex = hex.replace(/(.)/g, "$1$1");
    }
    let r = parseInt(hex.substr(0, 2), 16),
      g = parseInt(hex.substr(2, 2), 16),
      b = parseInt(hex.substr(4, 2), 16);
    percent = percent / 100;
    r = Math.max(0, Math.floor(r * (1 - percent)));
    g = Math.max(0, Math.floor(g * (1 - percent)));
    b = Math.max(0, Math.floor(b * (1 - percent)));
    return (
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0")
    );
  }
  
  generateBtn.addEventListener("click", handleGenerateMaze);
  copyLinkBtn.addEventListener("click", handleCopyLink);
  document.addEventListener("keydown", handleKeyDown);
  startGameBtn.addEventListener("click", startGame);
  pauseGameBtn.addEventListener("click", pauseGame);
  downloadQrBtn.addEventListener("click", downloadQrCode);
  checkForUrlParams();
  updateButtonStates();

  function updateButtonStates() {
    /* ... */
  }

  function startGame() {
    /* ... */
  }
  function pauseGame() {
    /* ... */
  }

  function checkForUrlParams() {
    /* ... */
  }

  async function handleGenerateMaze() {
    /* ... */
  }

  function showOverlay(visible, message = "", isWin = false) {
    /* ... */
  }

  function startCountdown() {
    /* ... */
  }

  function generateQrCode(text) {
    /* ... */
  }

  function generateMazeGrid() {
    /* ... */
  }
  function getUnvisitedNeighbors(r, c) {
    /* ... */
  }


  function drawMaze() {
    mazeCtx.clearRect(0, 0, mazeCanvas.width, mazeCanvas.height);

    for (let r = 0; r < MAZE_DIMENSION; r++) {
      for (let c = 0; c < MAZE_DIMENSION; c++) {
        const x = c * CELL_SIZE;
        const y = r * CELL_SIZE;

        if (mazeGrid[r][c] === 1) {
          // wall
          const baseColor = getQrBasedColor(r, c);
          const shadowColor = darkenColor(baseColor, SHADE_PERCENT);
          const highlightColor = lightenColor(baseColor, SHADE_PERCENT);

          // base wall color
          mazeCtx.fillStyle = baseColor;
          mazeCtx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

          // "3D" borders based on adjacent paths
          mazeCtx.beginPath(); 

        
          if (r > 0 && mazeGrid[r - 1][c] === 0) {
            mazeCtx.fillStyle = shadowColor;
            mazeCtx.fillRect(x, y, CELL_SIZE, WALL_BORDER_THICKNESS);
          }
        
          if (c > 0 && mazeGrid[r][c - 1] === 0) {
            mazeCtx.fillStyle = shadowColor;
            mazeCtx.fillRect(x, y, WALL_BORDER_THICKNESS, CELL_SIZE);
          }
        
          if (r < MAZE_DIMENSION - 1 && mazeGrid[r + 1][c] === 0) {
            mazeCtx.fillStyle = highlightColor;
            mazeCtx.fillRect(
              x,
              y + CELL_SIZE - WALL_BORDER_THICKNESS,
              CELL_SIZE,
              WALL_BORDER_THICKNESS
            );
          }
        
          if (c < MAZE_DIMENSION - 1 && mazeGrid[r][c + 1] === 0) {
            mazeCtx.fillStyle = highlightColor;
            mazeCtx.fillRect(
              x + CELL_SIZE - WALL_BORDER_THICKNESS,
              y,
              WALL_BORDER_THICKNESS,
              CELL_SIZE
            );
          }
          mazeCtx.closePath();
        } else {
      
          mazeCtx.fillStyle = PATH_COLOR;
          mazeCtx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
      }
    }

   
    mazeCtx.fillStyle = START_COLOR;
    mazeCtx.fillRect(1 * CELL_SIZE, 1 * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    mazeCtx.fillStyle = END_COLOR;
    mazeCtx.fillRect(
      endPos.c * CELL_SIZE,
      endPos.r * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }

  
  function getQrBasedColor(mazeRow, mazeCol) {
    /* ... */
  }


  function drawPlayer() {
    /* ... */
  }

  function handleKeyDown(e) {
    /* ... */
  }


  function setupShareLinks(name) {
    /* ... */
  }
  async function handleCopyLink() {
    /* ... */
  }

  
  function downloadQrCode() {
    /* ... */
  }


  function updateButtonStates() {
    downloadQrBtn.disabled = !qrImageData;
    if (
      gameOver ||
      !mazeGrid.length ||
      loadingIndicator.classList.contains("hidden") === false
    ) {
      startGameBtn.disabled = true;
      pauseGameBtn.disabled = true;
    } else if (gameActive) {
      startGameBtn.disabled = true;
      pauseGameBtn.disabled = false;
    } else if (gamePaused) {
      startGameBtn.disabled = false;
      pauseGameBtn.disabled = true;
    } else if (canStartGame) {
      startGameBtn.disabled = false;
      pauseGameBtn.disabled = true;
    } else {
      startGameBtn.disabled = true;
      pauseGameBtn.disabled = true;
    }
  }
  function startGame() {
    if (canStartGame || gamePaused) {
      gameActive = true;
      gamePaused = false;
      canStartGame = false;
      console.log("Game Started / Resumed");
      showOverlay(false);
      updateButtonStates();
    }
  }
  function pauseGame() {
    if (gameActive) {
      gameActive = false;
      gamePaused = true;
      canStartGame = false;
      console.log("Game Paused");
      showOverlay(true, "Paused");
      updateButtonStates();
    }
  }
  function checkForUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get("name");
    if (nameFromUrl) {
      try {
        const decodedName = decodeURIComponent(nameFromUrl);
        nameInput.value = decodedName;
        console.log(`Name "${decodedName}" found in URL, generating maze...`);
        setTimeout(handleGenerateMaze, 50);
      } catch (e) {
        console.error("Error decoding name from URL:", e);
        nameInput.value = "";
      }
    }
  }
  async function handleGenerateMaze() {
    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter a name!");
      return;
    }
    currentMazeName = name;
    console.log("Resetting game state for generation...");
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    showOverlay(false);
    loadingIndicator.classList.remove("hidden");
    generateBtn.disabled = true;
    shareContainer.classList.add("hidden");
    copyFeedback.classList.add("hidden");
    gameOver = false;
    gameActive = false;
    gamePaused = false;
    canStartGame = false;
    mazeGrid = [];
    qrImageData = null;
    qrDisplayCtx.clearRect(0, 0, qrDisplayCanvas.width, qrDisplayCanvas.height);
    mazeCtx.clearRect(0, 0, mazeCanvas.width, mazeCanvas.height);
    updateButtonStates();
    try {
      console.log("Generating QR Code...");
      await generateQrCode(name);
      console.log("Generating Maze Grid...");
      generateMazeGrid();
      console.log("Drawing Maze...");
      drawMaze();
      playerPos = { r: 1, c: 1 };
      drawPlayer();
      loadingIndicator.classList.add("hidden");
      setupShareLinks(name);
      shareContainer.classList.remove("hidden");
      console.log("Starting countdown...");
      startCountdown();
    } catch (error) {
      console.error("Error during maze generation process:", error);
      alert(
        "Could not generate the maze. Please check the console for details."
      );
      loadingIndicator.classList.add("hidden");
      generateBtn.disabled = false;
      updateButtonStates();
    }
  }
  function showOverlay(visible, message = "", isWin = false) {
    if (visible) {
      overlayMessage.textContent = message;
      overlayMessage.style.display = "flex";
      if (isWin) {
        overlayMessage.classList.add("win-message");
      } else {
        overlayMessage.classList.remove("win-message");
      }
    } else {
      overlayMessage.style.display = "none";
      overlayMessage.textContent = "";
      overlayMessage.classList.remove("win-message");
    }
  }
  function startCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    let count = 3;
    canStartGame = false;
    gameActive = false;
    gamePaused = false;
    showOverlay(true, count);
    updateButtonStates();
    countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        showOverlay(true, count);
      } else if (count === 0) {
        showOverlay(true, "Go!");
      } else {
        clearInterval(countdownInterval);
        countdownInterval = null;
        showOverlay(false);
        canStartGame = true;
        gameActive = false;
        gamePaused = false;
        generateBtn.disabled = false;
        updateButtonStates();
        console.log("Countdown finished. Press Start to play.");
      }
    }, 1000);
  }
  function generateQrCode(text) {
    qrImageData = null;
    updateButtonStates();
    return new Promise((resolve, reject) => {
      try {
        console.log("QRious: Creating QR for:", text);
        const qrOptions = {
          element: qrOffscreenCanvas,
          value: text,
          size: QR_CODE_SIZE,
          level: "L",
          padding: 0,
          foreground: "black",
          background: "white",
        };
        const qr = new QRious(qrOptions);
        console.log("QRious: QR drawn to offscreen canvas.");
        qrDisplayCanvas.width = qr.size;
        qrDisplayCanvas.height = qr.size;
        qrDisplayCtx.drawImage(qrOffscreenCanvas, 0, 0);
        console.log("QRious: Copied QR to visible canvas.");
        qrImageData = qrOffscreenCtx.getImageData(0, 0, qr.size, qr.size);
        console.log(
          "QRious: Extracted image data.",
          qrImageData ? "Success" : "Failed"
        );
        updateButtonStates();
        resolve();
      } catch (err) {
        console.error(
          "QRious generation or image data extraction failed:",
          err
        );
        qrImageData = null;
        updateButtonStates();
        reject(err);
      }
    });
  }
  function generateMazeGrid() {
    mazeGrid = Array(MAZE_DIMENSION)
      .fill(0)
      .map(() => Array(MAZE_DIMENSION).fill(1));
    const stack = [];
    const startR = 1,
      startC = 1;
    mazeGrid[startR][startC] = 0;
    stack.push({ r: startR, c: startC });
    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = getUnvisitedNeighbors(current.r, current.c);
      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        const wallR = current.r + (next.r - current.r) / 2;
        const wallC = current.c + (next.c - current.c) / 2;
        mazeGrid[wallR][wallC] = 0;
        mazeGrid[next.r][next.c] = 0;
        stack.push(next);
      } else {
        stack.pop();
      }
    }
    mazeGrid[1][1] = 0;
    mazeGrid[endPos.r][endPos.c] = 0;
  }
  function getUnvisitedNeighbors(r, c) {
    const neighbors = [];
    const directions = [
      { dr: -2, dc: 0 },
      { dr: 2, dc: 0 },
      { dr: 0, dc: -2 },
      { dr: 0, dc: 2 },
    ];
    for (const dir of directions) {
      const nr = r + dir.dr;
      const nc = c + dir.dc;
      if (
        nr > 0 &&
        nr < MAZE_DIMENSION - 1 &&
        nc > 0 &&
        nc < MAZE_DIMENSION - 1 &&
        mazeGrid[nr][nc] === 1
      ) {
        neighbors.push({ r: nr, c: nc });
      }
    }
    return neighbors;
  }

  function getQrBasedColor(mazeRow, mazeCol) {
   
    if (!qrImageData) {
    
      return WALL_COLOR_DARK;
    }

    
    const qrX = Math.floor((mazeCol / MAZE_DIMENSION) * qrImageData.width);
    const qrY = Math.floor((mazeRow / MAZE_DIMENSION) * qrImageData.height);


    const clampedX = Math.max(0, Math.min(qrX, qrImageData.width - 1));
    const clampedY = Math.max(0, Math.min(qrY, qrImageData.height - 1));

   
    const index = (clampedY * qrImageData.width + clampedX) * 4;

  
    const r = qrImageData.data[index];

    
    const brightness = r; 

    if (brightness < 128) {
     
      return WALL_COLOR_DARK; 
    } else {

      return WALL_COLOR_LIGHT; 
    }
  }

  function drawPlayer() {
    const x = playerPos.c * CELL_SIZE;
    const y = playerPos.r * CELL_SIZE;
    mazeCtx.fillStyle = PLAYER_COLOR;
    const padding = CELL_SIZE * 0.1;
    const size = CELL_SIZE * 0.8;
    mazeCtx.fillRect(x + padding, y + padding, size, size);
  }
  function handleKeyDown(e) {
    if (!gameActive || gameOver || !mazeGrid.length) {
      return;
    }
    let newR = playerPos.r;
    let newC = playerPos.c;
    let moved = false;
    switch (e.key) {
      case "ArrowUp":
      case "w":
        newR--;
        moved = true;
        break;
      case "ArrowDown":
      case "s":
        newR++;
        moved = true;
        break;
      case "ArrowLeft":
      case "a":
        newC--;
        moved = true;
        break;
      case "ArrowRight":
      case "d":
        newC++;
        moved = true;
        break;
    }
    if (moved) {
      e.preventDefault();
      if (
        newR >= 0 &&
        newR < MAZE_DIMENSION &&
        newC >= 0 &&
        newC < MAZE_DIMENSION &&
        mazeGrid[newR][newC] === 0
      ) {
        playerPos.r = newR;
        playerPos.c = newC;
        drawMaze();
        drawPlayer();
        if (playerPos.r === endPos.r && playerPos.c === endPos.c) {
          console.log("Player reached the end!");
          gameOver = true;
          gameActive = false;
          gamePaused = false;
          canStartGame = false;
          showOverlay(true, "You Won! 🎉", true);
          updateButtonStates();
        }
      }
    }
  }
  function setupShareLinks(name) {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?name=${encodeURIComponent(name)}`;
    const shareText = `Check out this QR Code Maze I generated for "${name}"! Try to solve it:`;
    shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    shareWhatsapp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
  }
  async function handleCopyLink() {
    if (!currentMazeName) {
      console.warn("No current maze name to generate share link.");
      return;
    }
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?name=${encodeURIComponent(currentMazeName)}`;
    if (!navigator.clipboard) {
      alert("Clipboard access not available.");
      console.warn("navigator.clipboard API not supported/available.");
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      console.log("Link copied to clipboard:", shareUrl);
      copyFeedback.classList.remove("hidden");
      setTimeout(() => {
        copyFeedback.classList.add("hidden");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link to clipboard: ", err);
      alert("Failed to copy the link automatically.");
    }
  }
  function downloadQrCode() {
    if (!qrDisplayCanvas || !currentMazeName) {
      console.error(
        "Cannot download QR: Canvas reference or current maze name is missing."
      );
      alert("Cannot download QR code. Please generate a maze first.");
      return;
    }
    if (qrDisplayCanvas.width <= 0 || qrDisplayCanvas.height <= 0) {
      console.error("Cannot download QR: Canvas has no dimensions or content.");
      alert("Cannot download QR code. The QR image seems empty.");
      return;
    }
    try {
      const link = document.createElement("a");
      const sanitizedName = currentMazeName
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      link.download = `qrcode_${sanitizedName || "maze"}.png`;
      link.href = qrDisplayCanvas.toDataURL("image/png");
      link.click();
      console.log("QR Code download initiated as:", link.download);
    } catch (e) {
      console.error("Error generating data URL or triggering download:", e);
      alert("Could not prepare the QR code for download.");
    }
  }
}); 
