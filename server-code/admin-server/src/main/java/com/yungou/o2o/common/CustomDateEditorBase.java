package com.yungou.o2o.common;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.propertyeditors.CustomDateEditor;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午4:27:48
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public class CustomDateEditorBase extends CustomDateEditor {
	private DateFormat dateFormat;

	private boolean allowEmpty;

	private int exactDateLength;

	public CustomDateEditorBase(DateFormat dateFormat, boolean allowEmpty) {
		super(dateFormat, allowEmpty);
		this.dateFormat = dateFormat;
		this.allowEmpty = allowEmpty;
		this.exactDateLength = -1;
	}

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (this.allowEmpty && StringUtils.isEmpty(StringUtils.trim(text))) {
			// Treat empty String as null value.
			setValue(null);
		} else if (text != null && this.exactDateLength >= 0 && text.length() != this.exactDateLength) {
			throw new IllegalArgumentException("Could not parse date: it is not exactly" + this.exactDateLength
					+ "characters long");
		} else {
			try {
				if (StringUtils.isEmpty(StringUtils.trim(text))) {
					setValue(null);
				} else {
					if (text.length() > 10) {
						dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					} else {
						dateFormat = new SimpleDateFormat("yyyy-MM-dd");
					}
					setValue(this.dateFormat.parse(text));
				}

			} catch (ParseException ex) {
				throw new IllegalArgumentException("Could not parse date: " + ex.getMessage(), ex);
			}
		}
	}

	/**
	 * Format the Date as String, using the specified DateFormat.
	 */
	@Override
	public String getAsText() {
		Date value = (Date) getValue();
		return (value != null ? this.dateFormat.format(value) : "");
	}
}
