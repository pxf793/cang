$(function () {
    /*1. 不能垂直居中*/
    /*2. 设置背景颜色*/
    /*3. 设置导航功能*/
    $('.container').fullpage({
        verticalCentered:false,
        sectionsColor:["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        navigation:true,
        //切换时间
        scrollingSpeed:1000,
        afterRender: function(){
            //回调函数 点击跳转下一页面
            $('.more').on('click',function(){
                $.fn.fullpage.moveSectionDown(); 
            })
            // 第四屏的购物车监听动画结束的时候，去执行地址相关动画
            $('.section:nth-child(4) .cart').on('animationend',function(){
               $('.section:nth-child(4) .text img:last-child').fadeIn(); 
               $('.section:nth-child(4) .address').fadeIn(function(){
                   $('.section:nth-child(4) .address img:last-child').fadeIn();
               });
            });

            $('.section:nth-child(8)').on('mousemove',function(e){
                // 获取鼠标的当前位置 坐标
                // 设置给手定位 注意 要基于全屏
                $(this).find('.hand').css({
                    left:e.clientX -240,
                    top:e.clientY -160
                });
            }).on('click','.again',function(){
                // 再来一次
                // 1.返回到第一屏
                $.fn.fullpage.moveTo(1);
                // 2 重置所有动画
                $('.section').removeClass('now');
                $('.animated').removeClass('animated');
                // jquery 的fade相关
                $('.section [style]').removeAttr('style');
            });
           
        },
        //离开前
        onLeave:function(index,nextIndex,direction){
            $('.more').fadeOut(100);
            //离开的时候做动画
            //条件 第二屏掉到第三屏 做动画
            if(index === 2 && nextIndex === 3){
                $('.section:nth-child(2)').find('.sofa').addClass('animated');
                // console.log('ok');
            }
            if(index ===3 && nextIndex ===4){
                $('.section:nth-child(3)').find('.sofa').addClass('animated');
            }
            if(index === 5 && nextIndex === 6){
                $('.section:nth-child(5)').find('.card img:last-child').addClass('animated');
                $('.section:nth-child(6)').find('.box').addClass('animated');
            }
        },
        //到达后
        afterLoad:function(link,index){
            if(index != 8){
                $('.more').fadeIn(100);
            }
            //通过一个类名控制所有的动画
            $('.section').eq(index-1).addClass('now');
            // 使用jquery淡入
            if(index ==7 ){
                $('.section .star img').each(function(i,item){
                    $(item).delay(i*500).fadeIn(500);
                });
            }
        // 在第八屏手跟着鼠标移动
        
          
       
        }

        
    });
   
});

