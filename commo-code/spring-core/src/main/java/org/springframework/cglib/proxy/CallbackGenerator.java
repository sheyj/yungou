package org.springframework.cglib.proxy;

import java.util.List;
import org.springframework.cglib.core.ClassEmitter;
import org.springframework.cglib.core.CodeEmitter;
import org.springframework.cglib.core.MethodInfo;
import org.springframework.cglib.core.Signature;

interface CallbackGenerator
{
    void generate(ClassEmitter ce, Context context, List methods) throws Exception;
    void generateStatic(CodeEmitter e, Context context, List methods) throws Exception;

    interface Context
    {
        ClassLoader getClassLoader();
        CodeEmitter beginMethod(ClassEmitter ce, MethodInfo method);
        int getOriginalModifiers(MethodInfo method);
        int getIndex(MethodInfo method);
        void emitCallback(CodeEmitter ce, int index);
        Signature getImplSignature(MethodInfo method);
        void emitInvoke(CodeEmitter e, MethodInfo method);
    }
}
