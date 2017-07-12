package utils.common_classes;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.Service;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;

import in.car_parking_walkin.R;
import utils.common_functions.Common_Functions;

public class GPSTracker extends Service implements LocationListener 
{
	private final Context context;
	Common_Functions com;
	// flag for GPS status
	boolean isGPSEnabled = false;
	// flag for network status
	boolean isNetworkEnabled = false;
	Location location; // location
	//India Lat, Long : for default load Location(if any pblm in getting location)
	double latitude = 28.613939; // latitude
	double longitude = 77.209021; // longitude
	// The minimum distance to change Updates in meters
	private static final long MIN_DISTANCE_CHANGE_FOR_UPDATES = 10; // 10 meters
	// The minimum time between updates in milliseconds
	private static final long MIN_TIME_BW_UPDATES = 1000 * 60 * 1; // 1 minute
	// Declaring a Location Manager
	protected LocationManager locationManager;

	public GPSTracker(Context context) {
		this.context = context;
		com = new Common_Functions(context);
		getLocation();
	}

	public Location getLocation() 
	{
		try 
		{
			locationManager = (LocationManager) context.getSystemService(LOCATION_SERVICE);
			
			if(canGetLocation()) 
			{
				if (isNetworkEnabled) 
				{
					locationManager.requestLocationUpdates(
							LocationManager.NETWORK_PROVIDER,
							MIN_TIME_BW_UPDATES,
							MIN_DISTANCE_CHANGE_FOR_UPDATES, this);
					Log.d("Network", "Network");
					if (locationManager != null) {
						location = locationManager
								.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
						if (location != null) {
							latitude = location.getLatitude();
							longitude = location.getLongitude();
						}
					}
				}
				// if GPS Enabled get lat/long using GPS Services
				if (isGPSEnabled) {
					if (location == null) {
						locationManager.requestLocationUpdates(
								LocationManager.GPS_PROVIDER,
								MIN_TIME_BW_UPDATES,
								MIN_DISTANCE_CHANGE_FOR_UPDATES, this);
						Log.d("GPS Enabled", "GPS Enabled");
						if (locationManager != null) {
							
							location = locationManager
									.getLastKnownLocation(LocationManager.GPS_PROVIDER);
							if (location != null) {
								latitude = location.getLatitude();
								longitude = location.getLongitude();
							}
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return location;
	}
	
	/**
	 * Stop using GPS listener
	 * Calling this function will stop using GPS in your app
	 * */
	public void stopUsingGPS(){
		if(locationManager != null){
			locationManager.removeUpdates(GPSTracker.this);
		}		
	}
	
	/**
	 * Function to get latitude
	 * */
	public double getLatitude(){
		getLocation();
		if(location != null){
			latitude = location.getLatitude();
		}
		
		// return latitude
		return latitude;
	}
	
	/**
	 * Function to get longitude
	 * */
	public double getLongitude(){
		getLocation();
		if(location != null){
			longitude = location.getLongitude();
		}else
		{
//			Toast.makeText(context, "Can't able to get exact location", 
//					Toast.LENGTH_SHORT).show();
			final Dialog dialog = com.showAlertDialog_TryAgain
					("Can't able to get your exact location. Please check your location settings " +
							"whether you are using High accuracy mode or not by click Yes Button.");

			dialog.findViewById(R.id.txt_CustomAlert_Yes).setOnClickListener(new OnClickListener()
			{
				@Override
				public void onClick(View v) 
				{
					dialog.dismiss();
					Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
	            	com.gotoNextActivity(intent, false);
	            	dialog.dismiss();
				}
			});
			dialog.findViewById(R.id.txt_CustomAlert_No).setOnClickListener(new OnClickListener() 
			{
				@Override
				public void onClick(View v) 
				{
					dialog.dismiss();
				}
			});
		}
		
		// return longitude
		return longitude;
	}
	
	/**
	 * Function to check GPS/wifi enabled
	 * @return boolean
	 * */
	// flag for GPS status
	public boolean canGetLocation() {
		// getting GPS status
		isGPSEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
		// getting network status
		isNetworkEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

		if (isGPSEnabled || isNetworkEnabled) 
		{
			// one of 2 network provider is enabled
			return true;
		} 
		else
		{
			return false;
		}
	}
	
	/**
	 * Function to show settings alert dialog
	 * On pressing Settings button will lauch Settings Options
	 * */
	public void showGPSSettingsAlert()
	{
		AlertDialog.Builder alertDialog = new AlertDialog.Builder(context);
   	 
        // Setting Dialog Title
        alertDialog.setTitle(com.getString(R.string.app_name)+" "+com.getString(R.string.strAlertTitle));
 
        // Setting Dialog Message
        alertDialog.setMessage(com.getString(R.string.strAlertMessage_GPS));
 
        // On pressing Settings button
        alertDialog.setPositiveButton(com.getString(R.string.strAlert_Settings), 
        		new DialogInterface.OnClickListener() 
        {
            public void onClick(DialogInterface dialog,int which) 
            {
            	Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            	com.gotoNextActivity(intent, false);
            	dialog.dismiss();
            }
        });
 
        // on pressing cancel button
        alertDialog.setNegativeButton(com.getString(R.string.strAlert_Cancel), 
        		new DialogInterface.OnClickListener() 
        {
            public void onClick(DialogInterface dialog, int which) 
            {
            	dialog.dismiss();
            }
        });
 
        // Showing Alert Message
        alertDialog.show();
	}

	@Override
	public void onLocationChanged(Location location) {
	}

	@Override
	public void onProviderDisabled(String provider) {
	}

	@Override
	public void onProviderEnabled(String provider) {
	}

	@Override
	public void onStatusChanged(String provider, int status, Bundle extras) {
	}

	@Override
	public IBinder onBind(Intent arg0) {
		return null;
	}

}
