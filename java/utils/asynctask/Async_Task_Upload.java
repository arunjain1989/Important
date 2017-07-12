package utils.asynctask;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Base64;
import android.view.View;
import android.view.View.OnClickListener;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import in.car_parking_walkin.R;
import utils.common_functions.Common_Functions;
import utils.db_functions.Logs_DBAdapter;

/**
 * Background ASYNC Task to Upload file
 */
public class Async_Task_Upload extends AsyncTask<String, String, String> {

    Context context;
    Common_Functions com;

    public static UploadListener uploadListener;
    ProgressDialogEx progressDialog;

    String hittingType;
    boolean silent;
    public static String httpUrl;
    public static String uploadFilePath;

    boolean logs_need = false;
    Logs_DBAdapter logs_DBAdapter;
    long tempStartTime, tempEndTime;

    public Async_Task_Upload(Context context, String hittingType, boolean silent) {
        this.context = context;
        this.hittingType = hittingType;
        this.silent = silent;
        com = new Common_Functions(context);

        if (Common_Async_Utils.dialog_Upload != null) {
            dialog_dismiss(Common_Async_Utils.dialog_Upload);
        }
    }

    public static interface UploadListener {
        void dataDownloadedSuccessfully(String response);
    }

    public void setUploadListener(UploadListener uploadListener) {
        Async_Task_Upload.uploadListener = uploadListener;
    }

    @Override
    protected void onPreExecute() {
        logs_DBAdapter = new Logs_DBAdapter(context);
        tempStartTime = System.currentTimeMillis();

        super.onPreExecute();

        progressDialog = new ProgressDialogEx(context);
        progressDialog.setMessage(com.getString(R.string.strUploading));
        progressDialog.setCancelable(false);
        progressDialog.setCanceledOnTouchOutside(false);
        if (!silent) {
            progressDialog.show();
        }

		/*progressDialog = new ProgressDialogEx(context);
		progressDialog.setCancelable(false);
		progressDialog.setCanceledOnTouchOutside(false);
		progressDialog.setMessage(com.getString(R.string.strUploading));
		progressDialog.setIndeterminate(false);
		progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
		progressDialog.setProgress(0);
		progressDialog.setMax(100);
		// Show progress dialog
		if(!silent)
		{
			progressDialog.show();
		}*/
		
		/*Drawable customDrawable= context.getResources().getDrawable(R.drawable.progressbar_custom_downloding);
		progressDialog.setProgressDrawable(customDrawable);
		progressDialog.show();*/
    }

