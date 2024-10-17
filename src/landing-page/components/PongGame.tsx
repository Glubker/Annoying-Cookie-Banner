import { useEffect, useRef } from 'react';

// @ts-ignore
export default function PongGame({ completeCaptcha }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalRef = useRef<HTMLDivElement>(null); // Reference to the modal container
  const paddleHeight = 100;
  const paddleWidth = 10;
  const ballRadius = 10;

  // const playerY = useRef(0); // Removed unused variable
  const opponentY = useRef(0); // For the opponent paddle
  const ballX = useRef(200);
  const ballY = useRef(200);
  const ballSpeedX = useRef(4);
  const ballSpeedY = useRef(4);
  const ballSpeedIncrease = useRef(1.1); // Gradual speed increase
  const paddleY = useRef(0);

  const opponentScore = useRef(0);
  const playerScore = useRef(0);

  // Handle mouse movement to control the player's paddle
  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      const mouseY = e.clientY - rect.top - root.scrollTop;
      paddleY.current = mouseY - paddleHeight / 2;
    }
  };

  // Adjust canvas size based on the modal container
  const adjustCanvasSize = () => {
    const canvas = canvasRef.current;
    const modal = modalRef.current;
    if (canvas && modal) {
      canvas.width = modal.offsetWidth;
      canvas.height = modal.offsetHeight;

      // Reset ball position to the center of the resized canvas
      ballX.current = canvas.width / 2;
      ballY.current = canvas.height / 2;
    }
  };

  // Calculate dynamic bounce angle based on where the ball hits the paddle
  const calculateBallBounce = (paddleY: number, ballY: number) => {
    const paddleCenter = paddleY + paddleHeight / 2;
    const distanceFromCenter = ballY - paddleCenter;
    const normalizedDistance = distanceFromCenter / (paddleHeight / 2); // Normalize between -1 and 1
    const maxBounceAngle = Math.PI / 4; // 45 degrees max
    return normalizedDistance * maxBounceAngle;
  };

  const resetGame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      ballX.current = canvasWidth / 2;
      ballY.current = canvasHeight / 2;
      ballSpeedX.current = 4; // Reset speed
      ballSpeedY.current = 4;
    }
  }

  // Ball and paddle movement logic
  const moveEverything = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Ball movement
      ballX.current += ballSpeedX.current;
      ballY.current += ballSpeedY.current;

      // Ball collision with top and bottom walls
      if (ballY.current < 0 || ballY.current > canvasHeight) {
        ballSpeedY.current = -ballSpeedY.current; // Reverse Y direction
      }

      // Ball collision with player's paddle
      const paddleTop = paddleY.current;
      const paddleBottom = paddleTop + paddleHeight;

      if (
        ballX.current - ballRadius < paddleWidth && // Check if ball is within range of the paddle width
        ballY.current > paddleTop && // Ball is within paddle vertical range
        ballY.current < paddleBottom
      ) {
        const bounceAngle = calculateBallBounce(paddleY.current, ballY.current);
        const ballSpeed = Math.sqrt(ballSpeedX.current ** 2 + ballSpeedY.current ** 2);
        ballSpeedX.current = ballSpeed * Math.cos(bounceAngle) * -1; // Adjust X speed based on angle and reverse direction
        ballSpeedY.current = ballSpeed * Math.sin(bounceAngle); // Adjust Y speed based on angle
        ballSpeedX.current *= -1; // Reverse X direction after hitting the paddle

        // Gradually increase speed for more challenge
        ballSpeedX.current *= ballSpeedIncrease.current;
        ballSpeedY.current *= ballSpeedIncrease.current;
      }

      // Ball collision with opponent's paddle
      const opponentTop = opponentY.current;
      const opponentBottom = opponentTop + paddleHeight;

      if (
        ballX.current + ballRadius > canvasWidth - paddleWidth && // Check if ball is within range of the opponent's paddle width
        ballY.current > opponentTop && // Ball is within opponent paddle vertical range
        ballY.current < opponentBottom
      ) {
        const bounceAngle = calculateBallBounce(opponentY.current, ballY.current);
        const ballSpeed = Math.sqrt(ballSpeedX.current ** 2 + ballSpeedY.current ** 2);
        ballSpeedX.current = ballSpeed * Math.cos(bounceAngle); // Adjust X speed based on angle
        ballSpeedY.current = ballSpeed * Math.sin(bounceAngle); // Adjust Y speed based on angle
        ballSpeedX.current *= -1; // Reverse X direction after hitting the paddle

        // Gradually increase speed for more challenge
        ballSpeedX.current *= ballSpeedIncrease.current;
        ballSpeedY.current *= ballSpeedIncrease.current;
      }

      // Reset ball when it passes the left or right edge (misses paddle)
      if (ballX.current < 0) {
        opponentScore.current += 1;
        resetGame();
      }

      if (ballX.current > canvasWidth) {
        playerScore.current += 1;
        resetGame();
      }

      // Move opponent paddle (simple AI)
      const opponentCenter = opponentY.current + paddleHeight / 2;
      if (opponentCenter < ballY.current - 35) {
        opponentY.current += 4; // Move paddle down
      } else if (opponentCenter > ballY.current + 35) {
        opponentY.current -= 4; // Move paddle up
      }
    }
  };

  // Render game objects (paddles, ball)
  const drawEverything = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (ctx && canvas) {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw center line
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 15]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw player's paddle
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, paddleY.current, paddleWidth, paddleHeight);

      // Draw opponent's paddle
      const opponentX = canvas.width - paddleWidth;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(opponentX, opponentY.current, paddleWidth, paddleHeight);

      // Draw ball
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ballX.current, ballY.current, ballRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw Text
      ctx.font = '24px Arial, sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Score 5 points to continue', canvas.width / 2, 50);

      ctx.fillText('Player: ' + playerScore.current.toString(), 75, 50);
      ctx.fillText('Opponent: ' + opponentScore.current.toString(), canvas.width - 100, 50);
    }
  };

  // Main game loop
  const gameLoop = () => {
    moveEverything();
    drawEverything();
    requestAnimationFrame(gameLoop);

    if (playerScore.current >= 5) {
      completeCaptcha();
    }
  };

  // Set up the game and event listeners
  useEffect(() => {
    // Adjust canvas size on load and when the window is resized
    adjustCanvasSize();
    window.addEventListener('resize', adjustCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);

    requestAnimationFrame(gameLoop); // Start the game loop

    return () => {
      window.removeEventListener('resize', adjustCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>

      <div ref={modalRef} className="relative w-[70vw] h-[70vh] animate-fade-in">
        <canvas ref={canvasRef} className="bg-gray-800" />
      </div>
    </>
  );
}
