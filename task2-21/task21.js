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

//去重
function norepeat(item){
	var tagArr = document.getElementById('tag-box').getElementsByTagName('span');
    var notrepeat = true;
    for (var i = 0; i < tagArr.length; i++) {
    	if(item == tagArr[i].innerHTML){
    		notrepeat = false;
    		break;
    	}
    }
    return notrepeat;
}
//添加标签
function renderTags(){
	var item = document.getElementById('tag').value.trim();
	var tagBox = document.getElementById('tag-box');
	if(tagBox.childElementCount <= 10){
		if(norepeat(item)){
		var spans = document.createElement('span');
		spans.innerHTML = item;
		tagBox.appendChild(spans);			
		}
		
	}else{
		if(norepeat(item)){
			var spans = document.createElement('span');
		    spans.innerHTML = item;
			tagBox.appendChild(spans);
			tagBox.removeChild(tagBox.firstElementChild);	
		}
	}
}
//回车 空格逗号执行函数
function inputData(){
	var keyCode = window.event.keyCode||event.which;
//逗号无法输入
	if(keyCode == 13 || keyCode == 32 || keyCode == 188){
		renderTags();
	}
}
//删除标签，有问题
function deleteRender(x){
	var data = x.innerHTML;
	x.innerHTML = "删除" + data;
	console.log("222");


}
//删除

//绑定函数
function init(){
	var tags = document.getElementsByTagName('input')[0];
	eventHandle(tags,'keypress',inputData);
	console.log(document.getElementById('tag-box').getElementsByTagName('span'));
}
init();

