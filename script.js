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

const menu = new ContextMenu('.grid-stack', [
    {
        name: 'New Sticky',
        fn: e => {
            const cell = desktopGrid.getCellFromPixel(window.mouse);
            new Sticky(cell.x, cell.y);
        },
    },
    {},
]);