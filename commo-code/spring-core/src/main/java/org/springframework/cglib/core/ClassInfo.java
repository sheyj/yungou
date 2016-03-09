package org.springframework.cglib.core;

import org.springframework.asm.Type;

abstract public class ClassInfo {

    protected ClassInfo() {
    }

    abstract public Type getType();
    abstract public Type getSuperType();
    abstract public Type[] getInterfaces();
    abstract public int getModifiers();

    public boolean equals(Object o) {
        if (o == null)
            return false;
        if (!(o instanceof ClassInfo))
            return false;
        return getType().equals(((ClassInfo)o).getType());
    }

    public int hashCode() {
        return getType().hashCode();
    }

    public String toString() {
        // TODO: include modifiers, superType, interfaces
        return getType().getClassName();
    }
}
