package com.hcodes.stoxmanager.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.splashscreen.SplashScreenPackage(),
        new expo.modules.sqlite.SQLitePackage()
    );
  }
}
