var drag, pos, oleft, val, fading = !1,
    curr = 0,
    clicked = !1,
    smooth = 50;
$(document).ready(function () {
   $(".explore-map-bottom").fadeOut(0), ".rellax".length > 0 && new Rellax(".rellax"), 
   $("h1, h2, .desc p, .img-holder, .parallax-holder, .subtitle, #initiatives .title, #initiatives .desc, .initiative-item, .map-item  .map-img, .map-item .map-info, .info-holder .desc, .info-holder .info-item, .more-details-btn, .explore-map-icon").addClass("out"),
   $(".map-detail-btn, .map-info .title").click(function (e) {
      e.preventDefault();
      var o = $(this).parent().parent(),
         t = $(".owl-item.active").length < 1 ? o.index() : $(".owl-item.active").index();
      localStorage.setItem("map_pos", t), window.location.href = $(this).attr("href")
   }), $(".map-item").each(function () {
      $(this).data("ol", $(this).offset().left)
   }), $("#superheroes h2").removeClass("out"), $(window).width() > 768 && $(".map-section").mouseover(function (e) {
      $(".cursor-holder").addClass("active"), $(".cursor-holder").css({
         left: e.pageX - $(".cursor-holder").width() / 2 + "px",
         top: e.pageY - $(window).scrollTop() - $(".cursor-holder").height() / 2 + "px"
      })
   }), $(".map-section").mouseout(function () {
      $(".cursor-holder").removeClass("active")
   }), $(".map-section").mousedown(function (e) {
      smooth = 20, drag = !0, curr = e.pageX, checkMapItem(pos = parseInt($(".map-container").css("left")))
   }), $(".map-section").mousemove(function (e) {
      if ($(".cursor-holder").css({
            left: e.pageX + "px",
            top: e.pageY - $(window).scrollTop() + "px"
         }), drag) {
         var o = pos - (curr - e.pageX),
            t = $(".map-size").width() - $(window).width() + 100;
         o > 0 ? (o = 0, $(".fixed-nav").fadeIn()) : $(".fixed-nav").fadeOut(), o < -t && (o = -t);
         var a = -($(".map-top-info").width() + parseInt($(".map-top-info").css("padding-left"))),
            i = -($(".map-holder").width() - $(window).width());
         o > a || o < i ? $(".explore-map-bottom:visible").length > 0 && !fading && (fading = !0, $(".explore-map-bottom").fadeOut(function () {
            fading = !1
         })) : $(".explore-map-bottom:visible").length < 1 && !fading && (fading = !0, $(".explore-map-bottom").delay(400).fadeIn(function () {
            fading = !1
         })), $(".map-container").css({
            left: o + "px"
         }), checkMapItem(o)
      }
   }), $(".click").hide(), $(".map-item a, .progress-holder a").mouseover(function () {
      $(".drag").hide(), $(".click").show()
   }), $(".map-item a, .progress-holder a").mouseout(function () {
      $(".click").hide(), $(".drag").show()
   }), $(window).mouseup(function () {
      drag = !1
   }), $(document).on("click", ".nav-title", function () {
      if (!anim) {
         var e = 0;
         switch ($(this).attr("id")) {
            case "section1":
               e = $("#superheroes").offset().top;
               break;
            case "section2":
               e = $("#forward").offset().top;
               break;
            case "section3":
               e = $("#initiatives").offset().top;
               break;
            case "section4":
               e = $("#journeysofar").offset().top
         }
         anim = !0, $("html, body").animate({
            scrollTop: e
         }, function () {
            anim = !1
         })
      }
   }), $("#journeysofar").length > 0 && $("#journeysofar").mouseout(function () {
      enableScroll()
   }), $("#journeysofar").mousewheel(function (e) {
      animateMap(e)
   }), $(document).keydown(function (e) {
      var o = {
         deltaY: 0
      };
      37 == e.keyCode ? o.deltaY = 1 : 39 == e.keyCode && (o.deltaY = -1), 0 != o.deltaY && animateMap(o)
   }), $("head").append('<style id="custom">.fixed-bottom{}</style>'), $(window).resize(checkMobile), checkMobile(), $(window).scroll(checkScroll), setTimeout(function () {
      checkScroll(), $(".loading").fadeOut(function () {
         $(".hero .explore-knob").addClass("anim")
      })
   }, 500)
});


