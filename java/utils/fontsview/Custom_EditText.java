package utils.fontsview;

import android.content.Context;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.widget.EditText;

import utils.common_functions.Common_Functions;


public class Custom_EditText extends EditText {

	public Custom_EditText(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
		init();
	}

	public Custom_EditText(Context context, AttributeSet attrs) {
		super(context, attrs);
		init();
	}

	public Custom_EditText(Context context) {
		super(context);
		init();
	}

	private void init() {
		if(!isInEditMode())
		{
			Typeface tf = Typeface.createFromAsset(getContext().getAssets(),
					Common_Functions.fontName_Regular);
			setTypeface(tf);
		}
	}
}
