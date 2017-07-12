package utils.printer;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.os.AsyncTask;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.aem.api.AEMPrinter;
import com.aem.api.AEMScrybeDevice;
import com.aem.api.IAemScrybe;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;
import com.google.zxing.qrcode.QRCodeWriter;

import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Timer;
import java.util.TimerTask;

import in.car_parking_walkin.LandingPage_Activity;
import in.car_parking_walkin.R;
import in.car_parking_walkin.Splash_Activity;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_SharedPreference;

/**
 * Created by avengat on 4/2/2017.
 */

public class AEM_Printer implements IAemScrybe
{
    Context context;
    Common_Functions com;
    Common_SharedPreference sharedPreference;

    TextView txtPrinterStatus, txtRestart, txtReConnect;
    ProgressBar progressBar;

    JSONObject jsonObjectDetails;

    public AEMScrybeDevice m_AemScrybeDevice;
    AEMPrinter m_AemPrinter = null;

    ArrayList<String> printerList = new ArrayList<String>();

    int glbPrinterWidth = 32;

    public AEM_Printer(Context context, Common_Functions com, Common_SharedPreference sharedPreference,
                       TextView txtPrinterStatus, TextView txtRestart, TextView txtReConnect, ProgressBar progressBar)
    {
        this.context = context;
        this.com = com;
        this.sharedPreference = sharedPreference;
        this.txtPrinterStatus = txtPrinterStatus;
        this.txtRestart = txtRestart;
        this.txtReConnect = txtReConnect;
        this.progressBar = progressBar;

        this.txtRestart.setVisibility(View.INVISIBLE);
        this.txtReConnect.setVisibility(View.INVISIBLE);

        this.m_AemScrybeDevice = new AEMScrybeDevice(this);

        new connectPrinter().execute();
    }

