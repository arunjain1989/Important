package utils.common_functions;


import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Dialog;
import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Point;
import android.graphics.Typeface;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.provider.Settings.Secure;
import android.telephony.TelephonyManager;
import android.text.Html;
import android.util.Base64;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.androidquery.AQuery;
import com.androidquery.callback.AjaxStatus;
import com.androidquery.callback.BitmapAjaxCallback;
import com.google.android.gcm.GCMRegistrar;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import in.car_parking_walkin.R;
import in.car_parking_walkin.SignIn_Activity;
import in.car_parking_walkin.Splash_Activity;
import in.car_parking_walkin.fragment.Home_Fragment;

/**
 * @author VENGAT
 *         Commonly Using Functions, Methods are placed here.
 */
@SuppressLint({"SimpleDateFormat", "SdCardPath", "NewApi"})
public class Common_Functions {
    Context context;

    public static String fontName_Regular = "Roboto-Regular.ttf";
    public static String fontName_Bold = "Roboto-Bold.ttf";

    /**
     * @param context
     */
    public Common_Functions(Context context) {
        this.context = context;
    }

    /* Checking whether Internet available or not */
    public boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager
                .getActiveNetworkInfo();
        return activeNetworkInfo != null;
    }

    public NetworkInfo getNetworkInfo(Context context) {
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        return cm.getActiveNetworkInfo();
    }

    /*Getting Network type whether it is WIFI or 3G or 2G*/
    public String getNetworkType(Context cont) {
        try {
            NetworkInfo info = getNetworkInfo(cont);
            if (info.getType() == ConnectivityManager.TYPE_WIFI) {
                return "WIFI";
            } else if (info.getType() == ConnectivityManager.TYPE_MOBILE) {
                if (isConnectionFast(info.getType(), info.getSubtype())) {
                    return "3G";
                } else {
                    return "2G";
                }
            }
        } catch (Exception e) {
        }
        return null;
    }

    /*Checking Network Speed*/
    private boolean isConnectionFast(int type, int subType) {
        if (type == ConnectivityManager.TYPE_WIFI) {
            return true;
        } else if (type == ConnectivityManager.TYPE_MOBILE) {
            switch (subType) {
                case TelephonyManager.NETWORK_TYPE_1xRTT:
                    return false; // ~ 50-100 kbps
                case TelephonyManager.NETWORK_TYPE_CDMA:
                    return false; // ~ 14-64 kbps
                case TelephonyManager.NETWORK_TYPE_EDGE:
                    //2G
                    return false; // ~ 50-100 kbps
                case TelephonyManager.NETWORK_TYPE_EVDO_0:
                    return true; // ~ 400-1000 kbps
                case TelephonyManager.NETWORK_TYPE_EVDO_A:
                    return true; // ~ 600-1400 kbps
                case TelephonyManager.NETWORK_TYPE_GPRS:
                    return false; // ~ 100 kbps
                case TelephonyManager.NETWORK_TYPE_HSDPA:
                    //is3G
                    return true; // ~ 2-14 Mbps
                case TelephonyManager.NETWORK_TYPE_HSPA:
                    //is3G2
                    return true; // ~ 700-1700 kbps
                case TelephonyManager.NETWORK_TYPE_HSUPA:
                    //is3G3
                    return true; // ~ 1-23 Mbps
                case TelephonyManager.NETWORK_TYPE_UMTS:
                    return true; // ~ 400-7000 kbps
            /*
			 * Above API level 7, make sure to set android:targetSdkVersion
			 * to appropriate level to use these
			 */
                case TelephonyManager.NETWORK_TYPE_EHRPD: // API level 11
                    return true; // ~ 1-2 Mbps
                case TelephonyManager.NETWORK_TYPE_EVDO_B: // API level 9
                    return true; // ~ 5 Mbps
                case TelephonyManager.NETWORK_TYPE_HSPAP: // API level 13
                    return true; // ~ 10-20 Mbps
                case TelephonyManager.NETWORK_TYPE_IDEN: // API level 8
                    return false; // ~25 kbps
                case TelephonyManager.NETWORK_TYPE_LTE: // API level 11
                    return true; // ~ 10+ Mbps
                // Unknown
                case TelephonyManager.NETWORK_TYPE_UNKNOWN:
                default:
                    return false;
            }
        } else {
            return false;
        }
    }

    /* Getting UniqueID for registering device */
    public String getIMEI() {
        String strUnique = null;
        String strIMEI = null;
        String strMAC_Add = null;
        String strBLUETOOTH_Add = null;
        String strANDROID_ID = null;

		/*IMEI is dependent on the SimCard slot of the device,
		so it is not possible to get the IMEI for the devices that do not use SimCard. It will return null*/
        final TelephonyManager tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        strIMEI = tm.getDeviceId();

        try {
            /*If device doesn't have WIFI hardware then you get null MAC address*/
            WifiManager m_wm = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
            strMAC_Add = m_wm.getConnectionInfo().getMacAddress();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        try {
		    /*If device doesn't have BLUETOOTH hardware then you get null.*/
            BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
            strBLUETOOTH_Add = bluetoothAdapter.getAddress();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

		/*If Android OS version is upgraded by the user then this may get changed.
		The ID gets changed if device is rooted or factory reset is done on the device.
		Also there is a known problem with a Chinese manufacturer of android device that
		some devices have same Android_ID.*/
        strANDROID_ID = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);

        Log.e("ANDROID_UNIQUE", "IMEI				:- " + strIMEI);
        Log.e("ANDROID_UNIQUE", "MAC ADDRESS		:- " + strMAC_Add);
        Log.e("ANDROID_UNIQUE", "BLUETOOTH ADDRESS	:- " + strBLUETOOTH_Add);
        Log.e("ANDROID_UNIQUE", "ANDROID_ID			:- " + strANDROID_ID);

        strUnique = strIMEI;

        if (strUnique == null) {
            strUnique = strMAC_Add;

            if (strUnique == null) {
                strUnique = strBLUETOOTH_Add;

                if (strUnique == null) {
                    strUnique = strANDROID_ID;
                }
            }
        }
        System.out.println("Return UNIQUE ID :- " + strUnique);

        return strUnique;
    }

    /*Checking GCM ID*/
    public boolean GCMChecking() {
        final String gcmId = GCMRegistrar.getRegistrationId(context);
        System.out.println("GCM ID(Checking) ::: " + gcmId + " ::: ");

        if (gcmId.length() != 0) {
            return true;
        }
        return false;
    }

    /* Getting SIMNo */
    public String getSIMNO() {
        final TelephonyManager tm = (TelephonyManager) context
                .getSystemService(Context.TELEPHONY_SERVICE);
        System.out.println("Sim No : " + tm.getSimSerialNumber());
        String SimNo;
        SimNo = tm.getSimSerialNumber();
        if (SimNo == null) {
            SimNo = "";
        }
        return SimNo;
    }

	/*Checking Service Status.*/
	/*If its not Running, Activating the Service here*/
	/*public void checkingRunningSrvice() {
		if (!isMyServiceRunning()) {
			Intent intent = new Intent(context, Application_Service.class);
			PendingIntent pint = PendingIntent.getService(context, 0, intent,
					PendingIntent.FLAG_UPDATE_CURRENT);
			AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
			alarmManager.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP, 0,
					20 * 1000, pint);// 20 seconds
		}
	}*/
	/*Checking whether My Service is Running or not*/
	/*public boolean isMyServiceRunning() {
		ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
		for (RunningServiceInfo service : manager
				.getRunningServices(Integer.MAX_VALUE)) {
			if (Application_Service.class.getName().equals(
					service.service.getClassName())) {
				return true;
			}
		}
		return false;
	}*/

    /*Making Phone Details JSONObject - this JSONObject Commonly used in all Service Request*/
    public JSONObject getPhoneDetailsJSONObject() {
        JSONObject jsonObject = new JSONObject();

        try {
            String strVersionCode = context.getPackageManager().getPackageInfo(
                    context.getPackageName(), 0).versionName;

            jsonObject.put("unique_id", getIMEI());
            jsonObject.put("phone_type", "ANDROID");
            jsonObject.put("phone_model", Build.MANUFACTURER);
            jsonObject.put("app_version", strVersionCode);

            System.out.println("Phone Details JSON : " + jsonObject.toString()+"\n");
        } catch (NameNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    /*Set TypeFace for TextView- LARGE&BOLD Only For Headings*/
    public void setFontHeading(View view) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Medium);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf, Typeface.BOLD);
        tv.setTextColor(Color.parseColor(getString(R.color.white)));
    }

    /*Set TypeFace for TextView- LARGE&BOLD Only For Headings*/
    public void setFontHeading_Large(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Large);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf, Typeface.BOLD);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- MEDIUM&NORMAL Only For Headings*/
    public void setFontHeading_Medium(View view) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Medium);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf);
        tv.setTextColor(Color.parseColor(getString(R.color.black)));
    }

    /*Set TypeFace for TextView- MEDIUM&NORMAL Only For Headings*/
    public void setFontHeading_Medium(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Medium);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- REGULAR&NORMAL Only For Headings*/
    public void setFontHeading_Reguler(View view) {
        TextView tv = (TextView) view;
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf);
        tv.setTextColor(Color.parseColor(getString(R.color.white)));
    }

    /*Set TypeFace for TextView- REGULAR&NORMAL Only For Headings*/
    public void setFontHeading_Reguler(View view, String ColorCode) {
        TextView tv = (TextView) view;
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- LARGE&BOLD*/
    public void setFontLargeBold(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Large);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf, Typeface.BOLD);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- LARGE&NORMAL*/
    public void setFontLargeNormal(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Large);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- MEDIUM&ITALIC*/
    public void setFontMediumItalic(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Medium);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf, Typeface.ITALIC);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- MEDIUM&BOLD*/
    public void setFontMediumBold(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Medium);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf, Typeface.BOLD);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- MEDIUM&NORMAL*/
    public void setFontMediumNormal(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Medium);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- MEDIUM&BOLD*/
    public void setFontSmallBold(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Small);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf, Typeface.BOLD);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- MEDIUM&NORMAL*/
    public void setFontSmallNormal(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Small);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- REGULAR&ITALIC*/
    public void setFontRegularItalic(View view, String ColorCode) {
        TextView tv = (TextView) view;
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf, Typeface.ITALIC);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- REGULAR&BOLD*/
    public void setFontRegularBold(View view, String ColorCode) {
        TextView tv = (TextView) view;
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Bold);
        tv.setTypeface(tf, Typeface.BOLD);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- REGULAR&NORMAL*/
    public void setFontRegularNormal(View view, String ColorCode) {
        TextView tv = (TextView) view;
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Regular);
        tv.setTypeface(tf);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- MEDIUM&BOLD*/
    public void setFontMediumBold_BOLD(View view, String ColorCode) {
        TextView tv = (TextView) view;
        tv.setTextAppearance(context, android.R.style.TextAppearance_Medium);
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Bold);
        tv.setTypeface(tf, Typeface.BOLD);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Set TypeFace for TextView- REGULAR&BOLD*/
    public void setFontRegularBold_BOLD(View view, String ColorCode) {
        TextView tv = (TextView) view;
        Typeface tf = Typeface.createFromAsset(context.getAssets(), fontName_Bold);
        tv.setTypeface(tf, Typeface.BOLD);
        tv.setTextColor(Color.parseColor(ColorCode));
    }

    /*Converting Date to milliseconds(Unix TimeStamp)*/
    public long getMilliSecondsFromDate(String date) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            Date d = sdf.parse(date);
            long milliSeconds = d.getTime();
            return milliSeconds;
        } catch (Exception e) {
            return System.currentTimeMillis();
        }
    }

    /*Converting the milliseconds(Unix TimeStamp) to normal date time*/
    public String getDateFromMilliSeconds(long milliSeconds) {
        try {

            Date date;// *1000 is to convert seconds to milliseconds
            if (String.valueOf(milliSeconds).length() == 10)
                date = new Date(milliSeconds * 1000L);
            else
                date = new Date(milliSeconds);
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm a");
            String formattedDate = sdf.format(date);
            return formattedDate;
        } catch (Exception e) {
            return getDateFromMilliSeconds(System.currentTimeMillis());
        }
    }

    /*MilliSeconds to Date*/
    public String getDateFromMS_ForProfile(String strMilliSeconds) {
        try {
            long milliSeconds = Long.valueOf(strMilliSeconds);
            Date date;// *1000 is to convert seconds to milliseconds
            if (String.valueOf(milliSeconds).length() == 10) {
                date = new Date(milliSeconds * 1000L);
            } else {
                date = new Date(milliSeconds);
            }
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            String formattedDate = sdf.format(date);

            return formattedDate;
        } catch (Exception e) {
            return "";
        }
    }

    /*MilliSeconds to Date*/
    public String getDateFromMS_ForBookTable(String strMilliSeconds) {
        try {
            long milliSeconds = Long.valueOf(strMilliSeconds);
            Date date;// *1000 is to convert seconds to milliseconds
            if (String.valueOf(milliSeconds).length() == 10) {
                date = new Date(milliSeconds * 1000L);
            } else {
                date = new Date(milliSeconds);
            }
            SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
            TimeZone timeZone = TimeZone.getTimeZone("Asia/Singapore");
            sdf.setTimeZone(timeZone);
            String formattedDate = sdf.format(date);

            return formattedDate;
        } catch (Exception e) {
            return "";
        }
    }

    /*MilliSeconds to Date*/
    public String getDateFromMS_ForBookTableHistory(String strMilliSeconds) {
        try {
            long milliSeconds = Long.valueOf(strMilliSeconds);
            Date date;// *1000 is to convert seconds to milliseconds
            if (String.valueOf(milliSeconds).length() == 10) {
                date = new Date(milliSeconds * 1000L);
            } else {
                date = new Date(milliSeconds);
            }
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            TimeZone timeZone = TimeZone.getTimeZone("Asia/Singapore");
            sdf.setTimeZone(timeZone);
            String formattedDate = sdf.format(date);

            return formattedDate;
        } catch (Exception e) {
            return "";
        }
    }

    /*MilliSeconds to Date for Bday Voucher*/
    public String getDateFromMS_ForBdayVoucher(String strMilliSeconds) {
        try {
            long milliSeconds = Long.valueOf(strMilliSeconds);
            Date date;// *1000 is to convert seconds to milliseconds
            if (String.valueOf(milliSeconds).length() == 10) {
                date = new Date(milliSeconds * 1000L);
            } else {
                date = new Date(milliSeconds);
            }
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            TimeZone timeZone = TimeZone.getTimeZone("Asia/Singapore");
            sdf.setTimeZone(timeZone);
            String formattedDate = sdf.format(date);

            return formattedDate;
        } catch (Exception e) {
            return "";
        }
    }

    /*Minutes between Current & Birth Day Voucher Expiry date*/
    public boolean isBdayVoucherExpired(String strMilliSeconds) {
        try {
            long milliSeconds = Long.valueOf(strMilliSeconds);
            Date date;// *1000 is to convert seconds to milliseconds
            if (String.valueOf(milliSeconds).length() == 10) {
                date = new Date(milliSeconds * 1000L);
            } else {
                date = new Date(milliSeconds);
            }
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            TimeZone timeZone = TimeZone.getTimeZone("Asia/Singapore");
            sdf.setTimeZone(timeZone);
            String strExpDate = sdf.format(date);

            String strCurrentDate = sdf.format(new Date());

            Date currentDate = sdf.parse(strCurrentDate);
            Date expDate = sdf.parse(strExpDate);

            int mins = minutesBetween(currentDate, expDate);
            if(mins>0)
            {
                return false;
            }
            else
            {
                return  true;
            }
        } catch (Exception e) {
            return false;
        }
    }

    /*MilliSeconds to Date, & Comparing with Today Date*/
    public String getDateFromMS_ForFeeds(long milliSeconds) {
        try {
            Date date;// *1000 is to convert seconds to milliseconds
            if (String.valueOf(milliSeconds).length() == 10) {
                date = new Date(milliSeconds * 1000L);
            } else {
                date = new Date(milliSeconds);
            }
            SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy-hh:mm");
            String formattedDate = sdf.format(date);
            String[] str = formattedDate.split("-");

            if (getCurrentDate().equalsIgnoreCase(str[0])) {
                return str[1];
            } else {
                return str[0];
            }
        } catch (Exception e) {
            return "";
        }
    }

    /**
     * @param expiry_date
     * @param cur_date
     * @return
     */
	/*Checking Whether need to show edit button in Reservation page or not*/
    public boolean isNeedToShowRenew(String expiry_date, String cur_date) {
        SimpleDateFormat dfDate = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date d1 = dfDate.parse(expiry_date);
            Date d2 = dfDate.parse(cur_date);

            int numDays = daysBetween(d1, d2);
           if (numDays > 3) {
                return false;
            }
            else
            {
                return true;
            }
        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean isOKtoSetDate(String expiry_date, String cur_date) {
        SimpleDateFormat dfDate = new SimpleDateFormat("dd-MM-yyyy");
        try {
            Date d1 = dfDate.parse(expiry_date);
            Date d2 = dfDate.parse(cur_date);

            int numDays = daysBetween(d1, d2);
            if (numDays >= 0) {
                return true;
            }
            else
            {
                return false;
            }
        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    /*Check whether Offline activation Expired or Not*/
    public boolean isOfflineExpired(String expiry_date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date expDate = formatter.parse(expiry_date);
            Date currentDate = formatter.parse(formatter.format(new Date()));

            int numDays = daysBetween(expDate, currentDate);
            if (numDays < 0) {
                return true;
            }
            else
            {
                return false;
            }
        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    /*Finding whether age is above 18 or not*/
    public boolean isItAbove18(String dob) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            String strCurrentDate = sdf.format(new Date());

            Date currentDate = sdf.parse(strCurrentDate);
            Date dobDate = sdf.parse(dob);

            long diff = (currentDate.getTime() - dobDate.getTime());
            diff = diff/1000;
            int divideBy = (60*60*24);
            long resultDays = diff/divideBy;

            if(resultDays>(18*365))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }

    /*Finding years count between two dates*/
    public double yearsBetween(String dob) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            String strCurrentDate = sdf.format(new Date());

            Date currentDate = sdf.parse(strCurrentDate);
            Date dobDate = sdf.parse(dob);

            long diff = (currentDate.getTime() - dobDate.getTime());
            diff = diff/1000;
            int divideBy = (3600*24*365);
            double result = diff/divideBy;


            return Double.parseDouble(new DecimalFormat("##.##").format(result));
        }
        catch (ParseException e) {
            e.printStackTrace();
        }
        return 0;
    }

    /*Finding days count between two dates*/
    public int daysBetween(Date d1, Date d2) {
        return (int) ((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
    }

    /*Getting Current Date*/
    public String getCurrentDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        String currentDate = sdf.format(new Date());
        return currentDate;
    }

    /*Getting 6 Days Before Date*/
    public String get6DaysBeforeDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_YEAR, -6);
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        String date = sdf.format(new Date(calendar.getTimeInMillis()));
        return date;
    }

    /*Getting 7 Days Before Date*/
    public String get7DaysBeforeDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_YEAR, -7);
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        String date = sdf.format(new Date(calendar.getTimeInMillis()));
        return date;
    }

    /*Getting Current Date with Time*/
    public String getCurrentDate_WithTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String currentDate = sdf.format(new Date());
        return currentDate;
    }

    /*Getting Current Time 12hr format*/
    public String getCurrentTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a");
        TimeZone timeZone = TimeZone.getTimeZone("Asia/Kolkata");
        sdf.setTimeZone(timeZone);
        String currentTime = sdf.format(new Date());
        return currentTime;
    }

    /*Getting Time 12hr format from given Date & Time*/
    public String getTimeFromFullDateTime(String dateTime) {
        String time = "";
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date data = formatter.parse(dateTime);

            SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a");
            TimeZone timeZone = TimeZone.getTimeZone("Asia/Kolkata");
            sdf.setTimeZone(timeZone);
            time = sdf.format(data);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return time;
    }

    /*Getting Current Time 24hr format*/
    public String getCurrentTime24() {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        TimeZone timeZone = TimeZone.getTimeZone("Asia/Kolkata");
        sdf.setTimeZone(timeZone);
        String currentTime = sdf.format(new Date());
        return currentTime;
    }

    /*get Month Name per Month Number*/
    public String getMonthNameFromNumber(int number) {
        if(number == 1)
        {
            return "January";
        }
        else if(number == 2)
        {
            return "February";
        }
        else if(number == 3)
        {
            return "March";
        }
        else if(number == 4)
        {
            return "April";
        }
        else if(number == 5)
        {
            return "May";
        }
        else if(number == 6)
        {
            return "June";
        }
        else if(number == 7)
        {
            return "July";
        }
        else if(number == 8)
        {
            return "August";
        }
        else if(number == 9)
        {
            return "September";
        }
        else if(number == 10)
        {
            return "October";
        }
        else if(number == 11)
        {
            return "November";
        }
        else if(number == 12)
        {
            return "December";
        }
        return "";
    }

    /*get Day of Week from date*/
    public String getDayFromDate(String strDate)
    {
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        Calendar cal = Calendar.getInstance();
        try {
            cal.setTime(sdf.parse(strDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        int day = cal.get(Calendar.DAY_OF_WEEK);

        System.out.println("day ----> " + day);
        if(day == 1)
        {
            return "SUN";
        }
        else if(day == 2)
        {
            return "MON";
        }
        else if(day == 3)
        {
            return "TUE";
        }
        else if(day == 4)
        {
            return "WED";
        }
        else if(day == 5)
        {
            return "THU";
        }
        else if(day == 6)
        {
            return "FRI";
        }
        else if(day == 7)
        {
            return "SAT";
        }
        return "";
    }

    /*Checking the Time Difference between CheckIn & CheckOut Time*/
    public int findHoursBetween(String checkInTime, String checkOutTime) {
        int hrs = 0;
        try
        {
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");

            Date inTime = sdf.parse(checkInTime);
            Date outTime = sdf.parse(checkOutTime);

            double value = hoursBetween(inTime, outTime);
            hrs = (int) Math.ceil(value);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return hrs;
    }

    /*Checking the Time Difference between CheckIn & CheckOut Time*/
    public int findHoursBetweenOffline(String checkInDateTime) {
        int hrs = 0;
        try
        {
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy hh:mm a");

            Date inTime = sdf.parse(checkInDateTime);
            Date outTime = sdf.parse(getCurrentDate()+ " " +getCurrentTime());

            double value = hoursBetween(inTime, outTime);
            hrs = (int) Math.ceil(value);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return hrs;
    }

    /*Checking Hours Between Two Dates*/
    public double hoursBetween(Date d1, Date d2) {
        double diff = d2.getTime() - d1.getTime();
        double hrs = (diff) / (1000 * 60 * 60);
        return hrs;
    }

    /*Checking Minutes Between Two Dates*/
    public int minutesBetween(Date d1, Date d2) {
        return (int) ((d2.getTime() - d1.getTime()) / (1000 * 60));
    }

    /*Getting 1 min, 1 day, 1 month, etc... from MilliSeconds*/
    //TODO get1min1dayAgoFromMilliSec
    public String get1min1dayAgoFromMilliSec(String timeAtMiliseconds) {
        if (timeAtMiliseconds.equalsIgnoreCase("")) {
            return "";
        }
        //API.log("Day Ago "+dayago);
        String result = "now";
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dataSot = formatter.format(new Date());
        Calendar calendar = Calendar.getInstance();

        long dayagolong = Long.valueOf(timeAtMiliseconds) * 1000;
        calendar.setTimeInMillis(dayagolong);
        String agoformater = formatter.format(calendar.getTime());

        Date CurrentDate = null;
        Date CreateDate = null;

        try {
            CurrentDate = formatter.parse(dataSot);
            CreateDate = formatter.parse(agoformater);

            long different = Math.abs(CurrentDate.getTime() - CreateDate.getTime());

            long secondsInMilli = 1000;
            long minutesInMilli = secondsInMilli * 60;
            long hoursInMilli = minutesInMilli * 60;
            long daysInMilli = hoursInMilli * 24;

            long elapsedDays = different / daysInMilli;
            different = different % daysInMilli;

            long elapsedHours = different / hoursInMilli;
            different = different % hoursInMilli;

            long elapsedMinutes = different / minutesInMilli;
            different = different % minutesInMilli;

            long elapsedSeconds = different / secondsInMilli;

            different = different % secondsInMilli;
            if (elapsedDays == 0) {
                if (elapsedHours == 0) {
                    if (elapsedMinutes == 0) {
                        if (elapsedSeconds < 0) {
                            return "0" + " s";
                        } else {
                            if (elapsedDays > 0 && elapsedSeconds < 59) {
                                return "now";
                            }
                        }
                    } else {
                        if(elapsedMinutes>=2)
                        {
                            return String.valueOf(elapsedMinutes) + " minutes ago";
                        }
                        else
                        {
                            return String.valueOf(elapsedMinutes) + " minute ago";
                        }
                    }
                } else {
                    if(elapsedHours>=2)
                    {
                        return String.valueOf(elapsedHours) + " hours ago";
                    }
                    else
                    {
                        return String.valueOf(elapsedHours) + " hour ago";
                    }
                }

            } else {
                if (elapsedDays <= 2) {
                    return String.valueOf(elapsedDays) + " day ago";
                }
                else if (elapsedDays >=2 && elapsedDays <= 29) {
                    return String.valueOf(elapsedDays) + " days ago";
                }
                else
                {
                    SimpleDateFormat formatterYear = new SimpleDateFormat("MMMM dd\"yy, hh:mm a");
                    Calendar calendarYear = Calendar.getInstance();
                    calendarYear.setTimeInMillis(dayagolong);
                    return formatterYear.format(calendarYear.getTime()) + "";
                }

//	            if (elapsedDays > 29 && elapsedDays <= 58) {
//	                return "1Mth ago";
//	            }
//	            if (elapsedDays > 58 && elapsedDays <= 87) {
//	                return "2Mth ago";
//	            }
//	            if (elapsedDays > 87 && elapsedDays <= 116) {
//	                return "3Mth ago";
//	            }
//	            if (elapsedDays > 116 && elapsedDays <= 145) {
//	                return "4Mth ago";
//	            }
//	            if (elapsedDays > 145 && elapsedDays <= 174) {
//	                return "5Mth ago";
//	            }
//	            if (elapsedDays > 174 && elapsedDays <= 203) {
//	                return "6Mth ago";
//	            }
//	            if (elapsedDays > 203 && elapsedDays <= 232) {
//	                return "7Mth ago";
//	            }
//	            if (elapsedDays > 232 && elapsedDays <= 261) {
//	                return "8Mth ago";
//	            }
//	            if (elapsedDays > 261 && elapsedDays <= 290) {
//	                return "9Mth ago";
//	            }
//	            if (elapsedDays > 290 && elapsedDays <= 319) {
//	                return "10Mth ago";
//	            }
//	            if (elapsedDays > 319 && elapsedDays <= 348) {
//	                return "11Mth ago";
//	            }
//	            if (elapsedDays > 348 && elapsedDays <= 360) {
//	                return "12Mth ago";
//	            }
//
//	            if (elapsedDays > 360 && elapsedDays <= 720) {
//	                return "1 year ago";
//	            }
//
//	            if (elapsedDays > 720) {
//	                SimpleDateFormat formatterYear = new SimpleDateFormat("MM/dd/yyyy");
//	                Calendar calendarYear = Calendar.getInstance();
//	                calendarYear.setTimeInMillis(dayagolong);
//	                return formatterYear.format(calendarYear.getTime()) + "";
//	            }
            }

        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * @param fileName = Text File Name
     * @return String
     */
	/*Getting the File from Assets Folder*/
    public String ReadFromfile(String fileName) {
        StringBuilder returnString = new StringBuilder();
        InputStream fIn = null;
        InputStreamReader isr = null;
        BufferedReader input = null;
        try {
            fIn = context.getResources().getAssets().open(fileName);
            isr = new InputStreamReader(fIn);
            input = new BufferedReader(isr);
            String line = "";
            while ((line = input.readLine()) != null) {
                returnString.append(line);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            try {
                if (isr != null)
                    isr.close();
                if (fIn != null)
                    fIn.close();
                if (input != null)
                    input.close();
            } catch (Exception e2) {
                e2.getMessage();
            }
        }
        return returnString.toString();
    }

    /**
     * @param url = Image http URL
     * @return Base64 String
     */
	/*Getting the Base64 String from Image URL*/
    public String urlTo64String(String url) {
        InputStream inputStream = null;
        String str = "";
        try {
            inputStream = (InputStream) new URL(url).getContent();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Drawable drawable = Drawable.createFromStream(inputStream, "");
        if (drawable != null) {
            Bitmap bm = ((BitmapDrawable) drawable).getBitmap();
            ByteArrayOutputStream o = new ByteArrayOutputStream();
            bm.compress(Bitmap.CompressFormat.PNG, 100, o);
            byte[] im = o.toByteArray();
            str = Base64.encodeToString(im, Base64.DEFAULT);
            return str;
        } else {
            Bitmap bm = BitmapFactory.decodeResource(context.getResources(),
                    R.drawable.ic_launcher);
            ByteArrayOutputStream o = new ByteArrayOutputStream();
            bm.compress(Bitmap.CompressFormat.PNG, 100, o);
            byte[] im = o.toByteArray();
            str = Base64.encodeToString(im, Base64.DEFAULT);
        }

        return str;
    }

    /**
     * @param drawable
     * @param bitmap
     * @return String
     */
	/*Getting Base64 Image String from Drawable or Bitmap*/
	/*If you need String from Drawable,  parse Drawable & parse bitmap as null*/
	/*If you need String from Bitmap,  parse Bitmap & parse Drawable as null*/
    public String bitmapToString(Drawable drawable, Bitmap bitmap) {
        Bitmap bitmap2;
        if (drawable == null) {
            bitmap2 = bitmap;
        } else {
            bitmap2 = ((BitmapDrawable) drawable).getBitmap();
        }
        ByteArrayOutputStream o = new ByteArrayOutputStream();
        bitmap2.compress(Bitmap.CompressFormat.JPEG, 100, o);
        byte[] im = o.toByteArray();
        String str = Base64.encodeToString(im, Base64.DEFAULT);
        return str;
    }

    /**
     * @param base64String
     * @return Bitmap
     */
	/*Getting Bitmap from Base64 Image String*/
    public Bitmap stringToBitmap(String base64String) {
        String str = base64String;
        byte[] by = Base64.decode(str, Base64.DEFAULT);
        ByteArrayInputStream in = new ByteArrayInputStream(by);
        Bitmap bitmap = BitmapFactory.decodeStream(in);
        return bitmap;
    }

    /**
     * @param string
     * @return base64String
     */
    public String base64Encode(String string) {
        byte[] data = null;
        try {
            data = string.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String base64String = Base64.encodeToString(data, Base64.DEFAULT);
        System.out.println("Base64 Enceode String : " + base64String);
        return base64String;
    }

    /**
     * @param base64String
     * @return string
     */
    public String base64Decode(String base64String) {
        byte[] data = Base64.decode(base64String, Base64.DEFAULT);
        String string = "";
        try {
            string = new String(data, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("Base64 Deceode String : " + string);
        return string;
    }

    /* Checking whether Camera Available or not */
    public boolean checkCameraHardware() {
        if (context.getPackageManager().hasSystemFeature(
                PackageManager.FEATURE_CAMERA)) {
            return true;
        } else {
            return false;
        }
    }

    /* Checking whether SD Card or External Storage Available or not */
    public boolean checkSDCardStatus() {
        if (Environment.getExternalStorageState().equals(
                Environment.MEDIA_MOUNTED))
            return true;
        return false;
    }

    /*Formatting the File Size in KB & MB*/
    public String formatSize(long size) {
        String suffix = null;
        if (size >= 1024) {
            suffix = "KB";
            size /= 1024;
            if (size >= 1024) {
                suffix = "MB";
                size /= 1024;
            }
        }
        StringBuilder resultBuffer = new StringBuilder(Long.toString(size));

        int commaOffset = resultBuffer.length() - 3;
        while (commaOffset > 0) {
            resultBuffer.insert(commaOffset, ',');
            commaOffset -= 3;
        }

        if (suffix != null)
            resultBuffer.append(suffix);
        return resultBuffer.toString();
    }

    /*Checking whether DB is Available in App Memory Path*/
    public boolean checkBDExists() {
        File f = new File(Common_Strings.get_DB_APP_PATH(context) + Common_Strings.DB_NAME);
        if (f.exists()) {
            System.out.println("Master DB Exists!!!");
            return true;
        } else {
            System.out.println("Master DB Not Available!");
            return false;
        }
    }

    //Copy(Import) the Database from Assets Folder to App Memory
    public void importDataBase(String dbName) throws IOException {
        InputStream in = context.getAssets().open(dbName);

        System.out.println("DB Copying : Starting copying");

        File fileName = new File(Common_Strings.get_DB_APP_PATH(context));
        if (!fileName.exists()) {
            System.out.println("DB PATH CREATION");
            fileName.mkdirs();
        }
        String name = Common_Strings.DB_NAME;
        if (new File(fileName, name).exists()) {
            System.out.println("DELETING FILE...");
            new File(fileName, name).delete();
        }
        File dest = new File(fileName, name);

        OutputStream out = new FileOutputStream(dest);

        byte[] buffer = new byte[1024];
        int length;

        while ((length = in.read(buffer)) > 0) {
            out.write(buffer, 0, length);
        }
        System.out.println("DB Copying : Completed");
        out.flush();
        out.close();
        in.close();
    }

    //Copy(Export) the Database from App Memory Path to External Memory
    public void exportDataBase(String dbName) throws IOException {
        InputStream mInput = new FileInputStream("/data/data/" + context.getPackageName() + "/databases/" + dbName);

        File f;
        if (checkSDCardStatus()) {
            f = Environment.getExternalStorageDirectory();
        } else {
            f = context.getFilesDir();
        }

        File file = new File(f, Common_Strings.DB_Directory);
        if (!file.exists()) {
            file.mkdirs();
        }
        if (new File(file, dbName).exists()) {
            new File(file, dbName).delete();
        }
        File dest = new File(file, dbName);
        // Output stream
        OutputStream mOutput = new FileOutputStream(dest);

        byte[] mBuffer = new byte[1024];
        int mLength;
        while ((mLength = mInput.read(mBuffer)) > 0) {
            mOutput.write(mBuffer, 0, mLength);
        }
        mOutput.flush();
        mOutput.close();
        mInput.close();
    }

    /*Get Screen Width*/
    @SuppressLint("NewApi")
    public int getWidth() {
        Display display = ((Activity) context).getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int screen_width = size.x;
        return screen_width;
    }

    /*Get Screen Height*/
    @SuppressLint("NewApi")
    public int getHeight() {
        Display display = ((Activity) context).getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int screen_height = size.y;
        return screen_height;
    }

    /*Get StatusBar/NotificationBar height*/
    public int getStatusBarHeight() {
        int result = 0;
        int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = context.getResources().getDimensionPixelSize(resourceId);
        }
        System.out.println("Status Bar Height : "+result);
        return result;
    }

    public void setStatusBarColor(String color)
    {
        try
        {
            int sdk = android.os.Build.VERSION.SDK_INT;
            if (sdk >= android.os.Build.VERSION_CODES.LOLLIPOP) {
                Window window = ((Activity) context).getWindow();
                window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
                window.setStatusBarColor(Color.parseColor(color));
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    /* Getting Device density as basic operation for choosing the url and so on */
    public int getMyScreenSize() {
//        return context.getResources().getDisplayMetrics().densityDpi;
        int densityDpi = context.getResources().getDisplayMetrics().densityDpi;

        System.out.println("DENSITY -> "+densityDpi);

        switch (densityDpi)
        {
            case DisplayMetrics.DENSITY_LOW:
                // LDPI
                return DisplayMetrics.DENSITY_LOW;

            case DisplayMetrics.DENSITY_MEDIUM:
                // MDPI
                return DisplayMetrics.DENSITY_MEDIUM;

            case DisplayMetrics.DENSITY_HIGH:
                // HDPI
                return DisplayMetrics.DENSITY_HIGH;

            case DisplayMetrics.DENSITY_TV:
            case DisplayMetrics.DENSITY_XHIGH:
//	        case DisplayMetrics.DENSITY_280: //API 22
                // XHDPI
                return DisplayMetrics.DENSITY_XHIGH;

            case DisplayMetrics.DENSITY_XXHIGH:
//	        case DisplayMetrics.DENSITY_360: //API 23
            case DisplayMetrics.DENSITY_400:
//	        case DisplayMetrics.DENSITY_420: //API 23
                // XXHDPI
                return DisplayMetrics.DENSITY_XXHIGH;

            case DisplayMetrics.DENSITY_XXXHIGH:
            case DisplayMetrics.DENSITY_560:
                // XXXHDPI
                return DisplayMetrics.DENSITY_XXXHIGH;
            default:
                // DEFAULT
                return DisplayMetrics.DENSITY_HIGH;
        }
    }

    public String getScreenDPI() {
        return getDeviceDPI().toLowerCase()+"/";
    }
    public String getDeviceDPI() {
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return "LDPI";
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return "MDPI";
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return "HDPI";
            case DisplayMetrics.DENSITY_TV:
                System.out.println("TVDPI");
                return "TVDPI";
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return "XHDPI";
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return "XXHDPI";
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return "XXXHDPI";
            default:
                System.out.println("DEFAULT");
//                return "DEFAULT";
                return "HDPI";
        }
    }

    public int getSize() {
        // System.out.println("Screen Size :"+getMyScreenSize());
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return 36;
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return 48;
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return 72;
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return 96;
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return 144;
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return 192;
            default:
                System.out.println("DEFAULT");
                return 96;
        }
    }

    /* called from buyNowPopup in CommonUtils */
    public int getThumbImageSize() {
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return 90;
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return 120;
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return 180;
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return 240;
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return 360;
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return 480;
            default:
                System.out.println("DEFAULT");
                return 240;
        }
    }

    public int getItemsImageWidth() {
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return 85;
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return 120;
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return 180;
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return 260;
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return 400;
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return 520;
            default:
                System.out.println("DEFAULT");
                return 180;
        }
    }

    public int getItemsImageHeight() {
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return 100;
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return 150;
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return 250;
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return 350;
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return 500;
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return 700;
            default:
                System.out.println("DEFAULT");
                return 140;
        }
    }

    /* called from buyNowPopup in CommonUtils */
    public int getFullRectangleImgHeight() {
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return 135;
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return 180;
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return 270;
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return 360;
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return 540;
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return 720;
            default:
                System.out.println("DEFAULT");
                return 360;
        }
    }

    /* Landing Page Slider height */
    public int getHomeViewPagerHeight() {
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return 100;
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return 260;
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return 400;
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return 600;
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return 900;
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return 1100;
            default:
                System.out.println("DEFAULT");
                return 330;
        }
    }

    /* Products Page Slider height */
    public int getItemViewPagerHeight() {
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return 85;
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return 222;
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return 333;
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return 500;
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return 750;
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return 900;
            default:
                System.out.println("DEFAULT");
                return 333;
        }
    }

    /*Gallery Activity*/
    public int getGalleryThumbHeight() {
        switch (getMyScreenSize()) {
            case DisplayMetrics.DENSITY_LOW:
                System.out.println("LDPI");
                return 100;
            case DisplayMetrics.DENSITY_MEDIUM:
                System.out.println("MDPI");
                return 150;
            case DisplayMetrics.DENSITY_HIGH:
                System.out.println("HDPI");
                return 225;
            case DisplayMetrics.DENSITY_XHIGH:
                System.out.println("XHDPI");
                return 335;
            case DisplayMetrics.DENSITY_XXHIGH:
                System.out.println("XXHDPI");
                return 500;
            case DisplayMetrics.DENSITY_XXXHIGH:
                System.out.println("XXXHDPI");
                return 665;
            default:
                System.out.println("DEFAULT");
                return 225;
        }
    }

    /* item URL for various Density */
    public String getCorrectedURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("150x150", "90x90");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("150x150", "120x120");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("150x150", "150x150");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("150x150", "180x180");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("150x150", "240x240");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("150x150", "280x280");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("150x150", "200x200");
            }
        } catch (Exception e) {
            return "";
        }
    }

    public String getPromotionSmallImageURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("480x400", "320x260");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("480x400", "320x260");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("480x400", "480x400");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("480x400", "720x600");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("480x400", "1080x900");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("480x400", "1080x900");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("480x400", "480x400");
            }
        } catch (Exception e) {
            return "";
        }
    }

    public String getItemSliderImageURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("480x333", "320x222");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("480x333", "320x222");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("480x333", "480x333");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("480x333", "720x500");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("480x333", "1080x750");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("480x333", "1080x750");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("480x400", "480x333");
            }
        } catch (Exception e) {
            return "";
        }
    }

    public String getPromotionMainImageURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("480x725", "320x430");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("480x725", "320x430");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("480x725", "480x725");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("480x725", "720x1180");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("480x725", "1080x1750");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("480x725", "1080x1750");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("480x725", "720x1180");
            }
        } catch (Exception e) {
            return "";
        }
    }

    public String getHomeCatImageURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("235x190", "155x125");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("235x190", "155x125");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("235x190", "235x190");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("235x190", "345x280");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("235x190", "520x420");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("235x190", "520x420");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("235x190", "235x190");
            }
        } catch (Exception e) {
            return "";
        }
    }

    public String getProductImageURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("480x120", "320x80");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("480x120", "320x80");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("480x120", "480x120");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("480x120", "720x180");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("480x120", "1080x270");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("480x120", "1280x360");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("480x120", "720x180");
            }
        } catch (Exception e) {
            return "";
        }
    }

    public String getItemSmallImageURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("75x75", "50x50");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("75x75", "50x50");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("75x75", "75x75");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("75x75", "100x100");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("75x75", "150x150");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("75x75", "150x150");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("75x75", "75x75");
            }
        } catch (Exception e) {
            return "";
        }
    }

    public String getItemMainImageURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("290x160", "290x160");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("290x160", "290x160");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("290x160", "435x250");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("290x160", "600x350");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("290x160", "900x520");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("290x160", "900x520");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("290x160", "600x350");
            }
        } catch (Exception e) {
            return "";
        }
    }

    public String getFooterImageURL(String imgUrl) {
        try {
            switch (getMyScreenSize()) {
                case DisplayMetrics.DENSITY_LOW:
                    System.out.println("LDPI");
                    return imgUrl.replace("480x110", "320x75");
                case DisplayMetrics.DENSITY_MEDIUM:
                    System.out.println("MDPI");
                    return imgUrl.replace("480x110", "320x75");
                case DisplayMetrics.DENSITY_HIGH:
                    System.out.println("HDPI");
                    return imgUrl.replace("480x110", "480x110");
                case DisplayMetrics.DENSITY_XHIGH:
                    System.out.println("XHDPI");
                    return imgUrl.replace("480x110", "720x150");
                case DisplayMetrics.DENSITY_XXHIGH:
                    System.out.println("XXHDPI");
                    return imgUrl.replace("480x110", "1080x220");
                case DisplayMetrics.DENSITY_XXXHIGH:
                    System.out.println("XXXHDPI");
                    return imgUrl.replace("480x110", "1080x220");
                default:
                    System.out.println("DEFAULT");
                    return imgUrl.replace("480x110", "480x110");
            }
        } catch (Exception e) {
            return "";
        }
    }

    /* JSON Validation */
    public boolean isValidJSON(String test) {
        if (test == null) {
            return false;
        } else if (test.length() != 0) {
            try {
                new JSONObject(test);
                return true;
            } catch (JSONException ex) {
                try {
                    new JSONArray(test);
                    return true;
                } catch (JSONException e) {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    /*Check Whether Entered Email is Valid or Not*/
    public boolean isValidEmail(String email) {
        boolean isValid = false;

        String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";
        CharSequence inputStr = email;

        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(inputStr);
        if (matcher.matches()) {
            isValid = true;
        }
        return isValid;
    }

    /**
     * Making the String with 2 Decimal Point
     *
     * @param value
     * @return
     */
    public String roundOffTo2DecPlaces(String value) {
        return String.format("%.2f", Double.valueOf(value));
    }

    /**
     * Making comma separator
     *
     * @param amount
     * @return
     */
    public String makingCommaSeparator(String amount) {
        if (amount.length() > 3) {
            try {
                amount = roundOffTo2DecPlaces(amount);
                DecimalFormat formatter = new DecimalFormat("###,###,###.##");
                String string = formatter.format(Double.valueOf(amount));

                String formatted = "";
                if (string.contains(".")) {
                    String[] decimal = string.split(".");
                    if (decimal[1].length() == 1) {
                        formatted = string + "0";
                    } else {
                        formatted = string;
                    }
                } else {
                    formatted = string + ".00";
                }
                return formatted;
//				return formatter.format(Double.valueOf(amount));
//				return String.format("%.2f", formatter.format(Double.valueOf(amount)));
            } catch (Exception exception) {
//				exception.printStackTrace();
//				return amount;
                return String.format("%.2f", Double.valueOf(amount));
            }
        } else {
//			return amount;
            return String.format("%.2f", Double.valueOf(amount));
        }
    }

    /**
     * Setting Image from HTTP URL
     *
     * @param imageView
     * @param progressBar
     * @param url
     */
    @SuppressWarnings("unused")
    public void aqueryNormal(ImageView imageView, ProgressBar progressBar, String url) {
        progressBar = null;
        AQuery aQuery = new AQuery(context);
        if (progressBar != null) {
            aQuery.id(imageView).progress(progressBar).image(url, true, true);
        } else {
            aQuery.id(imageView).image(url, true, true);
        }
    }

    /**
     * Setting Image from HTTP URL
     *
     * @param imageView
     * @param progressBar
     * @param url
     */
    @SuppressWarnings("unused")
    public void aquery_withDefaultImage(ImageView imageView, ProgressBar progressBar, String url, int dummy) {
        progressBar = null;
        AQuery aQuery = new AQuery(context);
        if (progressBar != null) {
            aQuery.id(imageView).progress(progressBar).
                    image(url, true, true, 0, dummy, BitmapFactory.decodeResource(context.getResources(), dummy), AQuery.FADE_IN);
        } else {
            aQuery.id(imageView).
                    image(url, true, true, 0, dummy, BitmapFactory.decodeResource(context.getResources(), dummy), AQuery.FADE_IN);
        }
    }

    @SuppressWarnings("unused")
    public void aqueryBackground(ImageView imageView, ProgressBar progressBar, String url, int dummy) {
        progressBar = null;
        AQuery aQuery = new AQuery(context);
        if (progressBar != null) {
            aQuery.id(imageView).progress(progressBar).image(url, false, true, 0, dummy, new BitmapAjaxCallback() {
                @SuppressLint("NewApi")
                @SuppressWarnings("deprecation")
                @Override
                protected void callback(String url, ImageView iv, Bitmap bm, AjaxStatus status) {
                    int sdk = Build.VERSION.SDK_INT;
                    if (sdk < Build.VERSION_CODES.JELLY_BEAN) {
                        iv.setBackgroundDrawable(new BitmapDrawable(context.getResources(), bm));
                    } else {
                        iv.setBackground(new BitmapDrawable(context.getResources(), bm));
                    }
                }
            });
        } else {
            aQuery.id(imageView).image(url, false, true, 0, dummy, new BitmapAjaxCallback() {
                @SuppressLint("NewApi")
                @SuppressWarnings("deprecation")
                @Override
                protected void callback(String url, ImageView iv, Bitmap bm, AjaxStatus status) {
                    int sdk = Build.VERSION.SDK_INT;
                    if (sdk < Build.VERSION_CODES.JELLY_BEAN) {
                        iv.setBackgroundDrawable(new BitmapDrawable(context.getResources(), bm));
                    } else {
                        iv.setBackground(new BitmapDrawable(context.getResources(), bm));
                    }
                }
            });
        }
    }

    /**
     * @param view = TextView or EditText
     * @return String
     */
	/*Getting String from EditText or TextView*/
    public String getTextFromView(View view) {
        String str = "";
        try {
            str = ((TextView) view).getText().toString().trim();
        } catch (Exception e) {
            str = ((EditText) view).getText().toString().trim();
        }
        System.out.println("String from TextView/EditText : " + str);
        return str;
    }

    /**
     * @param textView
     * @param string
     */
    public void setHTMLText(TextView textView, String string) {
        textView.setText(Html.fromHtml(string));
    }

    /**
     * @param textView
     * @param string
     */
	/*Getting String from EditText or TextView*/
    public void setHTMLText_withUnderLine(TextView textView, String string) {
        textView.setText(Html.fromHtml("<u>" + string + "</u>"));
    }

    /**
     * If you don't need Soft keyboard at Activity Starting you can use this Method to Hide the Key board
     */
    public void setKeyBoardHidden() {
        ((Activity) context).getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
    }

    /*Hiding the SoftKeyboard when click the Button*/
    public void HidingSoftKeyBoard(View view) {
        InputMethodManager inputManager = (InputMethodManager)
                context.getSystemService(Context.INPUT_METHOD_SERVICE);
        inputManager.hideSoftInputFromWindow(view.getWindowToken(),
                InputMethodManager.HIDE_NOT_ALWAYS);
    }

    /*Get String From string.xml File*/
    public String getString(int resource) {
        String string = context.getResources().getString(resource);
        if (!string.contains("#")) {
            System.out.println("String From String.xml :- " + string);
        }
        return string;
    }

    /*Show Try Again Alert Dialog to User with Yes or No*/
    public Dialog showAlertDialog_TryAgain(String message) {
        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.custom_alert);
        dialog.getWindow().setLayout(getWidth() - 5, LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        LinearLayout linearLayoutYesNo = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_YesNo);
        LinearLayout linearLayoutOK = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_OK);
        TextView txtCustomAlert_Heading = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Heading);
        TextView txtCustomAlert_Message = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Message);
        TextView txtCustomAlert_Yes = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Yes);
        TextView txtCustomAlert_No = (TextView) dialog.findViewById(R.id.txt_CustomAlert_No);
        TextView txtCustomAlert_OK = (TextView) dialog.findViewById(R.id.txt_CustomAlert_OK);

        txtCustomAlert_Heading.setText(getString(R.string.app_name) + " " + getString(R.string.strAlertTitle));
        txtCustomAlert_Message.setText(message);

        linearLayoutYesNo.setVisibility(View.VISIBLE);
        linearLayoutOK.setVisibility(View.GONE);

		/*txtCustomAlert_OK.setOnClickListener(new OnClickListener()
		{
			@Override
			public void onClick(View v)
			{
				dialog.dismiss();
			}
		});*/

        dialog.setCancelable(false);
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();

        return dialog;
    }

    /**
     * Alert Dialog to show the messages to user with OK button
     *
     * @param message - to show in Alert Dialog
     */
    public Dialog showAlertDialogOK(String message) {
        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.custom_alert);
        dialog.getWindow().setLayout(getWidth() - 5, LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        LinearLayout linearLayoutYesNo = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_YesNo);
        LinearLayout linearLayoutOK = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_OK);
        TextView txtCustomAlert_Heading = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Heading);
        TextView txtCustomAlert_Message = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Message);
        TextView txtCustomAlert_Yes = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Yes);
        TextView txtCustomAlert_No = (TextView) dialog.findViewById(R.id.txt_CustomAlert_No);
        TextView txtCustomAlert_OK = (TextView) dialog.findViewById(R.id.txt_CustomAlert_OK);

        txtCustomAlert_Heading.setText(getString(R.string.app_name) + " " + getString(R.string.strAlertTitle));
        txtCustomAlert_Message.setText(message);

        linearLayoutYesNo.setVisibility(View.GONE);
        linearLayoutOK.setVisibility(View.VISIBLE);

        txtCustomAlert_OK.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();
            }
        });

        dialog.setCancelable(false);
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();

        return dialog;

		/*AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);
		// set title
		alertDialogBuilder.setTitle(getString(R.string.strAppName)+" "+getString(R.string.strAlertTitle));

		// set dialog message
		alertDialogBuilder
				.setMessage(message)
				.setNeutralButton(getString(R.string.strAlert_OK),
						new DialogInterface.OnClickListener() {
					public void onClick(DialogInterface dialog, int id) {
						dialog.dismiss();
					}
				});
		// create alert dialog
		AlertDialog alertDialog = alertDialogBuilder.create();
		alertDialog.setCancelable(true);
		alertDialog.setCanceledOnTouchOutside(true);
		alertDialog.show();*/
    }

    boolean doubleBackToExitPressedOnce = false;
    public void showExitToast()
    {
        if (doubleBackToExitPressedOnce) {
            backtoPreviousActivity(true);
        }

        if(!doubleBackToExitPressedOnce) {
            this.doubleBackToExitPressedOnce = true;
            Toast_Short("Press again to exit");
        }

        new Handler().postDelayed(new Runnable() {

            @Override
            public void run() {
                doubleBackToExitPressedOnce=false;
            }
        }, 2000);
    }

    /*Show Exit Alert Dialog in LandingPage*/
    public void showExitAlert() {
        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.custom_alert);
        dialog.getWindow().setLayout(getWidth() - 5, LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        LinearLayout linearLayoutYesNo = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_YesNo);
        LinearLayout linearLayoutOK = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_OK);
        TextView txtCustomAlert_Heading = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Heading);
        TextView txtCustomAlert_Message = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Message);
        TextView txtCustomAlert_Yes = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Yes);
        TextView txtCustomAlert_No = (TextView) dialog.findViewById(R.id.txt_CustomAlert_No);
        TextView txtCustomAlert_OK = (TextView) dialog.findViewById(R.id.txt_CustomAlert_OK);

        txtCustomAlert_Heading.setText(getString(R.string.app_name) + " " + getString(R.string.strAlertTitle));
        txtCustomAlert_Message.setText(getString(R.string.strAlertMessage_Exit));

        linearLayoutYesNo.setVisibility(View.VISIBLE);
        linearLayoutOK.setVisibility(View.GONE);

        txtCustomAlert_Yes.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();
                backtoPreviousActivity(true);
            }
        });
        txtCustomAlert_No.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();
            }
        });

        dialog.setCancelable(true);
        dialog.setCanceledOnTouchOutside(true);
        dialog.show();

		/*AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);
		// set title
		alertDialogBuilder.setTitle(getString(R.string.strAppName)+" "+getString(R.string.strAlertTitle));
		// set dialog message
		alertDialogBuilder.setMessage(getString(R.string.strAlertMessage_Exit))
		.setPositiveButton(getString(R.string.strAlert_Yes),
				new DialogInterface.OnClickListener()
		{
			public void onClick(DialogInterface dialog, int id)
			{
				dialog.dismiss();
				backtoPreviousActivity(true);
			}
		})
		.setNegativeButton(getString(R.string.strAlert_No),
				new DialogInterface.OnClickListener()
		{
			public void onClick(DialogInterface dialog, int id)
			{
				dialog.dismiss();
			}
		});
		// create alert dialog
		AlertDialog alertDialog = alertDialogBuilder.create();
		// show it
		alertDialog.show();*/
    }

    /*Show Exit Alert Dialog in LandingPage*/
    public void showLogoutAlert(final Common_SharedPreference sharedPreference) {
        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.custom_alert);
        dialog.getWindow().setLayout(getWidth() - 5, LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        LinearLayout linearLayoutYesNo = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_YesNo);
        LinearLayout linearLayoutOK = (LinearLayout) dialog.findViewById(R.id.linearLayout_CustomAlert_OK);
        TextView txtCustomAlert_Heading = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Heading);
        TextView txtCustomAlert_Message = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Message);
        TextView txtCustomAlert_Yes = (TextView) dialog.findViewById(R.id.txt_CustomAlert_Yes);
        TextView txtCustomAlert_No = (TextView) dialog.findViewById(R.id.txt_CustomAlert_No);
        TextView txtCustomAlert_OK = (TextView) dialog.findViewById(R.id.txt_CustomAlert_OK);

        txtCustomAlert_Heading.setText(getString(R.string.app_name) + " " + getString(R.string.strAlertTitle));
        txtCustomAlert_Message.setText(getString(R.string.strAlertMessage_Logout));

        linearLayoutYesNo.setVisibility(View.VISIBLE);
        linearLayoutOK.setVisibility(View.GONE);

        txtCustomAlert_Yes.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();

                sharedPreference.clearUserDetailsPreference();

                backtoAnyActivity(new Intent(context, Splash_Activity.class), true);

                Toast_Short(getString(R.string.strSignoutAlert));
            }
        });
        txtCustomAlert_No.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();
            }
        });

        dialog.setCancelable(true);
        dialog.setCanceledOnTouchOutside(true);
        dialog.show();
		
		/*AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);
		// set title
		alertDialogBuilder.setTitle(getString(R.string.strAppName)+" "+getString(R.string.strAlertTitle));
		// set dialog message
		alertDialogBuilder.setMessage(getString(R.string.strAlertMessage_Exit))
		.setPositiveButton(getString(R.string.strAlert_Yes),
				new DialogInterface.OnClickListener() 
		{
			public void onClick(DialogInterface dialog, int id) 
			{
				dialog.dismiss();
				backtoPreviousActivity(true);
			}
		})
		.setNegativeButton(getString(R.string.strAlert_No), 
				new DialogInterface.OnClickListener() 
		{
			public void onClick(DialogInterface dialog, int id) 
			{
				dialog.dismiss();
			}
		});
		// create alert dialog
		AlertDialog alertDialog = alertDialogBuilder.create();
		// show it
		alertDialog.show();*/
    }

    /*Making Toast with Duration SHORT*/
    public void Toast_Short(String toastMessage) {
        Toast.makeText(context, toastMessage, Toast.LENGTH_SHORT).show();
    }

    /*Making Toast with Duration LONG*/
    public void Toast_Long(String toastMessage) {
        Toast.makeText(context, toastMessage, Toast.LENGTH_LONG).show();
    }

    /**
     * @param intent - Next Activity Intent
     * @param finish - Whether you need to Close present Activity or not
     */
	/*Going to Next Activity with Animation*/
    public void gotoNextActivity(Intent intent, boolean finish) {
        context.startActivity(intent);
        if (finish) {
            ((Activity) context).finish();
        }
        ((Activity) context).overridePendingTransition(R.anim.screen_forward_in, R.anim.screen_forward_out);
    }

    /**
     * @param finish - Whether you need to Close present Activity or not
     */
	/*Back to Previous Activity with Animation*/
    public void backtoPreviousActivity(boolean finish) {
        if (finish) {
            ((Activity) context).finish();
        }
        ((Activity) context).overridePendingTransition(R.anim.screen_backward_in, R.anim.screen_backward_out);
    }

    /**
     * @param intent - Back Activity Intent
     * @param finish - Whether you need to Close present Activity or not
     */
	/*Back to Any Activity with Animation*/
    public void backtoAnyActivity(Intent intent, boolean finish) {
        context.startActivity(intent);
        if (finish) {
            ((Activity) context).finish();
        }
        ((Activity) context).overridePendingTransition(R.anim.screen_backward_in, R.anim.screen_backward_out);
    }
}