function checkMobile() {
   if (setTimeout(function () {
         $(".map-item").length > 0 && $(".map-item").each(function () {
            $(this).data("ol", $(this).offset().left)
         })
      }), $(window).width() < 1025 && $("#journeysofar").length > 0) {
      if ($("#journeysofar").scrollLeft(0), $("#journeysofar").css({
         left: "0px"
         }), !$(".map-carousel").hasClass("owl-carousel")) {
         $(".map-carousel").addClass("owl-carousel").addClass("owl-theme"), $(".map-carousel").owlCarousel({
            items: 1,
            dots: !1,
            nav: !1
         }), $(".map-item").height($(".owl-stage").height());
         for (var e = 1; e < $(".owl-item").length; e++) 
         $(".owl-item").eq(e).find(".map-img").addClass("out"), $(".owl-item").eq(e).find(".map-info").addClass("out");
         $(".owl-item.active").find(".map-img").removeClass("out"), $(".owl-item.active").find(".map-info").removeClass("out"),
         $(".legend").removeClass("active"), $("#item1").addClass("active"), 
         $(".map-carousel").on("changed.owl.carousel", function (e) {
            $(".legend").removeClass("active"), $("#item" + (e.item.index + 1)).addClass("active"), 
            $(".owl-item.active").find(".map-item").addClass("active"), setTimeout(function () {
               $(".owl-item.active").find(".map-img").removeClass("out"), $(".owl-item.active").find(".map-info").removeClass("out")
            }, 200)
         })
      }
   } else $(".map-carousel").hasClass("owl-carousel") && ($(".map-carousel").trigger("destroy.owl.carousel"), 
   $(".map-carousel").removeClass("owl-carousel").removeClass("owl-theme"))
}
 
var anim = !1;
function checkScroll() {
   if ($(".fixed-nav").length > 0) {
      var e;
      if ($(window).scrollTop() < $("#superheroes").offset().top) {
         var o = .1 * ($(".hero").height() - $(window).scrollTop()) - 100;
         $(".rellax.side").css({
            left: o + "px"
         })
      }
      if ($(window).scrollTop() > $("#superheroes").offset().top + 200 ? $(".fixed-nav").addClass("fix") : 
      $(".fixed-nav").removeClass("fix"), $(window).scrollTop() > $("#initiatives").offset().top - 180 ? $(".fixed-nav").addClass("journey") : 
      $(".fixed-nav").removeClass("journey"), $(window).scrollTop() > $("#journeysofar").offset().top - 2 * parseInt($("#journeysofar").css("padding-top"))) {
         if ($("#journeysofar").find(".fixed-nav").length < 1) {
            e = $(".fixed-nav").remove(), $("#journeysofar").append(e);
            var t = parseInt($("#journeysofar").css("padding-top")) + 20;
            $("#custom").html(".fixed-bottom{top:" + t + "px}")
         }
         $(".fixed-nav").removeClass("fix").addClass("fixed-bottom")
      } else $("#superheroes .row:nth-child(2)").find(".column:nth-child(1)").find(".fixed-nav").length < 1 && (e = $(".fixed-nav").remove(),
      $("#superheroes .row:nth-child(2)").find(".column:nth-child(1)").append(e)), 
      $(".fixed-nav").removeClass("fixed-bottom"), localStorage.setItem("map_pos", -1);
      var a = null,
         i = 0;
      $(window).scrollTop() < $("#forward").offset().top - 180 ? $("#section1").hasClass("active") || ($(".nav-title").removeClass("active"), 
      $("#section1").addClass("active"), $(".fixed-nav").fadeIn()) : $(window).scrollTop() >= $("#forward").offset().top - 180 && $(window).scrollTop() < $("#initiatives").offset().top - 180 ? (a = $("#section2"),
      $("#section2").hasClass("active") || ($(".nav-title").removeClass("active"), $("#section2").addClass("active"), $(".fixed-nav").fadeIn())) : 
      $(window).scrollTop() >= $("#initiatives").offset().top - 180 && $(window).scrollTop() < $("#journeysofar").offset().top - 180 ? (a = $("#section3"),
         $("#section3").hasClass("active") || ($(".nav-title").removeClass("active"), $("#section3").addClass("active"), $(".fixed-nav").fadeIn())) : (a = $("#section4"), 
         $("#section4").hasClass("active") || ($(".nav-title").removeClass("active"), $("#section4").addClass("active"),
         $(".explore-map-icon").removeClass("out"))), null != a && (i = a.offset().top - $(".fixed-nav").offset().top), $(".fixed-nav .explore-knob").css({
         transform: "translateY(" + i + "px)"
      })
   }
   $("h2.out, .desc p.out,  .subtitle.out, #initiatives .title.out, #initiatives .desc.out, .initiative-item.out,.info-holder .desc.out, .info-holder .info-item.out, .more-details-btn.out").each(function () {
      $(window).scrollTop() > $(this).offset().top - window.innerHeight + 100 && $(this).removeClass("out")
   }), $(".img-holder.out").each(function () {
      $(window).scrollTop() > $(this).offset().top - window.innerHeight + $(this).height() / 2 && $(this).removeClass("out")
   }), $(".parallax-holder.out").each(function () {
      $(window).scrollTop() > $(this).offset().top - window.innerHeight + 3 * $(this).height() / 4 && ($(this).removeClass("out"), $(this).find(".parallax-bg").addClass("anim"))
   })
}

function checkMapItem(e) {
   for (var o = 0; o < $(".map-item").length; o++) {
      var t = $(".map-item").eq(o); - e + $(window).width() > t.data("ol") + t.width() / 2 && -e <= t.data("ol") + t.width() / 2 ? (t.addClass("active"), t.find(".map-img").removeClass("out"), t.find(".map-info").removeClass("out"), $("#item" + (o + 1)).addClass("active")) : (t.removeClass("active"), $("#item" + (o + 1)).removeClass("active"))
   }
}