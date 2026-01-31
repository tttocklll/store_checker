import { requireNativeModule } from 'expo-modules-core';

type StoreCheckerNativeModule = {
  getSource: () => Promise<string | null>;
};

export default requireNativeModule<StoreCheckerNativeModule>('StoreChecker');
