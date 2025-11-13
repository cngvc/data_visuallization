import { DeviceType } from '@/entities/key-token.entity';
import { Request } from 'express';
import { UAParser } from 'ua-parser-js';

export interface IDeviceInfo {
  deviceName?: string;
  deviceType: DeviceType;
  os?: string;
  browser?: string;
  userAgent: string;
}

export function getDeviceInfo(userAgent: string): IDeviceInfo {
  const ua = UAParser(userAgent);
  let deviceType = DeviceType.UNKNOWN;
  if (ua.device.type) {
    deviceType = ua.device.type.toLowerCase() as DeviceType;
  } else if (ua.browser.name) {
    deviceType = DeviceType.BROWSER;
  }
  let deviceName = 'unknown';
  if (ua.device.model) {
    deviceName = ua.device.model;
    if (ua.device.vendor) {
      deviceName = `${ua.device.vendor} ${deviceName}`.trim();
    }
  } else if (ua.browser.name) {
    deviceName = `${ua.browser.name} ${ua.browser.version?.split('.')[0] || ''}`.trim();
  }
  const os = ua.os.name ? `${ua.os.name} ${ua.os.version || ''}`.trim() : 'unknown';
  const browser = ua.browser.name ? `${ua.browser.name} ${ua.browser.version?.split('.')[0] || ''}`.trim() : 'unknown';
  return {
    deviceName,
    deviceType: Object.values(DeviceType).includes(deviceType) ? deviceType : DeviceType.UNKNOWN,
    os,
    browser,
    userAgent
  };
}

export function getClientIp(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
}
