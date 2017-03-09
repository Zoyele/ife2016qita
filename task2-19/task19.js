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
	var pattern = /^([1-9]\d|100)$/;
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
	if(box.childElementCount > 59){
		alert("太多了，超过60个了");
		return;
	}
	if(inputData()){
		var data = inputData();
		div.innerHTML = data;
		div.style = "height:" + data +"px;margin-top:" + (200-data) + "px;";
		box.insertBefore(div, box.firstChild);
	}else{
		return;
	}
}
//右插
function rightIn(){
	var box = document.getElementById('box');
	var div = document.createElement("div");
	if(box.childElementCount > 59){
		alert("太多了，超过60个了");
		return;
	}
	if(inputData()){
		var data = inputData();
		div.innerHTML = data;
		div.style = "height:" + data +"px;margin-top:" + (200-data) + "px;";
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
//生成随机20个数据
function randomData(){
	var box = document.getElementById('box');
	var data = [];
	var cont = "";
	for(var i = 0; i < 20; i++){
		data[i] = Math.floor(Math.random()*91+9);
		cont += '<div style ="height:' + data[i] +'px;margin-top:' + (200-data[i]) + 'px;">' + data[i] + '</div>';

	}
	box.innerHTML = cont;
}
//冒泡排序
function sortData(){
	var timer = null;
	var box = document.getElementById('box');
	var len = box.getElementsByTagName('div').length;
	var i = 0, j = 0, temp;
	timer = setInterval(sorting,25);
	function sorting(){
	    if(i < len){
	    	if(j < len-i-1){
	    		var arr = box.getElementsByTagName('div');
				if(parseInt(arr[j].innerHTML) > parseInt(arr[j+1].innerHTML)){
					temp = box.replaceChild(arr[j+1],arr[j]);
					box.insertBefore(temp,arr[j+1]);
				}
				j++;
	    	}else{
	    		i++;
	    		j = 0;
	    	}
	    }else{
	    	clearInterval(timer);
	    	return;
	    }
	}

}
//绑定按钮
function add(){
	var button = document.getElementsByTagName('button');
	eventHandle(button[0], "click" ,leftIn);
	eventHandle(button[1], "click" ,rightIn);
	eventHandle(button[2], "click" ,leftOut);
	eventHandle(button[3], "click" ,rightOut);
	eventHandle(button[4], "click" ,randomData);
	eventHandle(button[5], "click" ,sortData);
}

add();