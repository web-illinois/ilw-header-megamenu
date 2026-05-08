import { LitElement, html, unsafeCSS, CSSResultGroup } from "lit";
// @ts-ignore
import styles from './MegaMenu.styles.css?inline';
import './MegaMenu.css';
import { customElement, property, state } from "lit/decorators.js";
import MegaMenuSection from "./MegaMenuSection";

@customElement("ilw-header-megamenu")
export default class MegaMenu extends LitElement {

    @property({ 
        type: Boolean,
        reflect: true
    })
    compact = false;

    @property({ 
        type: Number
    })
    width = 990;

    @state()
    _hasSlots: Record<string, boolean> = {}
    

    static get styles() : CSSResultGroup {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
        this.addEventListener('keydown', this.handleWindowKeydown.bind(this));
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleWindowClick = this.handleWindowClick.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this.handleWindowClick.bind(this));
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.handleWindowClick.bind(this));
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowClick(evt: MouseEvent) {
        if (!this.contains(evt.target as HTMLElement)) this.closeAllExceptOneSections(null);
    }
    
    handleWindowKeydown(evt: KeyboardEvent) {
        if (evt.key === 'Escape') this.closeAllExceptOneSections(null);
        if (evt.key === 'ArrowRight') {
            evt.preventDefault();
            this.closeAllExceptOneSections(null);
            this.gotoNextSection();
        }
        if (evt.key === 'ArrowLeft') {
            evt.preventDefault();
            this.closeAllExceptOneSections(null);
            this.gotoPreviousSection();
        }
    }

    handleNavigationSectionToggleClick(evt: CustomEvent) {
        this.closeAllExceptOneSections(evt.target);
    }

    gotoPreviousSection() {
        let newNode: Element | null = null;
        let activeElement = document.activeElement;
        if (activeElement != null) {
            if (activeElement.closest('li') && (activeElement.closest('li') as Element).previousElementSibling    ) {
                const previousSibling = (activeElement.closest('li') as Element).previousElementSibling;
                if (previousSibling && previousSibling.children.length > 0) {
                    newNode = previousSibling.children[0];
                }
            }
            if (newNode && newNode.tagName === 'ILW-HEADER-MEGAMENU-SECTION') {
                (newNode as MegaMenuSection).setFocus(true);
            } else {
                (newNode as HTMLElement).focus();
            }
        }
    }

    gotoNextSection() {
        let newNode: Element | null = null;
        let activeElement = document.activeElement;
        if (activeElement != null) {
            if (activeElement.closest('li') && (activeElement.closest('li') as Element).nextElementSibling) {
                const nextSibling = (activeElement.closest('li') as Element).nextElementSibling;
                if (nextSibling && nextSibling.children.length > 0) {
                    newNode = nextSibling.children[0];
                }
            }
            if (newNode && newNode.tagName === 'ILW-HEADER-MEGAMENU-SECTION') {
                (newNode as MegaMenuSection).setFocus();
            } else {
                (newNode as HTMLElement).focus();
            }
        }
    }

    handleWindowResize() {
        let currentWidth = this.offsetWidth == 0 ? window.innerWidth : this.offsetWidth;
        if (currentWidth < this.width) {
            if (!this.compact) this.setCompactTrue();
        }
        else {
            if (this.compact) this.setCompactFalse();
        }
    }

    setCompactTrue() {
        this.compact = true;
        this.querySelectorAll('ilw-header-megamenu-section').forEach(s => { s.compact = true; });
    }

    setCompactFalse() {
        this.compact = false;
        this.querySelectorAll('ilw-header-megamenu-section').forEach(s => { s.compact = false; });
    }

    getSections() {
        return this.querySelectorAll('ilw-header-megamenu-section');
    }

    closeAllExceptOneSections(target: EventTarget | null) {
        this.getSections().forEach(s => { if (target == null || target != s) { s.expanded = false; } });
    }

    /**
     * Tracks the number of secondary items (images and call-to-action) in the menu section so we can
     * limit the number of secondary items to 1, either left or right.
     *
     * @private
     */
    _slotsChanged() {
        let slots = this.shadowRoot!.querySelectorAll("slot");

        let hasSlots: Record<string, boolean> = {};
        for (let slot of slots) {
            if (slot.name && slot.assignedElements().length > 0) {
                hasSlots[slot.name] = true;
            }
        }
        this._hasSlots = hasSlots;
    }

    render() {
        return html`
            <nav aria-label="Header Menu Navigation" @ilw-header-megamenu-section-expanded=${this.handleNavigationSectionToggleClick}>
                <div class="parent ${this.compact ? 'compact' : 'full'}">
                        <slot
                            name="action-left"
                            @slotchange=${this._slotsChanged}
                        ></slot>
                        <slot></slot>
                        <slot
                            name="action-right"
                            @slotchange=${this._slotsChanged}
                        ></slot>
                    
                </div>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-header-megamenu": MegaMenu;
    }
}