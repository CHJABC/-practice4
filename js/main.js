// by CHJ

window.onload=function(){
	chj.app.totip();
	chj.app.tobanner();
	chj.app.tosort();
	chj.app.torun();
};

var chj={};

chj.tools={};
//在obj范围内通过class获取元素节点
chj.tools.getbyclass=function(obj,str){
	var aEle = obj.getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == str){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
};

//获取元素节点的计算后样式
chj.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return window.getComputedStyle(obj,null)[attr];	
	}
};

chj.tools.textChange=function(obj,str){
	obj.onfocus = function(){
		if(this.value == str){
			this.value = '';
		}
	};
	
	obj.onblur = function(){
		if(this.value == ''){
			this.value = str;
		}
	};
};
//元素节点淡入
chj.tools.fadeIn=function(obj){
	
	var iCur = chj.tools.getStyle(obj,'opacity');
	if(iCur==1){ return false; }
	
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};
//元素节点淡出
chj.tools.fadeOut = function(obj){
	
	var iCur = chj.tools.getStyle(obj,'opacity');
	if(iCur==0){ return false; }
	
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = -5;
		if(value == 0){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};

chj.tools.move = function(obj,old,now){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var iSpeed = (now - old)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //取整
		
		if(now == old){
			clearInterval(obj.timer);
		}
		else{
			old += iSpeed;
			obj.style.left = old + 'px';
		}
		
	},30);
	
};

chj.app={};

//搜索框
chj.app.totip=function(){
	var text1= document.getElementById("text1");
	var text2=document.getElementById("text2");

    chj.tools.textChange(text1,"Search website");
    chj.tools.textChange(text2,"Search website");
};

//广告图自动更换
chj.app.tobanner=function (){

	var ad =document.getElementById("ad");
	var ad_li=ad.getElementsByTagName("li");



	var oPrevBg = chj.tools.getbyclass(ad,'prev_bg')[0];
	var oNextBg = chj.tools.getbyclass(ad,'next_bg')[0];
	
	var oPrev = chj.tools.getbyclass(ad,'prev')[0];
	var oNext = chj.tools.getbyclass(ad,'next')[0];

	var li_now=0;

	var timer = setInterval(tonext,3000);

	function tonext(){
		if(li_now == ad_li.length-1){
			li_now = 0;
		}
		else{
			li_now++;
		}

		for(var i=0;i<ad_li.length;i++){
			if(i!=li_now)
			chj.tools.fadeOut(ad_li[i]);
		}
		
		chj.tools.fadeIn(ad_li[li_now]);

	}

	function toprev(){
		if(li_now == 0){
			li_now = ad_li.length-1;
		}
		else{
			li_now--;
		}
		
		for(var i=0;i<ad_li.length;i++){
			if(i!=li_now)
			chj.tools.fadeOut(ad_li[i]);
		}
		
		chj.tools.fadeIn(ad_li[li_now]);
	}

	

	oPrevBg.onmouseover = oPrev.onmouseover = function(){
		oPrev.style.display = 'block';
		clearInterval(timer);
	};
	
	oNextBg.onmouseover = oNext.onmouseover = function(){
		oNext.style.display = 'block';
		clearInterval(timer);
	};
	
	oPrevBg.onmouseout = oPrev.onmouseout = function(){
		oPrev.style.display = 'none';
		timer = setInterval(tonext,3000);
	};
	
	oNextBg.onmouseout = oNext.onmouseout = function(){
		oNext.style.display = 'none';
		timer = setInterval(tonext,3000);
	};

	oPrev.onclick=function(){
		toprev();
	};
	oNext.onclick=function(){
		tonext();
	};
};
//下拉菜单
chj.app.tosort=function(){
	var osort=document.getElementById("sell");
	var add=osort.getElementsByTagName("dd");
	var ali=[];

	for (var i = 0; i < add.length; i++) {

		
		//获取每一li.并添加到数组ali里
		for (var a = 0; a <add[i].getElementsByTagName("li").length;a++) {
			ali.push(add[i].getElementsByTagName("li")[a]);
		};
		


		add[i].onmouseover=function(){
		this.getElementsByTagName("ul")[0].style.display="block";
		};
		
		add[i].onmouseout=function(){
		this.getElementsByTagName("ul")[0].style.display="none";
		};

	};

	for (var b = 0; b < ali.length; b++) {
			
			ali[b].onmouseover=function(){
				this.className="active";
			};
			ali[b].onmouseout=function(){
				this.className="";
			};
			ali[b].onclick=function(){
				this.parentNode.style.display="none";
				this.parentNode.parentNode.getElementsByTagName("h2")[0].innerHTML=this.innerHTML;
			};
		};
	
};


chj.app.torun=function(){
	var orun = document.getElementById('run1');
	var oul = orun.getElementsByTagName('ul')[0];
	var ali = oul.getElementsByTagName('li');

	inow=0;

	var oprev = chj.tools.getbyclass(orun,'prev')[0];
	var onext = chj.tools.getbyclass(orun,'next')[0];

	onext.onclick=function(){
		if(inow == 3){
			inow =0;
			oul.style.left =0;
		}
		chj.tools.move(oul,inow*-205,(inow+1)*-205);
		inow++;
	};

	oprev.onclick=function(){
		if(inow==0){
			inow=3;
			oul.style.left=-615+"px";
		}
		chj.tools.move(oul,inow*-205,(inow-1)*-205);
		inow--;
	};
};
