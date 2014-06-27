var createBall = function(player) {
	var ball = document.createElement('div');
	ball.className = "ball ballPlayer" + player.number.toString() + player.points;
	ball.style.border = (player.points*10) + "px solid " + player.color;
	ball.style.animation = "animationBall" + parseInt(Math.random()*3) + " " + ((20-player.points >= 1) ? 20-player.points : 1) + "s linear 0s infinite alternate";
	ball.style['-webkit-animation'] = "animationBall" + parseInt(Math.random()*3) + " " + ((20-player.points >= 1) ? 20-player.points : 1) + "s linear 0s infinite alternate";
	ball.style['background-color'] = player.color;
	document.getElementById('war-field').appendChild(ball);
	var value = player.chars[parseInt(Math.random()*13)]
	ball.innerHTML = "<p>" + value + "</p>";
}, 
win = function(player) {
	document.getElementsByTagName('body')[0].style['background-color'] = player.color.replace(".7", "1");
	document.getElementById('war-field').innerHTML = '<p id="win">Jogador ' + player.number + ' venceu!</p>';
	ga('send', 'event', 'ballWar', 'finish', 'player' + player.number);
}, 
Player = function(number, chars, color){
	this.points = 0;
	this.chars = chars;
	this.color = color;
	this.number = number;
	this.sumPoints = 0;
	createBall(this);
},
checkKeypress = function(player, key) {
	var ball = document.querySelector(".ballPlayer" + player.number + player.points + " p");
	if (ball.innerHTML === (String.fromCharCode(key.keyCode)).toUpperCase()){
		document.querySelector(".ballPlayer" + player.number + player.points).innerHTML = "";
		player.points++;
		if (player.points !== 40){
			createBall(player);
		}

		if (player.points <= 10) player.sumPoints += player.points;
		else if (player.points <= 16) player.sumPoints += (player.points + 1);
		else if (player.points <= 20) player.sumPoints += (player.points + 2);
		else if (player.points <= 25) player.sumPoints += (player.points + 3);
		else if (player.points <= 30) player.sumPoints += (player.points + 5);
		else if (player.points <= 36) player.sumPoints += (player.points + 7);
		else if (player.points <= 39) player.sumPoints += (player.points + 8);
		else if (player.points === 40) {
			player.sumPoints += 100;
			win(player);
		}
		document.getElementById('player'+player.number+"BarField").style.width = (player.sumPoints/10)+"%";
		document.getElementById('player'+player.number+"Points").innerHTML = player.sumPoints;
	}
}
player1 = new Player("1", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"], "rgba(255, 0, 71, .7)"),
player2 = new Player("2", ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], "rgba(71, 0, 255, .7)")
playerList = [player1, player2];
document.addEventListener("keypress", function(key){
	var i = playerList.length;
	while(i--){
		checkKeypress(playerList[i], key);
	}
});