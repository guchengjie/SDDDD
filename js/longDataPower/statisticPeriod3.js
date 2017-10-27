;$(function() {
  var queryString = location.hash;
      ajaxParams = queryString.substring(1).split('&');
      ajaxData = {
        type: ajaxParams[0].split('=')[1],
        name: ajaxParams[1].split('=')[1],
        id: ajaxParams[2].split('=')[1]
      }
      console.log(ajaxData);
  //function initHandsontable() {
    var sourceArr = ['月', '旬'],
      sourceArr1 = ['年', '月'];
      
//  var tableHeight = window.parent.bodyHeight();
//  console.log(tableHeight)
    var container = document.getElementById('hot_Table');
    var hot = new Handsontable(container, {
      //data: JSON.parse(JSON.stringify(data1)),
      //dataSchema: {id: null, name: {first: null, last: null}, address: null},
      //height: 500,
      rowHeaders: true,
      colHeaders: true,
  //  startRows: 4,
  //  startCols: 4,
      minSpareRows: 1,   //在表格最下方添加一行空白
      contextMenu: true,
      licenseKey: 'e6a77-7121e-b6e10-24c1a-12a60',
      currentRowClassName : 'selected', //整行整列选中时，表头和序号也选择
      currentColClassName : 'selected',
      contextMenu: true,
      //stretchH: 'all', 自适应宽度
      columns: [       //操纵显示列和列的其他操纵
        {readOnly: true},
        { 
          type:'dropdown',
          source:sourceArr,
        },
        {readOnly: true},
        { 
          type:'dropdown',
          source:sourceArr1,
        },
        {readOnly: true}
      ],
      beforeChange: function(changes, source) {
        //hot.setCellMeta()
      }
    });

  
  ajax_Interface_Service('WHP.HydroPower/settings/function/tableData', ajaxData).done(function(resp) {
    if(resp.flag) {
      var data = objChangeArr(resp.data);
      hot.loadData(data);
    }
  }).fail(function(err) {
    console.log(err);
  });
  
  function objChangeArr(params) {
    var hotHeadsArr = ['periodTypeNum', 'periodType', 'statisticPeriodTypeNum', 'statisticPeriodType', 'statisticPeriodName'];
    var factoryParams = [],
        cacheParams = [];
    params.forEach(function(val, i) {
      for(var j = 0, len = hotHeadsArr.length; j < len; j++){
        //val[hotHeadsArr[j]]? cacheParams.push(val[hotHeadsArr[j]]) : cacheParams.push('');
        cacheParams.push(val[hotHeadsArr[j]])
      }
      
      if(hotHeadsArr.length != 0){
        (function(params) {
          factoryParams.push(params);
        })(cacheParams)
      }
      cacheParams = [];
    })
    return factoryParams;
  }
})
