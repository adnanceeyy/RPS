
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading-page').classList.add('hidden');
            }, 1000);
        });

        function opengame() {
            document.getElementById('loading-page').classList.remove('hidden');
            document.getElementById('loading-text').textContent = 'Starting Game...';
            
            document.getElementById("opbtn").style.display = "none";
            document.getElementById("himage").style.display = "none";
            
            setTimeout(() => {
                document.getElementById("offdiv").style.display = "flex";
                document.getElementById("exlayer").style.display = "block";
                document.getElementById('loading-page').classList.add('hidden');
                document.getElementById('loading-text').textContent = 'Loading...';
            }, 1000);
        }
// ================================================================================================
        const choices = ["rock", "paper", "scissor"];
        const choiceToImage = {
            "rock": "rock.png",
            "paper": "pappar.png",
            "scissor": "scisser.png"
        };
        let humanScore = 0;
        let aiScore = 0;
        let clickcounts = 0;

        function updateClickCount() {
    clickcounts++;
    document.getElementById("clickcound").textContent = clickcounts;
}


        document.getElementById("rock").addEventListener("click", () => {
            showPlayerChoice("rock");
            playGame("rock");
            updateClickCount();
        });
        document.getElementById("pepar").addEventListener("click", () => {
            showPlayerChoice("paper");
            playGame("paper");
            updateClickCount();
        });
        document.getElementById("scissor").addEventListener("click", () => {
            showPlayerChoice("scissor");
            playGame("scissor");
            updateClickCount();
        });


        document.addEventListener("keydown", (event) => {
    if (document.getElementById("offdiv").style.display === "flex") {
        switch (event.key.toLowerCase()) {
            case "z":
                showPlayerChoice("rock");
                playGame("rock");
                updateClickCount();
                break;
            case "x":
                showPlayerChoice("paper");
                playGame("paper");
                updateClickCount();
                break;
            case "v":
                showPlayerChoice("scissor");
                playGame("scissor");
                updateClickCount();
                break;
        }
    }
});

        function showPlayerChoice(playerChoice) {
            document.getElementById("hresult").src = choiceToImage[playerChoice];
            document.querySelectorAll(".opimages").forEach(img => img.classList.remove("selected"));
            document.getElementById(playerChoice === "paper" ? "pepar" : playerChoice === "scissor" ? "scissor" : "rock").classList.add("selected");
        }

        function playGame(playerChoice) {
            const aiChoice = choices[Math.floor(Math.random() * 3)];
            setTimeout(() => {
                updateAIChoice(aiChoice);
                const result = determineWinner(playerChoice, aiChoice);
                updateResult(result);
                updateScores(result);
                document.querySelectorAll(".opimages").forEach(img => img.classList.remove("selected"));
            }, 100);
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
                resultImg.src = "you-lose.png";
            } else if (result === "tie") {
                resultImg.src = "tie.png";
            }
        }

        function updateScores(result) {
            if (result === "win") {
                humanScore++;
                document.getElementById("result").style.display = "block";
                document.getElementById("resultlost").style.display = "none";
                document.getElementById("draw").style.display = "none";
                document.querySelector(".manmark").textContent = humanScore;
            } else if (result === "lose") {
                aiScore++;
                document.querySelector(".aimark").textContent = aiScore;
                document.getElementById("resultlost").style.display = "block";
                document.getElementById("result").style.display = "none";
                document.getElementById("draw").style.display = "none";

            }
            else if (result === "tie"){
                document.getElementById("resultlost").style.display = "none";
                document.getElementById("result").style.display = "none";
                document.getElementById("draw").style.display = "block";

            }
            if (humanScore >= 10 || aiScore >= 10) {
                const winnerBox = document.getElementById("winner-box");
                const winnerText = document.getElementById("winner-text");
                winnerText.textContent = humanScore >= 10 ? "You Win!" : "AI Wins!";
                winnerBox.style.display = "block";
                document.querySelectorAll(".opimages").forEach(img => img.style.pointerEvents = "none");
            }
        }

        function selectResetMatch() {
            humanScore = 0;
            aiScore = 0;
            clickcounts = 0;
            document.querySelector(".manmark").textContent = "0";
            document.querySelector(".aimark").textContent = "0";
            document.getElementById("clickcound").textContent = "0";
            document.getElementById("hresult").src = "rock.png";
            document.getElementById("airesult").src = "rock.png";
            document.getElementById("result").src = "you-win.png";
            document.getElementById("resultlost").style.display = "none";
            document.getElementById("result").style.display = "none";
            document.querySelectorAll(".opimages").forEach(img => img.classList.remove("selected"));
            
            document.getElementById("winner-box").style.display = "none";
            document.querySelectorAll(".opimages").forEach(img => img.style.pointerEvents = "auto");
            
            document.getElementById("offdiv").style.display = "none";
            document.getElementById("exlayer").style.display = "none";
            document.getElementById("opbtn").style.display = "flex";
            document.getElementById("himage").style.display = "block";
        }