;(function ( $, window, document, undefined ) {
    var pluginName = "carousel",
        defaults = {
            //         索引从0开始
            index: 0,
//         移动距离
            ulLeft: 0,
            flag: true,
//         图片宽度
            imgWidth: $('.carousel').width(),
//        根据图片数量个数算出指示点个数
            pointCount: $('.carousel>ul>li').length
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        // this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        // this._defaults = defaults;
        // this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var _this = this;
            _this.createElement();
            _this.rightClick(_this);
            _this.leftClick(_this);

        },
        createElement:function(){
            //        动态创建复制第一张图片到最后一张
            $('.carousel>ul').append('<li><img src="'+ $('.carousel>ul>li>img').attr('src') +'" alt=""> </li>');

            $('.carousel>ul>li').css({width:$('.carousel').width()});
            $('.carousel>ul>li').css({height:$('.carousel').height()});


//        动态创建箭头
            $('.carousel').append('<div class="arrow"><span class="arrow-left"></span><span class="arrow-right"></span></div>');
//         动态创建指示点
            $('.carousel').append('<div class="index-point"><ul><li class="active"></li></div>');
            for(var i=0;i<this.options.pointCount-1;i++){
                $('.index-point>ul').append('<li></li>');
            }
//        避免指示点跨行，给Ul加个长度
            $('.index-point>ul').css({width:(this.options.pointCount * 20) +"px"});
        },
        // 左点击事件
        leftClick:function(_this){
            $('.arrow-left').click(function(){
                if(_this.options.index == 0){
                    // 当索引=0，距离设置为最后一张图片，也就是createElement函数里面生成第一张的图片，
                    // 然后把索引设置为最后一个
                    _this.options.index = _this.options.pointCount - 1;
                    _this.options.ulLeft = -( _this.options.pointCount ) * _this.options.imgWidth;
                    $('.carousel>ul').css({left:_this.options.ulLeft});
                    _this.options.ulLeft = -(_this.options.index) * _this.options.imgWidth;
                    $('.carousel>ul').stop().animate({left:_this.options.ulLeft});
                    _this.pointColor(_this.options.index);
                }else{
                    _this.options.index --;
                    _this.options.ulLeft = -(_this.options.index * _this.options.imgWidth);
                    $('.carousel>ul').stop().animate({left:_this.options.ulLeft});
                    _this.pointColor(_this.options.index)
                }
            });
        },
        // 右点击事件
        rightClick:function(_this){
            //         右点击按钮
            $('.arrow-right').click(function(){
                if(!_this.options.flag){
                    return;
                }
                _this.options.flag = false;
                // 点击一次，索引加1
                _this.options.index ++;
                // 偏移距离left从索引0开始计算
                _this.options.ulLeft = -(_this.options.index * _this.options.imgWidth);
                // 因为createElement函数里面复制第一张图片到最后，完成无缝轮播
                // 当索引等于指示点的个数，索引为0，偏移距离为指示点个数*相片大小
                if(_this.options.index == _this.options.pointCount){
                    _this.options.index = 0;
                    _this.pointColor(_this.options.index);
                    $('.carousel>ul').stop().animate({left:_this.options.ulLeft},500,function(){
                        $('.carousel>ul').css({left:0});
                        _this.options.flag = true;
                    });
                }else{
                    $('.carousel>ul').stop().animate({left:_this.options.ulLeft},500);
                    _this.options.flag = true;
                }
                _this.pointColor(_this.options.index)
            });
        },
        //         改变指示点颜色
        pointColor:function(index){
            $('.index-point li').removeClass('active');
            $('.index-point li').eq(index).addClass('active');
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );