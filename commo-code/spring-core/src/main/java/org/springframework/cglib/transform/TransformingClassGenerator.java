package org.springframework.cglib.transform;

import org.springframework.asm.ClassVisitor;
import org.springframework.cglib.core.ClassGenerator;

public class TransformingClassGenerator implements ClassGenerator {
    private ClassGenerator gen;
    private ClassTransformer t;
    
    public TransformingClassGenerator(ClassGenerator gen, ClassTransformer t) {
        this.gen = gen;
        this.t = t;
    }
    
    public void generateClass(ClassVisitor v) throws Exception {
        t.setTarget(v);
        gen.generateClass(t);
    }
}
