let activeMenus = [];

class ContextualMenu {
    /**
     * Create a contextual menu.
     * @param {ContextualMenuItem[]} items - The items to display in the menu.
     * @param {Object} options - Options for the menu.
     * @param {node} [options.element] - The element that will listen for the options.event to display the menu.
     * @param {string} [options.event='contextmenu'] - The event to listen for to display the menu. Defaults to 'contextmenu'.
     * @param {number} [options.x] - The x position of the menu. Defaults to the event's x coordinate.
     * @param {number} [options.y] - The y position of the menu. Defaults to the event's y coordinate.
     * @param {number} [options.width=260] - The width of the menu. Defaults to 260.
     * @param {boolean} [options.sticky=false] - Whether the menu should stay open after a click. Defaults to false.
     * @param {boolean} [options.destroyExistingMenus=true] - Whether to destroy existing menus. Defaults to true.
     */
    constructor(items, options) {
        this.items = items;
        this.destroyExistingMenus = options.destroyExistingMenus ?? true;
        this.sticky = options.sticky;
        this.width = options.width || 260;

        if (options.element) {
            options.element.addEventListener(options.event || 'contextmenu', event => {
                event.preventDefault();
                this.createMenu(this.items, options.x || event.clientX, options.x || event.clientY);
            });
        } else {
            this.createMenu(items, options.x, options.y);
        }
    }

    destroy() {
        this.menu.remove();
        this.activeHoverMenu?.destroy();
    }

    setMenuItems(items = this.items) {
        while (this.menu.firstChild) this.menu.removeChild(this.menu.lastChild);

        items.forEach(item => this.menu.appendChild(new ContextualMenuItem(item, this).element));
    }

    createMenu(menuItems, x, y) {
        if (this.destroyExistingMenus) {
            activeMenus.forEach(menu => menu.destroy());
            activeMenus = [];
        }

        if (!this.sticky) {
            activeMenus.push(this);
            window.addEventListener('click', () => {
                this.destroy();
            });
        }

        this.menu = document.createElement('div');
        this.menu.classList.add('contextualMenu');

        this.setMenuItems(menuItems);

        document.body.appendChild(this.menu);

        this.menu.style.width = `${this.width}px`;
        const bounds = this.menu.getBoundingClientRect();

        this.menu.style.left = `${x}px`;
        this.menu.style.top = `${y}px`;

        if (x + bounds.width > window.innerWidth) this.menu.style.left = `${window.innerWidth - bounds.width}px`;
        if (y + bounds.height > window.innerHeight) this.menu.style.top = `${window.innerHeight - bounds.height}px`;
    }
}

class ContextualMenuItem {
    /**
     * 
     * @param {Object} options 
     * @param {string} options.text - The text to display in the menu item. Ex: 'Copy'
     * @param {string} [options.icon] - The Bootstrap icon to display in the menu item. Ex: 'bi-plus'
     * @param {string} [options.hint] - The hint to display in the menu item. Ex: 'Ctrl+A'
     * @param {void} options.action - The function to call when the menu item is clicked.
     * @param {ContextualMenuItem[]} options.items - If the menu item is a hoverable item, this is the items to display in the hover menu.
     * @param {number} [options.width=260] - If the menu item is a hoverable item, this is the width of the hover menu.
     * @param {ContextualMenu} parent - The parent menu.
     */
    constructor(options, parent) {
        switch (options.type || 'button') {
            case 'button': this.button(options.text, options.icon, options.hint, options.action); break;
            case 'hover': this.hover(parent, options.text, options.icon, options.hint, options.items, options.width); break;
            case 'seperator': this.seperator(); break;
        }
    }

    button(text, icon = '', hint = '', action) {
        const item = this.createItemDiv('contextualMenuItem', `
        <i class="contextualMenuItemIcon bi bi-${icon}"></i>
        <div class="contextualMenuItemText">${text}</div>
        <div class="contextualMenuItemHint">${hint}</div>
        `);

        item.addEventListener('click', action);

        this.element = item;
    }

    hover(parent, text, icon = '', hint = '', items, width = 260) {
        const item = this.createItemDiv('contextualMenuItem', `
        <i class="contextualMenuItemIcon bi ${icon}"></i>
        <div class="contextualMenuItemText">${text}</div>
        <div class="contextualMenuItemHint">${hint}</div>
        <i class="contextualMenuItemHoverable bi bi-caret-right-fill"></i>
        `);

        item.addEventListener('mouseenter', () => {
            parent.menu.classList.add('contextualMenuDimmer');
            parent.activeHoverMenu?.destroy();

            const bounds = item.getBoundingClientRect();
            parent.activeHoverMenu = new ContextualMenu(items, { x: bounds.right - 10, y: bounds.top, destroyExistingMenus: false, width });
        });

        this.element = item;
    }

    seperator() {
        this.element = this.createItemDiv('contextualMenuSeperator');
    }

    createItemDiv(name, html = '') {
        const div = document.createElement('div');

        div.classList.add(name);
        div.insertAdjacentHTML('beforeend', html);

        return div;
    }
}