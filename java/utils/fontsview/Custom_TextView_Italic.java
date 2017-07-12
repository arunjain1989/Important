package utils.fontsview;

import android.content.Context;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.widget.TextView;

import utils.common_functions.Common_Functions;

public class Custom_TextView_Italic extends TextView {

	public Custom_TextView_Italic(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
		init();
	}

	public Custom_TextView_Italic(Context context, AttributeSet attrs) {
		super(context, attrs);
		init();
	}

	public Custom_TextView_Italic(Context context) {
		super(context);
		init();
	}

	private void init() {
		if(!isInEditMode())
		{
			Typeface tf = Typeface.createFromAsset(getContext().getAssets(),
					Common_Functions.fontName_Regular);
			setTypeface(tf, Typeface.ITALIC);
		}
	}
}
