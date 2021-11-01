const menu = new ContextMenu('.desktop', [
    {
        name: 'New Sticky Note',
        fn: () => {
            console.log('est')
        },
    },
    {},
]);

menu.on('shown', () => console.log('Created'))