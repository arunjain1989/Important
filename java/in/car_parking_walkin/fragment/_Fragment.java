package in.car_parking_walkin.fragment;


import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import in.car_parking_walkin.R;
import utils.common_functions.Common_Functions;
import utils.common_functions.Common_SharedPreference;

/**
 * 
 * @author VENGAT
 *
 */
public class _Fragment extends Fragment 
{
	Context context;
	static FragmentManager fragmentManager;
	Common_Functions com;
	Common_SharedPreference sharedPreference;
	_Fragment thisFragment;
	
	View view;

	Bundle bundle;
	String strHeading;
	
	public _Fragment()
	{}
    
    @Override
	public void onActivityCreated(Bundle bundle)
    {
    	super.onActivityCreated(bundle);
    }
    @Override
	public View onCreateView(LayoutInflater LayoutInflater, ViewGroup container, Bundle bundle)
    {
    	view = LayoutInflater.inflate(R.layout._fragment, container, false);
    	
    	context = getActivity();
    	fragmentManager = getActivity().getSupportFragmentManager();
    	com = new Common_Functions(context);
		sharedPreference = new Common_SharedPreference(context);
    	thisFragment = this;

		bundle = getArguments();
		if(bundle != null && bundle.containsKey("page_Heading"))
		{
			strHeading = bundle.getString("page_Heading");
		}
		else
		{
			strHeading = context.getString(R.string.strAppName);
		}

    	TextView txtHeading = (TextView) getActivity().findViewById(R.id.txtHeader);
		txtHeading.setText(strHeading);
		com.setFontMediumBold(txtHeading, com.getString(R.color.white));
		txtHeading.setVisibility(View.GONE);
		ImageView imgHeader = (ImageView) getActivity().findViewById(R.id.imgHeader);
		imgHeader.setVisibility(View.VISIBLE);

		/*ImageView imgBack = (ImageView) getActivity().findViewById(R.id.imgHeaderBack);
		ImageView imgMenu = (ImageView) getActivity().findViewById(R.id.imgHeaderMenu);
		ImageView imgCart = (ImageView) getActivity().findViewById(R.id.imgHeaderCart);
		imgBack.setVisibility(View.GONE);
		imgMenu.setVisibility(View.VISIBLE);
		imgCart.setVisibility(View.VISIBLE);

		imgBack.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				LandingPage_Activity.activity_LandingPage.onBackPressed();
			}
		});
		imgMenu.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				new ShowQuickAction(context)
						.showSettings(v, fragmentManager, 2);
			}
		});
		imgCart.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
			}
		});*/
    	
    	return view;
    }
}
