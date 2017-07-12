package utils.db_functions;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class LocalDB 
{
	public static final int DATABASE_VERSION = 1;
	public static final String DATABASE_NAME = "AppLocalDB";

	public static final String TBL_VEHICLE = "tblVehicleDetails";

	/* Vehicle Details Table */
	public static String VEHICLE_NO = "vehicle_no",
			VEHICLE_TYPE = "vehicle_type",
			FIXED_PRICE = "fixed_price",
            FIXED_HR = "fixed_hr",
			PRICE_PER_HR = "price_per_hr",
			CHECK_IN_DATE = "check_in_date",
            CHECK_IN_TIME = "check_in_time",
            CHECK_OUT_TIME = "check_out_time",
            ACTUAL_CHECK_OUT_TIME = "actual_check_out_time",
            TOTAL = "total",
            ACTUAL_TOTAL = "actual_total",
			IS_POSTPAID = "is_postpaid",
			STATUS = "status",
			TIME = "current_milliseconds";

	private static String CREATE_TABLE_CART = "";

	Context context;

	private DatabaseHelper DBHelper;
	private SQLiteDatabase db;

	public LocalDB(Context context) {
		this.context = context;
		DBHelper = new DatabaseHelper(context);

        CREATE_TABLE_CART = "create table "+TBL_VEHICLE+"(id integer primary key autoincrement,"
                + VEHICLE_NO + " text,"
                + VEHICLE_TYPE + " text,"
                + FIXED_PRICE + " text,"
                + FIXED_HR + " text,"
                + PRICE_PER_HR +" text,"
                + CHECK_IN_DATE +" text,"
                + CHECK_IN_TIME +" text,"
                + CHECK_OUT_TIME +" text,"
                + ACTUAL_CHECK_OUT_TIME +" text,"
                + TOTAL +" text,"
                + ACTUAL_TOTAL +" text,"
				+ IS_POSTPAID +" text,"
				+ STATUS +" text,"
                + TIME +" text);";
	}

	private static class DatabaseHelper extends SQLiteOpenHelper {
		DatabaseHelper(Context context) {
			super(context, DATABASE_NAME, null, DATABASE_VERSION);
		}

		@Override
		public void onCreate(SQLiteDatabase db) {
			try 
			{
				db.execSQL(CREATE_TABLE_CART);
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}

		@Override
		public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion)
		{
			db.execSQL("DROP table if exists");
			onCreate(db);
		}

	}

	public LocalDB open() throws SQLException {
		db = DBHelper.getWritableDatabase();
		return this;
	}

	public void close() {
		DBHelper.close();
	}

	/* Inserting a Vehicle */
	public long insertVehicleDetails(String vehicle_no, String vehicle_type, String fixed_price,
                                     String fixed_hr, String price_per_hr, String date,
                                     String check_in_time, String check_out_time, String total, String is_postpaid) {
        long seconds = System.currentTimeMillis();
		ContentValues contentValues = new ContentValues();
		contentValues.put(VEHICLE_NO, vehicle_no);
		contentValues.put(VEHICLE_TYPE, vehicle_type);
		contentValues.put(FIXED_PRICE, fixed_price);
		contentValues.put(FIXED_HR, fixed_hr);
		contentValues.put(PRICE_PER_HR, price_per_hr);
        contentValues.put(CHECK_IN_DATE, date);
        contentValues.put(CHECK_IN_TIME, check_in_time);
        contentValues.put(CHECK_OUT_TIME, check_out_time);
        contentValues.put(ACTUAL_CHECK_OUT_TIME, "");
        contentValues.put(TOTAL, total);
        contentValues.put(ACTUAL_TOTAL, 0);
        contentValues.put(IS_POSTPAID, is_postpaid);
		contentValues.put(STATUS, "1");
		contentValues.put(TIME, seconds);
		long id1 = db.insert(TBL_VEHICLE, null, contentValues);
		return seconds;
	}

    /*Getting all Vehicle Details */
    public Cursor getAllVehicleDetails()
    {
        Cursor cursor = db.rawQuery("SELECT * FROM "+ TBL_VEHICLE +" ORDER BY id DESC", null);

        return cursor;
    }

	/*Getting a single Vehicle Details by Id*/
	public Cursor getVehicleDetailsById(String id)
	{
		Cursor cursor = db.rawQuery("SELECT * FROM "+ TBL_VEHICLE + " WHERE id='"+id+"'  ORDER BY id DESC", null);

		return cursor;
	}

    /*Getting a single vehicle details*/
    public Cursor getVehicleDetailsByNo(String no)
    {
        Cursor c = null;
        try {
            c = db.rawQuery("SELECT * FROM " + TBL_VEHICLE + " WHERE "
                    +STATUS +"='1' AND "+ VEHICLE_NO + " LIKE '%"+no+"%'  ORDER BY id DESC", null);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return c;
    }

    /*Getting all Vehicle Details */
    public Cursor getVehicleDetailsByDate(String fromDate, String toDate)
    {
        String time = " 11:59 PM";
        Cursor cursor = db.rawQuery("SELECT * FROM "+ TBL_VEHICLE +" WHERE ("
                +CHECK_IN_DATE+">='"+fromDate+"' AND "+CHECK_IN_DATE+"<='"+toDate+"') OR ("
                +ACTUAL_CHECK_OUT_TIME+">='"+fromDate+"' AND "+ACTUAL_CHECK_OUT_TIME+"<='"+toDate+time+"')"
                +" ORDER BY id DESC", null);

        return cursor;
    }

    /* Changing the single vehicle Details like Actual Checkout Time & Actual Total with Status by ID */
    public void changeVehicleDetailsWithStatusById(String id, String actual_out_time, String actual_total) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ACTUAL_CHECK_OUT_TIME, actual_out_time);
        contentValues.put(ACTUAL_TOTAL, actual_total);
        contentValues.put(STATUS, 2);
        db.update(TBL_VEHICLE, contentValues, "id='" + id + "'", null);
    }

    /* Deleting a single vehicle details by ID */
    public void deleteVehicleById(String id) {
        db.delete(TBL_VEHICLE, "id='" + id + "'", null);
    }

	/* Deleting a single vehicle details by Date */
	public long deleteVehicleByDate(String date) {
		return db.delete(TBL_VEHICLE, CHECK_IN_DATE+"='" + date + "'", null);
	}

	/* Deleting Vehicles table */
	public void deleteVehicleTable() {
		db.delete(TBL_VEHICLE, null, null);
	}
}