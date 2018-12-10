//基础模块开发

import $ from 'jquery';
class Base{
	/**
	 * 初始化各种玩法说明
	 */
	initPlayList(){
//		play_list 是map数据结构
		this.play_list.set('r2',{
		    name: '任二',
            bouns: 6,
            tip: '从01~11中任选两个或多个号码，所选中号码与开奖号码任意两个号码相同，即中奖<strong class="red">6</strong>元',
		})
	    .set('r3', {
            name: '任三',
            bouns: 19,
            tip: '从01~11中任选三个或多个号码，所选中号码与开奖号码任意三个号码相同，即中奖<strong class="red">19</strong>元',
        })
        .set('r4', {
            name: '任四',
            bouns: 78,
            tip: '从01~11中任选四个或多个号码，所选中号码与开奖号码任意四个号码相同，即中奖<strong class="red">78</strong>元',
        })
        .set('r5', {
            name: '任五',
            bouns: 540,
            tip: '从01~11中任选五个或多个号码，所选中号码与开奖号码号码相同，即中奖<strong class="red">540</strong>元',
        })
        .set('r6', { 
            name: '任六',
            bouns: 90,
            tip: '从01~11中任选六个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">90</strong>元',
        })
        .set('r7', {
            name: '任七',
            bouns: 26,
            tip: '从01~11中任选七个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">26</strong>元',
        })
        .set('r8', {
            name: '任八',
            bouns: 9,
            tip: '从01~11中任选八个或多个号码，所选中号码与开奖号码五个号码相同，即中奖<strong class="red">9</strong>元',
        });
	}
	/**
	 * 初始化1-11号码
	 */
	initNumber(){
		for(let i=1;i<12;i++){
			//number是set数据类型
			this.number.add((''+i).padStart(2,'0'));
		}
	}
	/**
	 * 设置遗漏数据
	 * omit 遗漏数据的map集合
	 */
	setOmit(omit){
		let self=this;
		self.omit.clear();           //清空数据
		//重新赋值
		for(let [key,value] of omit.entries()){
			self.omit.set(key,value);
		}
//		添加到页面
		$(self.omit_el).each(function(index,el){
			$(el).text(self.omit.get(key));
		})
	}
	
	/**
	 * 设置开奖数据
	 * open_code set集合的开奖数据
	 */
	setOpenCode(code){
		//先清空再赋值
		let self = this;
		self.open_code.clear();
		
		for(let item of code.values()){
			self.open_code.add(item);
		}
		if(self.updateOpenCode){
			self.updateOpenCode.call(self,code)
		}
//		self.updateOpenCode&&self.updateOpenCode.call(self,code);
	}
	
	/**
	 * 号码选中与取消
	 */
	toggleCodeActive(e){
		let self=this;
		let $cur=$(e.currentTarget);
		$cur.toggleClass('btn-boll-active');
		self.getCount();
	}
	
