import $ from 'jquery';
class Interface{
	/**
	 *getOmit 获取遗漏数据
	 * issue 当前期号
	 */
	getOmit(issue){
		let self=this;
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:'/get/omit',
				data:{
					issue:issue           
				},
				dataType:'json',
				success:function(res){        //通信成功
					self.setOmit(res.data)
					resolve.call(self,res)
				},
				error:function(err){          //通信失败
					reject.call(err)
				}
			});
		})
	}
	/**
	 * getOpenCode 获取开奖号码
	 * issue 期号
	 */
	getOpenCode(issue){
		let self=this;
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:"/get/opencode",
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res){
					self.setOpenCode(res.data);
					resolve.call(self,res)
				},
				error:function(err){
					reject.call(err)
				}
			});
		})
	}
	
	/**
	 * getState 获取状态
	 */
	getState(issue){
		let self=this;
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:'/get/state',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res){
					resolve.call(self,res)
					console.log(res)
				},
				error:function(err){
					reject.call(err)
				}
			});
		})
	}

}
export default Interface
