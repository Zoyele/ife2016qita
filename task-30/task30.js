var form = document.getElementsByTagName("form")[0];
var inputArr = form.getElementsByTagName("input");
var btn = form.getElementsByTagName("button")[0];
var password;
//focusin   focusout绑定不同的时间
//focusin 显示提示信息  
function showhint(e){
	e = e || event;
	var target = e.target;
	var hint = target.parentNode.parentNode.nextElementSibling;
	hint.className = "";
	if(target.name == "inputName"){
		hint.lastElementChild.innerHTML = "必填，长度为4~16位字符";
		target.className = "";
	}
	if(target.name == "inputPassword"){
		hint.lastElementChild.innerHTML = "必填，长度为4~16位字符,包含字母和数字";
		target.className = "";
	}
	if(target.name == "rePassword"){
		hint.lastElementChild.innerHTML = "必填，必须与密码相同";
		target.className = "";
	}
	if(target.name == "inputEmail"){
		hint.lastElementChild.innerHTML = "填写正确的邮箱格式";
		target.className = "";
	}
	if(target.name == "inputPhoneNumber"){
		hint.lastElementChild.innerHTML = "填写正确的手机号码";
		target.className = "";
	}
}
//focusout 进行验证，验证成功，提示文字绿色，返回TRUE，失败颜色红色，返回FALSE，默认FALSE
//输入框不得为空
function novalue(item,min,max){
    if(item == "" || item == null){
    	return false;
    }else if(lenscount(item) < min || lenscount(item) >max){
    	return false;
    }else{
    	return true;
    }
}
//计算字符的长度
function lenscount(str){
	var lens = 0;
	for (var i = 0; i < str.length; i++) {
		var countCode = str.charCodeAt(i);
		if(countCode >= 0 && countCode <= 128){
			lens += 1;
		}else{
			lens += 2;
		}
	};
	return lens;
}
//密码都是字母和数字
function validatePassword (str){
	var res =false;
	for (var i = 0; i < str.length; i++){
		var countCode = str.charCodeAt(i);
		if(countCode >= 0 && countCode <= 128){
			res = true;
		}else{
			res = false;
		}
	}
	return res;
}
function fout(e){
	e = e || event;
	var target = e.target;
	var hint = target.parentNode.parentNode.nextElementSibling;
	//验证姓名
	if(target.name == "inputName"){
		var t1 = novalue(target.value,4,16);
		if(t1 == false){
			hint.lastElementChild.innerHTML = "输入错误请输入长度为4~16位字符";	
		    target.className = "wrong";
		    hint.className = "wrong";
		}else{
			hint.lastElementChild.innerHTML = "输入正确";
			target.className = "right";
		    hint.className = "right";
		}
	}
	//验证密码
	if(target.name == "inputPassword"){
		password = target.value;
		if( validatePassword(password) && novalue(password,4,16)){
			hint.lastElementChild.innerHTML = "输入正确";
			target.className = "right";
		    hint.className = "right";			
		}else{
			hint.lastElementChild.innerHTML = "请输入长度为4~16位字符,包含字母和数字";	
		    target.className = "wrong";
		    hint.className = "wrong";
		}
	}
	//验证密码是否一致
	if(target.name == "rePassword"){
		if (target.value === password){
			hint.lastElementChild.innerHTML = "输入正确";
			target.className = "right";
		    hint.className = "right";
		}else{
		    hint.lastElementChild.innerHTML = "两次输入不一致";	
		    target.className = "wrong";
		    hint.className = "wrong";
		}
	}
	//验证邮箱
	if(target.name == "inputEmail"){
		var apos = target.value.indexOf("@");
		dotpos = target.value.lastIndexOf(".");
		if(apos<1 || dotpos - apos < 2){
			hint.lastElementChild.innerHTML = "请输入正确的邮箱格式";	
		    target.className = "wrong";
		    hint.className = "wrong";
		}else{
			hint.lastElementChild.innerHTML = "输入正确";
			target.className = "right";
		    hint.className = "right";
		}

	}
	//验证手机号
	if(target.name == "inputPhoneNumber"){
		if(/^1[34578]\d{9}$/.test(target.value)){
			hint.lastElementChild.innerHTML = "输入正确";
			target.className = "right";
		    hint.className = "right";
		}else{
			hint.lastElementChild.innerHTML = "请输入正确的手机号码";	
		    target.className = "wrong";
		    hint.className = "wrong";

		}
	}
}
//绑定
for (var i = 0; i < inputArr.length; i++) {
	inputArr[i].addEventListener("focusin",showhint);
	inputArr[i].addEventListener("focusout",fout);
};
btn.addEventListener("click",function(){
	var right = form.querySelectorAll(".right").length;
	if(right == 2*(inputArr.length)){
		alert("提交成功");
	}else{
		alert("提交失败");
	}
})
