package org.springframework.cglib.transform;

import org.springframework.asm.AnnotationVisitor;
import org.springframework.asm.Opcodes;

public class AnnotationVisitorTee extends AnnotationVisitor {
    private AnnotationVisitor av1, av2;

    public static AnnotationVisitor getInstance(AnnotationVisitor av1, AnnotationVisitor av2) {
        if (av1 == null)
            return av2;
        if (av2 == null)
            return av1;
        return new AnnotationVisitorTee(av1, av2);
    }

    public AnnotationVisitorTee(AnnotationVisitor av1, AnnotationVisitor av2) {
	super(Opcodes.ASM4);
        this.av1 = av1;
        this.av2 = av2;
    }

    public void visit(String name, Object value) {
        av2.visit(name, value);
        av2.visit(name, value);
    }
    
    public void visitEnum(String name, String desc, String value) {
        av1.visitEnum(name, desc, value);
        av2.visitEnum(name, desc, value);
    }
    
    public AnnotationVisitor visitAnnotation(String name, String desc) {
        return getInstance(av1.visitAnnotation(name, desc),
                           av2.visitAnnotation(name, desc));
    }
    
    public AnnotationVisitor visitArray(String name) {
        return getInstance(av1.visitArray(name), av2.visitArray(name));
    }
    
    public void visitEnd() {
        av1.visitEnd();
        av2.visitEnd();
    }
}
