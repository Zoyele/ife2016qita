var root = document.getElementById("root");
var button1 = document.getElementsByTagName("button")[0];
var button2 = document.getElementsByTagName("button")[1];
var button3 = document.getElementsByTagName("button")[2];
var button4 = document.getElementsByTagName("button")[3];
var arr = [];
var last,changecolor;
var toggle = false;
//深度优先遍历,递归方法
function preOrder(node){
	if(node){
		arr.push(node);
		for (var i = 0; i < node.childElementCount; i++) {
			preOrder(node.children[i]);
		}
	}
}
//优先广度遍历
function uniterator1(node){
	if(node){
		var stack = [];
		stack.push(node);
		arr.push(node);
		var item;
		while(stack.length){
			item = stack.shift();
			if(item.children && item.children.length){
				for (var i = 0,len = item.children.length; i < len; i++) {
				arr.push(item.children[i]);
				stack.push(item.children[i]);
				}
			}			
		}
	}
}
//显示遍历过程
function showWay(){
	for (var i = 0; i <= arr.length; i++) {
		setTimeout(function(i){
			return function(){
				if (i == arr.length-1){
					toggle = false;
				}
				if (last){
					last.style.background = "white";
				}
				arr[i].style.background = "red";
				last = arr[i];
			}
		}(i),i*500);
	}
}
function showMatchWay(){
	var searchvalue = document.getElementsByTagName("input")[0].value;
	for (var i = 0; i <= arr.length; i++) {
		setTimeout(function(i){
			return function(){
				if (i == arr.length-1){
					toggle = false;
				}
				if (last){
					last.style.background = "white";
				}
				var item = arr[i].childNodes[0].nodeValue.toString().trim();
				if(item == searchvalue){
					arr[i].style.background = "blue";
					arr[i].style.color = "white";
					changecolor = arr[i];
				}else{
					arr[i].style.background = "red";
					last = arr[i];
				}
			}
		}(i),i*500);
	}
}
//初始化
function reset(){
	if(last){
		last.style.background = "white";
	}
	if(changecolor){
		changecolor.style.background = "white";
		changecolor.style.color = "black";
	}
	arr = [];

}
//绑定按钮
button1.onclick = function(){
	if(!toggle){
		toggle = true;
		reset();
		preOrder(root);
		showWay();
	}
}
button2.onclick = function(){
	if(!toggle){
		toggle = true;
		reset();
		uniterator1(root);
		showWay();
	}
}
button3.onclick = function(){
	if(!toggle){
		toggle = true;
		reset();
		preOrder(root);
		showMatchWay();
	}
}
button4.onclick = function(){
	if(!toggle){
		toggle = true;
		reset();
		uniterator1(root);
		showMatchWay();
	}
}