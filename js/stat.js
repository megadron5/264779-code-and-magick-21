'use strict';
const CLOUD_X = 10;
const CLOUD_Y = 100;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const GAP = 10;
const GAP_BETWEEN = 50;
//const FONT_GAP = 16;
const TEXT_WIDTH = 40;
const BAR_HEIGHT = 150;
const SCORE_Y = 100;
const GRAPH_Y = SCORE_Y - 10;
const TEXT_POSITION = GRAPH_Y + BAR_HEIGHT + 20;

var randomInteger = function(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


var colors = {
	you: `hsl(0, 100%, 50%)`,
	other: `hsl(240, 100%, ${randomInteger(0, 100)}%)`
};

var renderCloud = function(ctx, x, y, color){
	ctx.fillStyle = color;
	ctx.fillRect(y, x, CLOUD_WIDTH, CLOUD_HEIGHT);
};	
var renderStrokeCloud = function(ctx, x, y, color){
	ctx.strokeStyle = color;
	ctx.strokeRect(y, x, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var renderScore = function (ctx, positionX, score){
	ctx.fillStyle = 'black';
	ctx.fillText(score, positionX, SCORE_Y);
}
var renderGraph = function(ctx, positionX, positionY, height, color){
	ctx.fillStyle = color;
	ctx.fillRect(positionX, positionY, TEXT_WIDTH, height);
}
var renderName = function(ctx, positionX, name){
	ctx.fillStyle = 'black';
	ctx.font = '16px PT Mono';
	ctx.fillText(name, positionX, TEXT_POSITION);
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
	renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
	renderStrokeCloud(ctx, CLOUD_X, CLOUD_Y, 'black');
	renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');
	ctx.fillStyle = 'black';
	ctx.font = '16px PT Mono';
	ctx.fillText('Ура вы победили!', 120, 40);
	ctx.fillText('Список результатов:', 120, 60);
	
	var maxTime = getMaxElement(times);
	var positionX = CLOUD_Y + GAP_BETWEEN;

	for (var i = 0; i < times.length; i++){
		var graphHeight = times[i] * 100 / maxTime;
		var positionY = GRAPH_Y + (BAR_HEIGHT - graphHeight);
		let color = '';
		if (names[i] === 'Вы'){
			color = colors.you;
		}else{
			color = colors.other;
		}
		if (i === 0){
			positionX += 10;
		}else{
			positionX += TEXT_WIDTH + GAP_BETWEEN;
		}
	var score = Math.round(times[i]);

	renderScore(ctx, positionX, score);
	renderGraph(ctx, positionX, positionY, graphHeight, color);
	renderName(ctx, positionX, names[i]);
	}	
};



