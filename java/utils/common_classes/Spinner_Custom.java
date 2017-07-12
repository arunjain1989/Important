package utils.common_classes;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import in.car_parking_walkin.R;
import utils.common_functions.Common_Functions;

/*Used for customizing the spinner items*/
public class Spinner_Custom extends ArrayAdapter<String> {

    Context context;
    Common_Functions com;
    String[] objects;
    String firstElement;
    boolean isFirstTime;
    int gravity;

    public Spinner_Custom(Context context, String[] objects, String defaultText, int gravity) {
        super(context, 0, objects);
        this.context = context;
        com =  new Common_Functions(context);
        
        this.objects = objects;
        this.isFirstTime = true;
        this.gravity = gravity;
        setDefaultText(defaultText);
    }

    @Override
    public View getDropDownView(int position, View convertView, ViewGroup parent) {
        if(isFirstTime) {
            objects[0] = firstElement;
            isFirstTime = false;
        }
        return getCustomView(position, convertView, parent);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        notifyDataSetChanged();
        return getCustomView(position, convertView, parent);
    }

    public void setDefaultText(String defaultText) {
        this.firstElement = objects[0];
        objects[0] = defaultText;
    }

    public View getCustomView(int position, View convertView, ViewGroup parent) {

        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View row;
    	row = inflater.inflate(R.layout.spinner_custom, parent, false);
        TextView textView = (TextView) row.findViewById(R.id.txt_custom_spinner);
        textView.setText(objects[position]);
        textView.setGravity(gravity);

        textView.setBackgroundColor(Color.parseColor(com.getString(R.color.white)));

        com.setFontRegularNormal(textView, com.getString(R.color.black));

        return row;
    }
}