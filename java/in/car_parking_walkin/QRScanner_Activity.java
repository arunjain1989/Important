package in.car_parking_walkin;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.hardware.Camera;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.zxing.Result;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

import me.dm7.barcodescanner.zxing.ZXingScannerView;
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
public class QRScanner_Activity extends Activity implements ZXingScannerView.ResultHandler  {
	Context context;
	Common_Functions com;
    Common_SharedPreference sharedPreference;

    Bundle bundle;

    LinearLayout linearLayoutOnlineCheckIn, linearLayoutExtraAmount;
    TextView txtVehicleNo, txtCheckInTime, txtProceed, txtMessage, txtExtraAmount, txtPrint, txtOK;

    String type = "", parkingId = "";

    double extraAmount = 0;

    Dialog scannerDialog;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.qrscanner_activity);
		
		context = this;
        com = new Common_Functions(context);
        sharedPreference = new Common_SharedPreference(context);

        bundle = getIntent().getExtras();
        if(bundle != null && bundle.containsKey("type"))
        {
            type = bundle.getString("type");
        }
        parkingId = sharedPreference.readParkingId();

        findViewById(R.id.imgHeaderLeftBack).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        linearLayoutOnlineCheckIn = (LinearLayout) findViewById(R.id.linearLayout_Scanner_ForOnlineCheckIn);
        linearLayoutExtraAmount = (LinearLayout) findViewById(R.id.linearLayout_Scanner_ForExtraAmount);
        txtVehicleNo = (TextView) findViewById(R.id.txt_Scanner_VehicleNo);
        txtCheckInTime = (TextView) findViewById(R.id.txt_Scanner_CheckInTime);
        txtProceed = (TextView) findViewById(R.id.txt_Scanner_Proceed);
        txtMessage = (TextView) findViewById(R.id.txt_Scanner_Msg);
        txtExtraAmount = (TextView) findViewById(R.id.txt_Scanner_Amount);
        txtPrint = (TextView) findViewById(R.id.txt_Scanner_Print);
        txtOK = (TextView) findViewById(R.id.txt_Scanner_Ok);

        linearLayoutOnlineCheckIn.setVisibility(View.GONE);
        linearLayoutExtraAmount.setVisibility(View.GONE);

        txtProceed.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try
                {
                    String scannedCode = v.getTag().toString().trim();
                    httpProcess(new Common_Http_Functions(context).onlineCheckInScan(com, parkingId, scannedCode));}
                catch(Exception e)
                {
                    com.Toast_Short("Exception!");
                    e.printStackTrace();
                }
            }
        });
        txtOK.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                com.Toast_Short("Success!");
                com.backtoPreviousActivity(true);
            }
        });

        txtPrint.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                printing(v.getTag().toString().trim());
            }
        });

        openScanner();
        /*Scanner View will open automatically*/
//        scannerPopup();

        findViewById(R.id.txt_Scanner_Open).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openScanner();
