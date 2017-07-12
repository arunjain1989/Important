package utils.asynctask;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.drawable.ColorDrawable;
import android.view.Display;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.TextView;

import in.car_parking_walkin.R;

public class Common_Async_Utils {

    public static Dialog dialog_Download = null;
    public static Dialog dialog_Delete = null;
    public static Dialog dialog_Get = null;
    public static Dialog dialog_Post_Frag = null;
    public static Dialog dialog_Post_Home = null;
    public static Dialog dialog_Post = null;
    public static Dialog dialog_Upload = null;

    /**
     * Alert Dialog to show the messages to user with yes or No
     *
     * @param message - to show in Alert Dialog
     */
    public static Dialog showAlertDialogTryAgain(Context context, String message) {
        final Dialog dialog = new Dialog(context);
        try {
            dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
            dialog.setContentView(R.layout.custom_alert);
            dialog.getWindow().setLayout(getWidth(context) - 40, LayoutParams.WRAP_CONTENT);
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

            LinearLayout linearLayoutYesNo = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_YesNo);
            LinearLayout linearLayoutOK = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_OK);
            TextView txtCustomAlert_Heading = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Heading);
            TextView txtCustomAlert_Message = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Message);
            TextView txtCustomAlert_OK = (TextView) dialog.findViewById(R.id.txt_CustomAlert_OK);

            txtCustomAlert_Heading.setText(context.getString(R.string.app_name) + " " +
                    context.getString(R.string.strAlertTitle));
            txtCustomAlert_Message.setText(message);

            linearLayoutYesNo.setVisibility(View.VISIBLE);
            linearLayoutOK.setVisibility(View.GONE);

            txtCustomAlert_OK.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    dialog.dismiss();
                }
            });
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return dialog;
    }

    /*Get Screen Width*/
    public static int getWidth(Context context) {
        Display display = ((Activity) context).getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int screen_width = size.x;
        return screen_width;
    }
}
