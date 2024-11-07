import { MdList } from '@material/web/list/list';
import { css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('ha-list-new')
export class HaListNew extends MdList {
  static override styles = [
    ...super.styles,
    css`
      :host {
        --md-sys-color-surface: var(--card-background-color);
      }

      /* More specific selector to override default styles if needed */
      :host md-list {
        /* ...additional styles */
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-list-new': HaListNew;
  }
}
