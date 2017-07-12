package utils.asynctask;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.Bundle;
import android.view.View;

import in.car_parking_walkin.R;
import utils.common_functions.Common_Functions;

public class ProgressDialogEx extends ProgressDialog {
    Common_Functions com;

    public ProgressDialogEx(Context context) {
        super(context);
        com = new Common_Functions(context);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        View view = this.findViewById(android.R.id.message);
        if (view != null) {
            // Shouldn't be null. Just to be paranoid enough.
            com.setFontMediumNormal(view, com.getString(R.color.white));
        }
    }
}