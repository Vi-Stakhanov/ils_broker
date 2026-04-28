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

(function() {
  const track = document.getElementById('track');
  const slides = Array.from(document.querySelectorAll('.simple-slide'));
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let activeIndex = 0;
  let isTransitioning = false; // блокируем повторные клики во время анимации

  // Получить фактическую ширину слайда (учитывает класс active)
  function getRealWidth(slide) {
    return slide.classList.contains('active') ? 570 : 120;
  }

  // Пересчитать смещение трека на основе актуальных ширин
  function updateTrackPosition() {
    let offset = 0;
    // Суммируем ширину всех слайдов до активного (с учётом gap между ними)
    for (let i = 0; i < activeIndex; i++) {
      const width = getRealWidth(slides[i]);
      offset += width;
      if (i < activeIndex - 1) offset += 20; // только gap между слайдами до активного
    }
    // Применяем сдвиг
    track.style.transform = `translateX(-${offset}px)`;
  }

  // Обновить классы active у слайдов
  function updateActiveClass() {
    slides.forEach((slide, i) => {
      if (i === activeIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  // Главная функция смены слайда
  function goToSlide(newIndex, direction) {
    if (isTransitioning) return;
    if (newIndex < 0 || newIndex >= slides.length) return;
    if (newIndex === activeIndex) return;

    isTransitioning = true;

    // 1. Удаляем класс active у старого слайда
    slides[activeIndex].classList.remove('active');
    // 2. Добавляем класс active новому слайду (ширина начнёт меняться)
    slides[newIndex].classList.add('active');

    // Небольшая задержка — дожидаемся, чтобы браузер начал transition ширины
    // Без этого offset рассчитается по старой ширине
    setTimeout(() => {
      // 3. Обновляем индекс
      activeIndex = newIndex;

      // 4. Рассчитываем и применяем новую позицию трека
      updateTrackPosition();

      // 5. Ждём окончания анимации transform
      const onTransitionEnd = () => {
        track.removeEventListener('transitionend', onTransitionEnd);
        isTransitioning = false;
      };
      track.addEventListener('transitionend', onTransitionEnd);

      // Защита от зависания (если transition не сработал)
      setTimeout(() => {
        track.removeEventListener('transitionend', onTransitionEnd);
        isTransitioning = false;
      }, 400);
    }, 20); // 20ms достаточно, чтобы CSS transition запустился
  }

  // Обработчики кнопок
  prevBtn.addEventListener('click', () => goToSlide(activeIndex - 1, 'prev'));
  nextBtn.addEventListener('click', () => goToSlide(activeIndex + 1, 'next'));

  // Инициализация
  function init() {
    updateActiveClass();
    updateTrackPosition();
  }
  init();

  // Если окно меняет размер — пересчитываем позицию (ширины остаются те же, но может съехать)
  window.addEventListener('resize', () => {
    if (!isTransitioning) updateTrackPosition();
  });
})();