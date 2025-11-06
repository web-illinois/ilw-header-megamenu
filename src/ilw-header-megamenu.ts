import { LitElement, html, unsafeCSS } from "lit";
// @ts-ignore
import styles from './ilw-header-megamenu.styles.css?inline';
import './ilw-header-megamenu.css';
import { customElement, property } from "lit/decorators.js";

@customElement("ilw-header-megamenu")
export default class HeaderMegamenu extends LitElement {

    @property()
    theme = "";

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-header-megamenu": HeaderMegamenu;
    }
}
