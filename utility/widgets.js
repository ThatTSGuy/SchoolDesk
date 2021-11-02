marked.setOptions({
	breaks: true,
});

class Sticky {
	constructor(x, y) {
		this.cell = desktopGrid.addWidget({
			x, y,
			w: 3, h: 3,
			content: `
			<div class="widget sticky">
				<div class="header drag-handle"></div>
				<div class="content" contenteditable></div>
			</div>
			`
		});

		this.editable = this.cell.querySelector('.content');
		this.editable.onclick = this.click.bind(this);
		this.editable.onfocus = this.focus.bind(this);
		this.editable.onblur = this.blur.bind(this);

		this.plainText = '';
	}

	click() {

	}

	focus() {
		this.editable.innerText = this.plainText;
	}

	blur() {
		this.plainText = this.editable.innerText;
		this.editable.innerHTML = marked(this.plainText);
	}
}

class YouTubeVideo {
	constructor(url, x, y) {
		this.cell = desktopGrid.addWidget({
			x, y,
			w: 5, h: 3,
			content: `
			<div class="widget youtube">
				<div class="header drag-handle"></div>
				<iframe class="content" src="https://www.youtube.com/embed/OSbhFr5TzkQ"></iframe>
			</div>
			`
		});

		this.url = url;
	}
}