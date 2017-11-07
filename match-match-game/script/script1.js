(function(){
let values = [];
let pickedValues = [];
let pickedIds = [];
let flippedCards = 0;
let button = document.getElementsByTagName('button')[0];
 	eventListener = button.addEventListener('click', getParameters);
let timerId;
let min;
let sec;

Array.prototype.shuffle = function(){
		var i =this.length;
		var j;
		var temp;
		while(--i > 0){
			j=Math.floor(Math.random()*(i+1));
			temp = this[j];
			this[j] = this[i];
			this[i] = temp;
		}
}

 function getParameters(){
 	
 	let shorts = document.forms[0].elements["short"];
 	let bg;
 	for (let i=0; i<shorts.length; i++){
		if(shorts[i].checked){
			bg = shorts[i].value;
		}
	} 

	let levels = document.forms[0].elements["level"];
	let rows;
	let cols;
	for (let i=0; i<levels.length; i++){
		if(levels[i].checked){
			rows = levels[i].value.split(":")[0];
			cols = levels[i].value.split(":")[1];
		}
	} 
	
	fillTable(rows, cols, bg);	 
}

 function fillTable(r =2, c =4, bg){
 	while(document.getElementsByTagName('main')[0].firstElementChild){
 		document.getElementsByTagName('main')[0].firstElementChild.remove();
 	} 
 	let table = document.getElementsByTagName('main')[0].appendChild(document.createElement('table'));
	table.id = 'memory_board';

 	values = [];
 	pickedValues = [];
	pickedIds = [];
	flippedCards = 0;
	
 	for ( let j=1, i=0; i<r*c; i+=2, j++){
 		values[i] = j;
 		values[i+1] = values[i];
 	}

 	values.shuffle();  
 	let id =0;
 	let row;
 	let cell;
 	let front;
 	let back;
 	let wrap;
 	let eventListener;


 	for (let i=0; i<r; i++){
 		row = table.appendChild(document.createElement('tr')); 
 		for(let j=0; j<c; j++){
 			cell = row.appendChild(document.createElement('td'));
 			wrap = cell.appendChild(document.createElement('div'));
 			wrap.id = id;
 			wrap.className = 'flip';
 			front = wrap.appendChild(document.createElement('div'));
 			front.classList.add('front_side');
 			front.classList.add(bg);
 			back = wrap.appendChild(document.createElement('div'));
 			back.className = 'back_side'; 
 			back.style.backgroundImage = 'url(img/'+values[id]+'.jpg)';
 			eventListener = wrap.addEventListener('click', flipHandler);
 			id++;
 		}
 	}
 	
 	timer();

 };

function timer(){
	sec=document.getElementById('seconds');
	min=document.getElementById('minutes');	
	if(timerId) {
		clearInterval(timerId);
		min.textContent = '00';
		sec.textContent = '00';
	}
	let result=0;
	

	timerId = setInterval(function(){
								++result;
								
								if(result >= 60){
									if(Math.floor(result/60) < 10) min.textContent = '0'+Math.floor(result/60);
									else min.textContent = Math.floor(result/60);
									if(result%60 < 10) sec.textContent = '0'+result%60;
									else sec.textContent = result%60;
							}else{
								if(result<10) sec.textContent = '0'+result;
								else sec.textContent = result;
								}						
							}, 1000);
}

function flipHandler(){
	let context = this;
	let value = values[this.id];
	
	if(pickedValues.length === 2) return;

	context.style.pointerEvents = 'none';
	context.firstElementChild.style.transform = 'perspective(600px) rotateY(-180deg)';
	context.lastElementChild.style.transform = 'perspective(600px) rotateY(0deg)';
	context.lastElementChild.style.backgroundImage = 'url(img/"+value+".jpg)';
		
	pickedValues.push(value);
	pickedIds.push(context.id);

	if(pickedValues.length === 2){
		let previousCard = document.getElementById(pickedIds[0]);
		if(pickedValues[0] === pickedValues[1]){
			flippedCards+=2;
			previousCard.classList.add('disappearance');
			context.classList.add('disappearance');
			pickedIds = [];
			pickedValues = [];
			
			if(flippedCards === values.length){
				function gameOver(){
					clearInterval(timerId);
					let table = document.getElementById('memory_board');
					table.remove();
					let finishPage = document.getElementsByTagName('main')[0].appendChild(document.createElement('div'));
					document.getElementsByTagName('main')[0].style.position = 'relative';
					finishPage.appendChild(document.createElement('div')).textContent ='Congratulation!';
					finishPage.appendChild(document.createElement('div')).textContent ='Your speed is '+min.textContent+' minutes '+sec.textContent+' seconds';
					finishPage.classList.add('finishPage');
				}
				setTimeout(gameOver, 1000);
		} 
			
	}else{
			function flipBack(){
				previousCard.firstElementChild.style.transform = 'perspective(600px) rotateY(0deg)';
				previousCard.lastElementChild.style.transform = 'perspective(600px) rotateY(180deg)';	
				previousCard.lastElementChild.style.backgroundImage = 'url(img/'+pickedValues[0]+'.jpg)';
				previousCard.style.pointerEvents = 'auto';

				context.firstElementChild.style.transform = 'perspective(600px) rotateY(0deg)';
				context.lastElementChild.style.transform = 'perspective(600px) rotateY(180deg)';
				context.lastElementChild.style.backgroundImage = 'url(img/'+value+'.jpg)';
				context.style.pointerEvents = 'auto';
				pickedIds = [];
				pickedValues = [];
		}
		setTimeout(flipBack, 700);
	}		
	} 
}
})()
