import { LitElement, html, unsafeCSS } from "lit";
// @ts-ignore
import styles from './MegaMenuSection.styles.css?inline';
import './MegaMenuSection.css';
import { customElement, property } from "lit/decorators.js";

@customElement("ilw-header-megamenu-section")
export default class MegaMenuSection extends LitElement {

    @property({ 
        type: Boolean
    })
    current = false;

    @property({ 
        type: Boolean
    })
    compact = false;

    @property({ 
        type: Boolean
    })
    right = false;

    @property({ 
        type: Boolean
    })
    expanded = false;

    @property({
        type: Boolean
    })
    mouseover = false;

    @property({
        reflect: true,
        type: Boolean
    })
    linked = false;

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
        this.addEventListener('keydown', this.handleWindowKeydown.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
    }

    handleToggleClick(evt: Event) {
        this.expanded = !this.expanded;
        this.dispatchEvent(new CustomEvent('ilw-header-megamenu-section-expanded', {detail: !this.expanded, bubbles: true, composed: true}));
      }

    handleWindowKeydown(evt: KeyboardEvent) {
        if (evt.key === 'ArrowDown') {
            evt.stopPropagation();
            evt.preventDefault();
            this.moveToNextItem();
            this.closeAllExceptOneSections(evt.target);
        }
        else if (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft') {
            if (this.isOnAnchorInLinked() && evt.key === 'ArrowRight') {
                evt.stopPropagation();
                evt.preventDefault();
                this.expanded = false;
                this.setFocus(true);
            } else if (this.isOnButtonInLinked() && evt.key === 'ArrowLeft') {
                evt.stopPropagation();
                evt.preventDefault();
                this.expanded = false;
                this.setFocus();
            } else if (this.isOnButtonInLinked() && evt.key === 'ArrowRight') {
                this.expanded = false;
            } else if (this.isOnAnchorInLinked() && evt.key === 'ArrowLeft') {
                this.expanded = false;
            } else {
                this.expanded = false;
                this.setFocus();
            }
        }
        else if (evt.key === 'ArrowUp') {
            evt.stopPropagation();
            evt.preventDefault();
            this.moveToPreviousItem();
            this.closeAllExceptOneSections(evt.target);
        }
        else if (evt.key === 'Escape') {
            if (this.expanded) {
                evt.stopPropagation();
                this.setFocus();
                this.expanded = false;
            }
        }
    }

    isEmbedded() {
        return this.parentElement && this.parentElement.closest('ilw-header-megamenu-section') != null;
    }

    isOnAnchorInLinked() {
        return this.linked && document.activeElement && document.activeElement.tagName === 'A';
    }

    isOnButtonInLinked() {
        return this.linked && document.activeElement && document.activeElement.tagName === 'ILW-HEADER-MEGAMENU-SECTION';
    }

    setFocus(useButton: Boolean = false) {
        let newNode: Element | null = null;
        if (this.linked && !useButton) {
            newNode = this.querySelector('a');
        }
        else if (this.shadowRoot) {
            newNode = this.shadowRoot.querySelector('a');
            if (newNode == null) {
                newNode = this.shadowRoot.querySelector('button');
            }
        }
        if (newNode != null) {
            (newNode as HTMLElement).focus();
        }
    }


    moveToNextItem() {
    if (!this.expanded && !this.isEmbedded()) {
        this.expanded = true;
    }

    const activeElement = document.activeElement as HTMLElement | null;
    if (!activeElement) return;

    const section = activeElement.closest('ILW-HEADER-MEGAMENU-SECTION');
    if (!section) return;

    const links = Array.from(section.querySelectorAll('a, button')) as HTMLElement[];
    const currentIndex = links.indexOf(activeElement);

    let nextIndex = currentIndex + 1;
    if (currentIndex === -1) {
        nextIndex = 0;
    }

    if (nextIndex >= 0 && nextIndex < links.length) {
        const nextLink = links[nextIndex];
        nextLink.focus();
    } 
}

