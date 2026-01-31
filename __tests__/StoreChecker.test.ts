const platform = { OS: 'android' as 'android' | 'ios' | 'macos' | 'web' };

jest.mock('react-native', () => ({
  Platform: platform
}));

jest.mock('../src/StoreCheckerModule', () => ({
  __esModule: true,
  default: {
    getSource: jest.fn()
  }
}));

import StoreCheckerModule from '../src/StoreCheckerModule';
import { getSource } from '../src/StoreChecker';
import { Source } from '../src/types';

describe('getSource', () => {
  beforeEach(() => {
    (StoreCheckerModule.getSource as jest.Mock).mockReset();
  });

  it('maps android null to local source', async () => {
    platform.OS = 'android';
    (StoreCheckerModule.getSource as jest.Mock).mockResolvedValue(null);

    await expect(getSource()).resolves.toBe(Source.IS_INSTALLED_FROM_LOCAL_SOURCE);
  });

  it('maps android play store installer', async () => {
    platform.OS = 'android';
    (StoreCheckerModule.getSource as jest.Mock).mockResolvedValue('com.android.vending');

    await expect(getSource()).resolves.toBe(Source.IS_INSTALLED_FROM_PLAY_STORE);
  });

  it('maps android unknown installer to other source', async () => {
    platform.OS = 'android';
    (StoreCheckerModule.getSource as jest.Mock).mockResolvedValue('com.example.market');

    await expect(getSource()).resolves.toBe(Source.IS_INSTALLED_FROM_OTHER_SOURCE);
  });

  it('maps ios null to unknown', async () => {
    platform.OS = 'ios';
    (StoreCheckerModule.getSource as jest.Mock).mockResolvedValue(null);

    await expect(getSource()).resolves.toBe(Source.UNKNOWN);
  });

  it('maps ios empty string to local source', async () => {
    platform.OS = 'ios';
    (StoreCheckerModule.getSource as jest.Mock).mockResolvedValue('');

    await expect(getSource()).resolves.toBe(Source.IS_INSTALLED_FROM_LOCAL_SOURCE);
  });

  it('maps ios AppStore to app store source', async () => {
    platform.OS = 'ios';
    (StoreCheckerModule.getSource as jest.Mock).mockResolvedValue('AppStore');

    await expect(getSource()).resolves.toBe(Source.IS_INSTALLED_FROM_APP_STORE);
  });

  it('maps ios other value to TestFlight', async () => {
    platform.OS = 'ios';
    (StoreCheckerModule.getSource as jest.Mock).mockResolvedValue('TestFlight');

    await expect(getSource()).resolves.toBe(Source.IS_INSTALLED_FROM_TEST_FLIGHT);
  });

  it('returns unknown for non-android/ios platforms', async () => {
    platform.OS = 'web';
    (StoreCheckerModule.getSource as jest.Mock).mockResolvedValue(null);

    await expect(getSource()).resolves.toBe(Source.UNKNOWN);
  });
});
