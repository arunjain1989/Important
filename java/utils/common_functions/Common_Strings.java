package utils.common_functions;

import android.annotation.SuppressLint;
import android.content.Context;

public class Common_Strings {
	
	/*ASYNC Task TimeOut*/
	public static int timeout = 30000;

	/* GCM Sender ID */
	public static String GCM_SENDER_ID = "85007947368";

	/* DB Name & DB Path */
	public static String DB_NAME = "static_db.db";
	public static String DB_Directory = "/app/downloading";
	public static String DB_PATH = DB_Directory + "/" + DB_NAME;

	/* HTTP Hitting is Manual Function or Automatic Function */
	public static String manual = "manual";
	public static String auto = "auto";

	public static int mobileNumberMinLimit = 7;
	public static int minMinutesToEdit = 15;

	@SuppressLint("SdCardPath")
	public static String get_DB_APP_PATH(Context cont) {
		return "/data/data/" + cont.getPackageName() + "/files/";
	}

}
