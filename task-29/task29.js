var validateForm = document.getElementById("validate_form");
var mesg = validateForm.getElementsByTagName("p")[0];
var validateBtn = validateForm.getElementsByTagName("button")[0];
var inputName = validateForm.getElementsByTagName("input")[0];

//验证非空
function isEmpty(item) {
	if(item.value == null || item.value == ""){
		mesg.innerHTML = "姓名不能为空";
		item.focus();
		return false;
	}else{
		return true;
	}
}
//验证字符数量，先计算字符长度
function strLens(str){
	var lens = 0;
	for (var i = 0; i < str.length; i++) {
		var num = str.charCodeAt(i);
		if(num >= 0 && num <= 128){
			lens += 1;
		}else{
			lens += 2;
		}
	}
	return lens;
}


//绑定事件
validateBtn.onclick = function(){
	var strLength = strLens(inputName.value);
	if(isEmpty(inputName) == false){
		return false;
	}else if(strLength < 4 || strLength > 16){
		mesg.innerHTML = "输入不符合规则，请输入4~16个字符";
		return false;
	}else{
		mesg.innerHTML = "符合规则";
	}
	
}