//                scannerPopup();
            }
        });
	}

    public void openScanner()
    {
        if (checkZxing()) {
            Intent intent = new Intent(
                    "com.google.zxing.client.android.SCAN");
//            intent.putExtra("SCAN_MODE", "QR_CODE_MODE");
            startActivityForResult(intent, 0);
        } else {
            Toast.makeText(context, "ZXing Library is not available",
                    Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri
                    .parse("market://details?id=com.google.zxing.client.android"));
            startActivity(intent);
        }
    }

    public boolean checkZxing() {
        Intent intent1 = new Intent("com.google.zxing.client.android.SCAN");
        List<ResolveInfo> list = context.getPackageManager()
                .queryIntentActivities(intent1,
                        PackageManager.MATCH_DEFAULT_ONLY);
        if (list.size() > 0)
            return true;
        else
            return false;
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        try
        {
            if (requestCode == 0) {
                if (resultCode == RESULT_OK) {
                    String result = intent.getStringExtra("SCAN_RESULT");
                    String format = intent.getStringExtra("SCAN_RESULT_FORMAT");
                    System.out.println("CONTENT :" + result + ", FORMAT :"
                            + format);

                    if (result.isEmpty() || result == null) {
                        com.backtoPreviousActivity(true);
                        return;
                    }
                    else
                    {
//                        com.Toast_Short(result);
                        System.out.print("SCANNED_RESULT : "+result);
                        if(type.equalsIgnoreCase("online_checkin"))
                        {
                            if(result.startsWith("online_"))
                            {
                                try {
                                    String[] strs = result.split("_");
                                    String bookingId = strs[1];
                                    String vehicleNo = strs[3];
                                    String checkInTime = strs[4];
                                    txtVehicleNo.setText(vehicleNo);
                                    txtCheckInTime.setText(checkInTime);
                                    linearLayoutOnlineCheckIn.setVisibility(View.VISIBLE);
                                    txtProceed.setTag(bookingId);
                                }
                                catch (Exception e)
                                {
                                    e.printStackTrace();
                                    com.Toast_Short(com.getString(R.string.invalidQR));
                                    com.backtoPreviousActivity(true);
                                }
                            }
                            else
                            {
                                com.Toast_Short(com.getString(R.string.invalidQR));
                                com.backtoPreviousActivity(true);
                            }
                        }
                        else
                        {
                            if(result.startsWith("walkin_"))
                            {
                                String[] strs = result.split("_");
                                httpProcess(new Common_Http_Functions(context).walkInCheckoutScan(com, parkingId, strs[1]));
                            }
                            else if(result.startsWith("online_"))
                            {
                                String[] strs = result.split("_");
                                httpProcess(new Common_Http_Functions(context).onlineCheckOutScan(com, parkingId, strs[1]));
                            }
                            else if(result.length()==10)
                            {
                                httpProcess(new Common_Http_Functions(context).walkInCheckoutManual(com, parkingId, result));
                            }
                            else
                            {
                                com.Toast_Short(com.getString(R.string.invalidQR));
                                com.backtoPreviousActivity(true);
                            }
                        }
                    }
                }
            }
        }
        catch(Exception e)
        {
            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);

            // set title
            alertDialogBuilder.setTitle("Scanner Mis Matching!");

            // set dialog message
            alertDialogBuilder
                    .setMessage("Please Download Barcode Scanner. If You Want to Download Please Click Yes Otherwise No")
                    .setPositiveButton("Yes",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int id) {
                                    dialog.dismiss();
                                    Intent intent = new Intent(Intent.ACTION_VIEW);
                                    intent.setData(Uri
                                            .parse("market://details?id=com.google.zxing.client.android"));
                                    startActivity(intent);
                                    dialog.dismiss();
                                }
                            })
                    .setNegativeButton("No", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            // smsSendingThread(destination, sms_text);
                            dialog.dismiss();
                        }
                    });
            // create alert dialog
            AlertDialog alertDialog = alertDialogBuilder.create();
            // show it
            alertDialog.show();
        }
    }

    protected void scannerResultProcess(String result) {

        if (result.isEmpty() || result == null) {
            com.backtoPreviousActivity(true);
            return;
        }
        else
        {
            com.Toast_Short(result);
            System.out.print("SCANNED_RESULT : "+result);
            if(type.equalsIgnoreCase("online_checkin"))
            {
                if(result.startsWith("online_"))
                {
                    try {
                        String[] strs = result.split("_");
                        String bookingId = strs[1];
                        String vehicleNo = strs[3];
                        String checkInTime = strs[4];
                        txtVehicleNo.setText(vehicleNo);
                        txtCheckInTime.setText(checkInTime);
                        linearLayoutOnlineCheckIn.setVisibility(View.VISIBLE);
                        txtProceed.setTag(bookingId);
                    }
                    catch (Exception e)
                    {
                        e.printStackTrace();
                        com.Toast_Short(com.getString(R.string.invalidQR));
                        com.backtoPreviousActivity(true);
                    }
                }
                else
                {
                    com.Toast_Short(com.getString(R.string.invalidQR));
                    com.backtoPreviousActivity(true);
                }
            }
            else
            {
                if(result.startsWith("walkin_"))
                {
                    String[] strs = result.split("_");
                    httpProcess(new Common_Http_Functions(context).walkInCheckoutScan(com, parkingId, strs[1]));
                }
                else if(result.startsWith("online_"))
                {
                    String[] strs = result.split("_");
                    httpProcess(new Common_Http_Functions(context).onlineCheckOutScan(com, parkingId, strs[1]));
                }
                else
                {
                    com.Toast_Short(com.getString(R.string.invalidQR));
                    com.backtoPreviousActivity(true);
                }
            }
        }
    }

    public void httpProcess(String[] urlParams)
    {
        Async_Task_Get asyncTaskGet = new Async_Task_Get(context, Common_Strings.manual, false);
        asyncTaskGet.execute(urlParams);
        asyncTaskGet.setGetDataDownloadListener(new Async_Task_Get.GetDataDownloadListener() {
            @Override
            public void dataDownloadedSuccessfully(String response) {
                // TODO RESPONSE
                System.out.println(type.toUpperCase()+" - JSON RESPONSE : "+response);
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
                        if(json.has("additional_amount") && json.getDouble("additional_amount")>0)
                        {
                            JSONArray jsonArray = new JSONArray(sharedPreference.readParkingDetailsJson());
                            JSONObject jsonObject = jsonArray.getJSONObject(0);
                            String strPaymentStatus = jsonObject.getString("parking_payment_mode");

                            linearLayoutOnlineCheckIn.setVisibility(View.GONE);

                            extraAmount = json.getDouble("additional_amount");

                            txtMessage.setText(msg);

                            if(strPaymentStatus.equalsIgnoreCase("postpaid"))
                            {
                                txtExtraAmount.setText("Amount : " + com.getString(R.string.strCurrency) + ". " + json.optString("additional_amount"));
                            }
                            else {
                                txtExtraAmount.setText("Extra Amount : " + com.getString(R.string.strCurrency) + ". " + json.optString("additional_amount"));
                            }
                            linearLayoutExtraAmount.setVisibility(View.VISIBLE);

                            txtPrint.setTag(json);
                            if(type.equalsIgnoreCase("online_checkin"))
                            {
                                txtPrint.setVisibility(View.GONE);
                            }
                            else
                            {
                                txtPrint.setVisibility(View.VISIBLE);
                            }
                        }
                        else
                        {
                            if(msg.length()>0)
                            {
                                com.Toast_Short(msg);
                            }
                            com.backtoPreviousActivity(true);
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

    public void scannerPopup()
    {
        try
        {
            final ZXingScannerView mScannerView = new ZXingScannerView(this);   // Programmatically initialize the scanner view

            scannerDialog = new Dialog(context);
            scannerDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
            scannerDialog.setContentView(mScannerView);
            scannerDialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
            scannerDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.WHITE));

            mScannerView.setResultHandler(this); // Register ourselves as a handler for scan results.
            mScannerView.startCamera();

            scannerDialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
                @Override
                public void onDismiss(DialogInterface dialog) {
                    mScannerView.stopCamera();
                }
            });
            scannerDialog.setCancelable(true);
            scannerDialog.setCanceledOnTouchOutside(false);
            scannerDialog.show();

//            // Open the default i.e. the first rear facing camera.
//            Camera camera = Camera.open();
//
//            if (camera == null) {
//                Toast.makeText(context, "NO CAMERA!!!", Toast.LENGTH_SHORT).show();
//            } else {
//                // Set the torch flash mode
//                Camera.Parameters param = camera.getParameters();
//                param.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
//                try {
//                    camera.setParameters(param);
//                    camera.startPreview();
//                } catch (Exception e) {
//                    Toast.makeText(context, "NO FLASH!!!", Toast.LENGTH_SHORT)
//                            .show();
//                }
//            }
        }
        catch(Exception e)
        {
            com.Toast_Short("Scanner Exception!");
            e.printStackTrace();
        }
    }

    @Override
    public void handleResult(Result rawResult) {
        Log.e("handler", rawResult.getText()); // Prints scan results
        Log.e("handler", rawResult.getBarcodeFormat().toString()); // Prints the scan format (qrcode)

        scannerDialog.dismiss();
        scannerResultProcess(rawResult.getText());
    }

    @Override
    public void onBackPressed() {
        // TODO BACK BUTTON ACTION
        com.backtoPreviousActivity(true);
    }
}
