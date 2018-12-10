import 'babel-polyfill'
import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Caclulate from './lottery/calculate.js';
import Interface from'./lottery/interface.js';
import $ from 'jquery';

//深度拷贝
const copyProperties = function(target,source){
	//reflect.ownkeys返回source对象所有属性
	for(let key of Reflect.ownKeys(source)){
		if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
			//获取其对应属性的描述
			let desc=Object.getOwnPropertyDescriptor(source,key);
			//为target添加 属性值
			Object.defineProperty(target,key,desc)
		}
	}
}

//多重继承
const mix=function(...mixins){
	class Mix{}
	for(let mixin of mixins){
		copyProperties(Mix,mixin);
		copyProperties(Mix.prototype,mixin.prototype);
	}
	return Mix
}

class Lottery extends mix(Base,Caclulate,Interface,Timer) {
	//name 用于标识彩票
	//cname 彩票名称
	//issue 期号
	//state 销售状态
	constructor(name='syy',cname='11选5',issue='**',state='**') {
		super();
		this.name=name;
		this.cname=cname;
		this.issue=issue;
		this.state=state;
		//当前选择器
		this.el='';
		//遗漏
		this.omit=new Map();
		//开奖号码
		this.open_code=new Set();
		//开奖记录
		this.open_code_list=new Set();
		//玩法列表
		this.play_list=new Map();
		//选号
		this.number=new Set();
		
		//期号选择器
		this.issue_el='#curr_issue';
		//状态选择器
		this.state_el='.state_el';
		//倒计时选择器
		this.countdown_el='#countdown';
		//购物车选择器
		this.cart_el='.codelist';
		//遗漏选择器
		this.omit_el='';
		//当前玩法选择器
		this.cur_play='r5';
	
		//初始化各种玩法的说明
		this.initPlayList();
		//初始化1-11号码
		this.initNumber();
		console.log(this.initNumber())
		//更新状态
		this.updateState();
		//事件初始化
		this.initEvent();
	}
	updateState(){
		let self=this;
		this.getState().then(function(res){
			self.issue=res.issue;				//拿到当前期号
			self.end_time=res.end_time;			//拿到截止时间
			self.state=res.state;				//拿到当前状态
			$(self.issue_el).text(res.issue);	//更新期号
			//更新倒计时
			self.countdown(res.end_time,function(time){
				$(self.countdown_el).text(time)
			},function(){
				setTimeout(function(){
					//重新获取最新状态
					self.updateState();
					//获取最新遗漏
					self.getOmit(self.issue).then(function(res){
						
					});
					//更新奖号
					self.getOpenCode(self.issue).then(function(res){
						
					})
				},500)
			})
		})
	}
	initEvent(){
		let self=this;
		//玩法切换
		$('#plays').on('click','li',self.changePlayNav.bind(self));
		//号码选中
		$('.boll-list').on('click','.btn-boll',self.toggleCodeActive.bind(self));
		//添加号码
		$('#confirm_sel_code').on('click',self.addCode.bind(self));
		//清空
		$('.dxjo').on('click','li',self.assistHandle.bind(self));
		//随即好吗
		$('.qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self))
		
	}
}
export default Lottery;
