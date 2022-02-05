import "./style.css";
import * as p5 from "p5";

let circles = [];
const colors = ["#FF6700", "#7CEA9C", "#F1D302", "#3A6EA5", "#004E98"];

const getRandomPosition = (size) => {
  return Math.round(size * Math.random());
};

const isOutOfBounds = (position, windowSize) => {
  return position <= 0 || position >= windowSize;
};

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomDir = () => {
  const random = Math.random();
  if (random < 0.5) {
    return "positive";
  } else {
    return "negative";
  }
};

const shouldChangeDir = () => {
  return Math.random() < 0.005;
};

let s = (sk) => {
  sk.setup = () => {
    sk.createCanvas(sk.windowWidth, sk.windowHeight);
    sk.frameRate(30);
  };

  sk.draw = () => {
    if (circles.length < 500) {
      // Add a new circle
      const x = getRandomPosition(sk.windowWidth);
      const y = getRandomPosition(sk.windowHeight);
      circles.push({
        x,
        y,
        xDir: getRandomDir(),
        yDir: getRandomDir(),
        color: getRandomColor(),
      });
    }

    // Move all circles
    circles = circles.map((circle) => {
      let nextX = 0;
      let nextXDir = circle.xDir;
      let nextColor = circle.color;
      if (isOutOfBounds(circle.x, sk.windowWidth)) {
        nextX = getRandomPosition(sk.windowWidth);
        nextColor = getRandomColor();
      } else {
        if (shouldChangeDir()) {
          nextXDir = circle.xDir === "positive" ? "negative" : "positive";
        }

        if (nextXDir === "positive") {
          nextX = circle.x + 1;
        } else {
          nextX = circle.x - 1;
        }
      }

      let nextY = 0;
      let nextYDir = circle.yDir;
      if (isOutOfBounds(circle.y, sk.windowWidth)) {
        nextY = getRandomPosition(sk.windowWidth);
        nextColor = getRandomColor();
      } else {
        if (shouldChangeDir()) {
          nextYDir = circle.yDir === "positive" ? "negative" : "positive";
        }

        if (nextYDir === "positive") {
          nextY = circle.y + 1;
        } else {
          nextY = circle.y - 1;
        }
      }

      return {
        x: nextX,
        y: nextY,
        xDir: nextXDir,
        yDir: nextYDir,
        color: nextColor,
      };
    });

    sk.clear();

    circles.forEach((circle) => {
      sk.fill(circle.color);
      sk.noStroke();
      sk.ellipse(circle.x, circle.y, 20, 20);
    });
  };
};

const P5 = new p5(s);
