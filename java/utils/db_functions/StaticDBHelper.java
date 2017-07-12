package utils.db_functions;

import android.annotation.SuppressLint;
import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.io.IOException;

import utils.common_functions.Common_Functions;
import utils.common_functions.Common_Strings;

@SuppressLint("SdCardPath")
public class StaticDBHelper extends SQLiteOpenHelper {

	private SQLiteDatabase mDataBase;
	public Context context;
	Common_Functions com;

	public StaticDBHelper(Context context) {
		super(context, Common_Strings.DB_NAME, null, 1);
		this.context = context;
		com = new Common_Functions(context);
	}

	public void createDataBase() throws IOException {
		// If database not exists copy it from the assets

		// boolean mDataBaseExist = checkDataBase();
		// if(!mDataBaseExist)
		// {
		// this.getReadableDatabase();
		// this.close();
		// try
		// {
		// copyDataBase();
		// }
		// catch (Exception mIOException)
		// {
		// mIOException.printStackTrace();
		// }
		// }
	}

	// private boolean checkDataBase()
	// {
	// File sd ;
	// if (Common_Functions.externalMemoryAvailable())
	// {
	// sd = Environment.getExternalStorageDirectory();
	// }
	// else
	// {
	// sd = mContext.getFilesDir();
	// }
	// File dest = new File(sd, Common_Strings.DB_PATH);
	// return dest.exists();
	// }
	//
	// //Copy the database from assets
	// private void copyDataBase() throws IOException
	// {
	// File sd ;
	// if (Common_Functions.externalMemoryAvailable())
	// {
	// sd = Environment.getExternalStorageDirectory();
	// }
	// else
	// {
	// sd = mContext.getFilesDir();
	// }
	// File dest = new File(sd, Common_Strings.DB_PATH);
	// InputStream mInput = new FileInputStream(dest);
	// OutputStream mOutput = new
	// FileOutputStream("/data/data/"+mContext.getPackageName()+"/databases/");
	// // XXX change this
	// byte[] mBuffer = new byte[1024];
	// int mLength;
	// while ((mLength = mInput.read(mBuffer))>0)
	// {
	// mOutput.write(mBuffer, 0, mLength);
	// }
	// mOutput.flush();
	// mOutput.close();
	// mInput.close();
	// }

	// Open the database, so we can query it
	public boolean openDataBase() throws SQLException {
		mDataBase = getDataBase();
		return mDataBase != null;
	}

	public SQLiteDatabase getDataBase() {
		return SQLiteDatabase.openDatabase(
				Common_Strings.get_DB_APP_PATH(context)
						+ Common_Strings.DB_NAME, null,
				SQLiteDatabase.OPEN_READWRITE
						| SQLiteDatabase.NO_LOCALIZED_COLLATORS);
	}

	@Override
	public synchronized void close() {
		if (mDataBase != null)
			mDataBase.close();
		super.close();
	}

	@Override
	public void onCreate(SQLiteDatabase arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		// TODO Auto-generated method stub

	}

}