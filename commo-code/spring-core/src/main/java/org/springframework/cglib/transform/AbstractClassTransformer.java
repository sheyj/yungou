package org.springframework.cglib.transform;

import org.springframework.asm.ClassVisitor;
import org.springframework.asm.Opcodes;

abstract public class AbstractClassTransformer extends ClassTransformer {
    protected AbstractClassTransformer() {
        super(Opcodes.ASM4);
    }

    public void setTarget(ClassVisitor target) {
        cv = target;
    }
}
