package utils.db_functions;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.text.Html;

import org.json.JSONArray;

import java.io.IOException;
import java.util.ArrayList;

import utils.common_functions.Common_Functions;

public class StaticDBFunctions {

	private final Context mContext;
	private SQLiteDatabase mDb;
	private StaticDBHelper mDbHelper;
	Common_Functions com;

	public StaticDBFunctions(Context context) {
		this.mContext = context;
		mDbHelper = new StaticDBHelper(mContext);
		com=new Common_Functions(mContext);
	}

	public StaticDBFunctions createDatabase() throws SQLException {
		try {
			mDbHelper.createDataBase();
		} catch (IOException mIOException) {
			throw new Error("UnableToCreateDatabase");
		}
		return this;
	}

	public StaticDBFunctions open() throws SQLException {
		try {
			mDbHelper.openDataBase();
			mDbHelper.close();
			mDb = mDbHelper.getDataBase();
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return this;
	}

	public void close() {
		mDbHelper.close();
	}

	/* Inserting a cart item */
	public long InsertCAT_() {
		ContentValues initialValues = new ContentValues();
		initialValues.put("cat_name", "New");
		initialValues.put("cat_id", "1");
		initialValues.put("created_date", "");
		initialValues.put("created_by", "");
		initialValues.put("cat_img", "http://ibobbee.zingmobiledev.com/cms/category/img/54/480x160.png");
		initialValues.put("status", "1");
		long id1 = mDb.insert("tbl_cat", null, initialValues);
		return id1;
	}

	/* Inserting Rows From Server Using Query */
	public void insertQuery(String query) {
		try 
		{
			Cursor mCur = mDb.rawQuery(query, null);
			
			if (mCur != null) {
				mCur.moveToNext();
			}
			System.out.println("Query Processing RESULT : "+ mCur.toString());
		} 
		catch (SQLException mSQLException) 
		{
			throw mSQLException;
		}
	}

	public Cursor getAllBranches() {
		try {
			String sql = "select * from branches";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getBranchDetailsById(String id) {
		try {
			String sql = "select * from branches where id ='"+id+"'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public String getBranchNameById(String id) {
		String name = "";
		try {
			String sql = "select title from branches where id ='"+id+"'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null && mCur.moveToFirst()) {
				do {
					name = mCur.getString(0);
				}
				while(mCur.moveToNext());
			}
			mCur.close();
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return Html.fromHtml(name).toString();
	}

	public String getBranchFBLinkById(String id) {
		String url = "";
		try {
			String sql = "select facebook_url from branches where id ='"+id+"'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null && mCur.moveToFirst()) {
				do {
					url = mCur.getString(0);
				}
				while(mCur.moveToNext());
			}
			mCur.close();
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return url;
	}

    public String[] getOpenCloseHrsByIdDay(String id, String day) {
        String[] openCloseTiming = new String[2];
        try {
            String openColumnName = "open_hrs_"+day;
            String closeColumnName = "close_hrs_"+day;
            String sql = "select "+openColumnName+","+closeColumnName+" from branches where id ='"+id+"'";

            Cursor mCur = mDb.rawQuery(sql, null);
            if (mCur != null && mCur.moveToFirst()) {
                do {
                    openCloseTiming[0] = mCur.getString(0);
                    openCloseTiming[1] = mCur.getString(1);
                }
                while(mCur.moveToNext());
            }
            mCur.close();
        } catch (SQLException mSQLException) {
            throw mSQLException;
        }
        return openCloseTiming;
    }

    public int getNoOfPaxById(String id) {
        int noOfPax = 0;
        try {
            String sql = "select no_of_pox from mgmt_branch where branch_id ='"+id+"'";

            Cursor mCur = mDb.rawQuery(sql, null);
            if (mCur != null && mCur.moveToFirst()) {
                do {
                    noOfPax = mCur.getInt(0);
                }
                while(mCur.moveToNext());
            }
            mCur.close();
        } catch (SQLException mSQLException) {
            throw mSQLException;
        }
        return noOfPax;
    }

    public int getTimeIntervalById(String id) {
        int timeInterval = 30;
        try {
            String sql = "select time_interval from mgmt_branch where branch_id ='"+id+"'";

            Cursor mCur = mDb.rawQuery(sql, null);
            if (mCur != null && mCur.moveToFirst()) {
                do {
                    timeInterval = mCur.getInt(0);
                }
                while(mCur.moveToNext());
            }
            mCur.close();
        } catch (SQLException mSQLException) {
            throw mSQLException;
        }
        return timeInterval;
    }

	/*MM/dd/yyyy Format*/
	public boolean checkingPublicHoliday(String date) {
		boolean isPublicHoliday = false;
		try {
			String sql = "select * from tbl_public_holiday where date ='"+date+"'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null && mCur.moveToFirst()) {
				isPublicHoliday = true;
			}
			mCur.close();
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return isPublicHoliday;
	}

	public Cursor getAllMenus() {
		try {
			String sql = "select * from category";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getAllSubMenusById(String id) {
		try {
			String sql = "select * from category_details where cat_id='"+id+"'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getAllItemsBySubMenuId(String subMenuId) {
		try {
			String sql = "select * from item_details where sub_cat_id='"+subMenuId+"'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getAllCats() {
		try {
			String sql = "select * from tbl_estore_main_category";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getAllSubCatsById(String id) {
		try {
			String sql = "select * from tbl_estore_category where cat_id='"+id+"' AND status='1'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	/*This for BOOK_A_TABLE*/
	public Cursor copyGetAllSubCatsById(String id) {
		try {
			String sql = "select * from book_table_estore_category where cat_id='"+id+"' AND status='1'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getAllItemsBySubCatId(String subCatId, String branchId, String sortBy) {
        if(sortBy.length()==0)
        {
            sortBy = "id ASC";
        }
        else if(sortBy.equalsIgnoreCase("name"))
        {
            sortBy = "title COLLATE NOCASE ASC";
        }
        else if(sortBy.equalsIgnoreCase("region"))
        {
            sortBy = "region COLLATE NOCASE ASC";
        }

		String condition = "category_id='"+subCatId+"' AND status='1' AND branch_id like '%"+branchId+"%' or " +
                "category_id='"+subCatId+"' AND status='1' AND branch_id like '%,"+branchId+"%' or " +
                "category_id='"+subCatId+"' AND status='1' AND branch_id like '%"+branchId+",%' or " +
                "category_id='"+subCatId+"' AND status='1' AND branch_id like '%,"+branchId+",%'";
		try {
			String sql = "select * from tbl_estore_item where "+condition+" ORDER BY "+sortBy;

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	/*This for BOOK_A_TABLE*/
	public Cursor copyGetAllItemsBySubCatId(String subCatId, String branchId, String sortBy) {
		if(sortBy.length()==0)
		{
			sortBy = "id ASC";
		}
		else if(sortBy.equalsIgnoreCase("name"))
		{
			sortBy = "title COLLATE NOCASE ASC";
		}
		else if(sortBy.equalsIgnoreCase("region"))
		{
			sortBy = "region COLLATE NOCASE ASC";
		}

		String condition = "category_id='"+subCatId+"' AND status='1' AND branch_id like '%"+branchId+"%' or " +
				"category_id='"+subCatId+"' AND status='1' AND branch_id like '%,"+branchId+"%' or " +
				"category_id='"+subCatId+"' AND status='1' AND branch_id like '%"+branchId+",%' or " +
				"category_id='"+subCatId+"' AND status='1' AND branch_id like '%,"+branchId+",%'";
		try {
			String sql = "select * from book_table_estore_item where "+condition+" ORDER BY "+sortBy;

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

    public Cursor getAllToppingsByItemId(String itemId) {
        try {
            String sql = "select * from tbl_estore_topping where item_id='"+itemId+"' AND status='1'";

            Cursor mCur = mDb.rawQuery(sql, null);
            return mCur;
        } catch (SQLException mSQLException) {
            throw mSQLException;
        }
    }

    public boolean checkToppingsAvailabilityByItemId(String itemId) {
        try {
            String sql = "select * from tbl_estore_topping where item_id='"+itemId+"' AND status='1'";

            Cursor mCur = mDb.rawQuery(sql, null);
            if (mCur != null && mCur.moveToFirst()) {
				return true;
            }
        } catch (SQLException mSQLException) {
            throw mSQLException;
        }
        return false;
    }

	public String getDeliveryCharge() {
		String amt = "0";
		try {
			String sql = "select delivery_charge from tbl_config";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null && mCur.moveToFirst()) {
				do {
					amt = mCur.getString(0);
				}
				while(mCur.moveToNext());
			}
			mCur.close();
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return amt;
	}

	public String getMinDeliveryAmt() {
		String amt = "0";
		try {
			String sql = "select min_amount_delivery from tbl_config";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null && mCur.moveToFirst()) {
				do {
					amt = mCur.getString(0);
				}
				while(mCur.moveToNext());
			}
			mCur.close();
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return amt;
	}

	public String getHQMobileNumber() {
		String url = "";
		try {
			String sql = "select contact_no from hq_contact";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null && mCur.moveToFirst()) {
				do {
					url = mCur.getString(0);
				}
				while(mCur.moveToNext());
			}
			mCur.close();
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return url;
	}

	public Cursor getAllLocations(String sortBy) {
		String OrderBy = "ASC";
		if(sortBy.equalsIgnoreCase("A - Z"))
		{
			OrderBy = "ASC";
		}
		else if(sortBy.equalsIgnoreCase("Z - A"))
		{
			OrderBy = "DESC";
		}
		try {
//			String sql = "SELECT * FROM tbl_locations where status= '1';";
			String sql = "select tbl_merchant._id, tbl_merchant.merchant_name, tbl_merchant_outlet.phone_number,"
					+" tbl_merchant_outlet.mobile_number, tbl_merchant_outlet.id_address from tbl_merchant " +
					"JOIN tbl_merchant_outlet ON  tbl_merchant_outlet.id_merchant=tbl_merchant._id " +
					"where tbl_merchant_outlet.active_status='1' AND tbl_merchant.active_status='1' " +
					"ORDER BY tbl_merchant.merchant_name COLLATE NOCASE "+OrderBy;

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getAllLocationsByCategory(String sortBy, String filterBy) {
		String OrderBy = "ASC";
		if(sortBy.equalsIgnoreCase("A - Z"))
		{
			OrderBy = "ASC";
		}
		else if(sortBy.equalsIgnoreCase("Z - A"))
		{
			OrderBy = "DESC";
		}
		String FilterByQuery = "";
		if(filterBy.length()>0)
		{
			FilterByQuery = "AND _id IN (select outlet_id from tbl_assign_outlet_cat where " +
					"default_cat_id like '%"+filterBy+"%' or " +
					"default_cat_id like '%,"+filterBy+"%' or " +
					"default_cat_id like '%"+filterBy+",%' or " +
					"default_cat_id like '%,"+filterBy+",%')";
		}
		try {
//			String sql = "SELECT * FROM tbl_locations where status= '1';";
			String sql = "select * from tbl_merchant_outlet where active_status='1'"+
					FilterByQuery +
					" ORDER BY outlet_name COLLATE NOCASE "+OrderBy;

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getLocationDetailsById(String id) {
		try {
//			String sql = "SELECT * FROM tbl_locations where status= '1';";
			String sql = "select * from tbl_merchant_outlet where active_status='1' AND _id='"+id+"'";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getAllLocations(String sortBy, String filterBy) {
		String OrderBy = "ASC";
		if(sortBy.equalsIgnoreCase("A - Z"))
		{
			OrderBy = "ASC";
		}
		else if(sortBy.equalsIgnoreCase("Z - A"))
		{
			OrderBy = "DESC";
		}
		String FilterByQuery = "";
		if(filterBy.length()>0)
		{
//			FilterByQuery = "AND tbl_merchant._id IN (select merchant_id from tbl_products where " +
//					"id_category IN (select _id from tbl_product_categories where " +
//					"id_category_parent IN ("+filterBy+"))  GROUP BY merchant_id)";
			FilterByQuery = "AND tbl_merchant._id IN (select merchant_id from tbl_products where " +
					"id_category IN (select _id from tbl_product_categories where active_status= '1' " +
					"and id_category_parent IN ("+filterBy+"))  GROUP BY merchant_id)";
		}
		try {
//			String sql = "SELECT * FROM tbl_locations where status= '1';";
			String sql = "select tbl_merchant._id, tbl_merchant.merchant_name, tbl_merchant_outlet.phone_number,"
					+" tbl_merchant_outlet.mobile_number, tbl_merchant_outlet.id_address from tbl_merchant " +
					"JOIN tbl_merchant_outlet ON  tbl_merchant_outlet.id_merchant=tbl_merchant._id " +
					"where tbl_merchant_outlet.active_status='1' AND tbl_merchant.active_status='1' " +
					FilterByQuery +
					"ORDER BY tbl_merchant.merchant_name COLLATE NOCASE "+OrderBy;

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public Cursor getAllLocationsMainProductId(String sortBy, String filterBy) {
		String OrderBy = "ASC";
		if(sortBy.equalsIgnoreCase("A - Z"))
		{
			OrderBy = "ASC";
		}
		else if(sortBy.equalsIgnoreCase("Z - A"))
		{
			OrderBy = "DESC";
		}
		String FilterByQuery = "";
		if(filterBy.length()>0)
		{
//			FilterByQuery = "AND tbl_merchant._id IN (select merchant_id from tbl_products where " +
//					"id_category IN ("+filterBy+")  GROUP BY merchant_id)";
			FilterByQuery = "AND tbl_merchant._id IN (select merchant_id from tbl_products where " +
					"id_category IN (select _id from tbl_product_categories where active_status= '1' " +
					"and id_category_parent IN ("+filterBy+"))  GROUP BY merchant_id)";
		}
		try {
//			String sql = "SELECT * FROM tbl_locations where status= '1';";
			String sql = "select tbl_merchant._id, tbl_merchant.merchant_name, tbl_merchant_outlet.phone_number,"
					+" tbl_merchant_outlet.mobile_number, tbl_merchant_outlet.id_address from tbl_merchant " +
					"JOIN tbl_merchant_outlet ON  tbl_merchant_outlet.id_merchant=tbl_merchant._id " +
					"where tbl_merchant_outlet.active_status='1' AND tbl_merchant.active_status='1' " +
					FilterByQuery +
					"ORDER BY tbl_merchant.merchant_name COLLATE NOCASE "+OrderBy;

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getLocationAddressById(String id) {
		try {
			String sql = "select * from tbl_addresses where _id='"+id+"' AND active_status='1' ORDER BY _id ASC";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getLocationsStates() {
		try {
			String sql = "SELECT * FROM tbl_locations GROUP BY state ORDER BY state ASC";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getLocationsByState(String state) {
		try {
			String sql = "SELECT * FROM tbl_locations where state= '" + state + "' ORDER BY name ASC";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}

	public Cursor getCityStateBYOutlets() {
		try {
			String sql = "select city, state from tbl_addresses where _id IN " +
					"(select id_address from tbl_merchant_outlet) ORDER BY city ASC";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	
	public Cursor getAllProducts() {
		try {
//			String sql = "Select * from tbl_product_categories where id_category_parent='0';";
			String sql = "Select * from tbl_product_categories where active_status= '1' and id_category_parent='0';";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public JSONArray getAllProductNames() {
		try {
//			String sql = "Select title from tbl_product_categories where id_category_parent='0';";
			String sql = "Select title from tbl_product_categories where active_status= '1' and id_category_parent='0';";

			Cursor mCur = mDb.rawQuery(sql, null);
			JSONArray array = new JSONArray();
			if (mCur != null) {
				if(mCur.moveToFirst())
				{
					do
					{
						array.put(mCur.getString(0));
					}
					while(mCur.moveToNext());
				}
			}
			return array;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public JSONArray getAllProductNameswithId() {
		try {
//			String sql = "Select _id, title from tbl_product_categories where id_category_parent='0';";
			String sql = "Select _id, title from tbl_product_categories where active_status= '1' and id_category_parent='0';";

			Cursor mCur = mDb.rawQuery(sql, null);
			JSONArray array = new JSONArray();
			if (mCur != null) {
				if(mCur.moveToFirst())
				{
					do
					{
						array.put(mCur.getString(1)+"-"+mCur.getString(0));
					}
					while(mCur.moveToNext());
				}
			}
			return array;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public String getProductName(String id) {
		try {
//			String sql = "Select title from tbl_product_categories where id_category_parent='0' " +
//					"and id='" + id + "' ;";
			String sql = "Select title from tbl_product_categories where active_status= '1' " +
					"and id_category_parent='0' and id='" + id + "' ;";
			
			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			if(mCur.moveToFirst())
				return mCur.getString(0);
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return "";
	}
	public ArrayList<String> getSubCatNames(String product_id) {
		ArrayList<String> names = new ArrayList<String>();
		try {
//			String sql = "Select title, _id from tbl_product_categories where " +
//					"id_category_parent='" + product_id + "' ;";
			String sql = "Select title, _id from tbl_product_categories where active_status= '1' and " +
					"id_category_parent='" + product_id + "' ;";

			Cursor mCur = mDb.rawQuery(sql, null);
			if(mCur.moveToFirst())
			{
				do
				{
					names.add(mCur.getString(0)+"__"+mCur.getString(1));
				}
				while(mCur.moveToNext());
			}
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
		return names;
	}
	
	public Cursor get5ItemsByProductId(String product_id) {
		try 
		{
//			String sql = "select * from tbl_products where id_category IN " +
//					"(select _id from tbl_product_categories where " +
//					"id_category_parent='"+product_id+"') AND active_status= '1' LIMIT 5";
			String sql = "select * from tbl_products where id_category IN " +
					"(select _id from tbl_product_categories where active_status= '1' " +
					"and id_category_parent='"+product_id+"') AND active_status= '1' LIMIT 5";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public Cursor get5ItemsByMainProductId(String product_id) {
		try 
		{
			String sql = "select * from tbl_products where id_category='"+product_id+"'" +
					" AND active_status= '1' LIMIT 5";

			Cursor mCur = mDb.rawQuery(sql, null);

			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public Cursor getAllItemsByProductId(String product_id) {
		try 
		{
//			String sql = "select * from tbl_products where id_category IN " +
//					"(select _id from tbl_product_categories where " +
//					"id_category_parent='"+product_id+"') AND active_status= '1' LIMIT 5";
			String sql = "select * from tbl_products where id_category IN " +
					"(select _id from tbl_product_categories where active_status= '1' " +
					"and id_category_parent='"+product_id+"') AND active_status= '1' LIMIT 5";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public Cursor getAllItemsByProductId(String product_id, String sortby, String filterBy) {
		try 
		{
			String sql="";
			/*This QUERY for getting SubCat Id from tbl_product_categories table*/
			String query = filterBy;
			if(query.length()==0)
			{
//				query = "(select _id from tbl_product_categories where " +
//						" id_category_parent='"+product_id+"')";
				query = "(select _id from tbl_product_categories where active_status= '1' " +
						"and id_category_parent='"+product_id+"')";
			}
			
			if(sortby.equalsIgnoreCase("All"))
			{
				sql = "select * from tbl_products where id_category IN " + query +
						" AND active_status= '1'";
			}
			else if(sortby.equalsIgnoreCase("A - Z"))
			{
				sql = "select * from tbl_products where id_category IN " + query +
						" AND active_status= '1' " +
						"ORDER BY title COLLATE NOCASE ASC;";
			}
			else if(sortby.equalsIgnoreCase("Z - A"))
			{
				sql = "select * from tbl_products where id_category IN " + query +
						" AND active_status= '1' " + 
						"ORDER BY title COLLATE NOCASE DESC;";
			}
			else if(sortby.equalsIgnoreCase("lowest price"))
			{
				sql = "select * from tbl_products where id_category IN " + query +
						" AND active_status= '1' " + 
						"ORDER BY CAST(discount_price AS REAL) ASC;";
			}
			else if(sortby.equalsIgnoreCase("highest price"))
			{
				sql = "select * from tbl_products where id_category IN " + query +
						" AND active_status= '1' " + 
						"ORDER BY CAST(discount_price AS REAL) DESC;";
			}
			else if(sortby.equalsIgnoreCase("Stock"))
			{
				sql = "select * from tbl_products where id_category IN " + query +
						" AND active_status= '1' " + 
						"ORDER BY CAST(stock AS REAL) DESC;";
			}
			else
			{
				sql = "select * from tbl_products where id_category IN " + query +
						" AND active_status= '1'";
			}
			Cursor mCur = mDb.rawQuery(sql, null);
			
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public Cursor getAllItemsByMainProductId(String product_id, String sortby) {
		try 
		{
			String sql="";
			if(sortby.equalsIgnoreCase("All"))
			{
				sql = "select * from tbl_products where id_category='"+product_id+"' AND active_status= '1'";
			}
			else if(sortby.equalsIgnoreCase("A - Z"))
			{
				sql = "select * from tbl_products where id_category='"+product_id+"' AND active_status= '1' " +
						"ORDER BY title COLLATE NOCASE ASC;";
			}
			else if(sortby.equalsIgnoreCase("Z - A"))
			{
				sql = "select * from tbl_products where id_category='"+product_id+"' AND active_status= '1' " + 
						"ORDER BY title COLLATE NOCASE DESC;";
			}
			else if(sortby.equalsIgnoreCase("lowest price"))
			{
				sql = "select * from tbl_products where id_category='"+product_id+"' AND active_status= '1' " + 
						"ORDER BY CAST(discount_price AS REAL) ASC;";
			}
			else if(sortby.equalsIgnoreCase("highest price"))
			{
				sql = "select * from tbl_products where id_category='"+product_id+"' AND active_status= '1' " + 
						"ORDER BY CAST(discount_price AS REAL) DESC;";
			}
			else if(sortby.equalsIgnoreCase("Stock"))
			{
				sql = "select * from tbl_products where id_category='"+product_id+"' AND active_status= '1' " + 
						"ORDER BY CAST(stock AS REAL) DESC;";
			}
			else
			{
				sql = "select * from tbl_products where id_category='"+product_id+"' AND active_status= '1'";
			}
			Cursor mCur = mDb.rawQuery(sql, null);
			
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public ArrayList<String> getItemsCategoryByProductId(String product_id) {
		try 
		{
			ArrayList<String> category = new ArrayList<String>();
			String sql = "select category from tbl_item where status=1 AND product_id='" + product_id + "' GROUP BY category;";
			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				if(mCur.moveToFirst())
				{
					do
					{
						category.add(mCur.getString(0));
					}
					while(mCur.moveToNext());
				}
				mCur.close();
			}
			return category;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public Cursor getItemDetailsByID(String id) {
		try {
			String sql = "select * from tbl_products where active_status='1' AND  _id='" + id + "' ;";
			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public String getModifierNameByItemID(String id) {
		try {
			String title = "";
			String sql = "select title from tbl_def_modifiers where active_status='1' AND  _id='" + id + "' ;";
			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				if(mCur.moveToFirst())
				{
					do
					{
						title = mCur.getString(0);
					}
					while(mCur.moveToNext());
				}
			}
			return title;
			
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	public String getModifierValueByItemID(String id) {
		try {
			String title = "";
			String sql = "select title from tbl_def_modifer_values where active_status='1' AND  _id='" + id + "' ;";
			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				if(mCur.moveToFirst())
				{
					do
					{
						title = mCur.getString(0);
					}
					while(mCur.moveToNext());
				}
			}
			return title;
			
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
	
	public Cursor getAllPromotions() {
		try {
			String sql = "select * from tbl_promotions where status=1 ORDER BY sort_order ASC;";

			Cursor mCur = mDb.rawQuery(sql, null);
			if (mCur != null) {
				mCur.moveToNext();
			}
			return mCur;
		} catch (SQLException mSQLException) {
			throw mSQLException;
		}
	}
}