window.onload=function(){
    //导航栏
    let box1 = document.getElementsByClassName("ccc")[0]
	let box2 = document.getElementsByClassName("daohang-bd")[0]
	box1.onmouseover = function(){
	    box2.style.display = "block"
	}
	box1.onmouseout = function(){
	    box2.style.display = "none"
	}

    //选项卡开始
    let boxs = document.querySelectorAll(".nav-item")
	let cons = document.querySelectorAll(".bannerList-r")
	boxs.forEach(function(v,i){
		v.onmouseenter = function(){
			cons[i].style.display = "block"
		}
		v.onmouseleave = function(){
			cons[i].style.display = "none"
		}
	})
    //轮播图开始
	let index = 0
    let pages = document.querySelectorAll(".banner-imgs .imgBox a")
    let banner = document.querySelector(".banner-imgs")
    // let pre = document.querySelector(".banner-imgs .left")
    // let next = document.querySelector(".banner-imgs .right")
    let dot = document.querySelectorAll(".dot")
    //事件 触发才调用 （异步）
    banner.onmouseenter = function(){
        clearInterval(t)
    }
    banner.onmouseleave = function(){
        t = setInterval(run,3000)
    }
    function run(status='next'){  //默认next
        //轮播一次
        if(status=='next'){
            index+=1
        }else if(status=='pre'){
            index-=1
        }
        if(index<0){
            index=4
        }
        if(index>4){
            index=0
        }
        pages.forEach(function(item,i){
            item.classList.remove("active")
        })
        pages[index].classList.add("active")
        
        dot.forEach(function(item,i){
            item.classList.remove("active")
        })
        dot[index].classList.add("active")
        

    }
    t = setInterval(run,3000)


    // next.onclick = function(){
    //     run()
    // }
    // pre.onclick = function(){
    //     run('pre')
	// }

	dot.forEach(function(item,i){
        item.onmouseenter = function(){
            pages.forEach(function(item,i){
                item.classList.remove("active")
            })
            pages[i].classList.add("active")
            dot.forEach(function(item,i){
                item.classList.remove("active")
            })
			dot[i].classList.add("active")
		}
		
    })
    
    // 楼层跳转
    let floor = document.querySelectorAll("section");   //获取包裹图片的盒子
    let arr = [];   //定义一个空数组
    floor.forEach(function(value,i){
        let num = value.offsetTop;  //num=盒子距离顶部的距离
        arr.push(num);  //将获取的数添加到数组
        // arr.push(value.offsetTop)
    });
    console.log(arr)
    let btn = document.querySelectorAll(".aside-box")    //获取需要点击的事件
    let flag = true;
    btn.forEach(function(value,i){
        value.onclick = function(){     //事件点击时
            flag = false;
            btn.forEach(function(v,i){
                v.style.backgroundColor = ""
            })
            btn[i].style.backgroundColor = "#ff0036"
            animate(document.documentElement,{scrollTop:arr[i-1]},function(){
                flag = true;
            });   //使距离顶部的距离为数组中的值
        }
    })
    // 窗口滚动
    let nav = document.querySelector(".aside-left")
    let head = document.querySelector(".total")
    window.onscroll = function(){   //滚动条事件
        let windowtop = document.documentElement.scrollTop||document.body.scrollTop; //获取现在滚动条到顶端的距离
        // console.log(windowtop)
        if(800 < windowtop){
            head.style.top = "0px"
        }else if(windowtop<800){
            head.style.top = "-50px"
        }
        if(windowtop >= 700){
            nav.style.display = "block"
        }else{
            nav.style.display = "none"
        }
        // 侧导航效果
        arr.forEach(function(value,i){
            if(!flag){
                return;
            }
            if(value-800<windowtop){
                btn.forEach(function(v,i){
                    v.style.backgroundColor = ""
                })
                btn[i].style.backgroundColor = "#ff0036"
            }
        })
    }
    // 返回顶部
    let back = document.querySelector(".nav-back")
    back.onclick = function(){
        animate(document.documentElement,{scrollTop:0});
    }
    



}