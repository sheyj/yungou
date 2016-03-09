package com.yungou.o2o.tools.common.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @category 比较器工具类
 * @author yiz
 * @date 2014-12-15下午4:56:25
 */
public final class CompareUtils
{
    /**
     * @category 对比可变数据,存在传入数据与目标对比数据相等的
     * @description compareWithChangeData
     * @param target 目标数据
     * @param datas 对比数据
     * @return
     */
    public static boolean compareWithChangeData(String target, String... datas)
    {
        boolean flag = false;
        for (String data : datas)
        {
            if (target.equals(data))
            {
                flag = true;
                break;
            }
        }
        return flag;
    }
    
    /**
     * @category 将openId进行分割用于素材发送
     * @method piecewiseOpenIdMap
     * @param openIds 传入openId集合
     * @param size 分割的每次存放条数
     * @return
     */
    public static Map<String, List<String>> piecewiseOpenIdMap(List<String> openIds, int size)
    {
        // 得到总共条数
        int tag = openIds.size() / size;
        if (openIds.size() % size != 0)
        {
            tag = tag + 1;
        }
        Map<String, List<String>> mapList = new HashMap<String, List<String>>();
        if (tag > 0)
        {
            for (int i = 1; i < tag; i++)
            {
                mapList.put("map" + i, openIds.subList((i - 1) * size, i * size));
            }
            mapList.put("map" + tag, openIds.subList((tag - 1) * size, openIds.size()));
        }
        return mapList;
    }
    
    /**
     * @category param nowList 需要对比的List
     * @param compareList 对比参数List
     * @return
     */
    public static Map<String, List<String>> compareDealMap(List<String> nowList, List<String> compareList)
    {
        Map<String, List<String>> resultMap = new HashMap<String, List<String>>();
        List<String> tempList = new ArrayList<String>();
        tempList.addAll(nowList);
        List<String> neetAddList = new ArrayList<String>();
        List<String> neetDelList = new ArrayList<String>();
        nowList.removeAll(compareList);
        // 如果nowList不包含compareList则需要新增
        neetAddList.addAll(nowList);
        resultMap.put("neetAddList", neetAddList);
        // 如果compareList不包含nowList则需要删除
        compareList.removeAll(tempList);
        neetDelList.addAll(compareList);
        resultMap.put("neetDelList", neetDelList);
        return resultMap;
    }
}
