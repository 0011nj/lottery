function test () {
//	let块级作用域有效
//	for(let i=0;i<5;i++)
//		console.log(i);
	let i=6;
	i=11;
	console.log(i+'x');
}

function pi () {
//	const定义常量,不可改变
	const PI=3.1415;
//	const对象可以修改，对象k指向对象指针，指针不变
	const k={
		a:1,
	}
	k.a=4;
	console.log(k)
	console.log(PI)
}
pi();
//test();
