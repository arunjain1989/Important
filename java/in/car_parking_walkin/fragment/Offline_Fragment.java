package in.car_parking_walkin.fragment;


import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.widget.CardView;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import in.car_parking_walkin.BookingHistory_Activity;
import in.car_parking_walkin.LandingPage_Activity;
import in.car_parking_walkin.OfflineBookingHistory_Activity;
import in.car_parking_walkin.R;
import utils.asynctask.Async_Task_Get;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_Http_Functions;
import utils.common_functions.Common_SharedPreference;
import utils.common_functions.Common_Strings;
import utils.db_functions.LocalDB;
import utils.printer.AEM_Printer;

/**
 * 
 * @author VENGAT
 *
 */
public class Offline_Fragment extends Fragment
{
	Context context;
	static FragmentManager fragmentManager;
	Common_Functions com;
	Common_SharedPreference sharedPreference;
    LocalDB db;
	Offline_Fragment thisFragment;

	View view;
    
    CardView cardView;
    LinearLayout linearLayoutCheckInOut;
    EditText edtActivationKey;

	public Offline_Fragment()
	{}
    
    @Override
	public void onActivityCreated(Bundle bundle)
    {
    	super.onActivityCreated(bundle);
    }
    @Override
	public View onCreateView(LayoutInflater LayoutInflater, ViewGroup container, Bundle bundle)
    {
    	view = LayoutInflater.inflate(R.layout.offline_fragment, container, false);
    	
    	context = getActivity();
    	fragmentManager = getActivity().getSupportFragmentManager();
    	com = new Common_Functions(context);
		sharedPreference = new Common_SharedPreference(context);
        db = new LocalDB(context);
    	thisFragment = this;

        LandingPage_Activity.Loading.dismiss();

		ImageView imgBack = (ImageView) getActivity().findViewById(R.id.imgHeaderLeftBack);
		ImageView imgLogout = (ImageView) getActivity().findViewById(R.id.imgHeaderLeft);
		ImageView imgRight = (ImageView) getActivity().findViewById(R.id.imgHeaderRight);
		imgBack.setVisibility(View.INVISIBLE);
		imgLogout.setVisibility(View.INVISIBLE);
		imgRight.setVisibility(View.INVISIBLE);

        cardView = (CardView) view.findViewById(R.id.cardView_Offline);
        linearLayoutCheckInOut = (LinearLayout) view.findViewById(R.id.linearLayout_Offline_CheckInOut);
        edtActivationKey = (EditText) view.findViewById(R.id.edt_Offline_Key);

        edtActivationKey.requestFocus();
        
        if(sharedPreference.readOfflineDetailsJson().length()==0)
        {
            cardView.setVisibility(View.VISIBLE);
            linearLayoutCheckInOut.setVisibility(View.INVISIBLE);
        }
        else
        {
            try {
                JSONArray jsonArray = new JSONArray(sharedPreference.readOfflineDetailsJson());
                JSONObject jsonObject = jsonArray.getJSONObject(0);
                String expDate = jsonObject.getString("expiry_date");
                if(com.isOfflineExpired(expDate))
                {
                    sharedPreference.writeOfflineDetailsJson("");
                    cardView.setVisibility(View.VISIBLE);
                    linearLayoutCheckInOut.setVisibility(View.INVISIBLE);
                }
                else {
                    cardView.setVisibility(View.GONE);
                    linearLayoutCheckInOut.setVisibility(View.VISIBLE);
                }
            }
            catch (Exception e)
            {
                e.printStackTrace();
                cardView.setVisibility(View.GONE);
                linearLayoutCheckInOut.setVisibility(View.VISIBLE);
            }
            try
            {
                db.open();
                Cursor cursor = db.getAllVehicleDetails();
                if(cursor.getCount()>0)
                {
                    long deletedRowsCount = db.deleteVehicleByDate(com.get7DaysBeforeDate());
                    System.out.println("Deleted Rows Count : "+deletedRowsCount);
                }
                cursor.close();
                db.close();
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }

        view.findViewById(R.id.txt_Offline_CheckIn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LandingPage_Activity.changing_Fragment(fragmentManager, new Offline_Booking_Fragment());
            }
        });

