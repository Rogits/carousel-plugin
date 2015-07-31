/* 
 * License: N/A
 * Author: @vic_rog
 * 
 * Animation of slides
 * 
 */

$.fn.carousel = function(options)
{
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var defaults = {
        slideWidth: windowWidth,
        slideHeight: windowHeight,
        activeClass: "btn-default",
        inActiveClass: "btn-primary",
        slideSpeed: 400,
        interval: 2000,
        numOfSlides: $(".carousel-slide").length
    };
    var settings = $.extend({}, defaults, options);                    
    var $leftControl = $(".carousel-navigator:first");
    var $rightControl = $(".carousel-navigator:last");
    var timeoutId = 0;
    var i = 0;
    var firstSlide = 0;
    var activeSlide = firstSlide;                    
    var lastSlide = (settings.numOfSlides - 1);
    var positionSlides = function(){
        i = 0;
        do
        {
            $(".carousel-slide:eq(" + i + ")").css({
                "left": i * settings.slideWidth
            });
        }
        while(++i < settings.numOfSlides)
    };
    var deActivateSlideIndicators = function(){
        i = 0;
        do
        {
            $(".carousel-indicator:eq(" + i + 
                ")").removeClass(settings.activeClass
                ).addClass(settings.inActiveClass);
        }
        while(++i < settings.numOfSlides);
    };    
    
    var stopAnimation = function(){
        $(".carousel-slide").stop(true, true);
        clearInterval(timeoutId);
    };
        
    var activateSlideIndicator = function($obj)
    {
        $obj.removeClass(settings.inActiveClass
            ).addClass(settings.activeClass);
    };

    var animateSlideToLeft = function()
    {
        if($(".carousel-slide:eq(" +
                activeSlide + ")").css("left") === "0px")
        {
            $(".carousel-slide:eq(" + activeSlide + 
                ")").animate({
                "left": "+=" + settings.slideWidth
            }, settings.slideSpeed, function(){});   
            
            activeSlide = (activeSlide === firstSlide ?
                        lastSlide : --activeSlide);

            $(".carousel-slide:eq(" +
                activeSlide + ")").css({
                    "left": (-1 * settings.slideWidth)
            });
            
            $(".carousel-slide:eq(" +
                activeSlide + ")").animate({
                "left": "+=" + settings.slideWidth
            }, settings.slideSpeed, function(){});                             
            deActivateSlideIndicators();
            activateSlideIndicator($(".carousel-indicator:eq(" +  
                activeSlide + ")"));                    
        }
    };

    var animateSlideToRight = function()
    {
        if($(".carousel-slide:eq(" + activeSlide +
            ")").css("left") === "0px")
        {
            $(".carousel-slide:eq(" + activeSlide +
                ")").animate({
                    "left": "-=" + settings.slideWidth
                }, settings.slideSpeed, function(){});                            
            activeSlide = (activeSlide === lastSlide ? 
                firstSlide : ++activeSlide);                              
            $(".carousel-slide:eq(" + activeSlide + 
                ")").css({
                    "left": settings.slideWidth
                });                            
            $(".carousel-slide:eq(" + activeSlide + 
                ")").animate({
                    "left": "-=" + settings.slideWidth
                }, settings.slideSpeed, function(){}); 
            deActivateSlideIndicators();
            activateSlideIndicator(
                $(".carousel-indicator:eq(" + activeSlide + 
                ")"));
        }
    };

    var registerSlideIndicator = function($obj){                        
        $obj.click(function(){
            stopAnimation();
            if(activeSlide !== 
                $(".carousel-indicator").index($obj))
            {
                $(".carousel-slide:eq(" + activeSlide +
                    ")").animate({
                        "left": "-=" + settings.slideWidth
                    }, 
                    settings.slideSpeed, function(){});
                activeSlide = $(".carousel-indicator").index($obj);
                $(".carousel-slide:eq(" + activeSlide +  
                    ")").css({
                        "left": settings.slideWidth 
                    });
                $(".carousel-slide:eq(" + activeSlide +
                    ")").animate({
                        "left": "-=" + settings.slideWidth
                    }, settings.slideSpeed, function(){});
                deActivateSlideIndicators();
                activateSlideIndicator(
                    $(".carousel-indicator:eq(" +
                    activeSlide +")"));
            }
        });
    };
    
    $leftControl.click(function()
    {     
        stopAnimation();
        animateSlideToLeft();
    });

    $rightControl.click(function()
    {
        stopAnimation();
        animateSlideToRight();
    });   
    i = 0;                  
    do
    {
        registerSlideIndicator(
            $(".carousel-indicator:eq(" + i + ")"));
    }
    while(++i < settings.numOfSlides);

    var startAnimation = function(){
        animateSlideToRight();
    };
    positionSlides();
    timeoutId = setInterval(startAnimation, settings.interval);
};


