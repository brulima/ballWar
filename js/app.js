var putChar = function(ball, chars){
	var value = chars[parseInt(Math.random()*13)]
	ball.innerHTML = "<p>" + value + "</p>";
}, 
createBall = function(player) {
	var ball = document.createElement('div');
	ball.className = "ball ballPlayer" + player.number.toString() + player.points;
	ball.style.border = (player.points*10) + "px solid " + player.color;
	ball.style.animation = "animationBall" + parseInt(Math.random()*3) + " " + ((20-player.points >= 1) ? 20-player.points : 1) + "s linear 0s infinite alternate";
	ball.style['-webkit-animation'] = "animationBall" + parseInt(Math.random()*3) + " " + ((20-player.points >= 1) ? 20-player.points : 1) + "s linear 0s infinite alternate";
	ball.style['background-color'] = player.color;
	document.getElementById('war-field').appendChild(ball);
	putChar(ball, player.chars);
}, 
win = function(player) {
	document.getElementsByTagName('body')[0].style['background-color'] = player.color.replace(".7", "1");
	document.getElementById('war-field').innerHTML = 
		'<p class="win">Jogador ' + player.number + ' venceu!</p>' + 
		'<p class="playagain"><a id="again" href="http://brulima.github.io/ballWar/jogar">Jogar novamente</a></p>' +
		'<p class="playagain">Created by <a id="portfolio" href="http://brulima.github.io/">Bruna Lima</a></p>';
		;
	ga('send', 'event', 'ballWar', 'finish', 'player' + player.number, 100);
	document.getElementById('portfolio').addEventListener('mousedown', function() {
		ga('send', 'event', 'ballWar', 'Portfolio', 'Clique');
	});
	document.getElementById('again').addEventListener('mousedown', function() {
		ga('send', 'event', 'ballWar', 'Jogar Novamente', 'Clique');
	});
}, 
Player = function(number, chars, color){
	this.points = 0;
	this.chars = chars;
	this.color = color;
	this.number = number;
	this.sumPoints = 0;
	createBall(this);
}, 
player1 = new Player("1", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"], "rgba(255, 0, 71, .7)"),
player2 = new Player("2", ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], "rgba(71, 0, 255, .7)")
playerList = [player1, player2];
document.addEventListener("keypress", function(key){
	var i = playerList.length;
	while(i--){
		var points = playerList[i].points,
			ball = document.querySelector(".ballPlayer" + playerList[i].number + points + " p");
		if (ball.innerHTML === (String.fromCharCode(key.keyCode)).toUpperCase()){
			document.getElementsByClassName("ballPlayer" + playerList[i].number + points)[0].innerHTML = "";
			playerList[i].points++;
			points++;
			createBall(playerList[i]);

			if (points <= 10) playerList[i].sumPoints += points;
			else if (points <= 16) playerList[i].sumPoints += (points + 1);
			else if (points <= 20) playerList[i].sumPoints += (points + 2);
			else if (points <= 25) playerList[i].sumPoints += (points + 3);
			else if (points <= 30) playerList[i].sumPoints += (points + 5);
			else if (points <= 36) playerList[i].sumPoints += (points + 7);
			else if (points <= 39) playerList[i].sumPoints += (points + 8);
			else if (points == 40) {
				playerList[i].sumPoints += 100;
				win(playerList[i]);
			}
			document.getElementById('player' + playerList[i].number + "BarField").style.width = (playerList[i].sumPoints/10) + "%";
			document.getElementById('player' + playerList[i].number + "Points").innerHTML = playerList[i].sumPoints;
			ga('send', 'event', 'ballWar', 'Jogada_Player' + i, points, playerList[i].sumPoints);
		}
	}
});