class Calculate {
	/**
	 * computeCount 计算注数
	 * @param active 当前选中的号码个数
	 * @param play_name 当前的玩法标识
	 * @return number 注数 
	 */
	computeCount(active,play_name){
		let count=0;       							//默认注数0
		const exist=this.play_list.has(play_name);  //判断是否有此玩法
		const arr=new Array(active).fill('0');      //创建active长度默认为0的数组
		if(exist && play_name.at(0)==='r'){			//满足条件计算注数
			count=Calculate.combine(arr,play_name.split('')[1]).length;
		}
		return count;
	}
	/**
	 * @param  arr  参与组合运算的数组
	 * @param  size 组合运算的基数
	 * @return      计算注数
	 */
	static combine(arr,size){
		let allResult=[];              //保存最后的结果
		(function f(arr,size,result){
			let arrLen=arr.length;
			if(size>arrLen){
				return;
			}
			if(size===arrLen){
				allResult.push([].concat(result,arr))
			}else{
				for(let i=0;i<arrLen;i++){
					let newResult=[].concat(result);
					newResult.push(arr[i]);
					if(size===1){
						allResult.push(newResult);
					}else{
						let newArr=[].concat(arr);
						newArr.splice(0,i+1);
						f(newArr,size-1,newResult)
					}
				}
			}
		})(arr,size,[]);
		return allResult;
	}
	
	/**
	 *计算奖金范围 
	 */
	computeBonus(active,play_name){
		const play=play_name.split('');
		const self=this;
		let arr= new Array(play[1]*1).fill(0);
		let min,max;
//		console.log('1>>',arr,active,play)
		if(play[0]==='r'){
			let min_active = 5-(11-active);              //最小命中数
			if(min_active>0){
				if(min_active-play[1]>=0){
					arr = new Array(min_active).fill(0);
					min=Calculate.combine(arr,play[1]).length;
				}else{
					if(play[1]-5>0&&active-play[1]>=0){
						arr=new Array(active-5).fill(0);
						min = Calculate.combine(arr,play[1]-5).length;
					}else{
						min=active-play[1]>-1?1:0
					}
				}
//			console.log('2>>',min,max)
			}else{
				min=active-play[1]>-1?1:0;
//				console.log('3>>',min,max);
			}
			
			let max_active = Math.min(active,5);
			if(play[1] - 5 > 0) {
				if(active - play[1] >= 0) {
					arr = new Array(active - 5).fill(0);
					max = Calculate.combine(arr, play[1] - 5).length;
				} else {
					max = 0;
				}
			} else if(play[1] - 5 < 0) {
				arr = new Array(Math.min(active, 5)).fill(0);
				max = Calculate.combine(arr, play[1]).length;
			} else {
				max = 1;
			}
		}
    	return [min,max].map((item)=>{
    		return item*self.play_list.get(play_name).bouns;
    	});
	}
}


export default Calculate