package utils.asynctask;


import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnCancelListener;
import android.os.AsyncTask;
import android.view.View;
import android.view.View.OnClickListener;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import in.car_parking_walkin.R;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_Strings;
import utils.db_functions.Logs_DBAdapter;

/*Being used for executing the HTTP get requests*/
public class Async_Task_Get extends AsyncTask<String, Void, String> {
    Context context;
    Common_Functions com;
    Async_Task_Get task;

    public static GetDataDownloadListener getDataDownloadListener;
    ProgressDialogEx Loading;

    String hittingType;
    boolean silent;
    public static String httpUrl;

    boolean logs_need = true;
    Logs_DBAdapter logs_DBAdapter;
    long tempStartTime, tempEndTime;

    public Async_Task_Get(Context context, String hittingType, boolean silent) {
        this.context = context;
        this.hittingType = hittingType;
        this.silent = silent;
        task = this;

        com = new Common_Functions(context);

        if (Common_Async_Utils.dialog_Get != null) {
            dialog_dismiss(Common_Async_Utils.dialog_Get);
        }
    }

    public static interface GetDataDownloadListener {
        void dataDownloadedSuccessfully(String response);
    }

    public void setGetDataDownloadListener(GetDataDownloadListener getDataDownloadListener) {
        Async_Task_Get.getDataDownloadListener = getDataDownloadListener;
    }

    protected void onPreExecute() {
        logs_DBAdapter = new Logs_DBAdapter(context);
        tempStartTime = System.currentTimeMillis();

        Loading = new ProgressDialogEx(context);
        Loading.setMessage(com.getString(R.string.strLoading));
        if (silent) {
            Loading.setCancelable(false);
        } else {
            Loading.setCancelable(true);
        }
        Loading.setCancelable(false);
        Loading.setCanceledOnTouchOutside(false);
        Loading.setOnCancelListener(new OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                task.cancel(true);
                System.out.println("<-- GET TASK CANCELED CLICKED -->");
            }
        });
        if (!silent) {
            Loading.show();
        }
    }

    protected String doInBackground(String... urls) {
        /*httpUrl for call the task again when get Exception*/
        httpUrl = urls[0];
        try {
            if (com.isNetworkAvailable()) {
                if (!isCancelled()) {
                    try {
                        String url = urls[0];
                        System.out.println("GET URL : " + url);
                        url = url.replaceAll(" ", "%20");

                        URL obj = new URL(url);
                        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

                        if (Common_Strings.timeout != 0) {
                            /***** By default, operations never time out. *****/
                            con.setReadTimeout(Common_Strings.timeout);
                            con.setConnectTimeout(Common_Strings.timeout);
                        }
                        /***** add request header *****/
						/*Not require to Mention the "GET", By default It is GET Method*/
                        con.setRequestMethod("GET");
                        //					con.setRequestProperty("User-Agent", "front");
                        //					con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

                        int responseCode = con.getResponseCode();
                        System.out.println("Response Code : " + responseCode);

                        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                        String inputLine;
                        StringBuffer response = new StringBuffer();

                        while ((inputLine = in.readLine()) != null) {
                            response.append(inputLine);
                        }
                        in.close();

                        System.out.println(response.toString());

                        return response.toString();
                    } catch (SocketTimeoutException e) {
                        System.out.println("<-- GET TASK GOT TIME OUT -->");
                        e.printStackTrace();
                        return "http_timeout";
                    } catch (IOException e) {
                        System.out.println("<-- SERVER SIDE ERROR *OR* URL WRONG -->");
                        e.printStackTrace();
                        return "http_failed";
                    }
                } else {
                    System.out.println("<-- GET TASK CANCELED -->");
                }
                return "http_failed";
            } else {
                System.out.println("<-- NETWORK NOT AVAILABLE -->");
                return "http_Network_problem";
            }
        } catch (Exception e) {
            System.out.println("<-- MAIN EXCEPTION-PROBLEM IN CODE -->");
            e.printStackTrace();
            return "http_failed";
        }
    }

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

        System.out.println("Server GET Response : " + response);
        if (Loading.isShowing()) {
            try {
                Loading.dismiss();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

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
            } else*/ if (response.equalsIgnoreCase("http_failed") || response.equalsIgnoreCase("http_timeout")) {
                Alert(com.getString(R.string.strAlertMessage_Exception));
            } else if (response.equalsIgnoreCase("http_Network_problem")) {
                Alert(com.getString(R.string.strAlertMessage_NetProbTryAgain));
            } else {
                if (com.isValidJSON(response)) {
                    System.out.println("Valid JSON : " + response);
                    getDataDownloadListener.dataDownloadedSuccessfully(response);
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
                new Async_Task_Get(context, hittingType, silent).execute(httpUrl);

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
        // Show Alert Dialog
        if (!silent) {
            try {
                dialog.show();

                Common_Async_Utils.dialog_Get = dialog;
            } catch (Exception exception) {
                exception.printStackTrace();
            }
        }
    }

    public void dialog_dismiss(Dialog dialog) {
        try {
            Common_Async_Utils.dialog_Get = null;
            dialog.dismiss();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
