var field,
		coordSnake,
		mouse,
		snake,
		interval,
		score,
		direction = 'right';

function randIntExcep(min, max, exp) {
			var n;
			while(true){
					if((n = Math.floor(Math.random() * (max - min + 1)) + min) != exp)
					return n;
			}
}

function startGame(){
	genField();
	createSnake();
	createMouse();
	interval = setInterval(move, 70);
	startBlock.classList.add('disable');
}

function endGame(){
	score = (snake.length - 3);
	alert('You lose. Score:' + score);
	clearInterval(interval);
	field.remove();
	document.getElementById("highscore").textContent = score;
	startBlock.classList.remove('disable');
}

function genField(){

	field  = document.createElement('div');
	document.body.appendChild(field);
	field.classList.add('field');

	for (let i=0; i<2501; i++){
		let excel = document.createElement('div');
		field.appendChild(excel);
		excel.classList.add('excel'); 
	}

	var x = 1,
			y = 50;

	for	(let i=0; i<2501; i++){
		if (x>50){
			x = 1;
			y--;
		}
		let excel = document.getElementsByClassName('excel');
		excel[i].setAttribute('posX', x);
		excel[i].setAttribute('posY', y);
		x++;
	}
}

function createSnake(){
	function genSnake(){
		let posX = Math.round(Math.random() * (50 - 3) + 3);
		let posY = Math.round(Math.random() * (50 - 1) + 1);
		return [posX, posY];
	}
	
	coordSnake = genSnake();
	snake = [document.querySelector('[posX = "' + coordSnake[0] + '"][posY = "' + coordSnake[1] + '"]'),
							 document.querySelector('[posX = "' + (coordSnake[0]-1) + '"][posY = "' + coordSnake[1] + '"]'),
							 document.querySelector('[posX = "' + (coordSnake[0]-2) + '"][posY = "' + coordSnake[1] + '"]')];
	
	for (i=0; i<snake.length; i++){
		snake[i].classList.add('excel-snake');
	}
	
	snake[0].classList.add('head');
}

function createMouse(){
	function genMouse(){
		let posX = randIntExcep((50-1), 1, coordSnake[0]);
		let posY = randIntExcep((50-1), 1, coordSnake[1]);
		return[posX, posY];
	}
	
	let coordMouse = genMouse();
	mouse = [document.querySelector('[posX = "' + coordMouse[0] + '"][posY = "' + coordMouse[1] + '"]')]
	
	mouse[0].classList.add('mouse')
}

function move(){
	let snakeCoord = [snake[0].getAttribute('posX'), snake[0].getAttribute('posY')];
	snake[0].classList.remove('head');
	snake[snake.length - 1].classList.remove('excel-snake');
	snake.pop();

	if (direction == 'right'){
		if(snakeCoord[0] < 50){
			snake.unshift(document.querySelector('[posX = "' + (+snakeCoord[0] + 1) + '"][posY = "' + snakeCoord[1] + '"]'));
		} else {
			snake.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoord[1] + '"]'));
		}
	} else if (direction == 'left'){
		if(snakeCoord[0] > 1){
			snake.unshift(document.querySelector('[posX = "' + (+snakeCoord[0] - 1) + '"][posY = "' + snakeCoord[1] + '"]'));
		} else {
			snake.unshift(document.querySelector('[posX = "50"][posY = "' + snakeCoord[1] + '"]'));
		}
	} else if (direction == 'up'){
		if(snakeCoord[1] < 50){
			snake.unshift(document.querySelector('[posX = "' + snakeCoord[0] + '"][posY = "' + (+snakeCoord[1]+  1) + '"]'));
		} else {
			snake.unshift(document.querySelector('[posX = "' + snakeCoord[0] + '"][posY = "1"]'));
		}
	} else if (direction == 'down'){
		if(snakeCoord[1] > 1){
			snake.unshift(document.querySelector('[posX = "' + snakeCoord[0] + '"][posY = "' + (+snakeCoord[1] - 1) + '"]'));
		} else {
			snake.unshift(document.querySelector('[posX = "' + snakeCoord[0] + '"][posY = "50"]'));
		}
	}

	if (snake[0].getAttribute('posX') == mouse[0].getAttribute('posX') &&
		  snake[0].getAttribute('posY') == mouse[0].getAttribute('posY')){
		
				mouse[0].classList.remove('mouse');

				let x = snake[snake.length - 1].getAttribute('posX');
				let y = snake[snake.length - 1].getAttribute('posY');
				snake.push(document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]'));
				
				yourScore.textContent = (snake.length - 3); 

				createMouse();
	}

	if (snake[0].classList.contains('excel-snake')){
		endGame();
	}

	snake[0].classList.add('head');
	for (i=0; i < snake.length; i++) {
		snake[i].classList.add('excel-snake');
	}


}



start.onclick = function(e) {
	startGame();
}



window.addEventListener('keydown', function(e){ 
	if (e.keyCode == 37 && direction != 'right'){
		direction = 'left';
	} else if (e.keyCode == 38 && direction != 'down'){
		direction = 'up';
	}	else if (e.keyCode == 39 && direction != 'left'){
		direction = 'right';
	} else if (e.keyCode == 40 && direction != 'up'){
		direction = 'down';	
	}
})


