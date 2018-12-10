{function sort (arr) {
	var len=arr.length;
	for(var i=0;i<len-1;i++){
		for(var j=0;j<len-1-i;j++){
			if(arr[j]>arr[j+1]){
				var temp=arr[j+1];
				arr[j+1]=arr[j];
				arr[j]=temp;
			}
		}
	}
	return arr;
}
var arr=[5,3,2,1,4];
sort(arr);
console.log(arr);
}
{
	function f () {
		return[1,2,3,4,5]
	}
	let a,b,c;
	[a,...b]=f();
	console.log(a,b)
}
{
	let metaData={
		title:'abx',
		test:[{
			title:'test',
			desc:'description'
		}]
	}
	let {title:x,test:[{title:y}]}=metaData;
	console.log(x,y)
}
