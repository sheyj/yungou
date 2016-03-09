package org.springframework.cglib.core;

import org.springframework.asm.Type;

abstract public class MethodInfo {

    protected MethodInfo() {
    }
    
    abstract public ClassInfo getClassInfo();
    abstract public int getModifiers();
    abstract public Signature getSignature();
    abstract public Type[] getExceptionTypes();

    public boolean equals(Object o) {
        if (o == null)
            return false;
        if (!(o instanceof MethodInfo))
            return false;
        return getSignature().equals(((MethodInfo)o).getSignature());
    }

    public int hashCode() {
        return getSignature().hashCode();
    }

    public String toString() {
        // TODO: include modifiers, exceptions
        return getSignature().toString();
    }
}
