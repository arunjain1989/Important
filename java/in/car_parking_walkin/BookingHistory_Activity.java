package in.car_parking_walkin;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.location.Location;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.Window;
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
import java.util.Timer;
import java.util.TimerTask;

import utils.asynctask.Async_Task_Get;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_Http_Functions;
import utils.common_functions.Common_SharedPreference;
import utils.common_functions.Common_Strings;

public class BookingHistory_Activity extends Activity
{
	Context context = this;
	Common_Functions com;
	Common_SharedPreference sharedPreference;

	TextView txtLoading, txtFrom, txtTo;
	LinearLayout linearLayout;

    JSONArray jsonArrayResult = new JSONArray();

	public void onCreate(Bundle bundle)
	{
		super.onCreate(bundle);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.booking_history_activity);

		com = new Common_Functions(context);
		sharedPreference = new Common_SharedPreference(context);

		ImageView imgBack = (ImageView) findViewById(R.id.imgHeaderLeftBack);
        ImageView imgRight = (ImageView) findViewById(R.id.imgHeaderRight);
        ImageView imgClose = (ImageView) findViewById(R.id.imgHeaderClose);
        ImageView imgSearch = (ImageView) findViewById(R.id.imgHeaderSearch);
        final RelativeLayout relativeLayoutSearch = (RelativeLayout) findViewById(R.id.relativeLayoutHeaderSearch);
        final EditText edtVehicleNo = (EditText) findViewById(R.id.edt_BookingHis_Search);

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

        findViewById(R.id.txt_BookingHis_Submit).setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                edtVehicleNo.setText("");
                relativeLayoutSearch.setVisibility(View.GONE);

