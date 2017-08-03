package com.contactsmg;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;
import com.facebook.react.ReactActivity;
public class MainActivity extends ReactActivity implements OnImagePickerPermissionsCallback {
private PermissionListener listener;
    @Override
    protected String getMainComponentName() {
        return "ContactsMg";
    }
    @Override
    public void setPermissionListener(PermissionListener listener)
    {
      this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
      if (listener != null)
      {
        listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
      }
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
