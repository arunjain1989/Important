package in.car_parking_walkin;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager.NameNotFoundException;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.ProgressBar;
import android.widget.TextView;

import java.util.Timer;
import java.util.TimerTask;

import utils.common_functions.Common_Functions;
import utils.common_functions.Common_SharedPreference;


/**
 * Splash Activity - Very First Activity
 */
public class Splash_Activity extends Activity {
    Context context;
    Common_Functions com;
    Common_SharedPreference sharedPreference;
    public static Splash_Activity splash_activity;

    TextView txt_AppVersion_Info;
    ProgressBar progressBar;

    Timer t;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(in.car_parking_walkin.R.layout.splash_activity);

        context = this;
        com = new Common_Functions(context);
        sharedPreference = new Common_SharedPreference(context);
        splash_activity = this;

        txt_AppVersion_Info = (TextView) findViewById(in.car_parking_walkin.R.id.txt_SplashPage_AppVersion);
        progressBar = (ProgressBar) findViewById(in.car_parking_walkin.R.id.progressBar_SplashPage);

        try {
            String versionCode = context.getPackageManager().getPackageInfo(
                    context.getPackageName(), 0).versionName;
            txt_AppVersion_Info.setText(com.getString(in.car_parking_walkin.R.string.strAppVersion) + " " + versionCode);
            /*txt_AppVersion_Info.setText(com.getString(R.string.strAppVersionDemo)+" " + versionCode);*/
        } catch (NameNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        findViewById(R.id.txt_Splash_Online).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent in = new Intent(getApplicationContext(), SignIn_Activity.class);
                com.gotoNextActivity(in, false);
            }
        });
        findViewById(R.id.txt_Splash_Offline).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent in = new Intent(getApplicationContext(), LandingPage_Activity.class);
                in.putExtra("go_to", "offline");
                com.gotoNextActivity(in, false);
            }
        });

		/*System.out.println(com.getPhoneDetailsJSONObject().toString());*/
        System.out.println("DEVICE DPI :- " + com.getDeviceDPI());
        System.out.println("DEVICE WIDTH :- " + com.getWidth() + " ,,, DEVICE WIDTH :- " + com.getHeight());

        activatingTimer(1000);
    }

    public void activatingTimer(long milliseconds) {
        t = new Timer();
        t.schedule(new TimerTask() {
            // TODO
            public void run() {
                 /*also just stop the timer thread,*/
                 /*otherwise, you may receive a crash report*/
                t.cancel();

                changingActivity();
            }
        }, milliseconds);
    }

    public void changingActivity()
    {
        if(sharedPreference.readParkingId().length()>0) {
            Intent in = new Intent(getApplicationContext(), LandingPage_Activity.class);
            com.gotoNextActivity(in, true);
        }
        else
        {
            Splash_Activity.this.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    progressBar.setVisibility(View.GONE);
                    findViewById(R.id.linearLayout_Splash).setVisibility(View.VISIBLE);
                }
            });
        }
    }


    @Override
    public void onBackPressed() {
        // TODO BACK BUTTON ACTION
        com.backtoPreviousActivity(true);
    }
}