    public class connectPrinter extends AsyncTask<String, Void, String>
    {
        @Override
        protected String doInBackground(String... params) {

            String p = m_AemScrybeDevice.pairPrinter("BTprinter0314");

            printerList = m_AemScrybeDevice.getPairedPrinters();

            if (printerList.size() > 0)
            {
                String printerName = "";
                try
                {
                    printerName = printerList.get(0);
                    m_AemScrybeDevice.connectToPrinter(printerName);
                    m_AemPrinter = m_AemScrybeDevice.getAemPrinter();

                    System.out.println("AEM_Printer : Connected with " + printerName);

                    return "Toast_Printer is Connected with " + printerName;
                }
                catch (IOException e)
                {
                    if (e.getMessage().contains("Service discovery failed"))
                    {
                        return "OK_Not Connected " + printerName +
                                " is unreachable or off otherwise it is connected with other device";
                    }
                    else if (e.getMessage().contains("Device or resource busy"))
                    {
                        return "OK_The device is already connected";
                    }
                    else
                    {
                        try {
                            m_AemScrybeDevice.disConnectPrinter();
                        } catch (IOException e1) {
                            e1.printStackTrace();
                        }
                        return "TRY_Unable to connect the printer. Please Try again or Restart the App.";
                    }
                }
            }
            else
            {
                return "Toast_No Paired Printers found";
            }
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            System.out.println("PRINTER : "+s);
            try {
                if (s.startsWith("TRY")) {
                    txtPrinterStatus.setText(com.getString(R.string.printerNotConnected));
                    txtRestart.setVisibility(View.VISIBLE);
                    txtReConnect.setVisibility(View.VISIBLE);
                    progressBar.setVisibility(View.INVISIBLE);

                    txtReConnect.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            new Timer().schedule(new TimerTask() {
                                @Override
                                public void run() {
                                    ((Activity) context).runOnUiThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            new connectPrinter().execute();
                                            txtPrinterStatus.setText(com.getString(R.string.printerConnecting));
                                            txtRestart.setVisibility(View.INVISIBLE);
                                            txtReConnect.setVisibility(View.INVISIBLE);
                                            progressBar.setVisibility(View.VISIBLE);
                                        }
                                    });
                                }
                            }, 100);
                        }
                    });
                    txtRestart.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            try {
                                Intent intent = new Intent(context, Splash_Activity.class);
                                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
                                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                                com.gotoNextActivity(intent, true);
                            } catch (Exception e) {
                            }
                        }
                    });
                } else if (s.startsWith("OK")) {
                    txtPrinterStatus.setText(s.split("_")[1]);
                    txtRestart.setVisibility(View.INVISIBLE);
                    txtReConnect.setVisibility(View.INVISIBLE);
                    progressBar.setVisibility(View.INVISIBLE);
                } else {
                    txtPrinterStatus.setText(s.split("_")[1]);
                    txtRestart.setVisibility(View.INVISIBLE);
                    txtReConnect.setVisibility(View.INVISIBLE);
                    progressBar.setVisibility(View.INVISIBLE);
                }
                /*if (s.startsWith("TRY")) {
                    final Dialog dialog = com.showAlertDialog_TryAgain(s.split("_")[1]);
                    dialog.findViewById(R.id.linearLayout_CustomAlert_OK).setVisibility(View.VISIBLE);
                    ((TextView) dialog.findViewById(R.id.txt_CustomAlert_Heading)).setText("Printer Connection Error!");
                    ((TextView) dialog.findViewById(R.id.txt_CustomAlert_Yes)).setText("Try Again");
                    ((TextView) dialog.findViewById(R.id.txt_CustomAlert_No)).setText("Restart");
                    ((TextView) dialog.findViewById(R.id.txt_CustomAlert_OK)).setText("Close");
                    dialog.findViewById(R.id.txt_CustomAlert_Yes).setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {

                            new Timer().schedule(new TimerTask() {
                                @Override
                                public void run() {
                                    ((Activity) context).runOnUiThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            new connectPrinter().execute();
                                        }
                                    });
                                }
                            }, 100);
                            dialog.dismiss();
                        }
                    });
                    dialog.findViewById(R.id.txt_CustomAlert_No).setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            try {
                                Intent intent = new Intent(context, Splash_Activity.class);
                                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
                                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                                com.gotoNextActivity(intent, true);
                            } catch (Exception e) {
                            }
                            dialog.dismiss();
                        }
                    });
                    dialog.findViewById(R.id.txt_CustomAlert_OK).setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            dialog.dismiss();
                        }
                    });
                    dialog.setCancelable(true);
                } else if (s.startsWith("OK")) {
                    com.showAlertDialogOK(s.split("_")[1]);
                } else {
                    com.Toast_Short(s.split("_")[1]);
                }*/
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }

    public void connesctPrinter()
    {
        System.out.println("AEM_Printer : Printer not connected");
        com.Toast_Short("Printer not connected");

        String p = m_AemScrybeDevice.pairPrinter("BTprinter0314");

        printerList = m_AemScrybeDevice.getPairedPrinters();

        if (printerList.size() > 0)
        {
            String printerName = "";
            try
            {
                printerName = printerList.get(0);
                m_AemScrybeDevice.connectToPrinter(printerName);
                m_AemPrinter = m_AemScrybeDevice.getAemPrinter();

//                PrintBill();

                System.out.println("AEM_Printer : Connected with " + printerName);
                com.Toast_Short("Connected with " + printerName);
            }
            catch (IOException e)
            {
                if (e.getMessage().contains("Service discovery failed"))
                {
                    com.showAlertDialogOK("Not Connected\n"
                            + printerName
                            + " is unreachable or off otherwise it is connected with other device");
                }
                else if (e.getMessage().contains("Device or resource busy"))
                {
                    com.showAlertDialogOK("the device is already connected");
                }
                else
                {
                    try {
                        m_AemScrybeDevice.disConnectPrinter();
                    } catch (IOException e1) {
                        e1.printStackTrace();
                    }
                    final Dialog dialog = com.showAlertDialog_TryAgain("Unable to connect. Do you want to try again?");
                    dialog.findViewById(R.id.txt_CustomAlert_Yes).setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {

                            new Timer().schedule(new TimerTask() {
                                @Override
                                public void run() {
                                    ((Activity)context).runOnUiThread(new Runnable() {
                                        @Override
                                        public void run() {
//                                            connectPrinter();
                                        }
                                    });
                                }
                            }, 100);
                            dialog.dismiss();
                        }
                    });
                    dialog.findViewById(R.id.txt_CustomAlert_No).setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {

                            dialog.dismiss();
                        }
                    });
                }
                LandingPage_Activity.Loading.dismiss();
            }
        }
        else
        {
            LandingPage_Activity.Loading.dismiss();
            com.showAlertDialogOK("No Paired Printers found");
        }
    }

    public void print(final JSONObject jsonObjectDetails)
    {
        this.jsonObjectDetails = jsonObjectDetails;
        if (m_AemPrinter == null)
        {
            new connectPrinter().execute();
        }
        else
        {
            PrintBill();
        }
    }

    public void PrintBill()
    {
        LandingPage_Activity.Loading.dismiss();
        try
        {
            String parkingName = "", parkingAddress = "", date = "", checkInTime = "", checkOutTime = "",
                        vehicleNo = "", vehicleType = "", price = "", qrCode = "", referenceCode = "",
                        paymentType = "" /*Prepaid or Postpaid*/;
            try
            {
                parkingName = jsonObjectDetails.getString("name");
                parkingAddress = jsonObjectDetails.getString("address");
                date = jsonObjectDetails.getString("date");
                checkInTime = jsonObjectDetails.getString("from");
                checkOutTime = jsonObjectDetails.getString("to");
                vehicleNo = jsonObjectDetails.getString("no");
                vehicleType = jsonObjectDetails.getString("type");
                price = jsonObjectDetails.getString("price");
                if(jsonObjectDetails.has("isPostpaid") && jsonObjectDetails.getBoolean("isPostpaid"))
                {
                    paymentType = "Post paid";
                    if(price.equalsIgnoreCase("0")) {
                        price = jsonObjectDetails.getString("fixedPrice") + " / " + jsonObjectDetails.getString("fixedHrs") + " Hr(s)";
                    }
                }
                else {
                    paymentType = "Pre paid";
                }
                if(jsonObjectDetails.has("actual_date_time"))
                {
                    try {
                        /*If case, It is kind of Re pringting, So need to show the Actual Checkout Date Time*/
                        date = jsonObjectDetails.getString("actual_date_time").split(" ")[0];
                        checkInTime = jsonObjectDetails.getString("actual_date_time").split(" ")[1]
                        +" "+jsonObjectDetails.getString("actual_date_time").split(" ")[2];
                        if(date.split("-")[0].length()==4)
                        {
                            date = date.split("-")[2]+"-"+date.split("-")[1]+"-"+date.split("-")[0];
                        }
                    }catch (Exception e)
                    {
                        com.Toast_Short("Exception!");
                        e.printStackTrace();
                        return;
                    }
                }
                qrCode = jsonObjectDetails.getString("qr");
                referenceCode = jsonObjectDetails.getString("ref");
            }
            catch (Exception e)
            {
                com.Toast_Short("Exception!");
                e.printStackTrace();
                return;
            }

			m_AemPrinter.setFontType(AEMPrinter.FONT_NORMAL);
            m_AemPrinter.setFontType(AEMPrinter.DOUBLE_HEIGHT);
            /*Parking Name*/
            m_AemPrinter.print(centerFormatting(parkingName));
            /*Parking Address*/
            m_AemPrinter.print(centerFormatting(parkingAddress)+"\n");

			m_AemPrinter.setFontType(AEMPrinter.FONT_NORMAL);
            m_AemPrinter.setFontType(AEMPrinter.DOUBLE_HEIGHT);
            /*Vehicle No*/
            if(vehicleType.equalsIgnoreCase("2"))
            {
                m_AemPrinter.print("Bike No.  "+vehicleNo);
            }
            else
            {
                m_AemPrinter.print("Car No.  "+vehicleNo);
            }

            m_AemPrinter.setLineFeed(1);

            m_AemPrinter.setFontType(AEMPrinter.FONT_NORMAL);
            m_AemPrinter.setFontType(AEMPrinter.DOUBLE_HEIGHT);
            /*Date & Check In Time & Check Out Time*/
            m_AemPrinter.print(fullLengthFormatting(date, checkInTime));

            m_AemPrinter.setFontType(AEMPrinter.FONT_002);
            m_AemPrinter.setFontType(AEMPrinter.DOUBLE_HEIGHT);
            /*Price*/
            m_AemPrinter.print(centerFormatting("Rs "+price));

            /*Bar Code create based on QR CODE String*/
            try
            {
//                Bitmap inputBitmap = ((BitmapDrawable)imgBarCode.getDrawable()).getBitmap();
//                Bitmap resizedBitmap = Bitmap.createScaledBitmap(inputBitmap, 350, 50, false);
//                m_AemPrinter.printImage(resizedBitmap, context, AEMPrinter.IMAGE_CENTER_ALIGNMENT);
//                InputStream is = context.getAssets().open("down.png//                Bitmap inputBitmap = BitmapFactory.decodeStream(is);
//                Bitmap resizedBitmap = Bitmap.createScaledBitmap(inputBitmap, 350, 40, false);
//                m_AemPrinter.printImage(resizedBitmap, context,AEMPrinter.IMAGE_CENTER_ALIGNMENT);

//                Bitmap barCodeImage = createBitmap(qrCode);
//                if(barCodeImage != null)
//                {
//                    m_AemPrinter.printImage(barCodeImage, context, AEMPrinter.IMAGE_CENTER_ALIGNMENT);
//                }
//                else
//                {
//                    m_AemPrinter.setLineFeed(1);
//                }
                if(referenceCode.toUpperCase().length()!=0 && referenceCode.toUpperCase().length()<=12) {
                    m_AemPrinter.printBarcode(referenceCode.toUpperCase(), AEMPrinter.BARCODE_TYPE.CODE39,
                            AEMPrinter.BARCODE_HEIGHT.DOUBLEDENSITY_FULLHEIGHT);
                }
//                m_AemPrinter.setLineFeed(1);
            }
            catch (IOException e)
            {
                e.printStackTrace();
                m_AemPrinter.setLineFeed(1);
            }

            /*Payment Type*/
            m_AemPrinter.setFontType(AEMPrinter.TEXT_ALIGNMENT_CENTER);
            m_AemPrinter.setFontType(AEMPrinter.FONT_NORMAL);
            m_AemPrinter.print(centerFormatting(paymentType));

            m_AemPrinter.setFontType(AEMPrinter.TEXT_ALIGNMENT_CENTER);
            m_AemPrinter.setFontType(AEMPrinter.FONT_NORMAL);
//            m_AemPrinter.setFontType(AEMPrinter.DOUBLE_HEIGHT);
//            /*Reference Code*/
//            m_AemPrinter.print(centerFormatting(referenceCode));

            String code = "--------------------------------\n" +
                    "  Parking at owner risk. No responsibility for valuable items like laptop, wallet, cash etc.\n" +
                    "Powered by: Goparking.com\n" +
                    "--------------------------------\n\n";
            m_AemPrinter.print(code);

            m_AemPrinter.setLineFeed(2);

//            m_AemPrinter.setCarriageReturn();
//            m_AemPrinter.setCarriageReturn();
//            m_AemPrinter.setCarriageReturn();
//            m_AemPrinter.setCarriageReturn();
        }
        catch (IOException e)
        {
            if (e.getMessage().contains("socket closed"))
                com.Toast_Short("Printer not connected");
        }
    }

    /*Adding Space based on String length*/
    public String centerFormatting(String string)
    {
        String formattedString = "";
        int totalLength = 32;
        int strLength = string.length();
        if(strLength>totalLength)
        {
            int splitCount = strLength/totalLength;
            if(splitCount == 1)
            {
                String strSplitted1 = string.substring(0, 32);
                String strSplitted2 = string.substring(32);

                formattedString = strSplitted1 + "\n" + centerFormatting(strSplitted2);
            }
            else if(splitCount == 2)
            {
                String strSplitted1 = string.substring(0, 32);
                String strSplitted2 = string.substring(32, 64);
                String strSplitted3 = string.substring(64);

                formattedString = strSplitted1 + "\n" + strSplitted2 + "\n" + centerFormatting(strSplitted3);
            }
            else if(splitCount == 2)
            {
                String strSplitted1 = string.substring(0, 32);
                String strSplitted2 = string.substring(32, 64);
                String strSplitted3 = string.substring(64, 96);
                String strSplitted4 = string.substring(96);

                formattedString = strSplitted1 + "\n" + strSplitted2 + "\n" +
                        strSplitted3 + "\n" + centerFormatting(strSplitted4);
            }
        }
        else
        {
            int remainingLength = totalLength - strLength;
            int requiredEmptySpace = remainingLength/2;
            for(int i=0; i<requiredEmptySpace; i++)
            {
                formattedString += " ";
            }
            formattedString += string;
            for(int i=0; i<requiredEmptySpace; i++)
            {
                formattedString += " ";
            }
        }
        return formattedString;
    }

    /*Adding Space based on String length*/
    public String fullLengthFormatting(String key, String value)
    {
        String formattedString = key;
        int totalLength = 32;
        int strLength = value.length();
        int remainingLength = totalLength - strLength;
        {
            int requiredEmptySpace = remainingLength-formattedString.length();
            for(int i=0; i<requiredEmptySpace; i++)
            {
                formattedString += " ";
            }
            formattedString += value;
        }
        return formattedString;
    }

    @Override
    public void onDiscoveryComplete(ArrayList<String> aemPrinterList) {
        // TODO Auto-generated method stub
        printerList = aemPrinterList;
        for(int i=0;i<aemPrinterList.size();i++)
        {
            String Device_Name=aemPrinterList.get(i);
            String status = m_AemScrybeDevice.pairPrinter(Device_Name);
            System.out.println("AEM_Printer STATUS : "+ status);
        }
    }

    /*This is for create QR/BAR Code from string*/
    public Bitmap createBitmap(String qrCodeString)
    {
        Bitmap bitmap = null;

        BarcodeFormat barcodeFormat = BarcodeFormat.CODE_128;

        int width0 = 400;
        int height0 = 35;

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
