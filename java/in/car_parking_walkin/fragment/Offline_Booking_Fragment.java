package in.car_parking_walkin.fragment;


import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.app.TimePickerDialog;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.TimePicker;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Hashtable;
import java.util.TimeZone;
import java.util.Timer;
import java.util.TimerTask;

import in.car_parking_walkin.LandingPage_Activity;
import in.car_parking_walkin.R;
import utils.asynctask.Async_Task_Get;
import utils.common_classes.CustomTimePickerDialog;
import utils.common_classes.Spinner_Adapter;
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
public class Offline_Booking_Fragment extends Fragment implements View.OnClickListener {
	Context context;
	static FragmentManager fragmentManager;
	Common_Functions com;
	Common_SharedPreference sharedPreference;
	Offline_Booking_Fragment thisFragment;

	View view;

	Bundle bundle;

    TextView txtTitle, txtAddress, txtPrice, txtFixedPrice, txtTotalSpace, txtBookedSpace, txtAvailableSpace,
            txtDate, txtTimeIn, txtTimeOut, txtTotal, txtBook;
    EditText edtVehicleNo;
    Spinner spinnerCheckInTime, spinnerCheckOutTime;
    RadioButton radioButton2Wheeler, radioButton4Wheeler;
    CheckBox checkBoxPostPaid;

    int currentHour = 0, currentMinute = 0;

    double pricePerHrBike = 0, pricePerHrCar = 0, fixedChargeBike = 0, fixedChargeCar = 0;
    int totalSpaceBike = 0, totalSpaceCar = 0, bookedSpaceBike = 0, bookedSpaceCar = 0,
            availableSpaceBike = 0, availableSpaceCar = 0, fixedHrsBike = 1, fixedHrsCar = 1;
    String strParkingTitle = "", strParkingAddress = "", strPaymentStatus = "";

    double pricePerHr = 0, fixedCharge = 0, total = 0;
    int fixedHrs = 1, duration = 0;
    String strType = "", strVehicleNo = "", strDate = "", strInTime = "", strOutTime = "";
    boolean isPostpaid = false;

	public Offline_Booking_Fragment()
	{}
    
    @Override
	public void onActivityCreated(Bundle bundle)
    {
    	super.onActivityCreated(bundle);
    }

