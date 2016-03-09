package org.springframework.cglib.proxy;

import java.util.Iterator;
import java.util.List;
import org.springframework.cglib.core.ClassEmitter;
import org.springframework.cglib.core.CodeEmitter;
import org.springframework.cglib.core.EmitUtils;
import org.springframework.cglib.core.MethodInfo;
import org.springframework.cglib.core.TypeUtils;

class NoOpGenerator
implements CallbackGenerator
{
    public static final NoOpGenerator INSTANCE = new NoOpGenerator();

    public void generate(ClassEmitter ce, Context context, List methods) {
        for (Iterator it = methods.iterator(); it.hasNext();) {
            MethodInfo method = (MethodInfo)it.next();
            if (TypeUtils.isBridge(method.getModifiers()) || (
                    TypeUtils.isProtected(context.getOriginalModifiers(method)) &&
                    TypeUtils.isPublic(method.getModifiers()))) {
                CodeEmitter e = EmitUtils.begin_method(ce, method);
                e.load_this();
                e.load_args();
                context.emitInvoke(e, method);
                e.return_value();
                e.end_method();
            }
        }
    }
    
    public void generateStatic(CodeEmitter e, Context context, List methods) { }
}
