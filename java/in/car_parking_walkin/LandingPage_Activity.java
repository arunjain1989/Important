package in.car_parking_walkin;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.view.View;
import android.view.Window;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import in.car_parking_walkin.fragment.Booking_Fragment;
import in.car_parking_walkin.fragment.Home_Fragment;
import in.car_parking_walkin.fragment.Offline_Fragment;
import utils.asynctask.Async_Task_Get;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_Http_Functions;
import utils.common_functions.Common_SharedPreference;
import utils.common_functions.Common_Strings;
import utils.printer.AEM_Printer;


/**
 * LandingPage Activity - Home Activity
 */
public class LandingPage_Activity extends FragmentActivity
{
    Context context;
    Common_Functions com;
    Common_SharedPreference sharedPreference;
    FragmentManager fragmentManager;
    LandingPage_Activity landingPage_activity;

    Bundle bundle;

    public static ProgressDialog Loading;
    static boolean shouldLoadFragment = false;

    Home_Fragment home_fragment = new Home_Fragment();
    public Booking_Fragment booking_fragment;

    public static AEM_Printer printer = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.landingpage_activity);

        printer = null;

        context = this;
        com = new Common_Functions(context);
        sharedPreference = new Common_SharedPreference(context);
        fragmentManager = getSupportFragmentManager();
        landingPage_activity = this;

        Loading = new ProgressDialog(context);
        Loading.setMessage(com.getString(R.string.strLoading));
        Loading.show();

        printer = new AEM_Printer(context, com, sharedPreference,
                (TextView) findViewById(R.id.txt_PrinterStatus),
                (TextView) findViewById(R.id.txt_PrinterReStart),
                (TextView) findViewById(R.id.txt_PrinterReconnect),
                (ProgressBar) findViewById(R.id.progressBar_Printer));

        bundle = getIntent().getExtras();

        ImageView imgBack = (ImageView) findViewById(R.id.imgHeaderLeftBack);
        ImageView imgLogout = (ImageView) findViewById(R.id.imgHeaderLeft);
        ImageView imgRight = (ImageView) findViewById(R.id.imgHeaderRight);
        imgBack.setVisibility(View.INVISIBLE);
        imgLogout.setVisibility(View.VISIBLE);
        imgRight.setVisibility(View.VISIBLE);

        imgBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        imgLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                com.showLogoutAlert(sharedPreference);
            }
        });
        imgRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                httpLoginProcess();
            }
        });

        movingToFragment();
    }

    @Override
    protected void onResume() {
        super.onResume();
        try {
            bundle = getIntent().getExtras();
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            if (shouldLoadFragment) {
                movingToFragment();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void httpLoginProcess()
    {
        Async_Task_Get asyncTaskGet = new Async_Task_Get(context, Common_Strings.manual, false);
        asyncTaskGet.execute(new Common_Http_Functions(context).login(com,
                sharedPreference.readUserName(), sharedPreference.readUserPassword()));
        asyncTaskGet.setGetDataDownloadListener(new Async_Task_Get.GetDataDownloadListener() {
            @Override
            public void dataDownloadedSuccessfully(String response) {
                // TODO LOGIN RESPONSE
                System.out.println("LOGIN - JSON RESPONSE : "+response);
                try
                {
                    JSONObject json = new JSONObject(response);
                    String msg = "";
                    if(json.has("msg"))
                    {
                        msg = json.getString("msg");
                    }
                    if(json.getBoolean("result"))
                    {
                        if(msg.length()>0)
                        {
//                            com.Toast_Short(msg);
                        }
                        JSONObject jsonDetails = json.getJSONObject("data");

                        sharedPreference.writeUserDetailsPreference(jsonDetails,
                                sharedPreference.readUserName(), sharedPreference.readUserPassword());

                        try
                        {
                            home_fragment.settingSlotsValue();
                        }
                        catch (Exception e)
                        {
                            e.printStackTrace();
                        }
                        try
                        {
                            booking_fragment.gettingValues();
                        }
                        catch (Exception e)
                        {
                            e.printStackTrace();
                        }

                        com.Toast_Short("Refresh completed!");
                    }
                    else
                    {
                        if(msg.length()>0)
                        {
//                            com.showAlertDialogOK(msg);
                        }
                        com.Toast_Short(com.getString(R.string.strPleaseTryLater));
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public static boolean changing_Fragment(FragmentManager fragmentManager,
                                            Fragment fragmentName) {
        // TODO
        LandingPage_Activity.Loading.show();
        try {
            String fragmentTagName = fragmentName.getClass().getName();
            System.out.println("Fragment Tag Name : " + fragmentTagName);
            FragmentManager manager = fragmentManager;
            boolean fragmentPopped = manager.popBackStackImmediate(
                    fragmentTagName, 0);

            if (!fragmentPopped
                    && manager.findFragmentByTag(fragmentTagName) == null) {
                FragmentTransaction ft = manager.beginTransaction();
                ft.setCustomAnimations(R.anim.screen_forward_in, R.anim.screen_forward_out, R.anim.screen_backward_in, R.anim.screen_backward_out);
                ft.replace(R.id.main_fragment, fragmentName, fragmentTagName);
                ft.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN);
                ft.addToBackStack(fragmentTagName);
                ft.commit();
                shouldLoadFragment = false;

                return true;
            }
            else
            {
                LandingPage_Activity.Loading.dismiss();

                return false;
            }
        } catch (Exception e) {
            shouldLoadFragment = true;
            LandingPage_Activity.Loading.dismiss();
            e.printStackTrace();

            return false;
        }
    }

    @Override
    public void onBackPressed()
    {
        // TODO BACK ACTION
        try {
            Fragment fragment = fragmentManager.findFragmentById(R.id.main_fragment);
            System.out.println("Current FragmentName : " + fragment.getClass().getName());
            String strCurrentFragment = fragment.getClass().getName().toString();

            if (getSupportFragmentManager().getBackStackEntryCount() == 1)
            {
                if(strCurrentFragment.equalsIgnoreCase(new Home_Fragment().getClass().getName()))
                {
                    com.showExitAlert();
                }
                else if(strCurrentFragment.equalsIgnoreCase(new Offline_Fragment().getClass().getName()))
                {
                    com.showExitToast();
                }
                else
                {
                    movingToFragment();
                }
            }
            else
            {
                super.onBackPressed();
            }
        } catch (Exception e) {
            e.printStackTrace();
            super.onBackPressed();
        }
    }

    public void movingToFragment()
    {
        if(bundle!=null)
        {
            changing_Fragment(fragmentManager, new Offline_Fragment());
        }
        else
        {
            changing_Fragment(fragmentManager, home_fragment);
        }
    }

    @Override
    public void onDestroy() {
        System.out.println("LANDING_PAGE : DESTROY");
        try
        {
            if (printer.m_AemScrybeDevice != null)
            {
                try
                {
                    printer.m_AemScrybeDevice.disConnectPrinter();
                }
                catch (IOException e)
                {
                    e.printStackTrace();
                }
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        super.onDestroy();
    }
}
