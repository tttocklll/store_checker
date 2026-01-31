import { Platform } from 'react-native';

import StoreCheckerModule from './StoreCheckerModule';
import { Source } from './types';

const ANDROID_INSTALLER_MAP: Record<string, Source> = {
  'com.android.vending': Source.IS_INSTALLED_FROM_PLAY_STORE,
  'com.google.android.packageinstaller': Source.IS_INSTALLED_FROM_PLAY_PACKAGE_INSTALLER,
  'com.android.packageinstaller': Source.IS_INSTALLED_FROM_PLAY_PACKAGE_INSTALLER,
  'com.amazon.venezia': Source.IS_INSTALLED_FROM_AMAZON_APP_STORE,
  'com.huawei.appmarket': Source.IS_INSTALLED_FROM_HUAWEI_APP_GALLERY,
  'com.sec.android.app.samsungapps': Source.IS_INSTALLED_FROM_SAMSUNG_GALAXY_STORE,
  'com.sec.android.easyMover': Source.IS_INSTALLED_FROM_SAMSUNG_SMART_SWITCH_MOBILE,
  'com.oppo.market': Source.IS_INSTALLED_FROM_OPPO_APP_MARKET,
  'com.xiaomi.mipicks': Source.IS_INSTALLED_FROM_XIAOMI_GET_APPS,
  'com.vivo.appstore': Source.IS_INSTALLED_FROM_VIVO_APP_STORE,
  'ru.vk.store': Source.IS_INSTALLED_FROM_RU_STORE,
  'com.android.shell': Source.IS_INSTALLED_FROM_LOCAL_SOURCE
};

export async function getSource(): Promise<Source> {
  const sourceName = await StoreCheckerModule.getSource();

  if (Platform.OS === 'android') {
    if (sourceName == null) {
      return Source.IS_INSTALLED_FROM_LOCAL_SOURCE;
    }
    return ANDROID_INSTALLER_MAP[sourceName] ?? Source.IS_INSTALLED_FROM_OTHER_SOURCE;
  }

  if (Platform.OS === 'ios' || Platform.OS === 'macos') {
    if (sourceName == null) {
      return Source.UNKNOWN;
    }
    if (sourceName.length === 0) {
      return Source.IS_INSTALLED_FROM_LOCAL_SOURCE;
    }
    if (sourceName === 'AppStore') {
      return Source.IS_INSTALLED_FROM_APP_STORE;
    }
    return Source.IS_INSTALLED_FROM_TEST_FLIGHT;
  }

  return Source.UNKNOWN;
}

export const getSourceAsync = getSource;

export const StoreChecker = {
  getSource,
  getSourceAsync
};
