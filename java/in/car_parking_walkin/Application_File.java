package in.car_parking_walkin;

import android.app.Application;
import android.os.Build;
import android.os.StrictMode;

import org.acra.ACRA;
import org.acra.ReportingInteractionMode;
import org.acra.annotation.ReportsCrashes;

/*Application Singleton with the capability to send crash report*/
@ReportsCrashes(formKey = "", // will not be used
mailTo = "vengat.android@gmail.com", mode = ReportingInteractionMode.TOAST, resToastText = in.car_parking_walkin.R.string.err_msg)

public class Application_File extends Application {
	Application_File application_File = null;

	public Application_File() {
	}

	@Override
	public void onCreate() {
		super.onCreate();
		application_File = this;
		ACRA.init(this);

		if (Build.VERSION.SDK_INT > 9) {
			StrictMode.ThreadPolicy poli = new StrictMode.ThreadPolicy.Builder()
					.permitAll().build();
			StrictMode.setThreadPolicy(poli);
		}

	}
}
