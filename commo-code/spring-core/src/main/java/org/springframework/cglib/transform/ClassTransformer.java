package org.springframework.cglib.transform;

import org.springframework.asm.ClassVisitor;
import org.springframework.asm.Opcodes;

public abstract class ClassTransformer extends ClassVisitor {
    public ClassTransformer() {
	super(Opcodes.ASM4);
    }
    public ClassTransformer(int opcode) {
	super(opcode);
    }
   public abstract void setTarget(ClassVisitor target);
}