    @Override
	public View onCreateView(LayoutInflater LayoutInflater, ViewGroup container, Bundle bun)
    {
        LandingPage_Activity.Loading.dismiss();

		if(view ==  null) {
            view = LayoutInflater.inflate(R.layout.booking_fragment, container, false);

            context = getActivity();
            fragmentManager = getActivity().getSupportFragmentManager();
            com = new Common_Functions(context);
            sharedPreference = new Common_SharedPreference(context);
            thisFragment = this;

            getActivity().findViewById(R.id.imgHeaderLeftBack).setVisibility(View.VISIBLE);
            getActivity().findViewById(R.id.imgHeaderLeft).setVisibility(View.INVISIBLE);
            getActivity().findViewById(R.id.imgHeaderRight).setVisibility(View.INVISIBLE);

            bundle = getArguments();

            txtTitle = (TextView) view.findViewById(R.id.txt_Booking_Title);
            txtAddress = (TextView) view.findViewById(R.id.txt_Booking_Address);
            txtPrice = (TextView) view.findViewById(R.id.txt_Booking_Price);
            txtFixedPrice = (TextView) view.findViewById(R.id.txt_Booking_FixedPrice);
            txtTotalSpace = (TextView) view.findViewById(R.id.txt_Booking_TotalSpace);
            txtBookedSpace = (TextView) view.findViewById(R.id.txt_Booking_BookedSpace);
            txtAvailableSpace = (TextView) view.findViewById(R.id.txt_Booking_AvailabeSpace);
            txtDate = (TextView) view.findViewById(R.id.txt_Booking_date);
            txtTimeIn = (TextView) view.findViewById(R.id.txt_Booking_InTime);
            txtTimeOut = (TextView) view.findViewById(R.id.txt_Booking_OutTime);
            txtTotal = (TextView) view.findViewById(R.id.txt_Booking_Total);
            txtBook = (TextView) view.findViewById(R.id.txt_Booking);
            edtVehicleNo = (EditText) view.findViewById(R.id.edt_Booking_VehicleNo);
            spinnerCheckInTime = (Spinner) view.findViewById(R.id.spinner_Booking_InTime);
            spinnerCheckOutTime = (Spinner) view.findViewById(R.id.spinner_Booking_OutTime);
            radioButton2Wheeler = (RadioButton) view.findViewById(R.id.radioButton_Booking_2Wheeler);
            radioButton4Wheeler = (RadioButton) view.findViewById(R.id.radioButton_Booking_4Wheeler);
            checkBoxPostPaid = (CheckBox) view.findViewById(R.id.checkBox_Booking_Postpaid);

            com.setFontMediumNormal(radioButton2Wheeler, com.getString(R.color.black));
            com.setFontMediumNormal(radioButton4Wheeler, com.getString(R.color.black));
            com.setFontMediumBold(checkBoxPostPaid, com.getString(R.color.black));

            checkBoxPostPaid.setEnabled(false);

            txtTotalSpace.setVisibility(View.GONE);
            txtBookedSpace.setVisibility(View.GONE);
            txtAvailableSpace.setVisibility(View.GONE);

            txtTimeIn.setTag(com.getCurrentTime24());
            txtTimeIn.setText(com.getCurrentTime());

            txtBook.setOnClickListener(this);

            radioButton2Wheeler.setTag("2");
            radioButton4Wheeler.setTag("4");

            radioButton2Wheeler.setChecked(true);
            radioButton4Wheeler.setChecked(false);
            strType = radioButton2Wheeler.getTag().toString().trim();

            radioButton2Wheeler.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    radioButton2Wheeler.setChecked(true);
                    radioButton4Wheeler.setChecked(false);
                    strType = radioButton2Wheeler.getTag().toString().trim();

                    settingValues();
                }
            });
            radioButton4Wheeler.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    radioButton2Wheeler.setChecked(false);
                    radioButton4Wheeler.setChecked(true);
                    strType = radioButton4Wheeler.getTag().toString().trim();

                    settingValues();
                }
            });

            gettingValues();
        }
    	
    	return view;
    }

    @Override
    public void onClick(View v) {
        //TODO CLICK ACTIONS
        if(v == txtDate)
        {
            datePicker(v);
        }
        else if(v == txtTimeIn)
        {
            timePicker(v, false);
        }
        else if(v == txtTimeOut)
        {
            if(com.getTextFromView(txtTimeIn).length()>0)
            {
                timePicker(v, true);
            }
            else
            {
                com.showAlertDialogOK(com.getString(R.string.strBooking_Empty_InTime));
            }
        }
        else if(v == txtBook)
        {
            strVehicleNo = com.getTextFromView(edtVehicleNo);
            strDate = com.getTextFromView(txtDate);
            strInTime = com.getTextFromView(txtTimeIn);
            strOutTime = com.getTextFromView(txtTimeOut);
            if(!strType.isEmpty() && !strVehicleNo.isEmpty() && !strDate.isEmpty() && !strInTime.isEmpty() &&
                    !strOutTime.isEmpty())
            {
                if(strVehicleNo.length()>=4)
                {
                    bookingProcess();
                }
                else
                {
                    com.showAlertDialogOK(com.getString(R.string.strBooking_Invalid_no));
                }
            }
            else if(strType.isEmpty())
            {
                com.showAlertDialogOK(com.getString(R.string.strBooking_Empty_type));
            }
            else if(strVehicleNo.isEmpty())
            {
                com.showAlertDialogOK(com.getString(R.string.strBooking_Empty_no));
            }
            else if(strDate.isEmpty())
            {
                com.showAlertDialogOK(com.getString(R.string.strBooking_Empty_Date));
            }
            else if(strInTime.isEmpty())
            {
                com.showAlertDialogOK(com.getString(R.string.strBooking_Empty_InTime));
            }
            else if(strOutTime.isEmpty())
            {
                com.showAlertDialogOK(com.getString(R.string.strBooking_Empty_OutTime));
            }
            else
            {
                com.showAlertDialogOK(com.getString(R.string.strLogin_EnterAll));
            }
        }
    }

    public void gettingValues()
    {
        try
        {
            JSONArray jsonArray = new JSONArray(sharedPreference.readOfflineDetailsJson());
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            strParkingTitle = jsonObject.getString("title");
            strParkingAddress = jsonObject.getString("address")+", "+jsonObject.getString("localityName")
                    +", "+jsonObject.getString("cityName")+", "+jsonObject.getString("stateName");
            strPaymentStatus = jsonObject.getString("parking_payment_mode");
            /*Bike Config Details*/
            String priceBike = jsonObject.getString("bike_price");
            String fixedPriceBike = jsonObject.getString("bike_fix_price");
            pricePerHrBike = Float.valueOf(priceBike);
            fixedChargeBike = Float.valueOf(fixedPriceBike);
            fixedHrsBike = jsonObject.getInt("bike_fix_hours");
            totalSpaceBike = jsonObject.getInt("2_wheel_parking_slot");
            bookedSpaceBike = jsonObject.getInt("booked_slot_2_wheel");
            availableSpaceBike = jsonObject.getInt("bike_availabe_space");
            /*Car Config Details*/
            String priceCar = jsonObject.getString("car_price");
            String fixedPriceCar = jsonObject.getString("car_fix_price");
            pricePerHrCar = Float.valueOf(priceCar);
            fixedChargeCar = Float.valueOf(fixedPriceCar);
            fixedHrsCar = jsonObject.getInt("car_fix_hours");
            totalSpaceCar = jsonObject.getInt("4_wheel_parking_slot");
            bookedSpaceCar = jsonObject.getInt("booked_slot_4_wheel");
            availableSpaceCar = jsonObject.getInt("car_availabe_space");

            settingValues();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public void settingValues()
    {
        try
        {
            txtTitle.setText(strParkingTitle);
            txtAddress.setText(strParkingAddress);
            if(strType.equalsIgnoreCase("2"))
            {
                pricePerHr = pricePerHrBike;
                fixedCharge = fixedChargeBike;
                fixedHrs = fixedHrsBike;

                txtTotalSpace.setText(com.getString(R.string.strBooking_TotalSpace)+" "+totalSpaceBike);
                txtBookedSpace.setText(com.getString(R.string.strBooking_BookedSpace)+" "+bookedSpaceBike);
                txtAvailableSpace.setText(com.getString(R.string.strBooking_AvailableSpace)+" "+availableSpaceBike);
            }
            else
            {
                pricePerHr = pricePerHrCar;
                fixedCharge = fixedChargeCar;
                fixedHrs = fixedHrsCar;

                txtTotalSpace.setText(com.getString(R.string.strBooking_TotalSpace)+" "+totalSpaceCar);
                txtBookedSpace.setText(com.getString(R.string.strBooking_BookedSpace)+" "+bookedSpaceCar);
                txtAvailableSpace.setText(com.getString(R.string.strBooking_AvailableSpace)+" "+availableSpaceCar);
            }
            txtPrice.setText(com.getString(R.string.strBooking_Price)+" "+pricePerHr+" (per hour)");
            txtFixedPrice.setText(com.getString(R.string.strBooking_FixedPrice)+" "+fixedCharge+" ("+fixedHrs+" hours)");

            txtDate.setText(com.getCurrentDate());

            Date date = new Date();
            date.setTime(System.currentTimeMillis()+(fixedHrs*60*60*1000));

            SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a");
            TimeZone timeZone = TimeZone.getTimeZone("Asia/Kolkata");
            sdf.setTimeZone(timeZone);
            String currentTime = sdf.format(date);

            txtTimeOut.setText(currentTime);

            makingTimeInterval(0, 24, 30, spinnerCheckInTime);

            spinnerCheckInTime.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id)
                {
                    try
                    {
                        String strHR = spinnerCheckInTime.getSelectedItem().toString().split(":")[0];
                        int selectedHR = Integer.valueOf(strHR);
                        if(spinnerCheckInTime.getSelectedItem().toString().contains("PM"))
                        {
                            if(selectedHR<12)
                            {
                                selectedHR = selectedHR + 12;
                            }
                        }

                        makingTimeInterval(selectedHR, 24, 30, spinnerCheckOutTime);
                    }
                    catch (Exception e)
                    {
                        e.printStackTrace();
                    }
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {

                }
            });

            if(strPaymentStatus.equalsIgnoreCase("prepaid"))
            {
                checkBoxPostPaid.setText("Pre paid");
                isPostpaid = false;
            }
            else
            {
                isPostpaid = true;
            }
            checkBoxPostPaid.setChecked(true);

            amountCalculation();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public void amountCalculation()
    {
        total = 0;
        if(txtTimeIn.getTag()!=null)
        {
            strInTime = txtTimeIn.getTag().toString().trim();
        }
        if(txtTimeOut.getTag()!=null)
        {
            strOutTime = txtTimeOut.getTag().toString().trim();
        }
        int hrs = com.findHoursBetween(strInTime, strOutTime);
        duration = hrs;
        if(hrs == 0 || hrs<=fixedHrs)
        {
            total += fixedCharge;
        }
        else
        {
            total += fixedCharge;
            int remainingHrs = hrs - fixedHrs;
            double subTotal = remainingHrs*pricePerHr;
            total += subTotal;
        }

        txtTotal.setText(com.getString(R.string.strBooking_Total)+" "+com.getString(R.string.strCurrency)+" "+
                com.roundOffTo2DecPlaces(total+""));
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

                            /*Keeping below to find out theTimeDropDOwn*/
                            String date = String.valueOf(strDATE)+"-"+String.valueOf(strMONTH)+"-"+strYEAR;
                            /*This is for Sending to Server*/
                            txtDate.setTag(date);
                            // Display Selected date in TextView
                            /*DD/MM/YYYY*/
                            txtDate.setText(String.valueOf(strDATE)+"-"+String.valueOf(strMONTH)+"-"+strYEAR);

                            txtTimeIn.setTag("");
                            txtTimeOut.setTag("");
                            txtTimeIn.setText("");
                            txtTimeOut.setText("");

                            amountCalculation();
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
//        datePickerDialog.getDatePicker()
//                .setMaxDate(com.getMilliSecondsFromDate(currentDay+"/"+(currentMonth+2)+"/"+(currentYear)));
        datePickerDialog.getDatePicker()
                .setMinDate(com.getMilliSecondsFromDate(currentDay+"/"+(currentMonth+1)+"/"+(currentYear)));
    }

    public void timePicker(final View v, boolean isOutTime)
    {
        Calendar mCurrentTime = Calendar.getInstance();

        int setYear = mCurrentTime.get(Calendar.YEAR);
        int setMonth = mCurrentTime.get(Calendar.MONTH);
        int setDay = mCurrentTime.get(Calendar.DAY_OF_MONTH);

        String selectedDate = com.getTextFromView(txtDate);
        if(selectedDate.length()>0 && !selectedDate.equalsIgnoreCase(com.getCurrentDate()))
        {
            if(selectedDate.contains("-")) {
			    /*DD-MM-YYYY*/
                String[] str = selectedDate.split("-");
                setYear = Integer.valueOf(str[2]);
                setMonth = Integer.valueOf(str[1]) - 1;
                setDay = Integer.valueOf(str[0]);

                mCurrentTime.set(setYear, setMonth, setDay, 0, 0);
            }
        }
        if(isOutTime)
        {
            String[] str = txtTimeIn.getTag().toString().trim().split(":");
            int hour = Integer.valueOf(str[0]);
            int minute = Integer.valueOf(str[1]);

            mCurrentTime.set(setYear, setMonth, setDay, hour, minute);
            if((hour==23) && minute>30)
            {
                minute = 60 - minute - 1;

                mCurrentTime.setTimeInMillis(mCurrentTime.getTimeInMillis()+(minute*60*1000));
            }
            else
            {
                mCurrentTime.setTimeInMillis(mCurrentTime.getTimeInMillis()+fixedHrs*60*60*1000);
            }
        }
        currentHour = mCurrentTime.get(Calendar.HOUR_OF_DAY);
        currentMinute = mCurrentTime.get(Calendar.MINUTE);
        int hour = mCurrentTime.get(Calendar.HOUR_OF_DAY);
        int minute = mCurrentTime.get(Calendar.MINUTE);

        if(v.getTag().toString().trim().length()>0)
        {
			/*HH:MM*/
            String[] str = v.getTag().toString().trim().split(":");
            hour = Integer.valueOf(str[0]);
            minute = Integer.valueOf(str[1]);
            if((hour<currentHour) || (hour==currentHour && minute<currentMinute))
            {
                hour = currentHour;
                minute = currentMinute;
            }
        }

        CustomTimePickerDialog mTimePicker = new CustomTimePickerDialog(context, new TimePickerDialog.OnTimeSetListener() {
            @Override
            public void onTimeSet(TimePicker timePicker, int selectedHour, int selectedMinute) {
                timeValidation1(v, selectedHour, selectedMinute);
            }
        }, hour, minute, false);//Yes 24 hour time

        mTimePicker.setTitle("Select Time");
        mTimePicker.show();
    }

    public void timeValidation1(View v, int selectedHour, int selectedMinute)
    {
        if ((selectedHour > currentHour) || (selectedHour == currentHour && selectedMinute >= currentMinute)) {
            v.setTag(selectedHour + ":" + selectedMinute);
            if (selectedHour < 12) {
                settingTimeInText(v, selectedHour, selectedMinute, "AM");
            } else {
                if (selectedHour > 12) {
                    selectedHour = selectedHour - 12;
                }
                settingTimeInText(v, selectedHour, selectedMinute, "PM");
            }
            amountCalculation();
        } else {
            com.Toast_Short(com.getString(R.string.strBooking_Valid_Time));
            onClick(v);
        }
    }

    public void settingTimeInText(View v, int selectedHour, int selectedMinute, String AM_PM)
    {
        String strHR = selectedHour+"";
        String strMIN = selectedMinute+"";

        if(selectedHour<10)
        {
            strHR = "0"+selectedHour;
        }
        if(selectedMinute<10)
        {
            strMIN = "0"+selectedMinute;
        }
        ((TextView)v).setText(strHR + ":" + strMIN+" "+AM_PM);
    }

    public void makingTimeInterval(int startTime, int endTime, int timeInterval, Spinner spinner)
    {
        ArrayList<String> arrayList = new ArrayList<>();

        if(endTime<=startTime)
        {
            endTime = 24 + endTime;
        }
        int timeDiff = endTime - startTime;
        int timesArrayLength = (timeDiff*60)/timeInterval;
        int startTimeInMins = startTime * 60;
        int endTimeInMins = endTime * 60;

        arrayList.add(startTime+":00");
        for(int i=1; i<=timesArrayLength-1; i++)
        {
            int time = startTimeInMins + (i*timeInterval);
            int hr  = time/60;
            int min = time%60;

            if(hr<22 || (hr==22 && min == 00)) {
                String strHR = "", strMIN = "";
                if (hr >= 24) {
                    hr = hr - 24;
                }
                if (hr < 10) {
                    strHR = "0" + hr;
                } else {
                    strHR = "" + hr;
                }
                if (min == 0) {
                    strMIN = "00";
                } else {
                    strMIN = "" + min;
                }
                arrayList.add(strHR + ":" + strMIN);
            }
        }

        spinner.setAdapter(new Spinner_Adapter(context, arrayList.toArray(new String[arrayList.size()])));
    }

    public void bookingProcess()
    {
        LocalDB db = new LocalDB(context);
        db.open();
        long qrCode = db.insertVehicleDetails(strVehicleNo, strType, fixedCharge+"", fixedHrs+"", pricePerHr+"",
                strDate, strInTime, strOutTime, total+"", isPostpaid+"");
        db.close();

        bookingPopup("Booked Successfully!", qrCode+"", qrCode+"");
    }

    public void bookingPopup(String msg, String QRCode, String refNo)
    {
        final JSONObject jsonObject = new JSONObject();
        try
        {
            jsonObject.put("name", strParkingTitle);
            jsonObject.put("address", strParkingAddress);
            jsonObject.put("date", strDate);
            jsonObject.put("from", strInTime);
            jsonObject.put("to", strOutTime);
            jsonObject.put("no", strVehicleNo);
            jsonObject.put("type", strType);
            if(isPostpaid)
            {
                jsonObject.put("price", 0);
            }
            else {
                jsonObject.put("price", com.roundOffTo2DecPlaces(total + ""));
            }
            jsonObject.put("isPostpaid", isPostpaid);
            jsonObject.put("fixedPrice", fixedCharge);
            jsonObject.put("fixedHrs", fixedHrs);
            jsonObject.put("qr", QRCode);
            jsonObject.put("ref", refNo);
        }
        catch (JSONException e) {
            com.Toast_Short("Exception!");
            e.printStackTrace();
        }

        final Dialog dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.booking_popup);
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        final TextView txtHeading = (TextView) dialog.findViewById(R.id.txt_BookingPopup_Heading);
        final TextView txtMsg = (TextView) dialog.findViewById(R.id.txt_BookingPopup_Msg);
        final TextView txtRefNo = (TextView) dialog.findViewById(R.id.txt_BookingPopup_RefNo);
        final TextView txtPrint = (TextView) dialog.findViewById(R.id.txt_BookingPopup_Print);
        final ImageView imgBarCode = (ImageView) dialog.findViewById(R.id.img_BookingPopup_BarCode);

        txtHeading.setText(com.getString(R.string.offLine)+" "+com.getString(R.string.strOffline_CheckIn));
        txtMsg.setText(msg);
        txtRefNo.setText(refNo);

        imgBarCode.setImageBitmap(createBitmap(QRCode));

        txtPrint.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                print(jsonObject, imgBarCode);
            }
        });

        dialog.findViewById(R.id.img_BookingPopup_closeright).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog.dismiss();
                LandingPage_Activity.changing_Fragment(fragmentManager, new Offline_Fragment());
            }
        });

        dialog.setCancelable(false);
        dialog.setCanceledOnTouchOutside(false);
        dialog.show();

        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                ((Activity)context).runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        print(jsonObject, imgBarCode);
                    }
                });
            }
        }, 100);
    }

    void print(JSONObject jsonObject, ImageView imageView)
    {
        if(LandingPage_Activity.printer != null) {
            LandingPage_Activity.printer.print(jsonObject);
        }
    }

    /*This is for create QR/BAR Code from string*/
    public Bitmap createBitmap(String qrCodeString)
    {
        Bitmap bitmap = null;

        BarcodeFormat barcodeFormat = BarcodeFormat.CODE_128;

        int width0 = 500;
        int height0 = 100;

        int colorBack = 0xFF000000;
        int colorFront = Color.TRANSPARENT;

        Code128Writer writer = new Code128Writer();
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
}
