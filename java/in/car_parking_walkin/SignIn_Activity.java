package in.car_parking_walkin;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import utils.asynctask.Async_Task_Get;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_Http_Functions;
import utils.common_functions.Common_SharedPreference;
import utils.common_functions.Common_Strings;

/**
 * Login Activity - Login Process with Register & Forgot Password options
 * @author VENGAT
 *
 */
public class SignIn_Activity extends FragmentActivity implements OnClickListener
{
	static Context context;
	static Common_Functions com;
	static Common_SharedPreference sharedPreference;
	static SignIn_Activity activity;

	TextView txtLogin;
	EditText edtUsername, edtPassword;

	String strUsername="", strPassword="";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		setContentView(R.layout.signin_activity);

    	context = this;
    	com = new Common_Functions(context);
    	sharedPreference = new Common_SharedPreference(context);
    	activity = this;

		txtLogin = (TextView) findViewById(R.id.txt_login_Login);
		edtUsername = (EditText) findViewById(R.id.edt_login_Username);
		edtPassword = (EditText) findViewById(R.id.edt_login_Password);

		txtLogin.setOnClickListener(this);
    }

	@Override
	public void onClick(View v) {
		// TODO
		com.HidingSoftKeyBoard(txtLogin);
		if(v == txtLogin)
		{
			strUsername = com.getTextFromView(edtUsername);
			strPassword = com.getTextFromView(edtPassword);
			if(!strUsername.isEmpty() && !strPassword.isEmpty())
			{
                httpLoginProcess();
			}
			else if(strUsername.isEmpty())
			{
				com.showAlertDialogOK(com.getString(R.string.strLogin_Empty_UserName));
			}
			else if(strPassword.isEmpty())
			{
				com.showAlertDialogOK(com.getString(R.string.strLogin_Empty_Password));
			}
			else
			{
				com.showAlertDialogOK(com.getString(R.string.strLogin_EnterAll));
			}
		}
	}

	public void httpLoginProcess()
	{
		Async_Task_Get asyncTaskGet = new Async_Task_Get(context, Common_Strings.manual, false);
		asyncTaskGet.execute(new Common_Http_Functions(context).login(com, strUsername, strPassword));
		asyncTaskGet.setGetDataDownloadListener(new Async_Task_Get.GetDataDownloadListener() {
			@Override
			public void dataDownloadedSuccessfully(String response) {
				// TODO LOGIN RESPONSE
				System.out.println("LOGIN - JSON RESPONSE : "+response);
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
						JSONObject jsonDetails = json.getJSONObject("data");

						sharedPreference.writeUserDetailsPreference(jsonDetails, strUsername, strPassword);

                        changingActivity();
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

    public void changingActivity()
    {
		try
		{
			Splash_Activity.splash_activity.finish();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
        Intent in = new Intent(getApplicationContext(), LandingPage_Activity.class);
        com.gotoNextActivity(in, true);
    }

	@Override
	public void onBackPressed() {
		// TODO BACK BUTTON ACTION
		com.backtoPreviousActivity(true);
	}
}
