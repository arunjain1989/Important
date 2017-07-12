package in.car_parking_walkin;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.text.Html;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.Hashtable;

import utils.asynctask.Async_Task_Get;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_Http_Functions;
import utils.common_functions.Common_SharedPreference;
import utils.common_functions.Common_Strings;
import utils.db_functions.LocalDB;

public class OfflineBookingHistory_Activity extends Activity
{
	Context context = this;
	Common_Functions com;
	Common_SharedPreference sharedPreference;
    LocalDB db;

	TextView txtLoading, txtFrom, txtTo;
	LinearLayout linearLayout;

    JSONArray jsonArrayResult = new JSONArray();

	public void onCreate(Bundle bundle)
	{
		super.onCreate(bundle);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.offline_booking_history_activity);

		com = new Common_Functions(context);
		sharedPreference = new Common_SharedPreference(context);
        db = new LocalDB(context);

		ImageView imgBack = (ImageView) findViewById(R.id.imgHeaderLeftBack);
        ImageView imgRight = (ImageView) findViewById(R.id.imgHeaderRight);
        ImageView imgClose = (ImageView) findViewById(R.id.imgHeaderClose);
        ImageView imgSearch = (ImageView) findViewById(R.id.imgHeaderSearch);
        final RelativeLayout relativeLayoutSearch = (RelativeLayout) findViewById(R.id.relativeLayoutHeaderSearch);
        final EditText edtVehicleNo = (EditText) findViewById(R.id.edt_OfflineBookingHis_Search);

