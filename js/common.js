$(document).ready(function() {

	$('.burger').click(function(){
        $(this).toggleClass('active');
        $('.menu-mob').slideToggle(200);
    });

    $('.nav-mob .open-1').on('click', function() {
      event.preventDefault();
      $('.nav-mob__level-1').hide();
      var openid_1 = $(this).data('openid_1');
        $('#' + openid_1).fadeIn();
        $('.menu-mob .header__place').hide();
        $('.menu-mob .bottom').hide();
    });

    $('.level-back-1').click(function(){
        $('.nav-mob__level-1').fadeIn();
        $('.nav-mob__level-2').hide();
        $('.menu-mob .header__place').fadeIn();
        $('.menu-mob .bottom').fadeIn();
    });

    $('.nav-mob .open-2').on('click', function() {
      event.preventDefault();
      $('.nav-mob__level-2').hide();
      var openid_2 = $(this).data('openid_2');
        $('#' + openid_2).fadeIn();
    });

    $('.level-back-2').click(function(){
        $('.nav-mob__level-2').fadeIn();
        $('.nav-mob__level-3').hide();
    });

	var swiper = new Swiper(".swiper-sol", {
		slidesPerView: "auto",
		spaceBetween: 24,
		loop: true,
		centeredSlides: false,
	  	navigation: {
	    	nextEl: "#swiper-button-next_1",
	    	prevEl: "#swiper-button-prev_1",
	  	},
	  	breakpoints: {
		    768: {
		      //slidesPerView: 3,
		      //spaceBetween: 18,
		    },
		    1201: {
		      //slidesPerView: 3,
		      //spaceBetween: 18,
		    	spaceBetween: 24,
		    },
		},
	});
	$('.slider__val_1').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: false,
        arrows: false,
        infinite: false,
        asNavFor: '.slider__val_2',
        focusOnSelect: true
    });
	$('.slider__val_2').slick({
        autoplay: false,
        arrows: true, 
        //fade: true,
        //cssEase: 'linear',
        dots: false,
        asNavFor: '.slider__val_1'
        
    });
    

	$('.acc__top').on('click', function (e) {
        var $this = $(this);
        $this.parent('.acc__item').toggleClass('active');
        $this.next('.acc__full').slideToggle();
        $this.parent('.acc__item').siblings('.acc__item').removeClass('active').find('.acc__full').slideUp();       
        e.stopPropagation();
    });

	

	$('.footer .subtitle').click(function(){
        $(this).toggleClass('active');
        $(this).next('.footer__full').slideToggle(200);
    });

    $('.mask').mask('+7 (999) 999-99-99');
          

});

setTimeout(() => {
  const elements = document.querySelectorAll('.header, .nav');
  elements.forEach(el => {
    el.classList.add('no-animation');
  });
}, 3000);

(function() {
  const track = document.getElementById('track');
  const slides = Array.from(document.querySelectorAll('.simple-slide'));
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let activeIndex = 0;
  let isMoving = false;

  // Получить текущую ширину слайда (с учётом класса active)
  function getWidth(slide) {
    return slide.classList.contains('active') ? 570 : 120;
  }

  // Рассчитать смещение трека для указанного индекса (на основе текущих ширин)
  function getOffset(index) {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += getWidth(slides[i]) + 10; // +10 это gap
    }
    return offset;
  }

  // Плавно переместить трек к активному слайду
  function updatePosition() {
    if (isMoving) return;
    const offset = getOffset(activeIndex);
    track.style.transform = `translateX(-${offset}px)`;
  }

  // Сменить активный слайд (мгновенно меняем классы, затем плавно двигаем трек)
  function setActive(newIndex) {
    if (isMoving) return;
    if (newIndex === activeIndex) return;
    if (newIndex < 0 || newIndex >= slides.length) return;

    isMoving = true;

    // Меняем классы мгновенно (без анимации)
    slides[activeIndex].classList.remove('active');
    slides[newIndex].classList.add('active');
    activeIndex = newIndex;

    // Пересчитываем и применяем новую позицию (с анимацией трека)
    const newOffset = getOffset(activeIndex);
    track.style.transform = `translateX(-${newOffset}px)`;

    // Разблокируем после окончания анимации трека
    const onTransitionEnd = () => {
      track.removeEventListener('transitionend', onTransitionEnd);
      isMoving = false;
    };
    track.addEventListener('transitionend', onTransitionEnd);
    setTimeout(() => {
      track.removeEventListener('transitionend', onTransitionEnd);
      isMoving = false;
    }, 400);
  }

  // Навешиваем обработчики
  prevBtn.addEventListener('click', () => setActive(activeIndex - 1));
  nextBtn.addEventListener('click', () => setActive(activeIndex + 1));
  slides.forEach((slide, idx) => {
    slide.addEventListener('click', () => setActive(idx));
  });

  // Стартовая инициализация
  slides[activeIndex].classList.add('active');
  updatePosition();

  // При ресайзе пересчитываем позицию без анимации
  window.addEventListener('resize', () => {
    if (!isMoving) {
      const offset = getOffset(activeIndex);
      track.style.transition = 'none';
      track.style.transform = `translateX(-${offset}px)`;
      track.offsetHeight;
      track.style.transition = '';
    }
  });
})();