    @SuppressLint("SdCardPath")
    @Override
    protected String doInBackground(String... urls) {
		/*httpUrl for call the task again when get Exception*/
        httpUrl = urls[0];
        uploadFilePath = urls[1];
        try {
            File sourceFile = new File(uploadFilePath);
            if (sourceFile.isFile()) {
                if (com.isNetworkAvailable()) {
                    if (!isCancelled()) {
                        try {
                            String url = urls[0];
                            System.out.println("HTTP UPLOAD URL : " + url);
                            url = url.replaceAll(" ", "%20").toString();

                            URL obj = new URL(url);
                            HttpURLConnection conn = (HttpURLConnection) obj.openConnection();
                            conn.setDoInput(true); // Allow Inputs
                            conn.setDoOutput(true); // Allow Outputs
                            conn.setUseCaches(false); // Don't use a Cached Copy
                            conn.setRequestMethod("POST");
                            conn.setRequestProperty("Connection", "Keep-Alive");
                            conn.setRequestProperty("ENCTYPE", "multipart/form-data");
                            conn.setRequestProperty("Content-Type",
                                    "multipart/form-data;boundary=*****");
                            conn.setRequestProperty("uploaded_file", uploadFilePath);

                            /***** Adding Property(UserName, Password) *****/
                            String encoded = Base64.encodeToString((
                                    "archerpenny_glide:archer@#62@glide*").getBytes("UTF-8"), Base64.NO_WRAP);
                            conn.setRequestProperty("Authorization", "Basic " + encoded);

                            DataOutputStream dos = new DataOutputStream(conn.getOutputStream());

                            String lineEnd = "\r\n";
                            String twoHyphens = "--";
                            String boundary = "*****";
                            dos.writeBytes(twoHyphens + boundary + lineEnd);
                            dos.writeBytes("Content-Disposition: form-data; name=\"uploaded_file\";filename=\""
                                    + uploadFilePath + "\"" + lineEnd);

                            dos.writeBytes(lineEnd);

                            int bytesRead, bytesAvailable, bufferSize;
                            byte[] buffer;
                            int maxBufferSize = 1 * 1024 * 1024;

                            FileInputStream fileInputStream = new FileInputStream(sourceFile);
                            // create a buffer of maximum size
                            bytesAvailable = fileInputStream.available();

                            bufferSize = Math.min(bytesAvailable, maxBufferSize);
                            buffer = new byte[bufferSize];

                            // read file and write it into form...
                            bytesRead = fileInputStream.read(buffer, 0, bufferSize);

                            while (bytesRead > 0) {
                                dos.write(buffer, 0, bufferSize);
                                bytesAvailable = fileInputStream.available();
                                bufferSize = Math.min(bytesAvailable,
                                        maxBufferSize);
                                bytesRead = fileInputStream.read(buffer, 0,
                                        bufferSize);
                                System.out.println(bytesAvailable + ":::" + bufferSize + ":::" + bytesRead);
                            }

                            dos.writeBytes(lineEnd);
                            dos.writeBytes(twoHyphens + boundary + twoHyphens
                                    + lineEnd);

                            // Responses from the server (code and message)
                            int serverResponseCode = conn.getResponseCode();
                            String serverResponseMessage = conn
                                    .getResponseMessage();

                            System.out.println("HTTP Upload Response is : " + serverResponseMessage + ": "
                                    + serverResponseCode);

                            // close the streams //
                            fileInputStream.close();
                            dos.flush();
                            dos.close();

                            if (serverResponseCode == 200) {
                                BufferedReader in = new BufferedReader(
                                        new InputStreamReader(conn.getInputStream()));
                                String inputLine;
                                StringBuffer response = new StringBuffer();

                                while ((inputLine = in.readLine()) != null) {
                                    response.append(inputLine);
                                }
                                in.close();
                                return response.toString();
                            } else {
                                return "http_failed";
                            }
                        } catch (IOException e) {
                            System.out.println("<-- SERVER SIDE ERROR *OR* URL WRONG -->");
                            e.printStackTrace();
                            return "http_failed";
                        }
                    } else {
                        System.out.println("<-- DOWNLOAD TASK CANCELED -->");
                    }
                    return "http_failed";
                } else {
                    System.out.println("<-- NETWORK NOT AVAILABLE -->");
                    return "http_Network_problem";
                }
            } else {
                System.out.println("<-- FILE NOT AVAILABLE -->");
                return "no_file";
            }
        } catch (Exception e) {
            System.out.println("<-- MAIN EXCEPTION-PROBLEM IN CODE -->");
            e.printStackTrace();
            return "http_failed";
        }
    }

    /**
     * Updating progress bar
     */
    protected void onProgressUpdate(String... progress) {
        // setting progress percentage
        System.out.println(progress[0]);
        progressDialog.setProgress(Integer.parseInt(progress[0]));
    }