        relativeLayoutSearch.setVisibility(View.GONE);
		imgBack.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				onBackPressed();
			}
		});
        imgRight.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                relativeLayoutSearch.setVisibility(View.VISIBLE);
            }
        });
        imgClose.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                com.HidingSoftKeyBoard(edtVehicleNo);
                edtVehicleNo.setText("");
                settingList(jsonArrayResult);
                relativeLayoutSearch.setVisibility(View.GONE);
            }
        });
        edtVehicleNo.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                String strVNo = com.getTextFromView(edtVehicleNo);
                searching(strVNo);
                return false;
            }
        });
        imgSearch.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                String strVNo = com.getTextFromView(edtVehicleNo);
                searching(strVNo);
            }
        });

        findViewById(R.id.txt_OfflineBookingHis_Details).setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                edtVehicleNo.setText("");
                relativeLayoutSearch.setVisibility(View.GONE);

                fetchingReportDetails();
            }
        });

        findViewById(R.id.txt_OfflineBookingHis_Submit).setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                edtVehicleNo.setText("");
                relativeLayoutSearch.setVisibility(View.GONE);

                fetchingReportList();
            }
        });

        linearLayout = (LinearLayout) findViewById(R.id.linearLayout_OfflineBookingHis_List);
        txtLoading = (TextView) findViewById(R.id.txt_OfflineBookingHis_Loading);
        txtFrom = (TextView) findViewById(R.id.txt_OfflineBookingHis_From);
        txtTo = (TextView) findViewById(R.id.txt_OfflineBookingHis_To);

        txtFrom.setText(com.get6DaysBeforeDate());
        txtTo.setText(com.getCurrentDate());

        txtFrom.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                datePicker(v);
            }
        });
        txtTo.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                datePicker(v);
            }
        });

        fetchingReportList();
	}

    public void searching(String strVNo)
    {
        if(strVNo.length()>0)
        {
            com.HidingSoftKeyBoard(txtLoading);
            try
            {
                JSONArray jsonArray = new JSONArray();
                for(int i=0; i<jsonArrayResult.length(); i++) {
                    JSONObject jsonObject = jsonArrayResult.getJSONObject(i);

                    if(jsonObject.getString("vehicle_no").contains(strVNo))
                    {
                        jsonArray.put(jsonObject);
                    }
                }
                settingList(jsonArray);
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
        else
        {
            com.showAlertDialogOK("Please enter vehicle number.");
        }
    }

    public void fetchingReportDetails()
    {
        String from = com.getTextFromView(txtFrom);
        String to = com.getTextFromView(txtTo);
        if(from.isEmpty() && to.isEmpty())
        {
            txtLoading.setText(com.getString(R.string.strOffline_NoVehicles));
            com.Toast_Short("Please select valid dates!");
            return;
        }
        db.open();
        Cursor cursor = db.getVehicleDetailsByDate(from, to);
        if(cursor != null && cursor.moveToFirst())
        {
            try {
                int totalParking = 0, total2WheelerParking = 0, total4WheelerParking = 0,
                        totalCheckedIn = 0, totalCheckOut = 0;
                double totalAmount = 0;

                do {
                    int vehicleType = cursor.getInt(cursor.getColumnIndex(LocalDB.VEHICLE_TYPE));
                    int status = cursor.getInt(cursor.getColumnIndex(LocalDB.STATUS));
                    boolean isPostPaid = false;
                    if(cursor.getString(cursor.getColumnIndex(LocalDB.IS_POSTPAID)).equalsIgnoreCase("true"))
                    {
                        isPostPaid = true;
                    }
                    double price = cursor.getDouble(cursor.getColumnIndex(LocalDB.TOTAL));
                    double actualPrice = cursor.getDouble(cursor.getColumnIndex(LocalDB.ACTUAL_TOTAL));

                    totalParking += 1;
                    totalCheckedIn += 1;
                    if(vehicleType == 2)
                    {
                        total2WheelerParking += 1;
                    }
                    else
                    {
                        total4WheelerParking += 1;
                    }
                    if(status == 2)
                    {
                        totalCheckOut += 1;
                    }
                    if(!isPostPaid || status == 2)
                    {
                        totalAmount += (price + actualPrice);
                    }
                }
                while (cursor.moveToNext());

                String string = "<br><b><big><font color=red>Total Parking : "+totalParking+"</font></big></b><br>" +
                        "2 Wheelers : "+total2WheelerParking+"<br>4 Wheelers : "+total4WheelerParking+"<br><br>" +
                        "<b>Checked In Vehicles : "+totalCheckedIn+"<br>"+
                        "Checked Out Vehicles : "+totalCheckOut+"<br><br><br>"+
                        "<big><font color=red>TOTAL AMOUNT : Rs. "+
                        com.roundOffTo2DecPlaces(totalAmount+"")+"</font></big></b><br>";

                final Dialog dialog = com.showAlertDialogOK(string);
                ((TextView) dialog.findViewById(R.id.txt_CustomAlert_Message)).setText(Html.fromHtml(string));
                ((TextView) dialog.findViewById(R.id.txt_CustomAlert_Heading)).setText("TRANSACTION DETAILS!");
                dialog.findViewById(R.id.txt_CustomAlert_OK).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        dialog.dismiss();
                    }
                });
            }
            catch (Exception e)
            {
                e.printStackTrace();
                com.Toast_Short("Exception!!!");
                com.showAlertDialogOK("Details not found!");
            }
        }
        else
        {
            com.showAlertDialogOK("Details not found!");
        }
        cursor.close();
        db.close();
    }

    public void fetchingReportList()
    {
        String from = com.getTextFromView(txtFrom);
        String to = com.getTextFromView(txtTo);
        if(from.isEmpty() && to.isEmpty())
        {
            txtLoading.setText(com.getString(R.string.strOffline_NoVehicles));
            com.Toast_Short("Please select valid dates!");
            return;
        }
        db.open();
        Cursor cursor = db.getVehicleDetailsByDate(from, to);
        if(cursor != null && cursor.moveToFirst()) {
            JSONArray jsonArray = new JSONArray();
            try {
                do {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("id", cursor.getInt(cursor.getColumnIndex("id")));
                    jsonObject.put("vehicle_no", cursor.getString(cursor.getColumnIndex(LocalDB.VEHICLE_NO)));
                    jsonObject.put("vehicle_type", cursor.getString(cursor.getColumnIndex(LocalDB.VEHICLE_TYPE)));
                    jsonObject.put("date", cursor.getString(cursor.getColumnIndex(LocalDB.CHECK_IN_DATE)));
                    jsonObject.put("check_in", cursor.getString(cursor.getColumnIndex(LocalDB.CHECK_IN_TIME)));
                    jsonObject.put("check_out", cursor.getString(cursor.getColumnIndex(LocalDB.CHECK_OUT_TIME)));
                    jsonObject.put("actual_check_out", cursor.getString(cursor.getColumnIndex(LocalDB.ACTUAL_CHECK_OUT_TIME)));
                    jsonObject.put("amount", cursor.getString(cursor.getColumnIndex(LocalDB.TOTAL)));
                    jsonObject.put("actual_amount", cursor.getString(cursor.getColumnIndex(LocalDB.ACTUAL_TOTAL)));
                    jsonObject.put("status", cursor.getString(cursor.getColumnIndex(LocalDB.STATUS)));
                    jsonObject.put("is_postpaid", cursor.getString(cursor.getColumnIndex(LocalDB.IS_POSTPAID)));

                    jsonArray.put(jsonObject);
                }
                while (cursor.moveToNext());
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }

            txtLoading.setVisibility(View.INVISIBLE);
            linearLayout.setVisibility(View.VISIBLE);
            jsonArrayResult = jsonArray;
            settingList(jsonArray);
        }
        else
        {
            linearLayout.setVisibility(View.INVISIBLE);
            txtLoading.setVisibility(View.VISIBLE);
            txtLoading.setText(com.getString(R.string.strOffline_NoVehicles));
            com.showAlertDialogOK(com.getString(R.string.strOffline_NoVehicles));
        }
        cursor.close();
        db.close();
    }

	public void settingList(JSONArray jsonArray)
	{
		try
		{
            linearLayout.removeAllViews();
			for(int i=0; i<jsonArray.length(); i++)
			{
				final JSONObject jsonObject = jsonArray.getJSONObject(i);

				String id = jsonObject.getString("id");
                String vehicleNo = jsonObject.getString("vehicle_no");
                int vehicleType = jsonObject.getInt("vehicle_type");
                String checkInDate = jsonObject.getString("date");
                String checkInTime = jsonObject.getString("check_in");
                String checkOutTime = jsonObject.getString("check_out");
                final String actualCheckOutDateTime = jsonObject.getString("actual_check_out");
                final String parkingCharge = jsonObject.getString("amount");
                final String actualCharge = jsonObject.getString("actual_amount");
				String status = jsonObject.getString("status");

				View view = LayoutInflater.from(context).inflate(R.layout.offline_booking_history_custom, null);
                final TextView txtVehicleNo = (TextView) view.findViewById(R.id.txt_OfflineBookingHistory_VehicleNo);
                TextView txtCheckIn = (TextView) view.findViewById(R.id.txt_OfflineBookingHistory_InDateTime);
                TextView txtCheckOut = (TextView) view.findViewById(R.id.txt_OfflineBookingHistory_OutDateTime);
                TextView txtActualCheckOut = (TextView) view.findViewById(R.id.txt_OfflineBookingHistory_ActualOutDateTime);
                TextView txtParkingCharges = (TextView) view.findViewById(R.id.txt_OfflineBookingHistory_Price);
                TextView txtActualCharges = (TextView) view.findViewById(R.id.txt_OfflineBookingHistory_ActualPrice);
				TextView txtStatus = (TextView) view.findViewById(R.id.txt_OfflineBookingHistory_Status);
				TextView txtVehicleCheckout = (TextView) view.findViewById(R.id.txt_OfflineBookingHistory_Checkout);

                if(vehicleType == 2)
                {
                    vehicleNo = vehicleNo +" (2 Wheeler)";
                }
                else
                {
                    vehicleNo = vehicleNo +" (4 Wheeler)";
                }
                txtVehicleNo.setText(com.getString(R.string.strBookingHis_VehicleNo)+" "+vehicleNo);
                txtCheckIn.setText(com.getString(R.string.strBookingHis_CheckIn) + " " + checkInDate +" "+checkInTime);
                txtCheckOut.setText(com.getString(R.string.strBookingHis_CheckOut) + " " + checkInDate +" "+checkOutTime);
                if (actualCheckOutDateTime.isEmpty()) {
                    txtActualCheckOut.setVisibility(View.GONE);
                } else {
                    txtActualCheckOut.setText(com.getString(R.string.strBookingHis_ActualCheckOut) + " "
                            + actualCheckOutDateTime);
                }
                txtParkingCharges.setText(com.getString(R.string.strBooking_Price) + " " + parkingCharge);
                if(Double.valueOf(actualCharge)>0) {
                    txtActualCharges.setText(com.getString(R.string.strBookingHis_ActualPrice) + " " +
                            (Double.valueOf(parkingCharge) + Double.valueOf(actualCharge)));
                }
                else
                {
                    txtActualCharges.setVisibility(View.GONE);
                }
                if(status.equalsIgnoreCase("1"))
                {
                    status = "CHECKED IN";
                    txtVehicleCheckout.setVisibility(View.VISIBLE);
                }
                else if(status.equalsIgnoreCase("2"))
                {
                    status = "CHECKED OUT";
                    txtVehicleCheckout.setVisibility(View.GONE);
                }
                txtStatus.setText(com.getString(R.string.strBookingHis_Status)+" "+status.toUpperCase());

                txtVehicleNo.setTag(id);
                txtVehicleCheckout.setTag(jsonObject.toString());
                txtVehicleCheckout.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(final View view) {
                        final Dialog dialog = com.showAlertDialog_TryAgain("Do you want to checkout?");
                        dialog.findViewById(R.id.txt_CustomAlert_Yes).setOnClickListener(new OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                checkOutProcess(view, txtVehicleNo.getTag().toString());
                                dialog.dismiss();
                            }
                        });
                        dialog.findViewById(R.id.txt_CustomAlert_No).setOnClickListener(new OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                dialog.dismiss();
                            }
                        });
                    }
                });

				linearLayout.addView(view);
			}
            if(jsonArray.length()>0)
            {
                txtLoading.setVisibility(View.INVISIBLE);
                linearLayout.setVisibility(View.VISIBLE);
            }
            else
            {
                linearLayout.setVisibility(View.INVISIBLE);
                txtLoading.setVisibility(View.VISIBLE);
                txtLoading.setText(com.getString(R.string.strOffline_NoVehicles));
            }
		}
		catch (Exception e)
		{
			e.printStackTrace();
            com.Toast_Short("Exception!");
		}
	}

	public void checkOutProcess(View v, String id)
    {
        try {
            String actual_checkout_date_time = "";
            double actual_price = 0;
            db.open();
            Cursor cursor = db.getVehicleDetailsById(id);
            if(cursor != null && cursor.moveToFirst()) {
                try {
                    do {
                        int fixedHrs = cursor.getInt(cursor.getColumnIndex(LocalDB.FIXED_HR));
                        double hrPrice = cursor.getDouble(cursor.getColumnIndex(LocalDB.PRICE_PER_HR));
                        String checkInDate = cursor.getString(cursor.getColumnIndex(LocalDB.CHECK_IN_DATE));
                        String checkInTime = cursor.getString(cursor.getColumnIndex(LocalDB.CHECK_IN_TIME));
                        int hoursBetween = com.findHoursBetweenOffline(checkInDate+" "+checkInTime);
                        if(hoursBetween>fixedHrs)
                        {
                            actual_checkout_date_time = com.getCurrentDate()+" "+com.getCurrentTime();
                            actual_price = (hoursBetween-fixedHrs)*hrPrice;
                        }
                    }
                    while (cursor.moveToNext());
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
            }
            cursor.close();
            db.close();

            JSONObject jsonObject1 = new JSONObject(v.getTag().toString());
            double amt = 0;
            double parkingCharge = jsonObject1.getDouble("amount");

            jsonObject1.put("actual_amount", actual_price);
            jsonObject1.put("actual_check_out", actual_checkout_date_time);

            if (actual_price > 0) {
                if (jsonObject1.getBoolean("is_postpaid")) {
                    amt = actual_price + parkingCharge;
                } else {
                    amt = actual_price;
                }
                extraAmountPopup(amt, jsonObject1);
            }
            else
            {
                com.Toast_Short("Checked out Successfully!");
            }
            db.open();
            db.changeVehicleDetailsWithStatusById(id, actual_checkout_date_time, actual_price+"");
            db.close();
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        fetchingReportList();
    }

    public void extraAmountPopup(Double amt, JSONObject jsonObject)
    {
        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.offline_popup);
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        final TextView txtMsg = (TextView) dialog.findViewById(R.id.txt_Offline_Msg);
        final TextView txtExtraAmount = (TextView) dialog.findViewById(R.id.txt_Offline_Amount);
        final EditText edtVNo = (EditText) dialog.findViewById(R.id.edt_Offline_VNo);
        final TextView txtPrint = (TextView) dialog.findViewById(R.id.txt_Offline_Print);
        final TextView txtSubmit = (TextView) dialog.findViewById(R.id.txt_Offline_Submit);

        txtMsg.setVisibility(View.VISIBLE);
        txtExtraAmount.setVisibility(View.VISIBLE);
        txtPrint.setVisibility(View.VISIBLE);
        edtVNo.setVisibility(View.GONE);

        txtMsg.setText("Checked out Successfully!");
        txtExtraAmount.setText("Extra Amount : "+com.getString(R.string.strCurrency)+". "+amt);
        txtSubmit.setText(com.getString(R.string.strAlert_OK));

        dialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);

        txtPrint.setTag(jsonObject.toString());
        txtPrint.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                printing(v.getTag().toString().trim());
            }
        });

        txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();
                com.Toast_Short("Success!");
            }
        });

        dialog.findViewById(R.id.img_Offline_closeright).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog.dismiss();
            }
        });

        dialog.setCancelable(true);
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();
    }

    public void printing(String json)
    {
        String strParkingTitle = "", strParkingAddress = "", strQRCode = "", strRefNo = "",
                strType = "", strVehicleNo = "", strDate = "", strInTime = "", strOutTime = "";
        double total = 0;
        boolean isPostpaid = false;
        try
        {
            JSONArray jsonArray = new JSONArray(sharedPreference.readOfflineDetailsJson());
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            strParkingTitle = jsonObject.getString("title");
            strParkingAddress = jsonObject.getString("address")+", "+jsonObject.getString("localityName")
                    +", "+jsonObject.getString("cityName")+", "+jsonObject.getString("stateName");
            String strPaymentStatus = jsonObject.getString("parking_payment_mode");
            if(strPaymentStatus.equalsIgnoreCase("postpaid"))
            {
                isPostpaid = true;
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        try
        {
            JSONObject jsonObject = new JSONObject(json);
            strType = jsonObject.getString("vehicle_type");
            strVehicleNo = jsonObject.getString("vehicle_no");
            strDate = jsonObject.getString("date");
            strInTime = jsonObject.getString("check_in");
//            strOutTime = jsonObject.getString("check_out");
            strOutTime = jsonObject.getString("actual_check_out");
            final String parkingCharge = jsonObject.getString("amount");
            final String actualCharge = jsonObject.getString("actual_amount");
            if(jsonObject.getBoolean("is_postpaid"))
            {
                total = Double.valueOf(actualCharge) + Double.valueOf(parkingCharge);
            }
            else
            {
                total = Double.valueOf(actualCharge);
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        final JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("name", strParkingTitle);
            jsonObject.put("address", strParkingAddress);
            jsonObject.put("date", strDate);
            jsonObject.put("from", strInTime);
            jsonObject.put("to", strOutTime);
            jsonObject.put("actual_date_time", strOutTime);
            jsonObject.put("no", strVehicleNo);
            jsonObject.put("type", strType);
            jsonObject.put("price", com.roundOffTo2DecPlaces(total+""));
            jsonObject.put("isPostpaid", isPostpaid);
            jsonObject.put("qr", System.currentTimeMillis());
            jsonObject.put("ref", System.currentTimeMillis());
        }
        catch (JSONException e) {
            com.Toast_Short("Exception!");
            e.printStackTrace();
        }

        if(LandingPage_Activity.printer != null) {
            LandingPage_Activity.printer.print(jsonObject);
        }
    }

    public Bitmap createBitmap(String qrCodeString)
    {
        Bitmap bitmap = null;

        BarcodeFormat barcodeFormat = BarcodeFormat.QR_CODE;

        int width0 = com.getWidth()-20;
        int height0 = com.getWidth()-20;

        int colorBack = 0xFF000000;
        int colorFront = Color.TRANSPARENT;

        QRCodeWriter writer = new QRCodeWriter();
        try {
            Hashtable<EncodeHintType, String> hint = new Hashtable<EncodeHintType, String>();
            hint.put(EncodeHintType.CHARACTER_SET, "ISO-8859-1");

            BitMatrix bitMatrix = writer.encode(qrCodeString ,
                    barcodeFormat, width0, height0, hint);
            int width = bitMatrix.getWidth();
            int height = bitMatrix.getHeight();
            int[] pixels = new int[width * height];
            for (int y = 0; y < height; y++)
            {
                int offset = y * width;
                for (int x = 0; x < width; x++)
                {
                    pixels[offset + x] = bitMatrix.get(x, y) ? colorBack : colorFront;
                }
            }

            bitmap = Bitmap.createBitmap(width, height,
                    Bitmap.Config.ARGB_8888);
            bitmap.setPixels(pixels, 0, width, 0, 0, width, height);

        } catch (WriterException e) {
            e.printStackTrace();
        }

        return bitmap;
    }

    @SuppressLint("NewApi") public void datePicker(final View v)
    {
        Calendar c = Calendar.getInstance();
        // Process to get Current Date
        final int currentYear = c.get(Calendar.YEAR);
        final int currentMonth = c.get(Calendar.MONTH);
        final int currentDay = c.get(Calendar.DAY_OF_MONTH);
        int setYear = currentYear;
        int setMonth = currentMonth;
        int setDay = currentDay;

        if(com.getTextFromView(v).length()>0)
        {
            if(com.getTextFromView(v).contains("-")) {
			    /*DD-MM-YYYY*/
                String[] str = com.getTextFromView(v).split("-");
                setYear = Integer.valueOf(str[2]);
                setMonth = Integer.valueOf(str[1]) - 1;
                setDay = Integer.valueOf(str[0]);
            }
        }

        DatePickerDialog datePickerDialog = new DatePickerDialog(context,
                new DatePickerDialog.OnDateSetListener() {

                    @Override
                    public void onDateSet(DatePicker view, int year,
                                          int monthOfYear, int dayOfMonth)
                    {
//                        if(year>=(currentYear) /*&& monthOfYear<mMonth && dayOfMonth<mDay*/)
                        {
                            String strYEAR = String.valueOf(year);

//							Adding 0, If Date in Single Digit
                            String strDATE = "";
                            if (dayOfMonth < 10)
                                strDATE = "0" + dayOfMonth;
                            else
                                strDATE = String.valueOf(dayOfMonth);

//							Adding 0, If Month in Single Digit
                            String strMONTH = "";
                            int month = monthOfYear + 1;
                            if (month < 10)
                                strMONTH = "0" + month;
                            else
                                strMONTH = String.valueOf(month);

                            /*Keeping below to find out theTimeDropDown*/
                            String date = String.valueOf(strDATE)+"-"+String.valueOf(strMONTH)+"-"+strYEAR;
                            if(v == txtFrom)
                            {
                                if(com.isOKtoSetDate(com.getTextFromView(txtTo), date))
                                {
                                    /*This is for Sending to Server*/
                                    v.setTag(date);
                                    // Display Selected date in TextView
                                    /*DD-MM-YYYY*/
                                    ((TextView)v).setText(String.valueOf(strDATE)+"-"+String.valueOf(strMONTH)+"-"+strYEAR);

                                    fetchingReportList();
                                }
                                else
                                {
                                    System.out.println("Invalid Date!");
                                    com.Toast_Short(com.getString(R.string.strLogin_Invalid_Date));
                                }
                            }
                            else
                            {
                                if(com.isOKtoSetDate(date, com.getTextFromView(txtFrom)))
                                {
                                    /*This is for Sending to Server*/
                                    v.setTag(date);
                                    // Display Selected date in TextView
                                    /*DD-MM-YYYY*/
                                    ((TextView)v).setText(String.valueOf(strDATE)+"-"+String.valueOf(strMONTH)+"-"+strYEAR);

                                    fetchingReportList();
                                }
                                else
                                {
                                    System.out.println("Invalid Date!");
                                    com.Toast_Short(com.getString(R.string.strLogin_Invalid_Date));
                                }
                            }
                        }
//                        else
//                        {
//                            System.out.println("Invalid Date!");
//                            com.Toast_Short(com.getString(R.string.strLogin_Invalid_Date));
//                            onClick(v);
//                        }
                    }
                }, setYear, setMonth, setDay);
        datePickerDialog.show();
        datePickerDialog.getDatePicker()
                .setMaxDate(com.getMilliSecondsFromDate(currentDay+1+"/"+(currentMonth+1)+"/"+(currentYear)));
        datePickerDialog.getDatePicker()
                .setMinDate(com.getMilliSecondsFromDate(currentDay-6+"/"+(currentMonth+1)+"/"+(currentYear)));
    }

	@Override
	public void onBackPressed() {
		// TODO BACK ACTION
		com.backtoPreviousActivity(true);
	}
}
