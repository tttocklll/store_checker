# Expo Store Checker

[![npm version](https://img.shields.io/npm/v/expo-store-checker)](https://www.npmjs.com/package/expo-store-checker)
[![npm downloads](https://img.shields.io/npm/dt/expo-store-checker)](https://www.npmjs.com/package/expo-store-checker)
[![license](https://img.shields.io/npm/l/expo-store-checker)](https://github.com/tttocklll/store_checker/blob/main/LICENSE)

An Expo/React Native module that detects where the current app was installed from (Play Store, App Store, TestFlight, etc.).
This is a port of the Flutter package [`store_checker`](https://pub.dev/packages/store_checker).

## Install

```bash
npm install expo-store-checker
# or
yarn add expo-store-checker
```

### Expo (managed)

This module contains native code, so you must use a development build or prebuild/EAS Build:

```bash
npx expo prebuild
```

## Usage

```ts
import { getSource, Source } from 'expo-store-checker';

const source = await getSource();

if (source === Source.IS_INSTALLED_FROM_PLAY_STORE) {
  // Play Store
}
```

`getSourceAsync` is also exported as an alias of `getSource`.

## Sources

### Android

- `IS_INSTALLED_FROM_PLAY_STORE`
- `IS_INSTALLED_FROM_PLAY_PACKAGE_INSTALLER`
- `IS_INSTALLED_FROM_RU_STORE`
- `IS_INSTALLED_FROM_LOCAL_SOURCE`
- `IS_INSTALLED_FROM_AMAZON_APP_STORE`
- `IS_INSTALLED_FROM_HUAWEI_APP_GALLERY`
- `IS_INSTALLED_FROM_SAMSUNG_GALAXY_STORE`
- `IS_INSTALLED_FROM_SAMSUNG_SMART_SWITCH_MOBILE`
- `IS_INSTALLED_FROM_OPPO_APP_MARKET`
- `IS_INSTALLED_FROM_XIAOMI_GET_APPS`
- `IS_INSTALLED_FROM_VIVO_APP_STORE`
- `IS_INSTALLED_FROM_OTHER_SOURCE`

### iOS

- `IS_INSTALLED_FROM_APP_STORE`
- `IS_INSTALLED_FROM_TEST_FLIGHT`
- `IS_INSTALLED_FROM_LOCAL_SOURCE` (enterprise/adhoc/sideloaded)
- `UNKNOWN`

## Notes

- On iOS, TestFlight is detected using the sandbox receipt heuristic.
- On Android, this module uses the installer package name reported by the system.
- Web always returns `UNKNOWN`.

## License

MIT