    /**
     * After completing background task Dismiss the progress dialog
     **/
    @Override
    protected void onPostExecute(String response) {
        tempEndTime = System.currentTimeMillis();
        long tempTime = tempEndTime - tempStartTime;
        long tempTimeSecs = TimeUnit.SECONDS.convert(tempTime, TimeUnit.MILLISECONDS);
        String strnetworkType = com.getNetworkType(context);
        System.out.println("Network Type : " + strnetworkType);
        System.out.println("Start Time : " + tempStartTime);
        System.out.println("End   Time : " + tempEndTime);
        System.out.println("Diff  Time : " + tempTime);
        System.out.println("Diff  Time Secs : " + tempTimeSecs);

        if (logs_need) {
            logs_DBAdapter.open();
            long temp = logs_DBAdapter.InsertLog(strnetworkType, httpUrl, "", response,
                    tempStartTime + "", tempEndTime + "", tempTime + "", tempTimeSecs + "");
            logs_DBAdapter.close();
            System.out.println("Row Inserted " + temp);
        }

        System.out.println("Server UPLOAD Response : " + response);
        // dismiss the dialog after the file was downloaded
        progressDialog.dismiss();

        if (response != null) {
			/*response = -1 means Server Problem, Showing Content From Server*/
			/*If Response with __ take the error URL from Response*/
			/*Otherwise show default URL*/
            /*if (response.startsWith("-1")) {
                System.out.println("Going to Error Activity");
                Intent in = new Intent(context, Error_Activity.class);
                if (response.contains("__")) {
                    String[] str = response.split("__");
                    in.putExtra("error_url", str[1]);
                } else {
//					in.putExtra("error_url", Common_Http_Fuctions.ErrorMessageUrl());
                }
                com.gotoNextActivity(in, true);
            }
			*//*response = -2 means Server Problem, Showing Content From Local*//*
			*//*If Response with __ take the error content from Response*//*
			*//*Otherwise show default Content*//*
            else if (response.startsWith("-2")) {
                System.out.println("Going to Error Activity");
                Intent in = new Intent(context, Error_Activity.class);
                if (response.contains("__")) {
                    String[] str = response.split("__");
                    in.putExtra("error_content", str[1]);
                } else {
                    in.putExtra("error_content", com.getString(R.string.strErrorMessage));
                }
                com.gotoNextActivity(in, true);
            } else*/ if (response.equalsIgnoreCase("http_failed")) {
                Alert(com.getString(R.string.strAlertMessage_Exception));
            } else if (response.equalsIgnoreCase("http_Network_problem")) {
                Alert(com.getString(R.string.strAlertMessage_NetProbTryAgain));
            } else if (response.equalsIgnoreCase("no_file")) {
                com.showAlertDialogOK((com.getString(R.string.strAlertMessage_NoFile)));
            } else {
                if (com.isValidJSON(response)) {
                    System.out.println("Valid JSON : " + response);
//					String string = com.getString(R.string.strUploadedSuccess);
//					com.Toast_Short(string);
                    uploadListener.dataDownloadedSuccessfully(response);
                } else {
                    Alert(com.getString(R.string.strAlertMessage_Exception));
                }
            }
        } else {
            Alert(com.getString(R.string.strAlertMessage_Exception));
        }
    }

    /*Show Alert Dialog while getting problems*/
    public void Alert(String message) {
        final Dialog dialog = Common_Async_Utils.showAlertDialogTryAgain(context, message);

        dialog.findViewById(R.id.txt_CustomAlert_Yes).setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                new Async_Task_Upload(context, hittingType, silent)
                        .execute(new String[]{httpUrl, uploadFilePath});

                dialog_dismiss(dialog);
            }
        });
        dialog.findViewById(R.id.txt_CustomAlert_No).setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                if (hittingType.equalsIgnoreCase(com.getString(R.string.strHitType_Auto))) {
                    dialog_dismiss(dialog);
                    com.backtoPreviousActivity(true);
                } else {
                    dialog_dismiss(dialog);
                }
            }
        });

        dialog.setCancelable(false);
        dialog.setCanceledOnTouchOutside(false);
        // show it
        dialog.show();

        Common_Async_Utils.dialog_Upload = dialog;
    }

    public void dialog_dismiss(Dialog dialog) {
        try {
            Common_Async_Utils.dialog_Upload = null;
            dialog.dismiss();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}