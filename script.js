var field,			
		mouse,
		snake,
		interval,
		score,
		direction = 'right',
		pause = false;

function startGame(){
	game.classList.remove('disable');														
	genField();																									
	createSnake();																							
	createMouse();	
	
	//choice a hard
	if (easy.checked) {
		interval = setInterval(move, 100);	
	} else if (medium.checked) {
		interval = setInterval(move, 60);
	} else if (hard.checked) {
		interval = setInterval(move, 40);
	}
	


	startBlock.classList.add('disable');												
}

function endGame(){
	score = (snake.length - 3);				
	alert('You lose. Score:' + score);
	clearInterval(interval);
	field.remove();
	document.getElementById("highscore").textContent = score;		
	yourScore.textContent = 0;
	startBlock.classList.remove('disable');
	game.classList.add('disable');
}

function genField(){

	// generation a field
	field  = document.createElement('div');
	document.body.appendChild(field);
	field.classList.add('field');

	let score  = document.createElement('div');
	field.appendChild(score);
	score.classList.add('score');

	// generation a 1250 excels
	for (let i=0; i<1250; i++){
		let excel = document.createElement('div');
		field.appendChild(excel);
		excel.classList.add('excel'); 
	}

	var x = 1,
			y = 25;

	// set excel coordination
	for	(let i=0; i<1250; i++){
		// transfer excel x on a new line
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

	// generation a random coordination of snake
	function genSnake(){
		let posX = Math.round(Math.random() * (50 - 3) + 3);
		let posY = Math.round(Math.random() * (25 - 1) + 1);
		return [posX, posY];
	}

	//create snake
	let coordSnake = genSnake();
	snake = [document.querySelector('[posX = "' + coordSnake[0] + '"][posY = "' + coordSnake[1] + '"]'),
							 document.querySelector('[posX = "' + (coordSnake[0]-1) + '"][posY = "' + coordSnake[1] + '"]'),
							 document.querySelector('[posX = "' + (coordSnake[0]-2) + '"][posY = "' + coordSnake[1] + '"]')];
	
	for (i=0; i<snake.length; i++){
		snake[i].classList.add('excel-snake');
	}

	//gen a snake head
	snake[0].classList.add('head');
}

function createMouse(){

	// generation a random coordination of snake
	function genMouse(){
		let posX = Math.round(Math.random() * (50 - 1) + 1);
		let posY = Math.round(Math.random() * (25 - 1) + 1);
		return[posX, posY];
	}
	
	// create mouse
	let coordMouse = genMouse();
	mouse = [document.querySelector('[posX = "' + coordMouse[0] + '"][posY = "' + coordMouse[1] + '"]')];
	
	// if mouse creating on snake
	while(mouse[0].classList.contains('excel-snake')){
		let coordMouse = genMouse();	
		mouse = [document.querySelector('[posX = "' + coordMouse[0] + '"][posY = "' + coordMouse[1] + '"]')];
	}

	mouse[0].classList.add('mouse')
}

function move(){

	//snake moving
	if (!pause){
		let snakeCoord = [snake[0].getAttribute('posX'), snake[0].getAttribute('posY')]; //coordination of snake head 
		snake[0].classList.remove('head');	//clear head 
		snake[snake.length - 1].classList.remove('excel-snake'); //clear tail
		snake.pop();
	

	// button movement, if snake beyond the limits, than snake becomeon the start line
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
		if(snakeCoord[1] < 25){
			snake.unshift(document.querySelector('[posX = "' + snakeCoord[0] + '"][posY = "' + (+snakeCoord[1]+  1) + '"]'));
		} else {
			snake.unshift(document.querySelector('[posX = "' + snakeCoord[0] + '"][posY = "1"]'));
		}
	} else if (direction == 'down'){
		if(snakeCoord[1] > 1){
			snake.unshift(document.querySelector('[posX = "' + snakeCoord[0] + '"][posY = "' + (+snakeCoord[1] - 1) + '"]'));
		} else {
			snake.unshift(document.querySelector('[posX = "' + snakeCoord[0] + '"][posY = "25"]'));
		}
	}



	//snake eat mouse
	if (snake[0].getAttribute('posX') == mouse[0].getAttribute('posX') &&
		  snake[0].getAttribute('posY') == mouse[0].getAttribute('posY')){
		
				mouse[0].classList.remove('mouse');

				let x = snake[snake.length - 1].getAttribute('posX');
				let y = snake[snake.length - 1].getAttribute('posY');
				snake.push(document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]'));
				
				yourScore.textContent = (snake.length - 3); 	//update score

				createMouse();
	}
	//snake eat tail
	if (snake[0].classList.contains('excel-snake')){
		endGame();
	}

	//rise snake
	snake[0].classList.add('head');
	for (i=0; i < snake.length; i++) {
		snake[i].classList.add('excel-snake');
	}

	}
}

// press "Start" for play a game
start.onclick = function(e) {
	startGame();	
}



// move button 
window.addEventListener('keydown', function(e){ 
	if (e.keyCode == 37 && direction != 'right'){
		direction = 'left';
	} else if (e.keyCode == 38 && direction != 'down') {
		direction = 'up';
	}	else if (e.keyCode == 39 && direction != 'left') {
		direction = 'right';
	} else if (e.keyCode == 40 && direction != 'up') {
		direction = 'down';	
	} 
	if (e.keyCode == 32 && !pause){
		pause = true;
		field.classList.add('field-pause')
	} else if (e.keyCode == 32 && pause){
		pause = false;
		field.classList.remove('field-pause')
	}
})


