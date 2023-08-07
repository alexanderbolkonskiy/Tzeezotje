import Swiper, { Autoplay, Navigation } from "swiper"; //Navigation,Pagination,Autoplay

const overlay = document.querySelector(".t-overlay");

const showOverlay = () => {
	const animationDuration = 300;
	overlay.style.display = "block";
	overlay.animate({ opacity: [0, 1] }, { duration: animationDuration, easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)" });
};

const hideOverlay = () => {
	const animationDuration = 300;
	overlay.animate({ opacity: [1, 0] }, { duration: animationDuration, easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)" });
	setTimeout(function () {
		overlay.style.display = "none";
	}, animationDuration);
};

export function mobMenu() {
	const menuBtn = document.getElementById("menu-btn");

	const openClass = "menu-open";
	const html = document.getElementsByTagName("html")[0];
	const closeBtn = document.querySelector(".close-menu-btn");

	const swipe = () => {
		let startX = 0;
		let startY = 0;

		function handleTouchStart(event) {
			startX = event.touches[0].clientX;
			startY = event.touches[0].clientY;
		}

		function handleTouchEnd(event) {
			const deltaX = event.changedTouches[0].clientX - startX;
			const deltaY = event.changedTouches[0].clientY - startY;

			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				if (deltaX > 0) {
					if (html.classList.contains("menu-open")) {
						closeMenu();
					}
				}
			}
		}

		document.addEventListener("touchstart", handleTouchStart, false);
		document.addEventListener("touchend", handleTouchEnd, false);
	};

	const closeMenu = () => {
		hideOverlay();
		html.classList.remove(openClass);
		html.classList.remove('no-scroll');
	};

	const openMenu = () => {
		showOverlay();
		html.classList.add(openClass);
		html.classList.add('no-scroll');
	};

	const toggleMenu = () => {
		if (!html.classList.contains(openClass)) {
			showOverlay();
			openMenu();
		} else {
			hideOverlay();
			closeMenu();
		}
	};

	menuBtn.addEventListener("click", function (e) {
		e.preventDefault();
		toggleMenu();
	});

	overlay.addEventListener("click", function (e) {
		e.preventDefault();
		if (html.classList.contains(openClass)) {
			hideOverlay();
			closeMenu();
		}
	});

	closeBtn.addEventListener("click", function (e) {
		e.preventDefault();
		if (html.classList.contains(openClass)) {
			hideOverlay();
			closeMenu();
		}
	});

	swipe();
}

export const fixedHeader = () => {
	const header = document.querySelector(".header");
	const headerHeight = header.offsetHeight;

	window.addEventListener("scroll", () => {
		if (window.pageYOffset > headerHeight) {
			header.classList.add("header--fixed");
		} else {
			header.classList.remove("header--fixed");
		}
	});
};

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? "webp" : "no-webp";
		document.documentElement.classList.add(className);
	});
}

export function swiper() {
	const swiper = new Swiper(".t-swiper", {
		modules: [Navigation, Autoplay],
		slidesPerView: 1,
		loop: true,
		simulateTouch: true,

		autoplay: {
			delay: 3000,
			pauseOnMouseEnte: true,
			disableOnInteraction: true,
		},

		navigation: {
			nextEl: ".t-swiper-button-next",
			prevEl: ".t-swiper-button-prev",
		},
	});
	let sliders = document.querySelectorAll(".swiper");
	sliders.forEach(function (slider) {
		slider.addEventListener("mouseover", function () {
			let thisSlider = slider.swiper;
			thisSlider.autoplay.stop();
		});
		slider.addEventListener("mouseout", function () {
			let thisSlider = slider.swiper;
			thisSlider.autoplay.start();
		});
	});
}

export const myModal = () => {
	const html = document.querySelector("html");
	const btns = document.querySelectorAll("[data-modal]");
	const closeBtn = document.querySelectorAll(".modal-close-btn");
	const modals = document.querySelectorAll(".modal");
	closeBtn.forEach((btn) => {
		btn.addEventListener("click", function () {
			let modal = this.closest(".modal");
			if (modal.classList.contains("modal-open")) {
				hideModal(modal);
				hideOverlay();
			}
		});
	});

	overlay.addEventListener("click", function () {
		modals.forEach((modal) => {
			if (modal.classList.contains("modal-open")) {
				hideModal(modal);
				hideOverlay();
			}
		});
	});

	btns.forEach((btn) => {
		btn.addEventListener("click", function () {
			let data = this.dataset.modal;

			if (data) {
				let modal = document.getElementById(data);
				showModal(modal);
				showOverlay();
			}
		});
	});

	const showModal = (modal) => {
		const animationDuration = 300;
		modal.style.display = "block";
		modal.classList.add("modal-open");
		html.classList.add('no-scroll');
		modal.animate(
			{
				opacity: [0, 1],
				transform: ["translate(-50%, -50%) scale(0.8) ", "translate(-50%, -50%) scale(1) "],
			},
			{ duration: animationDuration, easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)" }
		);
	};

	const hideModal = (modal) => {
		const animationDuration = 300;
		html.classList.remove('no-scroll');
		const animation = modal.animate(
			{
				opacity: [1, 0],
				transform: ["translate(-50%, -50%) scale(1)", "translate(-50%, -50%) scale(0.8)"],
			},
			{ duration: animationDuration, easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)" }
		);

		animation.onfinish = () => {
			modal.style.display = "none";
			modal.classList.remove("modal-open");
		};
	};
};

