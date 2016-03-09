package org.springframework.cglib.core;

/**
 * @version $Id: CodeGenerationException.java,v 1.3 2004/06/24 21:15:21 herbyderby Exp $
 */
public class CodeGenerationException extends RuntimeException {
    private Throwable cause;

    public CodeGenerationException(Throwable cause) {
        super(cause.getClass().getName() + "-->" + cause.getMessage());
        this.cause = cause;
    }

    public Throwable getCause() {
        return cause;
    }
}
