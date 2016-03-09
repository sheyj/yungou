package org.springframework.cglib.core;

public class ClassesKey {
    private static final Key FACTORY = (Key)KeyFactory.create(Key.class, KeyFactory.OBJECT_BY_CLASS);
    
    interface Key {
        Object newInstance(Object[] array);
    }

    private ClassesKey() {
    }

    public static Object create(Object[] array) {
        return FACTORY.newInstance(array);
    }
}
