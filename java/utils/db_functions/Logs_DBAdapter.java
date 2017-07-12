package utils.db_functions;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class Logs_DBAdapter 
{
	public static final String DATABASE_NAME = "LogsDB";
	public static final String Table_NAME = "LogsTable";

	/* Logs Table fields */
	public static final String Log_SNO = "sno";
	public static final String Log_Network_Type = "NetworkType";
	public static final String Log_Url = "Url";
	public static final String Log_Request = "Request";
	public static final String Log_Response = "Response";
	public static final String Log_StartTime = "StartTime";
	public static final String Log_EndTime = "EndTime";
	public static final String Log_TimeMilliSec = "TimeMilliSecs";
	public static final String Log_TimeSec = "TimeSecs";

	public static final int DATABASE_VERSION = 1;

	private static final String Create_Table = "create table LogsTable(sno integer primary key autoincrement,"
		+ "NetworkType text,Url text, Request text, Response text,StartTime text,EndTime text,TimeMilliSecs text,TimeSecs text);";

	private final Context context;

	private DatabaseHelper DBHelper;
	private SQLiteDatabase db;

	public Logs_DBAdapter(Context ctx) {
		this.context = ctx;
		DBHelper = new DatabaseHelper(context);
	}

	private static class DatabaseHelper extends SQLiteOpenHelper {
		DatabaseHelper(Context context) {
			super(context, DATABASE_NAME, null, DATABASE_VERSION);
		}

		@Override
		public void onCreate(SQLiteDatabase db) {
			try 
			{
				db.execSQL(Create_Table);
			} 
			catch (SQLException e) {
				e.printStackTrace();
				// Log.v("DB", "No Table Exists");
			}
		}

		@Override
		public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) 
		{
			db.execSQL("DROP table if exists");
			onCreate(db);
		}

	}

	public Logs_DBAdapter open() throws SQLException {
		db = DBHelper.getWritableDatabase();
		return this;
	}

	public void close() {
		DBHelper.close();
	}

	/* Creating an Event */
	public long InsertLog(String networkType, String url, String request, String response,
						  String startTime, String endTime, String timeMil, String timeSec) {
		ContentValues initialValues = new ContentValues();
		initialValues.put(Log_Network_Type, networkType);
		initialValues.put(Log_Url, url);
		initialValues.put(Log_Request, request);
		initialValues.put(Log_Response, response);
		initialValues.put(Log_StartTime, startTime);
		initialValues.put(Log_EndTime, endTime);
		initialValues.put(Log_TimeMilliSec, timeMil);
		initialValues.put(Log_TimeSec, timeSec);
		long id = db.insert(Table_NAME, null, initialValues);
		return id;
	}

	/* Getting all events */
	public Cursor getLogs() {
		return db.query(Table_NAME, new String[] { Log_Network_Type, Log_Url,
				Log_StartTime, Log_EndTime, Log_TimeMilliSec, Log_TimeSec }, null, null, null, null, null);
	}

	/* Getting a event detail */
	public Cursor getLog(String url) {
		return db.query(Table_NAME, new String[] { Log_Network_Type, Log_Url,
				Log_StartTime, Log_EndTime, Log_TimeMilliSec, Log_TimeSec }, "Url=\"" + url + "\"",
				null, null, null, null);
	}

	/* Deleting a row from tblTansaction by transid */
	public String deleteLogs() {
		db.execSQL("DELETE FROM "+Table_NAME);
		return "Removed";
	}
	/* Deleting a row from tblTansaction by transid */
	public String deleteTable() {
		db.execSQL("DROP TABLE IF EXISTS "+Table_NAME);
		return "Removed";
	}

	/* Getting the array of transaction receipt */
	public String[] retrieveTransHistoryReceipt() {
		String[] image = null;
		Cursor c = db.rawQuery(
				"SELECT *FROM transHistory ORDER BY transHisID DESC", null);
		if (c == null) {
			return null;
		} else if (c.moveToFirst()) {
			image = new String[c.getCount()];
			int count = 0;
			do {
				image[count] = c.getString(4);
				count++;
			} while (c.moveToNext());
		} else {
			image = null;
		}
		c.close();
		return image;
	}

	/* Deleting a row from tblTansaction by transid */
	public String deleteTransactionHistory(String id) {
		db.execSQL("DELETE FROM transHistory WHERE transHisID='" + id + "'");
		return "Removed from Notification";
	}
}