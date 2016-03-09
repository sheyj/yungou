package org.springframework.cglib.core;

public interface Converter {
    Object convert(Object value, Class target, Object context);
}
