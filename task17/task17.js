/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
//跨浏览器事件绑定
function addEventHandler(ele,type,func){
  if(ele.addEventListener){
    ele.addEventListener(type,func,false);
  }else if(ele.attachEvent){
    ele.attachEvent("on" +　type,func);
  }else{
    ele["on"+type] = fnuc;
  }
}
//一以下两个函数用于随机模拟生成测试数据
function getDateStr(dat){
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m :m;
  var d = dat.getDay;
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + 'd';
}

function randomBuildData(seed){
  var retunData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i <=91; i++) {
    datStr = getDateStr(dat);
    retunData[datStr] = Math.ceil(Math.random()*seed);
    dat.setDate(dat.getDate() + 1);
  }
  return retunData;
}
var aqiSourceData={
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
//用于渲染图表的数据
var chartData = {}
//记录当时页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

var formGraTime = document.getElementById('form-gra-time');
var citySelect = document.getElementById('city-select');
var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];

//渲染图表
function renderChart(){
  var color = '',text = '';
  for(item in chartData){
    color = '#' + Math.floor(Math.random()*0xFFFF),toString(16);
    text += '<div title = "'+item+":"+chartData[item]+'" style = "height:'+chartData[item]+'px;backgroundcolor:'+color+'"></div>';
  }
  aqiChartWrap.innerHTML = text;
}

//日、周、月的radio事件点击时的处理函数
function graTimeChange(){
  if (pageState.nowGraTime == this.value){
    return;
  }else{
    pageState.nowGraTime = this.value;
  }
  initAqiChartData();
  renderChart();
}
function citySelectChange(){
  if (pageState.nowSelectCity == this.value){
    return;
  }else{
    pageState.nowSelectCity = this.value;
  }
  initAqiChartData();
  renderChart();
}
//初始化日周月的radio 时间，当点击时，调用函数graTimeChange

function initGraTimeForm(){
  var pageradio = formGraTime.getElementsByTagName('input');
  for (var i = 0; i < pageradio.length; i++) {
    addEventHandler(pageradio[i],click,graTimeChange);
  }
}
//初始化城市select下拉选项
function initCitySelector(){
  var citList = '';
//读取aqiSourceData里的城市信息列表，加到下拉框里面
  for(var i in aqiSourceData){
    cityList += '<option>'+ i + '</option>';
  }
  citySelect.innerHTML = cityList;
//给select设置事件，当选项发生变化时，调用citySelectChange函数
  addEventHandler(citySelect,"change",citySelectChange);
}
//初始化表格需要的数据格式
function initAqiChartData(){
  //将原始的数据处理成图表需要的数据格式
  //处理好的数据存在chartData中
  var nowCityData = aqiSourceData[pageState.nowSelectCity];
  //nowCityData是选定城市的aqi，92天的数据，key是日期
  if(pageState.nowGraTime == "day"){
    chartData = nowCityData;
  }
  if(pageState.nowGraTime =="week"){
    chartData = {};
    var countSum = 0,daySum = 0,week = 0;
    for( var item in nowCityData){
      countSum += nowCityData[item];
      daySum++;
      if((new Date(item)).getDay() == 6){
        week++;
        chartData['第'+week+'周'] = Math.floor(countSum/daySum);
        countSum = 0;
        daySum = 0;
      }
    }
    if (daySum != 0){
      week++;
      chartData['第'+week+'周'] = Math.floor(countSum/daySum);
    }
    if(pageState.nowGraTime == "month"){
      chartData = {};
      var countSum = 0,daySum = 0,month = 0;
      for (var item in nowCityData){
        countSum += nowCityData[item];
        daySum++;
        if((new Date(item)).getMonth !==month){
          month++;
          chartData['第'+month+'月'] = Math.floor(countSum/daySum);
          countSum = 0;
          daySum = 0;
        }
      }
      if (daySum!=0){
        month++;
        chartData['第'+month+'月'] = Math.floor(countSum/daySum);
      }
    }

  }
  function init(){
    initGraTimeForm();
    initCitySelector();
    initGraTimeForm();
    renderChart();
  }
  init();
}



