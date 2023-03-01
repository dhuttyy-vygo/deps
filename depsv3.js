gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

 let smoother = ScrollSmoother.create({
  smooth: 1,
  effects: true,
}); 
 
const showAnim = gsap.from('.is-nav', { 
  yPercent: -100,
  paused: true,
  duration: .8,
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
  }
});
  
$(".sp-image").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(this).find("img");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 0
    }
  });
  tl.fromTo(
    targetElement,
    {
      y: "-20%",
      duration: 1
    },
    {
      y: "20%",
      duration: 1
    }
  );
});
  
window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  // pagecolor trigger
  $("[color-trigger='trigger']").each(function (index) {
    // elements
    let triggerEl = $(this),
      targetEl = $("body");
    // settings
    let classSetting = attr("mode-2", triggerEl.attr("tr-pagecolor-class"));
    // result
    ScrollTrigger.create({
      trigger: triggerEl,
      start: "top center",
      end: "bottom center",
      onToggle: ({ self, isActive }) => {
        if (isActive) {
          targetEl.addClass(classSetting);
        } else {
          targetEl.removeClass(classSetting);
        }
      }
    });
  });
});


  
$(".hamburger").on("click", function () {
  $(this).toggleClass("open");
  if ($(this).hasClass("open")) {
    smoother.paused(true);
  } else {
    smoother.paused(false);
  }
});



$('.form_button, .radio_button').click(function() {
	$('.form_next').click();
});

var slideNumber = $('.slider_slide').length - 1;

$('.total-number').text(slideNumber);

function sliderAnimation() {
    var currentSlide = $('.w-slider-dot.w-active').index();
    if (currentSlide == 0) {
    	$('.form_prev').addClass('disabled-prev');
    } else {
    	$('.form_prev').removeClass('disabled-prev');
    }
    $('.first').text(currentSlide - 1);
    $('.second').text(currentSlide);
    var percent = (currentSlide / slideNumber) * 100;
    var percentRound = percent.toFixed(0);
    $('.form_percent').text( percentRound );
    $('.form_progress-fill').css('width', percentRound + '%');
}

$('.form_prev, .form_next, .radio_option').click(function() {
	setTimeout(() => {  
		sliderAnimation();
	}, 150);
});


function validateForm(item) {
  var siblingButton = item.closest('.slider_slide').find('.form_button');
  if ( item.val().length > 1 ) {
  	siblingButton.addClass('form-active');
  } else {
  	siblingButton.removeClass('form-active');
  }
}

$( ".form_field" ).keydown(function() {
	validateForm($(this));
});

$(".form_field").focusout(function(){
  validateForm($(this));
});

  window.addEventListener("DOMContentLoaded", (event) => {
  let typeSplit = new SplitType("[text-split]", {
    types: "lines",
    tagName: "span"
  });


  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[sp-fade]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".line"), { opacity: 0, yPercent: 100, duration: 1, ease: "power2.out", stagger: { amount: 0.3 } });
    createScrollTrigger($(this), tl);
  });
  
  
  $("[smooth-in]").each(function (index) {
  let tl = gsap.timeline({ paused: true });
  let accent = $(this).find(".accent");
  tl.fromTo(
    accent,
    {
      scaleY: "0%",
      duration: 1
    },
    {
      scaleY: "100%",
      duration: 1
    }, 0);
  tl.from($(this).find(".line"), { opacity: 0, yPercent: 100, duration: 0.8, ease: "power2.out", stagger: { amount: 0.3 } }, 0.1);
  createScrollTrigger($(this), tl);
});  
    
  gsap.set("[text-split]", { opacity: 1 });
});
  
$('[show-cursor]').hover(function() {
  $('.cursor__dot').toggleClass('play');
});

$('[mouse-data-drag]').mouseenter(function() {
  $('.cursor__text').text('DRAG');
});

$('[mouse-data-play]').mouseenter(function() {
  $('.cursor__text').text('PLAY');
});  


$("[js-vimeo-element='component']").each(function (index) {
  let componentEl = $(this),
    iframeEl = $("iframe"),
    coverEl = $("[vim--video--play]"),
   	coverClose = $("[vim--video--close]");
  // create player
  let player = new Vimeo.Player(iframeEl[0]);
  // when video starts playing
  player.on("play", function () {
    // add class of is-playing to this component
    componentEl.addClass("is-playing");
  });

  // when user clicks on our cover
  coverEl.on("click", function () {
    if (componentEl.hasClass("is-playing")) {
      player.pause();
    } else {
      player.play();
    }
  });
  
  
  // when user clicks on our cover
  coverClose.on("click", function () {
    if (componentEl.hasClass("is-playing")) {
      player.pause();
    } else {
      player.play();
    }
  });
});  
  
// Adds overflow hidden to the body prevent page scrolling when popup is open
  $('.popup-toggle').on('click', function() {
    $('body').addClass('overflow-hidden');
  });

  // Removes overflow hidden from body if popup is closed
  $('.popup-close, .popup-background').on('click', function() {
    $('body').removeClass('overflow-hidden');
  });

  // Stops YouTube / Vimeo Video from playing if Popup is closed
  $(function(){
    $('.popup-video-group .popup-close, .popup-video-group .popup-background').click(function(){      
      setTimeout(function(){
        $('.popup-video-group iframe').attr('src', $('.popup-video-group iframe').attr('src'));
      },400) // ms to wait until the popup out animation is over to work smooth in all browsers

    });
  });
