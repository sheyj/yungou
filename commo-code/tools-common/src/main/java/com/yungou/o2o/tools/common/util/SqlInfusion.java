package com.yungou.o2o.tools.common.util;

import org.apache.commons.lang.StringUtils;

/**
 * @category 防止sql注入
 * @author yiz
 * @createTime 2014-11-3下午3:43:27
 */
public class SqlInfusion
{
    public static String FilteSqlInfusion(String input)
    {
        if ((input == null) || (input.trim() == ""))
        {
            return "";
        }
        if (!StringUtils.isNumeric(input))
        {
            return input.replace("'", "’").replace("update", "ｕｐｄａｔｅ").replace("drop", "ｄｒｏｐ").replace("delete", "ｄｅｌｅｔｅ")
                    .replace("exec", "ｅｘｅｃ").replace("create", "ｃｒｅａｔｅ").replace("execute", "ｅｘｅｃｕｔｅ").replace("where", "ｗｈｅｒｅ")
                    .replace("truncate", "ｔｒｕｎｃａｔｅ").replace("insert", "ｉｎｓｅｒｔ");
        }
        return input;
    }
}
