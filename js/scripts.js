$(() => {
	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// ЛК Админ - Заказы
	$('.lk_info .orders .order .show_hide_btn').click(function (e) {
		e.preventDefault()

		let order = $(this).closest('.order')

		if (!order.hasClass('active')) {
			$('.lk_info .orders .order .show_hide_btn').removeClass('active')
			$('.lk_info .order_info').slideUp(300)

			order.addClass('active').next().slideDown(300)
		} else {
			order.removeClass('active').next().slideUp(300)
		}
	})


	// Календарь
	new AirDatepicker('.date_from', {
		autoClose: true
	})

	new AirDatepicker('.date_to', {
		autoClose: true
	})


	// Изменение вида отображения товаров в категории
	$('.products_head .view .btn').click(function (e) {
		e.preventDefault()

		$('.products_head .view .btn').removeClass('active')
		$(this).addClass('active')

		if ($(this).hasClass('grid_btn')) {
			$('.products > .list').addClass('row')
			$('.products > .list').removeClass('list')
		}

		if ($(this).hasClass('list_btn')) {
			$('.products > .row').addClass('list')
			$('.products > .row').removeClass('row')
		}
	})

	if ($(window).width() < 768) {
		$('.products:not(.order_products) > .list').addClass('row')
		$('.products:not(.order_products) > .list').removeClass('list')

		$('.products_head .view .btn').removeClass('active')
		$('.products_head .view .btn.grid_btn').addClass('active')
	}


	// ЛК - Магазие - Заказы - Смена статуса
	$('.lk_info .orders .order .actions select').change(function (e) {
		let _self = $(this)

		setTimeout(() => {
			let val = _self.val()

			Fancybox.show([{
				src: '#seller_code_modal',
				type: 'inline'
			}])
		})
	})


	// Моб. поиск
	$('header .mob_search_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$(this).addClass('active').next().fadeIn(300)

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		} else {
			$(this).removeClass('active').next().fadeOut(200)

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})

	$(document).click((e) => {
		if ($(e.target).closest('header .info').length === 0) {
			$('header .mob_search_btn').removeClass('active')
			$('header .search').fadeOut(200)

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Моб. меню
	$('header .mob_menu_btn, .overlay').click((e) => {
		e.preventDefault()

		if (!$('header .mob_menu_btn').hasClass('active')) {
			$('header .mob_menu_btn').addClass('active')
			$('body').addClass('menu_open')
			$('header .menu, .overlay').fadeIn(300)
		} else {
			$('header .mob_menu_btn').removeClass('active')
			$('body').removeClass('menu_open')
			$('header .menu, .overlay').fadeOut(200)
		}
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Изменение вида отображения товаров в категории
	if ($(window).width() < 768) {
		$('.products > .list').addClass('row')
		$('.products > .list').removeClass('list')

		$('.products_head .view .btn').removeClass('active')
		$('.products_head .view .btn.grid_btn').addClass('active')
	}
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}