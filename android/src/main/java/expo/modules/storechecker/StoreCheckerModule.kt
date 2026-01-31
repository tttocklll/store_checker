package expo.modules.storechecker

import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class StoreCheckerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("StoreChecker")

    AsyncFunction("getSource") {
      val context = appContext.reactContext ?: return@AsyncFunction null
      val packageManager = context.packageManager
      val packageName = context.packageName

      val installer = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        try {
          packageManager.getInstallSourceInfo(packageName).installingPackageName
        } catch (exception: Exception) {
          packageManager.getInstallerPackageName(packageName)
        }
      } else {
        packageManager.getInstallerPackageName(packageName)
      }

      installer
    }
  }
}
