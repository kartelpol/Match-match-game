var memory_array = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function(){
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
//var form =document.forms[0];
//var elem = form.elements.level;
function newBoard(){
	tiles_flipped = 0;
	var output = "";
	memory_array.memory_tile_shuffle();
	for(var i = 0; i<memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"><div class="back"></div><div class="front"></div></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
} 

function memoryFlipTile (tile, val){

	if( memory_values.length < 2){
		/*tile.innerHTML = '<div class="back"></div><div class="front"></div>';*/
		
		var back = tile.getElementsByClassName('back');
		back[0].style.background = 'url(img/alice/'+val+'.jpg)';
		back[0].style.cssText = 'transform: perspective(600px) rotateY(0deg)';
		
		var front =tile.getElementsByClassName('front');
		front[0].style.cssText ='transition: transform perspective(600px) rotateY(-180deg)';
		if(memory_values.length ==0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		}else if(memory_values.length === 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] === memory_values[1]){
				tiles_flipped += 2;
				memory_values = [];
				memory_tile_ids =[];
				if(tiles_flipped === memory_array.length){
					alert("won!!!");
					//document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}			
			}else {
				function flip2Back(){
					var tile_1 = document.getElementById(memory_tile_ids[0]);
					var tile_2 = document.getElementById(memory_tile_ids[1]);
					tile_1.style.background = 'url(img/bg1.jpg) no-repeat';
					tile_1.innerHTML="";								
					tile_2.style.background = 'url(img/bg1.jpg) no-repeat';
					tile_2.innerHTML="";
					memory_values = [];
					memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}