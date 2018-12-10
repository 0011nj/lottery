//正则对象
{
//	es5语法
	let regex=new RegExp('xyz','i');
	let regex1=new RegExp(/xyz/i);
	console.log(regex.test('xyz123'),regex1.test('xyz12h3'));
//	es6语法
	let regex2=new RegExp(/xyz/ig,'i');        //第二个参数会发改前面ig
	console.log(regex2.flags);                 //flags(es6新增加)获取正则修饰符
}
{
	let s='bbb-bb-b';
	//g,y都为全局匹配，y的二次必须紧跟着匹配
	let a1=/b+/g;   
	let a2=/b+/y;
	
	console.log('1',a1.exec(s),"---x---",a2.exec(s))  //bbb,bbb
	console.log('2',a1.exec(s),"---x---",a2.exec(s))  // bb , null
	console.log('3',a1.exec(s),"---x---",a2.exec(s))  // b ,bbb
	
	//sticky判断是否开启y
	console.log(a1.sticky,a2.sticky)  
}
{
	let x="\uD83D\uDC2A";
	let a1=/^\uD83D/;
	let a2=/^\uD83D/u;
	console.log('one',a1.exec(x))
	console.log('two',a2.exec(x))
	
	console.log(/\u{61}/.test('a'))
	console.log(/\u{61}/u.test('a'))     //＋u是能匹配Unicode编码
	
	//.识别小于两个字节的，＋u可识别
	console.log('\u{20005}');
	let s='𠀅';
	console.log('u',/^.$/.test(s))
	console.log('u',/^.$/u.test(s))
}
