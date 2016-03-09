package org.springframework.cglib.transform;

import org.springframework.asm.ClassVisitor;
import org.springframework.asm.Opcodes;

public class ClassTransformerTee extends ClassTransformer {
    private ClassVisitor branch;
    
    public ClassTransformerTee(ClassVisitor branch) {
        super(Opcodes.ASM4);
        this.branch = branch;
    }
    
    public void setTarget(ClassVisitor target) { 
        cv = new ClassVisitorTee(branch, target);
    }
}
