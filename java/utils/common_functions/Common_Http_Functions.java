package utils.common_functions;

import android.content.Context;
import android.net.Uri;

import com.google.android.gcm.GCMRegistrar;

import org.json.JSONArray;
import org.json.JSONObject;


public class Common_Http_Functions {

    Context context;

    /* ASYNC Task TimeOut */
    public static int timeout = 30000;

//    String baseURL = "http://website-development.co.in/carparking/service/";
    String baseURL = "http://goparking.in/service/";

    public Common_Http_Functions(Context context)
    {
        this.context = context;
    }

    /*Making Login URL with GET Values*/
    public String[] login(Common_Functions com, String strEMail, String strPassword) {
        //TODO LOGIN
        String url = baseURL+"admin-login/json/";

        JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("username", strEMail);
            jsonObject.put("password", strPassword);
            jsonObject.put("phone_type", "1");
            jsonObject.put("phone_details", com.getPhoneDetailsJSONObject());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return new String[]{url+jsonObject.toString()};
    }

    /*Making CheckIn for Walk in User URL with GET Values*/
    public String[] walkInCheckIn(Common_Functions com, String parkingId, String type, String vehicleNo, int duration,
                            String inTime, String outTime, double price, String paymentMode) {
        //TODO CHECK_IN_WALK_IN
        String url = baseURL+"admin-checkin/json/";

        JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("parkId", parkingId);
            jsonObject.put("typ", type);
            jsonObject.put("from_time", inTime);
            jsonObject.put("till_time", outTime);
            jsonObject.put("carNumber", vehicleNo);
            jsonObject.put("duration", duration);
            jsonObject.put("park_payment", paymentMode); /*postpaid & prepaid*/
            jsonObject.put("amount", price);
            jsonObject.put("phone_details", com.getPhoneDetailsJSONObject());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return new String[]{url+jsonObject.toString()};
    }

    /*Making CheckOut(Manual) for Walk in User URL with GET Values*/
    public String[] walkInCheckoutManual(Common_Functions com, String parkingId, String code)
    {
        //TODO MANUAL_CHECKOUT_WALK_IN
        String url = baseURL+"admin-checkout/json/";

        JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("parkId", parkingId);
            jsonObject.put("code", code);
            jsonObject.put("phone_details", com.getPhoneDetailsJSONObject());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return new String[]{url+jsonObject.toString()};
    }

    /*Making CheckOut(Scan) for Walk in User URL with GET Values*/
    public String[] walkInCheckoutScan(Common_Functions com, String parkingId, String code)
    {
        //TODO SCAN_CHECKOUT_WALK_IN
        String url = baseURL+"admin-checkout/json/";

        JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("parkId", parkingId);
            jsonObject.put("bid", code);
            jsonObject.put("phone_details", com.getPhoneDetailsJSONObject());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return new String[]{url+jsonObject.toString()};
    }

    /*Making CheckIn(Scan) for Online User URL with GET Values*/
    public String[] onlineCheckInScan(Common_Functions com, String parkingId, String code)
    {
        //TODO ONLINE_CHECK_IN_SCAN
        String url = baseURL+"checkin/json/";

        JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("parkId", parkingId);
            jsonObject.put("bid", code);
            jsonObject.put("phone_details", com.getPhoneDetailsJSONObject());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return new String[]{url+jsonObject.toString()};
    }

    /*Making CheckOut(Scan) for Online User URL with GET Values*/
    public String[] onlineCheckOutScan(Common_Functions com, String parkingId, String code)
    {
        //TODO ONLINE_CHECKOUT_SCAN
        String url = baseURL+"checkout/json/";

        JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("parkId", parkingId);
            jsonObject.put("bid", code);
            jsonObject.put("phone_details", com.getPhoneDetailsJSONObject());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return new String[]{url+jsonObject.toString()};
    }

    /*Making Getting Report(based on from & to date) URL with GET Values*/
    public String[] report(Common_Functions com, String parkingId, String from, String to)
    {
        //TODO REPORT
        String url = baseURL+"admin-walkin-report/json/";

        JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("parkId", parkingId);
            jsonObject.put("from", from);
            jsonObject.put("to", to);
            jsonObject.put("phone_details", com.getPhoneDetailsJSONObject());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return new String[]{url+jsonObject.toString()};
    }

    /*Making Offline Admin Activation URL with GET Values*/
    public String[] offlineActivation(Common_Functions com, String parkingId, String key)
    {
        //TODO OFFLINE_ACTIVATION
        String url = baseURL+"offline-login/json/";

        JSONObject jsonObject = new JSONObject();
        try
        {
//            jsonObject.put("parkId", parkingId);
            jsonObject.put("otp", key);
            jsonObject.put("phone_details", com.getPhoneDetailsJSONObject());
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return new String[]{url+jsonObject.toString()};
    }

    /** For Sample -- Not Using **/
    public String writeParameters()
    {
		/*String urlParameters = "x=addOrbaUser&full_name=ORBA&phone_number=1234567890&email=ORBA@ORBA.COM&gender=M&password=ORBA";*/
        Uri.Builder builder = new Uri.Builder()
                .appendQueryParameter("x", "login")
                .appendQueryParameter("user_name", "a@a.com")
                .appendQueryParameter("password", "abcde");
        String urlParameters = builder.build().getEncodedQuery();

        return urlParameters;
    }
}
