package org.springframework.cglib.proxy;

import org.springframework.cglib.core.CodeGenerationException;

/**
 * Used by {@link Proxy} as a replacement for <code>java.lang.reflect.UndeclaredThrowableException</code>.
 * @author Juozas Baliuka
 */
public class UndeclaredThrowableException extends CodeGenerationException {
    /**
     * Creates a new instance of <code>UndeclaredThrowableException</code> without detail message.
     */
    public UndeclaredThrowableException(Throwable t) {
        super(t);
    }
    
    public Throwable getUndeclaredThrowable() {
        return getCause();
    }
}
