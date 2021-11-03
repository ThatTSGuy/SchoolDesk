let mouse;
document.onmousemove = e => {
    window.mouse = { left: e.clientX, top: e.clientY };
}

// const desktop = document.querySelector('.grid-stack');
const sticky = document.querySelector('.sticky')

const desktopGrid = GridStack.init({
    float: true,
    handleClass: 'drag-handle',
});

new Sticky();

document.oncontextmenu = e => {
    new ContextualMenu(e, [
        { type: 'button', icon: 'scissors', text: 'Cut', hint: 'Ctrl+X', action: () => {} },
        { type: 'button', icon: 'paperclip', text: 'Copy', hint: 'Ctrl+C', action: () => {} },
        { type: 'button', icon: 'clipboard', text: 'Paste', hint: 'Ctrl+V', action: () => {} },
        { type: 'seperator' },
        { type: 'hover', text: 'New', items: [
            { type: 'button', text: 'Folder', action: () => {} },
            { type: 'button', text: 'File', action: () => {} },
            { type: 'button', text: 'Link', action: () => {} },
        ] },
    ])

    e.preventDefault();
}