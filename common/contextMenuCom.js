var changeBgcolor = []; // 修改后的表格坐标集合
var handsontableCallback = {
  	callback: function(key, options) {
      	var handData = this.getData();
      	
      	/***********向后内插*****************/
      	if (key === 'after') {
	        let _start_index = [options.start.row, options.start.col];
	        let _end_index = [options.end.row, options.end.col];
	        //单列向下的情况
	        if (_start_index[1] == _end_index[1]) {
	          let loop_num = _end_index[0] - _start_index[0],
	            row_num = _start_index[0],
	            column_num = _start_index[1],
	            now_val = this.getDataAtCell(_start_index[0], _start_index[1]);
	          
	          for (let i = 0; i < loop_num; i++) {
	            let now_row = row_num + i + 1;
	            handData[now_row].splice(column_num,1,now_val);  
	            let bgArr=JSON.stringify([now_row,column_num]);
	            if(changeBgcolor.indexOf(bgArr) == -1){
	              changeBgcolor.push(bgArr);
	            }
	            //this.setCellMeta(''+2, ''+1, 'className', 'tableChangeBg'); // 修改变色
	          }
	         
	        } else {
	          let loop_num_col = _end_index[1] - _start_index[1];
	          let loop_num_row = _end_index[0] - _start_index[0];
	  
	          let now_val_arr = [],
	            row_num = _start_index[0],
	            column_num = _start_index[1];
	  
	          for (let z = 0; z < loop_num_col + 1; z++) {
	            let _val = this.getDataAtCell(_start_index[0], _start_index[1] + z);
	            now_val_arr.push(_val);
	          }
	          for (let j = column_num; j <= _end_index[1]; j++) {
	            for (let i = 0; i < loop_num_row; i++) {
	              let val = now_val_arr[j - column_num];
	              handData[row_num + i + 1].splice(j,1,val);
	              let bgArr=JSON.stringify([row_num + i + 1,j]);
	              if(changeBgcolor.indexOf(bgArr) == -1){
	                changeBgcolor.push(bgArr);
	              }
	             // this.setCellMeta(''+(row_num + i + 1), ''+j, 'className', 'border'); // 修改变色
	            }
	          }
	        }
      }
      	
      	/***********向前填充*****************/
        if(key === 'before') {
	        let _start_index = [options.start.row, options.start.col];
	        let _end_index = [options.end.row, options.end.col];
	  
	        //单列向上的情况
	        if (_start_index[1] == _end_index[1]) {
	          let loop_num = _start_index[0],
	            row_num = _end_index[0],
	            column_num = _end_index[1],
	            now_val = this.getDataAtCell(_end_index[0], _end_index[1]);
	          for (let i = row_num; i > loop_num; i--) {
	            handData[i - 1].splice(column_num,1,now_val);
	            let bgArr=JSON.stringify([i - 1,column_num]);
	            if(changeBgcolor.indexOf(bgArr) == -1){
	              changeBgcolor.push(bgArr);
	            }
	           // this.setCellMeta(''+i - 1, ''+column_num, 'className', 'border'); // 修改变色
	          }
	         
	        } else {
	          let loop_num_col = _end_index[1] - _start_index[1];
	          let loop_num_row = _end_index[0] - _start_index[0];
	          let now_val_arr = [],
	            row_num = _start_index[0],
	            column_num = _start_index[1];
	  
	          for (let z = 0; z < loop_num_col + 1; z++) {
	            let _val = this.getDataAtCell(_end_index[0] , _start_index[1]+z);
	            now_val_arr.push(_val);
	          }
	          for (let j = column_num; j <= _end_index[1]; j++) {
	            for (let i = 0; i < loop_num_row; i++) {
	              let val = now_val_arr[j - column_num];
	              handData[row_num + i].splice(j,1,val);
	              let bgArr=JSON.stringify([row_num + i,j]);
	              if(changeBgcolor.indexOf(bgArr) == -1){
	                changeBgcolor.push(bgArr);
	              }
	             // this.setCellMeta(''+(row_num + i), ''+j, 'className', 'border'); // 修改变色
	            }
	          }
	        }
      	}
      
    /***********倍率缩放*****************/  
        if (key === 'rate ') {
            alert(正在建设中......)
        }
   /***********前后内插*****************/
        if (key === 'beforeAfter') {
		    var asd = this.getData(options.start.row, options.start.col, options.end.row, options.end.col);
		    let _start_index = [options.start.row, options.start.col];
		    let _end_index = [options.end.row, options.end.col];
		    let val_arr = asd.map(function(val, index) {
		      return (val[0]);
		    });
		    let difference = 0;
		    for(let i in val_arr){
		      difference = difference+Number(val_arr[i])
		    }
		    difference = difference/ val_arr.length;
        if ((_end_index[0] - _start_index[0]) >= 1) {
          //单列的情况
      if (_start_index[1] == _end_index[1]) {
            let loop_num = _end_index[0] - _start_index[0],
              row_num = _start_index[0],
              column_num = _start_index[1];
  
            for (let i = 0; i <= loop_num; i++) {
              this.setDataAtCell((row_num + i), column_num, difference);
              handData[row_num + i].splice(column_num,1,difference);
              let bgArr=JSON.stringify([row_num + i,column_num]);
              if(changeBgcolor.indexOf(bgArr) == -1){
                changeBgcolor.push(bgArr);
              }
              //this.setCellMeta(''+(row_num + i), ''+column_num, 'className', 'border'); // 修改变色
            }
           
          } else {
            let loop_num_col = _end_index[1] - _start_index[1];
            let loop_num_row = _end_index[0] - _start_index[0];
  
            let now_val_arr = [],
              row_num = _start_index[0],
              column_num = _start_index[1];
            for (let z = 0; z < loop_num_col + 1; z++) {
	          let val_last = asd.map(function(val, index) {
	            return (val[z]);
	          })
	          let ._val = 0;
	          for(let i in val_last){
	            _val = _val+Number(val_last[i])
	          }
	          _val = _val  / val_last.length;
	          now_val_arr.push(_val);
            }
            for (let j = column_num; j <= _end_index[1]; j++) {
              for (let i = 0; i <= loop_num_row; i++) {
                let val = now_val_arr[j - column_num];
                handData[row_num + i].splice(j,1,val);
                let bgArr=JSON.stringify([row_num + i,j]);
                if(changeBgcolor.indexOf(bgArr) == -1){
                  changeBgcolor.push(bgArr);
                }

              }
            }
           
          }
        }
      }
      for(let val of changeBgcolor){
        let data = JSON.parse(val);
         this.setCellMeta(''+data[0], ''+data[1], 'className', 'border'); // 修改变色
      }
      this.loadData(handData);
    },
    items: {
      "after": {
        name: '向后填充',
      },
  
      "hsep1": "---------",
  
      "before": {
        name: '向前填充'
      },
  
      "hsep2": "---------",
  
      "rate ": {
        name: '倍率缩放'
      },
  
      "hsep3": "---------",
      
      "beforeAfter": {
        name: '前后内插'
      }
    },
}