export function sendForm() {
	let forms = document.querySelectorAll(".t-form");
	let blockFormMessage = document.createElement("div");
	blockFormMessage.className = "t-message";
	forms.forEach((item) => {
		let form = item;
		item.prepend(blockFormMessage);
		function showFormMessage(message, status) {
			blockFormMessage.innerText = message;
			if (status === "ok") {
				blockFormMessage.classList.add("message_show", "_ok");
			} else {
				blockFormMessage.classList.add("message_show", "_error");
			}
			blockFormMessage.addEventListener("click", () => {
				blockFormMessage.classList.remove("message_show", "_ok", "_error");
			});
			setTimeout(() => {
				blockFormMessage.classList.remove("message_show", "_ok", "_error");
				blockFormMessage.innerText = "";
			}, 6 * 1000);
		}
		form.addEventListener("submit", formSend);
		async function formSend(e) {
			e.preventDefault();
			let error = formValidate(form);
			let formData = new FormData(form);
			if (formImage) {
				formData.append("image", formImage.files[0]);
			}

			if (error === 0) {
				form.classList.add("_sending");
				let response = await fetch("sendmail.php", {
					method: "POST",
					body: formData,
				});
				if (response.ok) {
					let result = await response.json();
					showFormMessage(result.message, "ok");
					if (formPreview) {
						formPreview.innerHTML = "";
					}

					form.reset();
					form.classList.remove("_sending");
				} else {
					showFormMessage("Ошибка");
					form.classList.remove("_sending");
				}
			} else {
				showFormMessage("Заполните обязательные поля");
			}
		}
		function formValidate(form) {
			let error = 0;
			let formReq = form.querySelectorAll("._req");
			for (let index = 0; index < formReq.length; index++) {
				const input = formReq[index];
				formRemoveError(input);
				if (input.classList.contains("_email")) {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}
				} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
					formAddError(input);
					error++;
				} else {
					if (input.value === "") {
						formAddError(input);
						error++;
					}
				}
			}
			return error;
		}

		function formAddError(input) {
			input.classList.add("_error");
			input.classList.add("_error");
		}

		function formRemoveError(input) {
			input.classList.remove("_error");
			input.classList.remove("_error");
		}

		function emailTest(input) {
			return !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				input.value
			);
		}

		const formImage = document.getElementById("formImage");
		const formPreview = document.getElementById("formPreview");
		if (formImage) {
			formImage.addEventListener("change", () => {
				uploadFile(formImage.files[0]);
			});
		}

		function uploadFile(file) {
			if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
				showFormMessage("Разрешены изображения формата jpeg, png, gif.");
				formImage.value = "";
				if (formPreview) {
					formPreview.innerHTML = "";
				}

				return;
			}
			if (file.size > 2 * 1024 * 1024) {
				showFormMessage("файл должен быть менее 2 МБ");
				return;
			}
			var reader = new FileReader();
			reader.addEventListener(
				"load",
				() => {
					if (formPreview) {
						formPreview.innerHTML = `<picture><source srcset="${reader.result}" type="image/webp"><img src="${reader.result}" alt="Фото"></picture>`;
					}
				},
				false
			);
			reader.readAsDataURL(file);
			reader.addEventListener("error", (event) => {
				showFormMessage("Ошибка");
			});
		}
	});

	var eventCalllback = function (e) {
		var el = e.target,
			clearVal = el.dataset.phoneClear,
			pattern = el.dataset.phonePattern,
			matrix_def = "+7(___) ___-__-__",
			matrix = pattern ? pattern : matrix_def,
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = e.target.value.replace(/\D/g, "");
		if (clearVal !== "false" && e.type === "blur") {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = "";
				return;
			}
		}
		if (def.length >= val.length) val = def;
		e.target.value = matrix.replace(/./g, function (a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
		});
	};

	var phone_inputs = document.querySelectorAll("[data-phone-pattern]");
	for (let elem of phone_inputs) {
		for (let ev of ["input", "blur", "focus"]) {
			elem.addEventListener(ev, eventCalllback);
		}
	}
}

export const isDesktop = () => {
	return window.innerWidth >= 992;
};

export const isMobile = () => {
	return window.innerWidth < 992;
};

export function upBtn() {
	const scrollToTopBtns = document.querySelectorAll(".up-btn");
	const triggerPosition = window.innerHeight * 0.5;
	function toggleButtonClass(button, flag) {
		button.classList.toggle("--show", flag);
	}

	scrollToTopBtns.forEach((btn) => {
		window.addEventListener("scroll", () => {
			toggleButtonClass(btn, window.scrollY > triggerPosition);
		});

		btn.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	});
}

export function scrollTo() {
	const sections = document.querySelectorAll(".section");
	const header = document.querySelector(".header");
	const headerHeight = header.offsetHeight;
	const contactsSection = document.querySelector(".contacts-section");
	const contactsSectionHeight = contactsSection.offsetHeight;
	const navLinks = document.querySelectorAll(".nav-desktop a");
	const navLinksArr = Array.from(navLinks);
	window.addEventListener("scroll", function () {
		const curPos = window.scrollY;
		sections.forEach(function (section) {
			const top = section.offsetTop - headerHeight;
			const bottom = top + section.offsetHeight;
			if (curPos >= top && curPos <= bottom) {
				const activeLinks = header.querySelectorAll(".active");
				activeLinks.forEach(function (link) {
					link.classList.remove("active");
				});
				const linkId = `a[href="#${section.id}"]`;
				document.querySelector(linkId).classList.add("active");
			}
		});
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - contactsSectionHeight / 2) {
			const activeLinks = header.querySelectorAll(".active");
			activeLinks.forEach(function (link) {
				link.classList.remove("active");
			});
			navLinksArr.at(-1).classList.add("active");
		}
	});

	const links = document.querySelectorAll("nav a");
	links.forEach(function (link) {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const el = this;
			const id = el.getAttribute("href");
			window.scrollTo({
				top: document.querySelector(id).offsetTop - headerHeight + 1,
				behavior: "smooth",
			});
			return false;
		});
	});
}
