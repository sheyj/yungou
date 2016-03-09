package org.springframework.cglib.core;

import java.lang.reflect.Member;
import java.lang.reflect.Modifier;
import org.springframework.asm.Type;

public class VisibilityPredicate implements Predicate {
    private boolean protectedOk;
    private String pkg;

    public VisibilityPredicate(Class source, boolean protectedOk) {
        this.protectedOk = protectedOk;
        pkg = TypeUtils.getPackageName(Type.getType(source));
    }

    public boolean evaluate(Object arg) {
        int mod = (arg instanceof Member) ? ((Member)arg).getModifiers() : ((Integer)arg).intValue();
        if (Modifier.isPrivate(mod)) {
            return false;
        } else if (Modifier.isPublic(mod)) {
            return true;
        } else if (Modifier.isProtected(mod)) {
            return protectedOk;
        } else {
            return pkg.equals(TypeUtils.getPackageName(Type.getType(((Member)arg).getDeclaringClass())));
        }
    }
}