    moveToPreviousItem() {
        const activeElement = document.activeElement as HTMLElement | null;
        if (!activeElement) return;

        const section = activeElement.closest('ILW-HEADER-MEGAMENU-SECTION');
        if (!section) return;

        const links = Array.from(section.querySelectorAll('a, button')) as HTMLElement[];
        const currentIndex = links.indexOf(activeElement);

        let prevIndex = currentIndex - 1;
        if (currentIndex === -1) {
            prevIndex = links.length - 1;
        }

        if (prevIndex >= 0 && prevIndex < links.length) {
            const prevLink = links[prevIndex];
            prevLink.focus();
        }
    }

    renderArrow() {
        return html`<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.4 23.82" aria-hidden="true">
          <path id="chevron" d="m39.34,1.06c-1.41-1.41-3.7-1.41-5.12,0l-14.02,14.02L6.18,1.06C4.76-.35,2.47-.35,1.06,1.06s-1.41,3.7,0,5.12l16.58,16.58c1.41,1.41,3.7,1.41,5.12,0L39.34,6.18c1.41-1.41,1.41-3.7,0-5.12Z"/>
        </svg>`;
      }

      toggleMouseOver() {
        this.mouseover = !this.mouseover;
      }

      handleNavigationSectionToggleClick(evt: CustomEvent) {
        evt.stopPropagation();
        this.closeAllExceptOneSections(evt.target);
    }

    getSections() {
        return this.querySelectorAll('ilw-header-megamenu-section');
    }

    closeAllExceptOneSections(target: EventTarget | null) {
        this.getSections().forEach(s => { if (target == null || target != s) { s.expanded = false; } });
    }


    render() {
        const actionSpan = this.querySelector('span[slot="action"]');
        let actionId: string | null = null;
        if (actionSpan) {
            const pText = actionSpan.querySelector('p')?.textContent?.trim() || '';
            let link = actionSpan.querySelector('a, button');
            if (pText) {
            actionId = `action-${pText.replace(/\s+/g, '-')}`; // normalize spaces
            actionSpan.id = actionId;
            }  
            if (link && actionId) {
                link.setAttribute('aria-labelledby', actionId);
            }
        }

            const lists = document.querySelectorAll<HTMLLIElement>(
            'ilw-header-megamenu-section > ul li'
            );

            const listitems = lists.length;
            const groupsoffive = Math.floor(listitems / 5);
            let columnend = groupsoffive * 5;

    
            columnend = Math.min(columnend, 15);

            lists.forEach((list, index) => {
            const position = index + 1;
            if (position <= columnend) {
                list.style.borderRight = 'solid 2px var(--il-storm-85, #d5d3d3)';
            } else {
                list.style.borderRight = 'none';
            }
            });




        let isSubMenu = this.parentElement != null && this.parentElement.closest("ilw-header-megamenu-section") != null;
                this.current = this.current || (this.getAttribute('aria-current') != null && (this.getAttribute('aria-current') === 'page' || this.getAttribute('aria-current') === 'true'));
                var withLink = html`
                    <div class="header-link ${this.mouseover ? "highlighted" : ""} ${this.compact ? "compact" : ""} ${this.current ? "current" : ""}" @mouseover="${this.toggleMouseOver.bind(this)}"  @mouseout="${this.toggleMouseOver.bind(this)}">
                        <slot name="link"></slot>
                        <button class="arrow-only" @click=${this.handleToggleClick.bind(this)} aria-expanded=${this.expanded ? 'true' : 'false'} aria-label=${this.querySelector('a[slot="link"]')?.textContent + ' submenu'} aria-controls="items">
                            ${this.renderArrow()}
                        </button>
                    </div>
                `;
        

        var withoutLink = html`
            <button class="${this.current ? "current" : ""}" @click=${this.handleToggleClick.bind(this)} aria-expanded=${this.expanded ? 'true' : 'false'} aria-controls="items">
                <div class="header">
                    <div class="label"><slot name="label"></slot> </div>
                    <div class="icon">${this.renderArrow()}</div>
                </div>
            </button>
        `;

        return html`
            <div class="${isSubMenu ? 'submenu' : 'menu'} parent" @ilw-header-megamenu-section-expanded=${this.handleNavigationSectionToggleClick}>
                ${this.linked ? withLink : withoutLink}
                <div id="items" class="${this.expanded ? 'expanded' : ''} ${this.right ? 'right' : ''}">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-header-megamenu-section": MegaMenuSection;
    }
}