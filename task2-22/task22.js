//跨浏览器绑定
function eventHanlde(ele,type,func){
	if(ele.addEventListenner){
		ele.addEventListenner(type,func,false);
	}else if(ele.attachEvent){
		ele.attachEvent("on" + type,func);
	}else{
		ele["on" + type] = func;
	}

}
var wrap = document.querySelector(".wrap");
var btn_wrap = document.querySelector(".btn-wrap");
var preButton = btn_wrap.querySelectorAll("button")[0];
var inButton = btn_wrap.querySelectorAll("button")[1];
var postButton = btn_wrap.querySelectorAll("button")[2];
var arr = [];
var last;
var toggle = false;

//前序遍历
function preOrder(node){
	if(node){
		arr.push(node);
	    preOrder(node.firstElementChild);
	    preOrder(node.lastElementChild);
    }
}
	
//中序遍历
function inOrder(node){
    if(node){
        inOrder(node.firstElementChild);
	    arr.push(node);
	    inOrder(node.lastElementChild);
    }
}
//后序遍历
function postOrder(node){
	if(node){
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		arr.push(node);
	}

}
//显示遍历的过程
function showWay(){
	for (var i = 0; i < arr.length; i++) {
		setTimeout(function(i){
			return function(){
				if(i == arr.length - 1){
					toggle = false;
				}
				if(last){
					last.style.background = "white";
				}
				arr[i].style.background = "red";
				last = arr[i];
			}
		}(i),i*100)
		
	}
}
//初始化
function reset(){
	arr = [];
	if(last){
		last.style.background = "white";
	}
}

//按钮绑定
eventHanlde(preButton, "click" ,function(){
	if(!toggle){
		toggle = true;
		reset(); 
		preOrder(wrap);
		showWay();
	}
});
eventHanlde(inButton, "click" ,function(){
	if(!toggle){
		toggle = true;
		reset(); 
		inOrder(wrap);
		showWay();
	}
});
eventHanlde(postButton, "click" ,function(){
	if(!toggle){
		toggle = true;
		reset(); 
		postOrder(wrap);
		showWay();
	}
});

