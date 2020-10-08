'use strict';
var cloud_x = 10;
var cloud_y = 100;
var cloud_width = 420;
var cloud_height = 270;
var gap = 10;
var gap_between = 50;
var font_gap = 16;
var text_width = 40;
var bar_height = 150;
var score_y = 100;
var graphY = score_y - 10;
var text_position = graphY + bar_height + 20;

var randomInteger = function(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


var colors = [
	`hsl(0, 100%, 50%)`,
	`hsl(240, 100%, ${randomInteger(0, 100)}%)`
];

var renderCloud = function(ctx, x, y, color){
	ctx.fillStyle = color;
	ctx.fillRect(y, x, cloud_width, cloud_height);
};	
var renderStrokeCloud = function(ctx, x, y, color){
	ctx.strokeStyle = color;
	ctx.strokeRect(y, x, cloud_width, cloud_height);
};
var renderScore = function (ctx, positionX, score){
	ctx.fillStyle = 'black';
	ctx.fillText(score, positionX, score_y);
}
var renderGraph = function(ctx, positionX, positionY, height, color){
	ctx.fillStyle = color;
	ctx.fillRect(positionX, positionY, text_width, height);
}
var renderName = function(ctx, positionX, name){
	ctx.fillStyle = 'black';
	ctx.font = '16px PT Mono';
	ctx.fillText(name, positionX, text_position);
}

var getMaxElement = function(arr){
	var maxElement = arr[0];
	for (var i = 1; i < arr.length; i++){
		if (arr[i] > maxElement){
			maxElement = arr[i];
		}
	}
	return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
	renderCloud(ctx, cloud_x + gap, cloud_y + gap, 'rgba(0, 0, 0, 0.7)');
	renderStrokeCloud(ctx, cloud_x, cloud_y, 'black');
	renderCloud(ctx, cloud_x, cloud_y, 'white');
	ctx.fillStyle = 'black';
	ctx.font = '16px PT Mono';
	ctx.fillText('Ура вы победили!', 120, 40);
	ctx.fillText('Список результатов:', 120, 60);
	
	var maxTime = getMaxElement(times);
	var positionX = cloud_y + gap_between;

	for (var i = 0; i < times.length; i++){
		var graphHeight = times[i] * 100 / maxTime;
		var positionY = graphY + (bar_height - graphHeight);
		let color = '';
		if (names[i] === 'Вы'){
			color = colors[0];
		}else{
			color = colors[1];
		}
		if (i === 0){
			positionX += 10;
		}else{
			positionX += text_width + gap_between;
		}
	var score = Math.round(times[i]);

	renderScore(ctx, positionX, score);
	renderGraph(ctx, positionX, positionY, graphHeight, color);
	renderName(ctx, positionX, names[i]);
	}	
};