                httpGetList();
            }
        });

        linearLayout = (LinearLayout) findViewById(R.id.linearLayout_BookingHis_List);
        txtLoading = (TextView) findViewById(R.id.txt_BookingHis_Loading);
        txtFrom = (TextView) findViewById(R.id.txt_BookingHis_From);
        txtTo = (TextView) findViewById(R.id.txt_BookingHis_To);

        txtFrom.setText(com.getCurrentDate());
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

        httpGetList();
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

    public void httpGetList()
    {
        String from = com.getTextFromView(txtFrom);
        String to = com.getTextFromView(txtTo);
        if(from.isEmpty() && to.isEmpty())
        {
            txtLoading.setText(com.getString(R.string.strOffline_NoVehicles));
            com.Toast_Short("Please select valid dates!");
            return;
        }
        Async_Task_Get asyncTaskGet = new Async_Task_Get(context, Common_Strings.manual, false);
        asyncTaskGet.execute(new Common_Http_Functions(context).report(com, sharedPreference.readParkingId(), from, to));
        asyncTaskGet.setGetDataDownloadListener(new Async_Task_Get.GetDataDownloadListener() {
            @Override
            public void dataDownloadedSuccessfully(String response) {
                // TODO REPORT RESPONSE
                System.out.println("REPORT - JSON RESPONSE : "+response);
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
                        txtLoading.setVisibility(View.INVISIBLE);
                        linearLayout.setVisibility(View.VISIBLE);
                        jsonArrayResult = json.getJSONArray("data");
                        settingList(json.getJSONArray("data"));
                    }
                    else
                    {
                        linearLayout.setVisibility(View.INVISIBLE);
                        txtLoading.setVisibility(View.VISIBLE);
                        txtLoading.setText(com.getString(R.string.strOffline_NoVehicles));
                        if(msg.length()>0)
                        {
                            com.showAlertDialogOK(msg);
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                    com.Toast_Short("Exception!");
                }
            }
        });
    }

	public void settingList(JSONArray jsonArray)
	{
		try
		{
            linearLayout.removeAllViews();
			for(int i=0; i<jsonArray.length(); i++)
			{
				JSONObject jsonObject = jsonArray.getJSONObject(i);

				String id = jsonObject.getString("id");
                String vehicleNo = jsonObject.getString("vehicle_no");
                int vehicleType = jsonObject.getInt("vehicle_type");
                String checkInDateTime = jsonObject.getString("check_in");
                String checkOutDateTime = jsonObject.getString("check_out");
                String actualCheckOutDateTime = jsonObject.getString("actual_check_out");
                String parkingCharge = jsonObject.getString("amount");
                String actualCharge = jsonObject.getString("actual_amount");
				String status = jsonObject.getString("status");
				String qrCode = jsonObject.getString("qr_code");

				View view = LayoutInflater.from(context).inflate(R.layout.booking_history_custom, null);
                TextView txtVehicleNo = (TextView) view.findViewById(R.id.txt_BookingHistory_VehicleNo);
                TextView txtCheckIn = (TextView) view.findViewById(R.id.txt_BookingHistory_InDateTime);
                TextView txtCheckOut = (TextView) view.findViewById(R.id.txt_BookingHistory_OutDateTime);
                TextView txtActualCheckOut = (TextView) view.findViewById(R.id.txt_BookingHistory_ActualOutDateTime);
                TextView txtParkingCharges = (TextView) view.findViewById(R.id.txt_BookingHistory_Price);
                TextView txtActualCharges = (TextView) view.findViewById(R.id.txt_BookingHistory_ActualPrice);
				TextView txtStatus = (TextView) view.findViewById(R.id.txt_BookingHistory_Status);
				TextView txtRefNo = (TextView) view.findViewById(R.id.txt_BookingHistory_RefNo);

                txtRefNo.setTag(qrCode);
                if(vehicleType == 2)
                {
                    vehicleNo = vehicleNo +" (2 Wheeler)";
                }
                else
                {
                    vehicleNo = vehicleNo +" (4 Wheeler)";
                }
                txtVehicleNo.setText(com.getString(R.string.strBookingHis_VehicleNo)+" "+vehicleNo);
                txtCheckIn.setText(com.getString(R.string.strBookingHis_CheckIn)+" "+checkInDateTime);
                txtCheckOut.setText(com.getString(R.string.strBookingHis_CheckOut)+" "+checkOutDateTime);
                if(actualCheckOutDateTime.contains("0000"))
                {
                    txtActualCheckOut.setVisibility(View.GONE);
                }
                else
                {
                    txtActualCheckOut.setText(com.getString(R.string.strBookingHis_ActualCheckOut)+" "+actualCheckOutDateTime);
                }
                txtParkingCharges.setText(com.getString(R.string.strBooking_Price)+" "+parkingCharge);
                if(Double.valueOf(actualCharge)>0) {
                    txtActualCharges.setText(com.getString(R.string.strBookingHis_ActualPrice) + " " + actualCharge);
                }
                else
                {
                    txtActualCharges.setVisibility(View.GONE);
                }
                if(status.equalsIgnoreCase("1"))
                {
                    status = "CHECKED IN";
                }
                else if(status.equalsIgnoreCase("2"))
                {
                    status = "CHECKED OUT";
                }
                txtStatus.setText(com.getString(R.string.strBookingHis_Status)+" "+status.toUpperCase());
                txtRefNo.setText(com.getString(R.string.strBookingHis_RefNo)+" "+qrCode.toUpperCase());

                txtRefNo.setOnLongClickListener(new View.OnLongClickListener() {
                    @Override
                    public boolean onLongClick(View v) {
                        ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                        ClipData clip = ClipData.newPlainText(com.getString(R.string.strBookingHis_RefNo),
                                v.getTag().toString().trim());
                        clipboard.setPrimaryClip(clip);
                        com.Toast_Short("Copied!");
                        return false;
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
//        datePickerDialog.getDatePicker()
//                .setMinDate(com.getMilliSecondsFromDate(currentDay+"/"+(currentMonth+1)+"/"+(currentYear)));
    }

	@Override
	public void onBackPressed() {
		// TODO BACK ACTION
		com.backtoPreviousActivity(true);
	}
}
