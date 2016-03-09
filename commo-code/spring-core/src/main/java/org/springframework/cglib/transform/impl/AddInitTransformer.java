package org.springframework.cglib.transform.impl;

import java.lang.reflect.Method;
import org.springframework.asm.Type;
import org.springframework.cglib.core.CodeEmitter;
import org.springframework.cglib.core.Constants;
import org.springframework.cglib.core.MethodInfo;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.cglib.core.Signature;
import org.springframework.cglib.transform.ClassEmitterTransformer;

/**
 * @author	Mark Hobson
 */
public class AddInitTransformer extends ClassEmitterTransformer {
    private MethodInfo info;
    
    public AddInitTransformer(Method method) {
        info = ReflectUtils.getMethodInfo(method);
        
        Type[] types = info.getSignature().getArgumentTypes();
        if (types.length != 1 ||
        !types[0].equals(Constants.TYPE_OBJECT) ||
        !info.getSignature().getReturnType().equals(Type.VOID_TYPE)) {
            throw new IllegalArgumentException(method + " illegal signature");
        }
    }
    
    public CodeEmitter begin_method(int access, Signature sig, Type[] exceptions) {
        final CodeEmitter emitter = super.begin_method(access, sig, exceptions);
        if (sig.getName().equals(Constants.CONSTRUCTOR_NAME)) {
            return new CodeEmitter(emitter) {
                public void visitInsn(int opcode) {
                    if (opcode == Constants.RETURN) {
                        load_this();
                        invoke(info);
                    }
                    super.visitInsn(opcode);
                }
            };
        }
        return emitter;
    }
}
