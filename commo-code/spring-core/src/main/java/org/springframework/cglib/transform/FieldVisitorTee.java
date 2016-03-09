package org.springframework.cglib.transform;

import org.springframework.asm.AnnotationVisitor;
import org.springframework.asm.Attribute;
import org.springframework.asm.FieldVisitor;
import org.springframework.asm.Opcodes;

public class FieldVisitorTee extends FieldVisitor {
    private FieldVisitor fv1, fv2;
    
    public FieldVisitorTee(FieldVisitor fv1, FieldVisitor fv2) {
	super(Opcodes.ASM4);
	this.fv1 = fv1;
        this.fv2 = fv2;
    }

    public AnnotationVisitor visitAnnotation(String desc, boolean visible) {
        return AnnotationVisitorTee.getInstance(fv1.visitAnnotation(desc, visible),
                                                fv2.visitAnnotation(desc, visible));
    }
    
    public void visitAttribute(Attribute attr) {
        fv1.visitAttribute(attr);
        fv2.visitAttribute(attr);
    }

    public void visitEnd() {
        fv1.visitEnd();
        fv2.visitEnd();
    }
}
