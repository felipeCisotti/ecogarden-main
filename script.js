class StickyNavigation {

	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function () {
			self.onTabClick(event, $(this));
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}

	}

	onTabClick(event, element) {
    const href = element.attr('href');
    
    // Se for um link âncora (#), faz scroll suave
    if (href.startsWith('#')) {
        event.preventDefault();
        let scrollTop = $(href).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTop }, 600);
    }
    // Se for um link normal (/calendario/...), deixa abrir normalmente
	}

	onScroll() {
		this.checkTabContainerPosition();
		this.findCurrentTabSelector();
	}

	onResize() {
		if (this.currentId) {
			this.setSliderCss();
		}
	}

	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if ($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		}
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}

	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function () {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if (this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}

	setSliderCss() {
		let width = 0;
		let left = 0;
		if (this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}

}

new StickyNavigation();

const carousel = document.getElementById('carousel');
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');

let scrollAmount = 0;
const scrollStep = 150;

leftBtn.addEventListener('click', () => {
	carousel.scrollBy({ left: -scrollStep, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
	carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
});

// Auto scroll
let autoScroll = setInterval(() => {
	carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
}, 3000);

// Pause on hover
carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
carousel.addEventListener('mouseleave', () => {
	autoScroll = setInterval(() => {
		carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
	}, 3000);
});