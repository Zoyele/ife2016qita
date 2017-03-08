//跨浏览器绑定
function eventHandle(ele,type,func){
	if(ele.addEventListenner){
		ele.addEventListenner(type,func,false);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,func);
	}else{
		ele["on" + type] = func;
	}
}
//检测输入的数据，并赋值
function inputData(){
	var data = document.getElementById('input-data').value;
	var pattern = /^\d+$/;
	if(pattern.test(data)){
		return data;
	}else{
		alert("请输入正整数");
		return false;
	}
}
//左插
function leftIn(){
	var box = document.getElementById('box');
	var div = document.createElement("div");
	if(inputData()){
		div.innerHTML = inputData();
		box.insertBefore(div, box.firstChild);
	}else{
		return;
	}
}
//右插
function rightIn(){
	var box = document.getElementById('box');
	var div = document.createElement("div");
	if(inputData()){
		div.innerHTML = inputData();
	    box.appendChild(div);
    }else{
    	return;
    }
}
	

//左删
function leftOut(){
	var box = document.getElementById('box');
	if(box.childNodes.length === 0 ){
		alert("队伍为空");
	}else{
		var data = box.firstChild.innerHTML;
		alert(data);
		box.removeChild(box.firstChild);
	}
}
//右删
function rightOut(){
	var box = document.getElementById('box');
	if(box.childNodes.length === 0 ){
		alert("队伍为空");
	}else{
		var data = box.lastChild.innerHTML;
		alert(data);
		box.removeChild(box.lastChild);
	}
}
//绑定按钮
function add(){
	var button = document.getElementsByTagName('button');
	eventHandle(button[0], "click" ,leftIn);
	eventHandle(button[1], "click" ,rightIn);
	eventHandle(button[2], "click" ,leftOut);
	eventHandle(button[3], "click" ,rightOut);
}

add();
