
        // Loading page script for initial page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading-page').classList.add('hidden');
            }, 2000); // 2-second delay for initial loading page
        });

        // Modified opengame function to show loading page on button click
        function opengame() {
            // Show loading page
            document.getElementById('loading-page').classList.remove('hidden');
            document.getElementById('loading-text').textContent = 'Starting Game...'; // Update text for button click
            
            // Hide main page elements immediately
            document.getElementById("opbtn").style.display = "none";
            document.getElementById("himage").style.display = "none";
            
            // Show game page after a short delay
            setTimeout(() => {
                document.getElementById("offdiv").style.display = "flex";
                document.getElementById("exlayer").style.display = "block";
                // Hide loading page
                document.getElementById('loading-page').classList.add('hidden');
                // Reset loading text for next use
                document.getElementById('loading-text').textContent = 'Loading...';
            }, 1000); // 1-second delay for loading animation
        }

        const choices = ["rock", "paper", "scissor"];
        const choiceToImage = {
            "rock": "rock.png",
            "paper": "pappar.png",
            "scissor": "scisser.png"
        };
        let humanScore = 0;
        let aiScore = 0;

        // Event listeners for options
        document.getElementById("rock").addEventListener("click", () => {
            showPlayerChoice("rock");
            playGame("rock");
        });
        document.getElementById("pepar").addEventListener("click", () => {
            showPlayerChoice("paper");
            playGame("paper");
        });
        document.getElementById("scissor").addEventListener("click", () => {
            showPlayerChoice("scissor");
            playGame("scissor");
        });

        // Immediately show player's choice in the big result box on click
        function showPlayerChoice(playerChoice) {
            document.getElementById("hresult").src = choiceToImage[playerChoice];
            // Optional: Highlight the selected option image (add a CSS class for styling, e.g., scale or border)
            document.querySelectorAll(".opimages").forEach(img => img.classList.remove("selected"));
            document.getElementById(playerChoice === "paper" ? "pepar" : playerChoice === "scissor" ? "scissor" : "rock").classList.add("selected");
        }

        function playGame(playerChoice) {
            const aiChoice = choices[Math.floor(Math.random() * 3)];
            // AI choice will be shown after a short delay for effect (optional)
            setTimeout(() => {
                updateAIChoice(aiChoice);
                const result = determineWinner(playerChoice, aiChoice);
                updateResult(result);
                updateScores(result);
                // Remove highlight after game round
                document.querySelectorAll(".opimages").forEach(img => img.classList.remove("selected"));
            }, 100); // 0.5 second delay to show player's choice first
        }

        function updateAIChoice(aiChoice) {
            document.getElementById("airesult").src = choiceToImage[aiChoice];
        }

        function determineWinner(player, ai) {
            if (player === ai) return "tie";
            if (
                (player === "rock" && ai === "scissor") ||
                (player === "paper" && ai === "rock") ||
                (player === "scissor" && ai === "paper")
            ) {
                return "win";
            }
            return "lose";
        }

        function updateResult(result) {
            const resultImg = document.getElementById("result");
            if (result === "win") {
                resultImg.src = "you-win.png";
            } else if (result === "lose") {
                resultImg.src = "you-lose.png"; // Ensure this image exists
            } else {
                resultImg.src = "tie.png"; // Ensure this image exists
            }
        }

        function updateScores(result) {
            if (result === "win") {
                humanScore++;
                document.getElementById("result").style.display = "block";
                document.getElementById("resultlost").style.display = "none";
                document.querySelector(".manmark").textContent = humanScore;
            } else if (result === "lose") {
                aiScore++;
                document.querySelector(".aimark").textContent = aiScore;
                document.getElementById("resultlost").style.display = "block";
                document.getElementById("result").style.display = "none";
            }
            else{
                document.getElementById("resultlost").style.display = "none";
                document.getElementById("result").style.display = "none";
            }
            if (humanScore >= 10 || aiScore >= 10) {
                const winnerBox = document.getElementById("winner-box");
                const winnerText = document.getElementById("winner-text");
                winnerText.textContent = humanScore >= 10 ? "You Win!" : "AI Wins!";
                winnerBox.style.display = "block";
                // Disable game options to prevent further clicks
                document.querySelectorAll(".opimages").forEach(img => img.style.pointerEvents = "none");
            }
            // Ties don't increment scores
        }

        function selectResetMatch() {
            // Reset scores
            humanScore = 0;
            aiScore = 0;
            document.querySelector(".manmark").textContent = "0";
            document.querySelector(".aimark").textContent = "0";
            document.getElementById("hresult").src = "rock.png"; // Reset to default
            document.getElementById("airesult").src = "rock.png";
            document.getElementById("result").src = "you-win.png";
            document.getElementById("resultlost").style.display = "none";
            document.getElementById("result").style.display = "none";
            document.querySelectorAll(".opimages").forEach(img => img.classList.remove("selected"));
            
            // Hide winner box and re-enable game options
            document.getElementById("winner-box").style.display = "none";
            document.querySelectorAll(".opimages").forEach(img => img.style.pointerEvents = "auto");
            
            // Return to initial interface
            document.getElementById("offdiv").style.display = "none";
            document.getElementById("exlayer").style.display = "none";
            document.getElementById("opbtn").style.display = "flex";
            document.getElementById("himage").style.display = "block";
        }