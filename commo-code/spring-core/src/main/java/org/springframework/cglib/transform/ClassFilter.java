package org.springframework.cglib.transform;

/**
*
* @author  baliuka
*/
public interface ClassFilter {
   
   boolean accept(String className);
   
}
