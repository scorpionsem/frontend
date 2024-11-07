import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';

@customElement('ha-faded')
class HaFaded extends LitElement {
  @property({ type: Number, attribute: 'faded-height' })
  public fadedHeight = 102;

  @state() private _contentShown = false;
  @state() private _slottedHeight = 0;

  protected render(): TemplateResult {
    return html`
      <div
        class="container ${classMap({ faded: !this._contentShown })}"
        style=${!this._contentShown ? `max-height: ${this.fadedHeight}px` : ''}
        @click=${this._showContent}
      >
        <slot
          @slotchange=${this._handleSlotChange}
        ></slot>
      </div>
    `;
  }

  private _handleSlotChange() {
    // Schedule height calculation and update using requestAnimationFrame
    requestAnimationFrame(() => {
      this._slottedHeight = this.shadowRoot!.querySelector('.container')?.clientHeight || 0;
      this._setShowContent();
    });
  }

  private _setShowContent() {
    this._contentShown = this._slottedHeight !== 0 && this._slottedHeight <= this.fadedHeight + 50;
  }

  private _showContent(): void {
    this._contentShown = true;
  }

  static get styles(): CSSResultGroup {
    return css`
      /* ...existing styles */
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-faded': HaFaded;
  }
}