        view.findViewById(R.id.txt_Offline_CheckOut).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                vehicleNoPopup();
            }
        });

        view.findViewById(R.id.txt_Offline_Report).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    com.exportDataBase("AppLocalDB");
                } catch (IOException e) {
                    e.printStackTrace();
                }
                com.gotoNextActivity(new Intent(context, OfflineBookingHistory_Activity.class), false);
            }
        });

        edtActivationKey.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                String strKey = com.getTextFromView(edtActivationKey);
                if(!strKey.isEmpty())
                {
                    httpActivation(strKey);
                }
                else
                {
                    com.showAlertDialogOK(com.getString(R.string.strOffline_EmptyKey));
                }
                return false;
            }
        });
        view.findViewById(R.id.txt_Offline_Submit).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String strKey = com.getTextFromView(edtActivationKey);
                if(!strKey.isEmpty())
                {
                    httpActivation(strKey);
                }
                else
                {
                    com.showAlertDialogOK(com.getString(R.string.strOffline_EmptyKey));
                }
            }
        });

    	return view;
    }

    public void httpActivation(String key)
    {
        Async_Task_Get asyncTaskGet = new Async_Task_Get(context, Common_Strings.manual, false);
        asyncTaskGet.execute(new Common_Http_Functions(context).offlineActivation(com, sharedPreference.readParkingId(), key));
        asyncTaskGet.setGetDataDownloadListener(new Async_Task_Get.GetDataDownloadListener() {
            @Override
            public void dataDownloadedSuccessfully(String response) {
                // TODO OFFLINE_ACTIVATION RESPONSE
                System.out.println("OFFLINE_ACTIVATION - JSON : "+response);
                try
                {
//                    JSONObject json = new JSONObject(com.ReadFromfile("offline_json.txt"));
                    JSONObject json = new JSONObject(response);
                    String msg = "";
                    if(json.has("msg"))
                    {
                        msg = json.getString("msg");
                    }
                    if(json.getBoolean("result"))
                    {
                        edtActivationKey.setText("");
                        if(msg.length()>0)
                        {
                            com.Toast_Short(msg);
                        }
                        cardView.setVisibility(View.GONE);
                        linearLayoutCheckInOut.setVisibility(View.VISIBLE);
                        sharedPreference.writeOfflineDetailsJson(json.getJSONObject("data")
                                .getJSONArray("park_details").toString());
                    }
                    else
                    {
                        if(msg.length()>0)
                        {
                            com.showAlertDialogOK(msg);
                        }
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public void vehicleNoPopup()
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

        txtMsg.setVisibility(View.GONE);
        txtExtraAmount.setVisibility(View.GONE);
        txtPrint.setVisibility(View.GONE);
        edtVNo.setVisibility(View.VISIBLE);

        edtVNo.requestFocus();

        dialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);

        edtVNo.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                numberSearch(edtVNo, txtMsg, txtExtraAmount, txtPrint, txtSubmit, dialog);
                return false;
            }
        });

        txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(com.getTextFromView(txtSubmit).equalsIgnoreCase(com.getString(R.string.strAlert_OK)))
                {
                    dialog.dismiss();
                    com.Toast_Short("Success!");
                }
                else {
                    numberSearch(edtVNo, txtMsg, txtExtraAmount, txtPrint, txtSubmit, dialog);
                }
            }
        });

        txtPrint.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                printing(v.getTag().toString().trim());
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

    public void numberSearch(EditText edtVno, final TextView txtMsg, final TextView txtExtraAmount,
                             final TextView txtPrint, final TextView txtSubmit, final Dialog dialogVehicleNo)
    {
        String no = com.getTextFromView(edtVno);
        if(no.length()>0) {
            com.HidingSoftKeyBoard(edtVno);
            db.open();
            Cursor cursor = db.getVehicleDetailsByNo(no);
            if(cursor != null && cursor.moveToFirst()) {
                JSONArray jsonArray = new JSONArray();
                try {
                    do {
                        int fixedHrs = cursor.getInt(cursor.getColumnIndex(LocalDB.FIXED_HR));
                        double hrPrice = cursor.getDouble(cursor.getColumnIndex(LocalDB.PRICE_PER_HR));
                        String checkInDate = cursor.getString(cursor.getColumnIndex(LocalDB.CHECK_IN_DATE));
                        String checkInTime = cursor.getString(cursor.getColumnIndex(LocalDB.CHECK_IN_TIME));
                        int hoursBetween = com.findHoursBetweenOffline(checkInDate+" "+checkInTime);
                        String actual_checkout_date_time = "";
                        double actual_price = 0;
                        if(hoursBetween>fixedHrs)
                        {
                            actual_checkout_date_time = com.getCurrentDate()+" "+com.getCurrentTime();
                            actual_price = (hoursBetween-fixedHrs)*hrPrice;
                        }

                        JSONObject jsonObject = new JSONObject();
                        jsonObject.put("id", cursor.getInt(cursor.getColumnIndex("id")));
                        jsonObject.put("vehicle_no", cursor.getString(cursor.getColumnIndex(LocalDB.VEHICLE_NO)));
                        jsonObject.put("vehicle_type", cursor.getString(cursor.getColumnIndex(LocalDB.VEHICLE_TYPE)));
                        jsonObject.put("date", checkInDate);
                        jsonObject.put("check_in", checkInTime);
                        jsonObject.put("check_out", cursor.getString(cursor.getColumnIndex(LocalDB.CHECK_OUT_TIME)));
                        jsonObject.put("actual_check_out", actual_checkout_date_time);
                        jsonObject.put("amount", cursor.getString(cursor.getColumnIndex(LocalDB.TOTAL)));
                        jsonObject.put("actual_amount", actual_price);
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

                vehicleListPopup(no, jsonArray, edtVno, txtMsg, txtExtraAmount, txtPrint, txtSubmit, dialogVehicleNo);
            }
            else
            {
                com.showAlertDialogOK(com.getString(R.string.strOffline_NoVehicles));
            }
            cursor.close();
            db.close();
        }
        else
        {
            com.showAlertDialogOK(com.getString(R.string.strOffline_EmptyVno));
        }
    }

    public void vehicleListPopup(String vehicleNoHeading, JSONArray jsonArray, final EditText edtVNo,
                                 final TextView txtMsg, final TextView txtExtraAmount, final TextView txtPrint,
                                 final TextView txtSubmit, final Dialog dialogVehicleNo)
    {
        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.offline_vehicles_popup);
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        final TextView txtHeading = (TextView) dialog.findViewById(R.id.txt_OfflineVehicles_Heading);
        final LinearLayout linearLayoutList = (LinearLayout) dialog.findViewById(R.id.linearLayout_OfflineVehicles);

        txtHeading.setText(vehicleNoHeading);

        try {
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);

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

                final View view = LayoutInflater.from(context).inflate(R.layout.offline_vehicles_custom, null);
                final TextView txtVehicleNo = (TextView) view.findViewById(R.id.txt_OfflineVehicles_VehicleNo);
                TextView txtCheckIn = (TextView) view.findViewById(R.id.txt_OfflineVehicles_InDateTime);
                TextView txtCheckOut = (TextView) view.findViewById(R.id.txt_OfflineVehicles_OutDateTime);
                TextView txtActualCheckOut = (TextView) view.findViewById(R.id.txt_OfflineVehicles_ActualOutDateTime);
                TextView txtParkingCharges = (TextView) view.findViewById(R.id.txt_OfflineVehicles_Price);
                TextView txtActualCharges = (TextView) view.findViewById(R.id.txt_OfflineVehicles_ActualPrice);
                TextView txtStatus = (TextView) view.findViewById(R.id.txt_OfflineVehicles_Status);
                TextView txtVehicleCheckout = (TextView) view.findViewById(R.id.txt_OfflineVehicles_Checkout);

                if (vehicleType == 2) {
                    vehicleNo = vehicleNo + " (2 Wheeler)";
                } else {
                    vehicleNo = vehicleNo + " (4 Wheeler)";
                }
                txtVehicleNo.setText(com.getString(R.string.strBookingHis_VehicleNo) + " " + vehicleNo);
                txtCheckIn.setText(com.getString(R.string.strBookingHis_CheckIn) + " " + checkInDate +" "+checkInTime);
                txtCheckOut.setText(com.getString(R.string.strBookingHis_CheckOut) + " " + checkInDate +" "+checkOutTime);
                if (actualCheckOutDateTime.isEmpty()) {
                    txtActualCheckOut.setVisibility(View.GONE);
                } else {
                    txtActualCheckOut.setText(com.getString(R.string.strBookingHis_ActualCheckOut) + " "
                            + actualCheckOutDateTime);
                }
                txtParkingCharges.setText(com.getString(R.string.strBooking_Price) + " " + parkingCharge);
                if (Double.valueOf(actualCharge) > 0) {
                    txtActualCharges.setText(com.getString(R.string.strBookingHis_ActualPrice) + " " +
                            (Double.valueOf(actualCharge)+Double.valueOf(parkingCharge)));
                } else {
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
                    public void onClick(View v) {
                        try {
                            JSONObject jsonObject1 = new JSONObject(v.getTag().toString());
                            double amt = 0;
                            double parkingCharge = jsonObject1.getDouble("amount");
                            double actualCharge = jsonObject1.getDouble("actual_amount");

                            if (actualCharge > 0)
                            {
                                if (jsonObject1.getBoolean("is_postpaid")) {
                                    amt = actualCharge + parkingCharge;
                                } else {
                                    amt = actualCharge;
                                }

                                edtVNo.setVisibility(View.GONE);
                                txtMsg.setVisibility(View.VISIBLE);
                                txtExtraAmount.setVisibility(View.VISIBLE);
                                txtPrint.setVisibility(View.VISIBLE);

                                txtMsg.setText("Checked out Successfully!");
                                txtExtraAmount.setText("Extra Amount : " + com.getString(R.string.strCurrency) + ". " + amt);
                                txtSubmit.setText(com.getString(R.string.strAlert_OK));
                                txtPrint.setTag(jsonObject1.toString());

                            } else {
                                dialogVehicleNo.dismiss();
                                com.Toast_Short("Checked out Successfully!");
                            }
                            db.open();
                            db.changeVehicleDetailsWithStatusById(txtVehicleNo.getTag().toString(),
                                    jsonObject1.getString("actual_check_out"), actualCharge+"");
                            db.close();
                            dialog.dismiss();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                });

                linearLayoutList.addView(view);
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        dialog.findViewById(R.id.img_OfflineVehicles_closeright).setOnClickListener(new View.OnClickListener() {
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
}
