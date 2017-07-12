package utils.common_functions;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

import org.json.JSONObject;

public class Common_SharedPreference
{
	Context context;
	SharedPreferences sharedpreferences;

	public static final String MyPreferences = "MyPreferences";

	public static final String keyPushMsgs = "pushMessages";

	public static final String keyParkingId = "parkingIKey";
	public static final String keyServiceCharge = "serviceChargeKey";

	public static final String keyId = "idKey";
	public static final String keyName = "nameKey";
	public static final String keyPhone = "phoneKey";
	public static final String keyEmail = "emailKey";
	public static final String keyPassword = "passwordKey";
	public static final String keyParkingDetailsJson = "parkingDetailsJsonKey";
	public static final String keyOfflineDetailsJson = "offlineDetailsJsonKey";

	public Common_SharedPreference(Context context)
	{
		this.context = context;

		sharedpreferences = context.getSharedPreferences(MyPreferences, Context.MODE_PRIVATE);
	}

	public void setPreferences_string(String key, String value)
	{
		System.out.println("SharedPreferences Key :- "+ key);
		System.out.println("SharedPreferences Value :- "+ value);
		Editor editor = sharedpreferences.edit();
		editor.putString(key, value);
		editor.commit();
	}
	public String getPreferences_string(String key)
	{
		System.out.println("SharedPreferences Key :- "+ key);
		String temp = sharedpreferences.getString(key, "");
		System.out.println("SharedPreferences Retun Value :- "+ temp);
		return temp;
	}

	public void setPreferences_int(String key, int value)
	{
		System.out.println("SharedPreferences Key :- "+ key);
		System.out.println("SharedPreferences Value :- "+ value);
		Editor editor = sharedpreferences.edit();
		editor.putInt(key, value);
		editor.commit();
	}
	public int getPreferences_int(String key)
	{
		System.out.println("SharedPreferences Key :- "+ key);
		int temp = sharedpreferences.getInt(key, 0);
		System.out.println("SharedPreferences Retun Value :- "+ temp);
		return temp;
	}

	public void setPreferences_Boolean(String key, boolean value)
	{
		System.out.println("SharedPreferences Key :- "+ key);
		System.out.println("SharedPreferences Value :- "+ value);
		Editor editor = sharedpreferences.edit();
		editor.putBoolean(key, value);
		editor.commit();
	}
	public boolean getPreferences_Boolean(String key)
	{
		System.out.println("SharedPreferences Key :- "+ key);
		boolean temp = sharedpreferences.getBoolean(key, false);
		System.out.println("SharedPreferences Retun Value :- "+ temp);
		return temp;
	}

	/*Writing & Reading Push messages From GCMIntentService*/
	public void writePushMessages(String pushMessages)
	{
		setPreferences_string(Common_SharedPreference.keyPushMsgs, pushMessages);
	}
	public String readPushMessages()
	{
		return getPreferences_string(Common_SharedPreference.keyPushMsgs);
	}

	/*Writing & Reading ParkingId*/
	public void writeParkingId(String parkingId)
	{
		setPreferences_string(Common_SharedPreference.keyParkingId, parkingId);
	}
	public String readParkingId()
	{
		return getPreferences_string(Common_SharedPreference.keyParkingId);
	}

	/*Writing & Reading UserId*/
	public void writeUserId(String userId)
	{
		setPreferences_string(Common_SharedPreference.keyId, userId);
	}
	public String readUserId()
	{
		return getPreferences_string(Common_SharedPreference.keyId);
	}

	/*Writing & Reading User's Name*/
	public void writeUserName(String userName)
	{
		setPreferences_string(Common_SharedPreference.keyName, userName);
	}
	public String readUserName()
	{
		return getPreferences_string(Common_SharedPreference.keyName);
	}

	/*Writing & Reading UserPhone*/
	public void writeUserPhone(String userPhone)
	{
		setPreferences_string(Common_SharedPreference.keyPhone, userPhone);
	}
	public String readUserPhone()
	{
		return getPreferences_string(Common_SharedPreference.keyPhone);
	}

	/*Writing & Reading UserEmail*/
	public void writeUserEmail(String userEmail)
	{
		setPreferences_string(Common_SharedPreference.keyEmail, userEmail);
	}
	public String readUserEmail()
	{
		return getPreferences_string(Common_SharedPreference.keyEmail);
	}

	/*Writing & Reading UserPassword*/
	public void writeUserPassword(String userPassword)
	{
		setPreferences_string(Common_SharedPreference.keyPassword, userPassword);
	}
	public String readUserPassword()
	{
		return getPreferences_string(Common_SharedPreference.keyPassword);
	}

    /*Writing & Reading Service Charge*/
    public void writeServiceCharge(String serviceCharge)
    {
        setPreferences_string(Common_SharedPreference.keyServiceCharge, serviceCharge);
    }
    public String readServiceCharge()
    {
        return getPreferences_string(Common_SharedPreference.keyServiceCharge);
    }

	/*Writing & Reading User ParkingDetailsJson*/
	public void writeParkingDetailsJson(String parkingDetailsJson)
	{
		setPreferences_string(Common_SharedPreference.keyParkingDetailsJson, parkingDetailsJson);
	}
	public String readParkingDetailsJson()
	{
		return getPreferences_string(Common_SharedPreference.keyParkingDetailsJson);
	}

	/*Writing & Reading User OfflineDetailsJson*/
	public void writeOfflineDetailsJson(String offlineDetailsJson)
	{
		setPreferences_string(Common_SharedPreference.keyOfflineDetailsJson, offlineDetailsJson);
	}
	public String readOfflineDetailsJson()
	{
		return getPreferences_string(Common_SharedPreference.keyOfflineDetailsJson);
	}

	/*Writing Preference for User Details based on Response*/
	public void writeUserDetailsPreference(JSONObject jsonObject, String userName, String password)
	{
		// TODO WRITING USER DETAILS PREFERENCE
		try
		{
			writeParkingId(jsonObject.getString("park_id"));
			writeServiceCharge(jsonObject.getString("service_charge"));
			writeParkingDetailsJson(jsonObject.getJSONArray("park_details").toString());

            writeUserName(userName);
            writeUserPassword(password);
		}
		catch (Exception e)
		{
			e.printStackTrace();;
		}
	}

	/*Clearing Preference for User Details based on Response*/
	public void clearUserDetailsPreference()
	{
		// TODO WRITING USER DETAILS PREFERENCE
		try
		{
            writeParkingId("");
            writeServiceCharge("");
            writeParkingDetailsJson("");
            writeUserName("");
            writeUserPassword("");
		}
		catch (Exception e)
		{
			e.printStackTrace();;
		}
	}
}
