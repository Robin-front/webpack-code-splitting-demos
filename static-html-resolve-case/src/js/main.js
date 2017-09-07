import $ from './zepto.js'
import FastClick from './fastclick.min.js'
import Transform from './transform.js'
import Swiper from './swiper.min.js'
import AlloyFinger from './finger.js'
import To from './to.js'

$(function() {

  FastClick.attach(document.body);
  function imageLoaded(selector, onload) {
    var img = new Image();
    var dom = selector;
    img.onload = function() {
      //real_width,real_height
      onload.call(dom, this.width, this.height);
      img.onload = null;
      img = null;
    };
    img.src = dom.getAttribute("src");
  }

  function ease(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  var options = {
    multipointStart: function() {
      To.stopAll();
      initScale = el.scaleX;
    },
    rotate: function(evt) {
      el.rotateZ += evt.angle;
    },
    pinch: function(evt) {
      el.scaleX = el.scaleY = initScale * evt.scale;
    },
    multipointEnd: function(evt) {
      // console.log(el.translateX + '_' + el.translateY + '_' + el.scaleX +  '_' + el.scaleY);
      To.stopAll();
      if (el.scaleX < 1) {

        new To(el, "scaleX", 1, 500, ease);
        new To(el, "scaleY", 1, 500, ease);
      }
      if (el.scaleX > 2) {

        new To(el, "scaleX", 2, 500, ease);
        new To(el, "scaleY", 2, 500, ease);
      }
      var rotation = el.rotateZ % 360;

      if (rotation < 0)
        rotation = 360 + rotation;
      el.rotateZ = rotation;

      if (rotation > 0 && rotation < 45) {
        new To(el, "rotateZ", 0, 500, ease);
      } else if (rotation >= 315) {
        new To(el, "rotateZ", 360, 500, ease);
      } else if (rotation >= 45 && rotation < 135) {
        new To(el, "rotateZ", 90, 500, ease);
      } else if (rotation >= 135 && rotation < 225) {
        new To(el, "rotateZ", 180, 500, ease);
      } else if (rotation >= 225 && rotation < 315) {
        new To(el, "rotateZ", 270, 500, ease);
      }

    },
    pressMove: function(evt) {
      el.translateX += evt.deltaX;
      el.translateY += evt.deltaY;
      evt.preventDefault();
    },
    tap: function(evt) {
      //console.log(el.scaleX + "_" + el.scaleY + "_" + el.rotateZ + "_" + el.translateX + "_" + el.translateY);
      // console.log("tap");
    },
    doubleTap: function(evt) {
      To.stopAll();
      if (el.scaleX > 1.5) {

        new To(el, "scaleX", 1, 500, ease);
        new To(el, "scaleY", 1, 500, ease);
        new To(el, "translateX", 0, 500, ease);
        new To(el, "translateY", 0, 500, ease);
      } else {
        var box = el.getBoundingClientRect();
        var y = box.height - ((evt.changedTouches[0].pageY - topPx) * 2) - (box.height / 2 - (evt.changedTouches[0].pageY - topPx));

        var x = box.width - ((evt.changedTouches[0].pageX) * 2) - (box.width / 2 - (evt.changedTouches[0].pageX));
        new To(el, "scaleX", 2, 500, ease);
        new To(el, "scaleY", 2, 500, ease);
        new To(el, "translateX", x, 500, ease);
        new To(el, "translateY", y, 500, ease);
      }
      //console.log("doubleTap");
    },
    longTap: function(evt) {
      //console.log("longTap");
    },
    singleTap: function () {
      $pop.hide();
    },
    swipe: function(evt) {
      // console.log(evt);

      if (el.scaleX === 1) {
        if (el.translateX !== 0) {
          new To(el, "translateX", 0, 500, ease);
        }
        if (el.translateY !== 0) {
          new To(el, "translateY", 0, 500, ease);
        }
      }
    }
  };

  // reset list width
  var $imgList = $('.J-img-list');
  $imgList.css('width', ($imgList.children().length*590 + 10)/75 + 'rem');

  var topPx,
      leftPx,
      preview,
      initScale = 1,
      $pop = $(".J-pop"),
      $el = $(".J-pop-img"),
      el = $el.get(0);

  $el.each(function(i, el){
    Transform(el);
  });

  var build = function (el){
    preview = (preview != null) && preview.destroy();
    imageLoaded(el, function(w, h) {
      w = $(el).width();
      h = $(el).height();
      topPx = window.innerHeight / 2 - h / 2;
      leftPx = window.innerWidth / 2 - w / 2;
      this.style.top = topPx + "px";
      this.style.left = leftPx + "px";
      this.style.margin = 0;
    });
    initScale = 1;
    preview = new AlloyFinger(el, options);
  }

  var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          onSlideChangeStart: function () {
            new To(el, "scaleX", 1, 500, ease);
            new To(el, "scaleY", 1, 500, ease);
            new To(el, "translateX", 0, 500, ease);
            new To(el, "translateY", 0, 500, ease);
          },
          onSlideChangeEnd: function (swiper){
            var index = swiper.realIndex;
            el = $el.get(index);
            build(el);
          }
      });

  // build(el);
  $(document).on('click', '.J-img-priview', function (){
    var index = $(this).attr('data-index');
    $pop.show();
    swiper.slideTo(index);
    if (el !== $el.get(index)) {
      el = $el.get(index);
    }
    build(el);
  });
  $pop.hide();






  // GA
  // (function(i, s, o, g, r, a, m) {
  //   i['GoogleAnalyticsObject'] = r;
  //   i[r] = i[r] || function() {
  //     (i[r].q = i[r].q || []).push(arguments)
  //   },
  //   i[r].l = 1 * new Date();
  //   a = s.createElement(o),
  //   m = s.getElementsByTagName(o)[0];
  //   a.async = 1;
  //   a.src = g;
  //   m.parentNode.insertBefore(a, m)
  // })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  //
  // ga('create', 'UA-63536434-1', 'auto');
  // ga('send', 'pageview', '访问PT新老会员|玩家同乐会活动页');
  //
  // $(document).on('click', '.J-online', function() {
  //   ga('send', 'event', 'PT新老会员|玩家同乐会', '点击联系客服');
  // });

});