	/**
	 * 切换玩法
	 */
	changePlayNav(e){
		let self=this;
		let $cur = $(e.currentTarget);
		$cur.addClass('active').siblings().removeClass('active');
		self.cur_play=$cur.attr('desc').toLocaleLowerCase();
		$('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		self.getCount();
	}
	
	/*
	 * 大小奇偶操作区
	 */
	assistHandle(e){
//		组织默认事件
		e.preventDefault();
		let self=this;
		let $cur=$(e.currentTarget);
		let index=$cur.index();
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		if(index===0){
			$('.boll-list .btn-boll').addClass('btn-boll-active');
		}
		if(index===1){
			$('.boll-list .btn-boll').each(function(i,t){
				if(t.textContent-5>0){
					$(t).addClass('btn-boll-active')
				}
			})
		}
		if(index===2){
			$('.boll-list .btn-boll').each(function(i,t){
				if(t.textContent-6<0){
					$(t).addClass('btn-boll-active')
				}
			})
		}
		if(index===3){
			$('.boll-list .btn-boll').each(function(i,t){
				if(t.textContent%2==1){
					$(t).addClass('btn-boll-active')
				}
			})
		}
		if(index===4){
			$('.boll-list .btn-boll').each(function(i,t){
				if(t.textContent%2==0){
					$(t).addClass('btn-boll-active')
				}
			})
		}
		self.getCount();
		
	}
	
	/*
	 * 获取彩票名称
	 */
	getName(){
		return this.name;
	}
	/*
	 * 添加号码到购物车
	 */
	addCode(){
		let self=this;
		let $active=$('.boll-list .btn-boll-active').text().match(/\d{2}/g);   //获取选中的号码
		let active = $active?$active.length:0;
		let count=self.computeCount(active,self.cur_play);
		if(count){
			self.addCodeItem($active.join(' '),self.cur_play,self.play_list.get(self.cur_play).name,count)
		}
	}
	/*
	 * 添加单次号码
	 */
	addCodeItem(code,type,typeName,count){
		console.log(code,type,typeName,count)
		let self = this;
		const tpl = `
        <li codes="${type} | ${code}" bouns="${count*2}" count="${count}">
            <div class="code">
                <b>${typeName}${count>1?'复式':'单式'}</b>
                <b class="em">${code}</b>
                [${count}注，<em class="code-list-money">${count*2}</em>元]
            </div>
        </li>
        `;
        $(self.cart_el).append(tpl);
        self.getTotal();
	}
	
	/*
	 * 
	 */
	getCount(){
		let self=this;
		let active=$('.boll-list .btn-boll-active').length;
		let count=self.computeCount(active,self.cur_play);
		let range=self.computeBonus(active,self.cur_play);
		
//		console.log("1>>---",range)
		
		let money = count*2;
		let win1 = range[0] - money;
		let win2 = range[1] - money;
		let tpl;
		let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1;
		let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2;
		if(count === 0) {
			tpl = `您选了<b class="red">${count}</b>注，共${count*2}元`;
		} else if(range[0] === range[1]) {
			tpl = `
		            您选了<b class="red">${count}</b>注，共${count*2}元，
		            <em>若中奖，奖金：<strong class="red">${range[0]}</strong>元，
		            您将${win1>=0?'盈利':'亏损'}
		            <strong class="${win1>=0?'red':'green'}">${Math.abs(win1)}</strong>元</em>
		            `;
		} else {
			tpl = `
		            您选了<b class="red">${count}</b>注，共${count*2}元，
		            <em>若中奖，奖金：<strong class="red">${range[0]}</strong>元至<strong class="red">${range[1]}</strong>元，
		            您将${(win1>=0&&win2>=0)?'盈利':'亏损'}
		            <strong class="${win2>=0?'red':'green'}">${c1}</strong>元</em>至
		            <strong class="${win2>=0?'red':'green'}">${c2}</strong>元
		            `;
		}
		$('.sel_info').html(tpl);
	}
	
	/*
	 * 计算所有余额
	 */
	getTotal(){
		let count=0;
		$('.codelist li').each(function(index,item){
			count+=$(item).attr('count')*1;
		})
		$('#count').text(count);
		$('#money').text(count*2);
	}
	
	/*
	 * 生成随机数
	 * 
	 */
	getRandom(num){
		let arr=[],index;
		let number=Array.from(this.number);
		console.log('1>>',number)
		while(num--){
			index=Number.parseInt(Math.random()*number.length);
			arr.push(number[index]);
			number.splice(index,1)
		}
		return arr.join(' ')
	}
	
	/*
	 * 添加随机号码
	 */
	getRandomCode(e){
		e.preventDefault();
		let num=e.currentTarget.getAttribute('count');
		let play=this.cur_play.match(/\d+/g)[0];
		console.log(num,play)
		let self=this;
		if(num==='0'){
			$(self.cart_el).html('')
		}else{
			for(let i=0;i<num;i++){
				self.addCodeItem(self.getRandom(play),self.cur_play,self.play_list.get(self.cur_play).name,1)
			}
			
		}
	}
}

export default Base
