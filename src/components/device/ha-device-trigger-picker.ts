import { customElement } from 'lit/decorators';
import {
  DeviceTrigger,
  fetchDeviceTriggers,
  localizeDeviceAutomationTrigger,
} from '../../data/device_automation';
import { HaDeviceAutomationPicker } from './ha-device-automation-picker';

@customElement('ha-device-trigger-picker')
class HaDeviceTriggerPicker extends HaDeviceAutomationPicker<DeviceTrigger> {
  protected override get NO_AUTOMATION_TEXT() {
    return this.hass.localize('ui.panel.config.devices.automation.triggers.no_triggers');
  }

  protected override get UNKNOWN_AUTOMATION_TEXT() {
    return this.hass.localize('ui.panel.config.devices.automation.triggers.unknown_trigger');
  }

  constructor() {
    super(
      localizeDeviceAutomationTrigger,
      fetchDeviceTriggers,
      (deviceId?: string) => ({
        device_id: deviceId || '',
        platform: 'device',
        domain: '',
        entity_id: '',
      })
    );
  }

  // Optional: Add error handling and loading indicators
  protected override async fetchData(deviceId?: string) {
    try {
      const triggers = await fetchDeviceTriggers(deviceId);
      this.items = triggers;
    } catch (error) {
      // Handle errors, e.g., display an error message or log the error
      console.error('Error fetching device triggers:', error);
      this.items = [];
    } finally {
      // Hide loading indicator
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-device-trigger-picker': HaDeviceTriggerPicker;
  }
}
