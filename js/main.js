const frame = document.querySelector('section');
const mask = document.querySelector('aside');
const delay = convertSpeed('aside');

let imgs = '';

for (let i = 0; i < 200; i++) {
	imgs += `<img src='img/pic${i}.jpg' alt='pic${i}'/>`;
}

frame.innerHTML = imgs;

const imgDOM = frame.querySelectorAll('img');
let count = 0;

imgDOM.forEach((img) => {
	img.onload = () => {
		count++;
		const percent = parseInt((count / 200) * 100);
		mask.querySelector('span').innerText = percent;
		mask.querySelector('.bar').style.width = percent + '%';

		if (percent === 100) {
			mask.classList.add('off');

			setTimeout(() => {
				mask.remove();
			}, delay);
		}
	};
});

window.addEventListener('mousemove', (e) => {
	const wid = window.innerWidth;
	const percent = parseInt((e.pageX / wid) * 200);

	for (let img of imgDOM) img.style.display = 'none';
	imgDOM[percent].style.display = 'block';
});

function convertSpeed(el) {
	const item = document.querySelector(el);
	let dur = parseFloat(getComputedStyle(item).transitionDuration) * 1000;
	return dur;
}
