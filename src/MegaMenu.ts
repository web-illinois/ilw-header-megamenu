import { LitElement, html, unsafeCSS, CSSResultGroup } from "lit";
// @ts-ignore
import styles from './MegaMenu.styles.css?inline';
import './MegaMenu.css';
import { customElement, property } from "lit/decorators.js";
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
    const activeElement = document.activeElement;
    if (!activeElement) return;

    const currentSection = activeElement.closest(
        'ilw-header-megamenu-section'
    )

    if (!currentSection) return;

    const parentLi = currentSection.parentElement;
    const previousLi = parentLi?.previousElementSibling;

    if (!previousLi) return;

    const previousSection = previousLi.querySelector(
        'ilw-header-megamenu-section'
    );

    if (!previousSection) return;

    previousSection.setFocus();
}

gotoNextSection() {
    const activeElement = document.activeElement;
    if (!activeElement) return;

    const currentSection = activeElement.closest(
        'ilw-header-megamenu-section'
    );

    if (!currentSection) return;

    const parentLi = currentSection.parentElement;
    const nextLi = parentLi?.nextElementSibling;

    if (!nextLi) return;

    const nextSection = nextLi.querySelector(
        'ilw-header-megamenu-section'
    );

    if (!nextSection) return;

    nextSection.setFocus();
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



    render() {
        return html`
            <nav aria-label="Header Menu Navigation" @ilw-header-megamenu-section-expanded=${this.handleNavigationSectionToggleClick}>
                <div class="parent ${this.compact ? 'compact' : 'full'}">
                        <slot></slot>
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