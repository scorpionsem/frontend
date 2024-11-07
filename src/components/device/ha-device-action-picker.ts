import { customElement } from 'lit/decorators';
import {
  DeviceAction,
  fetchDeviceActions,
  localizeDeviceAutomationAction,
} from '../../data/device_automation';
import { HaDeviceAutomationPicker } from './ha-device-automation-picker';

@customElement('ha-device-action-picker')
class HaDeviceActionPicker extends HaDeviceAutomationPicker<DeviceAction> {
  protected override get NO_AUTOMATION_TEXT() {
    return this.hass.localize('ui.panel.config.devices.automation.actions.no_actions');
  }

  protected override get UNKNOWN_AUTOMATION_TEXT() {
    return this.hass.localize('ui.panel.config.devices.automation.actions.unknown_action');
  }

  constructor() {
    super(
      localizeDeviceAutomationAction,
      fetchDeviceActions,
      (deviceId?: string) => ({
        device_id: deviceId || '',
        domain: '',
        entity_id: '',
      })
    );
  }

  // Optional: Add error handling and loading indicators
  protected override async fetchData(deviceId?: string) {
    try {
      const actions = await fetchDeviceActions(deviceId);
      this.items = actions;
    } catch (error) {
      // Handle errors, e.g., display an error message or log the error
      console.error('Error fetching device actions:', error);
      this.items = [];
    } finally {
      // Hide loading indicator
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-device-action-picker': HaDeviceActionPicker;
  }
}
