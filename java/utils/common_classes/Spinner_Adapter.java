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
public class Spinner_Adapter extends ArrayAdapter<String> {

    Context context;
    Common_Functions com;
    String[] objects;

    public Spinner_Adapter(Context context, String[] objects) {
        super(context, 0, objects);
        this.context = context;
        com =  new Common_Functions(context);
        
        this.objects = objects;
    }

    @Override
    public View getDropDownView(int position, View convertView, ViewGroup parent) {
        return getCustomView(position, convertView, parent, true);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        notifyDataSetChanged();
        return getCustomView(position, convertView, parent, false);
    }

    public View getCustomView(int position, View convertView, ViewGroup parent, boolean isDropDownView) {

        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.spinner_custom, parent, false);
        TextView textView = (TextView) view.findViewById(R.id.txt_custom_spinner);
        textView.setText(objects[position]);

        if(isDropDownView)
        {
            textView.setBackgroundColor(Color.parseColor(com.getString(R.color.white)));
            com.setFontMediumNormal(textView, com.getString(R.color.black));
        }
        else
        {
            textView.setBackgroundColor(Color.TRANSPARENT);
            com.setFontMediumNormal(textView, com.getString(R.color.black));
        }

        return view;
    }
}