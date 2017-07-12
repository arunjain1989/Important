package in.car_parking_walkin.fragment;


import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

import in.car_parking_walkin.BookingHistory_Activity;
import in.car_parking_walkin.LandingPage_Activity;
import in.car_parking_walkin.QRScanner_Activity;
import in.car_parking_walkin.R;
import utils.asynctask.Async_Task_Get;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_Http_Functions;
import utils.common_functions.Common_SharedPreference;
import utils.common_functions.Common_Strings;
import utils.printer.AEM_Printer;

/**
 * 
 * @author VENGAT
 *
 */
public class Home_Fragment extends Fragment
{
	Context context;
	static FragmentManager fragmentManager;
	Common_Functions com;
	Common_SharedPreference sharedPreference;
	Home_Fragment thisFragment;

	View view;

	public Home_Fragment()
	{}
    
    @Override
	public void onActivityCreated(Bundle bundle)
    {
    	super.onActivityCreated(bundle);
    }
    @Override
	public View onCreateView(LayoutInflater LayoutInflater, ViewGroup container, Bundle bundle)
    {
    	view = LayoutInflater.inflate(R.layout.home_fragment, container, false);
    	
    	context = getActivity();
    	fragmentManager = getActivity().getSupportFragmentManager();
    	com = new Common_Functions(context);
		sharedPreference = new Common_SharedPreference(context);
    	thisFragment = this;

        LandingPage_Activity.Loading.dismiss();

		ImageView imgBack = (ImageView) getActivity().findViewById(R.id.imgHeaderLeftBack);
		ImageView imgLogout = (ImageView) getActivity().findViewById(R.id.imgHeaderLeft);
		ImageView imgRight = (ImageView) getActivity().findViewById(R.id.imgHeaderRight);
		imgBack.setVisibility(View.GONE);
		imgLogout.setVisibility(View.VISIBLE);
		imgRight.setVisibility(View.VISIBLE);

        view.findViewById(R.id.txt_landing_CheckIn_WalkIn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LandingPage_Activity.changing_Fragment(fragmentManager, new Booking_Fragment());
            }
        });

        view.findViewById(R.id.txt_landing_CheckIn_Online).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, QRScanner_Activity.class);
                intent.putExtra("type", "online_checkin");
                com.gotoNextActivity(intent, false);
            }
        });

        view.findViewById(R.id.txt_landing_CheckOutScan).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(context, QRScanner_Activity.class);
                com.gotoNextActivity(intent, false);
            }
        });

        view.findViewById(R.id.txt_landing_CheckOutManual).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                popup("WALK IN CHECKOUT");
            }
        });

        view.findViewById(R.id.txt_landing_Report).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                com.gotoNextActivity(new Intent(context, BookingHistory_Activity.class), false);
            }
        });

        view.findViewById(R.id.txt_landing_Offline).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LandingPage_Activity.changing_Fragment(fragmentManager, new Offline_Fragment());
            }
        });

        settingSlotsValue();
    	
    	return view;
    }

    public void settingSlotsValue()
    {
        try
        {
            JSONArray jsonArray = new JSONArray(sharedPreference.readParkingDetailsJson());
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            /*Bike Config Details*/
            int availableSpaceBike = jsonObject.getInt("bike_availabe_space");
            /*Car Config Details*/
            int availableSpaceCar = jsonObject.getInt("car_availabe_space");

            ((TextView)view.findViewById(R.id.txt_landing_slots2)).setText(com.getString(R.string.availableSlots2)+" "+availableSpaceBike);
            ((TextView)view.findViewById(R.id.txt_landing_slots4)).setText(com.getString(R.string.availableSlots4)+" "+availableSpaceCar);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public void popup(String title)
    {
        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.checkout_popup);
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        TextView txtHeading = (TextView) dialog.findViewById(R.id.txt_Popup_Heading);
        final TextView txtMsg = (TextView) dialog.findViewById(R.id.txt_Popup_Msg);
        final TextView txtExtraAmount = (TextView) dialog.findViewById(R.id.txt_Popup_Amount);
        final EditText edtCode = (EditText) dialog.findViewById(R.id.edt_Popup_code);
        final TextView txtPrint = (TextView) dialog.findViewById(R.id.txt_Popup_Print);
        final TextView txtSubmit = (TextView) dialog.findViewById(R.id.txt_Popup_Apply);

        txtHeading.setText(title);

        txtMsg.setVisibility(View.GONE);
        txtExtraAmount.setVisibility(View.GONE);
        txtPrint.setVisibility(View.GONE);
        edtCode.setVisibility(View.VISIBLE);

        edtCode.requestFocus();

        dialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);

        txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                com.HidingSoftKeyBoard(v);
                if(com.getTextFromView(txtSubmit).equalsIgnoreCase(com.getString(R.string.strAlert_OK)))
                {
                    dialog.dismiss();
                    com.Toast_Short("Success!");
                }
                else {
                    String strCode = com.getTextFromView(edtCode);
                    if (!strCode.isEmpty()) {
                        httpManualCheckout(strCode, dialog, txtMsg, txtExtraAmount, edtCode, txtPrint, txtSubmit);
                    } else {
                        com.showAlertDialogOK(com.getString(R.string.emptyCode));
                    }
                }
            }
        });

        txtPrint.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                printing(v.getTag().toString().trim());
            }
        });

        dialog.findViewById(R.id.img_Popup_closeright).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog.dismiss();
            }
        });

        dialog.setCancelable(true);
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();
    }

    public void httpManualCheckout(String code, final Dialog dialog,
                                   final TextView txtMsg, final TextView txtExtraAmount,
                                   final EditText edtCode, final TextView txtPrint, final TextView txtSubmit)
    {
        Async_Task_Get asyncTaskGet = new Async_Task_Get(context, Common_Strings.manual, false);
        asyncTaskGet.execute(new Common_Http_Functions(context).walkInCheckoutManual(com, sharedPreference.readParkingId(), code));
        asyncTaskGet.setGetDataDownloadListener(new Async_Task_Get.GetDataDownloadListener() {
            @Override
            public void dataDownloadedSuccessfully(String response) {
                // TODO MANUAL_CHECKOUT_WALK_IN RESPONSE
                System.out.println("MANUAL_CHECKOUT_WALK_IN - JSON : "+response);
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
                        if(msg.length()>0)
                        {
                            com.Toast_Short(msg);
                        }
                        if(json.has("additional_amount") && json.getDouble("additional_amount")>0)
                        {
                            JSONArray jsonArray = new JSONArray(sharedPreference.readParkingDetailsJson());
                            JSONObject jsonObject = jsonArray.getJSONObject(0);
                            String strPaymentStatus = jsonObject.getString("parking_payment_mode");

                            txtMsg.setText(msg);

                            if(strPaymentStatus.equalsIgnoreCase("postpaid"))
                            {
                                txtExtraAmount.setText("Amount : "+com.getString(R.string.strCurrency)+". "+json.optString("additional_amount"));
                            }
                            else {
                                txtExtraAmount.setText("Extra Amount : " + com.getString(R.string.strCurrency) + ". " + json.optString("additional_amount"));
                            }
                            txtSubmit.setText(com.getString(R.string.strAlert_OK));

                            txtMsg.setVisibility(View.VISIBLE);
                            txtExtraAmount.setVisibility(View.VISIBLE);
                            txtPrint.setVisibility(View.VISIBLE);
                            edtCode.setVisibility(View.GONE);
                            txtPrint.setTag(json.toString());
                        }
                        else
                        {
                            dialog.dismiss();
                        }
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

    public void printing(String json)
    {
        String strParkingTitle = "", strParkingAddress = "", strQRCode = "", strRefNo = "",
                strType = "", strVehicleNo = "", strDate = "", strDate2 = "", strInTime = "", strOutTime = "";
        boolean isPostpaid = false;
        double total = 0;
        try
        {
            JSONArray jsonArray = new JSONArray(sharedPreference.readParkingDetailsJson());
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
            strType = jsonObject.getString("vehicle_typ");
            strVehicleNo = jsonObject.getString("vehicle_no");
            String checkIn = jsonObject.getString("check_in");
            String checkOut = jsonObject.getString("check_out");
            total = jsonObject.getDouble("additional_amount");
            strDate = checkIn.split(" ")[0];
            strDate2 = checkOut.split(" ")[0];
            strInTime = com.getTimeFromFullDateTime(checkIn);
            strOutTime = com.getTimeFromFullDateTime(checkOut);
            strRefNo = jsonObject.getString("ref");
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
            jsonObject.put("actual_date_time", strDate2+" "+strOutTime);
            jsonObject.put("no", strVehicleNo);
            jsonObject.put("type", strType);
            jsonObject.put("price", com.roundOffTo2DecPlaces(total+""));
            jsonObject.put("isPostpaid", isPostpaid);
            jsonObject.put("qr", strQRCode);
            jsonObject.put("ref", strRefNo);
        }
        catch (JSONException e) {
            com.Toast_Short("Exception!");
            e.printStackTrace();
        }

        if(LandingPage_Activity.printer != null) {
            LandingPage_Activity.printer.print(jsonObject);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
