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
    new Contextual({
        width: '320px',
        items: [
            {
                type: 'multi', items: [
                    { label: 'Copy', onClick: () => { console.log('Copy!') } },
                    { label: 'Cut', onClick: () => { console.log('Cut!') } },
                    { label: 'Paste', onClick: () => { console.log('Paste!') } },
                ]
            },
            { label: 'Button', onClick: () => { console.log('Item 1 clicked') }, shortcut: 'Ctrl+A' },
            { type: 'seperator' },
            {
                type: 'submenu', label: 'Sub menu', items: [
                    { label: 'Subitem 1', onClick: () => { } },
                    { label: 'Subitem 2', onClick: () => { } },
                    { label: 'Subitem 3', onClick: () => { } },
                ]
            },
            {
                type: 'hovermenu', label: 'Hover menu', items: [
                    { label: 'Subitem 1', onClick: () => { } },
                    { label: 'Subitem 2', onClick: () => { } },
                    { label: 'Subitem 3', onClick: () => { } },
                ]
            },
            { label: 'Disabled button', onClick: () => { }, shortcut: 'Ctrl+B', enabled: false },
        ]
    });

    e.preventDefault();
}

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