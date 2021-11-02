marked.setOptions({
	breaks: true,
});

class Sticky {
	constructor(x, y) {
		this.cell = desktopGrid.addWidget({
			x, y,
			w: 3, h: 3,
			content: `
			<div class="sticky">
				<div class="header drag-handle"></div>
				<div class="editable" contenteditable></div>
			</div>
			`
		});

		this.editable = this.cell.querySelector('.editable');
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