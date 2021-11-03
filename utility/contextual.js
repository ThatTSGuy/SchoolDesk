

function ContextualMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.classList.add('contextualMenuItem');

    menuItem.innerHTML = `
                    <i class="contextualMenuItemIcon bi bi-${item.icon || ''}"></i>
                    <div class="contextualMenuItemText">${item.text || ''}</div>
                    <div class="contextualMenuItemHint">${item.hint || ''}</div>
                    `;

    return menuItem;
}

class ContextualMenu {
    constructor(e, items) {
        this.createMenuItems(items);
        this.showMenu(e);
    }

    createMenuItems(items) {
        this.items = [];
        items.forEach(item => {
            let menuItem;

            switch (item.type) {
                case 'button':
                    menuItem = ContextualMenuItem(item);
                    menuItem.addEventListener('click', item.action);
                    break;

                case 'hover':
                    menuItem = ContextualMenuItem({ ...item, hint: '<i class="bi bi-caret-right"></i>' });
                    menuItem.addEventListener('mouseenter', hoverEvent => {

                        const bounds = menuItem.getBoundingClientRect();
                        new ContextualMenu({ clientX: bounds.right, clientY: bounds.top }, item.items);
                    });
                    break;

                case 'seperator':
                    menuItem = document.createElement('div');
                    menuItem.classList.add('contextualMenuSeperator');
                    break;
            }

            this.items.push(menuItem);
        })
    }

    showMenu(e) {
        const menu = document.createElement('div');
        menu.classList.add('contextualMenu');

        menu.append(...this.items);

        document.body.append(menu);

        preventMenuOverflow(menu, e);
    }
}

function preventMenuOverflow(menu, e) {
    const bounds = menu.getBoundingClientRect();

    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    if (e.clientX + bounds.width > window.innerWidth) menu.style.left = `${window.innerWidth - bounds.width}px`;

    if (e.clientY + bounds.height > window.innerHeight) {
        menu.style.top = `${window.innerHeight - bounds.height}px`;
    }
}