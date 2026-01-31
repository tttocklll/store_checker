import ExpoModulesCore
import Foundation

public class StoreCheckerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("StoreChecker")

    AsyncFunction("getSource") { () -> String? in
      if self.isRunningInTestFlightEnvironment() {
        return "TestFlight"
      }
      if self.isRunningInAppStoreEnvironment() {
        return "AppStore"
      }
      return ""
    }
  }

  private func isRunningInTestFlightEnvironment() -> Bool {
    if isSimulator() {
      return false
    }
    return isAppStoreReceiptSandbox() && !hasEmbeddedMobileProvision()
  }

  private func isRunningInAppStoreEnvironment() -> Bool {
    if isSimulator() {
      return false
    }
    if isAppStoreReceiptSandbox() || hasEmbeddedMobileProvision() {
      return false
    }
    return true
  }

  private func hasEmbeddedMobileProvision() -> Bool {
    return Bundle.main.path(forResource: "embedded", ofType: "mobileprovision") != nil
  }

  private func isAppStoreReceiptSandbox() -> Bool {
    if isSimulator() {
      return false
    }
    guard let appStoreReceiptURL = Bundle.main.appStoreReceiptURL else {
      return false
    }
    return appStoreReceiptURL.lastPathComponent == "sandboxReceipt"
  }

  private func isSimulator() -> Bool {
    #if targetEnvironment(simulator)
    return true
    #else
    return false
    #endif
  }
}
