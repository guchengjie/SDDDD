;$(function() {
  
  var data1=  [
    ['', 'Kia', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
    ['2012', 10, 11, 12, 13, 15, 16],
    ['2013', 10, 11, 12, 13, 15, 16],
    ['2014', 10, 11, 12, 13, 15, 16],
    ['2015', 10, 11, 12, 13, 15, 16],
    ['2016', 10, 11, 12, 13, 15, 16]
  ];
  
  var sourceArr = ['月', '旬'],
      sourceArr1 = ['年', '月'];
  
  var container = document.getElementById('hot_Table');
  var hot = new Handsontable(container, {
    data: JSON.parse(JSON.stringify(data1)),
    //dataSchema: {id: null, name: {first: null, last: null}, address: null},
    rowHeaders: true,
    colHeaders: true,
    //dropdownMenu: true,
//  startRows: 4,
//  startCols: 4,
//  minSpareRows: 2,   //在表格最下方添加一行空白
    contextMenu: true,
    licenseKey: 'e6a77-7121e-b6e10-24c1a-12a60',
    contextMenu: ['row_above', 'row_below', '---------', 'undo', 'redo'],
    contextMenu: {
      callback: function (key, options) {
        if (key === 'about') {
          setTimeout(function () {
            alert("This is a context menu with default and custom options mixed");
          }, 100);
        }
      },  
      items: {
        "row_above": {
          disabled: function () {
            return hot.getSelected()[0] === 0;
          }
        },
        "row_below": {},
        "hsep1": "---------",
        "remove_row": {
          name: 'Remove this row, ok?',
          disabled: function () {
            // if first row, disable this option
            return hot.getSelected()[0] === 0
          }
        },
        "hsep2": "---------",
        "about": {name: 'About this menu'}
      }
    },
    currentRowClassName : 'selected', //整行整列选中时，表头和序号也选择
    currentColClassName : 'selected',
    columns: [       //操纵显示列和列的其他操纵
      {readOnly: true},
      {
        type: 'dropdown',
        source: sourceArr
      },
      {readOnly: true},
      {
        type: 'dropdown',
        source: sourceArr1
      },
      {readOnly: true},
    ],
    // cell: [          //设置某cell的状态
    //  {row: 0, col: 1, readOnly: true}
    // ],
    // cells: function(row, col, prop) {   //同上
    //  var cellProperties = {};

    //  if(row == 1 && col == 0) {
    //    cellProperties.readOnly = true;
    //  }

    //  return cellProperties;
    // },
    // readOnly: true,
  });
})
